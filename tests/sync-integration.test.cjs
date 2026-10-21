const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {test} = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../jini-sync.js'), 'utf8')
  .replace('  render();\n  if (validToken()) {', `
  window.testAPI = {snapshot, validate, meaningful, fingerprint, syncCycle, checkDrive, manualBackup,
    getConflict: () => conflict, getMeta: () => meta,
    setBaseline: records => {meta.lastHash = fingerprint(records); meta.lastRemoteVersion = '1'; meta.lastRemoteFileId = 'backup';},
    setToken: () => {token = 'test'; expiresAt = Date.now() + 1000000;}};
  return;
  render();
  if (validToken()) {`);

function storage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {get length() {return data.size;}, key: i => [...data.keys()][i] ?? null,
    getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, String(value)),
    removeItem: key => data.delete(key)};
}
function harness(local, remote, {version = '2', failRead = false, onRead} = {}) {
  const fields = new Map();
  const localStorage = storage(local);
  const requests = [];
  let cloud = structuredClone(remote), cloudVersion = Number(version);
  let reloads = 0;
  function element(id) {
    if (!fields.has(id)) fields.set(id, {hidden: false, textContent: '',
      addEventListener() {}, classList: {toggle() {}}, scrollIntoView() {}});
    return fields.get(id);
  }
  const metadata = () => ({id: 'backup', version: String(cloudVersion), size: '96000', modifiedTime: '2026-10-21T09:50:08Z'});
  const context = {URLSearchParams, Event, document: {hidden: false,
    getElementById: element, querySelector() {return null;}},
    window: {addEventListener() {}, dispatchEvent() {}, setTimeout() {}, clearTimeout() {}, location: {reload() {reloads++;}}},
    localStorage, sessionStorage: storage(),
    fetch: async (url, options = {}) => {
      requests.push({url, ...options});
      let data;
      const parsed = new URL(url);
      if (parsed.searchParams.get('alt') === 'media') {
        if (failRead) throw new Error('Drive unavailable');
        if (onRead) onRead(localStorage);
        data = {app: 'JINI', schema: 1, data: cloud};
      } else if (options.method === 'PATCH') {
        cloud = JSON.parse(options.body).data;
        cloudVersion++;
        data = metadata();
      } else if (parsed.searchParams.has('q')) {
        data = {files: [parsed.searchParams.get('q').includes('mimeType') ? {id: 'folder'} : metadata()]};
      } else data = metadata();
      return {ok: true, status: 200, headers: {get() {return 'application/json';}},
        async json() {return structuredClone(data);}};
    }};
  vm.runInNewContext(source, context);
  const api = context.window.testAPI;
  assert(api, 'test hooks must be installed');
  api.setToken();
  return {api, localStorage, element, requests, cloud: () => cloud, reloads: () => reloads,
    setCloud: value => {cloud = structuredClone(value); cloudVersion++;},
    failReads: value => {failRead = value;},
    uploads: () => requests.filter(r => r.method === 'PATCH')};
}

function records() {
  return {
    'jini-english-game-v1': JSON.stringify({xp: 1400, tries: 150, correct: 140,
      items: {hello: {xpAwarded: true, streak: 1, wrong: 0, due: 100}}}),
    'jini-korean-games-v1': JSON.stringify({xp: 170, attempts: 20, correct: 17,
      items: {word: {xpAwarded: true, streak: 1, wrong: 0, lastAt: 100}}}),
    'jini-study-time-v1': JSON.stringify({schema: 1, deviceId: 'phone',
      days: {'2026-10-21': {englishMs: 500000, koreanMs: 40000}}}),
    'jini-game-character-english-v1': JSON.stringify({name: '지니 모험가', avatar: 'fox', auraSelection: 'auto'}),
    'jini-game-character-korean-v1': JSON.stringify({name: '지니 모험가', avatar: 'rabbit', auraSelection: 'auto'})
  };
}

test('different page and scroll positions do not block identical learning records', async () => {
  const remote = records();
  remote['jini-vocabulary-level-state-v1'] = JSON.stringify({all: {pageNumber: 2, scrollY: 0}});
  remote['jini-player-level-state-v1'] = JSON.stringify({'초등': {playerIndex: 3}});
  const local = {...remote,
    'jini-vocabulary-level-state-v1': JSON.stringify({all: {pageNumber: 5, scrollY: 900}}),
    'jini-player-level-state-v1': JSON.stringify({'초등': {playerIndex: 8}})};
  const h = harness(local, remote);
  await h.api.checkDrive();
  assert.equal(h.api.getConflict(), null);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
  assert.equal(h.uploads().length, 0);
  assert.equal(h.reloads(), 0);
  for (const key of ['jini-vocabulary-level-state-v1', 'jini-player-level-state-v1']) {
    assert.equal(h.localStorage.getItem(key), local[key], 'keep this device’s reading position');
    assert.equal(h.api.snapshot()[key], undefined);
  }
});

test('reading positions alone are not meaningful learning progress', () => {
  const h = harness({'jini-player-level-state-v1': '{"초등":{"playerIndex":0}}'}, {});
  assert.equal(h.api.meaningful(h.api.snapshot()), false);
});

test('manual backup compares content when Drive version changed', async () => {
  const remote = records();
  const h = harness(remote, remote);
  h.api.setBaseline(remote);
  await h.api.manualBackup(false);
  assert.equal(h.api.getConflict(), null);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
  assert.equal(h.reloads(), 0);
});

test('manual backup merges independent answers instead of overwriting Drive', async () => {
  const remote = records(), local = records();
  const game = JSON.parse(remote['jini-english-game-v1']);
  game.xp += 10;
  game.items.remote = {xpAwarded: true, streak: 1, wrong: 0, due: 200};
  remote['jini-english-game-v1'] = JSON.stringify(game);
  const h = harness(local, remote);
  h.api.setBaseline(local);
  await h.api.manualBackup(false);
  assert.equal(h.api.getConflict(), null);
  assert.equal(JSON.parse(h.localStorage.getItem('jini-english-game-v1')).xp, 1410);
  assert.equal(JSON.parse(h.cloud()['jini-english-game-v1']).items.remote.xpAwarded, true);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
});

test('actual character differences still require a choice', async () => {
  const local = records(), remote = records();
  remote['jini-game-character-english-v1'] = '{"name":"다른 이름","avatar":"cat","auraSelection":"auto"}';
  const h = harness(local, remote);
  await h.api.checkDrive();
  assert(h.api.getConflict());
  assert.equal(h.element('jsy-auto').textContent, '기록 충돌');
  assert(h.element('jsy-differences').textContent.includes('영어 캐릭터 설정'));
  assert.equal(h.uploads().length, 0);
  assert.equal(h.localStorage.getItem('jini-game-character-english-v1'), local['jini-game-character-english-v1']);
});

test('successful recheck clears an old conflict through real reconciliation', async () => {
  const local = records(), remote = records();
  remote['jini-game-character-english-v1'] = '{"name":"다른 이름"}';
  const h = harness(local, remote);
  await h.api.checkDrive();
  assert(h.api.getConflict());
  h.setCloud(local);
  await h.api.checkDrive();
  assert.equal(h.api.getConflict(), null);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
  assert.equal(h.element('jsy-conflict').hidden, true);
  assert.equal(h.uploads().length, 0);
});

test('failed recheck preserves the conflict and background upload pause', async () => {
  const local = records(), remote = records();
  remote['jini-game-character-english-v1'] = '{"name":"다른 이름"}';
  const h = harness(local, remote);
  await h.api.checkDrive();
  const conflict = h.api.getConflict();
  assert(conflict);
  h.failReads(true);
  await h.api.checkDrive();
  assert.equal(h.api.getConflict(), conflict);
  assert.equal(h.element('jsy-conflict').hidden, false);
  assert.equal(h.element('jsy-message').textContent, 'Drive unavailable');
  const count = h.requests.length;
  await h.api.syncCycle();
  assert.equal(h.requests.length, count);
  assert.equal(h.uploads().length, 0);
});

test('reading-position-only devices restore progress and keep their local cursor', async () => {
  const cursor = '{"초등":{"playerIndex":8}}';
  const h = harness({'jini-player-level-state-v1': cursor}, records());
  await h.api.checkDrive();
  assert.equal(h.api.getConflict(), null);
  assert.equal(h.reloads(), 1);
  assert.equal(JSON.parse(h.localStorage.getItem('jini-english-game-v1')).xp, 1400);
  assert.equal(h.localStorage.getItem('jini-player-level-state-v1'), cursor);
  assert.equal(h.uploads().length, 0);
});

test('same Drive version does not allow manual backup to overwrite a real conflict', async () => {
  const local = records(), remote = records(), baseline = records();
  baseline['jini-game-character-english-v1'] = '{"name":"이전 이름"}';
  remote['jini-game-character-english-v1'] = '{"name":"다른 이름"}';
  const h = harness(local, remote, {version: '1'});
  h.api.setBaseline(baseline);
  await h.api.manualBackup(false);
  assert(h.api.getConflict());
  assert.equal(h.uploads().length, 0);
  assert.equal(h.reloads(), 0);
});

test('a local-only character change uploads when Drive still matches the baseline', async () => {
  const remote = records(), local = records();
  local['jini-game-character-english-v1'] = '{"name":"지니 모험가","avatar":"cat","auraSelection":"none"}';
  const h = harness(local, remote, {version: '1'});
  h.api.setBaseline(remote);
  await h.api.checkDrive();
  assert.equal(h.api.getConflict(), null);
  assert.equal(h.cloud()['jini-game-character-english-v1'], local['jini-game-character-english-v1']);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
  assert.equal(h.uploads().length, 1);
});

test('merge keeps distinct answers, deduplicates XP and settles on the next check', async () => {
  const local = records(), remote = records();
  for (const [data, id] of [[local, 'phone-answer'], [remote, 'pc-answer']]) {
    const game = JSON.parse(data['jini-english-game-v1']);
    game.xp += 10;
    game.items[id] = {xpAwarded: true, streak: 1, wrong: 0, due: 200};
    data['jini-english-game-v1'] = JSON.stringify(game);
  }
  const h = harness(local, remote);
  await h.api.manualBackup(false);
  assert.equal(h.api.getConflict(), null);
  const game = JSON.parse(h.cloud()['jini-english-game-v1']);
  assert.equal(game.xp, 1420);
  assert.equal(Object.keys(game.items).length, 3);
  assert.equal(h.uploads().length, 1);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
  await h.api.checkDrive();
  assert.equal(h.uploads().length, 1, 'no repeated upload after convergence');
  assert.equal(h.api.getConflict(), null);
});

test('compare the current local record after awaiting the Drive read', async () => {
  const local = records(), remote = records();
  const h = harness(local, remote, {onRead: store => {
    store.setItem('jini-game-character-english-v1', '{"name":"읽는 동안 변경"}');
  }});
  await h.api.checkDrive();
  assert(h.api.getConflict(), 'a change during the request must not be declared synced');
  assert.equal(h.element('jsy-auto').textContent, '기록 충돌');
  assert.equal(h.uploads().length, 0);
});

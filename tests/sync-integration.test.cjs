const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {test} = require('node:test');

const source = fs.readFileSync(path.join(__dirname, '../jini-sync.js'), 'utf8')
  .replace('  render();\n  if (validToken()) {', `
  window.testAPI = {snapshot, validate, meaningful, fingerprint, syncCycle, checkDrive, manualBackup, beginConnect, disconnect,
    getConflict: () => conflict, getMeta: () => meta, render,
    expireToken: () => {expiresAt = 0;},
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
function harness(local, remote, {version = '2', failRead = false, onRead, accountEmail = 'learner@example.test',
    failAccountRead = false, accountUnauthorized = false, usageRecorder} = {}) {
  const fields = new Map();
  const localStorage = storage(local);
  const requests = [];
  let cloud = structuredClone(remote), cloudVersion = Number(version);
  let reloads = 0;
  const oauthRequests = [], oauthClients = [];
  const windowEvents = new Map();
  const google = {accounts: {oauth2: {initTokenClient(config) {
    oauthClients.push(config);
    return {requestAccessToken(options) {oauthRequests.push(options);}};
  }}}};
  function element(id) {
    if (!fields.has(id)) fields.set(id, {hidden: false, textContent: '', events: {},
      addEventListener(name, fn) {this.events[name] = fn;}, classList: {toggle() {}}, scrollIntoView() {}});
    return fields.get(id);
  }
  const metadata = () => ({id: 'backup', version: String(cloudVersion), size: '96000', modifiedTime: '2026-10-21T09:50:08Z'});
  const context = {URLSearchParams, Event, document: {hidden: false,
    getElementById: element, querySelector() {return null;}},
    google,
    window: {google, JINI_GOOGLE_CLIENT_ID: 'test-client',
      JINI_NETWORK_USAGE: usageRecorder ? {recordDrive: usageRecorder} : undefined,
      addEventListener(name, fn) {windowEvents.set(name, fn);}, dispatchEvent() {}, setTimeout() {}, clearTimeout() {}, location: {reload() {reloads++;}}},
    localStorage, sessionStorage: storage(),
    fetch: async (url, options = {}) => {
      requests.push({url, ...options});
      let data;
      const parsed = new URL(url);
      if (parsed.pathname.endsWith('/about')) {
        if (failAccountRead) throw new Error('Account info temporarily unavailable');
        if (accountUnauthorized) return {ok: false, status: 401};
        data = {user: {emailAddress: accountEmail}};
      } else if (parsed.searchParams.get('alt') === 'media') {
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
  return {api, localStorage, element, requests, oauthRequests, oauthClients, cloud: () => cloud, reloads: () => reloads,
    notifyProgress: () => windowEvents.get('jini-learning-progress-changed')(),
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

test('expression list and player positions stay local and cannot create Drive conflicts', async () => {
  const remote = records(), local = records();
  const keys = ['jini-essential-expressions-positions-v1', 'jini-expression-player-state-v1'];
  for (const key of keys) {local[key] = '{"page":3}'; remote[key] = '{"page":7}';}
  const h = harness(local, remote);
  await h.api.checkDrive();
  assert.equal(h.api.getConflict(), null);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
  assert.equal(h.uploads().length, 0);
  for (const key of keys) {
    assert.equal(h.api.snapshot()[key], undefined);
    assert.equal(h.localStorage.getItem(key), local[key]);
  }
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

test('first Google connection selects an account and remembers its email without persisting tokens', async () => {
  const local = records();
  const h = harness(local, local);
  await h.api.beginConnect();
  assert.equal(h.oauthRequests[0].prompt, 'select_account');
  assert.equal(h.oauthRequests[0].login_hint, undefined);
  await h.oauthClients[0].callback({access_token: 'temporary-google-token', expires_in: 3600});
  const meta = JSON.parse(h.localStorage.getItem('jini-drive-sync-meta-v1'));
  assert.equal(meta.accountEmail, 'learner@example.test');
  assert.equal(meta.previouslyConnected, true);
  assert(!JSON.stringify(meta).includes('temporary-google-token'));
  assert.equal(h.api.snapshot()['jini-drive-sync-meta-v1'], undefined);
});

test('Google reconnect after expiry uses the prior account hint without forcing account selection', async () => {
  const local = records();
  local['jini-drive-sync-meta-v1'] = JSON.stringify({previouslyConnected: true, accountEmail: 'previous@example.test'});
  const h = harness(local, records());
  h.api.expireToken();
  await h.api.beginConnect();
  assert.equal(h.oauthRequests[0].prompt, '');
  assert.equal(h.oauthRequests[0].login_hint, 'previous@example.test');
});

test('a deliberate Google disconnect permits changing accounts on the next connection', async () => {
  const local = records();
  local['jini-drive-sync-meta-v1'] = JSON.stringify({previouslyConnected: true, manuallyDisconnected: true,
    accountEmail: 'previous@example.test'});
  const h = harness(local, records());
  await h.api.beginConnect();
  assert.equal(h.oauthRequests[0].prompt, 'select_account');
  assert.equal(h.oauthRequests[0].login_hint, undefined);
  await h.oauthClients[0].callback({access_token: 'temporary-token', expires_in: 3600});
  assert.equal(h.api.getMeta().accountEmail, 'learner@example.test');
});

test('existing browser sessions learn an account hint during the next Drive check', async () => {
  const local = records();
  const h = harness(local, local);
  await h.api.checkDrive();
  assert.equal(h.api.getMeta().accountEmail, 'learner@example.test');
  assert.equal(h.api.getConflict(), null);
  await h.api.checkDrive();
  assert.equal(h.requests.filter(r => new URL(r.url).pathname.endsWith('/about')).length, 1);
});

test('unavailable account hints do not prevent a successful Drive backup check', async () => {
  const local = records();
  const h = harness(local, local, {failAccountRead: true});
  await h.api.checkDrive();
  assert.equal(h.api.getConflict(), null);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
});

test('authorization expiry while identifying the account leaves reconnect available', async () => {
  const local = records();
  const h = harness(local, local, {accountUnauthorized: true});
  await h.api.beginConnect();
  await h.oauthClients[0].callback({access_token: 'expired-token', expires_in: 3600});
  assert(h.element('jsy-message').textContent.includes('Google 인증이 만료'));
  await h.api.beginConnect();
  assert.equal(h.oauthClients.length, 2, 'the failed account check must not leave connecting latched');
});

function addXP(h, english, korean) {
  for (const [key, amount] of [['jini-english-game-v1', english], ['jini-korean-games-v1', korean]]) {
    const game = JSON.parse(h.localStorage.getItem(key));
    game.xp += amount;
    h.localStorage.setItem(key, JSON.stringify(game));
  }
}

test('expired authorization shows unsaved XP by language from confirmed Drive totals', async () => {
  const h = harness(records(), records());
  await h.api.checkDrive();
  h.api.getMeta().previouslyConnected = true;
  addXP(h, 100, 20);
  h.api.expireToken(); h.api.render();
  assert.equal(h.element('jsy-expired-notice').hidden, false);
  assert.equal(h.element('jsy-unbacked-xp').textContent, 'Drive에 아직 백업되지 않은 경험치 +120 XP');
  assert.equal(h.element('jsy-unbacked-xp-detail').textContent, '영어 +100 XP · 한글 +20 XP');
  assert.equal(h.element('jsy-expired-reconnect').textContent, '이전 계정으로 다시 연결');
  assert.equal(h.element('jsy-expired-reconnect').disabled, false);
  assert.equal(h.api.snapshot()['jini-drive-sync-meta-v1'], undefined);
});

test('last confirmed Drive XP survives reload while new expired-session gains update without requests', async () => {
  const h = harness(records(), records());
  await h.api.checkDrive();
  const meta = JSON.parse(h.localStorage.getItem('jini-drive-sync-meta-v1'));
  meta.previouslyConnected = true;
  const restored = harness({...records(), 'jini-drive-sync-meta-v1': JSON.stringify(meta)}, records());
  restored.api.expireToken(); addXP(restored, 10, 30);
  restored.notifyProgress();
  assert.equal(restored.element('jsy-expired-notice').hidden, false);
  assert.match(restored.element('jsy-unbacked-xp').textContent, /\+40 XP$/);
  assert.equal(restored.requests.length, 0);
  addXP(restored, 20, 0); restored.notifyProgress();
  assert.match(restored.element('jsy-unbacked-xp').textContent, /\+60 XP$/);
  assert.equal(restored.requests.length, 0);
});

test('old or invalid Drive XP metadata never invents an unsaved XP amount', () => {
  for (const lastBackedUpXP of [undefined, {enXp: '1400', koXp: 170}, {enXp: -10, koXp: 170}]) {
    const meta = {previouslyConnected: true, lastBackedUpXP};
    const h = harness({...records(), 'jini-drive-sync-meta-v1': JSON.stringify(meta)}, records());
    h.api.expireToken(); h.api.render();
    assert.equal(h.element('jsy-unbacked-xp').textContent, '미백업 경험치는 재연결 후 확인할 수 있어요.');
    assert.equal(h.element('jsy-unbacked-xp-detail').hidden, true);
  }
});

test('zero XP and lower local totals do not create negative or misleading combined XP', async () => {
  const h = harness(records(), records());
  await h.api.checkDrive(); h.api.getMeta().previouslyConnected = true;
  h.api.expireToken(); h.api.render();
  assert.equal(h.element('jsy-unbacked-xp').textContent, '추가로 백업할 경험치 0 XP');
  addXP(h, -100, 30); h.notifyProgress();
  assert.equal(h.element('jsy-unbacked-xp').textContent, 'Drive에 아직 백업되지 않은 경험치 +30 XP');
  assert.equal(h.element('jsy-unbacked-xp-detail').textContent, '영어 +0 XP · 한글 +30 XP');
});

test('a failed Drive check preserves the last confirmed XP reference', async () => {
  const h = harness(records(), records());
  await h.api.checkDrive(); h.api.getMeta().previouslyConnected = true;
  addXP(h, 50, 0); h.failReads(true);
  await h.api.checkDrive();
  h.api.expireToken(); h.api.render();
  assert.match(h.element('jsy-unbacked-xp').textContent, /\+50 XP$/);
  assert.equal(h.api.getMeta().lastBackedUpXP.enXp, 1400);
});

test('the expiry notice stays hidden when connected or deliberately disconnected', async () => {
  const h = harness(records(), records());
  h.api.render(); assert.equal(h.element('jsy-expired-notice').hidden, true);
  h.api.getMeta().previouslyConnected = true;
  h.api.render(); assert.equal(h.element('jsy-expired-notice').hidden, true);
  h.api.expireToken(); h.api.render();
  assert.equal(h.element('jsy-expired-notice').hidden, false);
  h.api.disconnect();
  assert.equal(h.element('jsy-expired-notice').hidden, true);
});

test('expiry notice reconnect uses the existing Google flow and clears the XP difference after backup', async () => {
  const h = harness(records(), records());
  await h.api.checkDrive();
  h.api.getMeta().previouslyConnected = true;
  addXP(h, 120, 0); h.api.expireToken(); h.api.render();
  await h.element('jsy-expired-reconnect').events.click();
  assert.equal(h.oauthRequests[0].prompt, '');
  assert.equal(h.oauthRequests[0].login_hint, 'learner@example.test');
  await h.oauthClients[0].callback({access_token: 'renewed', expires_in: 3600});
  assert.equal(h.element('jsy-expired-notice').hidden, true);
  assert.equal(h.api.getMeta().lastBackedUpXP.enXp, 1520);
  h.api.expireToken(); h.api.render();
  assert.equal(h.element('jsy-unbacked-xp').textContent, '추가로 백업할 경험치 0 XP');
});

test('network usage stays device-local and cannot create Drive learning-record conflicts', async () => {
  const remote = records(), local = {...remote,
    'jini-network-usage-v1:phone': '{"schema":1,"days":{"2026-10-21":{"download":123456}}}'};
  remote['jini-network-usage-v1:computer'] = '{"schema":1,"days":{"2026-10-21":{"download":900000}}}';
  const h = harness(local, remote);
  assert.equal(h.api.snapshot()['jini-network-usage-v1:phone'], undefined);
  const onlyUsage = harness({'jini-network-usage-v1:phone': local['jini-network-usage-v1:phone']}, {});
  assert.equal(onlyUsage.api.meaningful(onlyUsage.api.snapshot()), false);
  await h.api.checkDrive();
  assert.equal(h.api.getConflict(), null);
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
  assert.equal(h.uploads().length, 0);
});

test('Drive uploads and downloads report their payloads without additional requests', async () => {
  const observed = [];
  const h = harness(records(), records(), {usageRecorder: (upload, download) => observed.push({upload, download})});
  await h.api.checkDrive();
  addXP(h, 10, 0); await h.api.manualBackup(true);
  assert.equal(observed.length, h.requests.length);
  const uploaded = observed.find(row => row.upload);
  assert.equal(JSON.parse(uploaded.upload).app, 'JINI');
  assert.equal(JSON.parse(uploaded.upload).data['jini-network-usage-v1:phone'], undefined);
  assert.ok(observed.some(row => row.download.includes('"app":"JINI"')));
  assert.equal(h.api.getConflict(), null);
});

test('a failed usage meter cannot interrupt a successful Drive backup', async () => {
  const h = harness(records(), records(), {usageRecorder() {throw Error('Meter unavailable');}});
  await h.api.checkDrive();
  assert.equal(h.element('jsy-auto').textContent, '학습기록 일치');
  addXP(h, 10, 0); await h.api.manualBackup(true);
  assert.equal(h.uploads().length, 1);
  assert.equal(JSON.parse(h.cloud()['jini-english-game-v1']).xp, 1410);
});

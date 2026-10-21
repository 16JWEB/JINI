const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const source = fs.readFileSync(path.join(__dirname, '../network-usage.js'), 'utf8');

function harness({store = new Map(), noObserver = false, noPerformance = false, unavailableStorage = false,
  initialResources = [], navigation = []} = {}) {
  const clock = {now: new Date(2026, 9, 21, 12).getTime()};
  class ClockDate extends Date {
    constructor(...args) {super(...(args.length ? args : [clock.now]));}
    static now() {return clock.now;}
  }
  const root = {innerHTML: '', expanded: false, querySelector() {return {open: this.expanded};}};
  const windowEvents = {}, documentEvents = {}, timers = new Map();
  let nextTimer = 0, observer, options;
  const storage = {
    get length() {if (unavailableStorage) throw Error('Storage blocked'); return store.size;},
    key: i => [...store.keys()][i], getItem: key => store.get(key) || null,
    removeItem: key => store.delete(key),
    setItem(key, value) {if (unavailableStorage) throw Error('Storage blocked'); store.set(key, String(value));}
  };
  const document = {readyState: 'complete', hidden: false, getElementById: () => root,
    addEventListener(name, fn) {(documentEvents[name] ||= []).push(fn);}};
  const window = {
    performance: noPerformance ? undefined : {timeOrigin: clock.now - 1000,
      getEntriesByType: type => type === 'navigation' ? navigation : initialResources},
    PerformanceObserver: noObserver ? undefined : class {
      constructor(callback) {observer = callback;}
      observe(value) {options = value;}
    },
    addEventListener(name, fn) {(windowEvents[name] ||= []).push(fn);},
    setTimeout(fn) {timers.set(++nextTimer, fn); return nextTimer;},
    clearTimeout(id) {timers.delete(id);}, setInterval() {}
  };
  vm.runInNewContext(source, {window, document, localStorage: storage, Date: ClockDate, URL, TextEncoder});
  return {window, root, clock, store, options: () => options,
    entry: value => observer({getEntries: () => [value]}),
    flush() {for (const [id, fn] of [...timers]) {timers.delete(id); fn();}},
    dispatch(name, event = {}) {(windowEvents[name] || []).forEach(fn => fn(event));},
    visibility(hidden) {document.hidden = hidden; (documentEvents.visibilitychange || []).forEach(fn => fn());},
    recorded() {
      const days = {};
      for (const [key, raw] of store) if (key.startsWith('jini-network-usage-v1:')) {
        for (const [day, row] of Object.entries(JSON.parse(raw).days)) {
          const total = days[day] ||= {download: 0, upload: 0, unknown: 0};
          for (const field of ['download', 'upload', 'unknown']) total[field] += row[field];
        }
      }
      return days;
    }};
}
function resource(overrides = {}) {
  return {entryType: 'resource', name: 'https://16jweb.github.io/JINI/words.js', startTime: 10,
    responseEnd: 100, transferSize: 2048, decodedBodySize: 9000, ...overrides};
}

test('resource timing counts transferred compressed bytes once and cached files add zero', () => {
  const h = harness(), entry = resource();
  assert.equal(h.options().buffered, true);
  h.entry(entry); h.entry(entry);
  h.entry(resource({name: 'https://16jweb.github.io/JINI/styles.css', transferSize: 0}));
  h.flush();
  assert.deepEqual(h.recorded()['2026-10-21'], {download: 2048, upload: 0, unknown: 0});
  assert.match(h.root.innerHTML, /2\.0 KB/);
});

test('Drive request bodies count UTF-8 bytes without double-counting resource timings', () => {
  const h = harness();
  h.entry(resource({name: 'https://www.googleapis.com/drive/v3/files/backup', transferSize: 3000}));
  h.entry(resource({name: 'https://www.googleapis.com/upload/drive/v3/files/backup', transferSize: 4000}));
  h.window.JINI_NETWORK_USAGE.recordDrive('한글', '{"ok":true}'); h.flush();
  assert.deepEqual(h.recorded()['2026-10-21'], {download: 11, upload: 6, unknown: 0});
});

test('opaque cross-origin transfers remain unknown rather than being called cache hits', () => {
  const h = harness();
  h.entry(resource({name: 'https://accounts.google.com/gsi/client', transferSize: 0, decodedBodySize: 0}));
  h.entry(resource({name: 'data:text/plain,ignored', transferSize: 500}));
  h.entry(resource({name: 'chrome-extension://example/extension.js', transferSize: 500})); h.flush();
  assert.deepEqual(h.recorded()['2026-10-21'], {download: 0, upload: 0, unknown: 1});
  assert.match(h.root.innerHTML, /확인할 수 없는 요청 1건/);
});

test('navigation responses and requests crossing midnight use local completion dates', () => {
  const h = harness({navigation: [resource({entryType: 'navigation', name: 'https://16jweb.github.io/JINI/', transferSize: 1000})]});
  h.flush();
  h.clock.now = new Date(2026, 9, 22, 0, 1).getTime();
  h.window.JINI_NETWORK_USAGE.recordDrive('abc', 'hello'); h.flush();
  assert.deepEqual(h.recorded()['2026-10-21'], {download: 1000, upload: 0, unknown: 0});
  assert.deepEqual(h.recorded()['2026-10-22'], {download: 5, upload: 3, unknown: 0});
  assert.match(h.root.innerHTML, /오늘 사용량/);
});

test('separate tabs accumulate independently and a reload preserves daily history', () => {
  const store = new Map(), first = harness({store}), second = harness({store});
  first.window.JINI_NETWORK_USAGE.recordDrive('', 'aaa'); first.flush();
  second.window.JINI_NETWORK_USAGE.recordDrive('', 'bbbb'); second.flush();
  first.window.JINI_NETWORK_USAGE.recordDrive('', 'cc'); first.flush();
  const reloaded = harness({store});
  assert.equal(reloaded.recorded()['2026-10-21'].download, 9);
  assert.match(reloaded.root.innerHTML, />9 B<\/strong>/);
  assert.match(reloaded.root.innerHTML, /2026-10-20<\/th><td>기록 없음/);
});

test('the history disclosure stays open when another request updates usage', () => {
  const h = harness(); h.root.expanded = true;
  h.window.JINI_NETWORK_USAGE.recordDrive('', 'a'); h.flush();
  assert.match(h.root.innerHTML, /class="jsy-usage-history" open/);
});

test('fallback timing collection is deduplicated on return and flushes when leaving', () => {
  const h = harness({noObserver: true, initialResources: [resource()]});
  h.visibility(false); h.dispatch('pagehide');
  assert.equal(h.recorded()['2026-10-21'].download, 2048);
  h.window.JINI_NETWORK_USAGE.recordDrive('ab', 'c'); h.visibility(true);
  assert.equal(h.recorded()['2026-10-21'].upload, 2);
});

test('unavailable performance or storage does not stop Drive metering and explains limits', () => {
  const h = harness({noPerformance: true, unavailableStorage: true});
  assert.doesNotThrow(() => {h.window.JINI_NETWORK_USAGE.recordDrive('ab', 'c'); h.flush();});
  assert.match(h.root.innerHTML, />3 B<\/strong>/);
  assert.match(h.root.innerHTML, /현재 열린 화면의 집계만/);
  assert.match(h.root.innerHTML, /Drive 통신만 집계/);
});

test('daily totals ignore malformed or obsolete records and never render stored HTML', () => {
  const store = new Map([
    ['jini-network-usage-v1:bad', '{oops'],
    ['jini-network-usage-v1:invalid', JSON.stringify({schema: 1, days: {
      '2026-10-21': {download: '10000', upload: -10, unknown: '<script>'},
      '2020-01-01': {download: 999999, upload: 0, unknown: 0},
      '<script>': {download: 100, upload: 0, unknown: 0}}})]
  ]);
  const h = harness({store});
  assert.match(h.root.innerHTML, />0 B<\/strong>/);
  assert.doesNotMatch(h.root.innerHTML, /<script>/);
});

test('expired tab journals are pruned while other JINI records remain intact', () => {
  const store = new Map([
    ['jini-network-usage-v1:expired', JSON.stringify({schema: 1, days: {'2020-01-01': {download: 1}}})],
    ['jini-network-usage-v1:recent', JSON.stringify({schema: 1, days: {'2026-10-21': {download: 2}}})],
    ['jini-english-game-v1', '{"xp":1400}']
  ]);
  const h = harness({store});
  assert.equal(store.has('jini-network-usage-v1:expired'), false);
  assert.equal(store.get('jini-english-game-v1'), '{"xp":1400}');
  assert.match(h.root.innerHTML, />2 B<\/strong>/);
});

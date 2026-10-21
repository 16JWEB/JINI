const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const KEY = 'jini-study-time-v1';
const read = name => fs.readFileSync(path.join(__dirname, '..', name), 'utf8');

function harness(initial = {}) {
  const clock = {now: new Date(2026, 9, 21, 12).getTime()};
  class ClockDate extends Date {
    constructor(...args) {super(...(args.length ? args : [clock.now]));}
    static now() {return clock.now;}
  }
  const stored = new Map(Object.entries(initial)), writes = [], timers = [];
  const listeners = {}, documentListeners = {};
  class Element {
    constructor() {this.events = {}; this.dataset = {}; this.attributes = {}; this.open = false;}
    addEventListener(name, fn) {this.events[name] = fn;}
    setAttribute(key, value) {this.attributes[key] = value;}
    getAttribute(key) {return this.attributes[key];}
  }
  class Panel extends Element {
    constructor(study) {super(); this.dataset = {jiniCharacterPanel: study, jiniCharacterHome: 'true'};}
    set innerHTML(html) {
      this.html = html;
      this.field = {textContent: html.match(/data-jgc-today-study="[^"]+">([^<]*)/)[1]};
      this.card = new Element(); this.card.setAttribute('aria-label', html.match(/aria-label="([^"]+)"/)[1]);
    }
    querySelector(selector) {return selector === '.jgc-home-card' ? this.card : this.field;}
  }
  const panels = {english: new Panel('english'), korean: new Panel('korean')};
  const timeRoot = new Element(), dialog = new Element();
  const document = {hidden: false, getElementById: id => id === 'jini-study-time-root' ? timeRoot :
    id === 'jini-character-dialog' ? dialog : null,
    querySelectorAll: () => Object.values(panels), querySelector: () => null,
    addEventListener(name, fn) {(documentListeners[name] ||= []).push(fn);}};
  const window = {addEventListener(name, fn) {(listeners[name] ||= []).push(fn);},
    dispatchEvent(event) {(listeners[event.type] || []).forEach(fn => fn(event));},
    setInterval: fn => timers.push(fn)};
  const context = vm.createContext({window, document, Date: ClockDate, Event,
    localStorage: {getItem: key => stored.get(key) ?? null, setItem(key, value) {stored.set(key, value); writes.push(key);}}});
  vm.runInContext(read('study-time.js'), context);
  vm.runInContext(read('game-character.js'), context);
  return {window, document, clock, panels, stored, writes,
    navigate: page => window.JINI_STUDY_TIME.navigate(page),
    tick(seconds = 10) {clock.now += seconds * 1000; timers.forEach(fn => fn());},
    activity() {(documentListeners.pointerdown || []).forEach(fn => fn());},
    dispatch(type, fields = {}) {(listeners[type] || []).forEach(fn => fn({type, ...fields}));},
    today: study => window.JINI_STUDY_TIME.getToday(study),
    label: study => panels[study].field.textContent};
}
function studyRecord(englishMs, koreanMs) {
  return JSON.stringify({schema: 1, deviceId: 'test-device', days: {
    '2026-10-20': {englishMs: 900000, koreanMs: 900000},
    '2026-10-21': {englishMs, koreanMs}}});
}

test('home cards show only today’s time for their own language using the shared study records', () => {
  const h = harness({[KEY]: studyRecord(425000, 125000)});
  assert.equal(h.label('english'), '7분');
  assert.equal(h.label('korean'), '2분');
  assert.equal(h.today('english').milliseconds, 425000);
  assert.match(h.panels.english.html, /오늘 학습시간/);
  assert.match(h.panels.english.card.getAttribute('aria-label'), /오늘 영어 학습시간 7분/);
  assert.match(h.panels.korean.card.getAttribute('aria-label'), /오늘 한글 학습시간 2분/);
  assert.equal(h.writes.length, 0, 'displaying existing time must not rewrite progress');
});

test('learning and returning home updates each card without recreating it or changing XP/rewards', () => {
  const h = harness();
  const firstCard = h.panels.english.card;
  h.navigate('player');
  for (let i = 0; i < 6; i++) h.tick();
  h.navigate('home');
  assert.equal(h.label('english'), '1분'); assert.equal(h.label('korean'), '0분');
  h.navigate('ko-expression-player');
  for (let i = 0; i < 12; i++) {if (i === 6) h.activity(); h.tick();}
  h.navigate('home');
  assert.equal(h.label('english'), '1분'); assert.equal(h.label('korean'), '2분');
  assert.equal(h.panels.english.card, firstCard);
  assert.ok(h.writes.every(key => key === KEY), 'time updates must not grant XP or queue character rewards');
  const reloaded = harness(Object.fromEntries(h.stored));
  assert.equal(reloaded.label('english'), '1분'); assert.equal(reloaded.label('korean'), '2분');
});

test('home is not counted as study and midnight resets both display values', () => {
  const h = harness({[KEY]: studyRecord(120000, 180000)});
  h.tick(10);
  assert.equal(h.today('english').milliseconds, 120000);
  h.clock.now = new Date(2026, 9, 22, 0, 0).getTime(); h.tick();
  assert.equal(h.label('english'), '0분'); assert.equal(h.label('korean'), '0분');
  assert.equal(h.writes.length, 0);
});

test('Drive merge and another tab’s study-time updates refresh the existing home cards', () => {
  const h = harness();
  h.stored.set(KEY, studyRecord(3600000, 25000)); h.dispatch('jini-learning-progress-merged');
  assert.equal(h.label('english'), '1시간'); assert.equal(h.label('korean'), '1분 미만');
  h.stored.set(KEY, studyRecord(3660000, 180000)); h.dispatch('storage', {key: KEY});
  assert.equal(h.label('english'), '1시간 1분'); assert.equal(h.label('korean'), '3분');
  assert.match(h.panels.korean.card.getAttribute('aria-label'), /오늘 한글 학습시간 3분/);
});

test('idle time is not added to the home card’s study total', () => {
  const h = harness(); h.navigate('vocabulary');
  for (let i = 0; i < 18; i++) h.tick();
  h.navigate('home');
  assert.equal(h.today('english').milliseconds, 90000);
  assert.equal(h.label('english'), '1분'); assert.equal(h.label('korean'), '0분');
});

test('missing or invalid daily times render safe zero values', () => {
  for (const initial of [{}, {[KEY]: '{oops'}, {[KEY]: studyRecord('not-a-number', -1000)}]) {
    const h = harness(initial);
    assert.equal(h.label('english'), '0분'); assert.equal(h.label('korean'), '0분');
  }
});

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

// Exercise the actual modules and shipped lesson data with an in-memory DOM
// and storage. Audio and browser layout are outside these navigation tests.
class Element {
  constructor() {
    this.children = []; this.dataset = {}; this.style = {}; this.attributes = {};
    this.events = {}; this.value = ''; this.hidden = false; this._text = '';
    this.className = '';
    this.classList = {add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false};
  }
  set textContent(value) {this._text = String(value); this.children = [];}
  get textContent() {return this._text + this.children.map(c => c.textContent).join('');}
  set innerHTML(value) {this._html = value; this.children = []; this._text = '';}
  get innerHTML() {return this._html || '';}
  get options() {return this.children;}
  get innerText() {return this.textContent;}
  appendChild(child) {this.children.push(child); child.parentElement = this; return child;}
  append(...children) {children.forEach(c => this.appendChild(c));}
  replaceChildren(...children) {this.children = []; this._text = ''; this.append(...children);}
  setAttribute(key, value) {this.attributes[key] = String(value);}
  getAttribute(key) {return this.attributes[key];}
  addEventListener(name, fn) {(this.events[name] ||= []).push(fn);}
  dispatch(name) {(this.events[name] || []).forEach(fn => fn({currentTarget: this, target: this, preventDefault() {}}));}
  click() {if (!this.disabled) this.dispatch('click');}
  querySelector() {return new Element();}
  querySelectorAll() {return [];}
  closest() {return null;}
  scrollIntoView() {}
  focus() {}
  blur() {}
}
function harness(initial = {}) {
  const entries = new Map(Object.entries(initial));
  const storage = {getItem: key => entries.get(key) ?? null,
    setItem: (key, value) => entries.set(key, String(value))};
  const fields = new Map();
  const element = id => {if (!fields.has(id)) fields.set(id, new Element()); return fields.get(id);};
  const filters = ['all', '초등', '중등', '고등'].map(level => Object.assign(new Element(), {dataset: {level}}));
  const levels = ['초등', '중등', '고등'].map(playerLevel => Object.assign(new Element(), {dataset: {playerLevel}}));
  const modes = ['word-meaning', 'word-meaning-example'].map(playerMode => Object.assign(new Element(), {dataset: {playerMode}}));
  const selectors = new Map();
  const windowListeners = {};
  const historyEntries = [null];
  let historyIndex = 0;
  const document = {getElementById: element, createElement: () => new Element(),
    createTextNode: text => Object.assign(new Element(), {_text: text}), addEventListener() {},
    querySelector: selector => {
      if (selector.startsWith('.player-mode-button[')) return modes.find(m => selector.includes(m.dataset.playerMode));
      if (!selectors.has(selector)) selectors.set(selector, new Element());
      return selectors.get(selector);
    },
    querySelectorAll: selector => {
      if (selector.endsWith('.filter-chip')) return filters;
      if (selector.endsWith('.player-level')) return levels;
      if (selector === '.player-mode-button') return modes;
      return [];
    }};
  const window = {document, localStorage: storage, navigator: {userAgent: ''},
    location: {href: 'https://jini.test/', hash: ''}, history: {
      get state() {return historyEntries[historyIndex];},
      get length() {return historyEntries.length;},
      pushState(state) {historyEntries.splice(++historyIndex); historyEntries.push(state);},
      back() {
        if (!historyIndex) return;
        historyIndex--;
        (windowListeners.popstate || []).forEach(fn => fn({state: historyEntries[historyIndex]}));
      }
    },
    addEventListener(name, fn) {(windowListeners[name] ||= []).push(fn);}, setTimeout() {}, clearTimeout() {}, scrollY: 0,
    requestAnimationFrame: fn => fn(), scrollTo() {}, matchMedia: () => ({matches: false})};
  const context = vm.createContext({window, document, localStorage: storage, console});
  const scripts = [...read('index.html').matchAll(/<script src="([^"?]+)(?:\?[^\"]*)?"/g)].map(m => m[1]);
  for (const file of scripts.slice(0, scripts.indexOf('app.js'))) {
    if (file !== 'study-time.js') vm.runInContext(read(file), context, {filename: file});
  }
  let app = read('app.js');
  app = app.replace('  const mockBackButton =', `
  window.testAPI = {setPage, setLevel, setPlayerLevel, setExpressionPlayerCategory, setPlayerMode, togglePlayerBookmark,
    goToPage, renderWords, renderStudyPagination,
    state: () => ({currentPageView, currentStudy, currentPage, activeLevel, playerLevel,
      playerIndex, playerMode, expressionPlayerCategory, query: search.value, count: playerWords.length}),
    query: value => {search.value = value; currentPage = 1; renderWords();},
    playerIndex: value => {playerIndex = value; updatePlayerCard();}};
  const mockBackButton =`);
  vm.runInContext(app, context, {filename: 'app.js'});
  for (const file of scripts.slice(scripts.indexOf('app.js') + 1, scripts.indexOf('english-expressions.js') + 1)) {
    if (file.startsWith('english-expressions')) vm.runInContext(read(file), context, {filename: file});
  }
  return {api: window.testAPI, window, element, entries, snapshot: () => Object.fromEntries(entries),
    back: () => window.history.back(),
    category: name => element('ee-categories').children.find(c => c.textContent.startsWith(name + ' ')),
    playerCategory: name => element('player-categories').children.find(c => c.dataset.expressionCategory === name)};
}

test('grade counts agree between vocabulary and playback using the shipped data', () => {
  const h = harness();
  for (const name of ['elementary', 'middle', 'high']) {
    assert.equal(h.element('count-' + name).textContent, h.element('player-count-' + name).textContent);
    assert.match(h.element('count-' + name).textContent, /^[1-9]\d*개$/);
  }
});

test('grade lists remember separate pages across switches and reload', () => {
  let h = harness();
  h.api.setPage('vocabulary'); h.api.setLevel('초등'); h.api.goToPage(3);
  h.api.setLevel('중등'); h.api.goToPage(6);
  h.api.setLevel('초등'); assert.equal(h.api.state().currentPage, 3);
  h = harness(h.snapshot()); h.api.setPage('vocabulary');
  assert.equal(h.api.state().activeLevel, '초등'); assert.equal(h.api.state().currentPage, 3);
  h.api.setLevel('중등'); assert.equal(h.api.state().currentPage, 6);
});

test('Korean word and expression lists keep separate queries and pages', () => {
  let h = harness();
  h.api.setPage('vocabulary'); h.api.query('apple');
  h.api.setPage('ko-vocabulary'); assert.equal(h.api.state().query, '');
  h.api.goToPage(3);
  assert.equal(h.element('korean-list-count').textContent, h.window.KOREAN_WORDS.length + '개');
  h.api.setPage('ko-expressions'); assert.equal(h.api.state().currentPage, 1);
  assert.equal(h.element('korean-list-count').textContent, h.window.KOREAN_EXPRESSIONS.length + '개');
  h.api.goToPage(2); h.api.setPage('ko-vocabulary'); assert.equal(h.api.state().currentPage, 3);
  h = harness(h.snapshot()); h.api.setPage('ko-expressions'); assert.equal(h.api.state().currentPage, 2);
  const positions = JSON.parse(h.entries.get('jini-last-study-state')).pages;
  assert.equal(positions['ko-vocabulary'].koreanOrderVersion, 1);
  assert.equal(positions['ko-expressions'].koreanOrderVersion, 1);
});

test('word playback restores the position and mode of each grade', () => {
  const h = harness();
  h.api.setPage('player'); h.api.playerIndex(4); h.api.setPlayerMode('word-meaning');
  h.api.setPlayerLevel('중등'); h.api.playerIndex(8);
  assert.equal(h.api.state().playerMode, 'word-meaning-example');
  h.api.setPlayerLevel('초등'); assert.equal(h.api.state().playerIndex, 4);
  assert.equal(h.api.state().playerMode, 'word-meaning');
});

test('expression categories show matching counts in the list and player', () => {
  const h = harness(); h.api.setPage('english-expression-player');
  for (const category of h.window.JINI_EXPRESSION_CATEGORIES) {
    assert.equal(h.category(category).textContent, h.playerCategory(category).textContent);
  }
  assert.equal(h.api.state().count, h.window.JINI_ESSENTIAL_EXPRESSIONS.length);
});

test('expression playback remembers category positions and modes after reload', () => {
  let h = harness(); h.api.setPage('english-expression-player');
  h.api.setExpressionPlayerCategory('일상'); h.api.playerIndex(4); h.api.setPlayerMode('word-meaning');
  h.api.setExpressionPlayerCategory('여행'); h.api.playerIndex(8);
  assert.equal(h.api.state().playerMode, 'word-meaning-example');
  h.api.setExpressionPlayerCategory('일상'); assert.equal(h.api.state().playerIndex, 4);
  assert.equal(h.api.state().playerMode, 'word-meaning');
  h = harness(h.snapshot()); h.api.setPage('english-expression-player');
  assert.equal(h.api.state().expressionPlayerCategory, '일상'); assert.equal(h.api.state().playerIndex, 4);
  h.api.setExpressionPlayerCategory('여행'); assert.equal(h.api.state().playerIndex, 8);
});

test('empty expression bookmarks clear the old card and disable playback', () => {
  const h = harness(); h.api.setPage('english-expression-player'); h.api.playerIndex(6);
  h.api.setExpressionPlayerCategory('책갈피');
  assert.equal(h.api.state().count, 0); assert.equal(h.element('player-progress').textContent, '0 / 0 표현');
  assert.equal(h.element('toggle-playback').disabled, true);
  assert.equal(h.element('player-example').textContent, '');
  h.api.setExpressionPlayerCategory('전체');
  assert.equal(h.api.state().playerIndex, 6); assert.equal(h.element('toggle-playback').disabled, false);
});

test('expression bookmark changes update category counts and filtered playback immediately', () => {
  const h = harness(); h.api.setPage('english-expression-player'); h.api.playerIndex(6);
  h.api.togglePlayerBookmark();
  assert.equal(h.playerCategory('책갈피').textContent, '책갈피 1개');
  h.api.setExpressionPlayerCategory('책갈피');
  assert.equal(h.api.state().count, 1);
  h.api.togglePlayerBookmark();
  assert.equal(h.playerCategory('책갈피').textContent, '책갈피 0개');
  assert.equal(h.api.state().count, 0);
  assert.equal(h.element('toggle-playback').disabled, true);
});

test('a saved expression outside the current category opens the correct player item', () => {
  const h = harness(); h.api.setPage('english-expression-player'); h.api.setExpressionPlayerCategory('여행');
  h.api.playerIndex(5); const expected = h.element('player-word').textContent;
  h.api.togglePlayerBookmark(); h.api.setExpressionPlayerCategory('일상');
  h.element('player-bookmarks').children[0].children[0].click();
  assert.equal(h.api.state().expressionPlayerCategory, '전체');
  assert.equal(h.element('player-word').textContent, expected);
});

test('Korean word and expression players remember their own positions and modes', () => {
  let h = harness(); h.api.setPage('ko-player'); h.api.playerIndex(4); h.api.setPlayerMode('word-meaning');
  h.api.setPage('ko-expression-player'); assert.equal(h.api.state().playerMode, 'word-meaning-example');
  h.api.playerIndex(8); h.api.setPage('ko-player'); assert.equal(h.api.state().playerIndex, 4);
  assert.equal(h.api.state().playerMode, 'word-meaning');
  h = harness(h.snapshot()); h.api.setPage('ko-expression-player'); assert.equal(h.api.state().playerIndex, 8);
});

test('English expression pagination shares word-list controls and category memory', () => {
  let h = harness(); h.api.setPage('english-expressions'); h.category('일상').click();
  let select = h.element('ee-pagination').children[0];
  assert.equal(select.className, 'page-select'); select.value = '3'; select.dispatch('change');
  h.category('여행').click(); h.category('일상').click();
  assert.equal(JSON.parse(h.entries.get('jini-essential-expressions-positions-v1')).categories['일상'].page, 3);
  assert(h.element('ee-pagination').children.some(c => c.textContent === '+10'));
  h = harness(h.snapshot());
  assert.equal(JSON.parse(h.entries.get('jini-essential-expressions-positions-v1')).categories['일상'].page, 3);
});

test('HTML has unique IDs and all local scripts and styles exist', () => {
  const html = read('index.html');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size);
  for (const match of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css)(?:\?[^" ]*)?)"/g)) {
    if (/^https?:/.test(match[1])) continue;
    assert(fs.existsSync(path.join(root, match[1].split('?')[0])), match[1]);
  }
});

test('English learning pages return to the English menu before Home', () => {
  const h = harness();
  for (const page of ['vocabulary', 'player', 'english-expressions', 'english-expression-player', 'verb-forms', 'english-game', 'speaking']) {
    h.api.setPage(page); h.back();
    assert.equal(h.api.state().currentPageView, 'study-menu', page);
    assert.equal(h.element('english-study-hub').hidden, false);
    h.back(); assert.equal(h.api.state().currentPageView, 'home');
    assert.equal(h.window.history.length, 2, 'repeated in-app Back must not grow the history guard');
  }
});

test('Korean learning pages return to the Korean menu before Home', () => {
  const h = harness();
  for (const page of ['ko-vocabulary', 'ko-player', 'ko-expressions', 'ko-expression-player', 'ko-game']) {
    h.api.setPage(page); h.back();
    assert.equal(h.api.state().currentPageView, 'ko-study-menu', page);
    assert.equal(h.element('korean-study-hub').hidden, false);
    h.back(); assert.equal(h.api.state().currentPageView, 'home');
  }
});

test('speaking practice returns one parent at a time even without a child back hook', () => {
  const h = harness(); h.api.setPage('opic-basic');
  for (const parent of ['opic', 'speaking', 'study-menu', 'home']) {
    h.back(); assert.equal(h.api.state().currentPageView, parent);
  }
  h.back();
  assert.equal(h.api.state().currentPageView, 'home');
  assert.equal(h.window.history.state, null, 'Back at Home must not reinsert a guard indefinitely');
});

test('the speaking child back hook preserves the guard for the next parent', () => {
  const h = harness();
  h.window.JINI_OPIC_BACK = () => {h.api.setPage('opic'); return true;};
  h.api.setPage('opic-basic'); h.back();
  assert.equal(h.api.state().currentPageView, 'opic');
  assert.equal(h.window.history.state.jiniHome, true);
  h.back(); assert.equal(h.api.state().currentPageView, 'speaking');
  h.back(); assert.equal(h.api.state().currentPageView, 'study-menu');
});

test('active exercises retain their game-list back step before the language menu', () => {
  const h = harness();
  for (const [page, hook, flag, parent] of [
    ['english-game', 'JINI_ENGLISH_GAME_BACK', 'jiniEnglishGame', 'study-menu'],
    ['ko-game', 'JINI_KOREAN_GAME_BACK', 'jiniKoreanGame', 'ko-study-menu']]) {
    let active = true;
    h.window[hook] = () => {if (!active) return false; active = false; return true;};
    h.api.setPage(page);
    h.window.history.pushState({jiniHome: true, [flag]: true});
    h.back(); assert.equal(h.api.state().currentPageView, page);
    h.back(); assert.equal(h.api.state().currentPageView, parent);
    h.back(); assert.equal(h.api.state().currentPageView, 'home');
  }
});

test('mock practice returns to Speaking from both browser Back and its page button', () => {
  const h = harness();
  h.api.setPage('vocabulary'); h.api.setPage('opic-mock'); h.back();
  assert.equal(h.api.state().currentPageView, 'speaking');
  h.api.setPage('home'); h.api.setPage('opic-mock'); h.element('opic-mock-back').click();
  assert.equal(h.api.state().currentPageView, 'speaking');
});

test('sync and Korean voice installation return to their contextual parent', () => {
  const h = harness();
  h.api.setPage('ko-expressions'); h.api.setPage('sync'); h.back();
  assert.equal(h.api.state().currentPageView, 'ko-expressions');
  h.back(); assert.equal(h.api.state().currentPageView, 'ko-study-menu');
  h.api.setPage('ko-language-packs');
  for (const parent of ['ko-player', 'ko-study-menu', 'home']) {
    h.back(); assert.equal(h.api.state().currentPageView, parent);
  }
});

test('returning through a parent menu preserves the saved learning page', () => {
  const h = harness();
  h.api.setPage('vocabulary'); h.api.setLevel('중등'); h.api.goToPage(4);
  h.back(); assert.equal(h.api.state().currentPageView, 'study-menu');
  h.api.setPage('vocabulary');
  assert.equal(h.api.state().activeLevel, '중등'); assert.equal(h.api.state().currentPage, 4);
  h.api.setPage('ko-expressions'); h.api.goToPage(3); h.back();
  assert.equal(h.api.state().currentPageView, 'ko-study-menu');
  h.api.setPage('ko-expressions'); assert.equal(h.api.state().currentPage, 3);
});

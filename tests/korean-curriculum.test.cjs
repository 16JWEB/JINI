const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const {test} = require('node:test');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const source = read('korean-learning-order-data.js');
const manifestStart = source.indexOf('  const curriculum = ') + '  const curriculum = '.length;
const manifest = JSON.parse(source.slice(manifestStart, source.indexOf(';\n  const VERSION', manifestStart)));
const dataContext = vm.createContext({window: {}});
const files = [...read('index.html').matchAll(/<script src="([^"?]+)(?:\?[^\"]*)?"/g)].map(m => m[1]);
for (const file of files.slice(0, files.indexOf('app.js'))) {
  if (!['study-time.js', 'english-learning-order-data.js', 'korean-learning-order-data.js'].includes(file))
    vm.runInContext(read(file), dataContext, {filename: file});
}
const original = {
  words: structuredClone(dataContext.window.KOREAN_WORDS),
  expressions: structuredClone(dataContext.window.KOREAN_EXPRESSIONS),
  english: structuredClone(dataContext.window.WORDS)
};
function filtered(items, query) {
  const q = String(query || '').trim().toLocaleLowerCase('ko');
  return items.filter(item => (item.word + ' ' + item.meaning + ' ' + item.example + ' ' + item.exampleKo + ' ' +
    (item.otherSenses || []).map(s => s.meaning).join(' ')).toLocaleLowerCase('ko').includes(q));
}
function harness(initial = {}, extra = []) {
  const records = new Map(Object.entries(initial));
  let writes = 0;
  const window = {KOREAN_WORDS: structuredClone(original.words).concat(extra),
    KOREAN_EXPRESSIONS: structuredClone(original.expressions), WORDS: structuredClone(original.english)};
  const context = vm.createContext({window, localStorage: {
    getItem: key => records.get(key) ?? null,
    setItem: (key, value) => {records.set(key, value); writes++;}
  }});
  vm.runInContext(source, context);
  return {window, records, context, writes: () => writes,
    read: key => JSON.parse(records.get(key)), rerun: () => vm.runInContext(source, context)};
}
const index = (items, word) => items.findIndex(item => item.word === word);

test('Korean curriculum keeps all 763 words and 700 expressions with their original content and game identities', () => {
  const h = harness();
  for (const [before, after, count] of [[original.words, h.window.KOREAN_WORDS, 763],
    [original.expressions, h.window.KOREAN_EXPRESSIONS, 700]]) {
    assert.equal(after.length, count);
    assert.equal(new Set(after.map(x => x.word)).size, count);
    const contents = new Map(before.map(x => [x.word, JSON.stringify(x)]));
    for (const item of after) assert.equal(JSON.stringify(item), contents.get(item.word), item.word);
  }
  assert.equal(JSON.stringify(h.window.WORDS), JSON.stringify(original.english));
  assert.equal(new Set(Object.values(manifest.words).flat()).size, 763);
  assert.equal(new Set(Object.values(manifest.expressions).flat()).size, 700);
  for (const [items, groups] of [[original.words, manifest.words], [original.expressions, manifest.expressions]]) {
    const known = new Set(Object.values(groups).flat());
    for (const item of items) assert(known.has(item.word), 'missing curriculum position: ' + item.word);
  }
});

test('basic words lead into topic groups and later additions join their related learning material', () => {
  const h = harness(), words = h.window.KOREAN_WORDS, phrases = h.window.KOREAN_EXPRESSIONS;
  assert.equal(words[0].word, '안녕하세요');
  assert(index(words, '있다') < index(words, '월급'));
  assert(index(words, '바닥') < index(words, '학교'));
  assert(Math.abs(index(words, '신발장') - index(words, '신발')) <= 2);
  assert(Math.abs(index(words, '전등') - index(words, '전구')) <= 2);
  assert(index(words, '가다') < index(words, '환승'));
  assert.equal(phrases[0].word, '안녕하세요?');
  assert(index(phrases, '주문 먼저 해도 될까요?') < index(phrases, '오늘 회의는 몇 시에 시작해요?'));
  assert(Math.abs(index(phrases, '전등이 깜빡거려요.') - index(phrases, '전등이 깜빡거리다가 꺼졌어요.')) <= 2);
});

test('existing Korean page bookmarks and saved list states follow the same anchor after reordering', () => {
  const page = 64, anchor = original.words[(page - 1) * 10].word;
  const englishBookmark = {study: 'english', level: '초등', page: 9, query: ''};
  const state = {page: 'ko-vocabulary', study: 'korean', pageNumber: page, query: '', selectedVocabularyIndex: -1, scrollY: 800};
  const englishState = {page: 'vocabulary', study: 'english', pageNumber: 12, query: 'a'};
  const progress = '{"xp":170,"items":{"word:집":{"xpAwarded":true}}}';
  const h = harness({
    'jini-learning-bookmarks': JSON.stringify({vocabulary: [englishBookmark, {study: 'korean', level: 'all', page, query: ''}], player: []}),
    'jini-last-study-state': JSON.stringify({english: englishState, korean: state, pages: {'ko-vocabulary': state}}),
    'jini-korean-games-v1': progress
  });
  const destination = index(h.window.KOREAN_WORDS, anchor);
  const bookmark = h.read('jini-learning-bookmarks').vocabulary[1];
  assert.equal(bookmark.anchorWord, anchor);
  assert.equal(bookmark.page, Math.floor(destination / 10) + 1);
  for (const saved of [h.read('jini-last-study-state').korean, h.read('jini-last-study-state').pages['ko-vocabulary']]) {
    assert.equal(saved.pageNumber, bookmark.page);
    assert.equal(saved.selectedVocabularyIndex, destination);
    assert.equal(saved.vocabularyAnchorWord, anchor);
    assert.equal(saved.scrollY, 0);
  }
  assert.deepEqual(h.read('jini-learning-bookmarks').vocabulary[0], englishBookmark);
  assert.deepEqual(h.read('jini-last-study-state').english, englishState);
  assert.equal(h.records.get('jini-korean-games-v1'), progress);
});

test('Korean expression pages and word/expression playback bookmarks retain their actual items', () => {
  const phraseAnchor = original.expressions[650].word, wordAnchor = original.words[640].word;
  const h = harness({
    'jini-learning-bookmarks': JSON.stringify({vocabulary: [], player: [
      {study: 'korean', type: 'word', level: '기초', word: wordAnchor, index: 640, page: 65},
      {study: 'korean', type: 'expression', level: '일상 표현', word: phraseAnchor, index: 650, page: 66}]}),
    'jini-last-study-state': JSON.stringify({pages: {
      'ko-expressions': {page: 'ko-expressions', pageNumber: 66, query: '', selectedVocabularyIndex: 650},
      'ko-player': {page: 'ko-player', playerIndex: 640, playerWord: wordAnchor},
      'ko-expression-player': {page: 'ko-expression-player', playerIndex: 650, playerWord: phraseAnchor}
    }})
  });
  const phraseIndex = index(h.window.KOREAN_EXPRESSIONS, phraseAnchor), wordIndex = index(h.window.KOREAN_WORDS, wordAnchor);
  const states = h.read('jini-last-study-state').pages;
  assert.equal(states['ko-expressions'].selectedVocabularyIndex, phraseIndex);
  assert.equal(states['ko-expressions'].pageNumber, Math.floor(phraseIndex / 10) + 1);
  assert.equal(states['ko-player'].playerIndex, wordIndex);
  assert.equal(states['ko-expression-player'].playerIndex, phraseIndex);
  assert.equal(h.read('jini-learning-bookmarks').player[0].index, wordIndex);
  assert.equal(h.read('jini-learning-bookmarks').player[1].index, phraseIndex);
});

test('search-filtered page anchors use the same search fields as the application', () => {
  const query = '약', selected = 4, anchor = filtered(original.words, query)[selected].word;
  const h = harness({'jini-last-study-state': JSON.stringify({page: 'ko-vocabulary', pageNumber: 1,
    query, selectedVocabularyIndex: selected})});
  const saved = h.read('jini-last-study-state');
  assert.equal(saved.query, query);
  assert.equal(saved.selectedVocabularyIndex, index(filtered(h.window.KOREAN_WORDS, query), anchor));
});

test('migrated or newly saved positions are not remapped again on subsequent loads', () => {
  const state = {page: 'ko-vocabulary', pageNumber: 3, selectedVocabularyIndex: 24, query: '', koreanOrderVersion: 1};
  const raw = JSON.stringify({korean: state, pages: {'ko-vocabulary': state}});
  const h = harness({'jini-last-study-state': raw});
  assert.equal(h.records.get('jini-last-study-state'), raw);
  const arranged = JSON.stringify(h.window.KOREAN_WORDS);
  h.rerun();
  assert.equal(h.records.get('jini-last-study-state'), raw);
  assert.equal(JSON.stringify(h.window.KOREAN_WORDS), arranged);
  assert.equal(h.writes(), 0);
});

test('legacy positions restored from an older backup can still be migrated later', () => {
  const h = harness();
  const anchor = original.words[40].word;
  h.records.set('jini-last-study-state', JSON.stringify({page: 'ko-player', playerIndex: 40, playerWord: anchor}));
  h.window.JINI_KOREAN_CURRICULUM.migrateStoredPositions();
  assert.equal(h.read('jini-last-study-state').playerIndex, index(h.window.KOREAN_WORDS, anchor));
});

test('invalid storage is kept intact and future content remains available', () => {
  const extra = {word: '새로운 학습 단어', meaning: 'new', example: '', exampleKo: ''};
  const h = harness({'jini-last-study-state': '{invalid'}, [extra]);
  assert.equal(h.records.get('jini-last-study-state'), '{invalid');
  assert.equal(h.window.KOREAN_WORDS.length, 764);
  assert.equal(h.window.KOREAN_WORDS.at(-1).word, extra.word);
});

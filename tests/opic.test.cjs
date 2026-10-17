/* No packages needed: node --test tests/opic.test.cjs */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = { window: {} };
vm.runInNewContext(read('opic-data.js'), context);
const questions = context.window.JINI_OPIC_QUESTIONS;

test('20 questions have unique IDs, required content and varied sample answers', () => {
  assert.equal(questions.length, 20);
  assert.equal(new Set(questions.map(q => q.id)).size, 20);
  const answers = new Set();
  for (const q of questions) {
    for (const field of ['id', 'topic', 'en', 'ko', 'hint', 'sentenceKo']) assert.ok(q[field].trim(), q.id + ': ' + field);
    assert.equal(q.expressions.length, 3);
    assert.ok(q.chunks.length >= 3);
    assert.ok(/[.!?]$/.test(q.chunks.join(' ')));
    for (const [level, [min, max]] of Object.entries({ basic: [1, 2], intermediate: [3, 4], ih: [4, 6] })) {
      const answer = q.answers[level];
      const count = answer.split(/[.!?]+/).filter(s => s.trim()).length;
      assert.ok(count >= min && count <= max, `${q.id} ${level}: ${count} sentences`);
      assert.ok(!answers.has(answer), `${q.id}: duplicate answer`);
      answers.add(answer);
    }
  }
});

test('every local script and stylesheet exists and uses a GitHub Pages compatible relative path', () => {
  const html = read('index.html');
  for (const match of html.matchAll(/(?:src|href)="([^"#]+\.(?:js|css)(?:\?[^" ]*)?)"/g)) {
    const ref = match[1];
    if (/^https?:/.test(ref)) continue;
    assert.ok(!ref.startsWith('/'), ref);
    const file = ref.split('?')[0];
    assert.ok(fs.existsSync(path.join(root, file)), file);
    if (file.endsWith('.js')) new vm.Script(read(file), { filename: file });
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'duplicate HTML ID');
  for (const page of ['vocabulary', 'player', 'verb-forms', 'speaking', 'english-game', 'ko-vocabulary', 'ko-player', 'ko-expressions', 'ko-expression-player', 'ko-game', 'opic', 'opic-basic']) {
    assert.ok(html.includes(`data-page="${page}"`), page);
  }
  assert.ok(html.indexOf('src="opic-data.js') < html.indexOf('src="opic.js'));
});

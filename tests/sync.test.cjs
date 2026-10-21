const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
let source = fs.readFileSync(require('node:path').join(__dirname, '../jini-sync.js'), 'utf8');
source = source.replace('  render();\n  if (validToken()) {', `
  window.testAPI = {fingerprint, mergeIndependentProgress, showConflict, checkDrive,
    getConflict: () => conflict, replaceCycle: fn => syncCycle = fn,
    setToken: () => { token = 'test'; expiresAt = Date.now() + 1000000; }};
  return;
  render();
  if (validToken()) {`);
const fields = new Map();
function element(id) {
  if (!fields.has(id)) fields.set(id, {hidden: false, addEventListener() {},
    classList: {toggle() {}}, scrollIntoView() {}});
  return fields.get(id);
}
const storage = {getItem() {return null;}, removeItem() {}};
const context = {window: {addEventListener() {}},
  document: {getElementById: element, querySelector() {return null;}},
  localStorage: {...storage, length: 0}, sessionStorage: storage};
vm.runInNewContext(source, context);
const t = context.window.testAPI;
assert.equal(t.fingerprint({b: '{"z":2,"a":1}', a: 'true'}),
  t.fingerprint({a: 'true', b: '{ "a": 1, "z": 2 }'}));
assert.notEqual(t.fingerprint({a: '[1,2]'}), t.fingerprint({a: '[2,1]'}));
assert.notEqual(t.fingerprint({a: '{"xp":10}'}), t.fingerprint({a: '{"xp":20}'}));
assert(t.mergeIndependentProgress({'jini-profile': '{"name":"Jini","avatar":"rabbit"}'},
  {'jini-profile': '{"avatar":"rabbit","name":"Jini"}'}));
assert.equal(t.mergeIndependentProgress({'jini-profile': '{"name":"A"}'},
  {'jini-profile': '{"name":"B"}'}), null);
t.showConflict({'jini-game-character-english-v1': '{"name":"A"}'},
  {'jini-game-character-english-v1': '{"name":"B"}'}, {});
assert(element('jsy-differences').textContent.includes('영어 캐릭터 설정'));
t.setToken();
let calls = 0;
t.replaceCycle(async force => {
  assert.equal(force, true);
  assert.equal(t.getConflict(), null);
  calls++;
});
(async () => {
  await t.checkDrive();
  assert.equal(calls, 1);
  const html = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
  assert(html.indexOf('id="jsy-message"') < html.indexOf('id="jsy-local-summary"'));
  assert(html.indexOf('id="jsy-conflict"') > html.indexOf('id="jsy-remote-summary"'));
  assert(html.indexOf('id="jsy-conflict"') < html.indexOf('id="jsy-refresh"'));
  console.log('PASS: comparison, conflict preservation, conflict recheck and message placement');
})().catch(error => {console.error(error); process.exitCode = 1;});

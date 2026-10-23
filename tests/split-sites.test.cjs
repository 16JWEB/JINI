const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const {test} = require("node:test");

const root = path.join(__dirname, "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const sync = read("jini-sync.js");
const functions = sync.slice(sync.indexOf("  function belongsToSite(key) {"),
  sync.indexOf("  function snapshot() {"));
const create = new Function("SITE_MODE","META_KEY","REWARD_NOTIFICATIONS_KEY","DEVICE_STATE_KEYS",
  functions + "\nreturn {included,projectRecord,combineSiteRecord};");
const ops = mode => create(mode, "test-meta", "jini-character-reward-popups-v1", []);

for (const mode of ["english", "korean"]) {
  test(mode + " has independent app ID, URL and common asset root", () => {
    const html = read(mode + "/index.html");
    const manifest = JSON.parse(read(mode + "/manifest.webmanifest"));
    assert.match(html, new RegExp('JINI_APP_MODE="' + mode + '"'));
    assert.match(html, /<base href="\.\.\/"/);
    assert.match(html, /jini-mode\.js/);
    assert.equal(manifest.id, "/JINI/" + mode + "/");
    assert.equal(manifest.start_url, "./");
    assert.equal(manifest.scope, "./");
    assert(manifest.icons.every(icon => icon.src.startsWith("../icons/")));
  });

  test(mode + " Drive backup separates XP and filters shared records", () => {
    const api = ops(mode);
    const me = mode === "english" ? "jini-english-game-v1" : "jini-korean-games-v1";
    const other = mode === "english" ? "jini-korean-games-v1" : "jini-english-game-v1";
    assert(api.included(me));
    assert(!api.included(other));
    const study = JSON.stringify({schema: 1,days: {"2026-10-23": {englishMs: 1000,koreanMs: 2000}}});
    const part = JSON.parse(api.projectRecord("jini-study-time-v1", study));
    assert.equal(part.days["2026-10-23"][mode + "Ms"], mode === "english" ? 1000 : 2000);
    assert.equal(part.days["2026-10-23"][(mode === "english" ? "korean" : "english") + "Ms"], 0);
    const combined = JSON.parse(api.combineSiteRecord("jini-study-time-v1", study,
      api.projectRecord("jini-study-time-v1", study)));
    assert.equal(combined.days["2026-10-23"].englishMs, 1000);
    assert.equal(combined.days["2026-10-23"].koreanMs, 2000);
    const bookmarks = JSON.stringify({vocabulary: [{study: "english",page: 1},
      {study: "korean",page: 2}],player: []});
    const onlyMe = JSON.parse(api.projectRecord("jini-learning-bookmarks",bookmarks));
    assert.equal(onlyMe.vocabulary.length, 1);
    assert.equal(onlyMe.vocabulary[0].study, mode);
    const combinedBookmarks = JSON.parse(api.combineSiteRecord("jini-learning-bookmarks",
      bookmarks, JSON.stringify({vocabulary: [{study:mode,page: 9}],player: []})));
    assert.equal(combinedBookmarks.vocabulary.length, 2);
  });
}
test("main page links to both independent sites", () => {
  const html = read("index.html");
  assert.match(html, /href="english\/"/);
  assert.match(html, /href="korean\/"/);
});
test("legacy Drive file remains readable for first-time migration", () => {
  assert.match(sync, /findNamedFile\("jini-backup\.json"\)/);
  assert.match(sync, /remoteMeta = await writeFile\(migrated, null\)/);
  assert.match(sync, /SITE_MODE \? "jini-" \+ SITE_MODE \+ "-backup\.json"/);
});

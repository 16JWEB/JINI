/* Single source for both installed site shells.
 * Edit legacy.html (the complete learning UI), then run:
 *   node scripts/build-split-sites.cjs
 * Changes to shared .js/.css files take effect on both sites immediately.
 */
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const template = fs.readFileSync(path.join(root, "legacy.html"), "utf8");
function change(source, before, after) {
  if (!source.includes(before)) throw new Error("Template changed; missing: " + before.slice(0, 75));
  return source.replace(before, after);
}
function build(mode) {
  const korean = mode === "korean";
  const title = korean ? "JINI Korean — 한국어공부" : "JINI English — 영어공부";
  let html = change(template, '<meta charset="utf-8">',
    '<meta charset="utf-8">\n  <base href="../">\n' +
    '  <script>window.JINI_APP_MODE="' + mode + '";document.documentElement.dataset.jiniMode="' + mode + '";</script>\n' +
    '  <style>html[data-jini-mode="' + mode + '"] #' + (korean ? 'english' : 'korean') +
    '-study-menu,html[data-jini-mode="' + mode + '"] #' + (korean ? 'english' : 'korean') +
    '-menu-label,html[data-jini-mode="' + mode + '"] #' + (korean ? 'english' : 'korean') +
    '-study-hub{display:none!important}</style>');
  html = change(html,
    '<link rel="manifest" href="manifest.webmanifest?v=20261019-bunny-v1">',
    '<link rel="manifest" href="' + mode + '/manifest.webmanifest?v=20261023-split-v1">');
  html = change(html, "<title>JINI — 영어·한글 공부</title>", "<title>" + title + "</title>");
  html = change(html, '<script src="jini-study-loader.js?',
    '<script src="jini-mode.js?v=20261023-split-v1"></script>\n  <script src="jini-study-loader.js?');
  fs.writeFileSync(path.join(root, mode, "index.html"), html, "utf8");
  process.stdout.write("Built " + mode + "/index.html\n");
}
build("english");
build("korean");

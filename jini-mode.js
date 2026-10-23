/* Two independent JINI entry points, one shared codebase and browser origin.
   Never move or delete existing learning records on entry. */
(function () {
  "use strict";
  const mode = window.JINI_APP_MODE;
  if (mode !== "english" && mode !== "korean") return;
  document.documentElement.dataset.jiniMode = mode;
  const korean = mode === "korean";
  const allowed = new Set(["home", "study-info", "sync"].concat(korean ?
    ["ko-study-menu", "ko-vocabulary", "ko-player", "ko-expressions",
      "ko-expression-player", "ko-game", "ko-language-packs"] :
    ["study-menu", "vocabulary", "player", "english-expressions",
      "english-expression-player", "verb-forms", "english-game",
      "speaking", "opic", "opic-basic", "opic-mock"]));
  // Prevent a reload from restoring the other app's route in a reused browser tab.
  try {
    const old = sessionStorage.getItem("jini-refresh-current-page-v1");
    if (old && !allowed.has(old)) sessionStorage.setItem("jini-refresh-current-page-v1", "home");
  } catch (_) {}
  // One origin intentionally shares the existing per-language XP and character
  // keys. The current unified Drive backup stays untouched during the migration.
  const hide = function (element) { if (element) element.style.setProperty("display", "none", "important"); };
  const byId = function (id) { return document.getElementById(id); };
  hide(byId(korean ? "english-study-menu" : "korean-study-menu"));
  hide(byId(korean ? "english-menu-label" : "korean-menu-label"));
  hide(byId(korean ? "english-study-hub" : "korean-study-hub"));
  hide(document.querySelector('.home-study-shortcut[data-page="' + (korean ? "study-menu" : "ko-study-menu") + '"]'));
  const unwantedStart = byId(korean ? "start-learning" : "start-korean-learning");
  if (unwantedStart) hide(unwantedStart.closest(".home-study-choice"));
  const unwantedCharacter = byId("jini-home-character-" + (korean ? "english" : "korean"));
  hide(unwantedCharacter);
  const charGrid = document.querySelector(".jini-home-character-grid");
  if (charGrid) charGrid.style.gridTemplateColumns = "minmax(0, 1fr)";
  const siteName = korean ? "JINI Korean" : "JINI English";
  const brand = document.querySelector(".brand");
  if (brand) brand.setAttribute("aria-label", siteName + " 홈");
  const home = document.getElementById("home-section");
  if (home) {
    const label = document.createElement("p");
    label.textContent = korean ? "JINI Korean · 한국어 학습" : "JINI English · 영어 학습";
    label.style.cssText = "font-weight:750;font-size:13px;letter-spacing:.03em;margin:0 0 12px;opacity:.75";
    const content = home.querySelector(".home-content, .home-hero, .home-inner") || home.firstElementChild;
    if (content) content.insertBefore(label, content.firstChild);
  }
  // A legacy button or stale bookmark must not open the opposite language.
  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-page], [data-resume-study]");
    if (!trigger) return;
    const page = trigger.dataset.page;
    const resume = trigger.dataset.resumeStudy;
    if ((page && !allowed.has(page)) || (resume && resume !== mode)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  // Do not fetch the other course's bulky dictionaries or game bundles.
  // Shared app.js and common assets remain loaded for both entry points.
  const manifest = document.getElementById("jini-study-script-manifest");
  if (manifest) {
    try {
      const urls = JSON.parse(manifest.textContent);
      const blocked = korean ?
        /^(?:words(?:-|\.)|content-|english-|opic(?:-|\.)|verb-forms)/ :
        /^(?:korean-)/;
      manifest.textContent = JSON.stringify(urls.filter(function (url) {
        return !blocked.test(url);
      }));
    } catch (_) { /* Use the full manifest if filtering ever fails. */ }
  }
}());

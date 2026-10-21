/* JINI study assets are fetched on first navigation away from Home.
   Keep the character, sync, learning-time and traffic scripts eager for Home. */
(function () {
  "use strict";
  const manifest = document.getElementById("jini-study-script-manifest");
  if (!manifest) return;
  let urls;
  try {
    urls = JSON.parse(manifest.textContent);
    if (!Array.isArray(urls) || !urls.every(function (src) {
      return typeof src === "string" && /^[a-z0-9-]+\.js\?v=[a-z0-9-]+$/i.test(src);
    })) throw Error("Invalid study script manifest");
  } catch (_) { return; }
  let ready = false, loading = null, status = null;

  function message(text) {
    if (!status) {
      status = document.createElement("div");
      status.id = "jini-study-loading-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      status.style.cssText = "position:fixed;bottom:22px;left:50%;transform:translateX(-50%);z-index:2000;border-radius:12px;padding:10px 16px;color:#fff;background:#3a356b;font-size:13px;box-shadow:0 5px 20px #0003;text-align:center;max-width:92vw;";
      document.body.appendChild(status);
    }
    status.textContent = text;
  }
  function clearMessage() {
    if (status) { status.remove(); status = null; }
  }
  function fetchStudyScripts() {
    if (ready) return Promise.resolve();
    if (loading) return loading;
    message("학습 자료를 불러오는 중…");
    // Dynamically inserted classic scripts are normally async. Setting
    // async=false before appending retains their dependencies and execution
    // order, while the browser can download separate files concurrently.
    loading = new Promise(function (resolve, reject) {
      let remaining = urls.length, failure = false;
      if (!remaining) { resolve(); return; }
      urls.forEach(function (url) {
        const script = document.createElement("script");
        script.async = false;
        script.src = url;
        script.onload = function () {
          remaining--;
          if (!remaining) failure ? reject(Error("Failed to load study resources")) : resolve();
        };
        script.onerror = function () {
          failure = true;
          remaining--;
          if (!remaining) reject(Error("Failed to load " + url));
        };
        document.body.appendChild(script);
      });
    }).then(function () {
      ready = true;
      clearMessage();
    }, function (error) {
      message("학습 자료를 불러오지 못했어요. 인터넷 연결을 확인하고 페이지를 새로고침해 주세요.");
      throw error;
    });
    return loading;
  }

  document.addEventListener("click", function (event) {
    if (ready || event.defaultPrevented) return;
    const trigger = event.target.closest("[data-page], [data-resume-study], .practice-menu-toggle, .opic-menu-toggle, .brand");
    if (!trigger) return;
    // Home buttons do not need to download the learning library.
    if (trigger.classList.contains("brand") || trigger.dataset.page === "home") {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    const wasDisabled = trigger.disabled;
    if (wasDisabled) return;
    fetchStudyScripts().then(function () {
      if (trigger.isConnected) trigger.click();
    }).catch(function () {});
  }, true);

  // Browser reloads should return to the previous screen; they cannot wait
  // for a user click because the target screen needs its modules immediately.
  try {
    const nav = performance.getEntriesByType("navigation")[0];
    const reload = nav ? nav.type === "reload" : !!(performance.navigation && performance.navigation.type === 1);
    const oldPage = sessionStorage.getItem("jini-refresh-current-page-v1");
    if (reload && oldPage && oldPage !== "home") {
      fetchStudyScripts().catch(function () {});
    }
  } catch (_) {}

  window.JINI_LOAD_STUDY = fetchStudyScripts;
}());

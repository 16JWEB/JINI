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
  // These views only use the always-loaded home/study-time/sync scripts.
  // Do not download the 44 learning files merely to inspect backup or usage.
  const lightPages = ["home", "study-info", "sync", "study-menu", "ko-study-menu"];
  function showLightPage(page, restoring) {
    if (!lightPages.includes(page)) return false;
    const home = page === "home", info = page === "study-info", sync = page === "sync";
    const englishMenu = page === "study-menu", koreanMenu = page === "ko-study-menu";
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) sidebar.dataset.study = englishMenu ? "english" : koreanMenu ? "korean" : "home";
    const homeSection = document.getElementById("home-section");
    const infoSection = document.getElementById("jini-study-info-section");
    const syncSection = document.getElementById("jini-sync-page");
    const englishHub = document.getElementById("english-study-hub");
    const koreanHub = document.getElementById("korean-study-hub");
    if (homeSection) homeSection.hidden = !home;
    if (infoSection) infoSection.hidden = !info;
    if (syncSection) syncSection.hidden = !sync;
    if (englishHub) englishHub.hidden = !englishMenu;
    if (koreanHub) koreanHub.hidden = !koreanMenu;
    document.querySelectorAll(".nav-item[data-page]").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.page === page);
    });
    const breadcrumb = document.getElementById("breadcrumb-section");
    if (breadcrumb) breadcrumb.textContent = home ? "홈" : info ? "나의 학습정보" :
      sync ? "학습정보 동기화" : englishMenu ? "영어공부" : "한글공부";
    const divider = document.getElementById("breadcrumb-divider");
    if (divider) divider.hidden = true;
    try { sessionStorage.setItem("jini-refresh-current-page-v1", page); } catch (_) {}
    if (window.JINI_STUDY_TIME) window.JINI_STUDY_TIME.navigate(page);
    if (sync && window.JINI_SYNC_PAGE_OPEN) window.JINI_SYNC_PAGE_OPEN();
    if (!restoring) window.scrollTo(0, 0);
    return true;
  }

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
    const back = event.target.closest("#sync-back-button");
    if (back) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showLightPage("home");
      return;
    }
    const trigger = event.target.closest("[data-page], [data-resume-study], .practice-menu-toggle, .opic-menu-toggle, .brand");
    if (!trigger) return;
    const page = trigger.classList.contains("brand") ? "home" : trigger.dataset.page;
    if (lightPages.includes(page)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      showLightPage(page);
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    if (trigger.disabled) return;
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
      if (lightPages.includes(oldPage)) showLightPage(oldPage, true);
      else fetchStudyScripts().catch(function () {});
    }
  } catch (_) {}

  window.JINI_LOAD_STUDY = fetchStudyScripts;
}());

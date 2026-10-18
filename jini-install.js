(function () {
  "use strict";

  const panel = document.getElementById("jini-install-panel");
  const installButton = document.getElementById("jini-install-button");
  const guide = document.getElementById("jini-install-guide");
  const guideText = document.getElementById("jini-install-guide-text");
  const status = document.getElementById("jini-install-status");
  if (!panel || !installButton || !guide || !guideText || !status) return;

  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const inKakao = /KAKAOTALK/i.test(ua);
  let deferredPrompt = null;
  let installed = false;

  function standalone() {
    return Boolean((window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches) || navigator.standalone);
  }

  function render() {
    // The prompt only applies to browsers that can install this web app.
    panel.hidden = installed || standalone() || !(isAndroid || isIOS);
  }

  function showGuide(message) {
    guide.hidden = false;
    if (inKakao) {
      guideText.textContent = "먼저 위의 'Chrome에서 열기'를 누르거나 카카오톡의 ⋯ 메뉴에서 '다른 브라우저로 열기'를 선택하세요. 이후 Chrome의 ⋮ 메뉴 → '홈 화면에 추가' 또는 '앱 설치'를 누르세요.";
    } else if (isIOS) {
      guideText.textContent = "Safari에서 JINI를 연 뒤 공유 버튼(□↑) → '홈 화면에 추가'를 선택하세요.";
    } else {
      guideText.textContent = "Chrome 오른쪽 위 ⋮ 메뉴에서 '홈 화면에 추가' 또는 '앱 설치'를 선택하세요. 설치 메뉴가 안 보이면 Chrome을 업데이트하고 사이트를 다시 열어 보세요.";
    }
    status.textContent = message || "브라우저 설정에 따라 메뉴에서 직접 추가해야 할 수 있어요.";
  }

  window.addEventListener("beforeinstallprompt", function (event) {
    if (standalone()) return;
    event.preventDefault();
    deferredPrompt = event;
    render();
  });

  window.addEventListener("appinstalled", function () {
    installed = true;
    deferredPrompt = null;
    guide.hidden = true;
    status.textContent = "";
    render();
  });

  installButton.addEventListener("click", async function () {
    if (standalone()) {
      installed = true;
      render();
      return;
    }
    if (deferredPrompt) {
      const prompt = deferredPrompt;
      deferredPrompt = null;
      try {
        // Call prompt() directly from the user's click to preserve activation.
        await prompt.prompt();
        const outcome = await prompt.userChoice;
        if (outcome && outcome.outcome === "accepted") {
          status.textContent = "홈 화면 추가를 진행하고 있어요.";
          guide.hidden = true;
        } else {
          showGuide("추가가 취소됐어요. 필요하면 다시 시도해 주세요.");
        }
      } catch (error) {
        showGuide("설치 창을 띄우지 못했어요. Chrome 메뉴를 이용해 주세요.");
      }
      return;
    }
    showGuide("");
  });

  render();

  // Secure GitHub Pages origin. Keep all lesson assets network-first;
  // this service worker does not provide offline caching.
  if ("serviceWorker" in navigator && window.location.protocol === "https:") {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function () {
        // Home screen shortcuts can still be created through the browser menu.
      });
    });
  }
}());

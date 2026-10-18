(function () {
  "use strict";

  const panel = document.getElementById("jini-install-panel");
  const installButton = document.getElementById("jini-install-button");
  const intro = panel && panel.querySelector(".jini-install-copy");
  const guide = document.getElementById("jini-install-guide");
  const guideText = document.getElementById("jini-install-guide-text");
  const status = document.getElementById("jini-install-status");
  if (!panel || !intro || !installButton || !guide || !guideText || !status) return;

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
    // Keep the shortcut visible even after installation and inside the app.
    panel.hidden = !(isAndroid || isIOS);
  }

  function showGuide(message) {
    intro.hidden = false;
    guide.hidden = false;
    installButton.setAttribute("aria-expanded", "true");
    if (installed || standalone()) {
      guideText.textContent = "이미 홈 화면에서 JINI 앱을 사용하고 있어요. 이 버튼은 계속 남아 있으며, Chrome에서 열면 ⋮ 메뉴로 홈 화면 바로가기를 관리할 수 있어요.";
      status.textContent = message || "JINI가 홈 화면 앱으로 실행 중이에요.";
      return;
    }
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
    showGuide("JINI를 홈 화면에 추가했어요.");
    render();
  });

  installButton.addEventListener("click", async function () {
    // Details expand only on tap; never hide this button afterwards.
    showGuide("");
    if (standalone() || installed) {
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

(function () {
  "use strict";

  const bar = document.getElementById("jini-chrome-launch");
  const link = document.getElementById("jini-open-chrome");
  const intro = bar && bar.querySelector(".jini-chrome-intro");
  const kakaoNotice = document.getElementById("jini-kakao-notice");
  const help = document.getElementById("jini-chrome-help");
  const copyButton = document.getElementById("jini-chrome-copy");
  const copyStatus = document.getElementById("jini-chrome-copy-status");
  if (!bar || !intro || !link || !kakaoNotice || !help || !copyButton || !copyStatus) return;

  const ua = navigator.userAgent || "";
  const android = /Android/i.test(ua);
  const kakao = /KAKAOTALK/i.test(ua);
  const inApp = window.matchMedia &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches);
  const chrome = /Chrome\//i.test(ua) && !inApp &&
    !/KAKAOTALK|SamsungBrowser|EdgA|OPR\/|Firefox|;\s*wv[;) ]/i.test(ua);

  // Only Android can target the Chrome package through an intent link.
  // Do not automatically redirect; a real user tap is required.
  if (!android) return;
  bar.hidden = false;
  kakaoNotice.hidden = !kakao;

  const siteUrl = location.origin + location.pathname + location.search;
  // Build the intent as an actual anchor href to retain the user gesture.
  // Some in-app browsers block it; never promise that Chrome opened.
  const scheme = location.protocol === "http:" ? "http" : "https";
  const intent = "intent://" + location.host + location.pathname + location.search +
    "#Intent;scheme=" + scheme + ";package=com.android.chrome;" +
    "S.browser_fallback_url=" + encodeURIComponent(siteUrl) + ";end";
  link.href = intent;

  if (chrome) link.title = "현재 Chrome으로 열려 있으면 다시 실행할 필요가 없어요.";

  link.addEventListener("click", function (event) {
    intro.hidden = false;
    help.hidden = false;
    link.setAttribute("aria-expanded", "true");
    if (chrome) {
      event.preventDefault();
      copyStatus.textContent = "이미 Chrome에서 보고 있어요.";
    } else {
      copyStatus.textContent = "";
    }
  });

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = typeof document.execCommand === "function" && document.execCommand("copy");
    textarea.remove();
    return success;
  }

  copyButton.addEventListener("click", async function () {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(siteUrl);
      } else if (!fallbackCopy(siteUrl)) {
        throw new Error("Clipboard not available");
      }
      copyStatus.textContent = "링크를 복사했어요. Chrome 주소창에 붙여넣어 주세요.";
    } catch (error) {
      copyStatus.textContent = "복사가 제한됐어요. JINI 주소를 길게 눌러 복사하거나 카카오톡 메뉴에서 '다른 브라우저로 열기'를 선택해 주세요.";
    }
  });
}());

(function () {
  "use strict";

  // A site-owned address field, not Chrome's browser security/address UI.
  const bar = document.getElementById("jini-address-bar");
  const form = document.getElementById("jini-address-form");
  const input = document.getElementById("jini-address-input");
  const back = document.getElementById("jini-address-back");
  const reload = document.getElementById("jini-address-reload");
  const copy = document.getElementById("jini-address-copy");
  const feedback = document.getElementById("jini-address-feedback");
  if (!bar || !form || !input || !back || !reload || !copy || !feedback) return;

  const standaloneQuery = window.matchMedia ?
    window.matchMedia("(display-mode: standalone)") : null;
  const minimalQuery = window.matchMedia ?
    window.matchMedia("(display-mode: minimal-ui)") : null;
  const fullscreenQuery = window.matchMedia ?
    window.matchMedia("(display-mode: fullscreen)") : null;

  function installedView() {
    return Boolean(navigator.standalone ||
      (standaloneQuery && standaloneQuery.matches) ||
      (minimalQuery && minimalQuery.matches) ||
      (fullscreenQuery && fullscreenQuery.matches));
  }

  function currentAddress() {
    return window.location.href;
  }

  function syncAddress() {
    // Avoid replacing a URL while the user is still typing.
    if (document.activeElement !== input) input.value = currentAddress();
  }

  function updateVisibility() {
    bar.hidden = !installedView();
    if (!bar.hidden) syncAddress();
  }

  function normalizeAddress(value) {
    const typed = String(value || "").trim();
    if (!typed) return null;
    // Non-web protocols, including javascript:, are never navigated to.
    const withScheme = /^[a-z][a-z\d+.-]*:/i.test(typed) ? typed :
      typed.startsWith("/") || typed.startsWith("#") || typed.startsWith("?") ?
        new URL(typed, window.location.href).href : "https://" + typed;
    try {
      const parsed = new URL(withScheme);
      return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : null;
    } catch (error) {
      return null;
    }
  }

  function setFeedback(message) {
    feedback.textContent = message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const url = normalizeAddress(input.value);
    if (!url) {
      setFeedback("http 또는 https 웹 주소를 입력해 주세요.");
      input.focus();
      return;
    }
    setFeedback("");
    if (url === currentAddress()) {
      window.location.reload();
    } else {
      // External URLs may open outside the installed app's scope.
      window.location.assign(url);
    }
  });

  back.addEventListener("click", function () {
    window.history.back();
  });

  reload.addEventListener("click", function () {
    window.location.reload();
  });

  copy.addEventListener("click", async function () {
    const url = currentAddress();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const node = document.createElement("textarea");
        node.value = url;
        node.setAttribute("readonly", "");
        node.style.position = "fixed";
        node.style.opacity = "0";
        document.body.appendChild(node);
        node.select();
        const ok = document.execCommand && document.execCommand("copy");
        node.remove();
        if (!ok) throw new Error("Clipboard unavailable");
      }
      setFeedback("현재 주소를 복사했어요.");
    } catch (error) {
      setFeedback("주소 복사가 제한됐어요. 입력창의 주소를 길게 눌러 복사해 주세요.");
    }
  });

  input.addEventListener("focus", function () { input.select(); });
  input.addEventListener("blur", function () { syncAddress(); });
  window.addEventListener("pageshow", syncAddress);
  window.addEventListener("popstate", syncAddress);
  window.addEventListener("hashchange", syncAddress);
  [standaloneQuery, minimalQuery, fullscreenQuery].forEach(function (query) {
    if (!query) return;
    if (query.addEventListener) query.addEventListener("change", updateVisibility);
    else if (query.addListener) query.addListener(updateVisibility);
  });
  updateVisibility();
}());

/* Local-only preview gate; a public static site cannot enforce private access. */
(function () {
  "use strict";
  const entry = document.getElementById("jini-admin-entry");
  const dialog = document.getElementById("jini-admin-dialog");
  const loginView = document.getElementById("ja-login");
  const panel = document.getElementById("ja-panel");
  const form = document.getElementById("ja-login-form");
  const passwordInput = document.getElementById("ja-password");
  const error = document.getElementById("ja-error");
  if (!entry || !dialog || !loginView || !panel || !form || !passwordInput) return;
  const EXPECTED_DIGEST = "d4758ff40ebce1b5d0980f165c14d660f4723e50cd8c59d25403cde2ad87edc6";
  const ANIMALS = [
    { id: "rabbit", name: "토끼", emoji: "🐰" },
    { id: "cat", name: "고양이", emoji: "🐱" },
    { id: "bear", name: "곰", emoji: "🐻" },
    { id: "fox", name: "여우", emoji: "🦊" }
  ];
  const PREVIEW_LEVELS = new Set([1].concat(Array.from({ length: 20 }, (_, i) => (i + 1) * 10)));
  let level = 100;
  function reset() {
    loginView.hidden = false;
    panel.hidden = true;
    dialog.classList.remove("ja-unlocked");
    dialog.classList.add("ja-auth");
    passwordInput.value = "";
    error.hidden = true;
    error.textContent = "";
  }
  function close() {
    if (typeof dialog.close === "function") dialog.close();
    else { dialog.removeAttribute("open"); reset(); }
  }
  function render() {
    dialog.querySelectorAll("[data-ja-level]").forEach(function (button) {
      const active = Number(button.dataset.jaLevel) === level;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    dialog.querySelectorAll("[data-ja-animal]").forEach(function (target) {
      const animal = ANIMALS.find(function (a) { return a.id === target.dataset.jaAnimal; });
      if (!animal) return;
      if (window.JINI_CHARACTER_ART && typeof window.JINI_CHARACTER_ART.render === "function") {
        target.innerHTML = window.JINI_CHARACTER_ART.render({ avatar: animal.id, level: level, auraLevel: level >= 10 ? Math.min(level, 200) : 0 });
      } else {
        target.textContent = animal.emoji;
        target.classList.add("ja-fallback");
      }
    });
  }
  async function digest(value) {
    const data = new TextEncoder().encode(value);
    const buffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buffer)).map(function (v) { return v.toString(16).padStart(2, "0"); }).join("");
  }
  entry.addEventListener("click", function () {
    reset();
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    passwordInput.focus();
  });
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    let valid = false;
    try { valid = (await digest(passwordInput.value)) === EXPECTED_DIGEST; }
    catch (_) { error.textContent = "이 브라우저에서는 비밀번호 확인을 사용할 수 없어요."; error.hidden = false; return; }
    if (!valid) {
      error.hidden = false;
      error.textContent = "비밀번호가 올바르지 않습니다.";
      passwordInput.value = "";
      passwordInput.focus();
      return;
    }
    passwordInput.value = "";
    loginView.hidden = true;
    panel.hidden = false;
    dialog.classList.remove("ja-auth");
    dialog.classList.add("ja-unlocked");
    render();
  });
  dialog.querySelectorAll("[data-ja-close]").forEach(function (button) {
    button.addEventListener("click", close);
  });
  dialog.querySelectorAll("[data-ja-level]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (panel.hidden) return;
      const selected = Number(button.dataset.jaLevel);
      if (!PREVIEW_LEVELS.has(selected)) return;
      level = selected;
      render();
    });
  });
  dialog.addEventListener("close", reset);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) close();
  });
}());

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
  const equipment = document.getElementById("ja-equip-parts");
  if (!entry || !dialog || !loginView || !panel || !form || !passwordInput || !equipment) return;
  const EXPECTED_DIGEST = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
  const ANIMALS = [
    { id: "rabbit", name: "토끼", emoji: "🐰" },
    { id: "cat", name: "고양이", emoji: "🐱" },
    { id: "bear", name: "곰", emoji: "🐻" },
    { id: "fox", name: "여우", emoji: "🦊" }
  ];
  // These are display examples of currently unlocked gear, not auto-equipped rewards.
  const EXAMPLES = {
    1: { hat: "none", outfit: "basic", bag: "none", book: "basic", names: ["기본 옷", "기본 책"] },
    50: { hat: "ribbon", outfit: "academy", bag: "backpack", book: "special", names: ["핑크 리본", "학생복", "책가방", "별빛 책"] },
    100: { hat: "crown", outfit: "robe", bag: "premium", book: "special", names: ["왕관", "마법사 의상", "고급 가방", "별빛 책"] },
    140: { hat: "scholar", outfit: "royal", bag: "explorer", book: "cosmic", names: ["마법사 모자", "왕실 의상", "모험 가방", "별자리 책"] }
  };
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
    const sample = EXAMPLES[level];
    dialog.querySelectorAll("[data-ja-level]").forEach(function (button) {
      const active = Number(button.dataset.jaLevel) === level;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    dialog.querySelectorAll("[data-ja-animal]").forEach(function (target) {
      const animal = ANIMALS.find(function (a) { return a.id === target.dataset.jaAnimal; });
      if (!animal) return;
      if (window.JINI_CHARACTER_ART && typeof window.JINI_CHARACTER_ART.render === "function") {
        target.innerHTML = window.JINI_CHARACTER_ART.render({
          avatar: animal.id, level: level,
          equipped: { hat: sample.hat, outfit: sample.outfit, bag: sample.bag, book: sample.book }
        });
      } else {
        target.textContent = animal.emoji;
        target.classList.add("ja-fallback");
      }
    });
    equipment.replaceChildren();
    sample.names.forEach(function (name) {
      const part = document.createElement("span");
      part.className = "ja-equip-part";
      part.textContent = name;
      equipment.appendChild(part);
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
      if (!Object.prototype.hasOwnProperty.call(EXAMPLES, selected)) return;
      level = selected;
      render();
    });
  });
  dialog.addEventListener("close", reset);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) close();
  });
}());

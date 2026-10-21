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
  const growthPanel = document.getElementById("ja-preview-panel");
  const rewardPanel = document.getElementById("ja-reward-panel");
  const dataPanel = document.getElementById("ja-data-panel");
  const auraPanel = document.getElementById("ja-aura-panel");
  const rewardPreview = document.getElementById("ja-reward-preview");
  const rewardDemoDialog = document.getElementById("ja-reward-demo-dialog");
  const rewardStudy = document.getElementById("ja-reward-study");
  const rewardAvatar = document.getElementById("ja-reward-avatar");
  const rewardLevel = document.getElementById("ja-reward-level");
  const rewardOpenButton = document.getElementById("ja-reward-open");
  if (!growthPanel || !rewardPanel || !dataPanel || !auraPanel || !rewardPreview || !rewardDemoDialog ||
      !rewardStudy || !rewardAvatar || !rewardLevel || !rewardOpenButton) return;
  const EXPECTED_DIGEST = "d4758ff40ebce1b5d0980f165c14d660f4723e50cd8c59d25403cde2ad87edc6";
  const ANIMALS = [
    { id: "rabbit", name: "토끼", emoji: "🐰" },
    { id: "cat", name: "고양이", emoji: "🐱" },
    { id: "bear", name: "곰", emoji: "🐻" },
    { id: "fox", name: "여우", emoji: "🦊" }
  ];
  const PREVIEW_LEVELS = new Set([1].concat(Array.from({ length: 20 }, (_, i) => (i + 1) * 10)));
  const TAB_IDS = ["ja-tab-preview", "ja-tab-reward", "ja-tab-aura", "ja-tab-data"];
  let auraLabLoading = null;
  function loadAuraLab() {
    if (window.JINI_ADMIN_AURA_LAB) {
      window.JINI_ADMIN_AURA_LAB.refresh();
      return;
    }
    if (auraLabLoading) return;
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "admin-aura-lab.css?v=20261022-aura-preview-v1";
    document.head.appendChild(style);
    const script = document.createElement("script");
    script.src = "admin-aura-lab.js?v=20261022-aura-preview-v1";
    script.async = true;
    script.onerror = function () {
      auraLabLoading = null;
      const element = document.getElementById("ja-aura-cards");
      if (element) element.textContent = "오라 테스트 파일을 불러오지 못했어요. 연결을 확인한 뒤 이 탭을 다시 눌러 주세요.";
    };
    script.onload = function () { auraLabLoading = null; };
    auraLabLoading = script;
    document.body.appendChild(script);
  }
  let level = 100;
  function reset() {
    if (rewardDemoDialog.open) rewardDemoDialog.close();
    growthPanel.hidden = false;
    rewardPanel.hidden = true;
    dataPanel.hidden = true;
    auraPanel.hidden = true;
    dialog.querySelectorAll('[role="tab"]').forEach(function (button) {
      const active = button.id === "ja-tab-preview";
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    loginView.hidden = false;
    panel.hidden = true;
    dialog.classList.remove("ja-unlocked");
    dialog.classList.add("ja-auth");
    passwordInput.value = "";
    error.hidden = true;
    error.textContent = "";
  }
  function close() {
    if (rewardDemoDialog.open) rewardDemoDialog.close();
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

  function rewardMarkup(titleId) {
    const character = window.JINI_CHARACTER;
    return character && typeof character.previewReward === "function"
      ? character.previewReward({
        study: rewardStudy.value,
        avatar: rewardAvatar.value,
        level: Number(rewardLevel.value),
        titleId: titleId
      }) : "";
  }
  function renderRewardPreview() {
    if (panel.hidden || rewardPanel.hidden) return;
    rewardPreview.innerHTML = rewardMarkup("ja-reward-inline-title") ||
      '<p class="ja-intro">미리보기 화면을 불러올 수 없어요. 새로고침해 주세요.</p>';
  }
  function openRewardDemo() {
    if (panel.hidden || rewardPanel.hidden || rewardDemoDialog.open) return;
    const html = rewardMarkup("ja-reward-demo-title");
    if (!html) return;
    rewardDemoDialog.innerHTML = html;
    if (typeof rewardDemoDialog.showModal === "function") rewardDemoDialog.showModal();
    else rewardDemoDialog.setAttribute("open", "");
  }
  function switchTab(id) {
    if (panel.hidden || !TAB_IDS.includes(id)) return;
    growthPanel.hidden = id !== "ja-tab-preview";
    rewardPanel.hidden = id !== "ja-tab-reward";
    dataPanel.hidden = id !== "ja-tab-data";
    auraPanel.hidden = id !== "ja-tab-aura";
    dialog.querySelectorAll('[role="tab"]').forEach(function (button) {
      const selected = button.id === id;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    if (id === "ja-tab-reward") renderRewardPreview();
    if (id === "ja-tab-aura") loadAuraLab();
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
    switchTab("ja-tab-preview");
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

  dialog.querySelectorAll('[role="tab"]').forEach(function (button) {
    button.addEventListener("click", function () { switchTab(button.id); });
    button.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const index = TAB_IDS.indexOf(button.id);
      if (index < 0) return;
      const next = TAB_IDS[(index + (event.key === "ArrowRight" ? 1 : -1) + TAB_IDS.length) % TAB_IDS.length];
      switchTab(next);
      document.getElementById(next).focus();
    });
  });
  [rewardStudy, rewardAvatar, rewardLevel].forEach(function (input) {
    input.addEventListener("change", renderRewardPreview);
  });
  rewardOpenButton.addEventListener("click", openRewardDemo);
  rewardPreview.addEventListener("click", function (event) {
    if (event.target.closest("[data-jgc-reward-action]")) openRewardDemo();
  });
  rewardDemoDialog.addEventListener("click", function (event) {
    if (event.target === rewardDemoDialog || event.target.closest("[data-jgc-reward-action]")) {
      if (typeof rewardDemoDialog.close === "function") rewardDemoDialog.close();
      else rewardDemoDialog.removeAttribute("open");
    }
  });
  rewardDemoDialog.addEventListener("cancel", function (event) {
    event.preventDefault();
    if (typeof rewardDemoDialog.close === "function") rewardDemoDialog.close();
    else rewardDemoDialog.removeAttribute("open");
  });
  dialog.addEventListener("close", reset);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) close();
  });
}());

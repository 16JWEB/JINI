/* JINI shared English/Korean practice-game character and XP dashboard. */
(function () {
  "use strict";
  const ENGLISH_KEY = "jini-english-game-v1";
  const KOREAN_KEY = "jini-korean-games-v1";
  const CHARACTER_KEY = "jini-game-character-v1";
  const XP_PER_LEVEL = 100;
  const AVATARS = [
    { id: "fox", icon: "🦊", label: "여우" },
    { id: "cat", icon: "🐱", label: "고양이" },
    { id: "panda", icon: "🐼", label: "판다" },
    { id: "rabbit", icon: "🐰", label: "토끼" }
  ];
  const panels = Array.from(document.querySelectorAll("[data-jini-character-panel]"));
  const dialog = document.getElementById("jini-character-dialog");
  const toast = document.getElementById("jini-level-up-toast");
  if (!dialog || !panels.length) return;

  function escape(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, c =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function readXP(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key) || "null");
      const raw = data && Number(data.xp);
      return Number.isSafeInteger(raw) && raw >= 0 ? raw : 0;
    } catch (_) { return 0; }
  }
  function readCharacter() {
    try {
      const saved = JSON.parse(localStorage.getItem(CHARACTER_KEY) || "null");
      return {
        name: saved && typeof saved.name === "string" && saved.name.trim()
          ? saved.name.trim().slice(0, 16) : "지니 모험가",
        avatar: saved && AVATARS.some(a => a.id === saved.avatar) ? saved.avatar : "fox"
      };
    } catch (_) { return { name: "지니 모험가", avatar: "fox" }; }
  }
  let profile = readCharacter();
  let lastLevel = null;
  let toastTimer;
  const readScore = () => {
    const english = readXP(ENGLISH_KEY);
    const korean = readXP(KOREAN_KEY);
    const total = english + korean;
    return {
      english, korean, total,
      level: Math.floor(total / XP_PER_LEVEL) + 1,
      inLevel: total % XP_PER_LEVEL,
      untilNext: XP_PER_LEVEL - (total % XP_PER_LEVEL),
      percent: total % XP_PER_LEVEL
    };
  };
  const avatarIcon = () => (AVATARS.find(a => a.id === profile.avatar) || AVATARS[0]).icon;
  function saveProfile() {
    try { localStorage.setItem(CHARACTER_KEY, JSON.stringify(profile)); }
    catch (_) { /* Character changes remain available until the tab is closed. */ }
  }
  function open() {
    renderDialog();
    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
  }
  function renderPanels(score) {
    panels.forEach(panel => {
      panel.innerHTML =
        '<button type="button" class="jgc-card" data-jgc-action="open" aria-label="캐릭터 창 열기, 레벨 ' + score.level + '">' +
        '<span class="jgc-avatar" aria-hidden="true">' + avatarIcon() + '</span>' +
        '<span class="jgc-card-info"><span class="jgc-label">MY CHARACTER · 나의 캐릭터</span>' +
        '<span class="jgc-name">' + escape(profile.name) + ' <strong>LV. ' + score.level + '</strong></span>' +
        '<span class="jgc-track"><span style="width:' + score.percent + '%"></span></span>' +
        '<span class="jgc-meter">' + score.inLevel + ' / 100 XP · 다음 레벨까지 ' + score.untilNext + ' XP</span></span>' +
        '<span class="jgc-card-arrow" aria-hidden="true">상세 보기 ›</span></button>';
    });
  }
  function renderDialog() {
    const score = readScore();
    dialog.innerHTML =
      '<div class="jgc-dialog-content"><div class="jgc-dialog-head"><span class="jgc-kicker">JINI CHARACTER</span>' +
      '<button type="button" class="jgc-close" data-jgc-action="close" aria-label="캐릭터 창 닫기">✕</button></div>' +
      '<div class="jgc-portrait"><span class="jgc-portrait-icon" aria-hidden="true">' + avatarIcon() + '</span>' +
      '<span class="jgc-level">LEVEL ' + score.level + '</span><h2 id="jini-character-title">' + escape(profile.name) + '</h2>' +
      '<p>영어·한글 연습게임을 풀며 함께 성장하는 캐릭터</p></div>' +
      '<div class="jgc-xp-section"><div class="jgc-xp-heading"><strong>레벨 ' + score.level + ' → ' + (score.level + 1) + '</strong>' +
      '<span>' + score.inLevel + ' / 100 XP</span></div><div class="jgc-large-track"><span style="width:' + score.percent + '%"></span></div>' +
      '<p>100 XP를 모을 때마다 레벨이 1씩 올라가요. 다음 레벨까지 <b>' + score.untilNext + ' XP</b>!</p></div>' +
      '<div class="jgc-figures"><div><small>총 경험치</small><strong>' + score.total.toLocaleString() + ' XP</strong></div>' +
      '<div><small>영어 연습</small><strong>' + score.english.toLocaleString() + ' XP</strong></div>' +
      '<div><small>한글 연습</small><strong>' + score.korean.toLocaleString() + ' XP</strong></div></div>' +
      '<div class="jgc-choices"><label for="jgc-name-input">캐릭터 이름</label>' +
      '<input id="jgc-name-input" maxlength="16" value="' + escape(profile.name) + '" placeholder="캐릭터 이름" autocomplete="off">' +
      '<span class="jgc-choice-title">캐릭터 선택</span><div class="jgc-avatar-options">' +
      AVATARS.map(a => '<button type="button" class="jgc-avatar-option' +
        (a.id === profile.avatar ? ' is-selected' : '') + '" data-jgc-action="avatar" data-avatar="' + a.id +
        '" aria-label="' + a.label + ' 캐릭터 선택" aria-pressed="' + (a.id === profile.avatar) + '">' +
        '<span aria-hidden="true">' + a.icon + '</span><small>' + a.label + '</small></button>').join("") + '</div></div>' +
      '<p class="jgc-tip">정답 또는 말하기 완료(자가평가) 1회에 10 XP가 쌓여요. 이미 저장된 경험치도 합산했어요. ' +
      '기록은 현재 기기의 브라우저에 저장되며, 초기화하거나 저장 데이터를 지우면 사라질 수 있어요.</p></div>';
  }
  function showLevelUp(level) {
    if (!toast) return;
    toast.textContent = "🎉 레벨 업! LV. " + level + " 달성";
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3200);
  }
  function refresh() {
    const score = readScore();
    if (lastLevel !== null && score.level > lastLevel) showLevelUp(score.level);
    lastLevel = score.level;
    renderPanels(score);
    if (dialog.open) {
      const active = document.activeElement;
      const editing = active && active.id === "jgc-name-input";
      if (!editing) renderDialog();
    }
    return score;
  }
  document.addEventListener("click", event => {
    const button = event.target.closest("[data-jgc-action]");
    if (!button) return;
    const action = button.dataset.jgcAction;
    if (action === "open") open();
    if (action === "close") dialog.close ? dialog.close() : dialog.removeAttribute("open");
    if (action === "avatar") {
      if (!AVATARS.some(a => a.id === button.dataset.avatar)) return;
      profile.avatar = button.dataset.avatar;
      saveProfile();
      refresh();
    }
  });
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close ? dialog.close() : dialog.removeAttribute("open");
  });
  dialog.addEventListener("change", event => {
    if (event.target.id !== "jgc-name-input") return;
    profile.name = event.target.value.trim().slice(0, 16) || "지니 모험가";
    saveProfile();
    refresh();
  });
  dialog.addEventListener("keydown", event => {
    if (event.target.id === "jgc-name-input" && event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  });
  window.addEventListener("storage", event => {
    if ([ENGLISH_KEY, KOREAN_KEY, CHARACTER_KEY].includes(event.key)) {
      if (event.key === CHARACTER_KEY) profile = readCharacter();
      refresh();
    }
  });
  window.JINI_CHARACTER = { refresh, open, getStatus: readScore };
  refresh();
}());

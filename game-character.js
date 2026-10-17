/* JINI English/Korean game characters. Each language has its own XP and level. */
(function () {
  "use strict";
  const ENGLISH_KEY = "jini-english-game-v1";
  const KOREAN_KEY = "jini-korean-games-v1";
  const LEGACY_PROFILE_KEY = "jini-game-character-v1";
  const PROFILE_KEYS = {
    english: "jini-game-character-english-v1",
    korean: "jini-game-character-korean-v1"
  };
  const STUDIES = {
    english: { label: "영어", xpKey: ENGLISH_KEY, defaultName: "영어 모험가", defaultAvatar: "fox" },
    korean: { label: "한글", xpKey: KOREAN_KEY, defaultName: "한글 모험가", defaultAvatar: "rabbit" }
  };
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

  const studyOf = value => value === "korean" ? "korean" : "english";
  const escape = value => String(value == null ? "" : value).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function readXP(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key) || "null");
      const amount = data && Number(data.xp);
      return Number.isSafeInteger(amount) && amount >= 0 ? amount : 0;
    } catch (_) { return 0; }
  }
  function readCharacter(study) {
    const meta = STUDIES[study];
    const defaultProfile = { name: meta.defaultName, avatar: meta.defaultAvatar };
    try {
      // Prior character selections are inherited initially, but subsequent edits
      // are saved separately for each language without losing old preferences.
      const stored = localStorage.getItem(PROFILE_KEYS[study]);
      const data = JSON.parse(stored || localStorage.getItem(LEGACY_PROFILE_KEY) || "null");
      if (!data || typeof data !== "object") return defaultProfile;
      return {
        name: typeof data.name === "string" && data.name.trim()
          ? data.name.trim().slice(0, 16) : defaultProfile.name,
        avatar: AVATARS.some(a => a.id === data.avatar) ? data.avatar : defaultProfile.avatar
      };
    } catch (_) { return defaultProfile; }
  }
  const profiles = { english: readCharacter("english"), korean: readCharacter("korean") };
  let activeStudy = "english";
  const lastLevels = { english: null, korean: null };
  let toastTimer;

  function readScore(study) {
    const key = studyOf(study);
    const xp = readXP(STUDIES[key].xpKey);
    return {
      study: key, xp,
      level: Math.floor(xp / XP_PER_LEVEL) + 1,
      inLevel: xp % XP_PER_LEVEL,
      untilNext: XP_PER_LEVEL - xp % XP_PER_LEVEL,
      percent: xp % XP_PER_LEVEL
    };
  }
  const avatarIcon = study => (AVATARS.find(a => a.id === profiles[study].avatar) || AVATARS[0]).icon;

  function saveProfile(study) {
    try { localStorage.setItem(PROFILE_KEYS[study], JSON.stringify(profiles[study])); }
    catch (_) { /* Keep current changes until the browser session ends. */ }
  }

  function renderPanels() {
    panels.forEach(panel => {
      const study = studyOf(panel.dataset.jiniCharacterPanel);
      const score = readScore(study);
      const profile = profiles[study];
      const label = STUDIES[study].label;
      panel.innerHTML =
        '<button type="button" class="jgc-card" data-jgc-action="open" data-jgc-study="' + study +
        '" aria-label="' + label + ' 캐릭터 창 열기, 레벨 ' + score.level + '">' +
        '<span class="jgc-avatar" aria-hidden="true">' + avatarIcon(study) + '</span>' +
        '<span class="jgc-card-info"><span class="jgc-label">' + label + ' MY CHARACTER · 나의 캐릭터</span>' +
        '<span class="jgc-name">' + escape(profile.name) + ' <strong>LV. ' + score.level + '</strong></span>' +
        '<span class="jgc-track"><span style="width:' + score.percent + '%"></span></span>' +
        '<span class="jgc-meter">' + score.inLevel + ' / 100 XP · 다음 레벨까지 ' + score.untilNext + ' XP</span></span>' +
        '<span class="jgc-card-arrow" aria-hidden="true">상세 보기 ›</span></button>';
    });
  }

  function renderDialog() {
    const study = activeStudy;
    const score = readScore(study);
    const profile = profiles[study];
    const label = STUDIES[study].label;
    dialog.innerHTML =
      '<div class="jgc-dialog-content"><div class="jgc-dialog-head"><span class="jgc-kicker">' +
      label + ' CHARACTER</span><button type="button" class="jgc-close" data-jgc-action="close" aria-label="캐릭터 창 닫기">✕</button></div>' +
      '<div class="jgc-portrait"><span class="jgc-portrait-icon" aria-hidden="true">' + avatarIcon(study) + '</span>' +
      '<span class="jgc-level">' + label + ' LEVEL ' + score.level + '</span><h2 id="jini-character-title">' + escape(profile.name) + '</h2>' +
      '<p>' + label + ' 연습게임을 풀며 성장하는 나만의 캐릭터</p></div>' +
      '<div class="jgc-xp-section"><div class="jgc-xp-heading"><strong>' + label + ' 레벨 ' + score.level + ' → ' + (score.level + 1) + '</strong>' +
      '<span>' + score.inLevel + ' / 100 XP</span></div><div class="jgc-large-track"><span style="width:' + score.percent + '%"></span></div>' +
      '<p>' + label + ' 게임에서 100 XP를 모을 때마다 해당 레벨만 1씩 올라가요. 다음 레벨까지 <b>' + score.untilNext + ' XP</b>!</p></div>' +
      '<div class="jgc-figures"><div><small>' + label + ' 누적 경험치</small><strong>' + score.xp.toLocaleString() + ' XP</strong></div>' +
      '<div><small>현재 레벨</small><strong>LV. ' + score.level + '</strong></div>' +
      '<div><small>다음 레벨까지</small><strong>' + score.untilNext + ' XP</strong></div></div>' +
      '<div class="jgc-choices"><label for="jgc-name-input">' + label + ' 캐릭터 이름</label>' +
      '<input id="jgc-name-input" maxlength="16" value="' + escape(profile.name) + '" placeholder="캐릭터 이름" autocomplete="off">' +
      '<span class="jgc-choice-title">캐릭터 선택</span><div class="jgc-avatar-options">' +
      AVATARS.map(a => '<button type="button" class="jgc-avatar-option' +
        (a.id === profile.avatar ? ' is-selected' : '') + '" data-jgc-action="avatar" data-avatar="' + a.id +
        '" aria-label="' + a.label + ' 캐릭터 선택" aria-pressed="' + (a.id === profile.avatar) + '">' +
        '<span aria-hidden="true">' + a.icon + '</span><small>' + a.label + '</small></button>').join("") + '</div></div>' +
      '<p class="jgc-tip">정답 또는 말하기 완료(자가평가) 1회에 10 XP가 쌓여요. ' +
      '영어 XP와 한글 XP는 서로 합산하지 않으며, 각각 100 XP마다 레벨업해요. ' +
      '기록은 현재 기기의 브라우저에 저장되고, 기존에 획득한 각 게임의 XP는 그대로 유지돼요.</p></div>';
  }

  function open(study) {
    activeStudy = studyOf(study);
    renderDialog();
    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
  }
  function showLevelUp(study, level) {
    if (!toast) return;
    toast.textContent = "🎉 " + STUDIES[study].label + " 레벨 업! LV. " + level + " 달성";
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3200);
  }
  function refresh() {
    ["english", "korean"].forEach(study => {
      const level = readScore(study).level;
      if (lastLevels[study] !== null && level > lastLevels[study]) showLevelUp(study, level);
      lastLevels[study] = level;
    });
    renderPanels();
    if (dialog.open) {
      const active = document.activeElement;
      if (!active || active.id !== "jgc-name-input") renderDialog();
    }
    return { english: readScore("english"), korean: readScore("korean") };
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-jgc-action]");
    if (!button) return;
    const action = button.dataset.jgcAction;
    if (action === "open") open(button.dataset.jgcStudy);
    else if (action === "close") dialog.close ? dialog.close() : dialog.removeAttribute("open");
    else if (action === "avatar") {
      if (!AVATARS.some(a => a.id === button.dataset.avatar)) return;
      profiles[activeStudy].avatar = button.dataset.avatar;
      saveProfile(activeStudy);
      refresh();
    }
  });
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close ? dialog.close() : dialog.removeAttribute("open");
  });
  dialog.addEventListener("change", event => {
    if (event.target.id !== "jgc-name-input") return;
    profiles[activeStudy].name = event.target.value.trim().slice(0, 16) || STUDIES[activeStudy].defaultName;
    saveProfile(activeStudy);
    refresh();
  });
  dialog.addEventListener("keydown", event => {
    if (event.target.id === "jgc-name-input" && event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  });
  window.addEventListener("storage", event => {
    if ([ENGLISH_KEY, KOREAN_KEY, LEGACY_PROFILE_KEY, ...Object.values(PROFILE_KEYS)].includes(event.key)) {
      if (event.key === PROFILE_KEYS.english) profiles.english = readCharacter("english");
      if (event.key === PROFILE_KEYS.korean) profiles.korean = readCharacter("korean");
      refresh();
    }
  });
  window.JINI_CHARACTER = { refresh, open, getStatus: readScore };
  refresh();
}());
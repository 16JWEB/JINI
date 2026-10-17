/* JINI study characters: independent English/Korean XP, simple growth at levels 50 and 100. */
(function () {
  "use strict";
  const XP_PER_LEVEL = 100;
  const LEGACY_PROFILE_KEY = "jini-game-character-v1";
  const PROFILE_KEYS = { english: "jini-game-character-english-v1", korean: "jini-game-character-korean-v1" };
  const STUDIES = {
    english: { label: "영어", xpKey: "jini-english-game-v1", defaultName: "영어 모험가", defaultAvatar: "fox" },
    korean: { label: "한글", xpKey: "jini-korean-games-v1", defaultName: "한글 모험가", defaultAvatar: "rabbit" }
  };
  const AVATARS = [
    { id: "rabbit", icon: "🐰", label: "토끼" },
    { id: "cat", icon: "🐱", label: "고양이" },
    { id: "bear", icon: "🐻", label: "곰" },
    { id: "fox", icon: "🦊", label: "여우" }
  ];
  const panels = Array.from(document.querySelectorAll("[data-jini-character-panel]"));
  const dialog = document.getElementById("jini-character-dialog");
  const toast = document.getElementById("jini-level-up-toast");
  if (!dialog || !panels.length) return;
  const escape = value => String(value == null ? "" : value).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const studyOf = value => value === "korean" ? "korean" : "english";
  const avatarOf = id => AVATARS.find(a => a.id === id) || AVATARS[0];
  function readXP(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key) || "null");
      const xp = data && Number(data.xp);
      return Number.isSafeInteger(xp) && xp >= 0 ? xp : 0;
    } catch (_) { return 0; }
  }
  function readScore(study) {
    const key = studyOf(study);
    const xp = readXP(STUDIES[key].xpKey);
    return { study: key, xp: xp, level: Math.floor(xp / XP_PER_LEVEL) + 1,
      inLevel: xp % XP_PER_LEVEL, untilNext: XP_PER_LEVEL - xp % XP_PER_LEVEL, percent: xp % XP_PER_LEVEL };
  }
  function growth(level) {
    if (level >= 100) return { stage: 3, name: "에이스", description: "더 큰 모습과 새로운 디테일로 성장했어요." };
    if (level >= 50) return { stage: 2, name: "루키", description: "한층 성장한 공부 친구예요." };
    return { stage: 1, name: "새싹", description: "책을 들고 첫 공부를 시작했어요." };
  }
  function readCharacter(study) {
    const meta = STUDIES[study];
    const fallback = { name: meta.defaultName, avatar: meta.defaultAvatar };
    try {
      const data = JSON.parse(localStorage.getItem(PROFILE_KEYS[study]) || localStorage.getItem(LEGACY_PROFILE_KEY) || "null");
      if (!data || typeof data !== "object") return fallback;
      const oldAvatar = data.avatar === "panda" ? "bear" : data.avatar;
      return {
        name: typeof data.name === "string" && data.name.trim() ? data.name.trim().slice(0, 16) : fallback.name,
        avatar: AVATARS.some(a => a.id === oldAvatar) ? oldAvatar : fallback.avatar
      };
    } catch (_) { return fallback; }
  }
  const profiles = { english: readCharacter("english"), korean: readCharacter("korean") };
  let activeStudy = "english";
  const lastLevels = { english: null, korean: null };
  let toastTimer;
  function illustration(study, override) {
    const animal = override || profiles[study].avatar;
    if (window.JINI_CHARACTER_ART && typeof window.JINI_CHARACTER_ART.render === "function")
      return window.JINI_CHARACTER_ART.render({ avatar: animal, level: readScore(study).level });
    return '<span class="jgc-fallback" aria-hidden="true">' + avatarOf(animal).icon + '</span>';
  }
  function saveProfile(study) {
    try { localStorage.setItem(PROFILE_KEYS[study], JSON.stringify(profiles[study])); }
    catch (_) { /* Still active in this tab. */ }
  }
  function renderPanels() {
    panels.forEach(function (panel) {
      const study = studyOf(panel.dataset.jiniCharacterPanel);
      const score = readScore(study);
      const profile = profiles[study];
      const tier = growth(score.level);
      panel.innerHTML = '<button type="button" class="jgc-card" data-jgc-action="open" data-jgc-study="' + study +
        '" aria-label="' + STUDIES[study].label + ' 캐릭터, 레벨 ' + score.level + '">' +
        '<span class="jgc-card-art" aria-hidden="true">' + illustration(study) + '</span>' +
        '<span class="jgc-card-info"><span class="jgc-label">' + STUDIES[study].label + ' · 나의 캐릭터</span>' +
        '<span class="jgc-name">' + escape(profile.name) + '<strong>Lv.' + score.level + '</strong></span>' +
        '<span class="jgc-tier">' + tier.name + ' · ' + avatarOf(profile.avatar).label + '</span>' +
        '<span class="jgc-track"><span style="width:' + score.percent + '%"></span></span>' +
        '<span class="jgc-meter">' + score.inLevel + ' / 100 XP · 다음 레벨까지 ' + score.untilNext +
        ' XP</span></span><span class="jgc-card-arrow">보기 ›</span></button>';
    });
  }
  function renderDialog() {
    const study = activeStudy;
    const score = readScore(study);
    const profile = profiles[study];
    const tier = growth(score.level);
    const label = STUDIES[study].label;
    const savedScroll = dialog.scrollTop;
    dialog.innerHTML =
      '<div class="jgc-dialog-content"><div class="jgc-dialog-head"><span class="jgc-kicker">' + label +
      ' · MY CHARACTER</span><button type="button" class="jgc-close" data-jgc-action="close" aria-label="캐릭터 창 닫기">✕</button></div>' +
      '<div class="jgc-portrait"><span class="jgc-portrait-art" aria-hidden="true">' + illustration(study) + '</span>' +
      '<span class="jgc-level">Lv.' + score.level + ' · ' + tier.name + '</span>' +
      '<h2 id="jini-character-title">' + escape(profile.name) + '</h2><p>' + tier.description + '</p></div>' +
      '<div class="jgc-xp-section"><div class="jgc-xp-heading"><strong>' + label + ' 레벨 ' + score.level +
      ' → ' + (score.level + 1) + '</strong><span>' + score.inLevel + ' / 100 XP</span></div>' +
      '<div class="jgc-large-track"><span style="width:' + score.percent + '%"></span></div>' +
      '<p>누적 ' + score.xp.toLocaleString() + ' XP · 다음 레벨까지 ' + score.untilNext + ' XP · 레벨 제한 없음</p></div>' +
      '<div class="jgc-choices"><label for="jgc-name-input">' + label + ' 캐릭터 이름</label>' +
      '<input id="jgc-name-input" maxlength="16" value="' + escape(profile.name) +
      '" placeholder="캐릭터 이름" autocomplete="off">' +
      '<span class="jgc-choice-title">캐릭터 종류</span><div class="jgc-avatar-options">' +
      AVATARS.map(function (a) {
        return '<button type="button" class="jgc-avatar-option' + (a.id === profile.avatar ? ' is-selected' : '') +
          '" data-jgc-action="avatar" data-avatar="' + a.id + '" aria-pressed="' + (a.id === profile.avatar) +
          '" aria-label="' + a.label + ' 선택"><span class="jgc-animal-art" aria-hidden="true">' +
          illustration(study, a.id) + '</span><small>' + a.label + '</small></button>';
      }).join("") + '</div><p class="jgc-tip">Lv.50과 Lv.100에 캐릭터 모습이 성장해요. 레벨은 100 이후에도 계속 오르며, 영어·한글의 경험치는 각각 저장돼요. ' +
      '처음 맞힌 문제만 +10 XP가 지급됩니다. 학습 기록은 이 브라우저에 저장됩니다.</p></div></div>';
    dialog.scrollTop = savedScroll;
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
    const milestone = level === 50 ? " 루키 성장!" : level === 100 ? " 에이스 성장!" : "";
    toast.textContent = "🎉 " + STUDIES[study].label + " Lv." + level + " 달성!" + milestone;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 3200);
  }
  function refresh() {
    ["english", "korean"].forEach(function (study) {
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
  document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-jgc-action]");
    if (!button) return;
    const action = button.dataset.jgcAction;
    if (action === "open") { open(button.dataset.jgcStudy); return; }
    if (action === "close") {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
      return;
    }
    if (action !== "avatar" || !AVATARS.some(a => a.id === button.dataset.avatar)) return;
    profiles[activeStudy].avatar = button.dataset.avatar;
    saveProfile(activeStudy);
    refresh();
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  });
  dialog.addEventListener("change", function (event) {
    if (event.target.id !== "jgc-name-input") return;
    profiles[activeStudy].name = event.target.value.trim().slice(0, 16) || STUDIES[activeStudy].defaultName;
    saveProfile(activeStudy);
    refresh();
  });
  dialog.addEventListener("keydown", function (event) {
    if (event.target.id === "jgc-name-input" && event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  });
  window.addEventListener("storage", function (event) {
    if ([STUDIES.english.xpKey, STUDIES.korean.xpKey, LEGACY_PROFILE_KEY].concat(Object.values(PROFILE_KEYS)).includes(event.key)) {
      if (event.key === PROFILE_KEYS.english) profiles.english = readCharacter("english");
      if (event.key === PROFILE_KEYS.korean) profiles.korean = readCharacter("korean");
      refresh();
    }
  });
  window.JINI_CHARACTER = { refresh: refresh, open: open, getStatus: readScore };
  refresh();
}());

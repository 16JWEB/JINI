/* JINI study mascots: independent English/Korean characters, actual XP, repeatable unlocks. */
(function () {
  "use strict";
  const XP_PER_LEVEL = 100;
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
  const AVATARS = [
    { id: "rabbit", icon: "🐰", label: "토끼" },
    { id: "cat", icon: "🐱", label: "고양이" },
    { id: "bear", icon: "🐻", label: "곰" },
    { id: "fox", icon: "🦊", label: "여우" }
  ];
  const COLORS = [
    { id: "blue", name: "블루", hex: "#6499E8" },
    { id: "purple", name: "퍼플", hex: "#AC84E8" },
    { id: "pink", name: "핑크", hex: "#EE91B8" },
    { id: "mint", name: "민트", hex: "#61C7B3" },
    { id: "yellow", name: "옐로", hex: "#EABF67" },
    { id: "black", name: "차콜", hex: "#687288" }
  ];
  const DEFAULT_EQUIPPED = { hat: "none", bag: "none", book: "basic", outfit: "basic", effect: "none" };
  const ITEMS = {
    hat: [
      { id: "none", name: "기본", icon: "—", lv: 1 },
      { id: "ribbon", name: "핑크 리본", icon: "🎀", lv: 10 },
      { id: "flower", name: "꽃장식", icon: "🌸", lv: 60 },
      { id: "crown", name: "왕관", icon: "👑", lv: 90 },
      { id: "scholar", name: "마법사 모자", icon: "🎓", lv: 110 }
    ],
    bag: [
      { id: "none", name: "기본", icon: "—", lv: 1 },
      { id: "backpack", name: "책가방", icon: "🎒", lv: 20 },
      { id: "premium", name: "고급 가방", icon: "👜", lv: 80 },
      { id: "explorer", name: "모험 가방", icon: "💼", lv: 130 }
    ],
    book: [
      { id: "basic", name: "기본 책", icon: "📖", lv: 1 },
      { id: "special", name: "별빛 책", icon: "📘", lv: 30 },
      { id: "cosmic", name: "별자리 책", icon: "📙", lv: 140 }
    ],
    outfit: [
      { id: "basic", name: "기본 옷", icon: "👕", lv: 1 },
      { id: "academy", name: "학생복", icon: "👔", lv: 40 },
      { id: "robe", name: "마법사 의상", icon: "🧥", lv: 70 },
      { id: "royal", name: "왕실 의상", icon: "👘", lv: 120 }
    ]
  };
  const REWARDS = [
    { level: 10, label: "핑크 리본", icon: "🎀" },
    { level: 20, label: "책가방", icon: "🎒" },
    { level: 30, label: "별빛 책", icon: "📘" },
    { level: 40, label: "학생복", icon: "👔" },
    { level: 50, label: "루키 성장", icon: "🌱", growth: true },
    { level: 60, label: "꽃장식", icon: "🌸" },
    { level: 70, label: "마법사 의상", icon: "🧥" },
    { level: 80, label: "고급 가방", icon: "👜" },
    { level: 90, label: "왕관", icon: "👑" },
    { level: 100, label: "에이스 성장", icon: "🌟", growth: true },
    { level: 110, label: "마법사 모자", icon: "🎓" },
    { level: 120, label: "왕실 의상", icon: "👘" },
    { level: 130, label: "모험 가방", icon: "💼" },
    { level: 140, label: "별자리 책", icon: "📙" }
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
    return {
      study: key, xp: xp, level: Math.floor(xp / XP_PER_LEVEL) + 1,
      inLevel: xp % XP_PER_LEVEL,
      untilNext: XP_PER_LEVEL - xp % XP_PER_LEVEL,
      percent: xp % XP_PER_LEVEL
    };
  }
  function growth(level) {
    if (level >= 100) return { stage: 3, name: "에이스", description: "더 큰 모습과 새로운 디테일로 성장했어요." };
    if (level >= 50) return { stage: 2, name: "루키", description: "한층 성장한 공부 친구예요." };
    return { stage: 1, name: "새싹", description: "책을 들고 첫 공부를 시작했어요." };
  }
  function readCharacter(study) {
    const meta = STUDIES[study];
    const fallback = { name: meta.defaultName, avatar: meta.defaultAvatar, color: study === "english" ? "blue" : "purple", equipped: Object.assign({}, DEFAULT_EQUIPPED) };
    try {
      const saved = localStorage.getItem(PROFILE_KEYS[study]);
      const data = JSON.parse(saved || localStorage.getItem(LEGACY_PROFILE_KEY) || "null");
      if (!data || typeof data !== "object") return fallback;
      const oldAvatar = data.avatar === "panda" ? "bear" : data.avatar;
      const avatar = AVATARS.some(a => a.id === oldAvatar) ? oldAvatar : fallback.avatar;
      const color = COLORS.some(c => c.id === data.color) ? data.color : fallback.color;
      const equipped = Object.assign({}, DEFAULT_EQUIPPED);
      Object.keys(ITEMS).forEach(function (slot) {
        const id = data.equipped && data.equipped[slot];
        if (ITEMS[slot].some(entry => entry.id === id)) equipped[slot] = id;
      });
      return {
        name: typeof data.name === "string" && data.name.trim() ? data.name.trim().slice(0, 16) : fallback.name,
        avatar: avatar, color: color, equipped: equipped
      };
    } catch (_) { return fallback; }
  }
  const profiles = { english: readCharacter("english"), korean: readCharacter("korean") };
  let activeStudy = "english";
  const lastLevels = { english: null, korean: null };
  let toastTimer;
  function effectiveEquipment(study) {
    const score = readScore(study);
    const stored = profiles[study].equipped;
    const safe = {};
    Object.keys(ITEMS).forEach(function (slot) {
      const selected = ITEMS[slot].find(entry => entry.id === stored[slot]);
      safe[slot] = selected && score.level >= selected.lv ? selected.id : DEFAULT_EQUIPPED[slot];
    });
    return safe;
  }
  function illustration(study, avatarOverride) {
    const profile = profiles[study];
    const animal = avatarOverride || profile.avatar;
    if (window.JINI_CHARACTER_ART && typeof window.JINI_CHARACTER_ART.render === "function") {
      return window.JINI_CHARACTER_ART.render({
        avatar: animal, color: profile.color, level: readScore(study).level,
        equipped: effectiveEquipment(study)
      });
    }
    return '<span class="jgc-fallback" aria-hidden="true">' + avatarOf(animal).icon + '</span>';
  }
  function saveProfile(study) {
    try { localStorage.setItem(PROFILE_KEYS[study], JSON.stringify(profiles[study])); }
    catch (_) { /* Changes remain active for this tab. */ }
  }
  function renderPanels() {
    panels.forEach(function (panel) {
      const study = studyOf(panel.dataset.jiniCharacterPanel);
      const score = readScore(study);
      const profile = profiles[study];
      const tier = growth(score.level);
      panel.innerHTML =
        '<button type="button" class="jgc-card" data-jgc-action="open" data-jgc-study="' + study +
        '" aria-label="' + STUDIES[study].label + ' 캐릭터 꾸미기, 레벨 ' + score.level + '">' +
        '<span class="jgc-card-art" aria-hidden="true">' + illustration(study) + '</span>' +
        '<span class="jgc-card-info"><span class="jgc-label">' + STUDIES[study].label + ' · 나의 캐릭터</span>' +
        '<span class="jgc-name">' + escape(profile.name) + '<strong>Lv.' + score.level + '</strong></span>' +
        '<span class="jgc-tier">' + tier.name + ' · ' + avatarOf(profile.avatar).label + '</span>' +
        '<span class="jgc-track"><span style="width:' + score.percent + '%"></span></span>' +
        '<span class="jgc-meter">' + score.inLevel + ' / 100 XP · 다음 레벨까지 ' + score.untilNext + ' XP</span></span>' +
        '<span class="jgc-card-arrow">꾸미기 ›</span></button>';
    });
  }
  function rewardBox(entry, level) {
    const unlocked = level >= entry.level;
    return '<div class="jgc-reward' + (unlocked ? ' is-unlocked' : ' is-locked') +
      (entry.growth ? ' is-growth' : '') + '">' +
      '<span class="jgc-reward-icon">' + (unlocked ? entry.icon : '🔒') + '</span>' +
      '<span class="jgc-reward-data"><strong>Lv.' + entry.level + '</strong><small>' + entry.label + '</small></span>' +
      '<span class="jgc-reward-status">' + (unlocked ? "해금" : "잠김") + '</span></div>';
  }
  function slotChoices(study, slot, label) {
    const level = readScore(study).level;
    const current = effectiveEquipment(study)[slot];
    const available = ITEMS[slot].filter(function (entry) { return level >= entry.lv; });
    return '<fieldset class="jgc-item-slot"><legend>' + label + '</legend><div class="jgc-item-buttons">' +
      available.map(function (entry) {
        const preview = window.JINI_CHARACTER_ART && window.JINI_CHARACTER_ART.itemPreview
          ? window.JINI_CHARACTER_ART.itemPreview(slot, entry.id)
          : '<span class="jgc-item-emoji" aria-hidden="true">' + entry.icon + '</span>';
        return '<button type="button" class="jgc-item' + (entry.id === current ? ' is-selected' : '') +
          '" data-jgc-action="item" data-slot="' + slot + '" data-item="' + entry.id +
          '" aria-pressed="' + (entry.id === current) + '">' + preview +
          '<span class="jgc-item-label">' + escape(entry.name) + '</span></button>';
      }).join("") + '</div></fieldset>';
  }
  function equippedSummary(study) {
    const equipped = effectiveEquipment(study);
    const labels = { hat: "모자", outfit: "옷", bag: "가방", book: "책" };
    return '<div class="jgc-equipped-summary" aria-label="현재 착용 중인 아이템">' +
      Object.keys(labels).map(function (slot) {
        const selected = ITEMS[slot].find(function (item) { return item.id === equipped[slot]; }) || ITEMS[slot][0];
        return '<span class="jgc-equipped-chip"><span aria-hidden="true">' + selected.icon + '</span><small>' +
          labels[slot] + '</small><strong>' + escape(selected.name) + '</strong></span>';
      }).join("") + '</div>';
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
      '<div class="jgc-portrait">' +
      '<span class="jgc-portrait-art" aria-hidden="true">' + illustration(study) + '</span>' +
      '<span class="jgc-level">Lv.' + score.level + ' · ' + tier.name + '</span>' +
      '<h2 id="jini-character-title">' + escape(profile.name) + '</h2>' +
      '<p>' + tier.description + ' 영어·한글은 각각 따로 키울 수 있어요.</p>' +
      equippedSummary(study) + '</div>' +
      '<div class="jgc-xp-section"><div class="jgc-xp-heading"><strong>' + label + ' 레벨 ' + score.level + ' → ' +
      (score.level + 1) + '</strong><span>' + score.inLevel + ' / 100 XP</span></div>' +
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
      }).join("") + '</div>' +
      '<span class="jgc-choice-title">아이템 꾸미기</span>' +
      slotChoices(study, "hat", "머리장식") + slotChoices(study, "bag", "가방") +
      slotChoices(study, "book", "책") + slotChoices(study, "outfit", "의상") +
      '<p class="jgc-coordination-tip">성장해도 선택한 아이템 설정은 유지돼요. 획득한 아이템은 언제든 다시 선택할 수 있어요.</p>' +
      '<p class="jgc-tip">Lv.50 · Lv.100에 외형이 성장합니다. Lv.110~140에는 새 꾸미기 아이템이 추가됩니다. 150레벨 오라는 추후 공개할 예정이에요. ' +
      '100레벨 이후에도 레벨이 계속 올라가며, 게임에서 처음 맞힌 문제에만 +10 XP를 지급해요. ' +
      '기존 XP와 학습 기록은 그대로 유지됩니다. 설정은 이 브라우저에 저장됩니다.</p></div>';
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
    const milestone = REWARDS.find(r => r.level === level);
    toast.textContent = "🎉 " + STUDIES[study].label + " Lv." + level + " 달성!" +
      (milestone ? " " + (milestone.growth ? milestone.label + "!" : milestone.label + " 해금!") : "");
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
    if (action === "avatar") {
      if (!AVATARS.some(a => a.id === button.dataset.avatar)) return;
      profiles[activeStudy].avatar = button.dataset.avatar;
    } else if (action === "color") {
      if (!COLORS.some(c => c.id === button.dataset.color)) return;
      profiles[activeStudy].color = button.dataset.color;
    } else if (action === "item") {
      const slot = button.dataset.slot;
      const entry = Object.prototype.hasOwnProperty.call(ITEMS, slot) &&
        ITEMS[slot].find(x => x.id === button.dataset.item);
      if (!entry || readScore(activeStudy).level < entry.lv) return;
      profiles[activeStudy].equipped[slot] = entry.id;
    } else return;
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
    if ([ENGLISH_KEY, KOREAN_KEY, LEGACY_PROFILE_KEY].concat(Object.values(PROFILE_KEYS)).includes(event.key)) {
      if (event.key === PROFILE_KEYS.english) profiles.english = readCharacter("english");
      if (event.key === PROFILE_KEYS.korean) profiles.korean = readCharacter("korean");
      refresh();
    }
  });
  window.JINI_CHARACTER = { refresh: refresh, open: open, getStatus: readScore };
  refresh();
}());

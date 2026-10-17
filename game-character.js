/* JINI study characters: separate XP, expanded growth, selectable level 10–200 aura rewards. */
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
    if (level >= 200) return { stage: 5, name: "별의 수호자", description: "200레벨 성장 연출과 더욱 풍성한 별빛을 얻었어요." };
    if (level >= 150) return { stage: 4, name: "빛의 모험가", description: "새로운 빛의 문장과 특별한 성장 연출이 생겼어요." };
    if (level >= 100) return { stage: 3, name: "에이스", description: "더 큰 모습과 새로운 디테일로 성장했어요." };
    if (level >= 50) return { stage: 2, name: "루키", description: "한층 성장한 공부 친구예요." };
    return { stage: 1, name: "새싹", description: "책을 들고 첫 공부를 시작했어요." };
  }
  function readCharacter(study) {
    const meta = STUDIES[study];
    const fallback = { name: meta.defaultName, avatar: meta.defaultAvatar, auraSelection: "auto" };
    try {
      const data = JSON.parse(localStorage.getItem(PROFILE_KEYS[study]) || localStorage.getItem(LEGACY_PROFILE_KEY) || "null");
      if (!data || typeof data !== "object") return fallback;
      const oldAvatar = data.avatar === "panda" ? "bear" : data.avatar;
      return {
        name: typeof data.name === "string" && data.name.trim() ? data.name.trim().slice(0, 16) : fallback.name,
        avatar: AVATARS.some(a => a.id === oldAvatar) ? oldAvatar : fallback.avatar,
        auraSelection: data.auraSelection === "none" || data.auraSelection === "auto"
          ? data.auraSelection
          : (Number.isInteger(Number(data.auraSelection)) && Number(data.auraSelection) >= 10 &&
             Number(data.auraSelection) <= 200 && Number(data.auraSelection) % 10 === 0
             ? String(data.auraSelection) : "auto")
      };
    } catch (_) { return fallback; }
  }
  const profiles = { english: readCharacter("english"), korean: readCharacter("korean") };
  let activeStudy = "english";
  const lastLevels = { english: null, korean: null };
  let toastTimer;
  function equippedAuraLevel(study) {
    const selected = profiles[study].auraSelection;
    const level = readScore(study).level;
    if (selected === "none") return 0;
    if (selected && selected !== "auto") {
      const specific = Number(selected);
      return window.JINI_AURA && window.JINI_AURA.isUnlocked(level, specific) ? specific : 0;
    }
    return window.JINI_AURA ? window.JINI_AURA.newestUnlocked(level) : 0;
  }
  function auraControls(study) {
    const source = window.JINI_AURA;
    if (!source) return "";
    const score = readScore(study);
    const profile = profiles[study];
    const chosen = profile.auraSelection || "auto";
    const active = equippedAuraLevel(study);
    const name = active ? source.rewardLabel(active, profile.avatar) : "오라 없음";
    function item(value, title, detail, disabled, symbol) {
      const selected = chosen === value;
      return '<button type="button" class="jgc-aura-option' + (selected ? ' is-active' : '') +
        '" data-jgc-action="aura" data-aura="' + value + '" aria-pressed="' + selected +
        '"' + (disabled ? ' disabled aria-label="' + escape(title) + ' 오라 보상 잠금"' : '') + '>' +
        '<span class="jgc-aura-icon" aria-hidden="true">' + symbol + '</span><strong>' +
        escape(title) + '</strong><small>' + escape(detail) + '</small></button>';
    }
    const options = [item("auto", "자동", "최신 오라", false, "✨"), item("none", "해제", "오라 없음", false, "○")];
    source.LEVELS.forEach(function (lv) {
      const unlocked = score.level >= lv;
      options.push(item(String(lv), "Lv." + lv, unlocked ? source.NAMES[lv / 10 - 1] : "잠금", !unlocked, unlocked ? "✦" : "🔒"));
    });
    return '<div class="jgc-aura-picker"><div class="jgc-aura-picker-header"><strong>오라 꾸미기</strong>' +
      '<small>10레벨마다 새 오라</small></div><p class="jgc-aura-current">현재: ' + escape(name) +
      '</p><div class="jgc-aura-grid" aria-label="오라 선택">' + options.join("") + '</div></div>';
  }
  function illustration(study, override) {
    const animal = override || profiles[study].avatar;
    if (window.JINI_CHARACTER_ART && typeof window.JINI_CHARACTER_ART.render === "function")
      return window.JINI_CHARACTER_ART.render({ avatar: animal, level: readScore(study).level,
        auraLevel: equippedAuraLevel(study) });
    return '<span class="jgc-fallback" aria-hidden="true">' + avatarOf(animal).icon + '</span>';
  }
  function saveProfile(study) {
    try { localStorage.setItem(PROFILE_KEYS[study], JSON.stringify(profiles[study])); }
    catch (_) { /* Still active in this tab. */ }
  }
  function renderHomePanel(study, score, profile, tier) {
    const meta=STUDIES[study], auraLevel=equippedAuraLevel(study);
    const auraName=auraLevel && window.JINI_AURA ? window.JINI_AURA.rewardLabel(auraLevel,profile.avatar) : "오라 없음";
    const unlocked=Math.min(20,Math.floor(score.level/10));
    return '<button type="button" class="jgc-home-card jgc-home-card-'+study+'" data-jgc-action="open" data-jgc-study="'+study+
      '" aria-label="'+meta.label+' 캐릭터 '+escape(profile.name)+', 레벨 '+score.level+', 상세보기 열기">'+
      '<span class="jgc-home-copy">'+
      '<span class="jgc-home-label"><span class="jgc-home-label-icon" aria-hidden="true">'+(study==="english"?"📘":"📕")+'</span>'+meta.label+' 캐릭터</span>'+
      '<span class="jgc-home-name">'+escape(profile.name)+'</span>'+
      '<span class="jgc-home-level">Lv. <strong>'+score.level+'</strong></span>'+
      '<span class="jgc-home-rank">'+tier.name+' · '+avatarOf(profile.avatar).label+'</span>'+
      '<span class="jgc-home-progress-label"><span>다음 레벨까지</span><strong>'+score.untilNext+' XP</strong></span>'+
      '<span class="jgc-home-track"><span style="width:'+score.percent+'%"></span></span>'+
      '<span class="jgc-home-progress-count">'+score.inLevel+' / 100 XP</span>'+
      '<span class="jgc-home-stats"><span><small>누적 XP</small><strong>'+score.xp.toLocaleString()+'</strong></span>'+
      '<span><small>해금한 오라</small><strong>'+unlocked+' / 20</strong></span></span>'+
      '<span class="jgc-home-aura" title="'+escape(auraName)+'">✨ '+escape(auraName)+'</span>'+
      '<span class="jgc-home-view">캐릭터 상세보기 <span aria-hidden="true">›</span></span>'+
      '</span><span class="jgc-home-illustration" aria-hidden="true">'+illustration(study)+'</span></button>';
  }
  function renderPanels() {
    panels.forEach(function (panel) {
      const study = studyOf(panel.dataset.jiniCharacterPanel);
      const score = readScore(study);
      const profile = profiles[study];
      const tier = growth(score.level);
      if (panel.dataset.jiniCharacterHome === "true") {
        panel.innerHTML=renderHomePanel(study,score,profile,tier);
        return;
      }
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
      }).join("") + '</div>' + auraControls(study) +
      '<p class="jgc-tip">Lv.50·100·150·200에 성장하며, Lv.10부터 10레벨마다 오라가 해금돼요. ' +
      '획득한 오라는 자유롭게 바꿀 수 있고 200레벨 뒤에도 레벨이 계속 오릅니다. ' +
      '처음 맞힌 문제만 +10 XP가 지급되며 영어·한글 기록은 별도로 저장됩니다.</p></div></div>';
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
    const milestone = level === 50 ? " 루키 성장!" : level === 100 ? " 에이스 성장!" :
      level === 150 ? " 빛의 모험가 성장!" : level === 200 ? " 별의 수호자 성장!" :
      level >= 10 && level <= 200 && level % 10 === 0 ? " 새 오라 해금!" : "";
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
    if (action === "avatar") {
      if (!AVATARS.some(a => a.id === button.dataset.avatar)) return;
      profiles[activeStudy].avatar = button.dataset.avatar;
    } else if (action === "aura") {
      const selected = button.dataset.aura;
      if (selected !== "auto" && selected !== "none" &&
          !(window.JINI_AURA && window.JINI_AURA.isUnlocked(readScore(activeStudy).level, selected))) return;
      profiles[activeStudy].auraSelection = selected;
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
    if ([STUDIES.english.xpKey, STUDIES.korean.xpKey, LEGACY_PROFILE_KEY].concat(Object.values(PROFILE_KEYS)).includes(event.key)) {
      if (event.key === PROFILE_KEYS.english) profiles.english = readCharacter("english");
      if (event.key === PROFILE_KEYS.korean) profiles.korean = readCharacter("korean");
      refresh();
    }
  });
  window.JINI_CHARACTER = { refresh: refresh, open: open, getStatus: readScore };
  refresh();
}());

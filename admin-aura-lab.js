/* Read-only admin aura lab: five independent aura concepts, each with 10-50 levels. */
(function () {
  "use strict";
  const panel = document.getElementById("ja-aura-panel");
  if (!panel || panel.dataset.auraLabReady === "true") return;
  const specs = [
    { key: "petal", name: "벚꽃의 정령", icon: "🌸", stages: [
      "분홍빛 첫 반짝임", "작은 꽃잎들이 떠오름", "꽃잎 띠와 은은한 꽃빛", "꽃잎 회오리와 분홍 고리", "벚꽃이 만개하는 꽃비 오라"
    ] },
    { key: "frost", name: "빙결 군주", icon: "❄️", stages: [
      "옅은 푸른 냉기", "조그만 눈꽃 결정", "얼음 결정과 빙결 고리", "냉기 파동과 이중 결정", "빙결 왕관과 선명한 서리 폭풍"
    ] },
    { key: "cyber", name: "사이버 오버클럭", icon: "💠", stages: [
      "작은 네온 점멸", "데이터 조각이 움직임", "네온 사각 궤도 생성", "이중 데이터 링이 회전", "다층 네온 에너지 폭주"
    ] },
    { key: "time", name: "시간의 지배자", icon: "⏳", stages: [
      "은은한 금빛 기운", "시곗바늘 같은 잔광", "로마 숫자 시계 고리", "이중 시간 궤도 회전", "황금빛 시간 파동 완성"
    ] },
    { key: "galaxy", name: "은하의 지배자", icon: "🌌", stages: [
      "작은 별빛의 탄생", "반짝이는 별자리 입자", "은하 궤도가 형성됨", "두 겹의 별빛이 공전", "찬란한 은하 소용돌이 완성"
    ] }
  ];
  const avatars = [
    { id: "rabbit", name: "토끼", emoji: "🐰" },
    { id: "cat", name: "고양이", emoji: "🐱" },
    { id: "bear", name: "곰", emoji: "🐻" },
    { id: "fox", name: "여우", emoji: "🦊" }
  ];
  const levels = [10, 20, 30, 40, 50];
  let avatar = "rabbit", theme = "petal", level = 10;
  const avatarChoices = panel.querySelector("#ja-aura-avatars");
  const themeChoices = panel.querySelector("#ja-aura-themes");
  const cards = panel.querySelector("#ja-aura-cards");
  const focus = panel.querySelector("#ja-aura-focus");
  const detail = panel.querySelector("#ja-aura-focus-desc");
  const heading = panel.querySelector("#ja-aura-stage-title");
  if (!avatarChoices || !themeChoices || !cards || !focus || !detail || !heading) return;
  panel.dataset.auraLabReady = "true";

  function sprite() {
    if (window.JINI_CHARACTER_ART && typeof window.JINI_CHARACTER_ART.render === "function") {
      // Fixed character artwork at level 1; ONLY the surrounding aura grows.
      return window.JINI_CHARACTER_ART.render({ avatar: avatar, level: 1, auraLevel: 0 });
    }
    const a = avatars.find(item => item.id === avatar);
    return '<span class="jal-emoji">' + (a ? a.emoji : "🐰") + '</span>';
  }
  function stage(spec, tier, large) {
    const sparks = Array.from({ length: 5 }, (_, i) =>
      '<i class="jal-spark jal-spark-' + (i + 1) + '"></i>').join("");
    return '<span class="jal-stage jal-' + spec.key + ' jal-tier-' + tier +
      (large ? " jal-large" : "") + '" aria-hidden="true">' +
      '<span class="jal-glow"></span><span class="jal-burst"></span>' +
      '<span class="jal-ring jal-ring-a"></span><span class="jal-ring jal-ring-b"></span>' +
      '<span class="jal-glyph"></span>' + sparks +
      '<span class="jal-sprite">' + sprite() + '</span></span>';
  }
  function render() {
    const spec = specs.find(item => item.key === theme) || specs[0];
    avatarChoices.innerHTML = avatars.map(a =>
      '<button class="jal-switch' + (avatar === a.id ? " is-selected" : "") +
      '" type="button" data-jal-avatar="' + a.id + '" aria-pressed="' + (avatar === a.id) +
      '">' + a.emoji + " " + a.name + "</button>").join("");
    themeChoices.innerHTML = specs.map(a =>
      '<button class="jal-switch' + (theme === a.key ? " is-selected" : "") +
      '" type="button" data-jal-theme="' + a.key + '" aria-pressed="' + (theme === a.key) +
      '">' + a.icon + " " + a.name + "</button>").join("");
    heading.textContent = spec.icon + " " + spec.name + " · 단계별 성장";
    cards.innerHTML = levels.map((stageLevel, i) =>
      '<button type="button" class="jal-card' + (level === stageLevel ? " is-selected" : "") +
      '" data-jal-level="' + stageLevel + '" aria-pressed="' + (level === stageLevel) + '">' +
      '<span class="jal-card-art">' + stage(spec, i + 1, false) + '</span>' +
      '<span class="jal-card-copy"><span class="jal-level">LV.' + stageLevel +
      ' · ' + (i + 1) + '/5단계</span><strong>' + spec.stages[i] +
      '</strong><small>' + (i === 4 ? "완성형 오라 시안" : "다음 레벨에 더욱 화려해져요") +
      "</small></span></button>"
    ).join("");
    const tier = levels.indexOf(level) + 1;
    focus.innerHTML = stage(spec, tier, true);
    detail.textContent = spec.name + " · Lv." + level + " (" + tier +
      "/5단계) — " + spec.stages[tier - 1] +
      " / 캐릭터 그림은 고정, 오라만 단계별 변화 · 미리보기 전용";
  }
  panel.addEventListener("click", event => {
    const choice = event.target.closest("[data-jal-avatar],[data-jal-theme],[data-jal-level]");
    if (!choice || !panel.contains(choice)) return;
    const chosenAvatar = choice.dataset.jalAvatar;
    const chosenTheme = choice.dataset.jalTheme;
    const chosenLevel = Number(choice.dataset.jalLevel);
    if (chosenAvatar && avatars.some(a => a.id === chosenAvatar)) avatar = chosenAvatar;
    if (chosenTheme && specs.some(a => a.key === chosenTheme)) {
      theme = chosenTheme;
      level = 10;
    }
    if (levels.includes(chosenLevel)) level = chosenLevel;
    render();
  });
  render();
  window.JINI_ADMIN_AURA_LAB = { refresh: render };
}());

/* Admin-only, read-only aura lab. Loaded on demand; does not write progress. */
(function () {
  "use strict";
  const panel = document.getElementById("ja-aura-panel");
  if (!panel || panel.dataset.auraLabReady === "true") return;
  panel.dataset.auraLabReady = "true";
  const specs = [
    { level: 10, key: "petal", name: "벚꽃의 정령", desc: "분홍 꽃잎이 흩날리는 부드러운 오라" },
    { level: 20, key: "frost", name: "빙결 군주", desc: "빙결 결정과 푸른 냉기를 두른 오라" },
    { level: 30, key: "cyber", name: "사이버 오버클럭", desc: "네온 사각 궤도와 디지털 에너지" },
    { level: 40, key: "time", name: "시간의 지배자", desc: "황금 시계판과 시간의 고리" },
    { level: 50, key: "galaxy", name: "은하의 지배자", desc: "공전하는 우주 고리와 반짝이는 별" }
  ];
  const avatars = [
    { id: "rabbit", name: "토끼", emoji: "🐰" }, { id: "cat", name: "고양이", emoji: "🐱" },
    { id: "bear", name: "곰", emoji: "🐻" }, { id: "fox", name: "여우", emoji: "🦊" }
  ];
  let avatar = "rabbit", testLevel = 50, selected = 50;
  const avatarChoices = panel.querySelector("#ja-aura-avatars");
  const levelChoices = panel.querySelector("#ja-aura-levels");
  const cards = panel.querySelector("#ja-aura-cards");
  const focus = panel.querySelector("#ja-aura-focus");
  const detail = panel.querySelector("#ja-aura-focus-desc");
  const escape = value => String(value).replace(/[&<>"']/g, char =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&quot;" }[char]));
  function sprite() {
    if (window.JINI_CHARACTER_ART && typeof window.JINI_CHARACTER_ART.render === "function") {
      // Explicit 0 turns OFF the existing species-specific aura. New aura lives
      // only in the lab's surrounding layer, never inside saved profiles.
      return window.JINI_CHARACTER_ART.render({ avatar: avatar, level: testLevel, auraLevel: 0 });
    }
    const a = avatars.find(a => a.id === avatar);
    return '<span class="jal-emoji">' + (a ? a.emoji : "🐰") + '</span>';
  }
  function stage(spec, large) {
    const sparks = Array.from({ length: 5 }, (_, index) =>
      '<i class="jal-spark jal-spark-' + (index + 1) + '"></i>').join("");
    return '<span class="jal-stage jal-' + spec.key + (large ? ' jal-large' : '') + '" aria-hidden="true">' +
      '<span class="jal-glow"></span><span class="jal-ring jal-ring-a"></span>' +
      '<span class="jal-ring jal-ring-b"></span><span class="jal-glyph"></span>' +
      sparks + '<span class="jal-sprite">' + sprite() + '</span></span>';
  }
  function render() {
    avatarChoices.innerHTML = avatars.map(a =>
      '<button class="jal-switch' + (avatar === a.id ? ' is-selected' : '') +
      '" type="button" data-jal-avatar="' + a.id + '" aria-pressed="' + (avatar === a.id) +
      '">' + a.emoji + ' ' + a.name + '</button>').join("");
    levelChoices.innerHTML = [1, 10, 20, 30, 40, 50].map(lvl =>
      '<button class="jal-switch' + (testLevel === lvl ? ' is-selected' : '') +
      '" type="button" data-jal-level="' + lvl + '" aria-pressed="' + (testLevel === lvl) +
      '">Lv.' + lvl + '</button>').join("");
    cards.innerHTML = specs.map(spec => {
      const unlocked = testLevel >= spec.level;
      return '<button type="button" class="jal-card' + (selected === spec.level ? ' is-selected' : '') +
        '" data-jal-select="' + spec.level + '" aria-pressed="' + (selected === spec.level) + '">' +
        '<span class="jal-card-art">' + stage(spec, false) + '</span>' +
        '<span class="jal-card-copy"><span class="jal-level">LV.' + spec.level + ' 보상 ' +
        (unlocked ? '<span class="jal-unlocked">해금 예시</span>' : '<span class="jal-locked">잠금 예시</span>') +
        '</span><strong>' + escape(spec.name) + '</strong><small>' + escape(spec.desc) + '</small></span></button>';
    }).join("");
    const spec = specs.find(a => a.level === selected) || specs[0];
    const unlocked = testLevel >= spec.level;
    focus.innerHTML = stage(spec, true);
    detail.textContent = "Lv." + spec.level + " · " + spec.name + " — " + spec.desc +
      " / 시뮬레이션 Lv." + testLevel + (unlocked ? "에서 해금" : "에서는 잠금") +
      " (테스트에서는 모든 오라 미리보기 가능)";
  }
  panel.addEventListener("click", function (event) {
    const choice = event.target.closest("[data-jal-avatar],[data-jal-level],[data-jal-select]");
    if (!choice || !panel.contains(choice)) return;
    if (choice.dataset.jalAvatar && avatars.some(a => a.id === choice.dataset.jalAvatar)) avatar = choice.dataset.jalAvatar;
    if (choice.dataset.jalLevel) {
      const lvl = Number(choice.dataset.jalLevel);
      if ([1, 10, 20, 30, 40, 50].includes(lvl)) testLevel = lvl;
    }
    if (choice.dataset.jalSelect) {
      const lvl = Number(choice.dataset.jalSelect);
      if (specs.some(s => s.level === lvl)) selected = lvl;
    }
    render();
  });
  render();
  window.JINI_ADMIN_AURA_LAB = { refresh: render };
}());

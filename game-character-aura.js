/* JINI aura catalog: lightweight SVG layers, no image downloads or wearable equipment. */
(function () {
  "use strict";
  const LEVELS = Array.from({ length: 20 }, (_, i) => (i + 1) * 10);
  const NAMES = [
    "첫 반짝임","빛의 가루","은은한 광채","작은 후광","성장의 빛",
    "빛의 물결","별빛 소용돌이","마법의 고리","찬란한 궤적","각성의 빛",
    "유성의 가루","신비한 문양","정령의 기운","황금빛 궤도","별의 축복",
    "정령의 날개","빛의 소용돌이","천상의 고리","오로라의 춤","별의 수호자"
  ];
  const THEMES = {
    rabbit: { name:"벚꽃", glow:"#f880b0", light:"#ffd5e5", bright:"#ffb9d7", gold:"#f7c988", symbol:"✿" },
    cat:    { name:"별빛", glow:"#699aee", light:"#d5eaff", bright:"#b8cfff", gold:"#ffe2a0", symbol:"✦" },
    bear:   { name:"숲빛", glow:"#70b987", light:"#d7f2d7", bright:"#b5e8b2", gold:"#ffdc90", symbol:"❧" },
    fox:    { name:"불꽃", glow:"#f78d55", light:"#ffdbaf", bright:"#ffd080", gold:"#ffe6a0", symbol:"✧" }
  };
  const clampLevel = value => Math.min(200, Math.max(0, Math.floor((Number(value) || 0) / 10) * 10));
  const newestUnlocked = level => clampLevel(level);
  const isUnlocked = (level, reward) => LEVELS.includes(Number(reward)) && Number(level) >= Number(reward);
  const rewardLabel = (reward, avatar) => {
    const i = LEVELS.indexOf(Number(reward));
    const theme = THEMES[avatar] || THEMES.rabbit;
    return i < 0 ? "오라 없음" : theme.name + " · " + NAMES[i];
  };
  let instance = 0;
  function decorate(x, y, r, color, alt) {
    return '<g transform="translate('+x+' '+y+')" opacity="'+alt+'"><path d="M0 '+(-r)+' L'+(r*.27)+' '+(-r*.27)+' L'+r+' 0 L'+(r*.27)+' '+(r*.27)+' L0 '+r+' L'+(-r*.27)+' '+(r*.27)+' L'+(-r)+' 0 L'+(-r*.27)+' '+(-r*.27)+'Z" fill="'+color+'"/></g>';
  }
  function render(avatar, rawLevel) {
    const level = clampLevel(rawLevel);
    if (level < 10) return "";
    const theme = THEMES[avatar] || THEMES.rabbit;
    const tier = Math.ceil(level / 50);
    const count = Math.min(18, 2 + Math.floor(level / 12));
    const id = "jgc-aura-" + (++instance);
    const width = level >= 150 ? 10 : level >= 80 ? 7 : 4;
    const radius = level >= 150 ? 167 : 147;
    const opacity = Math.min(.85, .32 + level / 430);
    let stars = "";
    for (let i = 0; i < count; i++) {
      const a = (i * 137.508 + level * 2.8) * Math.PI / 180;
      const dist = 128 + (i * 17 % 47);
      const x = Math.round(210 + Math.cos(a) * dist);
      const y = Math.round(206 + Math.sin(a) * dist * .92);
      stars += decorate(x, y, 3 + (i % 3) * 2, i % 4 ? theme.light : theme.gold, .5 + (i % 4) * .12);
    }
    const ring = level >= 40
      ? '<ellipse cx="210" cy="209" rx="'+radius+'" ry="'+Math.round(radius*.86)+'" stroke="url(#'+id+'-line)" stroke-width="'+width+'" fill="none" stroke-dasharray="'+(level<80?"4 17":"2 0")+'" opacity="'+opacity+'"/>'
      : "";
    const orbit = level >= 80
      ? '<ellipse cx="210" cy="352" rx="112" ry="27" fill="none" stroke="'+theme.gold+'" stroke-width="'+(tier+1)+'" opacity="'+opacity+'"/><ellipse cx="210" cy="351" rx="82" ry="18" stroke="'+theme.light+'" stroke-width="2" fill="none" opacity=".7"/>'
      : "";
    const upper = level >= 100
      ? '<path d="M137 83 Q210 '+(tier>=4?0:25)+' 283 83" fill="none" stroke="'+theme.gold+'" stroke-width="'+(tier+1)+'" opacity=".85"/>'+decorate(210, 47, tier>=4?14:9, theme.gold,.95)
      : "";
    const wings = level >= 160
      ? '<path d="M133 180 Q20 130 38 74 Q73 114 124 116 M287 180 Q400 130 382 74 Q347 114 296 116" stroke="url(#'+id+'-line)" stroke-width="9" stroke-linecap="round" fill="none" opacity=".7"/>'
      : "";
    const sigils = level >= 120
      ? [40, 380].map((x,i) => decorate(x, i ? 145 : 145, 11, theme.gold,.9)).join("")
      : "";
    return '<span class="jgc-aura jgc-aura-tier-'+tier+'" aria-hidden="true" data-aura-level="'+level+'">' +
      '<svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">' +
      '<defs><radialGradient id="'+id+'-glow"><stop offset="0%" stop-color="'+theme.light+'" stop-opacity="0"/><stop offset="73%" stop-color="'+theme.glow+'" stop-opacity=".08"/><stop offset="90%" stop-color="'+theme.glow+'" stop-opacity=".38"/><stop offset="100%" stop-color="'+theme.light+'" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="'+id+'-line" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+theme.light+'"/><stop offset=".5" stop-color="'+theme.glow+'"/><stop offset="1" stop-color="'+theme.gold+'"/></linearGradient></defs>' +
      '<ellipse cx="210" cy="210" rx="'+(level<40?140:182)+'" ry="'+(level<40?125:171)+'" fill="url(#'+id+'-glow)" />' +
      (level >= 30 ? '<path d="M99 309 Q210 365 321 309" stroke="'+theme.bright+'" stroke-width="8" fill="none" opacity=".35"/>':"") +
      ring + orbit + upper + wings + sigils + stars +
      (level>=200 ? '<circle cx="210" cy="208" r="188" fill="none" stroke="'+theme.gold+'" stroke-width="2" opacity=".5" stroke-dasharray="3 12"/>':"") +
      '</svg></span>';
  }
  window.JINI_AURA = { LEVELS, NAMES, THEMES, newestUnlocked, isUnlocked, rewardLabel, render };
}());

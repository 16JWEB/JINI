/* HD JINI mascot atlas: four original HD mascots with 150/200 growth overlays and independently selectable aura effects. */
(function () {
  "use strict";
  const SPECIES = { rabbit: "토끼", cat: "고양이", bear: "곰", fox: "여우" };
  const Y = { rabbit: "0%", cat: "33.333333%", bear: "66.666667%", fox: "100%" };
  const X = ["0%", "50%", "100%"];
  const css = `
.jgc-mascot{display:block!important;position:relative;width:100%;height:100%;aspect-ratio:1;flex:none;isolation:isolate;overflow:visible!important}
.jgc-base-art{position:absolute;display:block;pointer-events:none;background-repeat:no-repeat;image-rendering:auto}
.jgc-base-art{inset:0;background-image:url("icons/jini-mascot-atlas.avif?v=20261021-optimized-v1");background-size:300% 400%;background-position:var(--jgc-x) var(--jgc-y);z-index:1}
`;
  let style = document.getElementById("jini-ai-art-styles");
  if (!style) { style = document.createElement("style"); style.id = "jini-ai-art-styles"; document.head.appendChild(style); }
  style.textContent = css;
  function render(config) {
    config = config || {};
    const animal = Object.prototype.hasOwnProperty.call(SPECIES, config.avatar) ? config.avatar : "rabbit";
    const level = Math.max(1, Number(config.level) || 1);
    const stage = level >= 200 ? 5 : level >= 150 ? 4 : level >= 100 ? 3 : level >= 50 ? 2 : 1;
    // The original HD sprite atlas has three painted stages. Later stages retain its
    // crisp third-stage portrait and add separately rendered ceremonial effects.
    const pictureStage = Math.min(stage, 3);
    const colors = {
      rabbit:["#ffb8d3","#f4a7c0"], cat:["#b7d9ff","#78a8ec"],
      bear:["#b5e6b1","#80b983"], fox:["#ffe0a6","#ef9a55"]
    };
    let growthArt = "";
    if (stage >= 4) {
      const c = colors[animal];
      growthArt = '<span class="jgc-growth-flare" aria-hidden="true"><svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M110 210 Q52 184 40 86 Q96 125 150 153 M310 210 Q368 184 380 86 Q324 125 270 153" fill="none" stroke="'+c[0]+'" stroke-width="'+(stage>=5?18:10)+'" stroke-linecap="round" opacity=".6"/>' +
        '<path d="M70 290 Q210 410 350 290" fill="none" stroke="'+c[1]+'" stroke-width="'+(stage>=5?15:8)+'" stroke-linecap="round" opacity=".6"/></svg></span>' +
        '<span class="jgc-growth-seal" aria-hidden="true"><svg viewBox="0 0 130 90" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M65 7 L75 31 L103 38 L79 51 L88 78 L65 62 L42 78 L51 51 L27 38 L55 31Z" fill="'+c[0]+'" stroke="#f3d28d" stroke-width="'+(stage>=5?5:3)+'" opacity=".9"/>' +
        (stage >= 5 ? '<circle cx="65" cy="44" r="30" fill="none" stroke="#fce7a7" stroke-width="3" stroke-dasharray="3 5"/>' : '') +
        '</svg></span>';
    }
    const aura = window.JINI_AURA && typeof window.JINI_AURA.render === "function"
      ? window.JINI_AURA.render(animal, config.auraLevel) : "";
    return '<span class="jgc-mascot jgc-mascot-stage-' + stage + '" role="img" aria-label="' +
      SPECIES[animal] + ' 캐릭터 성장 ' + stage + '단계" style="--jgc-x:' + X[pictureStage-1] +
      ';--jgc-y:' + Y[animal] + '">' + aura + growthArt +
      '<span class="jgc-base-art" aria-hidden="true"></span></span>';
  }
  window.JINI_CHARACTER_ART = { render: render, species: Object.keys(SPECIES), style: "hd-growth-aura-extended" };
}());

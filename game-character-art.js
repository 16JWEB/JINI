/* Lightweight, dependency-free JINI mascot illustrations. No external images or fonts. */
(function () {
  "use strict";
  const THEMES = {
    blue: { base: "#6499E8", dark: "#3368B8", pale: "#E9F2FF", glow: "#D3E6FF", ink: "#314263" },
    purple: { base: "#AC84E8", dark: "#7452BF", pale: "#F0E8FF", glow: "#E5D9FF", ink: "#554177" },
    pink: { base: "#EE91B8", dark: "#CC5C8D", pale: "#FFF0F6", glow: "#FFE0EE", ink: "#774960" },
    mint: { base: "#61C7B3", dark: "#308E82", pale: "#E5FAF3", glow: "#CFF4E8", ink: "#355D59" },
    yellow: { base: "#EABF67", dark: "#B78532", pale: "#FFF6DF", glow: "#FFECC3", ink: "#655237" },
    black: { base: "#687288", dark: "#394252", pale: "#F0F1F5", glow: "#E1E4EC", ink: "#343B4B" }
  };
  const SPECIES = { rabbit: "토끼", cat: "고양이", bear: "곰", fox: "여우" };
  function item(attrs) {
    return Object.keys(attrs).map(function (key) {
      return " " + key + '="' + String(attrs[key]).replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '"';
    }).join("");
  }
  function e(tag, attrs, inner) {
    return "<" + tag + item(attrs || {}) + (inner === undefined ? "/>" : ">" + inner + "</" + tag + ">");
  }
  function path(d, fill, extra) { return e("path", Object.assign({ d: d, fill: fill }, extra || {})); }
  function oval(x, y, rx, ry, fill, extra) { return e("ellipse", Object.assign({ cx: x, cy: y, rx: rx, ry: ry, fill: fill }, extra || {})); }
  function dot(x, y, r, fill, extra) { return e("circle", Object.assign({ cx: x, cy: y, r: r, fill: fill }, extra || {})); }
  function star(x, y, s, fill) {
    return path("M " + x + " " + (y-s) + " l " + (s*.3) + " " + (s*.7) + " " + (s*.7) + " " + (s*.3) + " -" + (s*.7) + " " + (s*.3) + " -" + (s*.3) + " " + (s*.7) + " -" + (s*.3) + " -" + (s*.7) + " -" + (s*.7) + " -" + (s*.3) + " " + (s*.7) + " -" + (s*.3) + " Z", fill);
  }
  function render(config) {
    const animal = SPECIES[config.avatar] ? config.avatar : "rabbit";
    const p = THEMES[config.color] || THEMES.blue;
    const stage = config.level >= 100 ? 3 : config.level >= 50 ? 2 : 1;
    const equipped = config.equipped || {};
    const outfit = equipped.outfit || "basic";
    const book = equipped.book || "basic";
    const bag = equipped.bag || "none";
    const hat = equipped.hat || "none";
    const effect = equipped.effect || "none";
    const big = stage > 1;
    const master = stage > 2;
    const gold = "#DAB36E";
    const fur = animal === "bear" ? "#FFF7EC" : animal === "fox" ? "#FFF8F1" : "#FFFFFF";
    let s = "";
    s += e("title", {}, SPECIES[animal] + " " + (stage === 1 ? "새싹" : stage === 2 ? "루키" : "에이스"));
    s += dot(150, 150, master ? 135 : big ? 123 : 113, p.pale);
    s += oval(150, 275, 80, 10, p.glow);
    if (big) {
      s += dot(150, 147, master ? 125 : 113, "none", { stroke: p.glow, "stroke-width": master ? 8 : 5, "stroke-dasharray": master ? "9 14" : "3 12" });
      s += star(48, 81, master ? 14 : 9, gold);
      s += star(249, 92, master ? 16 : 10, p.base);
    }
    if (master || effect === "stars") {
      [[42,155,11],[250,167,13],[69,41,8],[222,42,9],[120,25,7]].forEach(function (v,i) { s += star(v[0],v[1],v[2],i%2?gold:p.base); });
      s += dot(37, 208, 4, gold) + dot(266, 127, 5, gold);
    }
    if (animal === "fox") {
      s += path("M204 212 Q284 176 260 240 Q235 267 206 242Z", p.base, { stroke: p.dark, "stroke-width": 3 });
      s += path("M244 224 Q265 202 260 240 Q240 258 223 251Z", fur);
    } else if (animal === "cat") {
      s += path("M206 227 Q271 282 262 189", "none", { stroke: p.base, "stroke-width": 21, "stroke-linecap": "round" });
      s += path("M206 227 Q271 282 262 189", "none", { stroke: p.dark, "stroke-width": 3, "stroke-linecap": "round" });
    } else if (animal === "rabbit") {
      s += dot(214, 229, 20, fur, { stroke: "#D9D2CB", "stroke-width": 2 });
    }
    if (bag !== "none") {
      s += e("rect", { x: 57, y: 161, width: bag === "premium" ? 57 : 49, height: 81, rx: 18, fill: bag === "premium" ? "#C9A16C" : p.dark, stroke: bag === "premium" ? "#A47C46" : p.ink, "stroke-width": 3 });
      s += path("M65 172 Q76 143 98 167", "none", { stroke: gold, "stroke-width": 6 });
      s += e("rect", { x: 65, y: 196, width: 31, height: 24, rx: 8, fill: bag === "premium" ? "#F4DEAE" : p.pale });
      if (bag === "premium") s += star(80, 208, 8, p.dark);
    }
    if (master) {
      s += path("M108 146 Q76 157 55 249 L111 272 Q154 288 194 272 L248 250 Q226 165 185 145Z", p.dark, { stroke: gold, "stroke-width": 4 });
      s += path("M75 253 Q150 272 225 253", "none", { stroke: gold, "stroke-width": 3, "stroke-dasharray": "5 8" });
    }
    const bodyRx = stage === 1 ? 66 : stage === 2 ? 75 : 83;
    const bodyRy = stage === 1 ? 61 : stage === 2 ? 69 : 74;
    const bodyY = stage === 1 ? 211 : stage === 2 ? 207 : 206;
    const bodyFill = outfit === "academy" ? "#FAFBFF" : outfit === "robe" ? p.dark : p.base;
    s += oval(150, bodyY, bodyRx, bodyRy, bodyFill, { stroke: p.dark, "stroke-width": 3.5 });
    if (stage >= 2 || outfit !== "basic") {
      s += path("M118 159 L150 208 L182 159 L169 240 L150 253 L130 240Z", outfit === "robe" ? p.base : "#FFFDF9", { stroke: master ? gold : p.glow, "stroke-width": 3 });
      s += path("M150 193 L141 224 L150 242 L159 224Z", master ? gold : p.dark);
      s += path("M115 163 Q150 180 184 163", "none", { stroke: master ? gold : p.dark, "stroke-width": master ? 6 : 3, "stroke-linecap": "round" });
    } else {
      s += path("M121 170 Q150 183 179 170", "none", { stroke: "#FFFFFF", "stroke-width": 5, "stroke-linecap": "round" });
      s += path("M134 174 L130 193 M165 174 L169 193", "none", { stroke: p.pale, "stroke-width": 3, "stroke-linecap": "round" });
    }
    if (master) {
      s += star(103, 228, 10, gold) + star(199, 219, 11, gold);
      s += path("M111 245 Q150 275 187 244", "none", { stroke: gold, "stroke-width": 3 });
    } else if (stage === 2) {
      s += dot(112, 224, 8, gold) + star(112, 224, 5, p.dark);
    }
    s += oval(115, 266, stage === 1 ? 21 : 25, 12, fur, { stroke: "#D4CFC8", "stroke-width": 2.5 });
    s += oval(186, 266, stage === 1 ? 21 : 25, 12, fur, { stroke: "#D4CFC8", "stroke-width": 2.5 });
    if (animal === "rabbit") {
      const rabbitEars = stage === 1
        ? [[99,46,-14],[199,46,15]]
        : [[92,40,-16],[205,40,17]];
      rabbitEars.forEach(function (ear) {
        s += e("g", { transform: "rotate(" + ear[2] + " " + ear[0] + " " + ear[1] + ")" },
          oval(ear[0],ear[1],21,58,fur,{stroke:"#D3C8C9","stroke-width":3}) +
          oval(ear[0],ear[1],10,43,p.glow));
      });
    } else if (animal === "bear") {
      s += dot(95,85,27,fur,{stroke:"#D7CAC6","stroke-width":3}) + dot(204,85,27,fur,{stroke:"#D7CAC6","stroke-width":3});
      s += dot(95,85,15,p.glow) + dot(204,85,15,p.glow);
    } else {
      const high = animal === "fox" ? 26 : 41;
      s += path("M72 111 L78 " + high + " Q99 31 121 83Z", fur, { stroke:"#D6CBC9","stroke-width":3.5, "stroke-linejoin":"round" });
      s += path("M178 83 Q202 31 222 " + high + " L228 111Z", fur, { stroke:"#D6CBC9","stroke-width":3.5, "stroke-linejoin":"round" });
      s += path("M85 82 L86 " + (high+20) + " L108 87Z",p.glow);
      s += path("M192 87 L214 " + (high+20) + " L214 82Z",p.glow);
    }
    const headRy = stage === 1 ? 66 : stage === 2 ? 69 : 73;
    const headY = stage === 1 ? 126 : stage === 2 ? 124 : 122;
    s += oval(150,headY,master?78:stage===2?77:74,headRy,fur,{stroke:"#D6CDCB","stroke-width":3});
    if (animal === "fox") {
      s += path("M75 140 Q87 173 150 186 Q213 173 225 140 Q185 159 150 149 Q115 160 75 140Z", "#FFF1E5");
      s += path("M75 138 L91 154 L77 157 M225 138 L208 155 L225 157", p.base, { stroke: p.dark, "stroke-width": 2 });
    } else if (animal === "cat") {
      s += path("M87 133 L73 126 M87 142 L69 142 M213 133 L227 126 M213 142 L230 142", "none",{stroke:p.ink,"stroke-width":2.2,"stroke-linecap":"round"});
    } else if (animal === "bear") {
      s += oval(150,154,28,22,"#FFF1DE");
    }
    const eyeY = stage === 1 ? 125 : 120;
    const eyeRx = stage === 1 ? 8.5 : 9.5;
    s += oval(121,eyeY,eyeRx,12,p.ink) + oval(178,eyeY,eyeRx,12,p.ink);
    s += dot(124,eyeY-4,3.3,"white") + dot(181,eyeY-4,3.3,"white");
    s += oval(98,146,14,9,"#F4AFB7",{opacity:".66"}) + oval(203,146,14,9,"#F4AFB7",{opacity:".66"});
    if (animal === "cat" || animal === "fox" || animal === "bear") {
      s += path("M143 148 L157 148 L150 156Z",animal==="bear"?"#866C62":"#D48398");
      s += path("M149 157 Q144 164 137 160 M151 157 Q156 164 163 160", "none", {stroke:p.ink,"stroke-width":2,"stroke-linecap":"round"});
    } else {
      s += path("M144 150 Q150 144 156 150 Q155 162 150 161 Q145 162 144 150Z", "#D48398");
    }
    if (big) {
      s += path("M128 93 Q150 78 171 92", "none", {stroke:p.glow,"stroke-width":6,"stroke-linecap":"round"});
      if (master) s += star(155,76,8,gold);
    }
    if (hat==="ribbon") {
      s += path("M130 69 Q88 46 94 78 Q105 92 136 82 Q164 48 184 69 Q176 95 138 83Z",p.base,{stroke:p.dark,"stroke-width":2.5});
      s += dot(137,80,11,gold);
    } else if (hat==="crown") {
      s += path("M109 79 L104 47 L125 59 L151 37 L172 59 L195 47 L190 79Z",gold,{stroke:"#B2823C","stroke-width":3});
      s += dot(150,64,7,p.dark);
    }
    const bookFill = book === "special" ? p.dark : "#FFFDFC";
    s += e("g",{transform:"rotate(-11 175 218)"},
      e("rect",{x:146,y:184,width:65,height:71,rx:8,fill:bookFill,stroke:book==="special"?gold:p.dark,"stroke-width":4}) +
      e("rect",{x:155,y:193,width:47,height:53,rx:5,fill:"none",stroke:book==="special"?gold:p.base,"stroke-width":2}) +
      (book==="special"?star(179,217,17,gold):
       path("M165 209 L194 209 M165 219 L194 219 M165 229 L189 229","none",{stroke:p.base,"stroke-width":3,"stroke-linecap":"round"}))
    );
    s += oval(126,231,17,15,fur,{stroke:"#D7CFCA","stroke-width":2.5});
    s += oval(209,227,15,15,fur,{stroke:"#D7CFCA","stroke-width":2.5});
    if (master) {
      s += path("M49 222 Q36 185 56 144", "none", {stroke:gold,"stroke-width":3,"stroke-dasharray":"3 10","stroke-linecap":"round"});
      s += path("M252 222 Q271 184 246 143", "none", {stroke:gold,"stroke-width":3,"stroke-dasharray":"3 10","stroke-linecap":"round"});
    }
    return e("svg",{
      class:"jgc-mascot jgc-mascot-stage-" + stage,
      viewBox:"0 0 300 300",
      xmlns:"http://www.w3.org/2000/svg",
      role:"img",
      "aria-label":SPECIES[animal]+" "+(stage===1?"새싹":stage===2?"루키":"에이스")+" 캐릭터",
      preserveAspectRatio:"xMidYMid meet"
    },s);
  }
  window.JINI_CHARACTER_ART = { render: render, themes: Object.keys(THEMES), species: Object.keys(SPECIES) };
}());

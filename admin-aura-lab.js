/* JINI admin-only aura studio: five themes x 25 steps (Lv.10–250).
   Preview-only, no user progress changes or external animation assets. */
(function () {
  "use strict";
  const panel = document.getElementById("ja-aura-panel");
  if (!panel || panel.dataset.auraLabReady === "true") return;

  const THEMES = [
    {key:"petal",name:"벚꽃의 정령",icon:"🌸",color:"#ff8fbf",light:"#ffe5f3",deep:"#b93b90",
      chapters:["꽃망울의 탄생","꽃의 문장","봄바람의 춤","찬란한 꽃비","천상의 만개"],
      gifts:["꽃잎과 부드러운 분홍 광휘","꽃송이 문양과 꽃잎 고리","곡선을 그리는 봄바람 리본","하늘에서 흩날리는 빛의 꽃비","화관과 눈부신 천상의 꽃빛"]},
    {key:"frost",name:"빙결 군주",icon:"❄️",color:"#77dfff",light:"#e0fbff",deep:"#448fe8",
      chapters:["첫 서리","눈꽃 결계","빙하의 숨결","절대영도의 날개","영원의 빙관"],
      gifts:["얼음 결정과 차가운 빛","눈꽃 문양과 빙결 고리","서리 안개와 빙하 소용돌이","커다란 결정 날개와 눈보라","푸른 빙관과 다층 결정 결계"]},
    {key:"cyber",name:"사이버 오버클럭",icon:"💠",color:"#36e8d3",light:"#c5fff4",deep:"#2d92ef",
      chapters:["네온 기동","홀로그램 활성","데이터 순환","양자 방어막","오버클럭 한계 돌파"],
      gifts:["미세한 네온 빛과 데이터 입자","기계 문양과 정밀한 HUD 고리","데이터 스트림과 회로 궤적","육각 방어막과 에너지 날개","양자 코어와 다층 홀로그램 왕관"]},
    {key:"time",name:"시간의 지배자",icon:"⏳",color:"#e6ba74",light:"#ffecd0",deep:"#a97bdf",
      chapters:["시간의 씨앗","시계의 문장","시공의 흐름","운명의 톱니","영겁의 관문"],
      gifts:["은은한 금빛과 시계 바늘","로마 숫자 시계판과 시간 고리","시공의 곡선과 시간의 물결","톱니바퀴 결계와 시간의 날개","황금 시간 왕관과 영겁의 관문"]},
    {key:"galaxy",name:"은하의 지배자",icon:"🌌",color:"#a99aff",light:"#f0eaff",deep:"#649dff",
      chapters:["별의 탄생","별자리 각인","행성의 공전","성운의 폭풍","창세의 은하"],
      gifts:["갓 태어난 별의 반짝임","별자리 연결선과 별빛 고리","행성 궤도와 휘감기는 혜성","성운의 날개와 유성의 파도","창세의 별왕관과 다층 은하계"]}
  ];
  const AVATARS = [{id:"rabbit",label:"🐰 토끼",emoji:"🐰"},{id:"cat",label:"🐱 고양이",emoji:"🐱"},
    {id:"bear",label:"🐻 곰",emoji:"🐻"},{id:"fox",label:"🦊 여우",emoji:"🦊"}];
  const LEVELS = Array.from({length:25},(_,i)=>(i+1)*10);
  const STEPS = ["첫 기운","장식 추가","빛결 확장","새 효과 성장","구간 완성"];
  let avatar="rabbit",theme="petal",level=200,serial=0,design="d";
  const get = id=>document.getElementById(id);
  const els = {avatars:get("ja-aura-avatars"),themes:get("ja-aura-themes"),designs:get("ja-aura-designs"),
    chapters:get("ja-aura-chapters"),cards:get("ja-aura-cards"),focus:get("ja-aura-focus"),
    detail:get("ja-aura-focus-desc"),heading:get("ja-aura-stage-title"),
    prev:get("ja-aura-prev"),next:get("ja-aura-next")};
  if(Object.values(els).some(el=>!el))return;
  panel.dataset.auraLabReady="true";

  function info(lvl) {
    const step=Math.max(1,Math.min(25,Math.round(lvl/10)));
    return {tier:step,chapter:Math.floor((step-1)/5),strength:(step-1)%5+1};
  }
  function portrait(){
    if(window.JINI_CHARACTER_ART&&typeof window.JINI_CHARACTER_ART.render==="function")
      return window.JINI_CHARACTER_ART.render({avatar,level:1,auraLevel:0});
    const a=AVATARS.find(x=>x.id===avatar)||AVATARS[0];
    return '<span class="jal-emoji">'+a.emoji+'</span>';
  }
  const fmt=(n)=>Math.round(n*100)/100;
  const polar=(rad,deg)=>{const a=deg*Math.PI/180;return [fmt(200+rad*Math.cos(a)),fmt(200+rad*Math.sin(a))]};
  function motif(spec,x,y,size,rot=0){
    const k=spec.key,s=fmt(size);
    let art="";
    if(k==="petal")art='<path d="M0 '+(-s)+' Q'+fmt(s*.9)+' '+fmt(-s*.42)+' 0 '+s+' Q'+fmt(-s*.9)+' '+fmt(-s*.42)+' 0 '+(-s)+'Z" fill="'+spec.color+'" stroke="'+spec.light+'" stroke-width="1.3"/><path d="M0 '+(-s+2)+' V'+fmt(s*.7)+'" stroke="'+spec.deep+'" stroke-width="1" opacity=".55"/>';
    if(k==="frost"){
      for(let i=0;i<3;i++)art+='<path d="M'+(-s)+' 0H'+s+'M'+fmt(s*.6)+' -3L'+s+' 0 '+fmt(s*.6)+' 3M'+fmt(-s*.6)+' -3L'+(-s)+' 0 '+fmt(-s*.6)+' 3" transform="rotate('+(i*60)+')" fill="none" stroke="'+spec.light+'" stroke-width="2" stroke-linecap="round"/>';
    }
    if(k==="cyber")art='<path d="M'+(-s)+' '+fmt(-s*.55)+' V'+(-s)+' H'+fmt(-s*.55)+' M'+fmt(s*.55)+' '+(-s)+' H'+s+' V'+fmt(-s*.55)+' M'+(-s)+' '+fmt(s*.55)+' V'+s+' H'+fmt(-s*.55)+' M'+fmt(s*.55)+' '+s+' H'+s+' V'+fmt(s*.55)+'" stroke="'+spec.color+'" stroke-width="2.8" fill="none"/><rect x="-2" y="-2" width="4" height="4" fill="'+spec.light+'"/>';
    if(k==="time")art='<circle r="'+s+'" fill="none" stroke="'+spec.light+'" stroke-width="1.5"/><path d="M0 '+fmt(-s*.7)+'V0L'+fmt(s*.48)+' '+fmt(s*.28)+'" fill="none" stroke="'+spec.color+'" stroke-width="2" stroke-linecap="round"/>';
    if(k==="galaxy")art='<path d="M0 '+(-s)+' L'+fmt(s*.18)+' '+fmt(-s*.18)+' L'+s+' 0 L'+fmt(s*.18)+' '+fmt(s*.18)+' L0 '+s+' L'+fmt(-s*.18)+' '+fmt(s*.18)+' L'+(-s)+' 0 L'+fmt(-s*.18)+' '+fmt(-s*.18)+'Z" fill="'+spec.light+'" stroke="'+spec.color+'" stroke-width="1"/>';
    return '<g transform="translate('+x+' '+y+') rotate('+rot+')" class="jal-motif">'+art+'</g>';
  }
  function particles(spec,m){
    // The sparkle field must NEVER shrink on the first step after a 50-level milestone.
    const count=3+Math.ceil(m.tier*1.35);
    let svg="";
    for(let i=0;i<count;i++){
      // Stable positions: new particles appear without moving previously earned ones.
      const angle=i*137.508+22;
      const dist=120+(i*23)%78;
      const [x,y]=polar(dist,angle);
      const size=2+(i%4)+(m.chapter>=3?2:0);
      if(i%4===0)svg+=motif(spec,x,y,size*1.35,angle+45);
      else svg+='<circle cx="'+x+'" cy="'+y+'" r="'+fmt(size*.64)+'" fill="'+(i%3?spec.light:spec.color)+'" opacity="'+fmt(.46+(i%4)*.13)+'"/>';
    }
    return svg;
  }
  function clockFace(spec,heavy){
    let s="";
    for(let i=0;i<12;i++){
      const [a,b]=polar(heavy?177:165,i*30-90),[c,d]=polar(heavy?164:155,i*30-90);
      s+='<line x1="'+a+'" y1="'+b+'" x2="'+c+'" y2="'+d+'" stroke="'+spec.light+'" stroke-width="'+(i%3===0?3:1.5)+'" opacity=".82"/>';
    }
    return s;
  }

  // Fixed feather coordinates: level-ups add plumage without moving or
  // removing earned feathers. Three curved rows share a concealed shoulder.
  function growingFeathers(spec,m,id){
    const earned=Math.min(10,Math.max(1,m.tier-15));
    const pt=(x,y)=>fmt(x)+" "+fmt(y);
    const ink="url(#"+id+"-feather)",light="url(#"+id+"-feather-glint)";
    let left="";
    const rows=[
      {name:"high",base:5,root:[158,211],angle:-112,spread:38,bend:-12,width:8.4},
      {name:"mid",base:4,root:[160,235],angle:-155,spread:38,bend:-8,width:8.6},
      {name:"low",base:3,root:[166,248],angle:-198,spread:30,bend:-7,width:7.6}
    ];
    // Draw outer primaries first. Smaller overlapping coverts hide the roots,
    // so the result reads as a continuous wing rather than separate leaves.
    for(const row of rows){
      const count=row.base+earned;
      let plumage="";
      for(let i=count-1;i>=0;i--){
        const slot=[0,4,8,12,16,2,6,10,14,1,3,5,7,9,11][i];
        const angle=(row.angle-row.spread*slot/16)*Math.PI/180;
        const x0=row.root[0]-Math.cos(angle)*3,y0=row.root[1]+Math.sin(angle)*7;
        const radius=130+(slot%2?7:0);
        const x1=160+Math.cos(angle)*radius;
        const y1=205+Math.sin(angle)*(row.name==="high"?164:138);
        const dx=x1-x0,dy=y1-y0,len=Math.hypot(dx,dy);
        const nx=-dy/len,ny=dx/len,w=row.width*(1+.06*Math.sin(i*2.3));
        const p=(t,n)=>pt(x0+dx*t+nx*n+row.bend*Math.sin(t*Math.PI),y0+dy*t+ny*n);
        const shape="M"+p(0,0)+" C"+p(.2,w)+" "+p(.62,w*.84)+" "+p(1,0)+
          " Q"+p(.84,-w*.13)+" "+p(.73,-w*.46)+
          " L"+p(.69,-w*.39)+" Q"+p(.5,-w*.85)+" "+p(.24,-w*.64)+
          " Q"+p(.08,-w*.28)+" "+p(0,0)+"Z";
        const sheen="M"+p(.13,w*.14)+" C"+p(.35,w*.65)+" "+p(.69,w*.42)+" "+p(.96,0)+
          " Q"+p(.52,w*.03)+" "+p(.13,w*.14)+"Z";
        plumage+='<g class="jal-feather jal-feather-'+row.name+'-'+i+'">'+
          '<path d="'+shape+'" fill="'+ink+'"/>'+
          '<path d="'+sheen+'" fill="'+light+'" opacity=".42"/>'+'</g>';
      }
      left+='<g class="jal-feather-bank jal-bank-'+row.name+'">'+plumage+'</g>';
    }
    // Soft coverts blend all three rows at the shoulder, behind the mascot.
    left+='<path d="M184 245Q145 250 127 212Q113 185 123 152Q137 186 155 195Q181 207 184 245Z" fill="url(#'+id+'-mist)" opacity=".7"/>';
    return '<g class="jal-crest jal-feather-array jal-organic-wings">'+
      '<g class="jal-wing-left">'+left+'</g>'+
      '<g class="jal-wing-right" transform="translate(400 0) scale(-1 1)">'+left+'</g></g>';
  }

  // Slim strokes of moving light, not seven overlapping opaque ribbons.
  function growingRibbons(spec,m,id){
    const count=Math.min(7,Math.max(0,m.tier-8));
    let flow="";
    for(let i=0;i<count;i++){
      const endX=143-i*12.8,endY=308-i*26;
      const startX=165-i*1.9,startY=277-i*2.1;
      const path="M"+fmt(startX)+" "+fmt(startY)+
        " C"+fmt(114-i*2)+" "+fmt(282-i*4)+
        " "+fmt(endX+37)+" "+fmt(endY+24)+
        " "+fmt(endX)+" "+fmt(endY);
      const op=fmt(.27+(i%3)*.07);
      flow+='<path d="'+path+'" fill="none" stroke="'+spec.color+
        '" stroke-width="4" stroke-linecap="round" opacity=".13"/>'+
        '<path d="'+path+'" fill="none" stroke="url(#'+id+'-feather-glint)"'+
        ' stroke-width="'+fmt(1.1+(i%3)*.32)+
        '" stroke-linecap="round" opacity="'+op+'"/>';
    }
    return '<g class="jal-flow jal-growing-ribbons"><g>'+flow+'</g>'+
      '<g transform="translate(400 0) scale(-1 1)">'+flow+'</g></g>';
  }

  function chapterEffects(spec,m,fxId){
    const c=m.chapter,col=spec.color,light=spec.light,deep=spec.deep;
    // Completed effects keep stage-5 intensity forever. Only the newly unlocked
    // 50-level effect starts at stage 1 and grows over the next four milestones.
    const strengthOf = chapter => c > chapter ? 5 : m.strength;
    // Geometry and earned details accumulate; no chapter fade-in makes an upgrade look weaker.
    let s="";
    // Every 50 levels adds a visually distinct family of geometry.
    if(c>=1){
      const amp=strengthOf(1);
      s+='<g class="jal-turn-rev" opacity=".47"><ellipse cx="200" cy="200" rx="'+(157+c*4)+'" ry="'+(151+c*3)+'" fill="none" stroke="'+light+'" stroke-width="'+(0.75+amp*.12)+'" stroke-dasharray="'+(spec.key==="cyber"?"24 16":spec.key==="time"?"2 17":"1 23")+'" opacity=".58"/>';
      for(let i=0;i<3+amp;i++){
        const [x,y]=polar(160+c*3,i*360/(3+amp)-90);
        s+=motif(spec,x,y,6+amp*.6,i*45);
      }
      if(spec.key==="time")s+=clockFace(spec,false);
      s+='</g>';
    }
    if(c>=2){
      s+=growingRibbons(spec,m,fxId);
    }
    if(c>=3){
      s+=growingFeathers(spec,m,fxId);
      if(spec.key==="frost")s+=motif(spec,200,43,18,0);
      if(spec.key==="time")s+='<g class="jal-turn-rev" opacity=".58">'+clockFace(spec,true)+'</g>';
    }
    if(c>=4){
      const amp=strengthOf(4);
      // Hand-shaped elemental coronets in place of a zigzag stroke crown.
      const fill='url(#'+fxId+'-silk)',shine='url(#'+fxId+'-shine)',haze='url(#'+fxId+'-mist)';
      let crown='';
      if(spec.key==="petal")crown='<path d="M124 88Q111 57 139 44Q160 52 167 71Q181 24 200 18Q219 24 233 71Q254 48 269 44Q288 59 276 88Q200 111 124 88Z" fill="'+fill+'" opacity=".94"/><path d="M140 86Q200 104 260 86Q214 84 200 59Q186 84 140 86Z" fill="'+shine+'" opacity=".76"/>';
      else if(spec.key==="frost")crown='<path d="M121 107L101 64 147 78 172 34 200 65 228 34 253 78 299 64 279 107Z" fill="'+fill+'" opacity=".95"/><path d="M172 34L200 65 228 34 220 99 180 99Z" fill="'+shine+'" opacity=".93"/>';
      else if(spec.key==="cyber")crown='<path d="M102 105L130 64 169 64 200 27 231 64 270 64 298 105 261 118 235 92 165 92 139 118Z" fill="'+fill+'" opacity=".94"/><path d="M169 64L200 27 231 64 217 80 183 80Z" fill="'+shine+'" opacity=".91"/>';
      else if(spec.key==="time")crown='<path d="M110 102Q123 47 164 64Q181 30 200 29Q219 30 236 64Q277 47 290 102Q199 122 110 102Z" fill="'+fill+'" opacity=".93"/><path d="M124 99Q200 112 276 99Q200 125 124 99Z" fill="'+shine+'" opacity=".79"/>';
      else crown='<path d="M111 101Q138 53 175 72L200 18 225 72Q262 53 289 101Q200 126 111 101Z" fill="'+haze+'" opacity=".92"/><path d="M200 29L213 68 247 73 213 86 200 115 187 86 153 73 187 68Z" fill="'+shine+'" opacity=".92"/>';
      const gemstones=[[145,79],[255,79],[172,58],[228,58],[200,38]];
      let jewelArt="";
      for(let i=0;i<amp;i++){
        const [x,y]=gemstones[i];
        jewelArt+='<circle cx="'+x+'" cy="'+y+'" r="'+(2.8+i*.3)+'" fill="'+light+'" opacity=".92"/>'+
          '<circle cx="'+x+'" cy="'+(y-1)+'" r="1.1" fill="#ffffff" opacity=".88"/>';
      }
      s+='<g class="jal-imperial" opacity=".9">'+crown+motif(spec,200,71,13,0)+jewelArt+'</g>';
      s+='<g class="jal-turn-slow" opacity=".65">';
      for(let i=0;i<9+amp;i++){const [x,y]=polar(182,i*360/(9+amp)-90);s+=motif(spec,x,y,5+amp*.35,i*22)}
      s+='</g>';
    }
    return s;
  }
  function artwork(spec,lvl,large){
    const m=info(lvl),n=++serial;
    const grad="jal-grad-"+n;
    const ringCount=1+(m.chapter>=1?1:0)+(m.chapter>=3?1:0); // retained but subdued
    let rings='';
    for(let i=0;i<ringCount;i++){
      const ringChapter=i===0?0:i===1?1:3;
      const power=m.chapter>ringChapter?5:m.strength;
      const r=120+i*20+power*2.4;
      rings+='<circle cx="200" cy="200" r="'+fmt(r)+'" fill="none" stroke="'+(i%2?spec.light:spec.color)+'" stroke-width="'+fmt(.8+power*.12+i*.1)+'" opacity="'+fmt(.13+power*.038)+'" stroke-dasharray="'+(i===0?'2 19':i%2?'1 22':'1 27')+'"/>';
    }
    const sigil=chapterEffects(spec,m,grad);
    const art='<svg class="jal-aura-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><radialGradient id="'+grad+'"><stop offset="35%" stop-color="'+spec.color+'" stop-opacity="0"/><stop offset="67%" stop-color="'+spec.color+'" stop-opacity="'+fmt(.07+m.tier*.003)+'"/><stop offset="90%" stop-color="'+spec.deep+'" stop-opacity="'+fmt(.09+m.tier*.004)+'"/><stop offset="100%" stop-color="'+spec.light+'" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="'+grad+'-silk" x1="0%" y1="0%" x2="96%" y2="92%"><stop stop-color="'+spec.light+'" stop-opacity=".03"/><stop offset=".35" stop-color="'+spec.color+'" stop-opacity=".75"/><stop offset=".74" stop-color="'+spec.deep+'" stop-opacity=".74"/><stop offset="1" stop-color="'+spec.color+'" stop-opacity=".05"/></linearGradient>'+
      '<linearGradient id="'+grad+'-shine" x1="0%" y1="0%" x2="90%" y2="100%"><stop stop-color="#ffffff" stop-opacity=".91"/><stop offset=".52" stop-color="'+spec.light+'" stop-opacity=".5"/><stop offset="1" stop-color="'+spec.color+'" stop-opacity=".05"/></linearGradient>'+
      '<radialGradient id="'+grad+'-mist"><stop stop-color="'+spec.light+'" stop-opacity=".62"/><stop offset=".52" stop-color="'+spec.color+'" stop-opacity=".37"/><stop offset="1" stop-color="'+spec.deep+'" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="'+grad+'-feather" x1="4%" y1="0%" x2="91%" y2="97%"><stop stop-color="'+spec.light+'" stop-opacity=".98"/><stop offset=".3" stop-color="'+spec.color+'" stop-opacity=".94"/><stop offset=".74" stop-color="'+spec.deep+'" stop-opacity=".82"/><stop offset="1" stop-color="'+spec.deep+'" stop-opacity=".04"/></linearGradient>'+
      '<linearGradient id="'+grad+'-feather-glint" x1="0%" y1="5%" x2="90%" y2="92%"><stop stop-color="#ffffff" stop-opacity=".8"/><stop offset=".37" stop-color="'+spec.light+'" stop-opacity=".68"/><stop offset="1" stop-color="'+spec.color+'" stop-opacity="0"/></linearGradient></defs>'+
      '<circle cx="200" cy="200" r="198" fill="url(#'+grad+')"/>'+
      '<g class="jal-turn-slow">'+rings+'</g>'+
      '<g class="jal-ornaments">'+sigil+'</g>'+
      '<g class="jal-stars">'+particles(spec,m)+'</g>'+
      '</svg>';
    return '<span class="jal-stage jal-'+spec.key+' jal-chapter-'+(m.chapter+1)+' jal-strength-'+m.strength+(lvl>=50?' jal-milestone-50':'')+(lvl>=100?' jal-milestone-100':'')+(lvl>=150?' jal-milestone-150':'')+(lvl>=200?' jal-milestone-200':'')+(lvl>=250?' jal-milestone-250':'')+(large?' jal-large':'')+'" style="--jal-color:'+spec.color+';--jal-light:'+spec.light+';--jal-deep:'+spec.deep+'" aria-hidden="true">'+
      '<span class="jal-halo"></span>'+art+'<span class="jal-sprite">'+portrait()+'</span></span>';
  }
  // Independent illustrated forms: no clipping, reveal mask or hue recolors.
  // Major evolutions unlock at 50-level boundaries; minor details accumulate.
  function energyArtwork(spec,lvl,large){
    const m=info(lvl),form=Math.min(5,Math.floor(lvl/50));
    const span=[52,61,70,80,90,100][form];
    let details="";
    for(let i=0;i<m.tier;i++){
      const angle=i*137.508+24,rad=100+(i%5)*15;
      const [x,y]=polar(rad,angle);
      details+='<g class="jal-evolution-detail" style="animation-delay:-'+fmt(i*.37)+'s">'+motif(spec,x,y,3+(i%3),angle)+'</g>';
    }
    return '<span class="jal-stage jal-energy-stage jal-evolution-'+spec.key+(large?' jal-large':'')+'" data-evolution="'+form+'" style="--jal-color:'+spec.color+';--jal-light:'+spec.light+';--jal-deep:'+spec.deep+'" aria-hidden="true">'+
      '<span class="jal-energy-form" style="width:'+span+'%;height:'+span+'%;left:'+(100-span)/2+'%;top:'+(100-span)/2+'%">'+
      '<img class="jal-energy-art" src="icons/aura-evolution/'+spec.key+'-'+form+'.avif?v=20261022-evolution-v1" width="320" height="320" alt="" decoding="async">'+
      '</span><svg class="jal-evolution-details" viewBox="0 0 400 400" aria-hidden="true">'+details+'</svg>'+
      '<span class="jal-sprite">'+portrait()+'</span></span>';
  }
  function renderArt(spec,lvl,large){
    if(design==="d" && window.JINI_ADMIN_AURA_FLOW) return window.JINI_ADMIN_AURA_FLOW.render(spec,lvl,large,portrait());
    if(design==="d") return energyArtwork(spec,lvl,large);
    if(design==="c"&&window.JINI_ADMIN_AURA_C&&typeof window.JINI_ADMIN_AURA_C.render==="function") {
      return window.JINI_ADMIN_AURA_C.render(spec,lvl,large,portrait());
    }
    if(design==="b"&&window.JINI_ADMIN_AURA_B&&typeof window.JINI_ADMIN_AURA_B.render==="function") {
      return window.JINI_ADMIN_AURA_B.render(spec,lvl,large,portrait());
    }
    return artwork(spec,lvl,large);
  }
  function render(){
    const spec=THEMES.find(x=>x.key===theme)||THEMES[0],m=info(level);
    els.designs.innerHTML='<button type="button" class="jal-switch'+(design==="d"?' is-selected':'')+'" data-jal-design="d" aria-pressed="'+(design==="d")+'">D · 흐르는 에너지 5종</button>'+'<button type="button" class="jal-switch'+(design==="a"?' is-selected':'')+'" data-jal-design="a" aria-pressed="'+(design==="a")+'">A · 이전 깃털 시안</button>'+
      '<button type="button" class="jal-switch'+(design==="b"?' is-selected':'')+'" data-jal-design="b" aria-pressed="'+(design==="b")+'">B · 이전 시안</button>'+
      '<button type="button" class="jal-switch'+(design==="c"?' is-selected':'')+'" data-jal-design="c" aria-pressed="'+(design==="c")+'">C · 부드러운 빛</button>';
    els.avatars.innerHTML=AVATARS.map(a=>'<button type="button" class="jal-switch'+(a.id===avatar?' is-selected':'')+
      '" data-jal-avatar="'+a.id+'" aria-pressed="'+(a.id===avatar)+'">'+a.label+'</button>').join('');
    els.themes.innerHTML=THEMES.map(s=>'<button type="button" class="jal-switch'+(s.key===theme?' is-selected':'')+
      '" data-jal-theme="'+s.key+'" aria-pressed="'+(s.key===theme)+'">'+s.icon+' '+s.name+'</button>').join('');
    const chapterNames=spec.chapters;
    els.chapters.innerHTML=chapterNames.map((name,i)=>'<button type="button" class="jal-chapter-button'+(i===m.chapter?' is-selected':'')+
      '" data-jal-chapter="'+i+'" aria-pressed="'+(i===m.chapter)+'"><span>Lv.'+(i*50+10)+'–'+((i+1)*50)+'</span><strong>'+(i+1)+'막 · '+name+'</strong></button>').join('');
    const start=m.chapter*50+10;
    els.heading.textContent=spec.icon+' '+spec.name+' — '+chapterNames[m.chapter];
    els.cards.innerHTML=Array.from({length:5},(_,i)=>{
      const lvl=start+i*10,selected=lvl===level;
      return '<button type="button" class="jal-card'+(selected?' is-selected':'')+'" data-jal-level="'+lvl+'" aria-pressed="'+selected+'">'+
        '<span class="jal-card-art">'+renderArt(spec,lvl,false)+'</span>'+
        '<span class="jal-card-copy"><span class="jal-level">LV.'+lvl+' · '+(m.chapter*5+i+1)+'/25</span>'+
        '<strong>'+(design==="d"?chapterNames[m.chapter]+' · '+(i+1)+'/5':i===4?spec.gifts[m.chapter]:STEPS[i])+'</strong>'+
        '<small>'+(design==="d"?'에너지 기류 누적 성장 · 50레벨마다 추가 각성':design==="a"?(i===4?'자연스러운 날개 윤곽이 성장했어요':'깃털이 세 방향으로 함께 자라요'):(i===4?'새로운 이펙트의 완성 단계':'빛과 문양이 조금씩 진화'))+'</small></span></button>';
    }).join('');
    els.focus.innerHTML=renderArt(spec,level,true);
    els.detail.textContent=(design==="d"?"[D · 에너지 진화] ":design==="c"?"[C · 자연스러운 빛] ":design==="b"?"[B · 이전 시안] ":"[A · 자연스러운 날개] ")+'LV.'+level+' · '+spec.chapters[m.chapter]+' · '+STEPS[m.strength-1]+' — '+spec.gifts[m.chapter]+
      ' (전체 '+m.tier+'/25단계). 캐릭터 원본은 동일하며 오라만 바뀝니다.';
    if(design==="d") els.detail.textContent='[D · '+spec.name+'] LV.'+level+' · 진화 '+(Math.min(5,Math.floor(level/50))+1)+'/6단계. 10레벨부터 에너지 흐름이 시작되며, 50레벨마다 효과가 누적 진화하고 10레벨마다 기류와 입자가 추가됩니다. 날개 형태는 만들지 않습니다. 캐릭터는 그대로 유지됩니다.';
    els.prev.disabled=level===10;
    els.next.disabled=level===250;
  }
  panel.addEventListener("click",function(event){
    const el=event.target.closest("[data-jal-design],[data-jal-avatar],[data-jal-theme],[data-jal-chapter],[data-jal-level],#ja-aura-prev,#ja-aura-next");
    if(!el||!panel.contains(el))return;
    const d=el.dataset;
    if(["a","b","c","d"].includes(d.jalDesign)&&d.jalDesign!==design)design=d.jalDesign;
    if(d.jalAvatar&&AVATARS.some(x=>x.id===d.jalAvatar))avatar=d.jalAvatar;
    if(d.jalTheme&&THEMES.some(x=>x.key===d.jalTheme)){theme=d.jalTheme;level=10;}
    if(d.jalChapter!==undefined){const ch=Number(d.jalChapter);if(Number.isInteger(ch)&&ch>=0&&ch<5)level=ch*50+10;}
    if(d.jalLevel&&LEVELS.includes(Number(d.jalLevel)))level=Number(d.jalLevel);
    if(el.id==="ja-aura-prev")level=Math.max(10,level-10);
    if(el.id==="ja-aura-next")level=Math.min(250,level+10);
    render();
  });
  render();
  window.JINI_ADMIN_AURA_LAB={refresh:render};
}());


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
  let avatar="rabbit",theme="petal",level=10,serial=0,design="a";
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

  // Version A: each earned feather is an independent, shaded surface.
  // Its geometry never changes on later levels; newly earned feathers grow outwards.
  function growingFeathers(spec,m,id){
    const count=Math.min(13,Math.max(0,m.tier-12)); // Lv.160: 4, Lv.250: 13 feathers per side.
    const crystal=spec.key==="frost"||spec.key==="cyber";
    const fill="url(#"+id+"-feather)",glint="url(#"+id+"-feather-glint)";
    let blades="";
    // New, farther feathers go behind the original ones instead of painting over them.
    for(let i=count-1;i>=0;i--){
      const tx=fmt(153-i*10.5),ty=fmt(195-i*11.6);
      const upper=fmt(tx+20+i*.5),lower=fmt(tx+34+i*.6);
      let body,highlight,facet="";
      if(crystal){
        body='M163 241Q'+fmt(154-i*.4)+' '+fmt(211-i*1.1)+' '+upper+' '+fmt(ty+25)+
          'L'+tx+' '+ty+'Q'+fmt(tx+10)+' '+fmt(ty+29)+' '+lower+' '+fmt(ty+48)+'Q147 242 163 241Z';
        highlight='M162 234Q'+fmt(tx+29)+' '+fmt(ty+38)+' '+tx+' '+ty+
          'L'+fmt(tx+23)+' '+fmt(ty+26)+'Q149 231 162 234Z';
        facet='<path d="M'+tx+' '+ty+'L'+fmt(tx+24)+' '+fmt(ty+25)+' '+fmt(tx+35)+' '+fmt(ty+48)+
          'Q'+fmt(tx+18)+' '+fmt(ty+30)+' '+tx+' '+ty+'Z" fill="'+spec.deep+'" opacity=".16"/>';
      }else{
        body='M163 241C'+fmt(152-i*.4)+' '+fmt(209-i*.75)+' '+upper+' '+fmt(ty+24)+' '+tx+' '+ty+
          'C'+fmt(tx+8)+' '+fmt(ty+27)+' '+lower+' '+fmt(ty+47)+' 163 241Z';
        highlight='M161 233C'+fmt(153-i*.6)+' '+fmt(211-i*.45)+' '+fmt(tx+14)+' '+fmt(ty+19)+' '+tx+' '+ty+
          'C'+fmt(tx+19)+' '+fmt(ty+29)+' '+fmt(tx+25)+' '+fmt(ty+40)+' 161 233Z';
        facet='<path d="M'+fmt(tx+8)+' '+fmt(ty+22)+'Q'+fmt(tx+28)+' '+fmt(ty+44)+
          ' 158 236Q'+fmt(tx+39)+' '+fmt(ty+59)+' '+fmt(tx+8)+' '+fmt(ty+22)+'Z" fill="'+spec.light+'" opacity=".13"/>';
      }
      blades+='<g class="jal-feather jal-feather-'+i+'">'+
        '<path d="'+body+'" fill="'+fill+'" opacity="'+fmt(.83-(i%3)*.035)+'"/>'+
        '<path d="'+highlight+'" fill="'+glint+'" opacity="'+(crystal?".53":".37")+'"/>'+facet+
        (i%3===2?'<circle cx="'+fmt(tx+4)+'" cy="'+fmt(ty+6)+'" r="2.1" fill="'+spec.light+'" opacity=".83"/>':'')+
        '</g>';
    }
    if(!count)return "";
    return '<g class="jal-crest jal-feather-array">'+
      '<ellipse cx="158" cy="232" rx="39" ry="45" fill="url(#'+id+'-mist)" opacity=".26"/>'+
      '<g class="jal-wing-left">'+blades+'</g>'+
      '<g class="jal-wing-right" transform="translate(400 0) scale(-1 1)">'+blades+'</g></g>';
  }
  // Lv.110–150: each step adds a new curved light ribbon, retained thereafter.
  function growingRibbons(spec,m,id){
    const count=Math.min(7,Math.max(0,m.tier-8));
    const faceted=spec.key==="frost"||spec.key==="cyber";
    let ribbons="";
    for(let i=count-1;i>=0;i--){
      const tx=fmt(130-i*16.5),ty=fmt(315-i*26.5);
      const body=faceted?
        'M159 280Q'+fmt(140-i*2)+' '+fmt(291-i*3)+' '+fmt(tx+35)+' '+fmt(ty+24)+
        'L'+tx+' '+ty+'L'+fmt(tx+19)+' '+fmt(ty+19)+'Q137 288 159 280Z':
        'M159 280C'+fmt(146-i*.9)+' '+fmt(293-i*1.4)+' '+fmt(tx+38)+' '+fmt(ty+40)+' '+tx+' '+ty+
        'C'+fmt(tx+26)+' '+fmt(ty+18)+' '+fmt(tx+36)+' '+fmt(ty+33)+' 159 280Z';
      const highlight='M157 279Q'+fmt(tx+37)+' '+fmt(ty+30)+' '+tx+' '+ty+
        'Q'+fmt(tx+24)+' '+fmt(ty+18)+' 157 279Z';
      ribbons+='<path d="'+body+'" fill="url(#'+id+'-silk)" opacity=".7"/>'+
        '<path d="'+highlight+'" fill="url(#'+id+'-feather-glint)" opacity=".31"/>';
    }
    return '<g class="jal-flow jal-growing-ribbons"><g>'+ribbons+'</g>'+
      '<g transform="translate(400 0) scale(-1 1)">'+ribbons+'</g></g>';
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
      s+='<g class="jal-turn-rev"><ellipse cx="200" cy="200" rx="'+(157+c*4)+'" ry="'+(151+c*3)+'" fill="none" stroke="'+light+'" stroke-width="'+(1.4+amp*.35)+'" stroke-dasharray="'+(spec.key==="cyber"?"18 8":spec.key==="time"?"3 11":"5 13")+'" opacity=".83"/>';
      for(let i=0;i<8+amp;i++){
        const [x,y]=polar(160+c*3,i*360/(8+amp)-90);
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
      if(spec.key==="petal"){
        // Every earned tip receives a small blossom; existing blossoms stay put.
        const blossomCount=Math.min(13,Math.max(0,m.tier-12));
        for(let i=0;i<blossomCount;i+=2){
          const x=fmt(146-i*10.5),y=fmt(191-i*11.6);
          s+=motif(spec,x,y,fmt(3.6+(i%3)*.5),i*27);
          s+=motif(spec,400-x,y,fmt(3.6+(i%3)*.5),-i*27);
        }
      }
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
    const ringCount=1+(m.chapter>=1?1:0)+(m.chapter>=3?1:0);
    let rings='';
    for(let i=0;i<ringCount;i++){
      const ringChapter=i===0?0:i===1?1:3;
      const power=m.chapter>ringChapter?5:m.strength;
      const r=120+i*20+power*2.4;
      rings+='<circle cx="200" cy="200" r="'+fmt(r)+'" fill="none" stroke="'+(i%2?spec.light:spec.color)+'" stroke-width="'+fmt(1.6+power*.35+i*.25)+'" opacity="'+fmt(.3+power*.085)+'" stroke-dasharray="'+(i===0?'3 12':i%2?'5 14':'none')+'"/>';
    }
    const sigil=chapterEffects(spec,m,grad);
    const art='<svg class="jal-aura-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><radialGradient id="'+grad+'"><stop offset="35%" stop-color="'+spec.color+'" stop-opacity="0"/><stop offset="67%" stop-color="'+spec.color+'" stop-opacity="'+fmt(.11+m.tier*.01)+'"/><stop offset="90%" stop-color="'+spec.deep+'" stop-opacity="'+fmt(.16+m.tier*.013)+'"/><stop offset="100%" stop-color="'+spec.light+'" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="'+grad+'-silk" x1="0%" y1="0%" x2="96%" y2="92%"><stop stop-color="'+spec.light+'" stop-opacity=".03"/><stop offset=".35" stop-color="'+spec.color+'" stop-opacity=".75"/><stop offset=".74" stop-color="'+spec.deep+'" stop-opacity=".74"/><stop offset="1" stop-color="'+spec.color+'" stop-opacity=".05"/></linearGradient>'+
      '<linearGradient id="'+grad+'-shine" x1="0%" y1="0%" x2="90%" y2="100%"><stop stop-color="#ffffff" stop-opacity=".91"/><stop offset=".52" stop-color="'+spec.light+'" stop-opacity=".5"/><stop offset="1" stop-color="'+spec.color+'" stop-opacity=".05"/></linearGradient>'+
      '<radialGradient id="'+grad+'-mist"><stop stop-color="'+spec.light+'" stop-opacity=".62"/><stop offset=".52" stop-color="'+spec.color+'" stop-opacity=".37"/><stop offset="1" stop-color="'+spec.deep+'" stop-opacity="0"/></radialGradient></defs>'+
      '<circle cx="200" cy="200" r="198" fill="url(#'+grad+')"/>'+
      '<g class="jal-turn-slow">'+rings+'</g>'+
      '<g class="jal-ornaments">'+sigil+'</g>'+
      '<g class="jal-stars">'+particles(spec,m)+'</g>'+
      '</svg>';
    return '<span class="jal-stage jal-'+spec.key+' jal-chapter-'+(m.chapter+1)+' jal-strength-'+m.strength+(lvl>=50?' jal-milestone-50':'')+(lvl>=100?' jal-milestone-100':'')+(lvl>=150?' jal-milestone-150':'')+(lvl>=200?' jal-milestone-200':'')+(lvl>=250?' jal-milestone-250':'')+(large?' jal-large':'')+'" style="--jal-color:'+spec.color+';--jal-light:'+spec.light+';--jal-deep:'+spec.deep+'" aria-hidden="true">'+
      '<span class="jal-halo"></span>'+art+'<span class="jal-sprite">'+portrait()+'</span></span>';
  }
  function renderArt(spec,lvl,large){
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
    els.designs.innerHTML='<button type="button" class="jal-switch'+(design==="a"?' is-selected':'')+'" data-jal-design="a" aria-pressed="'+(design==="a")+'">A · 1안 개선 (기본)</button>'+
      '<button type="button" class="jal-switch'+(design==="b"?' is-selected':'')+'" data-jal-design="b" aria-pressed="'+(design==="b")+'">B · 이전 시안</button>'+
      '<button type="button" class="jal-switch'+(design==="c"?' is-selected':'')+'" data-jal-design="c" aria-pressed="'+(design==="c")+'">C · 부드러운 빛</button>';
    els.avatars.innerHTML=AVATARS.map(a=>'<button type="button" class="jal-switch'+(a.id===avatar?' is-selected':'')+
      '" data-jal-avatar="'+a.id+'" aria-pressed="'+(a.id===avatar)+'">'+a.label+'</button>').join('');
    els.themes.innerHTML=THEMES.map(s=>'<button type="button" class="jal-switch'+(s.key===theme?' is-selected':'')+
      '" data-jal-theme="'+s.key+'" aria-pressed="'+(s.key===theme)+'">'+s.icon+' '+s.name+'</button>').join('');
    els.chapters.innerHTML=spec.chapters.map((name,i)=>'<button type="button" class="jal-chapter-button'+(i===m.chapter?' is-selected':'')+
      '" data-jal-chapter="'+i+'" aria-pressed="'+(i===m.chapter)+'"><span>Lv.'+(i*50+10)+'–'+((i+1)*50)+'</span><strong>'+(i+1)+'막 · '+name+'</strong></button>').join('');
    const start=m.chapter*50+10;
    els.heading.textContent=spec.icon+' '+spec.name+' — '+spec.chapters[m.chapter];
    els.cards.innerHTML=Array.from({length:5},(_,i)=>{
      const lvl=start+i*10,selected=lvl===level;
      return '<button type="button" class="jal-card'+(selected?' is-selected':'')+'" data-jal-level="'+lvl+'" aria-pressed="'+selected+'">'+
        '<span class="jal-card-art">'+renderArt(spec,lvl,false)+'</span>'+
        '<span class="jal-card-copy"><span class="jal-level">LV.'+lvl+' · '+(m.chapter*5+i+1)+'/25</span>'+
        '<strong>'+(i===4?spec.gifts[m.chapter]:STEPS[i])+'</strong>'+
        '<small>'+(design==="a"?(i===4?'이번 구간의 효과가 쌓였어요':'날개·빛결·장식이 하나씩 추가돼요'):(i===4?'새로운 이펙트의 완성 단계':'빛과 문양이 조금씩 진화'))+'</small></span></button>';
    }).join('');
    els.focus.innerHTML=renderArt(spec,level,true);
    els.detail.textContent=(design==="c"?"[C · 자연스러운 빛] ":design==="b"?"[B · 이전 시안] ":"[A · 1안 개선] ")+'LV.'+level+' · '+spec.chapters[m.chapter]+' · '+STEPS[m.strength-1]+' — '+spec.gifts[m.chapter]+
      ' (전체 '+m.tier+'/25단계). 캐릭터 원본은 동일하며 오라만 바뀝니다.';
    els.prev.disabled=level===10;
    els.next.disabled=level===250;
  }
  panel.addEventListener("click",function(event){
    const el=event.target.closest("[data-jal-design],[data-jal-avatar],[data-jal-theme],[data-jal-chapter],[data-jal-level],#ja-aura-prev,#ja-aura-next");
    if(!el||!panel.contains(el))return;
    const d=el.dataset;
    if(["a","b","c"].includes(d.jalDesign)&&d.jalDesign!==design)design=d.jalDesign;
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

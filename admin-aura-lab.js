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
  const STEPS = ["첫 기운","광채 확장","문양 활성","빛의 증폭","각성 완성"];
  let avatar="rabbit",theme="petal",level=10,serial=0;
  const get = id=>document.getElementById(id);
  const els = {avatars:get("ja-aura-avatars"),themes:get("ja-aura-themes"),
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
    const count=3+m.chapter*3+m.strength*2;
    let svg="";
    for(let i=0;i<count;i++){
      const angle=i*137.508+m.tier*17;
      const dist=120+(i*23+m.strength*9)%78;
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
  function chapterEffects(spec,m){
    const c=m.chapter,amp=m.strength,col=spec.color,light=spec.light,deep=spec.deep;
    let s="";
    // Every 50 levels adds a visually distinct family of geometry.
    if(c>=1){
      s+='<g class="jal-turn-rev"><ellipse cx="200" cy="200" rx="'+(157+c*4)+'" ry="'+(151+c*3)+'" fill="none" stroke="'+light+'" stroke-width="'+(1.4+amp*.35)+'" stroke-dasharray="'+(spec.key==="cyber"?"18 8":spec.key==="time"?"3 11":"5 13")+'" opacity=".83"/>';
      for(let i=0;i<8+amp;i++){
        const [x,y]=polar(160+c*3,i*360/(8+amp)-90);
        s+=motif(spec,x,y,6+amp*.6,i*45);
      }
      if(spec.key==="time")s+=clockFace(spec,false);
      s+='</g>';
    }
    if(c>=2){
      if(spec.key==="petal")s+='<path d="M60 250C40 85 160 45 195 110S330 35 344 176M55 280C165 370 250 125 346 210" stroke="'+light+'" stroke-width="'+(5+amp)+'" fill="none" stroke-linecap="round" opacity=".54"/>';
      if(spec.key==="frost")s+='<path d="M62 284L110 225 94 193 153 117 178 75M339 277L291 226 307 193 247 118 224 73" stroke="'+light+'" stroke-width="'+(4+amp)+'" fill="none" stroke-linejoin="bevel" opacity=".8"/>';
      if(spec.key==="cyber")s+='<path d="M59 135H111L137 162V207M335 270H287L260 237V184M99 329H159L186 300" stroke="'+col+'" stroke-width="'+(3+amp*.45)+'" fill="none" opacity=".8"/>';
      if(spec.key==="time")s+='<path d="M46 232C35 73 240 29 286 118S279 320 357 236M55 295C110 365 265 343 353 116" stroke="'+light+'" stroke-width="'+(3+amp*.7)+'" fill="none" opacity=".58"/>';
      if(spec.key==="galaxy")s+='<g transform="rotate(-25 200 200)"><ellipse cx="200" cy="200" rx="185" ry="68" stroke="'+light+'" stroke-width="'+(3+amp)+'" fill="none" opacity=".75"/><ellipse cx="200" cy="200" rx="160" ry="98" stroke="'+deep+'" stroke-width="3" fill="none" opacity=".85"/></g>';
      s+='<g class="jal-turn-slow"><circle cx="200" cy="200" r="194" fill="none" stroke="'+col+'" stroke-width="'+(1.3+amp*.25)+'" opacity=".4" stroke-dasharray="36 38"/></g>';
    }
    if(c>=3){
      // Crest wings / shield structures are unique to every element.
      const wing=spec.key==="frost"?'M132 205L84 172 69 114 43 142 34 66 110 126 155 160':
        spec.key==="cyber"?'M145 232H77L58 189 27 178 44 144 10 98 115 137 154 175':
        spec.key==="time"?'M146 225Q96 200 70 128Q55 95 27 99Q70 184 33 242Q89 284 143 259':
        spec.key==="galaxy"?'M145 238Q46 191 31 86Q136 131 152 166Q58 260 42 318Q114 294 155 267':
        'M143 233Q70 213 48 110Q110 122 153 178Q45 254 37 303Q129 279 143 233';
      s+='<g class="jal-crest"><path d="'+wing+'" fill="'+(spec.key==="cyber"?"none":deep)+'" fill-opacity=".24" stroke="'+col+'" stroke-width="'+(3+amp*.55)+'" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(400 0) scale(-1 1)"><path d="'+wing+'" fill="'+(spec.key==="cyber"?"none":deep)+'" fill-opacity=".24" stroke="'+col+'" stroke-width="'+(3+amp*.55)+'" stroke-linecap="round" stroke-linejoin="round"/></g></g>';
      if(spec.key==="petal")for(let i=0;i<5+amp;i++){const [x,y]=polar(167,i*360/(5+amp)-50);s+=motif(spec,x,y,9+amp*.6,i*45)}
      if(spec.key==="cyber")s+='<path d="M200 13L326 74 386 200 326 326 200 387 74 326 14 200 74 74Z" fill="none" stroke="'+light+'" stroke-width="'+(2+amp*.35)+'" stroke-dasharray="18 12" opacity=".67"/>';
      if(spec.key==="time")s+='<g class="jal-turn-rev">'+clockFace(spec,true)+'</g>';
      if(spec.key==="galaxy")s+='<path d="M22 263Q160 52 384 170M20 301Q221 44 378 228" fill="none" stroke="'+light+'" stroke-width="5" stroke-linecap="round" opacity=".38"/>';
      if(spec.key==="frost")s+motif(spec,200,44,22+amp*2,0);
    }
    if(c>=4){
      // Lv210-250: a new regal halo and orbiting sigils, not merely bigger glow.
      s+='<g class="jal-imperial"><path d="M115 84L130 23 166 56 200 5 234 56 270 23 285 84" fill="none" stroke="'+light+'" stroke-width="'+(3+amp*.65)+'" stroke-linecap="round" stroke-linejoin="round" opacity=".94"/>';
      s+=motif(spec,200,25,17+amp,0);
      s+='<ellipse cx="200" cy="200" rx="192" ry="182" stroke="'+light+'" stroke-width="'+(2+amp*.4)+'" stroke-dasharray="2 14" fill="none" opacity=".75"/>';
      s+='</g>';
      s+='<g class="jal-turn-slow">';
      for(let i=0;i<12+amp;i++){const [x,y]=polar(187,i*360/(12+amp));s+=motif(spec,x,y,5+amp*.5,i*17)}
      s+='</g>';
      if(spec.key==="petal")s+='<path d="M68 108Q200 -22 332 108" fill="none" stroke="'+light+'" stroke-width="9" opacity=".48"/>';
      if(spec.key==="frost")s+='<path d="M93 78L132 48 170 79 200 34 230 79 268 48 307 78" stroke="'+light+'" stroke-width="5" fill="none" opacity=".83"/>';
      if(spec.key==="cyber")s+='<path d="M90 85H140L200 34 260 85H310" fill="none" stroke="'+col+'" stroke-width="7"/>';
      if(spec.key==="time")s+='<path d="M115 58Q200 -9 285 58" stroke="'+col+'" stroke-width="6" fill="none"/>';
      if(spec.key==="galaxy")s+='<path d="M84 67Q200 -18 316 67" stroke="'+light+'" stroke-width="8" fill="none" opacity=".69"/>';
    }
    return s;
  }
  function artwork(spec,lvl,large){
    const m=info(lvl),n=++serial;
    const grad="jal-grad-"+n;
    const ringCount=1+(m.chapter>=1?1:0)+(m.chapter>=3?1:0);
    let rings='';
    for(let i=0;i<ringCount;i++){
      const r=120+i*20+m.strength*2.4;
      rings+='<circle cx="200" cy="200" r="'+fmt(r)+'" fill="none" stroke="'+(i%2?spec.light:spec.color)+'" stroke-width="'+fmt(1.6+m.strength*.35+i*.25)+'" opacity="'+fmt(.3+m.strength*.085)+'" stroke-dasharray="'+(m.chapter===0?'3 12':i%2?'5 14':'none')+'"/>';
    }
    const sigil=chapterEffects(spec,m);
    const art='<svg class="jal-aura-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<defs><radialGradient id="'+grad+'"><stop offset="35%" stop-color="'+spec.color+'" stop-opacity="0"/><stop offset="67%" stop-color="'+spec.color+'" stop-opacity="'+fmt(.11+m.tier*.01)+'"/><stop offset="90%" stop-color="'+spec.deep+'" stop-opacity="'+fmt(.16+m.tier*.013)+'"/><stop offset="100%" stop-color="'+spec.light+'" stop-opacity="0"/></radialGradient></defs>'+
      '<circle cx="200" cy="200" r="198" fill="url(#'+grad+')"/>'+
      '<g class="jal-turn-slow">'+rings+'</g>'+
      '<g class="jal-ornaments">'+sigil+'</g>'+
      '<g class="jal-stars">'+particles(spec,m)+'</g>'+
      '</svg>';
    return '<span class="jal-stage jal-'+spec.key+' jal-chapter-'+(m.chapter+1)+' jal-strength-'+m.strength+(large?' jal-large':'')+'" style="--jal-color:'+spec.color+';--jal-light:'+spec.light+';--jal-deep:'+spec.deep+'" aria-hidden="true">'+
      '<span class="jal-halo"></span>'+art+'<span class="jal-sprite">'+portrait()+'</span></span>';
  }
  function render(){
    const spec=THEMES.find(x=>x.key===theme)||THEMES[0],m=info(level);
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
        '<span class="jal-card-art">'+artwork(spec,lvl,false)+'</span>'+
        '<span class="jal-card-copy"><span class="jal-level">LV.'+lvl+' · '+(m.chapter*5+i+1)+'/25</span>'+
        '<strong>'+(i===4?spec.gifts[m.chapter]:STEPS[i])+'</strong>'+
        '<small>'+(i===4?'새로운 이펙트의 완성 단계':'빛과 문양이 조금씩 진화')+'</small></span></button>';
    }).join('');
    els.focus.innerHTML=artwork(spec,level,true);
    els.detail.textContent='LV.'+level+' · '+spec.chapters[m.chapter]+' · '+STEPS[m.strength-1]+' — '+spec.gifts[m.chapter]+
      ' (전체 '+m.tier+'/25단계). 캐릭터 원본은 동일하며 오라만 바뀝니다.';
    els.prev.disabled=level===10;
    els.next.disabled=level===250;
  }
  panel.addEventListener("click",function(event){
    const el=event.target.closest("[data-jal-avatar],[data-jal-theme],[data-jal-chapter],[data-jal-level],#ja-aura-prev,#ja-aura-next");
    if(!el||!panel.contains(el))return;
    const d=el.dataset;
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

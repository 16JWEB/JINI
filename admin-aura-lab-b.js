/* Alternative B: cohesive energy sculptures instead of cumulative geometric layers.
   Read-only SVG for the admin aura studio; relies on original character atlas. */
(function () {
  "use strict";
  let serial=0;
  const round=n=>Math.round(n*100)/100;
  const point=(radius,degrees)=>{let rad=degrees*Math.PI/180;return [round(200+radius*Math.cos(rad)),round(200+radius*Math.sin(rad))]};
  function petal(x,y,r,rot,fill,opacity){
    return '<path d="M0 '+(-r)+' C'+round(r*.75)+' '+round(-r*.8)+' '+round(r*.72)+' '+round(r*.3)+' 0 '+r+
      ' C'+round(-r*.75)+' '+round(r*.15)+' '+round(-r*.75)+' '+round(-r*.8)+' 0 '+(-r)+'Z" fill="'+fill+'" opacity="'+opacity+
      '" transform="translate('+x+' '+y+') rotate('+rot+')"/>';
  }
  function shimmer(spec,id,level) {
    const count=5+Math.floor(level/10);
    let pieces="";
    for(let i=0;i<count;i++){
      const ang=i*137.507764+17;
      const r=115+(i*29)%84;
      const [x,y]=point(r,ang);
      const size=1.4+(i%4)*.65+Math.floor(level/100)*.26;
      if(spec.key==="petal"&&i%4===0)pieces+=petal(x,y,size*2,ang+24,'url(#'+id+'-crystal)',".84");
      else if(spec.key==="frost"&&i%4===0)pieces+='<path d="M'+x+' '+round(y-size*2)+'l'+round(size*.8)+' '+round(size*2)+' -'+round(size*.8)+' '+round(size*2)+' -'+round(size*.8)+' -'+round(size*2)+'Z" fill="url(#'+id+'-crystal)" opacity=".82"/>';
      else if(spec.key==="cyber"&&i%4===0)pieces+='<rect x="'+round(x-size)+'" y="'+round(y-size)+'" width="'+round(size*2)+'" height="'+round(size*2)+'" rx=".7" transform="rotate(45 '+x+' '+y+')" fill="url(#'+id+'-crystal)" opacity=".78"/>';
      else pieces+='<circle cx="'+x+'" cy="'+y+'" r="'+round(size)+'" fill="'+(i%4===0?spec.color:spec.light)+'" opacity="'+round(.45+(i%3)*.18)+'"/>';
    }
    return '<g class="jal-b-sparks">'+pieces+'</g>';
  }
  function blossom(spec,id,level){
    const n=5+Math.floor(level/25),petals=6+Math.floor(level/30),scale=1+level/900;
    let s='<g class="jal-b-core" transform="translate(200 200) scale('+round(scale)+')">';
    // Petals make one blooming silhouette rather than individual thick rings.
    for(let i=0;i<petals;i++){
      const theta=i*360/petals;
      const x=round(90*Math.cos(theta*Math.PI/180)),y=round(90*Math.sin(theta*Math.PI/180));
      s+=petal(x,y,42+Math.floor(level/20),theta+90,'url(#'+id+'-crystal)',round(.35+level/500));
    }
    s+='</g>';
    const leaves=2+Math.floor(level/50);
    for(let i=0;i<leaves;i++){
      const x=43+i*13,y=104+i*20;
      s+=petal(x,y,16+Math.min(22,level/22),-32,'url(#'+id+'-soft)',".5")+
        petal(400-x,400-y,16+Math.min(22,level/22),42,'url(#'+id+'-soft)',".52");
    }
    if(level>=100){
      s+='<g class="jal-b-plume"><path d="M13 287C26 184 93 93 191 80C101 160 79 253 118 301C75 277 38 315 13 287Z" fill="url(#'+id+'-smoke)" opacity=".83"/>'+
        '<path d="M387 287C374 184 307 93 209 80C299 160 321 253 282 301C325 277 362 315 387 287Z" fill="url(#'+id+'-smoke)" opacity=".83"/></g>';
    }
    return s;
  }
  function ice(spec,id,level){
    const n=5+Math.floor(level/25),r=119+Math.floor(level/50)*8;
    let s='<g class="jal-b-core">';
    for(let i=0;i<n;i++){
      const a=(i*360/n-90)*Math.PI/180,dist=r;
      const x=round(200+Math.cos(a)*dist),y=round(200+Math.sin(a)*dist);
      const rot=i*360/n;
      const h=34+level/5,w=9+level/45;
      s+='<g transform="translate('+x+' '+y+') rotate('+rot+')">'+
        '<path d="M0 '+(-h)+'L'+round(w)+' 0 0 '+round(h*.45)+' '+round(-w)+' 0Z" fill="url(#'+id+'-crystal)" opacity=".7"/>'+
        '<path d="M0 '+(-h)+'V'+round(h*.45)+'L'+round(w)+' 0Z" fill="url(#'+id+'-sheen)" opacity=".62"/></g>';
    }
    s+='</g>';
    if(level>=110){
      s+='<g class="jal-b-plume"><path d="M35 302L66 207 49 145 102 105 153 222 117 316Z" fill="url(#'+id+'-soft)" opacity=".67"/>'+
        '<path d="M365 302L334 207 351 145 298 105 247 222 283 316Z" fill="url(#'+id+'-soft)" opacity=".67"/></g>';
    }
    return s;
  }
  function cyber(spec,id,level){
    let sides=6, r=132+Math.floor(level/50)*9;
    const pts=Array.from({length:6},(_,i)=>point(r,i*60-90));
    const polygon=pts.map(p=>p.join(",")).join(" ");
    const inner=Array.from({length:6},(_,i)=>point(r-15,i*60-90)).map(p=>p.join(",")).join(" ");
    let s='<g class="jal-b-core"><polygon points="'+polygon+'" fill="url(#'+id+'-soft)" opacity=".6"/>'+
      '<polygon points="'+inner+'" fill="#131d37" opacity=".49"/></g>';
    const plates=4+Math.floor(level/40);
    for(let i=0;i<plates;i++){
      const theta=i*360/plates-90,[x,y]=point(r+18,theta);
      s+='<g transform="translate('+x+' '+y+') rotate('+(theta+90)+')">'+
        '<path d="M-18 -7L-7 -18 14 -18 22 0 14 18 -7 18 -18 7Z" fill="url(#'+id+'-crystal)" opacity="'+round(.4+level/520)+'"/>'+
        '<path d="M-12 -8L-2 -13 12 -13" stroke="'+spec.light+'" stroke-opacity=".5" stroke-width="1.5" fill="none"/></g>';
    }
    if(level>=100){
      s+='<g class="jal-b-plume"><path d="M24 253L48 151 126 116 156 173 124 260 69 306Z" fill="url(#'+id+'-smoke)" opacity=".78"/>'+
        '<path d="M376 253L352 151 274 116 244 173 276 260 331 306Z" fill="url(#'+id+'-smoke)" opacity=".78"/></g>';
    }
    return s;
  }
  function time(spec,id,level){
    const r=135+Math.floor(level/50)*7,ticks=8+Math.floor(level/30);
    let s='<g class="jal-b-core"><circle cx="200" cy="200" r="'+r+'" fill="url(#'+id+'-soft)" opacity=".68"/>'+
      '<circle cx="200" cy="200" r="'+round(r*.91)+'" fill="#121625" opacity=".63"/>';
    for(let i=0;i<ticks;i++){
      const deg=i*360/ticks-90,[x,y]=point(r-10,deg);
      s+='<path d="M'+round(x-2)+' '+round(y-3)+'h4v6h-4Z" fill="'+spec.light+'" opacity="'+round(.36+level/500)+'" transform="rotate('+(deg+90)+' '+x+' '+y+')"/>';
    }
    s+='</g>';
    const gears=level>=100?2:1;
    for(let j=0;j<gears;j++){
      const cx=j?312:88,cy=j?280:134,rr=j?34:27;
      s+='<g class="jal-b-gear"><circle cx="'+cx+'" cy="'+cy+'" r="'+rr+'" fill="url(#'+id+'-crystal)" opacity=".48"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(rr-7)+'" fill="#171629" opacity=".8"/>'+
        '<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+spec.light+'" opacity=".7"/></g>';
    }
    if(level>=150){
      s+='<g class="jal-b-plume"><path d="M28 283C7 195 67 104 165 78C85 149 86 254 132 303C79 279 53 316 28 283Z" fill="url(#'+id+'-smoke)" opacity=".8"/>'+
        '<path d="M372 283C393 195 333 104 235 78C315 149 314 254 268 303C321 279 347 316 372 283Z" fill="url(#'+id+'-smoke)" opacity=".8"/></g>';
    }
    return s;
  }
  function galaxy(spec,id,level){
    const stars=3+Math.floor(level/50);
    let s='<g class="jal-b-core"><ellipse cx="200" cy="200" rx="'+(113+level/6)+'" ry="'+round(45+level/11)+'" transform="rotate(-31 200 200)" fill="url(#'+id+'-crystal)" opacity=".62"/>'+
      '<ellipse cx="200" cy="200" rx="'+(128+level/7)+'" ry="'+round(58+level/12)+'" transform="rotate(34 200 200)" fill="url(#'+id+'-soft)" opacity=".65"/></g>';
    for(let i=0;i<stars;i++){
      const [x,y]=point(147+level/9,i*360/stars-65),rad=6+level/70+(i%3);
      s+='<path d="M'+x+' '+round(y-rad)+'L'+round(x+rad*.24)+' '+round(y-rad*.22)+'L'+round(x+rad)+' '+y+
        'L'+round(x+rad*.24)+' '+round(y+rad*.24)+'L'+x+' '+round(y+rad)+'L'+round(x-rad*.24)+' '+round(y+rad*.24)+
        'L'+round(x-rad)+' '+y+'L'+round(x-rad*.24)+' '+round(y-rad*.24)+'Z" fill="url(#'+id+'-sheen)" opacity=".85"/>';
    }
    if(level>=110){
      s+='<g class="jal-b-plume"><path d="M19 294C9 129 137 40 199 91C97 146 83 268 141 319C76 285 47 329 19 294Z" fill="url(#'+id+'-smoke)" opacity=".9"/>'+
        '<path d="M381 294C391 129 263 40 201 91C303 146 317 268 259 319C324 285 353 329 381 294Z" fill="url(#'+id+'-smoke)" opacity=".9"/></g>';
    }
    return s;
  }
  function render(spec, level, large, portraitMarkup){
    const lvl=Math.max(10,Math.min(250,Number(level)||10)),n=++serial;
    const id="jal-b-"+n;
    const strength=lvl/250;
    const core={petal:blossom,frost:ice,cyber,time,galaxy}[spec.key];
    if(!core)return "";
    const opacity=round(.17+strength*.25);
    // Small milestone ornaments all use the same material/shape vocabulary
    // instead of overlaying unrelated rings, wings and crowns.
    const spark=shimmer(spec,id,lvl);
    let top="";
    if(lvl>=200){
      top='<g class="jal-b-crown"><path d="M148 89Q164 55 200 '+(24-Math.floor(strength*10))+'Q236 55 252 89Q200 110 148 89Z" fill="url(#'+id+'-crystal)" opacity="'+round(.46+strength*.3)+'"/>'+
        '<ellipse cx="200" cy="87" rx="41" ry="7" fill="url(#'+id+'-sheen)" opacity=".54"/></g>';
    }
    const defs='<defs>'+
      '<radialGradient id="'+id+'-atmos"><stop stop-color="'+spec.light+'" stop-opacity="0"/><stop offset=".43" stop-color="'+spec.color+'" stop-opacity="'+round(opacity*.28)+'"/><stop offset=".76" stop-color="'+spec.color+'" stop-opacity="'+opacity+'"/><stop offset="1" stop-color="'+spec.deep+'" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="'+id+'-crystal" x1="0%" y1="0%" x2="90%" y2="100%"><stop stop-color="'+spec.light+'" stop-opacity=".91"/><stop offset=".42" stop-color="'+spec.color+'" stop-opacity=".72"/><stop offset=".95" stop-color="'+spec.deep+'" stop-opacity=".13"/></linearGradient>'+
      '<linearGradient id="'+id+'-sheen" x1="5%" y1="0%" x2="80%" y2="100%"><stop stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="'+spec.light+'" stop-opacity=".65"/><stop offset="1" stop-color="'+spec.color+'" stop-opacity=".12"/></linearGradient>'+
      '<radialGradient id="'+id+'-soft"><stop stop-color="'+spec.color+'" stop-opacity=".63"/><stop offset=".57" stop-color="'+spec.deep+'" stop-opacity=".48"/><stop offset="1" stop-color="'+spec.color+'" stop-opacity=".04"/></radialGradient>'+
      '<radialGradient id="'+id+'-smoke"><stop stop-color="'+spec.light+'" stop-opacity=".82"/><stop offset=".43" stop-color="'+spec.color+'" stop-opacity=".47"/><stop offset="1" stop-color="'+spec.deep+'" stop-opacity="0"/></radialGradient></defs>';
    const aura='<svg class="jal-aura-svg jal-b-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+defs+
      '<circle cx="200" cy="200" r="'+(146+Math.floor(lvl/50)*9)+'" fill="url(#'+id+'-atmos)"/>'+
      core(spec,id,lvl)+spark+top+'</svg>';
    return '<span class="jal-stage jal-variant-b jal-'+spec.key+' jal-chapter-'+(Math.ceil(lvl/50))+
      (large?' jal-large':'')+'" style="--jal-color:'+spec.color+';--jal-light:'+spec.light+';--jal-deep:'+spec.deep+
      '" aria-hidden="true">'+aura+'<span class="jal-sprite">'+portraitMarkup+'</span></span>';
  }
  window.JINI_ADMIN_AURA_B={render};
}());

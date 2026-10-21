/* JINI alternative C – character-first, soft particle aura art.
   No big wings, opaque polygons, growing flower disks, or accumulated junk.
   All effects are behind the original sprite, generated on demand with tiny SVG. */
(function(){
  "use strict";
  let seed=0;
  const f=n=>Number(n.toFixed(2));
  const point=(r,a)=>{const q=(a-90)*Math.PI/180;return [f(200+Math.cos(q)*r),f(200+Math.sin(q)*r)]};
  const ellipse=(rx,ry,opacity,color,rotation=0,width=1.8,style="")=>
    '<ellipse cx="200" cy="200" rx="'+f(rx)+'" ry="'+f(ry)+'" transform="rotate('+rotation+' 200 200)" fill="none" stroke="'+color+'" stroke-width="'+width+'" stroke-opacity="'+opacity+'" '+style+'/>';
  const shimmer=(x,y,r,fill)=>'<path d="M'+x+' '+f(y-r)+'L'+f(x+r*.19)+' '+f(y-r*.19)+'L'+f(x+r)+' '+y+
    'L'+f(x+r*.19)+' '+f(y+r*.19)+'L'+x+' '+f(y+r)+'L'+f(x-r*.19)+' '+f(y+r*.19)+
    'L'+f(x-r)+' '+y+'L'+f(x-r*.19)+' '+f(y-r*.19)+'Z" fill="'+fill+'"/>';
  function elements(spec,id,lv){
    const progress=lv/250;
    const growth=Math.floor(lv/10);
    const key=spec.key;
    const glow="url(#"+id+"-glow)";
    const satin="url(#"+id+"-satin)";
    const shine="url(#"+id+"-shine)";
    let back='',front='',particles='';
    // A restrained energy field behind the torso, never an opaque disk.
    back+='<ellipse cx="200" cy="224" rx="'+f(125+progress*49)+'" ry="'+f(132+progress*38)+'" fill="'+glow+'" opacity="'+f(.55+progress*.38)+'"/>';
    if(growth>=5)back+='<ellipse cx="200" cy="216" rx="'+f(143+progress*24)+'" ry="'+f(151+progress*17)+'" fill="none" stroke="'+spec.color+'" stroke-width="'+f(1.8+progress*2.2)+'" opacity="'+f(.15+progress*.24)+'"/>';
    // Locked particle locations accumulate strictly by level, without reshuffling.
    const particleCount=5+growth;
    for(let i=0;i<particleCount;i++){
      const ang=i*137.508+22;
      const rad=130+(i*31)%62;
      const [x,y]=point(rad,ang);
      const size=1.4+(i%3)*.8+progress*1.2;
      const opacity=f(.42+(i%4)*.12);
      let shape='';
      if(key==="petal"&&i%3===0){
        shape='<path d="M0 '+f(-size*1.9)+'Q'+f(size*2)+' '+f(-size*.8)+' 0 '+f(size*2.2)+'Q'+f(-size*2)+' '+f(-size*.8)+' 0 '+f(-size*1.9)+'Z" fill="'+satin+'"/>';
      }else if(key==="frost"&&i%3===0){
        shape='<path d="M0 '+f(-size*2.1)+'L'+f(size*.9)+' 0 0 '+f(size*2.1)+' '+f(-size*.9)+' 0Z" fill="'+shine+'"/>';
      }else if(key==="cyber"&&i%3===0){
        shape='<rect x="'+f(-size)+'" y="'+f(-size)+'" width="'+f(size*2)+'" height="'+f(size*2)+'" rx="0.6" fill="'+satin+'"/>';
      }else shape='<circle r="'+f(size*.72)+'" fill="'+(i%2?spec.light:spec.color)+'"/>';
      particles+='<g transform="translate('+x+' '+y+') rotate('+f(ang*1.12)+')" opacity="'+opacity+'">'+shape+'</g>';
    }
    if(key==="petal"){
      // Floating cherry petals, spaced *outside* the body.
      const blossoms=3+Math.floor(growth*.35);
      for(let i=0;i<blossoms;i++){
        const side=i%2?-1:1;
        const a=(i*37+13)%139;
        const x=f(200+side*(133+(i*17)%51)),y=f(72+(a*1.67)%255);
        const r=f(4+progress*3.2+(i%3));
        front+='<g class="jal-c-petals" transform="translate('+x+' '+y+') rotate('+(i*37)+')">'+
          '<path d="M0 '+(-r)+'C'+f(r*.8)+' '+f(-r*.75)+' '+f(r*1.1)+' '+f(r*.5)+' 0 '+r+
          'C'+f(-r*1.15)+' '+f(r*.3)+' '+f(-r*.75)+' '+f(-r*.8)+' 0 '+(-r)+'Z" fill="'+satin+'" opacity="'+f(.63+progress*.26)+'"/></g>';
      }
      if(lv>=60)back+='<path d="M52 283Q68 176 129 129Q91 200 110 304Z" fill="'+glow+'" opacity=".48"/>'+
        '<path d="M348 283Q332 176 271 129Q309 200 290 304Z" fill="'+glow+'" opacity=".48"/>';
      if(lv>=150)back+='<path d="M54 321Q117 280 147 305Q104 359 54 321Z M346 321Q283 280 253 305Q296 359 346 321Z" fill="'+satin+'" opacity=".22"/>';
    }else if(key==="frost"){
      // Sparse, symmetrical frosted prisms, no ragged crystal wings.
      const shards=3+Math.floor(growth/4);
      for(let i=0;i<shards;i++){
        const angle=(i*360/shards+17)%360;
        const [x,y]=point(133+progress*34,angle);
        const tall=f(11+progress*13+(i%3)*2),wide=f(tall*.35);
        front+='<g class="jal-c-ice" transform="translate('+x+' '+y+') rotate('+angle+')">'+
          '<path d="M0 '+(-tall)+'L'+wide+' 0 0 '+f(tall*.35)+' '+(-wide)+' 0Z" fill="'+satin+'" opacity=".63"/>'+
          '<path d="M0 '+(-tall)+'V'+f(tall*.35)+'L'+wide+' 0Z" fill="'+shine+'" opacity=".62"/></g>';
      }
      if(lv>=90)back+='<ellipse cx="200" cy="285" rx="149" ry="61" fill="'+glow+'" opacity=".7"/>';
      if(lv>=180)front+='<g opacity=".5">'+shimmer(200,35,9+progress*4,shine)+'</g>';
    }else if(key==="cyber"){
      // A precision holographic interface: illuminated corners and data pulses.
      const b=146+progress*21;
      const pts=[
        ["M",200-b,200-b,"l",19,0,"l",0,19],
        ["M",200+b,200-b,"l",-19,0,"l",0,19],
        ["M",200-b,200+b,"l",19,0,"l",0,-19],
        ["M",200+b,200+b,"l",-19,0,"l",0,-19]
      ];
      for(const tokens of pts)front+='<path d="'+tokens.join(" ")+'" stroke="'+spec.color+'" stroke-width="'+f(2+progress*1.1)+'" stroke-opacity="'+f(.33+progress*.4)+'" fill="none" stroke-linecap="round"/>';
      const chips=4+Math.floor(growth/3);
      for(let i=0;i<chips;i++){
        const ang=i*360/chips+12,[x,y]=point(152+progress*18,ang);
        front+='<g transform="translate('+x+' '+y+') rotate('+ang+')"><rect x="-7" y="-2" width="14" height="4" rx="1" fill="'+satin+'" opacity="'+f(.53+progress*.4)+'"/></g>';
      }
      if(lv>=100)front+='<path d="M62 120V86H99 M338 280V314H301" stroke="'+spec.light+'" stroke-opacity=".6" stroke-width="2" fill="none"/>';
      if(lv>=200)back+='<ellipse cx="200" cy="200" rx="178" ry="174" fill="none" stroke="'+spec.color+'" stroke-width="1" stroke-dasharray="3 22" opacity=".55"/>';
    }else if(key==="time"){
      // Deliberately fine clockwork detail; never turns into solid triangular wings.
      const r=139+progress*33;
      front+=ellipse(r,r,f(.23+progress*.3),spec.color,0,1.5,'stroke-dasharray="4 14"');
      const ticks=6+Math.floor(growth/3);
      for(let i=0;i<ticks;i++){
        const a=i*360/ticks,[x1,y1]=point(r,a),[x2,y2]=point(r-8,a);
        front+='<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" fill="none" stroke="'+spec.light+'" stroke-width="1.4" opacity=".67"/>';
      }
      if(lv>=60)back+=ellipse(r-15,r-15,.27,shine,0,2,'stroke-dasharray="60 160"');
      if(lv>=120){
        front+='<g opacity=".72">'+shimmer(60,101,9+progress*3,shine)+shimmer(332,306,7+progress*3,shine)+'</g>';
      }
      if(lv>=200)front+='<text x="200" y="35" font-size="16" font-family="Georgia,serif" text-anchor="middle" fill="'+spec.light+'" opacity=".65">Ⅻ</text>';
    }else if(key==="galaxy"){
      // Semi-transparent orbital haze with light accents, not opaque disks.
      const rx=136+progress*43;
      back+='<g class="jal-c-orbit">'+ellipse(rx,50+progress*19,f(.22+progress*.18),spec.color,-28,8)+
        ellipse(rx+8,64+progress*10,f(.32+progress*.24),spec.light,28,3.2)+'</g>';
      if(lv>=80)back+='<g class="jal-c-orbit">'+ellipse(rx-12,91+progress*21,.29,shine,61,2.1)+'</g>';
      if(lv>=160)back+='<ellipse cx="200" cy="201" rx="'+f(144+progress*25)+'" ry="'+f(146+progress*20)+'" fill="'+glow+'" opacity=".43"/>';
      const stars=3+Math.floor(growth/4);
      for(let i=0;i<stars;i++){
        const [x,y]=point(145+progress*32,i*360/stars+21);
        front+=shimmer(x,y,5+progress*3+(i%2)*2,shine);
      }
    }
    return {back,front,particles};
  }
  function render(spec,raw,large,portrait){
    const level=Math.max(10,Math.min(250,Number(raw)||10));
    const id="jal-c-"+(++seed);
    const e=elements(spec,id,level);
    const fill='<defs>'+
      '<radialGradient id="'+id+'-glow"><stop stop-color="'+spec.light+'" stop-opacity="0"/><stop offset=".48" stop-color="'+spec.color+'" stop-opacity=".09"/><stop offset=".75" stop-color="'+spec.color+'" stop-opacity=".44"/><stop offset="1" stop-color="'+spec.deep+'" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="'+id+'-satin" x1="0%" y1="0%" x2="100%" y2="100%"><stop stop-color="'+spec.light+'" stop-opacity=".9"/><stop offset=".42" stop-color="'+spec.color+'" stop-opacity=".7"/><stop offset="1" stop-color="'+spec.deep+'" stop-opacity=".25"/></linearGradient>'+
      '<linearGradient id="'+id+'-shine"><stop stop-color="#fff" stop-opacity=".95"/><stop offset=".65" stop-color="'+spec.light+'" stop-opacity=".72"/><stop offset="1" stop-color="'+spec.color+'" stop-opacity=".2"/></linearGradient></defs>';
    return '<span class="jal-stage jal-variant-c jal-'+spec.key+' jal-chapter-'+Math.ceil(level/50)+(large?' jal-large':'')+
      '" style="--jal-color:'+spec.color+';--jal-light:'+spec.light+';--jal-deep:'+spec.deep+'" aria-hidden="true">'+
      '<svg class="jal-aura-svg jal-c-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">'+fill+
      '<g class="jal-c-background">'+e.back+'</g><g class="jal-c-details">'+e.front+'</g><g class="jal-c-sparkles">'+e.particles+'</g></svg>'+
      '<span class="jal-sprite">'+portrait+'</span></span>';
  }
  window.JINI_ADMIN_AURA_C={render};
}());

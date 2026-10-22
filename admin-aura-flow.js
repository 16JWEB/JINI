/* Flowing energy aura: original mascot foreground, no constructed wings. */
(function(){
"use strict";
let serial=0;
const F=n=>Math.round(n*100)/100;
const paths={
 petal:["M180 244 C137 191 134 138 75 118 C117 154 132 79 45 39","M195 235 C269 191 274 139 348 58 C290 114 306 173 381 126","M172 276 C111 252 87 313 44 339"],
 frost:["M177 235 C102 183 143 109 62 38 C125 90 65 124 17 88","M212 219 C279 142 255 113 356 28 C304 101 357 116 389 104","M186 282 C257 296 278 338 356 354"],
 cyber:["M173 230 C93 173 122 124 32 57 C106 101 128 80 63 20","M215 222 C282 180 305 107 384 55 C344 129 302 182 391 166","M189 283 C112 308 93 347 31 371"],
 time:["M174 231 C107 218 82 155 47 86 C126 145 139 94 95 29","M218 224 C304 200 289 111 359 40 C326 126 382 167 380 201","M180 277 C120 292 95 342 33 344"],
 galaxy:["M185 240 C107 193 112 111 32 75 C105 128 147 72 101 12","M211 224 C276 175 272 76 371 38 C327 122 353 147 390 176","M195 280 C286 265 323 321 368 364"]
};
function render(spec,raw,large,portrait){
 const level=Math.max(10,Math.min(250,Number(raw)||10)),tier=Math.floor((level-10)/50),step=Math.floor(level/10);
 const id="jini-flow-"+(++serial),key=spec.key,curve=paths[key]||paths.galaxy;
 const density=Math.max(2,Math.min(23,Math.ceil(level/12)));
 const extent=F(.44+level/250*.60);
 const palettes={petal:["#ff4b9c","#9b1458","#ffe5f5"],frost:["#46caff","#143d9d","#e1faff"],cyber:["#16f8dd","#073c80","#b0fff2"],time:["#ffc56b","#743b9e","#fff4cd"],galaxy:["#6b8cff","#160d5e","#d6baff"]};
 const [hot,deep,bright]=palettes[key]||palettes.galaxy;
 let streams="",embers="",cores="";
 for(let i=0;i<density;i++){
   const side=i%3,curvePath=curve[side],spread=(i%7-3)*5.3,rot=(i%5-2)*3.5,scale=F(.38+i/density*.63);
   const op=F(.26+(i%4)*.11);
   // Thick translucent brush flows, not feathers or straight line wings.
   streams+='<g transform="translate(200 222) scale('+F(extent*scale)+') rotate('+rot+') translate(-200 -222) translate('+spread+' '+F((i%6-3)*5)+')" opacity="'+op+'">'+
    '<path d="'+curvePath+'" stroke="'+deep+'" stroke-width="'+F(25+(i%5)*6)+'" fill="none" stroke-linecap="round" filter="url(#'+id+'-blur)"/>'+
    '<path d="'+curvePath+'" stroke="url(#'+id+'-flow)" stroke-width="'+F(8+(i%4)*6)+'" fill="none" stroke-linecap="round"/>'+
    '<path d="'+curvePath+'" stroke="'+bright+'" stroke-width="'+F(1.2+(i%3)*1.1)+'" opacity=".8" fill="none" stroke-linecap="round"/></g>';
 }
 for(let i=0;i<step*3;i++){
   const a=i*2.39996+(key.length*.3),r=34+((i*37)%146)*extent;
   const x=F(200+Math.cos(a)*r),y=F(222+Math.sin(a)*r*.88);
   const size=F(1+(i%5)*.68+tier*.2);
   if(key==="cyber"&&i%5===0)embers+='<rect x="'+F(x-size)+'" y="'+F(y-size)+'" width="'+F(size*2)+'" height="'+F(size*2)+'" transform="rotate(45 '+x+' '+y+')" fill="'+bright+'" opacity=".85"/>';
   else embers+='<circle cx="'+x+'" cy="'+y+'" r="'+size+'" fill="'+(i%4===0?bright:hot)+'" opacity="'+F(.3+(i%5)*.13)+'"/>';
 }
 if(level>=50)cores+='<ellipse cx="197" cy="219" rx="'+F(47+tier*6)+'" ry="'+F(82+tier*9)+'" fill="url(#'+id+'-core)" opacity=".55"/>';
 if(level>=100)cores+='<path d="'+curve[1]+'" fill="none" stroke="'+bright+'" stroke-width="3" stroke-dasharray="2 8" opacity=".72"/>';
 if(level>=150)cores+='<ellipse cx="200" cy="273" rx="'+F(70+tier*12)+'" ry="'+F(13+tier*3)+'" stroke="'+hot+'" stroke-width="3" fill="none" opacity=".45"/>';
 if(level>=200)cores+='<path d="'+curve[0]+'" fill="none" stroke="'+bright+'" stroke-width="6" opacity=".6" filter="url(#'+id+'-blur)"/>';
 if(level>=250)cores+='<ellipse cx="200" cy="219" rx="168" ry="164" stroke="'+bright+'" stroke-width="1.6" stroke-dasharray="1 17" opacity=".7" fill="none"/>';
 const svg='<svg class="jal-aura-svg jal-energy-flow-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>'+
 '<linearGradient id="'+id+'-flow" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+deep+'" stop-opacity=".08"/><stop offset=".36" stop-color="'+deep+'"/><stop offset=".7" stop-color="'+hot+'"/><stop offset="1" stop-color="'+bright+'" stop-opacity=".13"/></linearGradient>'+
 '<radialGradient id="'+id+'-core"><stop stop-color="'+bright+'" stop-opacity=".3"/><stop offset=".6" stop-color="'+hot+'" stop-opacity=".16"/><stop offset="1" stop-color="'+deep+'" stop-opacity="0"/></radialGradient>'+
 '<filter id="'+id+'-blur" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="6"/></filter></defs>'+
 '<g class="jal-flow-streams">'+streams+'</g><g class="jal-flow-cores">'+cores+'</g><g class="jal-flow-embers">'+embers+'</g></svg>';
 return '<span class="jal-stage jal-energy-stage jal-flow-'+key+(large?' jal-large':'')+'" style="--jal-color:'+hot+';--jal-light:'+bright+';--jal-deep:'+deep+'" aria-hidden="true">'+svg+'<span class="jal-sprite">'+portrait+'</span></span>';
}
window.JINI_ADMIN_AURA_FLOW={render};
}());
/* New sakura energy study — no legacy line/wing SVG art. Draws layered particles and luminous painterly wisps on isolated canvas. */
(function(){'use strict';
function seeded(n){return function(){n=(Math.imul(n,1664525)+1013904223)|0;return (n>>>0)/4294967296;};}
function paint(canvas,lv){let size=420,ratio=Math.min(2,window.devicePixelRatio||1);canvas.width=size*ratio;canvas.height=size*ratio;let c=canvas.getContext('2d');c.scale(ratio,ratio);c.clearRect(0,0,size,size);
let t=(lv-10)/40,rand=seeded(1229),w=420,h=420;
function glow(x,y,rx,ry,col,alpha,rot){c.save();c.translate(x,y);c.rotate(rot);c.scale(rx,ry);let g=c.createRadialGradient(0,0,0,0,0,1);g.addColorStop(0,'rgba('+col+','+alpha+')');g.addColorStop(.35,'rgba('+col+','+(alpha*.42)+')');g.addColorStop(1,'rgba('+col+',0)');c.fillStyle=g;c.beginPath();c.arc(0,0,1,0,7);c.fill();c.restore();}
c.globalCompositeOperation='screen';
const bands=2+Math.round(t*8);
glow(225,218,60+t*75,90+t*72,'255,70,163',.13+t*.14,-.3);
for(let i=0;i<bands;i++){let dir=i%2?1:-1,shift=i*15,extent=.28+t*.8,ax=203+dir*20,ay=235+(i%4-2)*9,bx=ax+dir*extent*(122+shift*.65),by=ay-extent*(75+shift*.48),ex=ax+dir*extent*(190+shift*.46),ey=by-(i%3-1)*44*extent;
let thick=5+t*10+(i%3)*4;
c.save();c.globalAlpha=.17+t*.22;c.filter='blur('+(8+t*4)+'px)';c.strokeStyle=i%3?'#ff459a':'#c81460';c.lineWidth=thick*3;c.lineCap='round';c.beginPath();c.moveTo(ax,ay);c.bezierCurveTo(ax+dir*extent*65,ay-extent*140,bx,by,ex,ey);c.stroke();c.restore();
for(let layer=0;layer<3;layer++){c.save();c.globalAlpha=(.22+t*.22)*(1-layer*.20);c.lineCap='round';c.strokeStyle=['#ff3f99','#ffa8d1','#fff1ef'][layer];c.lineWidth=thick*(1-layer*.31);c.shadowColor=layer===2?'#fff3d5':'#ff5cba';c.shadowBlur=16+layer*4;c.beginPath();c.moveTo(ax,ay);c.bezierCurveTo(ax+dir*extent*65,ay-extent*140,bx,by,ex,ey);c.stroke();c.restore();}
for(let p=0;p<5+Math.ceil(t*12);p++){let q=rand(),cx=Math.pow(1-q,3)*ax+3*Math.pow(1-q,2)*q*(ax+dir*extent*65)+3*(1-q)*q*q*bx+q*q*q*ex,cy=Math.pow(1-q,3)*ay+3*Math.pow(1-q,2)*q*(ay-extent*140)+3*(1-q)*q*q*by+q*q*q*ey;glow(cx+(rand()-.5)*24,cy+(rand()-.5)*24,8+rand()*23,6+rand()*15,'255,137,198',.1+t*.2,rand()*6);}
}
const petals=Math.round(8+t*82),range=65+t*165;
for(let i=0;i<petals;i++){let ang=rand()*6.283,r=26+Math.sqrt(rand())*range,x=215+Math.cos(ang)*r,y=210+Math.sin(ang)*r*.80,sz=1.5+rand()*(3+t*4),alpha=.3+rand()*.6;
c.save();c.translate(x,y);c.rotate(rand()*6.283);c.globalAlpha=alpha;c.shadowBlur=7;c.shadowColor='#ff85c8';c.fillStyle=rand()>.65?'#fff0f4':'#ff91c1';c.beginPath();c.moveTo(0,-sz);c.bezierCurveTo(sz*1.2,-sz*.75,sz*1.3,sz*.9,0,sz);c.bezierCurveTo(-sz*1.3,sz*.9,-sz*1.2,-sz*.75,0,-sz);c.fill();c.restore();
if(i%5===0)glow(x,y,sz*4,sz*4,'255,189,225',.16,0);
}
for(let i=0;i<6+Math.ceil(t*24);i++){let ang=rand()*6.283,r=30+rand()*range,x=215+Math.cos(ang)*r,y=215+Math.sin(ang)*r*.8,s=1+rand()*2.2;c.save();c.strokeStyle='#fff3de';c.globalAlpha=.4+rand()*.5;c.lineWidth=.65;c.shadowBlur=8;c.shadowColor='#ff6bad';c.beginPath();c.moveTo(x-s*2,y);c.lineTo(x+s*2,y);c.moveTo(x,y-s*2);c.lineTo(x,y+s*2);c.stroke();c.restore();}
c.globalCompositeOperation='source-over';}
function refresh(root){(root||document).querySelectorAll('canvas[data-jini-petal]').forEach(e=>paint(e,Number(e.dataset.jiniPetal)));}
window.JINI_PETAL_PAINT={refresh};})();
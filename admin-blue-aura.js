/* Blue aura image-level test in administrator preview only. No XP or reward writes. */
(function(){
"use strict";
const section=document.getElementById("ja-preview-panel");
if(!section)return;
const css=document.createElement("style");
css.textContent=`
#ja-blue-aura-test{margin:20px 0;padding:18px;border:1px solid #dfd9ed;border-radius:16px;background:#fcfaff}
#ja-blue-aura-test h3{margin:0 0 7px;font-size:17px}
#ja-blue-aura-test p{font-size:12px;line-height:1.7;color:#766c86}
.ja-blue-steps{display:flex;gap:6px;flex-wrap:wrap;margin:12px 0}
.ja-blue-steps button{padding:7px 9px;border-radius:8px;border:1px solid #ddd0da;background:white;color:#5f4250;font:inherit;font-size:12px;cursor:pointer}
.ja-blue-steps button.active{background:#2167cb;color:#fff}
.ja-blue-stage{position:relative;height:330px;max-width:600px;margin:10px auto;border-radius:14px;overflow:hidden;background:radial-gradient(ellipse at 50% 55%,#343044,#13111d 75%);isolation:isolate}
.ja-blue-stage img.aura{position:absolute;width:100%;height:100%;object-fit:contain;inset:0;filter:drop-shadow(0 0 12px #398aff66);animation:ja-blue-pulse 4s ease-in-out infinite alternate}
.ja-blue-stage .hero{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:2}
.ja-blue-stage .hero .jgc-mascot{width:205px!important;height:205px!important;max-width:none!important}
.ja-blue-stage .hero>span{font-size:80px}
.ja-blue-stage .missing{position:absolute;inset:0;display:grid;place-items:center;color:#d7bfc4;font-size:13px;text-align:center;padding:20px}
.ja-blue-tools{display:flex;gap:10px;flex-wrap:wrap;align-items:center;font-size:12px}
.ja-blue-tools label{display:flex;gap:5px;align-items:center}
.ja-blue-tools input[type=range]{width:110px}
.ja-blue-file{display:block;margin:12px 0;font-size:12px;max-width:100%}
@keyframes ja-blue-pulse{from{filter:brightness(.92) drop-shadow(0 0 5px #2588ff44)}to{filter:brightness(1.08) drop-shadow(0 0 16px #2588ff77)}}
@media(prefers-reduced-motion:reduce){.ja-blue-stage img.aura{animation:none}}
`;
document.head.appendChild(css);
const root=document.createElement("section");root.id="ja-blue-aura-test";
root.innerHTML='<h3>🔥 푸른 번개 에너지 오라 · 레벨 10~100</h3><p>오라 원본 10장을 레벨별로 비교합니다. 실제 학습 XP와 보상은 변경하지 않습니다. 사이트에 저장된 이미지를 자동으로 표시합니다.</p><div class="ja-blue-steps"></div><div class="ja-blue-stage"><div class="missing">오라 이미지를 불러오면 이곳에 표시됩니다.</div><div class="hero"></div></div><div class="ja-blue-tools"><label><input id="ja-blue-show-hero" type="checkbox" checked> 캐릭터 표시</label><label>오라 크기 <input id="ja-blue-size" type="range" min="70" max="135" value="100">%</label><label>투명도 <input id="ja-blue-opacity" type="range" min="30" max="100" value="100">%</label></div><p id="ja-blue-status" role="status">준비됨 · 레벨 10</p>';
section.appendChild(root);
const stage=root.querySelector(".ja-blue-stage"), auraImg=document.createElement("img"), hero=root.querySelector(".hero"), status=root.querySelector("#ja-blue-status"),missing=root.querySelector(".missing");
auraImg.className="aura";auraImg.alt="푸른 번개 에너지 오라";stage.insertBefore(auraImg,hero);
const levels=Array.from({length:10},(_,i)=>(i+1)*10);let level=10;
const available=new Set();
levels.forEach(n=>{
 const image=new Image();
 image.onload=()=>{available.add(n);render()};
 image.onerror=()=>{available.delete(n);render()};
 image.src="admin-assets/blue-aura/blue-"+String(n).padStart(3,"0")+".png";
});
const buttons=root.querySelector(".ja-blue-steps");
levels.forEach(n=>{const b=document.createElement("button");b.textContent="Lv."+n;b.type="button";b.onclick=()=>{level=n;render()};buttons.appendChild(b)});
function render(){
 buttons.querySelectorAll("button").forEach((b,i)=>b.classList.toggle("active",levels[i]===level));
 const path="admin-assets/blue-aura/blue-"+String(level).padStart(3,"0")+".png";
 auraImg.src=path;auraImg.hidden=!available.has(level);missing.hidden=available.has(level);
 missing.textContent="오라 이미지가 사이트에 아직 등록되지 않았어요.";
 const isHero=root.querySelector("#ja-blue-show-hero").checked;
 hero.hidden=!isHero;
 if(isHero){if(window.JINI_CHARACTER_ART&&window.JINI_CHARACTER_ART.render){hero.innerHTML=window.JINI_CHARACTER_ART.render({avatar:"fox",level:level,auraLevel:0})}else{hero.textContent="🦊"}}
 auraImg.style.transform="scale("+(Number(root.querySelector("#ja-blue-size").value)/100)+")";
 auraImg.style.opacity=Number(root.querySelector("#ja-blue-opacity").value)/100;
 status.textContent="Lv."+level+" · "+(available.has(level)?"오라 이미지 표시 중":"사이트 이미지 미등록")+" · "+available.size+"/10 준비됨";
}
root.querySelectorAll("input:not([type=file])").forEach(el=>el.addEventListener("input",render));
render();
})();

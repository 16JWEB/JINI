/* Load approved cherry blossom PNGs from the single ZIP uploaded to GitHub. Admin preview only. */
(function(){
"use strict";
const ZIP="icons/sakura/jini_sakura_10_200_assets.zip";
let promise=null,urls=new Map(),error=null;
function script(){
 if(window.JSZip)return Promise.resolve(window.JSZip);
 return new Promise((resolve,reject)=>{
   const existing=document.querySelector('script[data-jini-jszip]');
   if(existing){existing.addEventListener("load",()=>resolve(window.JSZip),{once:true});existing.addEventListener("error",()=>reject(new Error("ZIP decoder unavailable")),{once:true});return;}
   const el=document.createElement("script");
   el.dataset.jiniJszip="1";el.src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";el.async=true;
   el.onload=()=>window.JSZip?resolve(window.JSZip):reject(new Error("ZIP decoder missing"));
   el.onerror=()=>reject(new Error("ZIP decoder unavailable"));
   document.head.appendChild(el);
 });
}
async function load(){
 if(promise)return promise;
 promise=(async()=>{
   const JSZip=await script();
   const response=await fetch(ZIP+"?v=20261022-sakura-zip-v1",{cache:"force-cache"});
   if(!response.ok)throw new Error("ZIP download failed ("+response.status+")");
   const bytes=await response.arrayBuffer();
   const zip=await JSZip.loadAsync(bytes);
   for(let lv=10;lv<=200;lv+=10){
     const filename="icons/sakura/petal_lv"+String(lv).padStart(3,"0")+".png";
     const entry=zip.file(filename);
     if(!entry)throw new Error("Missing art: "+filename);
     const blob=await entry.async("blob");
     urls.set(lv,URL.createObjectURL(new Blob([blob],{type:"image/png"})));
   }
 })().catch(e=>{error=e;throw e;});
 return promise;
}
function refresh(root){
 const holder=root||document;
 const imgs=[...holder.querySelectorAll("img[data-sakura-level]")];
 if(!imgs.length)return;
 load().then(()=>{
   for(const img of imgs){
     if(!img.isConnected)continue;
     const lv=Number(img.dataset.sakuraLevel);
     if(urls.has(lv)){img.src=urls.get(lv);img.hidden=false;}
   }
 }).catch(e=>{
   for(const img of imgs){if(img.isConnected){img.hidden=true;img.closest(".jal-petal-image")?.classList.add("jal-petal-missing");}}
   const el=document.getElementById("ja-aura-focus-desc");
   if(el)el.textContent="벚꽃 오라 ZIP 로딩 실패: "+e.message;
 });
}
window.JINI_SAKURA_ZIP={refresh,load,get error(){return error;}};
})();
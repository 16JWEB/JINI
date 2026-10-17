(function(){
"use strict";
const root=document.getElementById("english-game-root"), section=document.getElementById("english-game-section");
if(!root||!section)return;
const KEY="jini-english-game-v1", DAY=86400000, levels=["초등","중등","고등"];
const modes=[
["word","📘","단어 뜻 맞히기","영어 단어의 한국어 뜻 선택"],
["listen","🎧","듣고 단어 맞히기","미국식·영국식 발음을 듣고 선택"],
["spelling","🔤","철자 완성하기","한국어 뜻을 보고 철자 입력"],
["sentence","🧩","문장 완성하기","4개 보기에서 선택하거나 철자를 입력해요"],
["speaking","🎙️","발음·회화 챌린지","회화 선택과 직접 따라 말하기"],
["review","🧠","약점 집중 복습","틀린 문제와 예정된 문제 다시 풀기"]];
const dialogues=[
["초등","카페","What would you like to drink?","I'd like some water, please.","물 좀 주세요.","I'd like a sandwich.","I had coffee yesterday.","I usually eat breakfast at home."],
["초등","학교","Can I borrow your pencil?","Sure. Here you go.","물론이야. 여기 있어.","I left my notebook at home.","I finished my homework yesterday.","I need to sharpen my pencil."],
["초등","인사","How was your weekend?","It was great!","정말 좋았어!","I'm free next weekend.","We're meeting at five.","I usually work on Mondays."],
["초등","식당","Would you like anything else?","No, that's all. Thank you.","아니요, 이게 전부예요. 감사합니다.","The food was spicy.","I had lunch already.","We arrived around noon."],
["초등","길 찾기","Where is the station?","It's next to the bank.","은행 옆에 있어요.","I'm taking the train home.","The train leaves at six.","I bought a ticket yesterday."],
["중등","약속","I'm running a little late.","No problem. Take your time.","괜찮아요. 천천히 오세요.","I usually get up early.","The meeting starts at ten.","I finished my work yesterday."],
["중등","직장","Could you send it by Friday?","Sure, I'll send it by then.","금요일까지 보내 드릴게요.","I wrote the report yesterday.","I have a meeting at two.","The office closes early on Friday."],
["중등","호텔","Is breakfast included?","Yes, it's included in the rate.","네, 숙박 요금에 포함되어 있어요.","I checked in this morning.","My flight arrived on time.","The restaurant opens at seven."],
["중등","회의","Could you explain that again?","Of course. Let me clarify.","물론이죠. 다시 설명할게요.","We met last week.","I agree with the proposal.","The files are in the shared folder."],
["중등","상점","Do you have this in a smaller size?","Let me check for you.","확인해 드릴게요.","I bought these last month.","The blue one looks nice.","I'm looking for a jacket."],
["고등","회의","What do you think about the proposal?","It has potential, but we need more details.","가능성은 있지만 세부 사항을 보완해야 해요.","I read it yesterday.","I work with the design team.","The meeting starts at nine."],
["고등","업무","Could we reschedule the meeting?","Certainly. What time works for you?","물론이죠. 몇 시가 편하세요?","We talked about it last week.","I have another appointment today.","I'll send the agenda tomorrow."],
["고등","의견","I see your point, but I disagree.","I'd like to understand your reasoning.","그렇게 생각하시는 이유를 듣고 싶어요.","We met at the conference.","I'll check the schedule.","The presentation was helpful."],
["고등","문제 해결","We need a practical solution.","Let's prioritize the urgent issues.","긴급한 문제부터 해결해 봅시다.","I emailed the report.","We have a meeting tomorrow.","The deadline is Friday."],
["고등","전화","There seems to be a misunderstanding.","Let's go over the details together.","세부 사항을 함께 확인해 봅시다.","The call started late.","I spoke with the manager.","The report was sent yesterday."]];
const phrases=[
["초등","Can you help me?","도와주실 수 있나요?"],["초등","Thank you very much.","정말 감사합니다."],["초등","Where is the bathroom?","화장실이 어디예요?"],["초등","Have a nice day!","좋은 하루 보내세요!"],
["중등","Could you say that again?","다시 말씀해 주시겠어요?"],["중등","I'm looking forward to it.","기대하고 있어요."],["중등","Let me think about it.","생각해 볼게요."],["중등","I haven't decided yet.","아직 결정하지 않았어요."],
["고등","I'd appreciate your feedback.","의견을 주시면 감사하겠습니다."],["고등","Could you elaborate on that?","좀 더 자세히 설명해 주시겠어요?"],["고등","I understand your concerns.","걱정하시는 부분을 이해해요."],["고등","Let's consider another approach.","다른 방법을 고려해 봅시다."]];
const words=(window.WORDS||[]).filter(w=>w&&levels.includes(w.level)&&/^[a-z][a-z'-]*$/i.test(w.word||"")&&String(w.meaning||"").trim());
let level="초등", count=10, accent="en-US", game=null, active=false, status="", heard="", recognition=null, recorder=null, stream=null, audioUrl=null, recording=false;
let memory={xp:0,tries:0,correct:0,items:{}};
try{const saved=JSON.parse(localStorage.getItem(KEY)||"null");if(saved&&saved.items)memory=Object.assign(memory,saved);}catch(e){}
function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function btn(label,action,cls,attrs){return '<button type="button" class="eg-btn '+(cls||"")+'" data-eg="'+action+'" '+(attrs||"")+'>'+label+'</button>';}
function random(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function clean(t){return String(t||"").toLowerCase().trim().replace(/[\s.,!?'"’]/g,"");}
function meaning(w){return String(w.meaning).split(/[,;]/)[0].trim();}
function pool(){return words.filter(w=>w.level===level);}
function options(right,arr){const found=new Set([right]);const other=random(arr).filter(t=>{if(!t||found.has(t))return false;found.add(t);return true;}).slice(0,3);return other.length===3?random([right].concat(other)):null;}
function wordQuestion(w,mode,group){
 const answer=mode==="word"?meaning(w):w.word;
 const choices=options(answer,group.map(x=>mode==="word"?meaning(x):x.word));
 if(!choices)return null;
 return {id:mode+":"+w.level+":"+w.word,mode,kind:"choice",title:mode==="word"?w.word:"🎧 영어 소리를 들어 보세요",prompt:mode==="word"?"영어 단어의 뜻은?":"소리를 듣고 올바른 영어 단어를 고르세요.",answer,options:choices,voice:w.word,explanation:w.word+" — "+w.meaning,example:w.exampleReviewed?w.example:"",exampleKo:w.exampleReviewed?w.exampleKo:"",ipa:w.ipa||""};
}
function spelling(w){return {id:"spelling:"+w.level+":"+w.word,mode:"spelling",kind:"input",title:meaning(w),prompt:"한국어 뜻에 맞는 영어 단어를 입력하세요.",answer:w.word,voice:w.word,hint:random(w.word.split("")).join(" · "),explanation:w.word+" — "+w.meaning,example:w.exampleReviewed?w.example:"",exampleKo:w.exampleReviewed?w.exampleKo:""};}
function sentence(w, group){
 const text=String(w.example||"").trim();
 if(!w.exampleReviewed||!w.exampleKo||text.length>150)return null;
 const re=new RegExp("\\b"+w.word+"\\b","gi");
 const matches=text.match(re);
 if(!matches||matches.length!==1)return null;
 const blank=text.replace(re,"______");
 if(blank===text)return null;
 // Prefer same-part-of-speech distractors to avoid mixing nouns and verbs.
 const candidates=group.filter(other=>other.partOfSpeech && other.partOfSpeech===w.partOfSpeech);
 const opts=options(w.word,(candidates.length>=4?candidates:group).map(other=>other.word));
 if(!opts)return null;
 return {id:"sentence:"+w.level+":"+w.word,mode:"sentence",kind:"input",title:blank,
  prompt:"보기에서 단어를 골라 빈칸에 넣고 정답을 확인하세요. 직접 입력도 가능해요.",
  answer:w.word,options:opts,voice:text,hint:w.exampleKo,explanation:w.word+" — "+w.meaning,example:text,exampleKo:w.exampleKo};
}
function dialogue(row){
 const opt=random([row[3],row[5],row[6],row[7]]);
 return {id:"dialog:"+row[0]+":"+row[2],mode:"speaking",kind:"choice",title:row[2],prompt:"["+row[1]+"] 가장 자연스러운 대답을 선택하세요.",answer:row[3],voice:row[2],options:opt,explanation:"",example:row[3],exampleKo:row[4]};
}
function speaking(row){
 return {id:"speak:"+row[0]+":"+row[1],mode:"speaking",kind:"speak",title:row[1],prompt:"영어 발음을 듣고 따라 말해 보세요.",answer:row[1],voice:row[1],explanation:"",example:row[1],exampleKo:row[2]};
}
function due(){return Object.keys(memory.items).filter(id=>{const p=memory.items[id];return p&&p.snapshot&&p.level===level&&Number(p.due)<=Date.now();});}
function build(mode){
 const eligible=random(pool());
 if(mode==="word"||mode==="listen")return eligible.map(w=>wordQuestion(w,mode,eligible)).filter(Boolean).slice(0,count);
 if(mode==="spelling")return eligible.filter(w=>w.word.length<=18).slice(0,count).map(spelling);
 if(mode==="sentence")return eligible.map(w=>sentence(w,eligible)).filter(Boolean).slice(0,count);
 if(mode==="speaking"){
  const d=random(dialogues.filter(r=>r[0]===level)).map(dialogue);
  const s=random(phrases.filter(r=>r[0]===level)).map(speaking);
  const fromExamples=eligible.filter(w=>w.exampleReviewed&&w.exampleKo&&w.example&&w.example.length<=100).slice(0,count).map(w=>speaking([level,w.example,w.exampleKo]));
  const a=d,b=s.concat(fromExamples),list=[];
  while(list.length<count&&(a.length||b.length)){if(a.length)list.push(a.shift());if(list.length<count&&b.length)list.push(b.shift());}
  return list;
 }
 if(mode==="review")return random(due()).slice(0,count).map(id=>{
   const q=Object.assign({},memory.items[id].snapshot);
   if(q.kind==="choice")q.options=random(q.options);
   return q;
 });
 return [];
}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(memory));if(window.JINI_CHARACTER)window.JINI_CHARACTER.refresh();}catch(e){status="학습 기록을 저장할 수 없어요.";}}
function stop(){
 if(window.speechSynthesis)window.speechSynthesis.cancel();
 if(recognition){const old=recognition;recognition=null;try{old.abort();}catch(e){}}
 if(recorder&&recorder.state!=="inactive"){try{recorder.stop();}catch(e){}}
 if(stream)stream.getTracks().forEach(t=>t.stop());
 stream=null;recorder=null;recording=false;
 if(audioUrl){URL.revokeObjectURL(audioUrl);audioUrl=null;}
 status="";heard="";
}
function gotoTop(){if(!section.hidden&&section.scrollIntoView)section.scrollIntoView({block:"start"});}
function home(){stop();active=false;game=null;dashboard();gotoTop();}
window.JINI_ENGLISH_GAME_BACK=function(){if(section.hidden||!active)return false;home();return true;};
function goHome(){if(window.history&&window.history.state&&window.history.state.jiniEnglishGame)window.history.back();else home();}
function dashboard(){
 root.innerHTML='<div class="eg-stats"><div><small>영어 게임 XP</small><b>'+memory.xp+'</b></div><div><small>성공률 (자가평가 포함)</small><b>'+(memory.tries?Math.round(memory.correct/memory.tries*100):0)+'%</b></div><div><small>복습할 문제</small><b>'+due().length+'</b></div></div>'+
 '<div class="eg-options"><label>난이도 <select id="eg-level">'+levels.map(t=>'<option '+(t===level?"selected ":"")+'value="'+t+'">'+t+'</option>').join("")+'</select></label>'+
 '<label>문제 수 <select id="eg-count">'+[10,20,30].map(n=>'<option '+(n===count?"selected ":"")+'value="'+n+'">'+n+'문제</option>').join("")+'</select></label>'+
 '<label>영어 발음 <select id="eg-accent"><option '+(accent==="en-US"?"selected ":"")+'value="en-US">🇺🇸 미국식</option><option '+(accent==="en-GB"?"selected ":"")+'value="en-GB">🇬🇧 영국식</option></select></label></div>'+
 '<div class="eg-grid">'+modes.map(m=>'<button type="button" class="eg-mode" data-eg="start" data-mode="'+m[0]+'"><span>'+m[1]+'</span><strong>'+m[2]+'</strong><small>'+m[3]+'</small><b>시작 →</b></button>').join("")+'</div>'+
 '<p class="eg-note">기존 JINI 영어 단어와 검수 예문을 사용해요. 각 문제를 처음 맞히면 +10 XP, 이미 맞힌 문제는 +0 XP예요. 학습 기록은 이 브라우저에 저장됩니다. 미국식·영국식 발음은 설치된 음성 엔진에 따라 다를 수 있어요.</p>';
}
function nav(bottom){
 const p=game.index,n=game.questions.length;
 return '<div class="eg-nav'+(bottom?' eg-nav-bottom':'')+'" role="navigation" aria-label="'+(bottom?'아래쪽':'위쪽')+' 게임 이동">'+
 btn("← 게임 목록","home","eg-outline")+'<div class="eg-nav-controls">'+
 btn("← 이전 문제","previous","eg-outline",p===0?"disabled":"")+
 (p<n?btn(p===n-1?"결과 보기 →":"다음 문제 →","next","eg-outline"):"")+'</div></div>';
}
function exerciseExample(q){
 if(q.example&&q.exampleKo)return {en:String(q.example),ko:String(q.exampleKo)};
 // Older saved review questions do not always contain the new example fields.
 if(q.mode==="sentence"&&q.exampleKo&&/^[A-Za-z]/.test(q.explanation||""))
  return {en:String(q.explanation),ko:String(q.exampleKo)};
 if(q.mode==="speaking"&&q.kind==="speak"&&q.answer&&q.explanation)
  return {en:String(q.answer),ko:String(q.explanation)};
 if(q.mode==="speaking"&&q.kind==="choice"&&q.answer&&
    String(q.explanation||"").startsWith(q.answer+" — "))
  return {en:String(q.answer),ko:String(q.explanation).slice((q.answer+" — ").length)};
 const parts=/^(?:word|listen|spelling|sentence):([^:]+):([^:]+)$/.exec(q.id||"");
 if(parts){
  const w=words.find(item=>item.level===parts[1]&&item.word===parts[2]);
  if(w&&w.exampleReviewed&&w.example&&w.exampleKo)
   return {en:String(w.example),ko:String(w.exampleKo)};
 }
 return null;
}
function feedback(q){
 if(!q.done)return "";
 const sample=exerciseExample(q);
 const description=String(q.explanation||"").trim();
 const repeated=sample&&(description===sample.en||description===sample.ko||description===sample.en+" — "+sample.ko);
 let html='<div class="eg-feedback '+(q.good?"eg-ok":"eg-wrong")+'"><strong>'+
  (q.kind==="speak"
    ? (q.good ? (q.xpEarned ? "말하기 완료! +10 XP" : "말하기 완료! 이미 경험치를 받은 문제예요. +0 XP") : "복습 대상으로 저장했어요.")
    : (q.good ? (q.xpEarned ? "정답이에요! +10 XP" : "정답이에요! 이미 경험치를 받은 문제예요. +0 XP") : "아쉬워요. 복습 목록에 추가했어요."))+
  '</strong>'+(q.kind==="speak"?"":'<p>정답: '+esc(q.answer)+'</p>');
 if(description&&!repeated)html+='<p>'+esc(description)+'</p>';
 if(sample){
  html+='<div class="eg-example"><div class="eg-example-label">영어 예문</div>'+
   '<p class="eg-example-en" lang="en">'+esc(sample.en)+'</p>'+
   btn("🔊 예문 듣기","listen-example","eg-outline eg-example-listen")+
   '<div class="eg-example-label">한글 해석</div>'+
   '<p class="eg-example-ko" lang="ko">'+esc(sample.ko)+'</p></div>';
 }else{
  html+='<p class="eg-example-empty">검수된 예문이 아직 준비되지 않았어요.</p>';
 }
 return html+'</div>';
}
function render(){
 if(!game){dashboard();return;}
 const q=game.questions[game.index];
 if(!q){if(!game.questions.length){root.innerHTML='<div class="eg-card">'+nav()+'<h2>지금 풀 문제가 없어요</h2><p>다른 난이도나 게임을 선택해 보세요.</p>'+nav(true)+'</div>';return;}summary();return;}
 const mode=modes.find(m=>m[0]===game.mode);
 let html=nav()+'<div class="eg-progress"><span>'+mode[1]+' '+mode[2]+'</span><span>'+(game.index+1)+' / '+game.questions.length+'</span></div>'+
 '<div class="eg-bar"><i style="width:'+(game.index/game.questions.length*100)+'%"></i></div>'+
 '<p class="eg-prompt">'+esc(q.prompt)+'</p><div class="eg-term">'+
 (q.mode==="sentence"?
   esc(q.title).replace("______",'<span id="eg-cloze-word" class="eg-cloze-word'+(q.draft||q.response?" eg-cloze-filled":"")+'">'+esc(q.draft||q.response||"______")+'</span>'):
   esc(q.title))+'</div>';
 if(q.mode==="listen")html+='<div class="eg-audio">'+btn("🔊 다시 듣기","listen","eg-main")+'</div>';
 else if(q.mode==="word"||q.mode==="speaking"||(q.mode==="sentence"&&q.done))html+='<div class="eg-audio">'+btn("🔊 영어 듣기","listen","eg-outline")+'</div>';
 if(q.kind==="choice"){
  html+='<div class="eg-choices">'+q.options.map((o,i)=>btn('<span class="eg-number">'+(i+1)+'</span>'+esc(o)+(q.done&&o===q.answer?' ✓':""),"choose",
     q.done&&o===q.answer?"eg-option eg-true":q.done&&o===q.response?"eg-option eg-false":"eg-option",
     'data-index="'+i+'"'+(q.done?" disabled":""))).join("")+'</div>';
 }else if(q.kind==="input"){
  html+='<div class="eg-hint">'+(q.mode==="spelling"?"섞인 철자: ":"문장 해석: ")+esc(q.hint||"")+'</div>';
  if(q.mode==="sentence" && Array.isArray(q.options)){
   html+='<div class="eg-sentence-choices" role="group" aria-label="빈칸에 넣을 단어 선택">'+
     q.options.map((choice,i)=>btn('<span class="eg-number">'+(i+1)+'</span>'+esc(choice)+(q.done&&choice===q.answer?' ✓':""),
       "pick-sentence",
       "eg-sentence-option"+(q.draft===choice?" eg-sentence-picked":"")+
         (q.done&&choice===q.answer?" eg-true":q.done&&q.response===choice?" eg-false":""),
       'data-index="'+i+'"'+(q.done?" disabled":""))).join("")+'</div>';
   html+='<p class="eg-small-instruction">보기를 누르면 문장 빈칸에 들어가요. 아래에서 직접 입력하거나 수정할 수도 있어요.</p>';
  }
  html+='<form id="eg-answer-form"><input id="eg-answer" placeholder="영어 단어를 입력하세요" aria-label="영어 단어 정답 입력" value="'+esc(q.draft||q.response||"")+'" autocomplete="off" spellcheck="false" autocapitalize="none" '+(q.done?"disabled":"")+'>'+
    (q.done?"":'<button class="eg-btn eg-main" type="submit">정답 확인</button>')+'</form>';
 }else{
  html+='<div class="eg-speaking"><div class="eg-audio">'+btn("🗣️ 발음 확인","recognize","eg-main")+' '+btn("🎙 목소리 녹음","record","eg-outline")+'</div>'+
   '<div id="eg-speech-feedback" aria-live="polite"></div>'+
   '<p class="eg-note">‘발음 확인’은 지금 말한 영어를 글자로 인식해 비교해요. 녹음은 다시 듣기 전용이고, 발음 정확도 점수는 아니에요.</p>'+
   (q.done?"":'<div class="eg-audio">'+btn("😊 말하기 완료","grade","eg-main",'data-good="yes"')+
      btn("🔁 더 연습하기","grade","eg-outline",'data-good="no"')+'</div>')+'</div>';
 }
 html+=feedback(q);
 if(status&&q.kind!=="speak")html+='<p class="eg-status">'+esc(status)+'</p>';
 root.innerHTML='<div class="eg-card">'+html+nav(true)+'</div>';
 if(q.kind==="speak")speechStatus();
}
function summary(){
 const notDone=game.questions.filter(q=>!q.done).length;
 root.innerHTML='<div class="eg-card">'+nav()+'<div class="eg-finish"><div class="eg-trophy">🏆</div><h2>영어 연습 완료!</h2>'+
 '<p>정답 또는 말하기 완료: '+game.correct+' / '+game.tries+'</p>'+
 (notDone?'<p>건너뛴 문제 '+notDone+'개는 채점하지 않았어요.</p>':"")+
 '<p>추가 복습 '+game.misses+'개 · 이번 획득 +'+game.earned+' XP</p>'+
 btn("같은 유형 다시 도전","restart","eg-main")+'</div>'+nav(true)+'</div>';
}
function begin(mode){
 if(!modes.some(m=>m[0]===mode))return;
 stop();
 if(!active){active=true;if(window.history&&window.history.pushState)window.history.pushState({jiniHome:true,jiniEnglishGame:true},"",window.location.href);}
 game={mode,questions:build(mode),index:0,correct:0,tries:0,misses:0,earned:0};
 render();gotoTop();
}
function move(diff){
 if(!game)return;const next=game.index+diff;
 if(next<0||next>game.questions.length||next===game.index)return;
 stop();game.index=next;render();gotoTop();
}
function grade(q,good,response){
 if(q.done)return;
 const prev=memory.items[q.id]||{streak:0,wrong:0};
 // Old saved results don't have xpAwarded. A positive streak means they
 // have already earned XP; retain it even if subsequent attempts are wrong.
 const previouslyRewarded=prev.xpAwarded===true||
   (prev.xpAwarded===undefined&&Number(prev.streak)>0);
 const firstCorrect=good&&!previouslyRewarded;
 q.done=true;q.good=good;q.response=response;q.xpEarned=firstCorrect;
 memory.tries++;game.tries++;
 if(good){
  memory.correct++;game.correct++;
  if(firstCorrect){memory.xp+=10;game.earned+=10;}
 }else game.misses++;
 prev.xpAwarded=previouslyRewarded||good;
 prev.streak=good?Math.min(5,(prev.streak||0)+1):0;
 if(!good)prev.wrong++;
 prev.level=level;prev.due=Date.now()+(good?[1,3,7,14,30][prev.streak-1]*DAY:0);
 const snapshot={};["id","mode","kind","title","prompt","answer","voice","options","explanation","example","exampleKo","hint","ipa"].forEach(k=>{if(q[k]!==undefined)snapshot[k]=q[k];});
 prev.snapshot=snapshot;memory.items[q.id]=prev;persist();
}
function answerChoice(i){
 if(!game)return;const q=game.questions[game.index];
 if(!q||q.kind!=="choice"||q.done||!Number.isInteger(i)||i<0||i>=q.options.length)return;
 grade(q,q.options[i]===q.answer,q.options[i]);render();
}
function answerText(){
 if(!game)return;
 const q=game.questions[game.index],inp=document.getElementById("eg-answer");
 if(!q||q.kind!=="input"||q.done||!inp)return;
 const value=inp.value.trim();
 if(!value){status="단어를 선택하거나 입력해 주세요.";render();return;}
 q.draft=value;
 grade(q,clean(value)===clean(q.answer),value);
 render();
}
function pickSentence(i){
 if(!game)return;
 const q=game.questions[game.index];
 if(!q||q.mode!=="sentence"||q.done||!Array.isArray(q.options)||
   !Number.isInteger(i)||i<0||i>=q.options.length)return;
 q.draft=q.options[i];
 status="";
 render();
}
function updateSentenceDraft(input){
 if(!game||!input||input.id!=="eg-answer")return;
 const q=game.questions[game.index];
 if(!q||q.kind!=="input"||q.done)return;
 q.draft=String(input.value);
 if(q.mode!=="sentence")return;
 const blank=document.getElementById("eg-cloze-word");
 if(blank){
  blank.textContent=q.draft||"______";
  blank.classList.toggle("eg-cloze-filled",Boolean(q.draft));
 }
 root.querySelectorAll('[data-eg="pick-sentence"]').forEach(b=>{
  b.classList.toggle("eg-sentence-picked",
   Boolean(q.draft)&&q.options[Number(b.dataset.index)]===q.draft);
 });
}
function speak(exampleOnly){
 if(!game)return;const q=game.questions[game.index];if(!q)return;
 const sample=exampleOnly?exerciseExample(q):null;
 const phrase=exampleOnly?(sample&&sample.en):(q.voice||q.answer);
 if(!phrase)return;
 if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){status="브라우저에서 영어 음성을 재생할 수 없어요.";render();return;}
 window.speechSynthesis.cancel();
 const u=new window.SpeechSynthesisUtterance(phrase);
 u.lang=accent;u.rate=.88;
 const voices=window.speechSynthesis.getVoices();
 const exact=voices.find(v=>v.lang&&v.lang.toLowerCase()===accent.toLowerCase());
 const general=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith("en"));
 if(exact||general)u.voice=exact||general;
 if(!exact)status="선택한 지역의 영어 음성이 없어서 다른 영어 음성으로 재생될 수 있어요.";
 window.speechSynthesis.speak(u);
}
function errorMessage(e){
 return ({"not-allowed":"마이크 권한이 거부됐어요. 사이트 권한에서 마이크를 허용해 주세요.",
 "service-not-allowed":"음성 인식 서비스가 제한됐어요. Chrome에서 열어 보세요.",
 "network":"음성 인식 네트워크 연결에 실패했어요.","audio-capture":"마이크를 사용할 수 없어요.",
 "no-speech":"말소리가 인식되지 않았어요.","language-not-supported":"영어 음성 인식을 지원하지 않아요."})[e]||"음성 인식 오류("+e+").";
}
function speechStatus(){
 const area=document.getElementById("eg-speech-feedback");if(!area||!game)return;
 const q=game.questions[game.index];if(!q||q.kind!=="speak")return;
 const spoken=q.heard||heard,match=spoken&&clean(spoken)===clean(q.answer);
 area.innerHTML=(status?'<p class="eg-status">'+esc(status)+'</p>':"")+
 (recording?'<p class="eg-status">🔴 녹음 중 '+btn("■ 녹음 끝내기","stop-record","eg-outline")+'</p>':"")+
 (audioUrl?'<p>내 목소리 듣기</p><audio id="eg-audio-player" controls></audio>':"")+
 (spoken?'<div class="eg-speech-result"><p>목표: '+esc(q.answer)+'</p><p>인식: '+esc(spoken)+'</p><strong>'+
 (match?"문구가 일치해요!":"다르게 인식됐어요. 다시 말해 보세요.")+'</strong>'+
 '<p class="eg-note">글자 일치 여부만 확인해요. 실제 발음 점수가 아니에요.</p></div>':"");
 if(audioUrl){const el=document.getElementById("eg-audio-player");if(el)el.src=audioUrl;}
}
function recognize(){
 if(!game)return;const q=game.questions[game.index];if(!q||q.kind!=="speak")return;
 if(recording){status="먼저 녹음을 끝내고 발음 확인을 눌러 주세요.";speechStatus();return;}
 const API=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!API){status="음성 인식을 지원하지 않는 브라우저예요. Android Chrome에서 다시 열어 보세요.";speechStatus();return;}
 if(recognition){try{recognition.abort();}catch(e){}recognition=null;}
 const rec=new API(),session=game,pos=game.index;
 recognition=rec;status="🎙 듣고 있어요. 영어로 말해 주세요.";heard="";q.heard="";
 rec.lang=accent;rec.interimResults=false;rec.continuous=false;
 const valid=()=>recognition===rec&&game===session&&game.index===pos&&!section.hidden;
 rec.onresult=e=>{if(!valid())return;heard=e.results&&e.results.length?String(e.results[0][0].transcript||"").trim():"";q.heard=heard;status=heard?"인식 완료. 아래 결과를 확인하세요.":"말소리를 인식하지 못했어요.";speechStatus();};
 rec.onerror=e=>{if(!valid()||e.error==="aborted")return;status=errorMessage(e.error);speechStatus();};
 rec.onend=()=>{if(!valid())return;if(!heard&&status.indexOf("듣고 있어요")!==-1)status="말소리가 인식되지 않았어요.";recognition=null;speechStatus();};
 try{rec.start();speechStatus();}catch(e){recognition=null;status="음성 인식 시작에 실패했어요.";speechStatus();}
}
async function record(){
 if(!game)return;const q=game.questions[game.index];if(!q||q.kind!=="speak")return;
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia||!window.MediaRecorder){status="이 환경에서는 녹음을 지원하지 않아요.";speechStatus();return;}
 stop();const gameRef=game,pos=game.index;
 try{
  stream=await navigator.mediaDevices.getUserMedia({audio:true});
  if(section.hidden||gameRef!==game||game.index!==pos){if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;return;}
  const chunks=[],r=new window.MediaRecorder(stream);recorder=r;
  r.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
  r.onstop=()=>{if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}recording=false;
   if(chunks.length&&gameRef===game&&game.index===pos&&!section.hidden){if(audioUrl)URL.revokeObjectURL(audioUrl);audioUrl=URL.createObjectURL(new Blob(chunks,{type:r.mimeType||"audio/webm"}));}
   speechStatus();};
  r.start();recording=true;status="녹음 중이에요.";speechStatus();
 }catch(e){stop();status="마이크 녹음에 실패했어요. 권한을 확인해 주세요.";speechStatus();}
}
root.addEventListener("click",e=>{
 const b=e.target.closest("[data-eg]");if(!b||!root.contains(b))return;
 const a=b.dataset.eg;
 if(a==="home")goHome();
 else if(a==="start")begin(b.dataset.mode);
 else if(a==="restart"&&game)begin(game.mode);
 else if(a==="previous")move(-1);
 else if(a==="next")move(1);
 else if(a==="choose")answerChoice(Number(b.dataset.index));
 else if(a==="pick-sentence")pickSentence(Number(b.dataset.index));
 else if(a==="listen")speak();
 else if(a==="listen-example")speak(true);
 else if(a==="recognize")recognize();
 else if(a==="record")record();
 else if(a==="stop-record"&&recorder&&recorder.state!=="inactive")recorder.stop();
 else if(a==="grade"&&game){const q=game.questions[game.index];if(q&&q.kind==="speak"&&!q.done){grade(q,b.dataset.good==="yes",b.dataset.good);move(1);}}
});
root.addEventListener("submit",e=>{if(e.target&&e.target.id==="eg-answer-form"){e.preventDefault();answerText();}});
root.addEventListener("input",e=>{if(e.target&&e.target.id==="eg-answer")updateSentenceDraft(e.target);});
root.addEventListener("change",e=>{const t=e.target;if(!t)return;
 if(t.id==="eg-level"&&levels.includes(t.value)){level=t.value;dashboard();}
 if(t.id==="eg-count"&&[10,20,30].includes(Number(t.value))){count=Number(t.value);dashboard();}
 if(t.id==="eg-accent"&&["en-US","en-GB"].includes(t.value)){accent=t.value;dashboard();}
});
new MutationObserver(()=>{if(section.hidden){stop();active=false;game=null;dashboard();}}).observe(section,{attributes:true,attributeFilter:["hidden"]});
dashboard();
}());
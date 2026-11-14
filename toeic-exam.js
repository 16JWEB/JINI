/* JINI TOEIC Speaking: free type practice and 11-question timed mock.
   Original practice content, not licensed ETS questions or automatic scores. */
(function () {
  "use strict";
  const typesRoot = document.getElementById("toeic-types-root");
  const mockRoot = document.getElementById("toeic-mock-root");
  const resultsRoot = document.getElementById("toeic-results-root");
  const mockSection = document.getElementById("toeic-mock-section");
  if (!typesRoot || !mockRoot || !resultsRoot || !mockSection) return;

  const PHOTO_MEETING = "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/WLM_international_team_meeting_Vienna_2023-05-27_12.jpg/960px-WLM_international_team_meeting_Vienna_2023-05-27_12.jpg";
  const PHOTO_CAFE = "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7e/Man_reads_a_book_while_sitting_at_a_table_near_a_window_in_a_cafe.jpg/960px-Man_reads_a_book_while_sitting_at_a_table_near_a_window_in_a_cafe.jpg";
  const SCHEDULE = "Community Workshop · Saturday\n9:00 a.m. — Registration (Lobby)\n10:00 a.m. — Beginner Photography (Room A)\n11:30 a.m. — Lunch Break (Café)\n1:00 p.m. — Travel Photography (Room B)\n2:30 p.m. — Questions and Answers (Room B)";
  const TYPE_NAMES = ["문장 읽기", "사진 묘사", "질문에 답하기", "정보 활용하기", "의견 제시하기"];
  const Q = [
    {id:1,type:0,prep:45,time:45,question:"Welcome to the Green City Library. We are open from nine in the morning until six in the evening, Monday through Saturday. Please speak quietly and return all borrowed books on time.",translation:"그린시티 도서관에 오신 것을 환영합니다. 월요일부터 토요일까지 오전 9시부터 오후 6시까지 운영합니다. 조용히 이용하시고 빌린 책은 제때 반납해 주세요."},
    {id:2,type:0,prep:45,time:45,question:"Good afternoon, shoppers. Our summer sale begins this Friday. All shoes and bags will be twenty percent off. Visit the customer service desk if you need more information. Thank you for shopping with us.",translation:"안녕하세요, 고객 여러분. 이번 주 금요일 여름 세일이 시작됩니다. 신발과 가방을 모두 20% 할인합니다. 더 자세한 정보는 고객 서비스 데스크에 문의해 주세요."},
    {id:3,type:1,prep:45,time:30,question:"Describe the picture in as much detail as you can.",translation:"사진을 가능한 한 자세하게 묘사하세요.",image:PHOTO_MEETING,alt:"사무실 회의 테이블에서 여러 사람이 노트북을 앞에 두고 이야기하는 사진",credit:"Manfred Werner (Tsui) · CC BY-SA 4.0",creditUrl:"https://commons.wikimedia.org/wiki/File:WLM_international_team_meeting_Vienna_2023-05-27_12.jpg",answers:{
      IL:["I see people in an office. They are talking.", "사무실에 사람들이 보여요. 사람들이 이야기하고 있어요."],
      IM:["Several people are sitting around a table in an office. They are using laptops and talking to each other.", "사무실에서 여러 사람이 테이블에 둘러앉아 있어요. 노트북을 사용하며 서로 이야기하고 있어요."],
      IH:["The picture shows a group of coworkers having a meeting in a bright office. Some are working on their laptops while others appear to be discussing ideas.", "밝은 사무실에서 동료들이 회의하는 사진이에요. 몇몇은 노트북으로 작업하고 다른 사람들은 아이디어를 논의하는 것 같아요."]
    }},
    {id:4,type:1,prep:45,time:30,question:"Describe the picture in as much detail as you can.",translation:"사진을 가능한 한 자세하게 묘사하세요.",image:PHOTO_CAFE,alt:"카페 창가 자리에서 한 남성이 책을 읽고 있는 사진",credit:"Shixart1985 · CC BY 2.0",creditUrl:"https://commons.wikimedia.org/wiki/File:Man_reads_a_book_while_sitting_at_a_table_near_a_window_in_a_cafe.jpg",answers:{
      IL:["A man is reading a book. He is in a café.", "남자가 책을 읽고 있어요. 그는 카페에 있어요."],
      IM:["A man is sitting at a table near a window in a café. He is reading a book, and there are chairs around him.", "남자가 카페 창가 근처 테이블에 앉아 있어요. 책을 읽고 있고 주변에 의자들이 있어요."],
      IH:["In this picture, a man is relaxing at a café while reading a book by a large window. The café looks quiet, and there are several empty seats around the table.", "남자가 큰 창문 옆 카페에서 책을 읽으며 쉬고 있어요. 카페는 조용해 보이고 테이블 주변에 빈자리가 여러 개 있어요."]
    }},
    {id:5,type:2,prep:3,time:15,question:"How often do you go to a café?",translation:"카페에 얼마나 자주 가나요?",answers:{
      IL:["I go to a café once a week.", "저는 일주일에 한 번 카페에 가요."],
      IM:["I usually go to a café once a week, especially on weekends.", "특히 주말에 일주일에 한 번 정도 카페에 가요."],
      IH:["I tend to visit a café once or twice a week because it's a nice place to relax and catch up with friends.", "휴식을 취하고 친구들과 이야기하기 좋은 장소라 일주일에 한두 번 카페에 가는 편이에요."]
    }},
    {id:6,type:2,prep:3,time:15,question:"What drink do you usually order at a café?",translation:"카페에서 보통 어떤 음료를 주문하나요?",answers:{
      IL:["I usually order coffee.", "저는 보통 커피를 주문해요."],
      IM:["I usually order an iced coffee because I like cold drinks.", "차가운 음료를 좋아해서 보통 아이스커피를 주문해요."],
      IH:["I normally order an iced coffee, even in winter, because I prefer something refreshing rather than a hot drink.", "뜨거운 음료보다 상쾌한 음료가 좋아서 겨울에도 보통 아이스커피를 주문해요."]
    }},
    {id:7,type:2,prep:3,time:30,question:"What do you like most about your favorite café, and why?",translation:"좋아하는 카페의 가장 좋은 점은 무엇이며 그 이유는 무엇인가요?",answers:{
      IL:["I like the quiet atmosphere. I can rest there.", "조용한 분위기가 좋아요. 그곳에서 쉴 수 있어요."],
      IM:["I like the quiet atmosphere at my favorite café. I can read a book and relax after work.", "좋아하는 카페의 조용한 분위기가 좋아요. 퇴근 후 책을 읽고 쉴 수 있어요."],
      IH:["What I like most is the peaceful atmosphere. Unlike crowded places, it gives me space to read, think, and relax after a busy day.", "제가 가장 좋아하는 것은 평온한 분위기예요. 붐비는 장소와 달리 바쁜 하루 뒤 책을 읽고 생각하며 쉴 수 있는 공간이거든요."]
    }},
    {id:8,type:3,prep:3,time:15,info:SCHEDULE,infoPrep:45,question:"What time does the beginner photography class start?",translation:"초급 사진 수업은 몇 시에 시작하나요?",answers:{
      IL:["It starts at ten a.m.", "오전 10시에 시작해요."],
      IM:["The beginner photography class starts at ten a.m. in Room A.", "초급 사진 수업은 오전 10시에 A강의실에서 시작해요."],
      IH:["According to the schedule, the beginner photography class begins at ten a.m. and takes place in Room A.", "일정표에 따르면 초급 사진 수업은 오전 10시에 A강의실에서 진행돼요."]
    }},
    {id:9,type:3,prep:3,time:15,info:SCHEDULE,question:"Where will the afternoon class take place?",translation:"오후 수업은 어디에서 진행되나요?",answers:{
      IL:["It is in Room B.", "B강의실에서 진행돼요."],
      IM:["The afternoon travel photography class will take place in Room B.", "오후 여행 사진 수업은 B강의실에서 진행돼요."],
      IH:["The travel photography session is scheduled for one p.m. in Room B, following the lunch break.", "여행 사진 수업은 점심시간 이후 오후 1시에 B강의실에서 열릴 예정이에요."]
    }},
    {id:10,type:3,prep:3,time:30,info:SCHEDULE,repeat:2,question:"I cannot attend in the morning. Could you tell me what is scheduled after lunch?",translation:"오전에는 참석할 수 없는데 점심 이후 일정이 어떻게 되나요?",answers:{
      IL:["The class is at one. Questions and answers are at two thirty.", "수업은 1시에 있어요. 질의응답은 2시 30분이에요."],
      IM:["After lunch, there is a travel photography class at one p.m. and a questions and answers session at two thirty.", "점심 이후 오후 1시에 여행 사진 수업이 있고 2시 30분에는 질의응답이 있어요."],
      IH:["After the lunch break, the travel photography class begins at one p.m. in Room B. A questions and answers session follows at two thirty in the same room.", "점심시간 이후 B강의실에서 오후 1시에 여행 사진 수업이 시작되고, 같은 강의실에서 2시 30분에 질의응답이 이어져요."]
    }},
    {id:11,type:4,prep:45,time:60,question:"Do you think companies should allow employees to work from home? Give reasons and examples.",translation:"회사가 직원들의 재택근무를 허용해야 한다고 생각하나요? 이유와 예를 들어 답하세요.",answers:{
      IL:["Yes, I think so. Working from home is comfortable. It saves time.", "네, 그렇게 생각해요. 재택근무는 편안하고 시간을 절약해 줘요."],
      IM:["I think companies should allow people to work from home. First, employees can save commuting time. For example, they can use that time to exercise or spend time with family. I think this makes them happier.", "회사는 재택근무를 허용해야 한다고 생각해요. 먼저 출퇴근 시간을 아낄 수 있어요. 예를 들어 그 시간에 운동하거나 가족과 함께할 수 있어서 직원들이 더 행복해질 거예요."],
      IH:["In my opinion, offering the option to work from home can benefit both employees and companies. People save commuting time and can focus on tasks that require concentration. For example, someone who normally spends two hours traveling could use that time to finish important work or rest. As a result, employees may become more productive and satisfied.", "제 생각에 재택근무 선택권은 직원과 회사 모두에게 도움이 돼요. 통근 시간을 아끼고 집중이 필요한 업무에 몰두할 수 있어요. 예를 들어 이동에 두 시간을 쓰던 사람은 그 시간을 중요한 업무나 휴식에 활용할 수 있어요. 결과적으로 생산성과 만족도가 높아질 수 있어요."]
    }}
  ];
  const KEY = "jini-toeic-free-study-v1";
  function esc(x) { return String(x == null ? "" : x).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch])); }
  function getState() {
    try { const obj = JSON.parse(localStorage.getItem(KEY) || "{}"); return {done:Array.isArray(obj.done) ? obj.done.filter(x => Number.isInteger(x) && x >= 1 && x <= 11) : [], history:Array.isArray(obj.history) ? obj.history.slice(0,12) : []}; }
    catch (_) { return {done:[],history:[]}; }
  }
  let record = getState();
  function persist() { try { localStorage.setItem(KEY,JSON.stringify(record)); } catch (_) {} }
  function qOf(id) { return Q.find(q => q.id === id) || Q[0]; }
  function subject(q) {
    let body = '<div class="te-question"><div class="te-q-eyebrow">QUESTION ' + q.id + ' / 11 · ' + esc(TYPE_NAMES[q.type]) + '</div>';
    if(q.image) body += '<figure class="te-photo"><img loading="lazy" src="' + esc(q.image) + '" alt="' + esc(q.alt) + '"><figcaption>사진: <a href="' + esc(q.creditUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(q.credit) + '</a> · Wikimedia Commons</figcaption></figure>';
    if(q.info) body += '<div class="te-info" aria-label="제공된 일정 자료"><pre>' + esc(q.info) + '</pre></div>';
    body += '<p class="te-question-en" lang="en">' + esc(q.question) + '</p></div>';
    return body;
  }
  function examples(q,level) {
    if(!q.answers) return '<div class="te-model"><strong>문장 읽기 훈련</strong><p>이 유형은 주어진 영어 원문을 정확한 발음과 억양으로 읽는 연습이에요. IL·IM·IH 답변 수준 전환은 적용하지 않아요.</p><p>' + esc(q.translation) + '</p></div>';
    const a=q.answers[level] || q.answers.IL;
    return '<div class="te-level-options" role="group" aria-label="답변 수준">' +
      ["IL","IM","IH"].map(v => '<button type="button" data-te-level="' + v + '" class="' + (v===level?'is-active':'') + '" aria-pressed="' + (v===level) + '">' + v + (v==="IH"?" 참고":v==="IL"?" 기본":" 목표") + '</button>').join("") +
      '</div><div class="te-model"><span>' + level + (level==="IH"?" · 참고 표현":" · 연습용 답변") + '</span><p lang="en" class="te-model-en">' + esc(a[0]) + '</p><p class="te-model-ko">' + esc(a[1]) + '</p></div>';
  }
  let type=0, selection=1, level="IL";
  function renderTypes() {
    const matches=Q.filter(q=>q.type===type);
    if(!matches.some(q=>q.id===selection)) selection=matches[0].id;
    const q=qOf(selection);
    typesRoot.innerHTML='<div class="te-heading"><h2>유형별 문제 연습</h2><p>시험의 5개 유형을 골라 연습하고 IL·IM 목표 답변과 IH 참고 답변을 비교하세요.</p></div>' +
      '<div class="te-types" role="group" aria-label="유형 선택">' +
      TYPE_NAMES.map((name,i) => '<button type="button" data-te-type="' + i + '" class="' + (type===i?"is-active":"") + '" aria-pressed="' + (type===i) + '"><strong>유형 ' + (i+1) + '</strong><small>' + esc(name) + '</small></button>').join("") +
      '</div><div class="te-question-list" role="group" aria-label="문제 선택">' +
      matches.map(item=>'<button type="button" data-te-question="'+item.id+'" class="'+(selection===item.id?"is-active":"")+'">문제 '+item.id+(record.done.includes(item.id)?" ✓":"")+'</button>').join("")+'</div>' +
      '<div class="te-type-card"><div class="te-type-meta">준비 '+q.prep+'초 · 답변 '+q.time+'초</div>' + subject(q) +
      '<p class="te-translation">'+esc(q.translation)+'</p>' + examples(q,level) +
      '<div class="te-type-footer"><button type="button" class="te-primary" data-te-action="done">' + (record.done.includes(q.id)?"✓ 학습 완료 표시 취소":"✓ 이 문제 학습 완료") + '</button></div></div>' +
      '<p class="te-fineprint">예시문항은 JINI가 만든 학습용 문제이며 ETS 공식 문제가 아닙니다. 사진은 네트워크 연결이 필요해요. 점수·AI 채점은 제공하지 않아요.</p>';
  }
  typesRoot.addEventListener("click",function(event){
    const b=event.target.closest("button");if(!b)return;
    if(b.hasAttribute("data-te-type")){type=Number(b.dataset.teType);selection=Q.find(q=>q.type===type).id;level="IL";}
    else if(b.hasAttribute("data-te-question")){selection=Number(b.dataset.teQuestion);level="IL";}
    else if(b.hasAttribute("data-te-level")) level=b.dataset.teLevel;
    else if(b.dataset.teAction==="done"){record.done=record.done.includes(selection)?record.done.filter(id=>id!==selection):record.done.concat(selection);persist();}
    else return;
    renderTypes();
    renderResults();
  });

  let session=null, lastSession=null, tick=null, deadline=0, busy=false;
  function clearTick(){if(tick){clearInterval(tick);tick=null;}}
  function safeStopStream(stream){if(stream)stream.getTracks().forEach(track=>{try{track.stop();}catch(_){} });}
  function cleanUrls(s){if(s&&s.clips)s.clips.forEach(clip=>{if(clip&&clip.url)URL.revokeObjectURL(clip.url);});}
  function stopMedia(s){
    if(!s)return;
    if(s.recorder&&s.recorder.state!=="inactive"){try{s.recorder.stop();}catch(_){}}
    safeStopStream(s.stream);s.stream=null;
  }
  function abortMock() {
    clearTick();busy=false;
    if(session){session.cancelled=true;stopMedia(session);cleanUrls(session);session=null;}
    renderMock();
  }
  function countdown(seconds,next) {
    clearTick();
    deadline=Date.now()+seconds*1000;
    let advancing=false;
    function step(){
      if(!session||session.cancelled)return clearTick();
      const node=mockRoot.querySelector("#te-seconds");
      const remain=Math.max(0,Math.ceil((deadline-Date.now())/1000));
      if(node)node.textContent=String(Math.floor(remain/60)).padStart(2,"0")+":"+String(remain%60).padStart(2,"0");
      if(remain===0&&!advancing){advancing=true;clearTick();Promise.resolve().then(next);}
    }
    tick=setInterval(step,200);step();
  }
  function stopAnswerRecord(s) {
    return new Promise(resolve=>{
      const recorder=s&&s.recorder;
      if(!recorder||recorder.state==="inactive"){resolve();return;}
      let settled=false;
      function done(){if(!settled){settled=true;resolve();}}
      recorder.addEventListener("stop",done,{once:true});
      try{recorder.stop();}catch(_){done();}
      setTimeout(done,900);
    });
  }
  function startAnswerRecord(s,q) {
    if(!s.record||!s.stream||typeof MediaRecorder==="undefined")return;
    try{
      const rec=new MediaRecorder(s.stream);
      const chunks=[];
      s.recorder=rec;
      rec.addEventListener("dataavailable",event=>{if(event.data&&event.data.size)chunks.push(event.data);});
      rec.addEventListener("stop",()=>{
        if(s.cancelled||!chunks.length)return;
        const blob=new Blob(chunks,{type:rec.mimeType||"audio/webm"});
        const old=s.clips[q.id-1];if(old&&old.url)URL.revokeObjectURL(old.url);
        s.clips[q.id-1]={url:URL.createObjectURL(blob),extension:(rec.mimeType||"").includes("mp4")?"m4a":"webm"};
      },{once:true});
      rec.start();
    }catch(_){s.recordError=true;}
  }
  function runQuestion(){
    const s=session;if(!s||s.cancelled)return;
    const q=Q[s.position];
    const prep=()=>{
      s.phase="prepare";s.seconds=q.prep;renderMock();
      countdown(q.prep,()=>{
        if(session!==s||s.cancelled)return;
        s.phase="answer";s.seconds=q.time;renderMock();
        startAnswerRecord(s,q);
        countdown(q.time,async()=>{
          if(session!==s||s.cancelled)return;
          await stopAnswerRecord(s);
          if(session!==s||s.cancelled)return;
          s.position+=1;
          if(s.position<Q.length)runQuestion();else finishMock();
        });
      });
    };
    if(q.infoPrep&&!s.infoViewed){
      s.infoViewed=true;s.phase="read";s.seconds=q.infoPrep;renderMock();
      countdown(q.infoPrep,()=>{if(session===s&&!s.cancelled)prep();});
    }else prep();
  }
  async function startMock(useMic) {
    if(busy||session)return;
    busy=true;mockRoot.querySelector("#te-message").textContent=useMic?"마이크 권한을 확인하고 있어요…":"타이머 전용 모드를 준비하고 있어요…";
    let stream=null;
    if(useMic){
      if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia||typeof MediaRecorder==="undefined"){
        mockRoot.querySelector("#te-message").textContent="이 브라우저에서는 녹음할 수 없어요. 크롬의 HTTPS 페이지에서 열거나 타이머 전용 모드를 사용해 주세요.";busy=false;return;
      }
      try{stream=await navigator.mediaDevices.getUserMedia({audio:true});}
      catch(_){mockRoot.querySelector("#te-message").textContent="마이크 권한을 받지 못했어요. 사이트의 마이크 권한을 허용하거나 타이머 전용 모드를 선택해 주세요.";busy=false;return;}
    }
    if(mockSection.hidden){safeStopStream(stream);busy=false;return;}
    if(lastSession){cleanUrls(lastSession);lastSession=null;}
    session={position:0,phase:"",record:useMic,stream,recorder:null,clips:Array(Q.length).fill(null),startedAt:Date.now(),cancelled:false,infoViewed:false,recordError:false};
    busy=false;runQuestion();
  }
  function finishMock() {
    const s=session;if(!s)return;
    clearTick();stopMedia(s);session=null;
    lastSession=s;
    const recorded=s.clips.filter(Boolean).length;
    record.history.unshift({date:Date.now(),finished:Q.length,recorded:recorded});
    record.history=record.history.slice(0,12);persist();
    renderMock();renderResults();
    const nav=document.querySelector('.nav-item[data-page="toeic-results"]');
    if(nav)nav.click();
  }
  function renderMock() {
    if(!session){
      mockRoot.innerHTML='<div class="te-heading"><h2>실전 모의고사 · 11문항</h2><p>실제 토익스피킹의 문항 순서와 준비·답변 시간을 따르는 무료 연습이에요. 약 20분 시험의 안내·전환 시간까지 완전히 동일하지는 않아요.</p></div>' +
        '<div class="te-start-info"><strong>시작 전 확인</strong><ul><li>모의고사 중에는 한국어 해석과 IL·IM·IH 예시답변이 숨겨져요.</li><li>녹음 모드는 HTTPS와 마이크 권한이 필요하며 서버로 업로드하지 않아요.</li><li>마이크가 없다면 타이머 전용 모드로 연습할 수 있어요.</li><li>녹음 파일은 이 탭에서만 일시적으로 유지돼요. 시험 후 필요한 파일을 다운로드하세요.</li></ul>' +
        '<div class="te-start-actions"><button type="button" class="te-primary" data-te-mock="record">🎤 녹음하며 시험 시작</button><button type="button" class="te-secondary" data-te-mock="timer">⏱ 타이머만 시작</button></div>' +
        '<p id="te-message" class="te-status" role="status"></p></div>';
      return;
    }
    const s=session,q=Q[s.position],title=s.phase==="read"?"자료 읽기":s.phase==="prepare"?"답변 준비":"답변 중";
    mockRoot.innerHTML='<div class="te-exam-bar"><div><strong>실전 모의고사</strong><span>문제 '+q.id+' / 11 · '+esc(TYPE_NAMES[q.type])+'</span></div><button type="button" class="te-secondary" data-te-mock="stop">시험 중단</button></div>' +
      '<div class="te-exam-clock"><span>'+title+'</span><strong id="te-seconds">'+String(Math.floor(s.seconds/60)).padStart(2,"0")+":"+String(s.seconds%60).padStart(2,"0")+'</strong><small>'+(s.phase==="answer"?(s.record?"● 녹음 진행":"타이머 모드"):"시간이 끝나면 자동으로 다음 단계로 이동")+'</small></div>' +
      subject(q) +
      '<div class="te-exam-note"><span>'+(q.id===10?"문제 10번은 실제 시험에서 두 번 들려줘요. 이 연습 화면에서는 듣기 버튼으로 두 번 재생할 수 있어요.":"질문 음성은 브라우저의 읽어주기 기능으로 들을 수 있어요.")+'</span>' +
      '<button type="button" class="te-secondary" data-te-mock="speak">🔊 질문 듣기'+(q.repeat?" × 2":"")+'</button></div>' +
      '<div class="te-progress"><div style="width:'+Math.round((s.position/11)*100)+'%"></div></div>' +
      (s.recordError?'<p class="te-status">이 문항의 녹음이 시작되지 않았어요. 타이머는 계속 진행돼요.</p>':'') +
      '<p class="te-fineprint">실제 시험과 달리 문항 안내 음성 및 전환 시간이 간소화된 학습 모의고사입니다.</p>';
  }
  function speak(q){
    if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window))return;
    try{
      window.speechSynthesis.cancel();
      let spoken=0;const times=q.repeat||1;
      function next(){if(spoken>=times)return;spoken++;const u=new SpeechSynthesisUtterance(q.question);u.lang="en-US";u.rate=.95;u.onend=next;window.speechSynthesis.speak(u);}
      next();
    }catch(_){}
  }
  mockRoot.addEventListener("click",event=>{
    const button=event.target.closest("[data-te-mock]");if(!button)return;
    switch(button.dataset.teMock){
      case "record":startMock(true);break;
      case "timer":startMock(false);break;
      case "stop":
        if(window.confirm("모의고사를 중단할까요? 현재 시험의 녹음은 사라져요."))abortMock();
        break;
      case "speak":if(session)speak(Q[session.position]);break;
    }
  });
  new MutationObserver(()=>{
    if(mockSection.hidden && session){abortMock();}
    if(mockSection.hidden && "speechSynthesis" in window)try{window.speechSynthesis.cancel();}catch(_){}
  }).observe(mockSection,{attributes:true,attributeFilter:["hidden"]});
  window.addEventListener("pagehide",()=>{if(session)abortMock();});

  let resultId=3,resultLevel="IL";
  function renderResults(){
    const latest=record.history[0];
    const q=qOf(resultId);
    const last=lastSession;
    resultsRoot.innerHTML='<div class="te-heading"><h2>시험 결과·복습</h2><p>공식 점수 대신 시험 완료 여부와 내 녹음, 유형별 연습 상태를 확인할 수 있어요.</p></div>' +
      '<div class="te-result-summary"><div><strong>'+record.done.length+' / 11</strong><span>유형별 학습 완료</span></div><div><strong>'+(latest?latest.finished+" / 11":"—")+'</strong><span>최근 모의고사 완료 문항</span></div><div><strong>'+(latest?latest.recorded+"개":"—")+'</strong><span>최근 시험 녹음 수</span></div></div>' +
      (latest?'<p class="te-result-date">최근 완료: '+new Date(latest.date).toLocaleString("ko-KR")+'</p>':'<p class="te-result-date">아직 완료한 모의고사가 없어요.</p>') +
      '<div class="te-result-review"><h3>문제별 녹음·답변 복습</h3><div class="te-question-list">' + Q.map(item => '<button type="button" data-te-result="'+item.id+'" class="'+(resultId===item.id?"is-active":"")+'">Q'+item.id+'</button>').join("")+'</div>' +
      '<div class="te-type-card">'+subject(q)+'<p class="te-translation">'+esc(q.translation)+'</p>' +
      (last&&last.clips[q.id-1]?'<div class="te-audio-box"><strong>내 녹음</strong><audio controls preload="none" src="'+esc(last.clips[q.id-1].url)+'"></audio><a download="JINI-TOEIC-Q'+q.id+'.'+last.clips[q.id-1].extension+'" href="'+esc(last.clips[q.id-1].url)+'">녹음 파일 저장</a></div>':
        '<p class="te-audio-empty">이 문제의 녹음이 현재 탭에 없어요. 녹음 없이 시험을 봤거나 페이지를 새로고침한 경우예요.</p>') +
      examples(q,resultLevel)+'</div></div>' +
      '<p class="te-fineprint">녹음 데이터는 서버에 전송하거나 자동 영구 저장하지 않아요. 새로고침하면 녹음은 사라지지만 학습 완료 표시와 시험 완료 이력은 이 브라우저에 남아요. AI·공식 시험 채점은 제공하지 않아요.</p>';
  }
  resultsRoot.addEventListener("click",event=>{
    const b=event.target.closest("button");if(!b)return;
    if(b.hasAttribute("data-te-result"))resultId=Number(b.dataset.teResult);
    else if(b.hasAttribute("data-te-level"))resultLevel=b.dataset.teLevel;
    else return;
    renderResults();
  });
  renderTypes();renderMock();renderResults();
}());

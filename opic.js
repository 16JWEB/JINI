(function () {
  "use strict";
  const questions = window.JINI_OPIC_QUESTIONS;
  const root = document.getElementById("opic-basic-root");
  const list = document.getElementById("opic-list-root");
  const section = document.getElementById("opic-basic-section");
  if (!root || !list || !questions || !questions.length) return;
  const KEY = "jini-opic-basic-v1";
  const levels = { basic: "기초", intermediate: "중급", ih: "IH 목표" };
  const ids = new Set(questions.map(q => q.id));
  let storageFailed = false;
  function load() {
    const clean = { lastId: questions[0].id, level: "basic", completed: [], answers: {} };
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!saved || typeof saved !== "object") return clean;
      if (ids.has(saved.lastId)) clean.lastId = saved.lastId;
      if (Object.hasOwn(levels, saved.level)) clean.level = saved.level;
      if (Array.isArray(saved.completed)) clean.completed = [...new Set(saved.completed.filter(id => ids.has(id)))];
      questions.forEach(q => {
        if (saved.answers && Object.hasOwn(saved.answers, q.id) && typeof saved.answers[q.id] === "string")
          clean.answers[q.id] = saved.answers[q.id].slice(0, 10000);
      });
    } catch (_) { storageFailed = true; }
    return clean;
  }
  const state = load();
  let index = questions.findIndex(q => q.id === state.lastId);
  let selected = [], bank = [], solved = false, recognition = null, utterance = null;
  let session = 0, speechSession = 0;
  let activeStage = 1;
  const hub = document.getElementById("speaking-hub-root");
  const synth = window.speechSynthesis;
  const canSpeak = !!(synth && window.SpeechSynthesisUtterance);
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canRecognize = !!(Recognition && window.isSecureContext);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"}[c]));
  const current = () => questions[index];
  const button = (label, action, primary, extra = "") => '<button type="button" class="op-btn' + (primary ? ' op-primary' : '') + '" data-op="' + action + '" ' + extra + '>' + label + '</button>';
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageFailed = false; }
    catch (_) { storageFailed = true; }
    const status = document.getElementById("op-save-status");
    if (status) status.textContent = storageFailed ? "브라우저에 저장할 수 없어 이번 화면에서만 기록을 유지해요. 중요한 답변은 복사해 주세요." : "이 브라우저에 학습 기록을 저장했어요.";
  }
  function status(text) { const el = document.getElementById("op-audio-status"); if (el) el.textContent = text; }
  function stopSpeech() {
    speechSession += 1;
    if (utterance && synth) synth.cancel();
    utterance = null;
  }
  function stopRecognition() {
    if (!recognition) return;
    const old = recognition;
    recognition = null;
    old.onresult = old.onerror = old.onend = null;
    try { old.abort(); } catch (_) { /* Already stopped. */ }
    const mic = document.getElementById("op-mic");
    if (mic) { mic.textContent = "🎤 말해서 입력"; mic.setAttribute("aria-pressed", "false"); }
    const input = document.getElementById("op-answer");
    if (input) input.readOnly = false;
  }
  function stop() { session += 1; stopRecognition(); stopSpeech(); }
  function speak(text) {
    stopRecognition();
    stopSpeech();
    if (!canSpeak) { status("이 브라우저에서는 음성 재생을 지원하지 않아요. 화면의 영어 문장으로 연습해 주세요."); return; }
    const token = speechSession;
    const voice = synth.getVoices().find(v => /^en[-_]US$/i.test(v.lang)) || synth.getVoices().find(v => /^en\b/i.test(v.lang));
    utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.88;
    if (voice) utterance.voice = voice;
    utterance.onend = () => { if (token === speechSession) { utterance = null; status("재생을 마쳤어요. 소리 내어 따라 해 보세요."); } };
    utterance.onerror = event => { if (token === speechSession) { utterance = null; status(["canceled", "interrupted"].includes(event.error) ? "재생을 멈췄어요." : "음성을 재생하지 못했어요. 기기의 영어 음성 설정을 확인하고 다시 눌러 주세요."); } };
    try { status("영어 음성을 재생하고 있어요."); synth.speak(utterance); }
    catch (_) { utterance = null; status("음성을 시작하지 못했어요. 다시 눌러 주세요."); }
  }

  function renderHub() {
    if (!hub) return;
    const total = questions.length;
    const done = state.completed.length;
    const cards = [
      { icon: "01", title: "기초 답변 훈련", summary: "짧은 문장 → 확장 → 직접 말하기", button: "이어서 연습하기", action: "basic" },
      { icon: "02", title: "주제별 답변 연습", summary: "일상·직장·여행 등 20개 질문", button: "질문 목록 보기", action: "topics" },
      { icon: "03", title: "질문 듣고 답하기", summary: "질문을 듣고 즉석에서 말하기", coming: true },
      { icon: "04", title: "롤플레이 연습", summary: "상황별 요청과 문제 해결", coming: true },
      { icon: "05", title: "실전 모의시험", summary: "OPIc · 토익스피킹 유형별 연습", coming: true },
      { icon: "06", title: "나의 학습 기록", summary: "완료한 질문과 작성한 답변 확인", button: "학습 기록 확인", action: "topics" }
    ];
    hub.innerHTML = '<div class="op-hub-hero"><div><span class="eyebrow section-eyebrow">START SPEAKING, ONE STEP AT A TIME</span><h2>외우기보다, 직접 영어로 말하는 연습</h2><p>질문을 듣고 짧게 답하는 것부터 시작해요. 익숙해지면 이유와 경험을 덧붙여 내 답변을 만들어요.</p><span class="op-hub-availability">현재 이용 가능: OPIc 기초 질문 20개 · 토익스피킹 전용 문제는 준비 중</span></div><div class="op-hub-meter"><strong>' + done + '<small> / ' + total + '</small></strong><span>학습 완료</span><progress max="' + total + '" value="' + done + '"></progress></div></div>' +
      '<div class="op-hub-grid">' + cards.map(card =>
        '<article class="op-hub-card' + (card.coming ? ' op-hub-coming' : '') + '"><span class="op-hub-number">' + card.icon + '</span><h3>' + card.title + '</h3><p>' + card.summary + '</p>' +
        (card.coming ? '<span class="op-hub-upcoming">준비 중</span>' : '<button type="button" class="op-btn' + (card.action === "basic" ? ' op-primary' : '') + '" data-hub="' + card.action + '">' + card.button + ' →</button>') + '</article>'
      ).join("") + '</div><p class="op-note">진도는 현재 브라우저에 저장해요. 음성 인식은 기기 및 브라우저 지원 여부에 따라 사용 가능해요.</p>';
  }
  function setStage(next) {
    if (activeStage !== next && recognition) stopRecognition();
    if (activeStage !== next) stopSpeech();
    activeStage = Math.max(1, Math.min(3, next));
    root.querySelectorAll("[data-training-step]").forEach(card => {
      card.hidden = Number(card.dataset.trainingStep) !== activeStage;
    });
    root.querySelectorAll("[data-op-stage]").forEach(tab => {
      const selected = Number(tab.dataset.opStage) === activeStage;
      tab.classList.toggle("is-selected", selected);
      tab.setAttribute("aria-pressed", String(selected));
    });
    const labels = {
      1: "짧은 문장을 직접 만들어 보세요. 정답을 확인한 다음 소리 내어 따라 읽으면 좋아요.",
      2: "기본 답변에 언제·어디서·왜 같은 세부 내용을 추가해 보세요.",
      3: "이제 답을 보지 않고 본인의 경험을 이야기해 보세요. 말한 문장은 수정할 수 있어요."
    };
    const guide = document.getElementById("op-stage-guide");
    if (guide) guide.textContent = labels[activeStage];
    const prev = root.querySelector('[data-op="stage-prev"]');
    const nextButton = root.querySelector('[data-op="stage-next"]');
    if (prev) prev.disabled = activeStage === 1;
    if (nextButton) {
      nextButton.hidden = activeStage === 3;
      nextButton.textContent = activeStage === 1 ? "2단계 · 답변 확장하기 →" : "3단계 · 직접 말하기 →";
    }
  }
  function decorateQuestion() {
    const q = current();
    const cards = [...root.querySelectorAll(".op-card")];
    cards.forEach((card, pos) => { card.dataset.trainingStep = pos < 3 ? "1" : "3"; });
    const nav = document.createElement("div");
    nav.className = "op-stepper";
    nav.innerHTML = '<div class="op-stepper-head"><strong>답변 만들기 3단계</strong><span>단계를 눌러 자유롭게 이동</span></div><div class="op-step-tabs" role="group" aria-label="답변 훈련 단계">' +
      '<button type="button" data-op="stage-1" data-op-stage="1" aria-pressed="false"><span>01</span> 짧은 답변</button>' +
      '<button type="button" data-op="stage-2" data-op-stage="2" aria-pressed="false"><span>02</span> 답변 확장</button>' +
      '<button type="button" data-op="stage-3" data-op-stage="3" aria-pressed="false"><span>03</span> 직접 말하기</button></div>' +
      '<p class="op-step-guide" id="op-stage-guide" role="status"></p>';
    root.querySelector("progress").insertAdjacentElement("afterend", nav);
    const expanding = document.createElement("article");
    expanding.className = "op-card op-stage-card";
    expanding.dataset.trainingStep = "2";
    expanding.innerHTML = '<span class="op-stage-tag">STEP 02 · 문장 확장</span><h2>한 문장에 이유와 상황을 덧붙여 보세요</h2>' +
      '<p class="op-note">아래 문장은 외울 정답이 아니라 표현 방식의 예시예요. 내 경험에 맞는 단어로 바꿔 연습해 보세요.</p>' +
      '<div class="op-answer-example"><div class="op-card-heading"><strong>기본 답변</strong>' + button("🔊 듣기", "stage-basic-audio") + '</div><p lang="en">' + escape(q.answers.basic) + '</p></div>' +
      '<div class="op-answer-example"><div class="op-card-heading"><strong>확장 답변</strong>' + button("🔊 듣기", "stage-intermediate-audio") + '</div><p lang="en">' + escape(q.answers.intermediate) + '</p></div>' +
      '<div class="op-stage-hint"><strong>이렇게 확장해요</strong><p>' + escape(q.hint) + '</p><p>예: <strong>because</strong> (이유) · <strong>for example</strong> (구체적인 예) · <strong>usually</strong> (평소 습관)</p></div>';
    cards[3].before(expanding);
    const answer = document.getElementById("op-answer");
    answer.insertAdjacentHTML("afterend", '<div class="op-checkbar">' + button("✦ 내 답변 기본 점검", "review") + '<p class="op-note">문장 길이와 연결 표현을 확인하는 간단한 자동 점검이에요. AI 채점이나 발음 평가는 아니에요.</p></div><div id="op-draft-feedback" class="op-draft-feedback" role="status" hidden></div>');
    const stepNav = document.createElement("div");
    stepNav.className = "op-stage-navigation";
    stepNav.innerHTML = button("← 이전 단계", "stage-prev") + button("2단계 · 답변 확장하기 →", "stage-next", true);
    root.querySelector(".op-bottom").before(stepNav);
    setStage(activeStage);
  }
  function reviewDraft() {
    const feedback = document.getElementById("op-draft-feedback");
    const answer = document.getElementById("op-answer").value.trim();
    feedback.hidden = false;
    if (!answer) {
      feedback.textContent = "먼저 영어로 한두 문장을 쓰거나 마이크로 말해 보세요.";
      return;
    }
    const words = answer.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [];
    const tips = [];
    if (words.length < 12) tips.push("한 문장 더 덧붙여 답변을 조금 늘려 보세요.");
    if (!/\b(because|so|since|as a result)\b/i.test(answer)) tips.push("because나 so로 이유를 연결해 보세요.");
    if (!/\b(for example|for instance|last|once|one time|yesterday|ago)\b/i.test(answer)) tips.push("자신의 경험이나 구체적인 예시 한 가지를 추가하면 좋아요.");
    feedback.textContent = "기본 점검 · " + words.length + "단어: " + (tips.length ? tips.join(" ") : "답변에 이유와 예시가 들어 있어요. 이제 소리 내어 자연스럽게 말해 보세요.") + " (문법·발음·시험 점수는 판정하지 않아요.)";
  }
  if (hub) hub.addEventListener("click", event => {
    const target = event.target.closest("[data-hub]");
    if (!target) return;
    const dest = target.dataset.hub === "basic" ? "opic-basic" : "opic";
    const nav = document.querySelector('.nav-item[data-page="' + dest + '"]');
    if (nav) nav.click();
  });
  function renderList() {
    list.innerHTML = '<div class="op-card"><h2>기초 답변 훈련</h2><p>20개의 일상 질문으로 듣기부터 나만의 답변까지 차근차근 연습해요.</p><p><strong>' + state.completed.length + ' / 20문제 학습 완료</strong> · 마지막 학습: ' + (index + 1) + '번 ' + escape(current().topic) + '</p>' + button("마지막 문제부터 이어하기 →", "resume", true) + '<p class="op-note">아래에서 원하는 문제를 골라 시작할 수도 있어요. 완료 표시는 직접 학습한 기록이며 점수가 아니에요.</p></div><div class="op-topic-grid">' + questions.map((q, i) => '<button type="button" class="op-topic" data-index="' + i + '"><span>' + String(i + 1).padStart(2, "0") + ' · ' + escape(q.topic) + '</span><strong lang="en">' + escape(q.en) + '</strong><small>' + (state.completed.includes(q.id) ? "✓ 학습 완료" : state.answers[q.id] ? "작성한 답변 있음" : "연습 시작 →") + '</small></button>').join("") + '</div>';
  }
  function resetSentence() {
    selected = []; solved = false;
    bank = current().chunks.map((_, i) => i);
    for (let i = bank.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [bank[i], bank[j]] = [bank[j], bank[i]]; }
    if (bank.every((v, i) => v === i)) bank.reverse();
  }
  function renderSentence() {
    const q = current();
    document.getElementById("op-selected").innerHTML = selected.length ? selected.map((n, pos) => '<button type="button" class="op-chunk op-picked" data-remove="' + pos + '" lang="en" ' + (solved ? "disabled" : "") + ' aria-label="' + escape(q.chunks[n] + " 조각 빼기") + '">' + escape(q.chunks[n]) + ' <span aria-hidden="true">×</span></button>').join("") : '<span class="op-note">아래 조각을 순서대로 눌러 문장을 만들어 보세요.</span>';
    document.getElementById("op-bank").innerHTML = bank.map(n => '<button type="button" class="op-chunk" data-chunk="' + n + '" lang="en" ' + (selected.includes(n) || solved ? "disabled" : "") + '>' + escape(q.chunks[n]) + '</button>').join("");
    document.getElementById("op-check").disabled = solved || selected.length !== q.chunks.length;
    document.getElementById("op-sentence-listen").hidden = !solved;
  }
  function renderQuestion() {
    const q = current();
    const done = state.completed.includes(q.id);
    root.innerHTML = '<div class="op-top"><div><span class="eyebrow section-eyebrow">SPEAKING · BASIC ANSWER PRACTICE</span><h1 class="page-title">기초 답변 훈련</h1><p>현재 주제 <strong>' + escape(q.topic) + '</strong></p></div><label class="op-level">모범답변 수준<select id="op-level">' + Object.entries(levels).map(([v, label]) => '<option value="' + v + '" ' + (v === state.level ? "selected" : "") + '>' + label + '</option>').join("") + '</select></label></div>' +
      '<div class="op-progress"><span>문제 ' + (index + 1) + ' / 20</span><span>학습 완료 ' + state.completed.length + ' / 20 (' + Math.round(state.completed.length / questions.length * 100) + '%)</span></div><progress max="20" value="' + state.completed.length + '" aria-label="학습 완료 진행률"></progress>' +
      '<article class="op-card"><h2 id="op-question-heading" tabindex="-1">1. 질문 듣고 이해하기</h2><p class="op-question" lang="en">' + escape(q.en) + '</p><p>' + escape(q.ko) + '</p><div class="op-actions">' + button("🔊 질문 음성 재생", "question", true) + button("음성 멈추기", "stop-audio") + '</div><p id="op-audio-status" class="op-note" role="status">' + (canSpeak ? "미국 영어 음성을 우선 사용해요. 사용 가능한 음성은 기기 설정에 따라 달라요." : "이 브라우저는 음성 재생을 지원하지 않아요. 영어 문장으로 연습해 주세요.") + '</p></article>' +
      '<article class="op-card"><div class="op-card-heading"><h2>2. 한국어 힌트로 답변 구상하기</h2>' + button("힌트 보기", "hint", false, 'aria-expanded="false" aria-controls="op-hint"') + '</div><div id="op-hint" hidden><p>' + escape(q.hint) + '</p><h3>핵심 단어와 표현</h3><ul>' + q.expressions.map(e => '<li>' + escape(e) + '</li>').join("") + '</ul></div></article>' +
      '<article class="op-card"><h2>3. 영어 조각으로 문장 완성하기</h2><p>' + escape(q.sentenceKo) + '</p><p class="op-note">제시된 조각을 모두 사용해 이 뜻의 문장을 만들어 보세요. 선택한 조각을 다시 누르면 뺄 수 있어요.</p><div id="op-selected" class="op-selected" aria-label="내가 만든 문장"></div><div id="op-bank" class="op-bank" aria-label="선택할 영어 조각"></div><div class="op-actions">' + button("정답 확인", "check", true, 'id="op-check"') + button("다시 만들기", "reset") + button("🔊 완성 문장 듣기", "sentence", false, 'id="op-sentence-listen" hidden') + '</div><p id="op-feedback" role="status"></p></article>' +
      '<article class="op-card"><h2>4. 나만의 영어 답변 연습하기</h2><label for="op-answer">위 힌트를 참고해 내 이야기로 바꿔 써 보세요.</label><textarea id="op-answer" lang="en" rows="6" maxlength="10000" placeholder="Start with one or two sentences…" spellcheck="true"></textarea><div class="op-actions">' + (canRecognize ? button("🎤 말해서 입력", "mic", false, 'id="op-mic" aria-pressed="false"') : "") + '</div><p class="op-note" id="op-mic-status" role="status">' + (canRecognize ? "마이크를 허용하면 영어로 말한 내용을 답변 끝에 추가해요. 인식된 문장은 직접 고칠 수 있어요. 브라우저에 따라 음성 처리를 위해 인터넷 연결이 필요할 수 있어요." : "이 환경에서는 음성 인식을 사용할 수 없어요. 위 입력란에 직접 작성하며 연습해 주세요.") + '</p><p id="op-save-status" class="op-note" role="status">' + (storageFailed ? "브라우저 저장을 사용할 수 없어요. 중요한 답변은 복사해 주세요." : "답변과 학습 기록은 이 브라우저에 자동 저장돼요.") + '</p></article>' +
      '<article class="op-card"><div class="op-card-heading"><h2>5. 모범 답변과 비교하기</h2>' + button("모범 답변 보기", "model", false, 'aria-expanded="false" aria-controls="op-model"') + '</div><div id="op-model" hidden><p class="op-note">' + levels[state.level] + ' 참고 답변 · 실제 등급이나 점수를 보장하는 답변이 아니에요. 내 경험에 맞게 바꿔 말해 보세요.</p><p class="op-model" lang="en">' + escape(q.answers[state.level]) + '</p>' + button("🔊 모범 답변 음성 듣기", "model-audio", true) + '</div></article>' +
      '<div class="op-card op-finish">' + button(done ? "✓ 학습 완료 · 누르면 표시 취소" : "이 문제 학습 완료 표시", "complete", !done, 'aria-pressed="' + done + '"') + '<p class="op-note" id="op-complete-status" role="status">직접 연습하고 복습했다면 완료를 표시해 주세요. 다음 문제로 이동해도 작성한 답변은 저장돼요.</p>' + (state.completed.length === questions.length ? '<p>🎉 20문제를 모두 학습했어요! 목록에서 원하는 문제를 다시 연습할 수 있어요.</p>' : "") + '</div>' +
      '<nav class="op-bottom" aria-label="오픽 문제 이동">' + button("← 주제별 질문 목록", "list") + '<div class="op-actions">' + button("이전 문제", "previous", false, index === 0 ? "disabled" : "") + button("다음 문제 →", "next", true, index === questions.length - 1 ? "disabled" : "") + '</div></nav>';
    document.getElementById("op-answer").value = state.answers[q.id] || "";
    renderSentence();
    decorateQuestion();
  }
  function go(next, focus = true) {
    if (!Number.isInteger(next) || next < 0 || next >= questions.length) return;
    stop(); index = next; activeStage = 1; state.lastId = current().id; save(); resetSentence(); renderQuestion(); renderList(); renderHub();
    if (focus && !section.hidden) { document.getElementById("op-question-heading").focus({ preventScroll: true }); section.scrollIntoView({ block: "start" }); }
  }
  function toggle(target, control, label) {
    const el = document.getElementById(target);
    el.hidden = !el.hidden;
    control.textContent = label + (el.hidden ? " 보기" : " 숨기기");
    control.setAttribute("aria-expanded", String(!el.hidden));
  }
  function recognize() {
    if (recognition) {
      try { recognition.stop(); } catch (_) { stopRecognition(); }
      return;
    }
    if (!canRecognize) return;
    stopSpeech();
    const token = session;
    const qid = current().id;
    const input = document.getElementById("op-answer");
    const micStatus = document.getElementById("op-mic-status");
    try {
      const engine = new Recognition();
      recognition = engine; engine.lang = "en-US"; engine.continuous = false; engine.interimResults = false;
      const mic = document.getElementById("op-mic");
      mic.textContent = "■ 말하기 종료"; mic.setAttribute("aria-pressed", "true");
      input.readOnly = true;
      micStatus.textContent = "마이크 연결 중이에요. 권한을 허용한 뒤 영어로 말해 주세요.";
      engine.onstart = () => { if (token === session && recognition === engine) micStatus.textContent = "듣고 있어요. 영어로 답변해 주세요."; };
      engine.onresult = event => {
        if (token !== session || recognition !== engine || section.hidden) return;
        const text = Array.from(event.results).filter(r => r.isFinal).map(r => r[0].transcript).join(" ");
        input.value = (input.value + (input.value.trim() ? " " : "") + text).slice(0, 10000);
        state.answers[qid] = input.value; save();
        micStatus.textContent = text ? "말한 내용을 답변에 추가했어요. 잘못 인식된 부분은 직접 고쳐 주세요." : "인식된 문장이 없어요. 다시 말하거나 직접 입력해 주세요.";
      };
      engine.onerror = event => {
        if (token !== session || recognition !== engine) return;
        const errors = { "not-allowed": "마이크 권한이 허용되지 않았어요.", "service-not-allowed": "이 브라우저에서 음성 인식을 사용할 수 없어요.", "audio-capture": "사용 가능한 마이크가 없어요.", "no-speech": "목소리를 인식하지 못했어요.", "network": "음성 인식 서비스에 연결하지 못했어요.", "language-not-supported": "영어 음성 인식을 지원하지 않아요." };
        micStatus.textContent = (errors[event.error] || "음성 인식을 마쳤어요.") + " 다시 시도하거나 직접 입력해 주세요.";
      };
      engine.onend = () => {
        if (token !== session || recognition !== engine) return;
        recognition = null; input.readOnly = false;
        mic.textContent = "🎤 말해서 입력"; mic.setAttribute("aria-pressed", "false");
        if (micStatus.textContent.startsWith("듣고") || micStatus.textContent.startsWith("마이크 연결")) micStatus.textContent = "말하기를 마쳤어요. 다시 시도하거나 직접 입력해 주세요.";
      };
      engine.start();
    } catch (_) { stopRecognition(); micStatus.textContent = "음성 인식을 시작하지 못했어요. 직접 입력해 주세요."; }
  }
  root.addEventListener("input", event => {
    if (event.target.id !== "op-answer") return;
    state.answers[current().id] = event.target.value; save();
  });
  root.addEventListener("change", event => {
    if (event.target.id !== "op-level" || !Object.hasOwn(levels, event.target.value)) return;
    stop(); state.level = event.target.value; save();
    // Keep the draft and sentence work when switching the model-answer level.
    const model = document.getElementById("op-model");
    model.querySelector(".op-model").textContent = current().answers[state.level];
    model.querySelector(".op-note").textContent = levels[state.level] + " 참고 답변 · 실제 등급이나 점수를 보장하는 답변이 아니에요. 내 경험에 맞게 바꿔 말해 보세요.";
    status("학습 난이도를 " + levels[state.level] + "로 바꿨어요.");
  });
  root.addEventListener("click", event => {
    const control = event.target.closest("button");
    if (!control || control.disabled) return;
    const q = current();
    if (control.hasAttribute("data-chunk")) {
      const n = Number(control.dataset.chunk);
      if (!solved && !selected.includes(n)) selected.push(n);
      document.getElementById("op-feedback").textContent = ""; renderSentence(); return;
    }
    if (control.hasAttribute("data-remove")) {
      if (!solved) selected.splice(Number(control.dataset.remove), 1);
      document.getElementById("op-feedback").textContent = ""; renderSentence(); return;
    }
    switch (control.dataset.op) {
      case "stage-1": setStage(1); break;
      case "stage-2": setStage(2); break;
      case "stage-3": setStage(3); break;
      case "stage-prev": setStage(activeStage - 1); break;
      case "stage-next": setStage(activeStage + 1); break;
      case "stage-basic-audio": speak(q.answers.basic); break;
      case "stage-intermediate-audio": speak(q.answers.intermediate); break;
      case "review": reviewDraft(); break;
      case "question": speak(q.en); break;
      case "stop-audio": stopSpeech(); status("재생을 멈췄어요."); break;
      case "hint": toggle("op-hint", control, "힌트"); break;
      case "model": toggle("op-model", control, "모범 답변"); break;
      case "model-audio": speak(q.answers[state.level]); break;
      case "sentence": if (solved) speak(q.chunks.join(" ")); break;
      case "check": {
        const answer = selected.map(n => q.chunks[n]).join(" ");
        solved = answer === q.chunks.join(" ");
        const feedback = document.getElementById("op-feedback");
        feedback.className = solved ? "op-correct" : "op-retry";
        feedback.textContent = solved ? "✓ 정답이에요! 완성한 문장을 듣고 따라 말해 보세요." : "조각의 순서를 다시 살펴보세요. 선택한 조각을 빼거나 ‘다시 만들기’를 눌러 재도전할 수 있어요.";
        renderSentence(); break;
      }
      case "reset": stopSpeech(); resetSentence(); document.getElementById("op-feedback").textContent = ""; renderSentence(); break;
      case "mic": recognize(); break;
      case "complete": {
        const done = state.completed.includes(q.id);
        state.completed = done ? state.completed.filter(id => id !== q.id) : state.completed.concat(q.id);
        save(); renderList(); renderHub();
        control.textContent = done ? "이 문제 학습 완료 표시" : "✓ 학습 완료 · 누르면 표시 취소";
        control.setAttribute("aria-pressed", String(!done));
        root.querySelector("progress").value = state.completed.length;
        root.querySelector(".op-progress span:last-child").textContent = "학습 완료 " + state.completed.length + " / 20 (" + Math.round(state.completed.length / questions.length * 100) + "%)";
        document.getElementById("op-complete-status").textContent = state.completed.length === questions.length ? "🎉 20문제를 모두 학습했어요! 목록에서 원하는 문제를 복습해 보세요." : done ? "완료 표시를 취소했어요." : "학습 완료를 기록했어요. 다음 문제로 이어가 보세요.";
        break;
      }
      case "previous": go(index - 1); break;
      case "next": go(index + 1); break;
      case "list": stop(); renderList(); document.querySelector('.nav-item[data-page="opic"]').click(); break;
    }
  });
  list.addEventListener("click", event => {
    const control = event.target.closest("button");
    if (!control) return;
    if (control.hasAttribute("data-index")) go(Number(control.dataset.index), false);
    else if (control.dataset.op === "resume") go(index, false);
    else return;
    document.querySelector('.nav-item[data-page="opic-basic"]').click();
    document.getElementById("op-question-heading").focus({ preventScroll: true });
    section.scrollIntoView({ block: "start" });
  });
  new MutationObserver(() => { if (section.hidden) { stop(); status("음성을 멈췄어요. 버튼을 눌러 다시 들을 수 있어요."); } }).observe(section, { attributes: true, attributeFilter: ["hidden"] });
  new MutationObserver(() => { if (!document.getElementById("opic-list-section").hidden) renderList(); }).observe(document.getElementById("opic-list-section"), { attributes: true, attributeFilter: ["hidden"] });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
  window.addEventListener("pagehide", stop);
  window.JINI_OPIC_BACK = function () {
    if (section.hidden) return false;
    document.querySelector('.nav-item[data-page="opic"]').click(); return true;
  };
  resetSentence(); renderQuestion(); renderList(); renderHub();
}());

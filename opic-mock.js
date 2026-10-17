/* Original JINI OPIc-style mock test. For learning, not official ACTFL content. */
(function () {
  "use strict";
  const root = document.getElementById("opic-mock-root");
  const section = document.getElementById("opic-mock-section");
  const questions = window.JINI_OPIC_MOCK_QUESTIONS;
  if (!root || !section || !Array.isArray(questions) || questions.length !== 15) return;

  const KEY = "jini-opic-mock-v1";
  const BASIC_KEY = "jini-opic-basic-v1";
  const EXAM_MS = 40 * 60 * 1000;
  const escape = value => String(value == null ? "" : value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const canSpeak = !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && window.isSecureContext);
  const synth = window.speechSynthesis;
  let speechToken = 0;
  let stream = null;
  let recorder = null;
  let chunks = [];
  let recordingIndex = -1;
  let recordStarted = 0;
  let busy = false;
  let finishing = false;
  const recordings = new Map();
  let displayLevel = null;

  function goalFromBasic() {
    try {
      const saved = JSON.parse(localStorage.getItem(BASIC_KEY) || "null");
      return saved && saved.level === "ih" ? "ih" : "il";
    } catch (_) { return "il"; }
  }
  function emptyState() {
    return { phase: "setup", level: goalFromBasic(), index: 0, startAt: null, endAt: null,
      difficulty: null, finishAt: null, listens: Array(15).fill(0), answered: Array(15).fill(false),
      revealed: Array(15).fill(false), notes: Array(15).fill(""), finishReason: "" };
  }
  function load() {
    const blank = emptyState();
    try {
      const old = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!old || !["setup", "active", "finished"].includes(old.phase)) return blank;
      blank.phase = old.phase;
      blank.level = old.level === "ih" ? "ih" : "il";
      blank.index = Math.max(0, Math.min(14, Number.isInteger(old.index) ? old.index : 0));
      blank.startAt = typeof old.startAt === "number" ? old.startAt : null;
      blank.endAt = typeof old.endAt === "number" ? old.endAt : null;
      blank.finishAt = typeof old.finishAt === "number" ? old.finishAt : null;
      blank.difficulty = ["easy", "same", "hard"].includes(old.difficulty) ? old.difficulty : null;
      ["listens", "answered", "revealed", "notes"].forEach(name => {
        if (!Array.isArray(old[name])) return;
        blank[name] = blank[name].map((v, i) => {
          const item = old[name][i];
          if (name === "listens") return Math.max(0, Math.min(2, Number.isInteger(item) ? item : 0));
          if (name === "notes") return typeof item === "string" ? item.slice(0, 2000) : "";
          return item === true;
        });
      });
      blank.finishReason = typeof old.finishReason === "string" ? old.finishReason : "";
      if (blank.phase === "active" && (!blank.startAt || !blank.endAt)) return emptyState();
    } catch (_) { return blank; }
    return blank;
  }
  let state = load();
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (_) { setStatus("브라우저 저장을 사용할 수 없어 이 기기에서 진도를 복구하지 못할 수 있어요."); }
  }
  function setStatus(message) {
    const el = root.querySelector("#om-status");
    if (el) el.textContent = message;
  }
  function stopSpeech() {
    speechToken += 1;
    if (synth) synth.cancel();
  }
  function speak(text, limitQuestion) {
    if (!canSpeak) { setStatus("이 브라우저는 음성 재생을 지원하지 않아요. 화면의 영어 질문을 읽고 연습해 주세요."); return; }
    if (limitQuestion) {
      if (state.listens[state.index] >= 2) { setStatus("질문 듣기는 2회까지 연습할 수 있어요."); return; }
      state.listens[state.index] += 1;
      save();
      const el = root.querySelector("#om-replays");
      if (el) el.textContent = "질문 듣기 " + state.listens[state.index] + " / 2회";
      const button = root.querySelector('[data-mock="listen"]');
      if (button) {
        button.disabled = state.listens[state.index] >= 2;
        button.textContent = state.listens[state.index] >= 2 ? "질문 듣기 완료" : "🔊 질문 다시 듣기";
      }
    }
    stopSpeech();
    const token = speechToken;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.88;
    const voices = synth.getVoices();
    const voice = voices.find(v => /^en-US$/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang));
    if (voice) utterance.voice = voice;
    utterance.onend = () => { if (speechToken === token) setStatus("영어 음성 재생을 마쳤어요."); };
    utterance.onerror = event => { if (speechToken === token) setStatus("음성 재생에 실패했어요. 기기의 영어 음성 설정을 확인해 주세요."); };
    try { synth.speak(utterance); setStatus("영어 음성을 재생하고 있어요."); }
    catch (_) { setStatus("음성을 시작하지 못했어요."); }
  }
  function stopMediaTracks() {
    if (stream) stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  async function stopRecording() {
    if (!recorder || recorder.state === "inactive") { stopMediaTracks(); return; }
    const active = recorder;
    await new Promise(resolve => {
      active.addEventListener("stop", resolve, { once: true });
      try { active.stop(); } catch (_) { resolve(); }
    });
  }
  async function startRecording() {
    if (!canRecord) { setStatus("현재 브라우저에서 녹음 기능을 지원하지 않아요. Chrome 또는 다른 지원 브라우저에서 HTTPS로 열어 주세요."); return; }
    if (recorder && recorder.state === "recording") {
      await stopRecording();
      renderQuestion();
      return;
    }
    if (busy) return;
    busy = true;
    stopSpeech();
    try {
      const requestedIndex = state.index;
      const acquired = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (section.hidden || state.phase !== "active" || state.index !== requestedIndex) {
        acquired.getTracks().forEach(t => t.stop()); return;
      }
      stream = acquired;
      chunks = [];
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find(t => MediaRecorder.isTypeSupported(t));
      recorder = mime ? new MediaRecorder(acquired, { mimeType: mime }) : new MediaRecorder(acquired);
      recordingIndex = requestedIndex;
      recorder.ondataavailable = event => { if (event.data && event.data.size > 0) chunks.push(event.data); };
      recorder.onstop = () => {
        const i = recordingIndex;
        const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
        if (blob.size) {
          const prior = recordings.get(i);
          if (prior) URL.revokeObjectURL(prior);
          recordings.set(i, URL.createObjectURL(blob));
        }
        stopMediaTracks();
        recorder = null;
        recordingIndex = -1;
        if (!section.hidden && state.phase === "active" && state.index === i) renderQuestion();
      };
      recorder.onerror = () => setStatus("녹음 중 오류가 발생했어요. 다시 시도해 주세요.");
      recorder.start(200);
      recordStarted = Date.now();
      const recordButton = root.querySelector('[data-mock="record"]');
      if (recordButton) { recordButton.textContent = "■ 녹음 종료"; recordButton.classList.add("is-recording"); }
      setStatus("녹음 중이에요. 답변을 마친 후 녹음 종료를 눌러 주세요. 음성은 서버에 전송되지 않아요.");
    } catch (error) {
      stopMediaTracks();
      const denied = error && (error.name === "NotAllowedError" || error.name === "PermissionDeniedError");
      setStatus(denied ? "마이크 권한이 거부됐어요. 브라우저의 사이트 권한에서 마이크를 허용해 주세요." : "녹음을 시작하지 못했어요. 마이크와 브라우저 설정을 확인해 주세요.");
    } finally { busy = false; }
  }
  function timeLeft() { return state.endAt ? Math.max(0, state.endAt - Date.now()) : EXAM_MS; }
  function timeLabel() {
    const seconds = Math.ceil(timeLeft() / 1000);
    return String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0");
  }
  function promptFor(question) {
    if (state.index < 7 || state.difficulty === "same") return question.prompt;
    if (state.difficulty === "easy") {
      const easier = {
        travel: "Tell me about a trip you liked. Where did you go and what did you do?",
        "travel-change": "Did you travel differently when you were younger? Tell me about it.",
        "travel-problem": "Tell me about a problem on a trip. What did you do?",
        "roleplay-info": "Call a museum and ask about opening hours, ticket prices, and reservations.",
        "roleplay-change": "Call the museum and ask to change your Saturday booking to Sunday.",
        "roleplay-solution": "Your museum reservation is missing. Explain the problem and ask for help.",
        comparison: "Do you like shopping online or in stores? Tell me why.",
        unexpected: "Do you like spending time alone or with friends? Why?"
      };
      return easier[question.id] || question.prompt;
    }
    return question.prompt + " Please include specific details and explain your reasons.";
  }
  function header() {
    return '<div class="om-header"><div><span class="eyebrow section-eyebrow">OPIc STYLE · UNOFFICIAL PRACTICE</span><h2>오픽 실전 연습</h2><p>15문제 · 40분 · 목표 ' + state.level.toUpperCase() + '</p></div><div class="om-clock" role="timer" aria-live="off"><span>남은 시간</span><strong id="om-timer">' + timeLabel() + '</strong></div></div>' +
      '<div class="om-progress-label"><span>문제 ' + (state.index + 1) + ' / 15</span><span>연습 완료 ' + state.answered.filter(Boolean).length + ' / 15</span></div><progress max="15" value="' + (state.index + 1) + '" aria-label="현재 문제"></progress>';
  }
  function renderSetup() {
    root.innerHTML = '<div class="om-intro"><span class="eyebrow section-eyebrow">JINI MOCK INTERVIEW</span><h2>실제 오픽 흐름에 맞춘 15문제 연습</h2><p>먼저 질문을 듣고 답해 보세요. 답변을 마친 뒤 IL·IH 수준의 예시 답변과 한국어 해석을 확인할 수 있어요.</p><div class="om-features"><span>15문제</span><span>40분 제한</span><span>영어 질문 듣기 2회</span><span>음성 녹음(지원 기기)</span><span>끝난 뒤 전체 복습</span></div><label class="om-goal-label" for="om-goal">목표 수준</label><select id="om-goal"><option value="il"' + (state.level === "il" ? " selected" : "") + '>IL 목표</option><option value="ih"' + (state.level === "ih" ? " selected" : "") + '>IH 목표</option></select><p class="om-note">질문 7번을 마친 후 두 번째 세션의 연습 난이도를 선택할 수 있어요. 질문은 실제 시험 기출이 아닌 JINI 창작 문제예요.</p><p class="om-note">녹음 파일은 브라우저에만 임시로 보관되고 새로고침하면 사라져요. 문항 진행과 글로 적은 답변은 이 브라우저에 저장돼요. 공식 등급 채점은 제공하지 않아요.</p><button type="button" class="om-button om-primary" data-mock="start">실전 모의시험 시작 →</button></div>';
  }
  function renderBreak() {
    root.innerHTML = header() + '<article class="om-panel om-break"><span class="om-pill">SESSION 2</span><h3>1차 세션을 마쳤어요</h3><p>실제 오픽처럼 두 번째 세션에 앞서 연습 난이도를 고를 수 있어요. 이 선택은 두 번째 세션의 질문 표현을 조금 더 쉽게 또는 자세하게 바꿔요. 공식 난이도 조정과 동일하지는 않아요.</p><div class="om-difficulty"><button type="button" data-mock="difficulty" data-value="easy">더 쉽게</button><button type="button" data-mock="difficulty" data-value="same">비슷하게</button><button type="button" data-mock="difficulty" data-value="hard">더 어렵게</button></div><p class="om-note" id="om-status" role="status">40분 타이머는 계속 진행돼요.</p></article>';
  }
  function example(question, level) {
    const answer = question[level];
    return '<div class="om-example"><div class="om-example-heading"><strong>' + level.toUpperCase() + ' 예시 답변</strong><button type="button" class="om-button om-small" data-mock="model-audio">🔊 예시 듣기</button></div><p lang="en" class="om-example-en">' + escape(answer.text) + '</p><p class="om-example-ko">' + escape(answer.ko) + '</p><p class="om-note">실제 점수나 등급을 보장하지 않는 학습용 답변이에요. 자신의 이야기로 바꿔 말해 보세요.</p><button type="button" class="om-link-button" data-mock="alternate">다른 수준(' + (level === "il" ? "IH" : "IL") + ') 답변도 보기</button></div>';
  }
  function renderQuestion() {
    if (state.phase !== "active") return render();
    const q = questions[state.index], i = state.index;
    displayLevel = displayLevel || state.level;
    const answered = state.answered[i], revealed = state.revealed[i];
    const canRepeat = canSpeak && state.listens[i] < 2;
    root.innerHTML = header() +
      '<article class="om-panel"><div class="om-panel-top"><span class="om-pill">' + (i < 7 ? "SESSION 1" : "SESSION 2") + ' · ' + escape(q.topic) + '</span><span id="om-replays" class="om-note">질문 듣기 ' + state.listens[i] + ' / 2회</span></div><h3>Question ' + (i + 1) + '</h3><p class="om-prompt" lang="en">' + escape(promptFor(q)) + '</p><div class="om-controls"><button type="button" class="om-button om-primary" data-mock="listen"' + (!canRepeat ? " disabled" : "") + '>' + (state.listens[i] >= 2 ? "질문 듣기 완료" : "🔊 질문 듣기") + '</button><button type="button" class="om-button" data-mock="meaning" aria-expanded="false">한국어 질문 보기</button></div><p class="om-meaning" id="om-meaning" hidden>' + escape(q.meaning) + '</p></article>' +
      '<article class="om-panel"><h3>나의 답변</h3><p class="om-note">영어로 직접 말해 보세요. 글로 적는 답변은 선택 사항이며 실제 오픽에서는 말하기로 평가해요.</p><div class="om-controls"><button type="button" class="om-button' + (recorder && recorder.state === "recording" ? " is-recording" : "") + '" data-mock="record"' + (!canRecord ? " disabled" : "") + '>' + (recorder && recorder.state === "recording" ? "■ 녹음 종료" : "🎤 답변 녹음") + '</button><span class="om-note">' + (canRecord ? "녹음 파일은 현재 화면에만 임시 보관돼요." : "현재 브라우저는 녹음을 지원하지 않아요.") + '</span></div>' +
      (recordings.has(i) ? '<div class="om-audio"><strong>내 녹음 재생</strong><audio controls preload="none" src="' + recordings.get(i) + '"></audio></div>' : '') +
      '<label class="om-note" for="om-note">답변 메모 (선택)</label><textarea id="om-note" rows="3" maxlength="2000" placeholder="영어로 말한 내용을 적거나 핵심 표현을 메모해 보세요.">' + escape(state.notes[i]) + '</textarea><p id="om-status" class="om-status" role="status">' + (answered ? "답변 연습 완료! 예시 답변을 비교해 보세요." : "준비가 되면 녹음하거나 직접 영어로 답해 보세요.") + '</p>' +
      '<div class="om-controls"><button type="button" class="om-button om-primary" data-mock="answer">' + (revealed ? "예시 답변 다시 보기" : "답변 완료 · 예시 보기") + '</button><button type="button" class="om-button" data-mock="next">' + (i === 14 ? "모의시험 마치기" : "다음 문제 →") + '</button></div></article>' +
      '<div id="om-example-wrap"' + (!revealed ? " hidden" : "") + '>' + (revealed ? example(q, displayLevel) : "") + '</div>' +
      '<div class="om-end-link"><button type="button" class="om-link-button" data-mock="finish">여기서 시험 종료하기</button></div>';
  }
  function renderResults() {
    const attempted = state.answered.filter(Boolean).length;
    const elapsed = state.startAt ? Math.min(EXAM_MS, Math.max(0, (state.finishAt || Date.now()) - state.startAt)) : 0;
    const minutes = Math.floor(elapsed / 60000);
    root.innerHTML = '<div class="om-intro"><span class="eyebrow section-eyebrow">PRACTICE COMPLETE</span><h2>모의시험을 마쳤어요</h2><p>' + (state.finishReason === "timeout" ? "40분이 종료됐어요. " : "") + '15문제 중 ' + attempted + '문제를 연습 완료로 표시했어요. 연습 시간 약 ' + minutes + '분.</p><p class="om-note">공식 점수나 IL/IH 등급을 자동 산정하지 않아요. 아래에서 질문, 내 메모, 예시 답변을 비교해 보세요. 녹음은 이 탭에서만 재생 가능하며 새로고침하면 사라져요.</p><button type="button" class="om-button om-primary" data-mock="restart">새 모의시험 시작하기</button></div><div class="om-review-list">' +
      questions.map((q, i) => '<details class="om-review"><summary><span>' + String(i + 1).padStart(2, "0") + ' · ' + escape(q.topic) + '</span><strong>' + (state.answered[i] ? "연습 완료" : "건너뜀") + '</strong></summary><p lang="en" class="om-review-q">' + escape(q.prompt) + '</p><p class="om-note">' + escape(q.meaning) + '</p>' +
        (state.notes[i] ? '<div class="om-review-notes"><strong>내 답변 메모</strong><p>' + escape(state.notes[i]) + '</p></div>' : '') +
        (recordings.has(i) ? '<div class="om-audio"><strong>내 녹음</strong><audio controls preload="none" src="' + recordings.get(i) + '"></audio></div>' : '') +
        '<div class="om-review-examples"><strong>IL 예시</strong><p lang="en">' + escape(q.il.text) + '</p><p class="om-note">' + escape(q.il.ko) + '</p><strong>IH 예시</strong><p lang="en">' + escape(q.ih.text) + '</p><p class="om-note">' + escape(q.ih.ko) + '</p></div></details>').join("") + '</div>';
  }
  function render() {
    stopSpeech();
    if (state.phase === "setup") renderSetup();
    else if (state.phase === "finished") renderResults();
    else if (timeLeft() <= 0) { finish("timeout"); }
    else if (state.index === 7 && !state.difficulty) renderBreak();
    else renderQuestion();
    updateClock();
  }
  function updateClock() {
    const el = root.querySelector("#om-timer");
    if (el) el.textContent = timeLabel();
  }
  async function finish(reason) {
    if (state.phase === "finished" || finishing) return;
    finishing = true;
    await stopRecording();
    stopSpeech();
    state.phase = "finished";
    state.finishReason = reason || "completed";
    state.finishAt = Date.now();
    save();
    renderResults();
    finishing = false;
  }
  async function next() {
    if (busy) return;
    await stopRecording();
    stopSpeech();
    displayLevel = null;
    if (state.index >= 14) { await finish("completed"); return; }
    state.index += 1;
    save();
    render();
    if (!section.hidden) section.scrollIntoView({ block: "start", behavior: "smooth" });
  }
  function start() {
    const choice = root.querySelector("#om-goal");
    const level = choice && choice.value === "ih" ? "ih" : "il";
    state = emptyState();
    state.level = level;
    state.phase = "active";
    state.startAt = Date.now();
    state.endAt = state.startAt + EXAM_MS;
    displayLevel = null;
    save();
    renderQuestion();
  }
  function restart() {
    stopSpeech();
    recordings.forEach(url => URL.revokeObjectURL(url));
    recordings.clear();
    state = emptyState();
    save();
    renderSetup();
  }
  root.addEventListener("input", event => {
    if (event.target.id !== "om-note" || state.phase !== "active") return;
    state.notes[state.index] = event.target.value;
    save();
  });
  root.addEventListener("click", async event => {
    const button = event.target.closest("button[data-mock]");
    if (!button || button.disabled) return;
    const action = button.dataset.mock;
    if (action === "start") { start(); return; }
    if (action === "restart") { restart(); return; }
    if (action === "difficulty") {
      if (state.phase !== "active" || state.index !== 7) return;
      state.difficulty = button.dataset.value;
      save();
      renderQuestion();
      return;
    }
    if (state.phase !== "active") return;
    const q = questions[state.index];
    if (action === "listen") { speak(promptFor(q), true); return; }
    if (action === "meaning") {
      const el = root.querySelector("#om-meaning");
      if (el) { el.hidden = !el.hidden; button.setAttribute("aria-expanded", String(!el.hidden)); }
      return;
    }
    if (action === "record") { await startRecording(); return; }
    if (action === "answer") {
      await stopRecording();
      state.answered[state.index] = true;
      state.revealed[state.index] = true;
      displayLevel = state.level;
      save();
      renderQuestion();
      return;
    }
    if (action === "alternate") {
      displayLevel = displayLevel === "il" ? "ih" : "il";
      const wrap = root.querySelector("#om-example-wrap");
      if (wrap) wrap.innerHTML = example(q, displayLevel);
      return;
    }
    if (action === "model-audio") { speak(q[displayLevel || state.level].text, false); return; }
    if (action === "next") { await next(); return; }
    if (action === "finish") { await finish("early"); return; }
  });
  new MutationObserver(() => {
    if (section.hidden) { stopSpeech(); if (recorder) stopRecording(); }
    else if (state.phase === "active") render();
  }).observe(section, { attributes: true, attributeFilter: ["hidden"] });
  window.addEventListener("pagehide", () => { stopSpeech(); if (recorder) stopRecording(); });
  window.setInterval(() => {
    if (state.phase !== "active") return;
    if (timeLeft() <= 0) { finish("timeout"); return; }
    updateClock();
  }, 1000);
  render();
}());

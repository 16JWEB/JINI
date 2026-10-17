(function () {
  "use strict";

  const root = document.getElementById("korean-game-root");
  const section = document.getElementById("korean-game-section");
  if (!root || !section) return;

  const STORE = "jini-korean-games-v1";
  const DAY = 24 * 60 * 60 * 1000;
  const GAME_SIZE = 8;
  const words = (window.KOREAN_WORDS || []).filter(function (item) {
    return item && typeof item.word === "string" && item.word.trim().length > 0 && item.meaning;
  });
  const expressions = (window.KOREAN_EXPRESSIONS || []).filter(function (item) {
    return item && item.word && item.meaning;
  });
  const sounds = [
    { id: "d", set: ["달", "딸", "탈"], note: "ㄷ은 평음, ㄸ은 된소리, ㅌ은 숨을 세게 내보내는 거센소리예요.", mouth: "혀끝을 윗잇몸에 댔다가 떼세요.", airflow: "ㄸ은 단단하게, ㅌ은 숨을 크게" },
    { id: "b", set: ["발", "빨", "팔"], note: "ㅂ·ㅃ·ㅍ은 입술을 닫았다 떼는 소리예요. ㅍ은 숨이 더 강하게 나와요.", mouth: "두 입술을 붙인 뒤 떼세요.", airflow: "ㅍ에서 숨을 강하게" },
    { id: "j", set: ["자", "짜", "차"], note: "ㅈ은 평음, ㅉ은 된소리, ㅊ은 거센소리예요.", mouth: "혀 앞부분을 윗잇몸 가까이에 두세요.", airflow: "ㅊ에서 숨을 강하게" },
    { id: "g", set: ["가", "까", "카"], note: "ㄱ·ㄲ·ㅋ을 비교해 보세요. ㅋ은 거센 숨소리가 두드러져요.", mouth: "혀 뒤쪽을 입천장 뒤에 닿게 하세요.", airflow: "ㅋ에서 숨을 강하게" },
    { id: "s", set: ["살", "쌀"], note: "ㅅ과 ㅆ의 긴장 차이를 들어 보세요. ㅆ은 혀와 입 주변의 긴장이 더 강해요.", mouth: "혀 앞부분을 윗니 뒤쪽 가까이에 두세요.", airflow: "공기가 좁은 틈으로 지나가게" },
    { id: "p", set: ["불", "뿔", "풀"], note: "ㅂ·ㅃ·ㅍ을 첫소리에서 비교해 보세요. 받침 ㄹ은 세 단어가 같아요.", mouth: "입술을 모아 닫았다 떼세요.", airflow: "ㅍ은 숨을 많이, ㅃ은 단단하게" },
    { id: "t", set: ["다", "따", "타"], note: "같은 모음 ㅏ 앞에서 ㄷ·ㄸ·ㅌ의 차이를 들어 보세요.", mouth: "혀끝을 윗잇몸에 붙였다 떼세요.", airflow: "ㅌ은 숨을 세게 내보내기" }
  ];
  const dialogues = [
    { id: "takeout", scene: "카페", line: "드시고 가세요, 포장이세요?", prompt: "가져갈 때 가장 자연스러운 대답은?", choices: ["포장해 주세요.", "여기서 먹을게요.", "아까 먹었어요.", "지금 계산했어요."], correct: 0, note: "포장해 주세요 = Cho tôi mang đi." },
    { id: "bag", scene: "편의점", line: "봉투 필요하세요?", prompt: "봉투 한 장을 부탁하려면?", choices: ["아니요, 안 샀어요.", "네, 하나 주세요.", "네, 봉투가 작아요.", "하나밖에 없어요."], correct: 1, note: "네, 하나 주세요 = Vâng, cho tôi một cái." },
    { id: "meet", scene: "직장", line: "내일 오전 열 시에 뵐까요?", prompt: "시간이 괜찮을 때 대답은?", choices: ["어제 뵀어요.", "열 시는 지났어요.", "네, 그때 뵙겠습니다.", "지금 열 시예요."], correct: 2, note: "뵙겠습니다는 만나겠습니다의 공손한 표현이에요." },
    { id: "heat", scene: "식당", line: "많이 매운데 괜찮으세요?", prompt: "덜 맵게 부탁하려면?", choices: ["매운 게 많아요.", "네, 안 괜찮아요.", "더 맵게 해 주세요.", "조금 덜 맵게 해 주세요."], correct: 3, note: "덜 맵게 = ít cay hơn." },
    { id: "delay", scene: "친구와 약속", line: "지금 어디야?", prompt: "늦는 상황을 자연스럽게 설명하면?", choices: ["미안, 길이 막혀서 조금 늦을 것 같아.", "지금 어디였어?", "조금 늦었었니?", "길을 잘 막았어."], correct: 0, note: "조금 늦을 것 같아는 곧 늦을 것으로 예상할 때 써요." },
    { id: "receipt", scene: "상점", line: "영수증 드릴까요?", prompt: "필요하지 않을 때는?", choices: ["영수증이 많네요.", "아니요, 괜찮아요. 감사합니다.", "네, 어제 받았어요.", "아직 쇼핑하지 않았어요."], correct: 1, note: "정중하게 거절할 때 '아니요, 괜찮아요'를 자주 써요." },
    { id: "hospital", scene: "병원", line: "어디가 불편하세요?", prompt: "목이 아픈 상황이라면?", choices: ["목은 길어요.", "목이 필요해요.", "목이 아프고 열도 조금 나요.", "목을 잘 먹어요."], correct: 2, note: "증상을 말할 때 '목이 아파요', '열이 나요'라고 해요." },
    { id: "station", scene: "지하철", line: "어디까지 가세요?", prompt: "서울역이 목적지라면?", choices: ["서울역에서 왔어요.", "서울역에 살아요.", "서울역이 있어요.", "서울역까지 가요."], correct: 3, note: "목적지에 '까지'를 붙여 도착 범위를 표현해요." },
    { id: "time", scene: "일상", line: "오늘 저녁에 시간 있으세요?", prompt: "정중하게 시간이 없다고 하려면?", choices: ["죄송한데 오늘은 약속이 있어요.", "오늘 저녁이에요.", "시간을 잊어버렸어요.", "저녁을 만들었어요."], correct: 0, note: "'죄송한데'로 부드럽게 거절할 수 있어요." },
    { id: "order", scene: "식당", line: "주문 도와드릴까요?", prompt: "메뉴를 조금 더 보고 싶다면?", choices: ["음식을 돕고 있어요.", "조금만 더 보고 주문할게요.", "메뉴를 봤던 날이에요.", "주문이 저기 있어요."], correct: 1, note: "조금만 더 보고 주문할게요 = Tôi xem thêm một chút rồi gọi món." }
  ];
  const pronounce = [
    { id: "p1", word: "딸", clue: "ㄸ은 공기를 강하게 뿜지 않고 혀끝을 단단하게 떼는 된소리예요.", mouth: "혀끝 → 윗잇몸", breath: "숨을 세게 터뜨리지 않기" },
    { id: "p2", word: "탈", clue: "ㅌ은 혀끝을 떼며 숨을 세게 내보내는 거센소리예요.", mouth: "혀끝 → 윗잇몸", breath: "손바닥에 바람이 느껴지도록" },
    { id: "p3", word: "빨리", clue: "ㅃ은 두 입술을 단단히 닫았다 떼는 된소리예요.", mouth: "두 입술을 닫았다 떼기", breath: "숨보다 입술의 긴장에 집중" },
    { id: "p4", word: "괜찮아요", clue: "자연스럽게 이어 말할 때 [괜차나요]처럼 들려요.", mouth: "차를 말할 때 ㅊ의 숨을 느끼기", breath: "문장 전체를 한 호흡으로" },
    { id: "p5", word: "같이 가요", clue: "'같이'는 [가치]로 발음해요. ㅌ과 ㅣ가 만나 ㅊ 소리가 돼요.", mouth: "혀 앞부분을 입천장 가까이", breath: "차와 비슷한 ㅊ 소리로" },
    { id: "p6", word: "한국말", clue: "‘한국말’은 [한궁말]로 발음해요. ㄱ 받침이 뒤의 ㅁ을 만나 ㅇ 소리로 바뀌어요.", mouth: "혀 뒤쪽을 입천장에 닿게", breath: "받침 뒤에 '으'를 넣지 않기" },
    { id: "p7", word: "학교", clue: "‘학교’는 [학꾜]로 발음해요. 뒤 음절의 ㄱ이 된소리로 바뀌어요.", mouth: "혀 뒤쪽의 닿는 위치 의식", breath: "단어의 리듬 유지" },
    { id: "p8", word: "밥 먹었어요?", clue: "단어별로 끊기보다 질문 억양을 살려 자연스럽게 이어 말해 보세요.", mouth: "ㅂ에서 두 입술을 닫기", breath: "문장 끝 질문 억양 연습" }
  ];

  function emptyProgress() { return { xp: 0, attempts: 0, correct: 0, items: {} }; }
  function load() {
    try {
      const x = JSON.parse(localStorage.getItem(STORE));
      if (!x || !x.items || typeof x.items !== "object") return emptyProgress();
      return { xp: Math.max(0, Number(x.xp) || 0), attempts: Math.max(0, Number(x.attempts) || 0), correct: Math.max(0, Number(x.correct) || 0), items: x.items };
    } catch (e) { return emptyProgress(); }
  }
  let progress = load();
  let session = null;
  let gameScreenActive = false;
  let message = "";
  let recorder = null;
  let mediaStream = null;
  let recordedUrl = null;
  let recognition = null;
  let recognized = "";
  let recognitionStatus = "";
  let isRecording = false;

  function save() { try { localStorage.setItem(STORE, JSON.stringify(progress)); if (window.JINI_CHARACTER) window.JINI_CHARACTER.refresh(); } catch (e) { message = "기록 저장이 차단된 브라우저예요."; } }
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function shuffle(array) { const a = array.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pickOptions(answer, pool) {
    const seen = new Set([answer]);
    const others = shuffle(pool).filter(function (s) { if (!s || seen.has(s)) return false; seen.add(s); return true; }).slice(0, 3);
    if (others.length < 3) return null;
    return shuffle([answer].concat(others));
  }
  function wordQuestion(item) {
    if (!item || !item.word || !item.meaning) return null;
    const answer = String(item.meaning).trim();
    const opts = pickOptions(answer, words.map(function (x) { return String(x.meaning).trim(); }));
    return opts ? { id: "word:" + item.word, type: "word", label: "단어 뜻 맞히기", prompt: "이 단어의 베트남어 뜻을 고르세요.", text: item.word, target: item.word, choices: opts, correct: opts.indexOf(answer), note: item.word + " = " + answer + (item.example ? " · " + item.example : "") } : null;
  }
  function expressionQuestion(item) {
    if (!item || !item.word || !item.meaning) return null;
    const answer = String(item.meaning).trim();
    const options = pickOptions(answer, expressions.map(function (x) { return String(x.meaning).trim(); }));
    return options ? { id: "expression:" + item.word, type: "expression", label: "일상 표현 복습", prompt: "이 한국어 표현의 베트남어 뜻을 선택하세요.", text: item.word, target: item.word, choices: options, correct: options.indexOf(answer), note: item.word + " = " + answer } : null;
  }
  function soundQuestion(set) {
    const answer = set.set[Math.floor(Math.random() * set.set.length)];
    return { id: "sound:" + set.id + ":" + answer, type: "sound", label: "발음 듣고 맞히기", prompt: "소리를 듣고 들리는 단어를 고르세요.", text: "🔊 소리를 듣고 선택하세요", target: answer, choices: shuffle(set.set), correct: -1, note: set.note, mouth: set.mouth, breath: set.airflow };
  }
  function dialogQuestion(x) { return { id: "dialog:" + x.id, type: "dialog", label: "실전 회화", prompt: x.prompt, text: x.line, scene: x.scene, target: x.line, choices: x.choices, correct: x.correct, note: x.note }; }
  function pronunciationQuestion(x) { return { id: "pron:" + x.id, type: "pron", label: "따라 말하기", prompt: "원어민 음성을 듣고 직접 따라 말하세요.", text: x.word, target: x.word, note: x.clue, mouth: x.mouth, breath: x.breath }; }
  function normalizeQuestion(q) { if (q.type === "sound") q.correct = q.choices.indexOf(q.target); return q; }
  function wrongItems() {
    return Object.keys(progress.items).filter(function (id) {
      const row = progress.items[id];
      return row && Number(row.wrong) > 0 && Number(row.streak) === 0;
    });
  }
  // Keep the reminder and normal quiz filters consistent, including saved legacy scores.
  function hasEarnedXP(id) {
    const row = progress.items[id];
    return !!(row && (row.xpAwarded === true ||
      (row.xpAwarded === undefined && Number(row.streak) > 0)));
  }
  function reminderItems() {
    return Object.keys(progress.items).filter(hasEarnedXP);
  }
  function questionById(id) {
    if (id.indexOf("word:") === 0) return wordQuestion(words.find(function (x) { return x.word === id.slice(5); }) || {});
    if (id.indexOf("expression:") === 0) return expressionQuestion(expressions.find(function (x) { return x.word === id.slice(11); }));
    if (id.indexOf("dialog:") === 0) { const x = dialogues.find(function (x) { return "dialog:" + x.id === id; }); return x ? dialogQuestion(x) : null; }
    if (id.indexOf("pron:") === 0) { const x = pronounce.find(function (x) { return "pron:" + x.id === id; }); return x ? pronunciationQuestion(x) : null; }
    if (id.indexOf("sound:") === 0) {
      const x = sounds.find(function (s) { return id.indexOf("sound:" + s.id + ":") === 0; });
      if (!x) return null;
      const target = id.slice(("sound:" + x.id + ":").length);
      if (!x.set.includes(target)) return null;
      const q = soundQuestion(x);
      q.target = target; q.id = id;
      return q;
    }
    return null;
  }
  function build(mode) {
    if (mode === "word") return shuffle(words.filter(function (item) {
      return !hasEarnedXP("word:" + item.word);
    })).slice(0, GAME_SIZE).map(wordQuestion).filter(Boolean);
    if (mode === "sound") return shuffle(sounds).slice(0, GAME_SIZE).map(soundQuestion);
    if (mode === "dialog") return shuffle(dialogues).slice(0, GAME_SIZE).map(dialogQuestion);
    if (mode === "pron") return shuffle(pronounce).slice(0, GAME_SIZE).map(pronunciationQuestion);
    if (mode === "review") return shuffle(wrongItems()).map(questionById).filter(Boolean).slice(0, 12);
    if (mode === "remind") return shuffle(reminderItems()).map(questionById).filter(Boolean).slice(0, 12);
    return [];
  }
  function button(label, action, cls, extras) { return '<button type="button" class="kg-btn ' + (cls || "") + '" data-kg-action="' + action + '"' + (extras || "") + '>' + label + '</button>'; }
  function boxText(title, detail, icon, action) { return '<button type="button" class="kg-mode" data-kg-action="start" data-mode="' + action + '"><span class="kg-mode-icon">' + icon + '</span><strong>' + title + '</strong><small>' + detail + '</small><span class="kg-mode-arrow">시작 →</span></button>'; }
  // Choice must be followed by correctly typing the word, without penalizing typos.
  function matchingWord(a,b) {
    return String(a||"").normalize("NFC").trim().replace(/\s+/g," ")===String(b||"").normalize("NFC").trim().replace(/\s+/g," ");
  }
  function focusTypingWord() {
    const input=document.getElementById("kg-word-typing");
    if(input)input.focus();
  }
  function gameNavigation(bottom) {
    const count = session ? session.queue.length : 0;
    const position = session ? session.pos : 0;
    const finished = count > 0 && position >= count;
    const controls = count ? '<div class="kg-question-controls">' +
      button("← 이전 문제", "previous", "kg-outline kg-previous-button", position === 0 ? " disabled" : "") +
      (finished ? "" : button(position === count - 1 ? "결과 보기 →" : "다음 문제 →", "next", "kg-outline kg-next-button",
      session && session.queue[position] && session.queue[position]._typingPending ? " disabled" : "")) +
      '</div>' : "";
    return '<div class="kg-game-nav' + (bottom ? ' kg-game-nav-bottom' : '') +
      '" role="navigation" aria-label="' + (bottom ? '아래쪽' : '위쪽') + ' 한글 게임 이동">' +
      button("← 게임 목록", "home", "kg-outline kg-back-button") +
      controls + '</div>';
  }
  function scrollGameTop() {
    if (!section.hidden && section.scrollIntoView) section.scrollIntoView({ block: "start" });
  }
  function returnToGameList() {
    stopMedia();
    session = null;
    gameScreenActive = false;
    message = "";
    dashboard();
    scrollGameTop();
  }
  function goToGameList() {
    if (window.history && window.history.state && window.history.state.jiniKoreanGame) {
      window.history.back();
    } else {
      returnToGameList();
    }
  }
  // Called first by the parent site's popstate handler so Android/browser Back
  // returns to the game selection rather than the whole site's home page.
  window.JINI_KOREAN_GAME_BACK = function () {
    if (section.hidden || !gameScreenActive) return false;
    returnToGameList();
    return true;
  };
  function dashboard() {
    const due = wrongItems().filter(function (id) { return !!questionById(id); }).length;
    const remembered = reminderItems().filter(function (id) { return !!questionById(id); }).length;
    root.innerHTML = '<div class="kg-summary"><div><span>한글 게임 XP</span><strong>' + progress.xp + ' XP</strong></div><div><span>게임 성공률 (자가평가 포함)</span><strong>' + (progress.attempts ? Math.round(progress.correct / progress.attempts * 100) : 0) + '%</strong></div><div><span>오답 복습</span><strong>' + due + '개</strong></div></div>' +
      '<div class="kg-info">💡 문제를 처음 맞히면 +10 XP예요. <b>단어 뜻 맞히기</b>에서 한 번 맞힌 문제는 다시 나오지 않으며 <b>리마인드</b>에서 복습할 수 있어요. 틀린 문제는 <b>오답 복습</b>에서 다시 풀 수 있어요. 리마인드에서는 XP가 지급되지 않아요. 학습 기록은 이 기기의 브라우저에만 저장돼요.</div>' +
      '<div class="kg-mode-grid">' +
      boxText("단어 뜻 맞히기", "기존 한국어 단어와 베트남어 뜻 연결", "📘", "word") +
      boxText("발음 듣고 맞히기", "비슷한 소리를 듣고 구별하기", "🎧", "sound") +
      boxText("발음 따라 말하기", "입·혀 위치 설명 + 녹음 비교", "🎙️", "pron") +
      boxText("실전 회화", "식당·직장·일상 대화 선택하기", "💬", "dialog") +
      boxText("오답 복습", "현재 틀린 문제 " + due + "개", "📝", "review") +
      boxText("리마인드", "전에 맞힌 문제 " + remembered + "개 · 0 XP", "🔁", "remind") + '</div>' +
      '<p class="kg-footnote">소리 재생은 기기의 한국어 음성 엔진을 사용해요. 음성 인식과 녹음은 브라우저 지원 및 마이크 권한이 필요해요. 음성 인식은 브라우저 제공 업체의 서버에서 처리될 수 있어요.</p>';
  }
  function questionView() {
    const q = session.queue[session.pos];
    if (!q) { summary(); return; }
    normalizeQuestion(q);
    // Each question retains its own answer when moving backward and forward.
    session.answer = Number.isInteger(q._answer) ? q._answer : null;
    const fraction = Math.round(session.pos / Math.max(1, session.queue.length) * 100);
    const intro = q.type === "sound" ? '<div class="kg-listen-center"><span class="kg-listen-icon">🎧</span>' + button("▶ 한국어 소리 듣기", "listen", "kg-primary") + '</div>' : '<div class="kg-question-word">' + esc(q.type==="word"&&q._typingPending?q.choices[q.correct]:q.text) + '</div>';
    let content = '<div class="kg-quiz-top"><span class="kg-pill">' + esc(q.label) + (q.scene ? ' · ' + esc(q.scene) : '') + '</span><span>' + (session.pos + 1) + ' / ' + session.queue.length + '</span></div>' +
      '<div class="kg-track"><span style="width:' + fraction + '%"></span></div><p class="kg-prompt">' + esc(q.prompt) + '</p>' + intro;
    if (q.type === "pron") {
      content += '<div class="kg-sound-actions">' + button("▶ 표준 음성 듣기", "listen", "kg-outline") + button("🔎 발음 확인하기", "recognize", "kg-primary") + button("🎙 내 목소리 녹음", "record", "kg-outline") + '</div>' +
        '<div id="kg-recorder-area" class="kg-record-area" aria-live="polite"></div>' +
        '<div class="kg-tip"><b>발음 선생님 TIP</b><p>' + esc(q.note) + '</p><div class="kg-tip-grid"><span>👄 ' + esc(q.mouth) + '</span><span>💨 ' + esc(q.breath) + '</span></div></div>' +
        '<p class="kg-footnote">‘발음 확인하기’를 누르고 한국어로 말하면 인식된 문구와 정답을 비교해요. 녹음은 다시 듣기 전용이며 녹음된 파일이 자동 분석되는 것은 아니에요. 글자 일치는 발음 정확도 점수가 아니에요.</p>' +
        (typeof q._grade === "boolean" ?
          '<div class="kg-feedback ' + (q._grade ? "kg-good" : "kg-bad") + '"><strong>' +
          (q._grade ? (q._xpEarned ? "말하기 완료! +10 XP" : "말하기 완료! 이미 경험치를 받은 문제예요. +0 XP") : "추가 연습이 필요하다고 기록했어요.") +
          '</strong><p>이 문제의 평가는 이미 저장됐어요. 이전·다음 문제로 이동할 수 있어요.</p></div>' :
          '<div class="kg-rating">' + button("😊 잘 발음했어요", "grade", "kg-primary", ' data-grade="yes"') + button("🔁 더 연습할래요", "grade", "kg-outline", ' data-grade="no"') + '</div>');
    } else {
      if (q.type !== "sound") content += '<div class="kg-small-listen">' + button("🔊 한국어 듣기", "listen", "kg-outline") + '</div>';
      const dialog = q.type === "dialog";
      if (dialog) content += '<p class="kg-dialog-hint">🔊 각 보기를 들어본 뒤 답을 선택하고 <b>정답 제출</b>을 눌러 주세요.</p>';
      content += '<div class="kg-choices' + (dialog ? ' kg-dialog-choices' : '') + '">' + q.choices.map(function (option, i) {
        const chosen = session.answer;
        const pending = Number.isInteger(q._pending) ? q._pending : null;
        const style = (chosen !== null || q._typingPending) && i === q.correct ? " kg-right" : chosen === i ? " kg-wrong" :
          dialog && chosen === null && pending === i ? " kg-picked" : "";
        const answerButton = '<button type="button" class="kg-choice' + style +
          '" data-kg-action="' + (dialog ? 'select' : 'choose') + '" data-index="' + i + '"' +
          (dialog ? ' aria-pressed="' + (chosen === null && pending === i) + '"' : '') +
          (chosen !== null || q._typingPending ? ' disabled' : '') + '><span class="kg-choice-number">' + (i + 1) +
          '</span><span>' + esc(option) + (chosen !== null && i === q.correct ? ' ✓' : '') + '</span></button>';
        if (!dialog) return answerButton;
        return '<div class="kg-dialog-choice-row">' + answerButton +
          '<button type="button" class="kg-dialog-listen" data-kg-action="listen-option" data-index="' + i +
          '" aria-label="보기 ' + (i + 1) + ' ' + esc(option) + ' 음성 듣기">🔊 듣기</button></div>';
      }).join("") + '</div>';
      if (dialog && session.answer === null) {
        content += '<div class="kg-dialog-submit">' +
          button("정답 제출", "submit-dialog", "kg-primary kg-wide", Number.isInteger(q._pending) ? "" : " disabled") +
          '</div>';
      }
    }
    if(q.type==="word"&&q._typingPending) {
      content+='<div class="kg-word-typing"><strong>뜻을 맞혔어요! 이번에는 한국어 단어를 직접 써 보세요.</strong>'+
        '<p>정확히 입력하면 다음 문제로 넘어갈 수 있어요. 틀리게 써도 여러 번 다시 입력할 수 있어요.</p>'+
        '<form id="kg-word-typing-form"><input id="kg-word-typing" type="text" lang="ko" aria-label="한국어 단어 직접 입력" placeholder="한국어 단어 입력" autocomplete="off" autocorrect="off" spellcheck="false" required>'+
        '<button class="kg-btn kg-primary" type="submit">타이핑 확인</button></form></div>';
    }
    if (session.answer !== null && q.type !== "pron") {
      content += '<div class="kg-feedback ' + (session.answer === q.correct ? "kg-good" : "kg-bad") + '"><strong>' + (session.answer === q.correct ? (q._xpEarned ? '정답이에요! +10 XP' : '정답이에요! 이미 경험치를 받은 문제예요. +0 XP') : '오답이에요. 오답 복습에 추가했어요.') + '</strong><p>' + esc(q.note) + '</p>' +
        (q.type === "sound" ? '<p>들려준 단어: <b>' + esc(q.target) + '</b></p>' : '') + '</div>';
    }
    if (message) content += '<p class="kg-status" role="status">' + esc(message) + '</p>';
    root.innerHTML = '<div class="kg-quiz-card">' + gameNavigation() + content + gameNavigation(true) + '</div>';
    if (q.type === "pron") showRecordedArea();
  }
  function summary() {
    stopMedia();
    const n = session.correct;
    const total = session.answered;
    const skipped = session.queue.filter(function (q) {
      return q.type === "pron" ? typeof q._grade !== "boolean" : !Number.isInteger(q._answer);
    }).length;
    root.innerHTML = '<div class="kg-finish">' + gameNavigation() + '<div class="kg-trophy">🏆</div><h2>게임 완료!</h2><p>정답 또는 자기 평가 성공 <b>' + n + ' / ' + total + '</b></p>' +
      (skipped ? '<p>답하지 않고 넘어간 문제: ' + skipped + '개 (채점 및 오답 기록 제외)</p>' : '') +
      '<p>' + session.missed + '문제는 오답 복습 목록에 저장했어요.</p><p class="kg-success">이번 게임 획득 경험치: +' + session.earned + ' XP</p>' +
      '<div class="kg-end-actions">' + button("다시 도전", "restart", "kg-primary") + '</div>' + gameNavigation(true) + '</div>';
  }
  function start(mode) {
    if (!["word", "sound", "pron", "dialog", "review", "remind"].includes(mode)) return;
    stopMedia(); message = "";
    if (!gameScreenActive) {
      gameScreenActive = true;
      // Only one history entry for an entire game session, even while switching modes.
      if (window.history && window.history.pushState) {
        window.history.pushState({ jiniHome: true, jiniKoreanGame: true }, "", window.location.href);
      }
    }
    const queue = build(mode);
    if (!queue.length) {
      session = null;
      root.innerHTML = '<div class="kg-finish">' + gameNavigation() + '<h2>' + (mode === "review" ? '현재 오답 복습할 문제가 없어요 🎉' : mode === "remind" ? '아직 리마인드할 문제가 없어요' : mode === "word" ? '아직 맞히지 않은 단어 시험 문제가 없어요 🎉' : '문제 데이터가 없어요') + '</h2><p>' + (mode === "review" ? '틀린 문제가 생기면 여기에서 다시 풀 수 있어요.' : mode === "remind" ? '다른 게임에서 먼저 정답을 맞히면 리마인드에 추가돼요.' : mode === "word" ? '맞힌 단어는 리마인드에서 다시 풀 수 있어요.' : '학습 데이터를 확인해 주세요.') + '</p>' + gameNavigation(true) + '</div>';
      scrollGameTop();
      return;
    }
    session = { mode: mode, queue: queue, pos: 0, answer: null, correct: 0, answered: 0, missed: 0, earned: 0, retries: new Set() };
    questionView();
    scrollGameTop();
  }
  function storeResult(q, good) {
    const item = progress.items[q.id] || { streak: 0, wrong: 0 };
    // Existing records with a positive streak were already credited before
    // this update. New records remember this independently of later mistakes.
    const previouslyRewarded = item.xpAwarded === true ||
      (item.xpAwarded === undefined && Number(item.streak) > 0);
    const firstCorrect = good && !previouslyRewarded && session.mode !== "remind";
    q._xpEarned = firstCorrect;
    item.xpAwarded = previouslyRewarded || good;
    item.streak = good ? Math.min(10, (Number(item.streak) || 0) + 1) : 0;
    if (!good) item.wrong = (Number(item.wrong) || 0) + 1;
    const days = good ? [1, 3, 7, 14, 30][Math.min(item.streak - 1, 4)] : 0;
    item.dueAt = Date.now() + days * DAY;
    item.lastAt = Date.now();
    item.kind = q.type;
    progress.items[q.id] = item;
    progress.attempts += 1;
    session.answered += 1;
    if (good) {
      progress.correct += 1;
      if (firstCorrect) {
        progress.xp += 10;
        session.earned += 10;
      }
      session.correct += 1;
    } else {
      session.missed += 1;
      if (q.type !== "word" && !q._retry && !session.retries.has(q.id)) {
        session.retries.add(q.id);
        // Retry is a new attempt; never inherit the previous choice or self-rating.
        session.queue.push(Object.assign({}, q, { _retry: true, _answer: undefined, _pending: undefined, _grade: undefined, _xpEarned: undefined }));
      }
    }
    save();
  }
  function chosen(idx) {
    if (!session) return;
    const q = session.queue[session.pos];
    if (!q || Number.isInteger(q._answer) || q.type === "pron" ||
        !Number.isInteger(idx) || idx < 0 || idx >= q.choices.length) return;
    if(q.type==="word"&&idx===q.correct){
      q._typingPending=true;
      q._pendingChoice=idx;
      message="";
      questionView();focusTypingWord();return;
    }
    q._answer = idx;
    session.answer = idx;
    storeResult(q, idx === q.correct);
    questionView();
  }
  function confirmWordTyping() {
    if(!session)return;
    const q=session.queue[session.pos],input=document.getElementById("kg-word-typing");
    if(!q||q.type!=="word"||!q._typingPending||!input)return;
    if(!matchingWord(input.value,q.target)){
      message="철자가 달라요. 다시 입력해 주세요.";
      questionView();focusTypingWord();return;
    }
    q._typingPending=false;
    q._answer=q.correct;
    session.answer=q.correct;
    message="";
    storeResult(q,true);
    questionView();
  }
  function selectDialogOption(idx) {
    if (!session) return;
    const q = session.queue[session.pos];
    if (!q || q.type !== "dialog" || Number.isInteger(q._answer) ||
        !Number.isInteger(idx) || idx < 0 || idx >= q.choices.length) return;
    q._pending = idx;
    message = "";
    questionView();
  }
  function submitDialog() {
    if (!session) return;
    const q = session.queue[session.pos];
    if (!q || q.type !== "dialog" || Number.isInteger(q._answer) ||
        !Number.isInteger(q._pending) || q._pending < 0 || q._pending >= q.choices.length) return;
    q._answer = q._pending;
    session.answer = q._answer;
    message = "";
    storeResult(q, q._answer === q.correct);
    questionView();
  }
  function finishPron(good) {
    if (!session) return;
    const q = session.queue[session.pos];
    if (!q || q.type !== "pron" || typeof q._grade === "boolean") return;
    q._grade = good;
    storeResult(q, good);
    advance();
  }
  function moveQuestion(delta) {
    if (!session || !Number.isInteger(delta)) return;
    const next = session.pos + delta;
    if (next < 0 || next > session.queue.length || next === session.pos) return;
    if (delta > 0 && session.queue[session.pos] && session.queue[session.pos]._typingPending) {
      message="단어를 정확히 입력해야 다음으로 넘어갈 수 있어요.";
      questionView();focusTypingWord();return;
    }
    stopMedia();
    message = "";
    session.pos = next;
    session.answer = null;
    questionView();
    scrollGameTop();
  }
  function advance() {
    moveQuestion(1);
  }
  function speak(text) {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) { message = "이 브라우저는 음성 재생을 지원하지 않아요."; questionView(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.86;
    const voice = window.speechSynthesis.getVoices().find(function (v) { return v.lang && v.lang.toLowerCase().indexOf("ko") === 0; });
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }
  function stopMedia() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (recognition) { try { recognition.abort(); } catch (e) {} recognition = null; }
    if (recorder && recorder.state !== "inactive") { try { recorder.stop(); } catch (e) {} }
    if (mediaStream) mediaStream.getTracks().forEach(function (track) { track.stop(); });
    mediaStream = null; recorder = null; isRecording = false;
    if (recordedUrl) { URL.revokeObjectURL(recordedUrl); recordedUrl = null; }
    recognized = "";
    recognitionStatus = "";
  }
  function compareSpokenText(actual, expected) {
    function clean(text) {
      return String(text || "").normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
    }
    return clean(actual) === clean(expected);
  }
  function showRecordedArea() {
    const area = document.getElementById("kg-recorder-area");
    if (!area) return;
    const q = session && session.queue[session.pos];
    const detected = recognized || (q && q._recognized) || "";
    const match = detected && q && compareSpokenText(detected, q.target);
    let analysis = "";
    if (detected && q) {
      analysis = '<div class="kg-analysis ' + (match ? "kg-analysis-match" : "kg-analysis-different") + '">' +
        '<p><b>🎯 연습 문구:</b> ' + esc(q.target) + '</p>' +
        '<p><b>🗣 인식된 문구:</b> ' + esc(detected) + '</p>' +
        '<p><strong>' + (match ? "표현이 일치해요! 발음 설명과 함께 다시 연습해 보세요." :
          "다른 표현으로 인식됐어요. 표준 음성을 듣고 다시 말해 보세요.") + '</strong></p>' +
        (!match ? '<p>💡 ' + esc(q.note || "") + '</p>' : "") +
        '<small>음성 인식의 글자 비교이며, 발음의 음향적 정확도를 평가한 점수는 아니에요.</small></div>';
    }
    area.innerHTML = (isRecording ? '<p>🔴 내 목소리 녹음 중… ' + button("■ 녹음 끝내기", "stop-record", "kg-outline") + '</p>' :
      recordedUrl ? '<p>내 목소리 녹음 (직접 듣기)</p><audio id="kg-my-audio" controls></audio>' :
      '<p>🔎 발음 확인하기: 버튼을 누르고 다시 말해 보세요. 🎙 녹음은 듣기용으로 따로 저장돼요.</p>') +
      (recognitionStatus ? '<p class="kg-recognition-status" role="status">' + esc(recognitionStatus) + '</p>' : '') + analysis;
    if (recordedUrl) {
      const player = document.getElementById("kg-my-audio");
      if (player) player.src = recordedUrl;
    }
  }
  async function beginRecord() {
    if (!session || session.queue[session.pos].type !== "pron") return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      message = "이 브라우저에서는 녹음을 지원하지 않아요. HTTPS 환경과 마이크 권한을 확인해 주세요."; questionView(); return;
    }
    stopMedia();
    const expectedPosition = session.pos;
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (section.hidden || !session || session.pos !== expectedPosition) { stopMedia(); return; }
      const chunks = [];
      recorder = new MediaRecorder(mediaStream);
      recorder.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      recorder.onstop = function () {
        if (mediaStream) { mediaStream.getTracks().forEach(function (t) { t.stop(); }); mediaStream = null; }
        isRecording = false;
        if (chunks.length && session && session.pos === expectedPosition && !section.hidden) {
          if (recordedUrl) URL.revokeObjectURL(recordedUrl);
          recordedUrl = URL.createObjectURL(new Blob(chunks, { type: recorder && recorder.mimeType || chunks[0].type || "audio/webm" }));
        }
        showRecordedArea();
      };
      recorder.start();
      isRecording = true;
      showRecordedArea();
    } catch (e) { stopMedia(); message = "마이크 권한이 거부되었거나 녹음할 수 없어요."; questionView(); }
  }
  function speechErrorMessage(code) {
    switch (code) {
      case "not-allowed":
        return "음성 인식 마이크 권한이 거부됐어요. 브라우저 주소창의 사이트 권한에서 마이크를 허용하고 다시 시도해 주세요.";
      case "service-not-allowed":
        return "브라우저에서 음성 인식 서비스 사용이 차단됐어요. Chrome 브라우저로 다시 열어 보세요.";
      case "audio-capture":
        return "음성 인식에 마이크를 사용할 수 없어요. 진행 중인 녹음을 먼저 끝내고 다시 시도해 주세요.";
      case "network":
        return "음성 인식 서버에 연결하지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.";
      case "no-speech":
        return "목소리를 인식하지 못했어요. 조용한 곳에서 다시 말해 보세요.";
      case "language-not-supported":
        return "이 브라우저의 음성 인식에서 한국어를 지원하지 않아요.";
      default:
        return "음성 인식이 실패했어요 (" + String(code || "unknown") + "). 다시 시도해 주세요.";
    }
  }
  function recognize() {
    if (!session || section.hidden) return;
    const question = session.queue[session.pos];
    if (!question || question.type !== "pron") return;
    if (isRecording || (recorder && recorder.state === "recording")) {
      recognitionStatus = "녹음을 먼저 끝낸 다음 ‘발음 확인하기’를 눌러 다시 말해 주세요.";
      showRecordedArea();
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      recognitionStatus = "이 브라우저는 실시간 음성 인식을 지원하지 않아요. Android에서는 최신 Chrome으로 사이트를 열어 보세요. 녹음 듣기 기능은 계속 사용할 수 있어요.";
      showRecordedArea();
      return;
    }
    if (recognition) {
      const previous = recognition;
      recognition = null;
      try { previous.abort(); } catch (e) {}
    }
    const currentSession = session;
    const position = session.pos;
    const instance = new SpeechRecognition();
    recognition = instance;
    recognized = "";
    question._recognized = "";
    recognitionStatus = "🎙 듣고 있어요. 화면의 한국어를 또박또박 말해 주세요.";
    instance.lang = "ko-KR";
    instance.interimResults = false;
    instance.continuous = false;
    instance.maxAlternatives = 1;
    function stillActive() {
      return recognition === instance && session === currentSession &&
        session.pos === position && !section.hidden;
    }
    instance.onresult = function (event) {
      if (!stillActive()) return;
      if (!event.results || !event.results.length) {
        recognitionStatus = "인식 결과가 없어요. 다시 발음해 보세요.";
      } else {
        recognized = String(event.results[0][0].transcript || "").trim();
        question._recognized = recognized;
        recognitionStatus = recognized ? "음성 인식 완료. 아래 비교 결과를 확인하세요." : "인식된 글자가 없어요. 다시 발음해 보세요.";
      }
      showRecordedArea();
    };
    instance.onerror = function (event) {
      if (!stillActive() || event.error === "aborted") return;
      recognitionStatus = speechErrorMessage(event.error);
      showRecordedArea();
    };
    instance.onend = function () {
      if (!stillActive()) return;
      if (!recognized && recognitionStatus.indexOf("듣고 있어요") !== -1) {
        recognitionStatus = "음성 인식이 종료됐지만 말을 인식하지 못했어요. 다시 시도해 주세요.";
      }
      recognition = null;
      showRecordedArea();
    };
    try {
      instance.start();
      showRecordedArea();
    } catch (error) {
      if (recognition === instance) recognition = null;
      recognitionStatus = "음성 인식 시작에 실패했어요. 다른 앱에서 마이크를 사용하는지 확인하고 다시 시도해 주세요.";
      showRecordedArea();
    }
  }

  root.addEventListener("click", function (event) {
    const b = event.target.closest("[data-kg-action]");
    if (!b || !root.contains(b)) return;
    const action = b.dataset.kgAction;
    if (action === "home") goToGameList();
    else if (action === "previous") moveQuestion(-1);
    else if (action === "start") start(b.dataset.mode);
    else if (action === "restart" && session) start(session.mode);
    else if (action === "choose") chosen(Number(b.dataset.index));
    else if (action === "select") selectDialogOption(Number(b.dataset.index));
    else if (action === "submit-dialog") submitDialog();
    else if (action === "listen-option" && session) {
      const q = session.queue[session.pos];
      const index = Number(b.dataset.index);
      if (q && q.type === "dialog" && Number.isInteger(index) && index >= 0 && index < q.choices.length) {
        speak(q.choices[index]);
      }
    }
    else if (action === "next") advance();
    else if (action === "grade") finishPron(b.dataset.grade === "yes");
    else if (action === "listen" && session) speak(session.queue[session.pos].target);
    else if (action === "record") beginRecord();
    else if (action === "stop-record" && recorder && recorder.state !== "inactive") recorder.stop();
    else if (action === "recognize") recognize();
  });
  root.addEventListener("submit",function(event){
    if(event.target&&event.target.id==="kg-word-typing-form"){
      event.preventDefault();confirmWordTyping();
    }
  });
  new MutationObserver(function () {
    if (section.hidden) {
      stopMedia();
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }
  }).observe(section, { attributes: true, attributeFilter: ["hidden"] });

  window.JINI_START_KOREAN_GAME = start;
  dashboard();
}());

(function () {
  "use strict";

  const PAGE_SIZE = 10;
  const PAGE_JUMP = 10;
  const words = window.WORDS || [];
  const koreanWords = window.KOREAN_WORDS || [];
  const koreanExpressions = (window.KOREAN_EXPRESSIONS || []).map(function (item) {
    return Object.assign({ level: "일상 표현" }, item);
  });
  const list = document.getElementById("word-list");
  const search = document.getElementById("search-input");
  const pagination = document.getElementById("pagination");
  const emptyState = document.getElementById("empty-state");
  const resultCount = document.getElementById("result-count");
  const breadcrumbLevel = document.getElementById("breadcrumb-level");
  const toast = document.getElementById("toast");
  const playerSection = document.getElementById("player-section");
  const verbFormsSection = document.getElementById("verb-forms-section");
  const languagePacksSection = document.getElementById("language-packs-section");
  const verbTableBody = document.getElementById("verb-table-body");
  const verbSearch = document.getElementById("verb-search-input");
  const verbResultCount = document.getElementById("verb-result-count");
  const verbEmpty = document.getElementById("verb-empty");
  let activeLevel = "all";
  let currentStudy = "english";
  let currentPage = 1;
  let currentPageView = "";
  // The screen the learner was on immediately before entering OPIc mock practice.
  let mockReturnPage = "speaking";
  let syncReturnPage = "home";
  let selectedVocabularyIndex = -1;
  let restoringStudyState = false;
  let toastTimer;
  let activeButton = null;
  let cardSpeechToken = 0;
  let cardRepeatTimer = null;
  let playerLevel = "초등";
  let playerWords = [];
  let playerIndex = 0;
  let playbackState = "stopped";
  let playbackToken = 0;
  let verbSpeechToken = 0;
  let advanceTimer;
  let wordRepeatTimer = null;
  let verbAutoTimer;
  let verbAutoPlaying = false;
  let verbAutoRows = [];
  let verbAutoIndex = 0;
  let lastAutoVerbWord = "";
  let playerMode = "word-meaning-example";
  let bookmarks = { vocabulary: [], player: [] };
  let studyStates = { english: null, korean: null };
  const BOOKMARK_STORAGE_KEY = "jini-learning-bookmarks";
  const ESSENTIAL_EXPRESSION_BOOKMARK_KEY = "jini-essential-expressions-bookmarks-v1";
  const STUDY_STATE_KEY = "jini-last-study-state";
  const VOCABULARY_LEVEL_STATE_KEY = "jini-vocabulary-level-state-v1";
  let vocabularyLevelStates = {};
  const PLAYER_LEVEL_STATE_KEY = "jini-player-level-state-v1";
  let playerLevelStates = {};

  function essentialExpressionItems() {
    return (window.JINI_ESSENTIAL_EXPRESSIONS || []).map(function (item) {
      return { id: item.id, studyNumber: item.studyNumber, word: item.phrase, level: item.category, meaning: item.meaning,
        example: item.example, exampleKo: item.translation, ipa: "", exampleReviewed: true };
    });
  }
  function essentialBookmarkIds() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(ESSENTIAL_EXPRESSION_BOOKMARK_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter(function (id) {
        return Number.isInteger(id) && essentialExpressionItems().some(function (item) { return item.id === id; });
      }) : [];
    } catch (e) { return []; }
  }
  function saveEssentialBookmarkIds(ids) {
    try {
      window.localStorage.setItem(ESSENTIAL_EXPRESSION_BOOKMARK_KEY, JSON.stringify(ids));
      return true;
    } catch (e) { showToast("표현 책갈피를 저장하지 못했어요."); return false; }
  }

  const levelNames = { all: "필수 단어", 초등: "초등 필수", 중등: "중등 필수", 고등: "고등 필수" };
  const verbForms = [
    ["be", "am / is / are", "was / were", "been", "이다, 있다"],
    ["beat", "beat", "beat", "beat", "치다, 이기다"],
    ["become", "become", "became", "become", "되다"],
    ["begin", "begin", "began", "begun", "시작하다"],
    ["bend", "bend", "bent", "bent", "구부리다"],
    ["bet", "bet", "bet", "bet", "돈을 걸다"],
    ["bite", "bite", "bit", "bitten", "물다"],
    ["blow", "blow", "blew", "blown", "불다"],
    ["break", "break", "broke", "broken", "깨뜨리다"],
    ["bring", "bring", "brought", "brought", "가져오다"],
    ["build", "build", "built", "built", "짓다"],
    ["buy", "buy", "bought", "bought", "사다"],
    ["catch", "catch", "caught", "caught", "잡다"],
    ["choose", "choose", "chose", "chosen", "고르다"],
    ["come", "come", "came", "come", "오다"],
    ["cost", "cost", "cost", "cost", "비용이 들다"],
    ["cut", "cut", "cut", "cut", "자르다"],
    ["deal", "deal", "dealt", "dealt", "다루다"],
    ["dig", "dig", "dug", "dug", "파다"],
    ["do", "do / does", "did", "done", "하다"],
    ["draw", "draw", "drew", "drawn", "그리다"],
    ["dream", "dream", "dreamed", "dreamed", "꿈꾸다"],
    ["drink", "drink", "drank", "drunk", "마시다"],
    ["drive", "drive", "drove", "driven", "운전하다"],
    ["eat", "eat", "ate", "eaten", "먹다"],
    ["fall", "fall", "fell", "fallen", "떨어지다"],
    ["feed", "feed", "fed", "fed", "먹이를 주다"],
    ["feel", "feel", "felt", "felt", "느끼다"],
    ["fight", "fight", "fought", "fought", "싸우다"],
    ["find", "find", "found", "found", "찾다"],
    ["fly", "fly", "flew", "flown", "날다"],
    ["forget", "forget", "forgot", "forgotten", "잊다"],
    ["forgive", "forgive", "forgave", "forgiven", "용서하다"],
    ["get", "get", "got", "gotten", "얻다, 받다"],
    ["give", "give", "gave", "given", "주다"],
    ["go", "go", "went", "gone", "가다"],
    ["grow", "grow", "grew", "grown", "자라다, 기르다"],
    ["hang", "hang", "hung", "hung", "걸다"],
    ["have", "have / has", "had", "had", "가지다"],
    ["hear", "hear", "heard", "heard", "듣다"],
    ["hide", "hide", "hid", "hidden", "숨기다"],
    ["hit", "hit", "hit", "hit", "치다"],
    ["hold", "hold", "held", "held", "잡다, 개최하다"],
    ["hurt", "hurt", "hurt", "hurt", "다치게 하다"],
    ["keep", "keep", "kept", "kept", "유지하다, 보관하다"],
    ["know", "know", "knew", "known", "알다"],
    ["lay", "lay", "laid", "laid", "놓다, 낳다"],
    ["lead", "lead", "led", "led", "이끌다"],
    ["leave", "leave", "left", "left", "떠나다, 남기다"],
    ["lend", "lend", "lent", "lent", "빌려주다"],
    ["let", "let", "let", "let", "~하게 두다"],
    ["lie", "lie", "lay", "lain", "눕다"],
    ["lose", "lose", "lost", "lost", "잃다, 지다"],
    ["make", "make", "made", "made", "만들다"],
    ["mean", "mean", "meant", "meant", "의미하다"],
    ["meet", "meet", "met", "met", "만나다"],
    ["pay", "pay", "paid", "paid", "지불하다"],
    ["put", "put", "put", "put", "놓다"],
    ["read", "read", "read", "read", "읽다"],
    ["ride", "ride", "rode", "ridden", "타다"],
    ["ring", "ring", "rang", "rung", "울리다"],
    ["rise", "rise", "rose", "risen", "오르다"],
    ["run", "run", "ran", "run", "달리다"],
    ["say", "say", "said", "said", "말하다"],
    ["see", "see", "saw", "seen", "보다"],
    ["sell", "sell", "sold", "sold", "팔다"],
    ["send", "send", "sent", "sent", "보내다"],
    ["set", "set", "set", "set", "놓다, 설정하다"],
    ["shake", "shake", "shook", "shaken", "흔들다"],
    ["shine", "shine", "shone", "shone", "빛나다"],
    ["shoot", "shoot", "shot", "shot", "쏘다"],
    ["show", "show", "showed", "shown", "보여주다"],
    ["shut", "shut", "shut", "shut", "닫다"],
    ["sing", "sing", "sang", "sung", "노래하다"],
    ["sink", "sink", "sank", "sunk", "가라앉다"],
    ["sit", "sit", "sat", "sat", "앉다"],
    ["sleep", "sleep", "slept", "slept", "자다"],
    ["speak", "speak", "spoke", "spoken", "말하다"],
    ["spend", "spend", "spent", "spent", "쓰다, 보내다"],
    ["stand", "stand", "stood", "stood", "서다"],
    ["steal", "steal", "stole", "stolen", "훔치다"],
    ["swim", "swim", "swam", "swum", "수영하다"],
    ["take", "take", "took", "taken", "가져가다, 데려가다"],
    ["teach", "teach", "taught", "taught", "가르치다"],
    ["tear", "tear", "tore", "torn", "찢다"],
    ["tell", "tell", "told", "told", "말해주다"],
    ["think", "think", "thought", "thought", "생각하다"],
    ["throw", "throw", "threw", "thrown", "던지다"],
    ["understand", "understand", "understood", "understood", "이해하다"],
    ["wake", "wake", "woke", "woken", "깨다, 깨우다"],
    ["wear", "wear", "wore", "worn", "입다, 착용하다"],
    ["win", "win", "won", "won", "이기다"],
    ["write", "write", "wrote", "written", "쓰다"],
    ["accept", "accept", "accepted", "accepted", "받아들이다"],
    ["add", "add", "added", "added", "더하다"],
    ["answer", "answer", "answered", "answered", "대답하다"],
    ["arrive", "arrive", "arrived", "arrived", "도착하다"],
    ["ask", "ask", "asked", "asked", "묻다, 부탁하다"],
    ["call", "call", "called", "called", "부르다, 전화하다"],
    ["clean", "clean", "cleaned", "cleaned", "청소하다"],
    ["close", "close", "closed", "closed", "닫다"],
    ["cook", "cook", "cooked", "cooked", "요리하다"],
    ["dance", "dance", "danced", "danced", "춤추다"],
    ["decide", "decide", "decided", "decided", "결정하다"],
    ["enjoy", "enjoy", "enjoyed", "enjoyed", "즐기다"],
    ["explain", "explain", "explained", "explained", "설명하다"],
    ["finish", "finish", "finished", "finished", "끝내다"],
    ["help", "help", "helped", "helped", "돕다"],
    ["hope", "hope", "hoped", "hoped", "바라다"],
    ["jump", "jump", "jumped", "jumped", "뛰다"],
    ["learn", "learn", "learned", "learned", "배우다"],
    ["listen", "listen", "listened", "listened", "듣다"],
    ["live", "live", "lived", "lived", "살다"],
    ["look", "look", "looked", "looked", "보다"],
    ["love", "love", "loved", "loved", "사랑하다"],
    ["move", "move", "moved", "moved", "움직이다, 이사하다"],
    ["open", "open", "opened", "opened", "열다"],
    ["plan", "plan", "planned", "planned", "계획하다"],
    ["play", "play", "played", "played", "놀다, 경기하다"],
    ["rain", "rain", "rained", "rained", "비가 오다"],
    ["remember", "remember", "remembered", "remembered", "기억하다"],
    ["study", "study", "studied", "studied", "공부하다"],
    ["talk", "talk", "talked", "talked", "이야기하다"],
    ["try", "try", "tried", "tried", "시도하다"],
    ["use", "use", "used", "used", "사용하다"],
    ["visit", "visit", "visited", "visited", "방문하다"],
    ["wait", "wait", "waited", "waited", "기다리다"],
    ["walk", "walk", "walked", "walked", "걷다"],
    ["want", "want", "wanted", "wanted", "원하다"],
    ["watch", "watch", "watched", "watched", "보다"],
    ["work", "work", "worked", "worked", "일하다"]
  ];
  const speech = window.speechSynthesis;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.classList.remove("visible"); }, 2800);
  }

  function loadBookmarks() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(BOOKMARK_STORAGE_KEY) || "{}");
      const levels = ["all", "초등", "중등", "고등"];
      return {
        vocabulary: Array.isArray(saved.vocabulary) ? saved.vocabulary.filter(function (bookmark) {
          return bookmark && levels.includes(bookmark.level) &&
            Number.isInteger(bookmark.page) && bookmark.page > 0 && typeof bookmark.query === "string" &&
            ["english", "korean"].includes(bookmark.study || "english");
        }) : [],
        player: Array.isArray(saved.player) ? saved.player.filter(function (bookmark) {
          return bookmark && ["초등", "중등", "고등", "기초", "일상 표현"].includes(bookmark.level) &&
            Number.isInteger(bookmark.index) && bookmark.index >= 0 &&
            Number.isInteger(bookmark.page) && bookmark.page > 0 && typeof bookmark.word === "string" &&
            ["english", "korean"].includes(bookmark.study || "english") &&
            ["word", "expression"].includes(bookmark.type || "word");
        }) : []
      };
    } catch (error) {
      showToast("책갈피를 불러오지 못했어요.");
      return { vocabulary: [], player: [] };
    }
  }

  function saveBookmarks() {
    try {
      window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
      return true;
    } catch (error) {
      showToast("책갈피를 저장하지 못했어요.");
      return false;
    }
  }

  function loadStudyStates() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STUDY_STATE_KEY) || "null");
      const validPages = ["vocabulary", "ko-vocabulary", "player", "ko-player", "ko-expressions", "ko-expression-player", "ko-game", "verb-forms", "english-expressions", "english-expression-player", "english-game", "speaking", "opic", "opic-basic", "opic-mock"];
      if (!saved) return { english: null, korean: null, lastStudy: null };
      function isValidState(state) {
        return state && validPages.includes(state.page);
      }
      if (isValidState(saved)) {
        const study = saved.study === "korean" || saved.page.indexOf("ko-") === 0 ? "korean" : "english";
        const pages = {};
        pages[saved.page] = saved;
        return { english: study === "english" ? saved : null, korean: study === "korean" ? saved : null, pages: pages, lastStudy: study };
      }
      const states = {
        english: isValidState(saved.english) ? saved.english : null,
        korean: isValidState(saved.korean) ? saved.korean : null,
        pages: {},
        lastStudy: saved.lastStudy === "korean" ? "korean" : "english"
      };
      if (saved.pages && typeof saved.pages === "object") {
        validPages.forEach(function (page) {
          if (isValidState(saved.pages[page])) states.pages[page] = saved.pages[page];
        });
      }
      ["english", "korean"].forEach(function (study) {
        if (!states[study]) return;
        states.pages[states[study].page] = states.pages[states[study].page] || states[study];
      });
      if (!states.english || !states.korean) {
        Object.keys(states.pages).forEach(function (page) {
          const state = states.pages[page];
          const study = state.study === "korean" || page.indexOf("ko-") === 0 ? "korean" : "english";
          if (!states[study]) states[study] = state;
        });
      }
      if (!states[states.lastStudy]) states.lastStudy = states.english ? "english" : states.korean ? "korean" : null;
      return states;
    } catch (error) {
      showToast("마지막 학습 화면을 불러오지 못했어요.");
      return { english: null, korean: null, lastStudy: null };
    }
  }

  function loadVocabularyLevelStates() {
    let saved = {};
    try {
      saved = JSON.parse(window.localStorage.getItem(VOCABULARY_LEVEL_STATE_KEY) || "{}") || {};
    } catch (error) {
      // A damaged or unavailable preference must not prevent studying.
    }
    const states = {};
    ["all", "초등", "중등", "고등"].forEach(function (level) {
      const state = saved[level];
      if (state && state.page === "vocabulary" && state.level === level &&
          Number.isInteger(state.pageNumber) && state.pageNumber > 0) {
        states[level] = state;
      }
    });
    // Keep the last position saved by versions before per-category memory.
    const previous = studyStates.pages && studyStates.pages.vocabulary;
    if (previous && ["all", "초등", "중등", "고등"].includes(previous.level) && !states[previous.level]) {
      states[previous.level] = previous;
    }
    return states;
  }

  function loadPlayerLevelStates() {
    let saved = {};
    try { saved = JSON.parse(window.localStorage.getItem(PLAYER_LEVEL_STATE_KEY) || "{}") || {}; }
    catch (error) { /* Keep studying if preferences cannot be read. */ }
    const states = {};
    ["초등", "중등", "고등"].forEach(function (level) {
      const state = saved[level];
      if (state && state.page === "player" && state.playerLevel === level &&
          Number.isInteger(state.playerIndex) && state.playerIndex >= 0) states[level] = state;
    });
    const previous = studyStates.pages && studyStates.pages.player;
    if (previous && ["초등", "중등", "고등"].includes(previous.playerLevel) && !states[previous.playerLevel]) {
      states[previous.playerLevel] = previous;
    }
    return states;
  }

  function saveStudyState() {
    const validPages = ["vocabulary", "ko-vocabulary", "player", "ko-player", "ko-expressions", "ko-expression-player", "ko-game", "verb-forms", "english-expressions", "english-expression-player", "english-game", "speaking", "opic", "opic-basic", "opic-mock"];
    if (restoringStudyState || !validPages.includes(currentPageView)) return;
    try {
      const state = {
        page: currentPageView,
        study: currentStudy,
        level: activeLevel,
        pageNumber: currentPage,
        query: search.value,
        selectedVocabularyIndex: selectedVocabularyIndex,
        playerLevel: playerLevel,
        playerIndex: playerIndex,
        playerWord: playerWords[playerIndex] ? playerWords[playerIndex].word : "",
        playerMode: playerMode,
        verbQuery: verbSearch.value,
        autoVerbWord: lastAutoVerbWord,
        scrollY: window.scrollY
      };
      if (!studyStates.pages) studyStates.pages = {};
      studyStates.pages[currentPageView] = state;
      studyStates[currentStudy] = state;
      studyStates.lastStudy = currentStudy;
      window.localStorage.setItem(STUDY_STATE_KEY, JSON.stringify(studyStates));
      if (currentPageView === "vocabulary") {
        vocabularyLevelStates[activeLevel] = state;
        window.localStorage.setItem(VOCABULARY_LEVEL_STATE_KEY, JSON.stringify(vocabularyLevelStates));
      }
      if (currentPageView === "player") {
        playerLevelStates[playerLevel] = state;
        window.localStorage.setItem(PLAYER_LEVEL_STATE_KEY, JSON.stringify(playerLevelStates));
      }
      updateResumeStudyButtons();
    } catch (error) {
      showToast("마지막 학습 화면을 저장하지 못했어요.");
    }
  }

  function resumeStudyState(state) {
    if (!state) return;
    const koreanPage = state.study === "korean" || state.page.indexOf("ko-") === 0;
    const study = koreanPage ? "korean" : "english";
    const validLevels = ["all", "초등", "중등", "고등"];
    const validPlayerLevels = ["초등", "중등", "고등"];
    currentStudy = study;
    activeLevel = !koreanPage && validLevels.includes(state.level) ? state.level : "all";
    currentPage = Number.isInteger(state.pageNumber) && state.pageNumber > 0 ? state.pageNumber : 1;
    search.value = typeof state.query === "string" ? state.query : "";
    selectedVocabularyIndex = Number.isInteger(state.selectedVocabularyIndex) && state.selectedVocabularyIndex >= 0 ?
      state.selectedVocabularyIndex : -1;
    playerLevel = validPlayerLevels.includes(state.playerLevel) ? state.playerLevel : "초등";
    playerMode = state.playerMode === "word-meaning" ? "word-meaning" : "word-meaning-example";
    verbSearch.value = typeof state.verbQuery === "string" ? state.verbQuery : "";
    lastAutoVerbWord = typeof state.autoVerbWord === "string" ? state.autoVerbWord : "";
    restoringStudyState = true;
    setPage(state.page);
    restoringStudyState = false;
    selectedVocabularyIndex = Number.isInteger(state.selectedVocabularyIndex) && state.selectedVocabularyIndex >= 0 ?
      state.selectedVocabularyIndex : -1;
    document.querySelectorAll(".filter-chip").forEach(function (button) {
      button.classList.toggle("selected", button.dataset.level === activeLevel);
    });
    document.querySelectorAll(".player-level").forEach(function (button) {
      button.classList.toggle("selected", button.dataset.playerLevel === playerLevel);
    });
    if (["player", "ko-player", "ko-expression-player", "english-expression-player"].includes(state.page)) {
      const savedWordIndex = playerWords.findIndex(function (item) { return item.word === state.playerWord; });
      const requestedIndex = Number.isInteger(state.playerIndex) ? state.playerIndex : 0;
      playerIndex = savedWordIndex >= 0 ? savedWordIndex : Math.min(Math.max(requestedIndex, 0), playerWords.length - 1);
      updatePlayerCard();
      setPlayerMode(playerMode);
    } else if (currentPageView === "vocabulary" || currentPageView === "ko-vocabulary") {
      renderWords();
      const selectedCard = list.children[selectedVocabularyIndex % PAGE_SIZE];
      if (selectedCard && selectedVocabularyIndex >= 0) selectedCard.scrollIntoView({ block: "center" });
    }
    if (state.page === "verb-forms") renderVerbForms();
    if (Number.isFinite(state.scrollY) && state.scrollY > 0) {
      window.requestAnimationFrame(function () { window.scrollTo(0, state.scrollY); });
    }
    saveStudyState();
  }

  function updateResumeStudyButtons() {
    [
      ["english", document.getElementById("resume-english-study")],
      ["korean", document.getElementById("resume-korean-study")]
    ].forEach(function (entry) {
      const study = entry[0];
      const button = entry[1];
      const state = studyStates[study];
      button.disabled = !state;
      if (!state) {
        button.textContent = "마지막 공부 화면";
        return;
      }
      const pageNumber = Number.isInteger(state.pageNumber) && state.pageNumber > 0 ? state.pageNumber : 1;
      const playerItemNumber = Number.isInteger(state.playerIndex) && state.playerIndex >= 0 ?
        state.playerIndex + 1 : 1;
      const playerWordLabel = playerItemNumber + "번 " +
        (state.playerWord || playerItemNumber + "번째 단어");
      const vocabularyPageLabel = study === "english" ?
        "필수 단어 · " + (state.level === "all" ? "전체" : state.level || "전체") + " " + pageNumber + "페이지" :
        "한글 필수 단어 " + pageNumber + "페이지";
      const pageLabels = {
        vocabulary: vocabularyPageLabel,
        "ko-vocabulary": vocabularyPageLabel,
        player: "단어 재생 · " + (state.playerLevel || "초등") + " · " + playerWordLabel,
        "ko-player": "단어 재생 · " + playerWordLabel,
        "ko-expressions": "일상생활 표현 " + pageNumber + "페이지",
        "ko-expression-player": "표현 재생 · " + playerItemNumber + "번 " +
          (state.playerWord || playerItemNumber + "번째 표현"),
        "verb-forms": "동사 변화",
        "english-expressions": "필수 표현",
        "english-expression-player": "표현 재생 · " + playerItemNumber + "번 " +
          (state.playerWord || playerItemNumber + "번째 표현"),
        "english-game": "영어 연습 게임",
        "speaking": "스피킹 대비",
        "opic": "주제별 질문 목록",
        "opic-basic": "기초 답변 훈련",
        "opic-mock": "오픽 실전 연습",
        "ko-game": "연습 게임"
      };
      button.textContent = "마지막 공부 화면 · " + (pageLabels[state.page] || "학습 화면");
    });
  }

  function vietnamesePronunciation(koreanText) {
    const initials = ["", "k", "n", "t", "t", "l", "m", "b", "p", "s", "x", "", "ch", "ch", "ch", "kh", "th", "ph", "h"];
    const vowels = ["a", "e", "ya", "ye", "ơ", "e", "yơ", "ye", "ô", "oa", "oe", "uê", "yô", "u", "uơ", "uê", "ui", "yu", "ư", "ưi", "i"];
    const finals = ["", "k", "k", "k", "n", "n", "n", "t", "l", "k", "m", "l", "l", "l", "p", "l", "m", "p", "p", "t", "t", "ng", "t", "t", "k", "t", "p", "t"];
    const linkedInitials = { 1: 0, 2: 1, 3: 0, 4: 2, 5: 2, 6: 2, 7: 3, 8: 5, 9: 0, 10: 6, 11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 6, 17: 7, 18: 7, 19: 9, 20: 10, 21: 11, 22: 12, 23: 14, 24: 15, 25: 16, 26: 17, 27: 18 };
    const syllables = Array.from(String(koreanText || "")).map(function (character) {
      const code = character.charCodeAt(0) - 0xac00;
      if (code < 0 || code > 11171) return { character: character };
      return { initial: Math.floor(code / 588), vowel: Math.floor((code % 588) / 28), final: code % 28 };
    });
    for (let index = 0; index < syllables.length - 1; index += 1) {
      const current = syllables[index];
      const next = syllables[index + 1];
      if (current.initial === undefined || next.initial === undefined || !current.final) continue;
      if (next.initial === 11 && linkedInitials[current.final] !== undefined) {
        next.initial = linkedInitials[current.final];
        current.final = 0;
      } else if ([2, 6].includes(next.initial)) {
        if ([1, 2, 3, 9, 24].includes(current.final)) current.final = 21;
        else if ([7, 19, 20, 22, 23, 25, 27].includes(current.final)) current.final = 4;
        else if ([17, 18, 26].includes(current.final)) current.final = 16;
      }
    }
    return syllables.map(function (syllable) {
      if (syllable.character !== undefined) return syllable.character;
      return initials[syllable.initial] + vowels[syllable.vowel] + finals[syllable.final];
    }).join(" ").replace(/\s+([?!.,])/g, "$1");
  }

  function createSpeechUtterance(text, language) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language || "en-US";
    utterance.rate = utterance.lang.toLowerCase().startsWith("ko") ? 0.9 : 0.88;
    const requestedLanguage = utterance.lang.toLowerCase();
    const languageBase = requestedLanguage.split("-")[0];
    const voices = speech.getVoices();
    const matchingVoices = voices.filter(function (voice) {
      return voice.lang.toLowerCase() === requestedLanguage;
    });
    utterance.voice = matchingVoices.find(function (voice) {
      return /natural|neural|premium/i.test(voice.name);
    }) || matchingVoices.find(function (voice) {
      return voice.default;
    }) || matchingVoices[0] || voices.find(function (voice) {
      return voice.lang.toLowerCase().startsWith(languageBase + "-");
    }) || null;
    return utterance;
  }

  function createUtterance(text, onEnd, onError, token, language) {
    const utterance = createSpeechUtterance(text, language);
    utterance.onend = function () {
      if (token !== playbackToken) return;
      if (playbackState === "playing") onEnd();
    };
    utterance.onerror = function (event) {
      if (token !== playbackToken || event.error === "canceled" || event.error === "interrupted") return;
      onError();
    };
    speech.speak(utterance);
  }

  function setPlaybackStatus(message) {
    document.getElementById("player-status").textContent = message;
  }

  function updateVocabularyBookmarkControls() {
    const query = search.value.trim();
    const saved = bookmarks.vocabulary.some(function (bookmark) {
      return (bookmark.study || "english") === currentStudy &&
        bookmark.level === activeLevel && bookmark.page === currentPage && bookmark.query === query;
    });
    const button = document.getElementById("bookmark-current-page");
    button.textContent = saved ? "★ 페이지 책갈피 저장됨" : "☆ 이 페이지 책갈피";
    button.classList.toggle("selected", saved);
  }

  function renderBookmarkLists() {
    const vocabularyList = document.getElementById("vocabulary-bookmarks");
    vocabularyList.replaceChildren();
    bookmarks.vocabulary.forEach(function (bookmark, index) {
      if ((bookmark.study || "english") !== currentStudy) return;
      const label = (currentStudy === "korean" ? "한글 · " : "") +
        (bookmark.level === "all" ? "전체" : bookmark.level) + " · " + bookmark.page + "페이지" +
        (bookmark.query ? " · " + bookmark.query : "");
      const entry = document.createElement("span");
      entry.className = "bookmark-entry";
      const button = document.createElement("button");
      button.className = "bookmark-link";
      button.type = "button";
      button.textContent = label;
      button.title = label + "로 이동";
      button.addEventListener("click", function () {
        setPage(currentStudy === "korean" ? "ko-vocabulary" : "vocabulary");
        activeLevel = bookmark.level;
        currentPage = bookmark.page;
        selectedVocabularyIndex = -1;
        search.value = bookmark.query;
        document.querySelectorAll(".filter-chip").forEach(function (chip) {
          chip.classList.toggle("selected", chip.dataset.level === activeLevel);
        });
        renderWords();
        document.querySelector(".vocabulary-section").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      const remove = document.createElement("button");
      remove.className = "bookmark-remove";
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", label + " 책갈피 삭제");
      remove.addEventListener("click", function () {
        bookmarks.vocabulary.splice(index, 1);
        saveBookmarks();
        renderBookmarkLists();
      });
      entry.append(button, remove);
      vocabularyList.appendChild(entry);
    });

    const playerList = document.getElementById("player-bookmarks");
    playerList.replaceChildren();
    if (currentPageView !== "english-expression-player") bookmarks.player.forEach(function (bookmark, index) {
      if ((bookmark.study || "english") !== currentStudy) return;
      const entry = document.createElement("span");
      entry.className = "bookmark-entry";
      const button = document.createElement("button");
      const label = (currentStudy === "korean" ? "한글 · " : "") +
        bookmark.level + " · " + bookmark.page + "페이지 · " + bookmark.word;
      button.className = "bookmark-link";
      button.type = "button";
      button.textContent = label;
      button.title = label + "로 이동";
      button.addEventListener("click", function () {
        setPage(bookmark.type === "expression" ? "ko-expression-player" : currentStudy === "korean" ? "ko-player" : "player");
        if (currentStudy === "english") setPlayerLevel(bookmark.level);
        const bookmarkedIndex = playerWords.findIndex(function (item) { return item.word === bookmark.word; });
        playerIndex = bookmarkedIndex >= 0 ? bookmarkedIndex : Math.min(bookmark.index, playerWords.length - 1);
        updatePlayerCard();
        setPlaybackStatus("책갈피한 단어로 이동했어요. 재생을 누르면 들을 수 있어요.");
        document.getElementById("player-card").scrollIntoView({ behavior: "smooth", block: "center" });
      });
      const remove = document.createElement("button");
      remove.className = "bookmark-remove";
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", label + " 책갈피 삭제");
      remove.addEventListener("click", function () {
        bookmarks.player.splice(index, 1);
        saveBookmarks();
        renderBookmarkLists();
      });
      entry.append(button, remove);
      playerList.appendChild(entry);
    });
    if (currentPageView === "english-expression-player") {
      const phraseItems = essentialExpressionItems();
      essentialBookmarkIds().forEach(function (id) {
        const itemIndex = phraseItems.findIndex(function (item) { return item.id === id; });
        if (itemIndex < 0) return;
        const item = phraseItems[itemIndex];
        const entry = document.createElement("span");
        entry.className = "bookmark-entry";
        const button = document.createElement("button");
        button.className = "bookmark-link";
        button.type = "button";
        button.textContent = (itemIndex + 1) + ". " + item.word;
        button.addEventListener("click", function () {
          if (playbackState !== "stopped") stopPlayback();
          playerIndex = itemIndex;
          updatePlayerCard();
          setPlaybackStatus("저장한 표현으로 이동했어요. 재생을 눌러 들어 보세요.");
        });
        const remove = document.createElement("button");
        remove.className = "bookmark-remove";
        remove.type = "button";
        remove.textContent = "×";
        remove.setAttribute("aria-label", item.word + " 책갈피 삭제");
        remove.addEventListener("click", function () {
          if (saveEssentialBookmarkIds(essentialBookmarkIds().filter(function (savedId) { return savedId !== id; }))) {
            renderBookmarkLists();
          }
        });
        entry.append(button, remove);
        playerList.appendChild(entry);
      });
    }
    document.querySelector(".player-bookmark-toolbar").hidden = playerList.children.length === 0;
    updateVocabularyBookmarkControls();
    updatePlayerBookmarkControl();
    saveStudyState();
  }

  function updatePlayerBookmarkControl() {
    const item = playerWords[playerIndex];
    const button = document.getElementById("bookmark-current-word");
    const expressionPlayer = currentPageView === "ko-expression-player" || currentPageView === "english-expression-player";
    const englishExpressionPlayer = currentPageView === "english-expression-player";
    const label = expressionPlayer ? "표현" : "단어";
    const saved = englishExpressionPlayer ? !!item && essentialBookmarkIds().includes(item.id) :
      !!item && bookmarks.player.some(function (bookmark) {
      return (bookmark.study || "english") === currentStudy &&
        bookmark.level === (expressionPlayer ? "일상 표현" : currentStudy === "korean" ? "기초" : playerLevel) &&
        (bookmark.type || "word") === (expressionPlayer ? "expression" : "word") && bookmark.word === item.word;
    });
    button.textContent = saved ? "★" : "☆";
    button.classList.toggle("selected", saved);
    button.setAttribute("aria-pressed", saved ? "true" : "false");
    const actionLabel = saved ? label + " 책갈피 해제" : "현재 " + label + " 책갈피 저장";
    button.setAttribute("aria-label", actionLabel);
    button.title = actionLabel;
    button.disabled = !item;
  }

  function toggleVocabularyBookmark() {
    const query = search.value.trim();
    const index = bookmarks.vocabulary.findIndex(function (bookmark) {
      return (bookmark.study || "english") === currentStudy &&
        bookmark.level === activeLevel && bookmark.page === currentPage && bookmark.query === query;
    });
    if (index >= 0) {
      bookmarks.vocabulary.splice(index, 1);
    } else {
      bookmarks.vocabulary.unshift({ study: currentStudy, level: activeLevel, page: currentPage, query: query });
    }
    if (saveBookmarks()) {
      renderBookmarkLists();
      showToast(index >= 0 ? "페이지 책갈피를 삭제했어요." : "현재 페이지를 책갈피에 저장했어요.");
    }
  }

  function togglePlayerBookmark() {
    const item = playerWords[playerIndex];
    if (!item) return;
    if (currentPageView === "english-expression-player") {
      const ids = essentialBookmarkIds();
      const wasSaved = ids.includes(item.id);
      const updated = wasSaved ? ids.filter(function (id) { return id !== item.id; }) : [item.id].concat(ids);
      if (saveEssentialBookmarkIds(updated)) {
        renderBookmarkLists();
        showToast(wasSaved ? "표현 책갈피를 삭제했어요." : "현재 표현을 책갈피에 저장했어요.");
      }
      return;
    }
    const expressionPlayer = currentPageView === "ko-expression-player";
    const bookmarkLevel = expressionPlayer ? "일상 표현" : currentStudy === "korean" ? "기초" : playerLevel;
    const bookmarkType = expressionPlayer ? "expression" : "word";
    const index = bookmarks.player.findIndex(function (bookmark) {
      return (bookmark.study || "english") === currentStudy &&
        bookmark.level === bookmarkLevel && (bookmark.type || "word") === bookmarkType && bookmark.word === item.word;
    });
    if (index >= 0) {
      bookmarks.player.splice(index, 1);
    } else {
      bookmarks.player.unshift({
        study: currentStudy,
        level: bookmarkLevel,
        type: bookmarkType,
        index: playerIndex,
        page: Math.floor(playerIndex / PAGE_SIZE) + 1,
        word: item.word
      });
    }
    if (saveBookmarks()) {
      renderBookmarkLists();
      showToast(index >= 0 ? (expressionPlayer ? "표현 책갈피를 삭제했어요." : "단어 책갈피를 삭제했어요.") :
        (expressionPlayer ? "현재 표현을 책갈피에 저장했어요." : "현재 단어를 책갈피에 저장했어요."));
    }
  }

  function updatePlayerCard() {
    if (!playerWords.length) return;
    const item = playerWords[playerIndex];
    const expressionPlayer = currentPageView === "ko-expression-player" || currentPageView === "english-expression-player";
    document.getElementById("player-item-select").value = String(playerIndex);
    document.getElementById("player-level-label").textContent = item.level;
    document.getElementById("player-word").textContent = item.word;
    const vietnamesePronunciationDisplay = document.getElementById("player-vietnamese-pronunciation");
    vietnamesePronunciationDisplay.hidden = currentStudy !== "korean";
    if (currentStudy === "korean") {
      vietnamesePronunciationDisplay.textContent = "베트남어식(근사) · " + vietnamesePronunciation(item.word);
      document.getElementById("player-ipa").textContent = "로마자 · " + item.ipa;
    } else {
      document.getElementById("player-ipa").textContent = item.ipa;
    }
    document.getElementById("player-ipa").hidden = currentPageView === "english-expression-player";
    document.getElementById("player-meaning").textContent = item.meaning;
    document.getElementById("player-example").textContent = item.exampleReviewed === false ?
      "예문 검수 중 · 자동 생성 문장은 학습 오류를 방지하기 위해 숨겼습니다." : item.example;
    document.getElementById("player-example-translation").textContent =
      item.exampleReviewed === false ? "" : item.exampleKo;
    document.getElementById("player-other-senses").innerHTML = (item.otherSenses || []).map(function (sense) {
      return '<div><span class="other-sense-label">다른 뜻</span> ' + escapeHtml(sense.meaning) + '</div>';
    }).join("");
    document.getElementById("player-example-extra").innerHTML = (item.otherSenses || []).map(function (sense) {
      return '<div><span class="other-example-label">' + escapeHtml(sense.meaning) + '</span>' +
        escapeHtml(sense.example) + '<span class="player-sense-translation">' + escapeHtml(sense.exampleKo) + '</span></div>';
    }).join("");
    document.getElementById("player-progress").textContent =
      (playerIndex + 1) + " / " + playerWords.length + (expressionPlayer ? " 표현" : " 단어");
    document.getElementById("player-progress-bar").style.width =
      ((playerIndex + 1) / playerWords.length * 100) + "%";
    updatePlayerBookmarkControl();
    saveStudyState();
  }

  function updatePlaybackButton() {
    const button = document.getElementById("toggle-playback");
    if (playbackState === "playing") {
      button.innerHTML = "■ <span>정지</span>";
      button.title = "재생을 멈춥니다.";
    } else {
      button.innerHTML = "▶ <span>재생</span>";
      button.title = "";
    }
  }

  function stopPlayback(message) {
    playbackToken += 1;
    cancelCardPlayback();
    window.clearTimeout(advanceTimer);
    if (wordRepeatTimer !== null) {
      window.clearTimeout(wordRepeatTimer);
      wordRepeatTimer = null;
    }
    if (speech) speech.cancel();
    playbackState = "stopped";
    updatePlaybackButton();
    if (message) setPlaybackStatus(message);
  }

  function playbackError() {
    stopPlayback("음성 재생 중 문제가 생겼어요. 다시 재생해 주세요.");
    showToast("음성 재생을 완료하지 못했어요.");
  }

  function playCurrentItem() {
    if (!speech) {
      stopPlayback("이 브라우저는 음성 재생을 지원하지 않아요.");
      showToast("이 브라우저에서는 음성 재생을 지원하지 않아요.");
      return;
    }
    const item = playerWords[playerIndex];
    const itemLabel = ["ko-expression-player", "english-expression-player"].includes(currentPageView) ? "표현" : "단어";
    const objectParticle = ["ko-expression-player", "english-expression-player"].includes(currentPageView) ? "을" : "를";
    if (!item) {
      stopPlayback("재생할 " + itemLabel + "가 없어요.");
      return;
    }
    const token = ++playbackToken;
    setPlaybackStatus(itemLabel + objectParticle + " 재생하고 있어요.");
    updatePlayerCard();
    speech.cancel();

    function playMeaning() {
      if (token !== playbackToken || playbackState !== "playing") return;
      setPlaybackStatus("뜻을 재생하고 있어요.");
      createUtterance(item.meaning, function () {
        if (playerMode === "word-meaning-example") {
          playExampleAt(item, 0, token);
        } else {
          finishPlayerItem(token);
        }
      }, playbackError, token, currentStudy === "korean" ? "vi-VN" : "ko-KR");
    }

    function playWord(reading) {
      if (token !== playbackToken || playbackState !== "playing") return;
      setPlaybackStatus((itemLabel === "표현" ? "표현" : "단어") + " " + reading + " / 3회 재생 중");
      createUtterance(item.word, function () {
        if (reading < 3) {
          // Count two seconds from the end of the current pronunciation on every listening page.
          wordRepeatTimer = window.setTimeout(function () {
            wordRepeatTimer = null;
            if (token === playbackToken && playbackState === "playing") playWord(reading + 1);
          }, 2000);
        } else {
          playMeaning();
        }
      }, playbackError, token, currentStudy === "korean" ? "ko-KR" : "en-US");
    }

    playWord(1);
  }

  function finishPlayerItem(token) {
    const advance = function () {
      advanceTimer = null;
      if (token !== playbackToken || playbackState === "stopped") return;
      if (playerIndex + 1 >= playerWords.length) {
        stopPlayback("학습 " + (["ko-expression-player", "english-expression-player"].includes(currentPageView) ? "표현을" : "단어를") + " 모두 재생했어요.");
        return;
      }
      playerIndex += 1;
      playCurrentItem();
    };
    advanceTimer = window.setTimeout(advance, 500);
  }

  function playExampleAt(item, exampleIndex, token, reading) {
    const exampleLanguage = currentStudy === "korean" ? "ko-KR" : "en-US";
    const translationLanguage = currentStudy === "korean" ? "vi-VN" : "ko-KR";
    const examplesForItem = [
      { text: item.example, language: exampleLanguage, isTranslation: false },
      { text: item.exampleKo, language: translationLanguage, isTranslation: true }
    ];
    (item.otherSenses || []).forEach(function (sense) {
      examplesForItem.push(
        { text: sense.example, language: exampleLanguage, isTranslation: false },
        { text: sense.exampleKo, language: translationLanguage, isTranslation: true }
      );
    });
    const spokenExamples = examplesForItem.filter(function (example) { return example.text; });
    if (exampleIndex >= spokenExamples.length) {
      finishPlayerItem(token);
      return;
    }
    const example = spokenExamples[exampleIndex];
    if (example.isTranslation) {
      setPlaybackStatus(currentStudy === "korean" ? "베트남어 번역을 재생하고 있어요." : "한글 뜻을 재생하고 있어요.");
    } else {
      const prefix = exampleIndex < 2 ? "예문" : "다른 뜻의 예문";
      setPlaybackStatus(prefix + " " + (reading || 1) + " / 2회 재생 중");
    }
    createUtterance(example.text, function () {
      if (token !== playbackToken || playbackState !== "playing") return;
      if (!example.isTranslation && reading !== 2) {
        // Repeat each original-language example after a 2-second pause.
        // Translated examples remain single-read.
        wordRepeatTimer = window.setTimeout(function () {
          wordRepeatTimer = null;
          if (token === playbackToken && playbackState === "playing") {
            playExampleAt(item, exampleIndex, token, 2);
          }
        }, 2000);
      } else {
        playExampleAt(item, exampleIndex + 1, token);
      }
    }, playbackError, token, example.language);
  }

  function togglePlayback() {
    if (!speech) {
      showToast("이 브라우저에서는 음성 재생을 지원하지 않아요.");
      return;
    }
    if (playbackState === "playing") {
      stopPlayback("재생을 멈췄어요.");
      return;
    }
    if (playerIndex >= playerWords.length) playerIndex = 0;
    playbackState = "playing";
    playCurrentItem();
    updatePlaybackButton();
  }

  function movePlayer(offset) {
    if (!playerWords.length) return;
    const wasPlaying = playbackState === "playing";
    stopPlayback();
    playerIndex = Math.min(Math.max(0, playerIndex + offset), playerWords.length - 1);
    updatePlayerCard();
    const itemLabel = ["ko-expression-player", "english-expression-player"].includes(currentPageView) ? "표현" : "단어";
    const objectParticle = ["ko-expression-player", "english-expression-player"].includes(currentPageView) ? "을" : "를";
    setPlaybackStatus(wasPlaying ? "다음 " + itemLabel + objectParticle + " 재생하고 있어요." :
      "선택한 " + itemLabel + objectParticle + " 들으려면 재생을 누르세요.");
    if (wasPlaying) {
      playbackState = "playing";
      playCurrentItem();
    }
  }

  function setPlayerMode(mode) {
    if (mode !== "word-meaning" && mode !== "word-meaning-example") return;
    if (playbackState !== "stopped") {
      stopPlayback("재생 내용을 변경했어요.");
    }
    playerMode = mode;
    document.querySelectorAll(".player-mode-button").forEach(function (button) {
      button.classList.toggle("selected", button.dataset.playerMode === mode);
      button.setAttribute("aria-pressed", button.dataset.playerMode === mode ? "true" : "false");
    });
    const label = ["ko-expression-player", "english-expression-player"].includes(currentPageView) ? "표현" : "단어";
    setPlaybackStatus(mode === "word-meaning" ? label + "과 뜻만 재생합니다." : label + ", 뜻, 예문을 재생합니다.");
    saveStudyState();
  }

  function cancelCardPlayback() {
    // Invalidate speech callbacks and any 2-second repeat waiting period.
    cardSpeechToken += 1;
    if (cardRepeatTimer !== null) {
      window.clearTimeout(cardRepeatTimer);
      cardRepeatTimer = null;
    }
    if (activeButton) activeButton.classList.remove("playing");
    activeButton = null;
  }

  function makeCard(item, itemNumber) {
    const card = document.createElement("article");
    card.className = "word-card";
    const levelClass = item.level === "중등" ? "middle" : item.level === "고등" ? "high" : "";
    card.innerHTML =
      '<div class="word-primary">' +
        '<span class="word-number">' + itemNumber + '</span>' +
        '<span class="word-level ' + levelClass + '">' + escapeHtml(item.level) + '</span>' +
        '<strong class="word-title">' + escapeHtml(item.word) + '</strong>' +
        '<div class="word-pronunciation">' +
          (currentStudy === "korean" ? '<span class="word-pronunciation-vi">베트남어식(근사) · ' +
            escapeHtml(vietnamesePronunciation(item.word)) + '</span>' : "") +
          '<span class="word-ipa">' + (currentStudy === "korean" ? "로마자 · " : "") +
            escapeHtml(item.ipa) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="word-meaning"><span class="word-meaning-label">' +
        (currentStudy === "korean" ? "베트남어 뜻" : "뜻") + '</span>' + escapeHtml(item.meaning) +
        (item.otherSenses || []).map(function (sense) {
          return '<span class="word-meaning-extra"><strong>다른 뜻</strong> ' + escapeHtml(sense.meaning) + '</span>';
        }).join("") +
      '</div>' +
      '<div class="word-example">' +
        '<span class="example-label">' + (currentStudy === "korean" ? "예문" : "EXAMPLE") + '</span>' +
        (item.exampleReviewed === false ?
          '<span class="example-en example-pending">예문 검수 중 · 자동 생성 문장은 숨겼습니다.</span>' :
          '<span class="example-en">' + escapeHtml(item.example) + '</span>' +
          '<span class="example-translation">' + escapeHtml(item.exampleKo) + '</span>') +
        (item.otherSenses || []).map(function (sense) {
          return '<span class="word-extra-example"><strong>' + escapeHtml(sense.meaning) + '</strong> · ' +
            escapeHtml(sense.example) + '<span class="example-translation">' + escapeHtml(sense.exampleKo) + '</span></span>';
        }).join("") +
      '</div>' +
      '<button class="play-button" type="button" aria-label="' + escapeHtml(item.word) + " " +
        (currentStudy === "korean" ? "한국어 단어와 베트남어 뜻" : "영어 단어와 한국어 뜻") + ' 듣기">' +
        '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3 2.7c0-.7.8-1.1 1.4-.7l8.2 5.1a1 1 0 0 1 0 1.7l-8.2 5.1a.9.9 0 0 1-1.4-.8V2.7Z"/></svg>' +
      '</button>';
    const button = card.querySelector(".play-button");
    card.tabIndex = 0;
    card.setAttribute("aria-label", itemNumber + "번 " + item.word +
      " 카드. 단어 또는 표현을 세 번, 예문을 두 번 들은 뒤 뜻과 해석 듣기");
    card.addEventListener("click", function (event) {
      if (event.target.closest("button, a, select, input")) return;
      button.click();
    });
    card.addEventListener("keydown", function (event) {
      if (event.target !== card || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      button.click();
    });
    button.addEventListener("click", function () {
      if (!speech) {
        showToast("이 브라우저에서는 음성 재생을 지원하지 않아요.");
        return;
      }
      cancelCardPlayback();
      speech.cancel();
      activeButton = button;
      button.classList.add("playing");
      const token = cardSpeechToken;
      const wordLanguage = currentStudy === "korean" ? "ko-KR" : "en-US";
      const meaningLanguage = currentStudy === "korean" ? "vi-VN" : "ko-KR";
      // Repeat the headword 3 times and each original-language example 2 times.
      // Definitions and translations remain single-read.
      const spokenParts = [
        { text: item.word, language: wordLanguage, waitAfter: true },
        { text: item.word, language: wordLanguage, waitAfter: true },
        { text: item.word, language: wordLanguage }
      ];
      spokenParts.push(
        { text: item.meaning, language: meaningLanguage },
        { text: item.example, language: wordLanguage, waitAfter: true },
        { text: item.example, language: wordLanguage },
        { text: item.exampleKo, language: meaningLanguage }
      );
      (item.otherSenses || []).forEach(function (sense) {
        spokenParts.push(
          { text: sense.meaning, language: meaningLanguage },
          { text: sense.example, language: wordLanguage, waitAfter: true },
          { text: sense.example, language: wordLanguage },
          { text: sense.exampleKo, language: meaningLanguage }
        );
      });
      const validSpokenParts = spokenParts.filter(function (part) { return part.text; });
      function speakPart(index) {
        if (token !== cardSpeechToken) return;
        if (index >= validSpokenParts.length) {
          button.classList.remove("playing");
          if (activeButton === button) activeButton = null;
          return;
        }
        const part = validSpokenParts[index];
        const utterance = createSpeechUtterance(part.text, part.language);
        utterance.onend = function () {
          if (token !== cardSpeechToken) return;
          if (part.waitAfter) {
            cardRepeatTimer = window.setTimeout(function () {
              cardRepeatTimer = null;
              speakPart(index + 1);
            }, 2000);
          } else {
            speakPart(index + 1);
          }
        };
        utterance.onerror = function (event) {
          if (token !== cardSpeechToken) return;
          cancelCardPlayback();
          if (event.error === "canceled" || event.error === "interrupted") return;
          speech.cancel();
          showToast("단어와 뜻을 모두 재생하지 못했어요. 다시 눌러 주세요.");
        };
        speech.speak(utterance);
      }
      speakPart(0);
    });
    return card;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function renderPagination(pageCount) {
    pagination.replaceChildren();
    if (pageCount <= 1) return;

    const pageSelect = document.createElement("select");
    pageSelect.className = "page-select";
    pageSelect.setAttribute("aria-label", "페이지 선택");
    for (let page = 1; page <= pageCount; page += 1) {
      const option = document.createElement("option");
      option.value = String(page);
      option.textContent = page + " 페이지";
      option.selected = page === currentPage;
      pageSelect.appendChild(option);
    }
    pageSelect.addEventListener("change", function () {
      goToPage(Number(pageSelect.value));
    });
    pagination.appendChild(pageSelect);

    function addPageButton(text, label, targetPage, disabled) {
      const button = document.createElement("button");
      button.className = "page-button";
      button.textContent = text;
      button.setAttribute("aria-label", label);
      button.disabled = disabled;
      button.addEventListener("click", function () { goToPage(targetPage); });
      pagination.appendChild(button);
    }

    addPageButton("-10", "10페이지 이전", Math.max(1, currentPage - PAGE_JUMP), currentPage === 1);
    const previous = document.createElement("button");
    previous.className = "page-button";
    previous.textContent = "‹";
    previous.setAttribute("aria-label", "이전 페이지");
    previous.disabled = currentPage === 1;
    previous.addEventListener("click", function () { goToPage(currentPage - 1); });
    pagination.appendChild(previous);

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(pageCount, start + 4);
    start = Math.max(1, end - 4);
    for (let page = start; page <= end; page += 1) {
      const button = document.createElement("button");
      button.className = "page-button" + (page === currentPage ? " current" : "");
      button.textContent = String(page);
      button.setAttribute("aria-label", page + " 페이지");
      if (page === currentPage) button.setAttribute("aria-current", "page");
      button.addEventListener("click", function () { goToPage(page); });
      pagination.appendChild(button);
    }

    const next = document.createElement("button");
    next.className = "page-button";
    next.textContent = "›";
    next.setAttribute("aria-label", "다음 페이지");
    next.disabled = currentPage === pageCount;
    next.addEventListener("click", function () { goToPage(currentPage + 1); });
    pagination.appendChild(next);
    addPageButton("+10", "10페이지 다음", Math.min(pageCount, currentPage + PAGE_JUMP), currentPage === pageCount);
    addPageButton("끝 " + pageCount, "마지막 페이지 " + pageCount + "로 이동", pageCount, currentPage === pageCount);
  }

  function goToPage(page) {
    selectedVocabularyIndex = -1;
    currentPage = Math.max(1, Math.floor(page));
    renderWords();
    document.querySelector(".vocabulary-section").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderVocabularyItemOptions(filtered, expressionStudy) {
    const navigation = document.getElementById("vocabulary-item-navigation");
    const select = document.getElementById("vocabulary-item-select");
    const showingVocabulary = currentPageView === "vocabulary" || currentPageView === "ko-vocabulary";
    navigation.hidden = !showingVocabulary && !expressionStudy;
    select.replaceChildren();
    select.setAttribute("aria-label", expressionStudy ? "번호로 한국어 표현 이동" :
      currentStudy === "korean" ? "번호로 한국어 단어 이동" : "번호로 영어 단어 이동");
    if (navigation.hidden) {
      select.disabled = true;
      return;
    }
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = expressionStudy ? "번호로 표현 이동" : "번호로 단어 이동";
    select.appendChild(placeholder);
    filtered.forEach(function (item, index) {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = (index + 1) + ". " + item.word;
      option.selected = index === selectedVocabularyIndex;
      select.appendChild(option);
    });
    select.disabled = filtered.length === 0;
  }

  function renderWords() {
    const query = search.value.trim().toLocaleLowerCase("ko");
    const expressionStudy = currentPageView === "ko-expressions";
    const studyWords = expressionStudy ? koreanExpressions : currentStudy === "korean" ? koreanWords : words;
    const filtered = studyWords.filter(function (item) {
      const matchesLevel = currentStudy === "korean" || activeLevel === "all" || item.level === activeLevel;
      const otherMeanings = (item.otherSenses || []).map(function (sense) { return sense.meaning; }).join(" ");
      const searchable = (item.word + " " + item.meaning + " " + item.example + " " + item.exampleKo + " " + otherMeanings).toLocaleLowerCase("ko");
      return matchesLevel && searchable.includes(query);
    });
    const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
    currentPage = Math.min(Math.max(1, currentPage), Math.max(1, pageCount));
    renderVocabularyItemOptions(filtered, expressionStudy);
    const start = (currentPage - 1) * PAGE_SIZE;
    list.replaceChildren();
    filtered.slice(start, start + PAGE_SIZE).forEach(function (item, index) {
      list.appendChild(makeCard(item, start + index + 1));
    });
    const individualExampleCount = filtered.filter(function (item) { return item.exampleReviewed !== false; }).length;
    resultCount.textContent = (expressionStudy ? filtered.length + "개 표현 · 베트남어 번역" :
      currentStudy === "korean" ? filtered.length + "개 단어 · 베트남어 뜻" : filtered.length + "개 단어") +
      " · 개별 예문 " + individualExampleCount + "개 · 검수 중 " + (filtered.length - individualExampleCount) + "개";
    if (currentPageView === "vocabulary" || currentPageView === "ko-vocabulary") {
      breadcrumbLevel.textContent = currentStudy === "korean" ? "필수 단어" : levelNames[activeLevel];
    }
    if (expressionStudy) breadcrumbLevel.textContent = "일상생활 표현";
    emptyState.hidden = filtered.length > 0;
    list.hidden = filtered.length === 0;
    renderPagination(pageCount);
    updateVocabularyBookmarkControls();
    saveStudyState();
  }

  function getFilteredVerbForms() {
    const query = verbSearch.value.trim().toLocaleLowerCase("ko");
    return verbForms.filter(function (row) {
      return row.join(" ").toLocaleLowerCase("ko").includes(query);
    }).sort(function (a, b) { return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0; });
  }

  function getSpokenVerbForms(row) {
    const presentForms = row[1].split("/").map(function (form) { return form.trim(); });
    const pastForms = row[2].split("/").map(function (form) { return form.trim(); });
    const participleForms = row[3].split("/").map(function (form) { return form.trim(); });
    const spokenForms = presentForms.concat(pastForms, participleForms);
    if (row[0] === "read") spokenForms.splice(presentForms.length, pastForms.length + participleForms.length, "red", "red");
    return spokenForms;
  }

  function renderVerbForms() {
    const filtered = getFilteredVerbForms();
    verbTableBody.replaceChildren();
    filtered.forEach(function (row, index) {
      verbTableBody.appendChild(createVerbTableRow(row, true, index + 1));
    });
    verbResultCount.textContent = filtered.length + "개 동사";
    verbEmpty.hidden = filtered.length > 0;
    const lastAutoRow = !verbAutoPlaying && lastAutoVerbWord ?
      filtered.find(function (row) { return row[0] === lastAutoVerbWord; }) : null;
    if (lastAutoRow) {
      const rowIndex = filtered.indexOf(lastAutoRow);
      updateVerbAutoCurrentRow(lastAutoRow, rowIndex + 1);
      document.getElementById("verb-auto-status").textContent =
        "마지막 자동 재생 위치 · " + (rowIndex + 1) + "/" + filtered.length + " · " + lastAutoRow[0];
    } else if (!verbAutoPlaying) {
      updateVerbAutoCurrentRow(null);
      document.getElementById("verb-auto-status").textContent = "";
    }
    saveStudyState();
  }

  function createVerbTableRow(row, interactive, rowNumber) {
    const tr = document.createElement("tr");
    const cells = [
      ["뜻", row[4]],
      ["현재형", row[1]],
      ["과거형", row[2]],
      ["과거분사", row[3]]
    ];
    cells.forEach(function (cell, index) {
      const td = document.createElement("td");
      td.dataset.label = cell[0];
      if (index === 0 && rowNumber) {
        const number = document.createElement("span");
        number.className = "verb-row-number";
        number.textContent = String(rowNumber);
        td.appendChild(number);
      }
      if (index === 0) {
        const label = document.createElement("span");
        label.className = "verb-meaning-mobile-label";
        label.textContent = cell[0];
        td.appendChild(label);
      }
      td.appendChild(document.createTextNode(cell[1].trim()));
      tr.appendChild(td);
    });
    if (interactive) {
      const spokenForms = getSpokenVerbForms(row);
      tr.tabIndex = 0;
      tr.setAttribute("aria-label", row[0] + " 동사 변화와 뜻 발음 듣기");
      tr.addEventListener("click", function () {
        stopVerbAuto(false);
        playVerbForms(spokenForms, row[4]);
      });
      tr.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          stopVerbAuto(false);
          playVerbForms(spokenForms, row[4]);
        }
      });
    } else {
      tr.className = "verb-auto-highlight";
    }
    return tr;
  }

  function updateVerbAutoCurrentRow(row, rowNumber) {
    const preview = document.getElementById("verb-auto-current");
    const previewRow = document.getElementById("verb-auto-current-row");
    previewRow.replaceChildren();
    if (!row) {
      preview.hidden = true;
      return;
    }
    previewRow.appendChild(createVerbTableRow(row, false, rowNumber));
    preview.hidden = false;
  }

  function updateVerbAutoButton() {
    const button = document.getElementById("auto-play-verbs");
    button.textContent = verbAutoPlaying ? "■ 자동 재생 멈추기" : "▶ 동사 변화 자동 재생";
    button.setAttribute("aria-pressed", verbAutoPlaying ? "true" : "false");
  }

  function stopVerbAuto(cancelSpeech) {
    verbAutoPlaying = false;
    verbAutoRows = [];
    window.clearTimeout(verbAutoTimer);
    verbSpeechToken += 1;
    if (cancelSpeech && speech) speech.cancel();
    updateVerbAutoButton();
    document.getElementById("verb-auto-status").textContent = "";
    updateVerbAutoCurrentRow(null);
  }

  function startVerbAuto() {
    if (verbAutoPlaying) {
      stopVerbAuto(true);
      return;
    }
    if (!speech || typeof SpeechSynthesisUtterance === "undefined") {
      showToast("이 브라우저에서는 음성 재생을 지원하지 않아요.");
      return;
    }
    verbAutoRows = getFilteredVerbForms();
    if (!verbAutoRows.length) {
      showToast("자동 재생할 동사가 없어요.");
      return;
    }
    verbAutoPlaying = true;
    const savedIndex = verbAutoRows.findIndex(function (row) { return row[0] === lastAutoVerbWord; });
    verbAutoIndex = savedIndex >= 0 ? savedIndex : 0;
    updateVerbAutoButton();
    playNextAutoVerb();
  }

  function playNextAutoVerb() {
    if (!verbAutoPlaying) return;
    if (verbAutoIndex >= verbAutoRows.length) {
      stopVerbAuto(false);
      document.getElementById("verb-auto-status").textContent = "검색된 동사를 모두 재생했어요.";
      return;
    }
    const row = verbAutoRows[verbAutoIndex];
    lastAutoVerbWord = row[0];
    updateVerbAutoCurrentRow(row, verbAutoIndex + 1);
    document.getElementById("verb-auto-status").textContent =
      "자동 재생 중 · " + (verbAutoIndex + 1) + "/" + verbAutoRows.length;
    saveStudyState();
    speech.cancel();
    playVerbForms(getSpokenVerbForms(row), row[4], function () {
      if (!verbAutoPlaying) return;
      verbAutoIndex += 1;
      verbAutoTimer = window.setTimeout(playNextAutoVerb, 450);
    }, function () {
      stopVerbAuto(false);
    });
  }

  function playVerbForms(forms, meaning, onComplete, onError) {
    if (!speech || typeof SpeechSynthesisUtterance === "undefined") {
      showToast("이 브라우저에서는 음성 재생을 지원하지 않아요.");
      return;
    }
    speech.cancel();
    const token = ++verbSpeechToken;
    let index = -1;
    function speakNext() {
      if (token !== verbSpeechToken) return;
      if (index >= forms.length) {
        if (onComplete) onComplete();
        return;
      }
      const isMeaning = index === -1;
      const utterance = createSpeechUtterance(isMeaning ? meaning : forms[index], isMeaning ? "ko-KR" : "en-US");
      utterance.onend = function () {
        if (token !== verbSpeechToken) return;
        index += 1;
        speakNext();
      };
      utterance.onerror = function (event) {
        if (token !== verbSpeechToken || event.error === "canceled" || event.error === "interrupted") return;
        verbSpeechToken += 1;
        showToast(isMeaning ? "동사 뜻을 재생하지 못했어요." : "동사 발음을 재생하지 못했어요. 다시 눌러 주세요.");
        if (onError) onError();
      };
      speech.speak(utterance);
    }
    speakNext();
  }

  function setLevel(level) {
    if (level === activeLevel) return;
    saveStudyState();
    activeLevel = level;
    const saved = currentPageView === "vocabulary" ? vocabularyLevelStates[level] : null;
    currentPage = saved && Number.isInteger(saved.pageNumber) && saved.pageNumber > 0 ? saved.pageNumber : 1;
    search.value = saved && typeof saved.query === "string" ? saved.query : "";
    selectedVocabularyIndex = saved && Number.isInteger(saved.selectedVocabularyIndex) ? saved.selectedVocabularyIndex : -1;
    document.querySelectorAll(".filter-chip").forEach(function (button) {
      button.classList.toggle("selected", button.dataset.level === level);
    });
    renderWords();
  }

  function setPage(page) {
    if (page === currentPageView) return;
    if (page === "sync" && !restoringStudyState) syncReturnPage = currentPageView || "home";
    // Capture before restore-state recursion so an Android back action returns to
    // the actual previous screen rather than forcing the user to the home page.
    if (page === "opic-mock" && currentPageView && currentPageView !== "opic-mock") {
      mockReturnPage = currentPageView;
    }
    if (!restoringStudyState) {
      saveStudyState();
      const savedPageState = studyStates.pages && studyStates.pages[page];
      if (savedPageState) {
        resumeStudyState(savedPageState);
        return;
      }
    }
    if (window.JINI_STUDY_TIME) window.JINI_STUDY_TIME.navigate(page);
    selectedVocabularyIndex = -1;
    if (page !== "english-expressions" && typeof window.JINI_STOP_ENGLISH_EXPRESSIONS === "function") {
      window.JINI_STOP_ENGLISH_EXPRESSIONS();
    }
    const leavingExpressions = currentPageView === "ko-expressions" || currentPageView === "ko-expression-player";
    stopPlayback("재생을 멈췄어요.");
    stopVerbAuto(true);
    if (speech) speech.cancel();
    const nextStudy = page === "home" || page === "study-info" || page === "sync" ?
      currentStudy : page.indexOf("ko-") === 0 ? "korean" : "english";
    const studyChanged = currentStudy !== nextStudy;
    currentStudy = nextStudy;
    if (studyChanged) {
      activeLevel = "all";
      currentPage = 1;
      search.value = "";
      document.querySelectorAll(".filter-chip").forEach(function (chip) {
        chip.classList.toggle("selected", chip.dataset.level === "all");
      });
    }
    if (!restoringStudyState && (page === "ko-expressions" || page === "ko-expression-player" || leavingExpressions)) {
      currentPage = 1;
      search.value = "";
    }
    currentPageView = page;
    const showingHome = page === "home";
    const showingStudyInfo = page === "study-info";
    const showingSync = page === "sync";
    const showingEssentialExpressions = page === "english-expressions";
    const playingEnglishExpressions = page === "english-expression-player";
    const showingExpressions = page === "ko-expressions";
    const playingExpressions = page === "ko-expression-player";
    const showingVocabulary = page === "vocabulary" || page === "ko-vocabulary" || showingExpressions;
    const showingPlayer = page === "player" || page === "ko-player" || playingExpressions || playingEnglishExpressions;
    const showingLanguagePacks = page === "ko-language-packs";
    const showingKoreanGame = page === "ko-game";
    const showingEnglishGame = page === "english-game";
    const showingSpeaking = page === "speaking";
    const showingOpic = page === "opic" || page === "opic-basic" || page === "opic-mock";
    const koreanStudy = currentStudy === "korean";
    document.querySelector(".sidebar").dataset.study = (showingHome || showingStudyInfo || showingSync) ? "home" : currentStudy;
    document.getElementById("home-section").hidden = !showingHome;
    document.getElementById("jini-study-info-section").hidden = !showingStudyInfo;
    document.getElementById("jini-sync-page").hidden = !showingSync;
    if (showingSync && typeof window.JINI_SYNC_PAGE_OPEN === "function") window.JINI_SYNC_PAGE_OPEN();
    document.querySelector(".vocabulary-section").hidden = !showingVocabulary;
    playerSection.hidden = !showingPlayer;
    document.getElementById("english-expressions-section").hidden = !showingEssentialExpressions;
    verbFormsSection.hidden = page !== "verb-forms";
    languagePacksSection.hidden = !showingLanguagePacks;
    document.getElementById("korean-game-section").hidden = !showingKoreanGame;
    document.getElementById("english-game-section").hidden = !showingEnglishGame;
    const speakingSection = document.getElementById("speaking-section");
    if (speakingSection) speakingSection.hidden = !showingSpeaking;
    document.getElementById("opic-list-section").hidden = page !== "opic";
    document.getElementById("opic-basic-section").hidden = page !== "opic-basic";
    document.getElementById("opic-mock-section").hidden = page !== "opic-mock";
    document.querySelector(".page-footer").hidden = showingHome || showingStudyInfo || showingSync || showingSpeaking || showingOpic;
    document.querySelectorAll(".nav-item[data-page]").forEach(function (button) {
      button.classList.toggle("active", button.dataset.page === page ||
        (button.dataset.page === "speaking" && showingOpic));
    });
    document.getElementById("sidebar-foot").innerHTML = koreanStudy ?
      "YOUR DAILY KOREAN<br><span>베트남어로 배우는 한국어</span>" :
      "YOUR DAILY ENGLISH<br><span>기초부터 차근차근</span>";
    document.getElementById("breadcrumb-section").textContent =
      showingHome ? "홈" : showingStudyInfo ? "나의 학습정보" : showingSync ? "학습정보 동기화 (테스트 중)" : koreanStudy ? "AI 한글공부" : (showingEnglishGame || showingSpeaking || showingOpic || showingEssentialExpressions || playingEnglishExpressions) ? "AI 영어공부" : showingVocabulary ? "단어 학습" : page === "player" ? "듣기 학습" : "문법 학습";
    document.getElementById("breadcrumb-divider").hidden = showingHome || showingStudyInfo || showingSync;
    breadcrumbLevel.textContent = (showingHome || showingStudyInfo || showingSync) ? "" : showingEssentialExpressions ? "필수 표현" : showingVocabulary ?
      (koreanStudy ? "필수 단어" : levelNames[activeLevel]) :
      showingPlayer ? (playingExpressions || playingEnglishExpressions ? "표현 재생" : koreanStudy ? "단어 재생" : playerLevel + " 단어 재생") :
      showingLanguagePacks ? "언어팩 설치" : showingKoreanGame ? "연습 게임" : showingEnglishGame ? "연습 게임" : showingSpeaking ? "스피킹 대비" : showingOpic ? (page === "opic-basic" ? "스피킹 대비 / 기초 답변 훈련" : page === "opic-mock" ? "스피킹 대비 / 실전 연습" : "스피킹 대비 / 주제별 질문 목록") : "동사 변화";
    document.getElementById("section-title").textContent = "필수 단어";
    if (showingExpressions) document.getElementById("section-title").textContent = "일상생활 표현";
    document.querySelector(".bookmark-toolbar").hidden = showingExpressions;
    search.placeholder = showingExpressions ? "표현 또는 번역 검색" : "단어 또는 뜻 검색";
    search.setAttribute("aria-label", showingExpressions ? "표현 또는 번역 검색" : "단어 또는 뜻 검색");
    document.getElementById("vocabulary-filters").hidden = koreanStudy;
    document.getElementById("vocabulary-hint").textContent = koreanStudy ?
      (showingExpressions ? "스피커를 눌러 한국어 표현과 베트남어 번역을 들어 보세요" :
        "스피커를 눌러 한국어 발음을 들어 보세요") : "스피커를 눌러 발음을 들어 보세요";
    document.getElementById("player-levels").hidden = koreanStudy || playingEnglishExpressions;
    document.getElementById("player-heading-title").textContent = playingEnglishExpressions ? "영어 표현 재생" : koreanStudy ? "한국어 단어 재생" : "단어 재생";
    if (playingExpressions) document.getElementById("player-heading-title").textContent = "한국어 표현 재생";
    document.getElementById("player-heading-description").textContent = playingEnglishExpressions ?
      "필수 표현 500개를 순서대로 들어 보세요. 재생을 누르면 표현·뜻·예문·해석을 이어서 들려줘요." : playingExpressions ?
      "일상생활 한국어 표현과 베트남어 뜻, 예문을 함께 익혀 보세요." : koreanStudy ?
      "한국어 단어를 듣고 베트남어 뜻과 함께 익혀 보세요." : "학년과 재생 내용을 선택하고 시작해 보세요.";
    document.getElementById("open-language-packs").hidden = !koreanStudy;
    document.getElementById("previous-word").setAttribute("aria-label", playingExpressions || playingEnglishExpressions ? "이전 표현" : "이전 단어");
    document.getElementById("next-word").setAttribute("aria-label", playingExpressions || playingEnglishExpressions ? "다음 표현" : "다음 단어");
    document.getElementById("player-item-select").setAttribute("aria-label", playingExpressions || playingEnglishExpressions ? "번호로 표현 이동" : "번호로 단어 이동");
    document.querySelector(".player-mode-button[data-player-mode='word-meaning']").textContent =
      playingEnglishExpressions ? "표현 + 뜻" : koreanStudy ? "한국어 + 베트남어 뜻" : "단어 + 뜻";
    document.querySelector(".player-mode-button[data-player-mode='word-meaning-example']").textContent =
      playingEnglishExpressions ? "표현 + 뜻 + 예문" : koreanStudy ? "한국어 + 베트남어 뜻 + 예문" : "단어 + 뜻 + 예문";
    document.querySelector(".page-footer").textContent = showingEssentialExpressions ?
      "필수 영어 표현을 예문과 함께 듣고, 나만의 문장으로 말해 보세요." : showingExpressions || playingExpressions ?
      "일상생활에서 자주 쓰는 한국어 표현을 베트남어 번역과 함께 익혀 보세요." : koreanStudy ?
      "한국어 단어를 듣고 베트남어 뜻과 함께 익혀 보세요." :
      "단어를 듣고, 예문을 따라 읽으며 나만의 영어를 만들어 보세요.";
    if (showingPlayer) {
      playerWords = playingEnglishExpressions ? essentialExpressionItems() : playingExpressions ? koreanExpressions : koreanStudy ? koreanWords :
        words.filter(function (item) { return item.level === playerLevel; });
      playerIndex = 0;
      renderPlayerItemOptions();
      updatePlayerCard();
      setPlaybackStatus(playingEnglishExpressions ? "재생을 누르면 영어 표현 500개를 순서대로 들을 수 있어요." :
        playingExpressions ? "재생을 누르면 한국어 표현을 들을 수 있어요." :
        koreanStudy ? "재생을 누르면 한국어 단어를 들을 수 있어요." : "학년을 고르고 재생을 시작해 보세요.");
    }
    renderWords();
    renderBookmarkLists();
    if (showingEssentialExpressions && typeof window.JINI_SHOW_ENGLISH_EXPRESSIONS === "function") {
      window.JINI_SHOW_ENGLISH_EXPRESSIONS();
    }
    saveStudyState();
  }

  function setPlayerLevel(level) {
    if (level === playerLevel) return;
    saveStudyState();
    if (playbackState !== "stopped") stopPlayback("학년을 변경했어요.");
    playerLevel = level;
    playerWords = words.filter(function (item) { return item.level === playerLevel; });
    const saved = playerLevelStates[level];
    const savedWordIndex = saved ? playerWords.findIndex(function (item) { return item.word === saved.playerWord; }) : -1;
    const requestedIndex = saved && Number.isInteger(saved.playerIndex) ? saved.playerIndex : 0;
    playerIndex = savedWordIndex >= 0 ? savedWordIndex : Math.max(0, Math.min(requestedIndex, playerWords.length - 1));
    renderPlayerItemOptions();
    document.querySelectorAll(".player-level").forEach(function (button) {
      button.classList.toggle("selected", button.dataset.playerLevel === level);
    });
    breadcrumbLevel.textContent = playerLevel + " 단어 재생";
    updatePlayerCard();
    setPlaybackStatus("재생을 누르면 " + playerLevel + " 단어를 현재 위치부터 들려드려요.");
    updatePlaybackButton();
  }

  function renderPlayerItemOptions() {
    const select = document.getElementById("player-item-select");
    select.replaceChildren();
    playerWords.forEach(function (item, index) {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = (index + 1) + ". " + item.word;
      select.appendChild(option);
    });
    select.disabled = playerWords.length === 0;
  }

  function leaveMockPractice() {
    if (currentPageView !== "opic-mock") return false;
    const destination = mockReturnPage && mockReturnPage !== "opic-mock" ?
      mockReturnPage : "speaking";
    setPage(destination);
    return true;
  }

  const mockBackButton = document.getElementById("opic-mock-back");
  if (mockBackButton) {
    mockBackButton.addEventListener("click", function () { leaveMockPractice(); });
  }

  // All three study menus share the same responsive dropdown behavior.
  const studyMenuGroups = Array.from(document.querySelectorAll(".opic-menu-group, .practice-menu-group"));
  function setStudyMenuOpen(group, open) {
    if (!group) return;
    const toggle = group.querySelector(".opic-menu-toggle, .practice-menu-toggle");
    if (!toggle) return;
    group.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    const label = group.querySelector(".practice-menu-header .nav-item, .opic-menu-header .nav-item");
    const name = label ? label.innerText.trim() : "하위 메뉴";
    toggle.setAttribute("aria-label", name + (open ? " 하위 메뉴 닫기" : " 하위 메뉴 열기"));
  }
  function closeOtherStudyMenus(except) {
    studyMenuGroups.forEach(function (group) {
      if (group !== except) setStudyMenuOpen(group, false);
    });
  }
  studyMenuGroups.forEach(function (group) {
    const toggle = group.querySelector(".opic-menu-toggle, .practice-menu-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      const open = !group.classList.contains("is-open");
      closeOtherStudyMenus(group);
      setStudyMenuOpen(group, open);
    });
  });
  document.getElementById("sync-back-button").addEventListener("click", function () {
    setPage(syncReturnPage);
  });
  document.querySelectorAll("[data-page]").forEach(function (button) {
    button.addEventListener("click", function () {
      const group = button.closest(".opic-menu-group, .practice-menu-group");
      const isHeader = button.parentElement && (button.parentElement.classList.contains("opic-menu-header") ||
        button.parentElement.classList.contains("practice-menu-header"));
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      if (group && isHeader && mobile) {
        // On mobile, the first tap navigates to the parent page without
        // covering it with the submenu. Only a repeat tap toggles the list.
        const alreadyOnPage = currentPageView === button.dataset.page;
        closeOtherStudyMenus(group);
        setStudyMenuOpen(group, alreadyOnPage && !group.classList.contains("is-open"));
      } else {
        closeOtherStudyMenus();
      }
      setPage(button.dataset.page);
      const mode = button.dataset.gameMode;
      if (mode) {
        document.querySelectorAll(".practice-menu-child").forEach(function (child) {
          child.classList.toggle("active", child === button);
        });
        if (button.dataset.page === "english-game" && typeof window.JINI_START_ENGLISH_GAME === "function") {
          window.JINI_START_ENGLISH_GAME(mode);
        } else if (button.dataset.page === "ko-game" && typeof window.JINI_START_KOREAN_GAME === "function") {
          window.JINI_START_KOREAN_GAME(mode);
        }
      } else {
        document.querySelectorAll(".practice-menu-child").forEach(function (child) {
          child.classList.remove("active");
        });
      }
    });
  });
  document.addEventListener("click", function (event) {
    studyMenuGroups.forEach(function (group) {
      if (!group.contains(event.target)) setStudyMenuOpen(group, false);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    const openGroup = studyMenuGroups.find(function (group) { return group.classList.contains("is-open"); });
    if (!openGroup) return;
    setStudyMenuOpen(openGroup, false);
    const toggle = openGroup.querySelector(".opic-menu-toggle, .practice-menu-toggle");
    if (toggle) toggle.focus();
  });
  document.querySelectorAll("[data-resume-study]").forEach(function (button) {
    button.addEventListener("click", function () {
      const study = button.dataset.resumeStudy;
      const state = studyStates[study];
      if (state) {
        resumeStudyState(state);
      } else {
        setPage(study === "korean" ? "ko-vocabulary" : "vocabulary");
      }
    });
  });
  document.getElementById("open-android-tts-settings").addEventListener("click", function (event) {
    if (!/Android/i.test(window.navigator.userAgent)) {
      event.preventDefault();
      showToast("이 버튼은 Android에서만 설정 메뉴를 열 수 있어요. 아래 설치 방법을 확인해 주세요.");
      return;
    }
    const fallbackUrl = window.location.href.split("#")[0] + "#android-tts-settings-unavailable";
    const fallbackIntent = "intent:#Intent;action=android.speech.tts.engine.INSTALL_TTS_DATA;" +
      "package=com.google.android.tts;" +
      "S.browser_fallback_url=" +
      encodeURIComponent(fallbackUrl) + ";end";
    event.currentTarget.href = fallbackIntent;
  });
  function showAndroidTtsFallback() {
    if (window.location.hash === "#android-tts-settings-unavailable") {
      setPage("ko-language-packs");
    }
  }
  window.addEventListener("hashchange", showAndroidTtsFallback);
  document.querySelector(".brand").addEventListener("click", function (event) {
    event.preventDefault();
    setPage("home");
  });
  document.querySelectorAll(".filter-chip").forEach(function (button) {
    button.addEventListener("click", function () { setLevel(button.dataset.level); });
  });
  document.querySelectorAll(".player-level").forEach(function (button) {
    button.addEventListener("click", function () { setPlayerLevel(button.dataset.playerLevel); });
  });
  search.addEventListener("input", function () {
    currentPage = 1;
    selectedVocabularyIndex = -1;
    renderWords();
  });
  document.getElementById("clear-search").addEventListener("click", function (event) {
    event.preventDefault();
    search.value = "";
    currentPage = 1;
    selectedVocabularyIndex = -1;
    renderWords();
    search.focus();
  });
  document.getElementById("vocabulary-item-select").addEventListener("change", function (event) {
    if (event.currentTarget.value === "") return;
    const index = Number(event.currentTarget.value);
    const filteredIndex = Number.isInteger(index) ? index : -1;
    if (filteredIndex < 0 || filteredIndex >= event.currentTarget.options.length - 1) return;
    selectedVocabularyIndex = filteredIndex;
    currentPage = Math.floor(filteredIndex / PAGE_SIZE) + 1;
    renderWords();
    const cardIndex = filteredIndex % PAGE_SIZE;
    const selectedCard = list.children[cardIndex];
    if (selectedCard) selectedCard.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  verbSearch.addEventListener("input", function () {
    if (verbAutoPlaying) stopVerbAuto(true);
    renderVerbForms();
  });
  document.getElementById("clear-verb-search").addEventListener("click", function (event) {
    event.preventDefault();
    if (verbAutoPlaying) stopVerbAuto(true);
    verbSearch.value = "";
    renderVerbForms();
    verbSearch.focus();
  });
  document.getElementById("bookmark-current-page").addEventListener("click", toggleVocabularyBookmark);
  document.getElementById("bookmark-current-word").addEventListener("click", togglePlayerBookmark);
  document.querySelectorAll(".player-mode-button").forEach(function (button) {
    button.addEventListener("click", function () { setPlayerMode(button.dataset.playerMode); });
    button.setAttribute("aria-pressed", button.dataset.playerMode === playerMode ? "true" : "false");
  });
  document.getElementById("auto-play-verbs").addEventListener("click", startVerbAuto);
  document.getElementById("toggle-playback").addEventListener("click", togglePlayback);
  document.getElementById("previous-word").addEventListener("click", function () { movePlayer(-1); });
  document.getElementById("next-word").addEventListener("click", function () { movePlayer(1); });
  document.getElementById("player-item-select").addEventListener("change", function (event) {
    const nextIndex = Number(event.currentTarget.value);
    if (!Number.isInteger(nextIndex) || nextIndex < 0 || nextIndex >= playerWords.length) return;
    const wasPlaying = playbackState === "playing";
    stopPlayback();
    playerIndex = nextIndex;
    updatePlayerCard();
    if (wasPlaying) {
      playbackState = "playing";
      playCurrentItem();
    } else {
      const label = currentPageView === "ko-expression-player" ? "표현" : "단어";
      const particle = currentPageView === "ko-expression-player" ? "을" : "를";
      setPlaybackStatus("선택한 " + label + particle + " 들으려면 재생을 누르세요.");
    }
    updatePlaybackButton();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "/" && document.activeElement !== search && !event.ctrlKey && !event.metaKey && !event.altKey &&
        (currentPageView === "vocabulary" || currentPageView === "ko-vocabulary")) {
      event.preventDefault();
      search.focus();
    }
    if (event.key === "Escape" && (document.activeElement === search || document.activeElement === verbSearch)) {
      const activeSearch = document.activeElement;
      activeSearch.value = "";
      activeSearch.blur();
      if (activeSearch === search) {
        currentPage = 1;
        renderWords();
      } else {
        renderVerbForms();
      }
    }
  });

  const counts = {
    all: words.length,
    elementary: words.filter(function (item) { return item.level === "초등"; }).length,
    middle: words.filter(function (item) { return item.level === "중등"; }).length,
    high: words.filter(function (item) { return item.level === "고등"; }).length
  };
  document.getElementById("nav-total-count").textContent = counts.all;
  document.getElementById("nav-korean-count").textContent = koreanWords.length;
  document.getElementById("nav-korean-expression-count").textContent = koreanExpressions.length;
  document.getElementById("count-all").textContent = counts.all;
  document.getElementById("count-elementary").textContent = counts.elementary;
  document.getElementById("count-middle").textContent = counts.middle;
  document.getElementById("count-high").textContent = counts.high;
  document.getElementById("player-count-elementary").textContent = counts.elementary + "개";
  document.getElementById("player-count-middle").textContent = counts.middle + "개";
  document.getElementById("player-count-high").textContent = counts.high + "개";
  playerWords = words.filter(function (item) { return item.level === playerLevel; });
  bookmarks = loadBookmarks();
  renderBookmarkLists();
  updateVerbAutoButton();
  studyStates = loadStudyStates();
  vocabularyLevelStates = loadVocabularyLevelStates();
  playerLevelStates = loadPlayerLevelStates();
  updateResumeStudyButtons();
  // Always open JINI on Home. Saved study screens remain available through
  // the separate "마지막 공부 화면" buttons; do not auto-resume on startup.
  setPage("home");
  showAndroidTtsFallback();
  renderWords();
  renderVerbForms();
  updatePlayerCard();
  window.history.pushState({ jiniHome: true }, "", window.location.href);
  window.addEventListener("popstate", function () {
    if (currentPageView === "opic-mock" && leaveMockPractice()) {
      // The site's in-page navigation uses a history guard. Restore it so the
      // next Android/browser Back press is still handled by JINI.
      window.history.pushState({ jiniHome: true }, "", window.location.href);
      return;
    }
    if (currentPageView === "opic-basic" &&
        typeof window.JINI_OPIC_BACK === "function" &&
        window.JINI_OPIC_BACK()) return;
    // Give English and Korean games their own back-navigation steps.
    if (currentPageView === "english-game" &&
        typeof window.JINI_ENGLISH_GAME_BACK === "function" &&
        window.JINI_ENGLISH_GAME_BACK()) return;
    // Give the Korean game its own back-navigation step.
    if (currentPageView === "ko-game" &&
        typeof window.JINI_KOREAN_GAME_BACK === "function" &&
        window.JINI_KOREAN_GAME_BACK()) return;
    if (currentPageView === "home") return;
    setPage("home");
    window.history.pushState({ jiniHome: true }, "", window.location.href);
  });
}());


(function () {
  "use strict";

  const PAGE_SIZE = 10;
  const words = window.WORDS || [];
  const koreanWords = window.KOREAN_WORDS || [];
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
  let toastTimer;
  let activeButton = null;
  let playerLevel = "초등";
  let playerWords = [];
  let playerIndex = 0;
  let playbackState = "stopped";
  let playbackToken = 0;
  let verbSpeechToken = 0;
  let advanceTimer;
  let verbAutoTimer;
  let verbAutoPlaying = false;
  let verbAutoRows = [];
  let verbAutoIndex = 0;
  let playerMode = "word-meaning-example";
  let bookmarks = { vocabulary: [], player: [] };
  const BOOKMARK_STORAGE_KEY = "jini-learning-bookmarks";

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
          return bookmark && ["초등", "중등", "고등", "기초"].includes(bookmark.level) &&
            Number.isInteger(bookmark.index) && bookmark.index >= 0 &&
            Number.isInteger(bookmark.page) && bookmark.page > 0 && typeof bookmark.word === "string" &&
            ["english", "korean"].includes(bookmark.study || "english");
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
    bookmarks.player.forEach(function (bookmark, index) {
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
        setPage(currentStudy === "korean" ? "ko-player" : "player");
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
    updateVocabularyBookmarkControls();
    updatePlayerBookmarkControl();
  }

  function updatePlayerBookmarkControl() {
    const item = playerWords[playerIndex];
    const button = document.getElementById("bookmark-current-word");
    if (!item) {
      button.textContent = "☆ 이 단어 책갈피";
      button.classList.remove("selected");
      return;
    }
    const saved = bookmarks.player.some(function (bookmark) {
      return (bookmark.study || "english") === currentStudy &&
        bookmark.level === (currentStudy === "korean" ? "기초" : playerLevel) && bookmark.word === item.word;
    });
    button.textContent = saved ? "★ 단어 책갈피 저장됨" : "☆ 이 단어 책갈피";
    button.classList.toggle("selected", saved);
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
    const index = bookmarks.player.findIndex(function (bookmark) {
      return (bookmark.study || "english") === currentStudy &&
        bookmark.level === (currentStudy === "korean" ? "기초" : playerLevel) && bookmark.word === item.word;
    });
    if (index >= 0) {
      bookmarks.player.splice(index, 1);
    } else {
      bookmarks.player.unshift({
        study: currentStudy,
        level: currentStudy === "korean" ? "기초" : playerLevel,
        index: playerIndex,
        page: Math.floor(playerIndex / PAGE_SIZE) + 1,
        word: item.word
      });
    }
    if (saveBookmarks()) {
      renderBookmarkLists();
      showToast(index >= 0 ? "단어 책갈피를 삭제했어요." : "현재 단어를 책갈피에 저장했어요.");
    }
  }

  function updatePlayerCard() {
    if (!playerWords.length) return;
    const item = playerWords[playerIndex];
    document.getElementById("player-level-label").textContent = item.level;
    document.getElementById("player-word").textContent = item.word;
    document.getElementById("player-ipa").textContent =
      currentStudy === "korean" ? "로마자 · " + item.ipa : item.ipa;
    document.getElementById("player-meaning").textContent = item.meaning;
    document.getElementById("player-example").textContent = item.example;
    document.getElementById("player-example-translation").textContent = item.exampleKo;
    document.getElementById("player-other-senses").innerHTML = (item.otherSenses || []).map(function (sense) {
      return '<div><span class="other-sense-label">다른 뜻</span> ' + escapeHtml(sense.meaning) + '</div>';
    }).join("");
    document.getElementById("player-example-extra").innerHTML = (item.otherSenses || []).map(function (sense) {
      return '<div><span class="other-example-label">' + escapeHtml(sense.meaning) + '</span>' +
        escapeHtml(sense.example) + '<span class="player-sense-translation">' + escapeHtml(sense.exampleKo) + '</span></div>';
    }).join("");
    document.getElementById("player-progress").textContent =
      (playerIndex + 1) + " / " + playerWords.length + " 단어";
    document.getElementById("player-progress-bar").style.width =
      ((playerIndex + 1) / playerWords.length * 100) + "%";
    updatePlayerBookmarkControl();
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
    window.clearTimeout(advanceTimer);
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
    if (!item) {
      stopPlayback("선택한 학년의 단어가 없어요.");
      return;
    }
    const token = ++playbackToken;
    setPlaybackStatus("단어를 재생하고 있어요.");
    updatePlayerCard();
    speech.cancel();
    createUtterance(item.word, function () {
      setPlaybackStatus("뜻을 재생하고 있어요.");
      createUtterance(item.meaning, function () {
        if (playerMode === "word-meaning-example") {
          playExampleAt(item, 0, token);
        } else {
          finishPlayerItem(token);
        }
      }, playbackError, token, currentStudy === "korean" ? "vi-VN" : "ko-KR");
    }, playbackError, token, currentStudy === "korean" ? "ko-KR" : "en-US");
  }

  function finishPlayerItem(token) {
    const advance = function () {
      advanceTimer = null;
      if (token !== playbackToken || playbackState === "stopped") return;
      if (playerIndex + 1 >= playerWords.length) {
        stopPlayback("학습 단어를 모두 재생했어요.");
        return;
      }
      playerIndex += 1;
      playCurrentItem();
    };
    advanceTimer = window.setTimeout(advance, 500);
  }

  function playExampleAt(item, exampleIndex, token) {
    const examplesForItem = [item.example].concat((item.otherSenses || []).map(function (sense) {
      return sense.example;
    }));
    if (exampleIndex >= examplesForItem.length) {
      finishPlayerItem(token);
      return;
    }
    setPlaybackStatus(exampleIndex === 0 ? "예문을 재생하고 있어요." : "다른 뜻의 예문을 재생하고 있어요.");
    createUtterance(examplesForItem[exampleIndex], function () {
      playExampleAt(item, exampleIndex + 1, token);
    }, playbackError, token, currentStudy === "korean" ? "ko-KR" : "en-US");
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
    setPlaybackStatus(wasPlaying ? "다음 단어를 재생하고 있어요." : "선택한 단어를 들으려면 재생을 누르세요.");
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
    setPlaybackStatus(mode === "word-meaning" ? "단어와 뜻만 재생합니다." : "단어, 뜻, 예문을 재생합니다.");
  }

  function makeCard(item) {
    const card = document.createElement("article");
    card.className = "word-card";
    const levelClass = item.level === "중등" ? "middle" : item.level === "고등" ? "high" : "";
    card.innerHTML =
      '<div class="word-primary">' +
        '<span class="word-level ' + levelClass + '">' + escapeHtml(item.level) + '</span>' +
        '<strong class="word-title">' + escapeHtml(item.word) + '</strong>' +
        '<span class="word-ipa">' +
          (currentStudy === "korean" ? "로마자 · " : "") + escapeHtml(item.ipa) + '</span>' +
      '</div>' +
      '<div class="word-meaning"><span class="word-meaning-label">' +
        (currentStudy === "korean" ? "베트남어 뜻" : "뜻") + '</span>' + escapeHtml(item.meaning) +
        (item.otherSenses || []).map(function (sense) {
          return '<span class="word-meaning-extra"><strong>다른 뜻</strong> ' + escapeHtml(sense.meaning) + '</span>';
        }).join("") +
      '</div>' +
      '<div class="word-example">' +
        '<span class="example-label">' + (currentStudy === "korean" ? "예문" : "EXAMPLE") + '</span>' +
        '<span class="example-en">' + escapeHtml(item.example) + '</span>' +
        '<span class="example-translation">' + escapeHtml(item.exampleKo) + '</span>' +
        (item.otherSenses || []).map(function (sense) {
          return '<span class="word-extra-example"><strong>' + escapeHtml(sense.meaning) + '</strong> · ' +
            escapeHtml(sense.example) + '<span class="example-translation">' + escapeHtml(sense.exampleKo) + '</span></span>';
        }).join("") +
      '</div>' +
      '<button class="play-button" type="button" aria-label="' + escapeHtml(item.word) + " " +
        (currentStudy === "korean" ? "한국어" : "영어") + ' 발음 듣기">' +
        '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M3 2.7c0-.7.8-1.1 1.4-.7l8.2 5.1a1 1 0 0 1 0 1.7l-8.2 5.1a.9.9 0 0 1-1.4-.8V2.7Z"/></svg>' +
      '</button>';
    const button = card.querySelector(".play-button");
    button.addEventListener("click", function () {
      if (!speech) {
        showToast("이 브라우저에서는 음성 재생을 지원하지 않아요.");
        return;
      }
      speech.cancel();
      if (activeButton) activeButton.classList.remove("playing");
      activeButton = button;
      button.classList.add("playing");
      const extraExamples = (item.otherSenses || []).map(function (sense) { return sense.example; });
      const utterance = createSpeechUtterance(
        [item.word, item.example].concat(extraExamples).join(". "),
        currentStudy === "korean" ? "ko-KR" : "en-US"
      );
      utterance.onend = utterance.onerror = function () {
        button.classList.remove("playing");
        if (activeButton === button) activeButton = null;
      };
      speech.speak(utterance);
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
  }

  function goToPage(page) {
    currentPage = page;
    renderWords();
    document.querySelector(".vocabulary-section").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderWords() {
    const query = search.value.trim().toLocaleLowerCase("ko");
    const studyWords = currentStudy === "korean" ? koreanWords : words;
    const filtered = studyWords.filter(function (item) {
      const matchesLevel = currentStudy === "korean" || activeLevel === "all" || item.level === activeLevel;
      const otherMeanings = (item.otherSenses || []).map(function (sense) { return sense.meaning; }).join(" ");
      const searchable = (item.word + " " + item.meaning + " " + otherMeanings).toLocaleLowerCase("ko");
      return matchesLevel && searchable.includes(query);
    });
    const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
    currentPage = Math.min(Math.max(1, currentPage), Math.max(1, pageCount));
    const start = (currentPage - 1) * PAGE_SIZE;
    list.replaceChildren();
    filtered.slice(start, start + PAGE_SIZE).forEach(function (item) {
      list.appendChild(makeCard(item));
    });
    resultCount.textContent = currentStudy === "korean" ? filtered.length + "개 단어 · 베트남어 뜻" : filtered.length + "개 단어";
    if (currentPageView === "vocabulary" || currentPageView === "ko-vocabulary") {
      breadcrumbLevel.textContent = currentStudy === "korean" ? "필수 단어" : levelNames[activeLevel];
    }
    emptyState.hidden = filtered.length > 0;
    list.hidden = filtered.length === 0;
    renderPagination(pageCount);
    updateVocabularyBookmarkControls();
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
    filtered.forEach(function (row) {
      const tr = document.createElement("tr");
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
      [
        ["뜻", row[4]],
        ["현재형", row[1]],
        ["과거형", row[2]],
        ["과거분사", row[3]]
      ].forEach(function (cell) {
        const td = document.createElement("td");
        td.dataset.label = cell[0];
        td.textContent = cell[1].trim();
        tr.appendChild(td);
      });
      verbTableBody.appendChild(tr);
    });
    verbResultCount.textContent = filtered.length + "개 동사";
    verbEmpty.hidden = filtered.length > 0;
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
    verbAutoIndex = 0;
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
    document.getElementById("verb-auto-status").textContent =
      "자동 재생 중 · " + (verbAutoIndex + 1) + "/" + verbAutoRows.length +
      " · " + row[0] + " (" + row[4] + ")";
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
    activeLevel = level;
    currentPage = 1;
    document.querySelectorAll(".filter-chip").forEach(function (button) {
      button.classList.toggle("selected", button.dataset.level === level);
    });
    renderWords();
  }

  function setPage(page) {
    if (page === currentPageView) return;
    stopPlayback("재생을 멈췄어요.");
    stopVerbAuto(true);
    if (speech) speech.cancel();
    const nextStudy = page.indexOf("ko-") === 0 ? "korean" : "english";
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
    currentPageView = page;
    const showingHome = page === "home";
    const showingVocabulary = page === "vocabulary" || page === "ko-vocabulary";
    const showingPlayer = page === "player" || page === "ko-player";
    const showingLanguagePacks = page === "ko-language-packs";
    const koreanStudy = currentStudy === "korean";
    document.querySelector(".sidebar").dataset.study = showingHome ? "home" : currentStudy;
    document.getElementById("home-section").hidden = !showingHome;
    document.querySelector(".vocabulary-section").hidden = !showingVocabulary;
    playerSection.hidden = !showingPlayer;
    verbFormsSection.hidden = page !== "verb-forms";
    languagePacksSection.hidden = !showingLanguagePacks;
    document.querySelector(".page-footer").hidden = showingHome;
    document.querySelectorAll(".nav-item[data-page]").forEach(function (button) {
      button.classList.toggle("active", button.dataset.page === page);
    });
    document.getElementById("sidebar-foot").innerHTML = koreanStudy ?
      "YOUR DAILY KOREAN<br><span>베트남어로 배우는 한국어</span>" :
      "YOUR DAILY ENGLISH<br><span>기초부터 차근차근</span>";
    document.getElementById("breadcrumb-section").textContent =
      showingHome ? "홈" : koreanStudy ? "AI 한글공부" : showingVocabulary ? "단어 학습" : page === "player" ? "듣기 학습" : "문법 학습";
    document.getElementById("breadcrumb-divider").hidden = showingHome;
    breadcrumbLevel.textContent = showingHome ? "" : showingVocabulary ?
      (koreanStudy ? "필수 단어" : levelNames[activeLevel]) :
      showingPlayer ? (koreanStudy ? "단어 재생" : playerLevel + " 단어 재생") :
      showingLanguagePacks ? "언어팩 설치" : "동사 변화";
    document.getElementById("section-title").textContent = "필수 단어";
    document.getElementById("vocabulary-filters").hidden = koreanStudy;
    document.getElementById("vocabulary-hint").textContent = koreanStudy ?
      "스피커를 눌러 한국어 발음을 들어 보세요" : "스피커를 눌러 발음을 들어 보세요";
    document.getElementById("player-levels").hidden = koreanStudy;
    document.getElementById("player-heading-title").textContent = koreanStudy ? "한국어 단어 재생" : "단어 재생";
    document.getElementById("player-heading-description").textContent = koreanStudy ?
      "한국어 단어를 듣고 베트남어 뜻과 함께 익혀 보세요." : "학년과 재생 내용을 선택하고 시작해 보세요.";
    document.querySelector(".player-mode-button[data-player-mode='word-meaning']").textContent =
      koreanStudy ? "한국어 + 베트남어 뜻" : "단어 + 뜻";
    document.querySelector(".player-mode-button[data-player-mode='word-meaning-example']").textContent =
      koreanStudy ? "한국어 + 베트남어 뜻 + 예문" : "단어 + 뜻 + 예문";
    document.querySelector(".page-footer").textContent = koreanStudy ?
      "한국어 단어를 듣고 베트남어 뜻과 함께 익혀 보세요." :
      "단어를 듣고, 예문을 따라 읽으며 나만의 영어를 만들어 보세요.";
    if (showingPlayer) {
      playerWords = koreanStudy ? koreanWords : words.filter(function (item) { return item.level === playerLevel; });
      playerIndex = 0;
      updatePlayerCard();
      document.getElementById("player-progress").textContent = playerWords.length + "개 단어";
      setPlaybackStatus(koreanStudy ? "재생을 누르면 한국어 단어를 들을 수 있어요." : "학년을 고르고 재생을 시작해 보세요.");
    }
    renderWords();
    renderBookmarkLists();
  }

  function setPlayerLevel(level) {
    if (playbackState !== "stopped") stopPlayback("학년을 변경했어요.");
    playerLevel = level;
    playerWords = words.filter(function (item) { return item.level === playerLevel; });
    playerIndex = 0;
    document.querySelectorAll(".player-level").forEach(function (button) {
      button.classList.toggle("selected", button.dataset.playerLevel === level);
    });
    breadcrumbLevel.textContent = playerLevel + " 단어 재생";
    updatePlayerCard();
    document.getElementById("player-progress").textContent = playerWords.length + "개 단어";
    setPlaybackStatus("재생을 누르면 " + playerLevel + " 단어를 처음부터 들려드려요.");
    updatePlaybackButton();
  }

  document.querySelectorAll("[data-page]").forEach(function (button) {
    button.addEventListener("click", function () { setPage(button.dataset.page); });
  });
  document.getElementById("open-android-tts-settings").addEventListener("click", function () {
    if (!/Android/i.test(window.navigator.userAgent)) {
      showToast("이 버튼은 Android에서만 설정 메뉴를 열 수 있어요. 아래 설치 방법을 확인해 주세요.");
      return;
    }
    const fallbackUrl = window.location.href.split("#")[0] + "#android-tts-settings-unavailable";
    const fallbackMessage = "설정 > 일반 관리(또는 접근성) > 텍스트 음성 변환 > 음성 데이터 설치에서 베트남어를 선택하세요.";
    const fallbackIntent = "intent:#Intent;action=android.settings.TTS_SETTINGS;" +
      "package=com.android.settings;S.browser_fallback_url=" +
      encodeURIComponent(fallbackUrl) + ";end";
    showToast("설정이 열리지 않으면 " + fallbackMessage);
    window.setTimeout(function () {
      if (document.visibilityState === "visible") {
        showToast(fallbackMessage);
      }
    }, 1500);
    window.location.href = fallbackIntent;
  });
  function showAndroidTtsFallback() {
    if (window.location.hash === "#android-tts-settings-unavailable") {
      showToast("설정 > 일반 관리(또는 접근성) > 텍스트 음성 변환 > 음성 데이터 설치에서 베트남어를 선택하세요.");
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
  search.addEventListener("input", function () { currentPage = 1; renderWords(); });
  verbSearch.addEventListener("input", function () {
    if (verbAutoPlaying) stopVerbAuto(true);
    renderVerbForms();
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
  setPage("home");
  showAndroidTtsFallback();
  renderWords();
  renderVerbForms();
  updatePlayerCard();
}());

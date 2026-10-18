(function () {
  "use strict";

  const section = document.getElementById("english-expressions-section");
  if (!section) return;
  const root = document.getElementById("jini-essential-expressions");
  const search = document.getElementById("ee-search");
  const count = document.getElementById("ee-count");
  const nav = document.getElementById("ee-pagination");
  const categoryBar = document.getElementById("ee-categories");
  const status = document.getElementById("ee-status");
  const PER_PAGE = 10;
  const STORE = "jini-essential-expressions-bookmarks-v1";
  const EXPRESSIONS = [["일상","be interested in","~에 관심이 있다","I'm interested in photography.","저는 사진 촬영에 관심이 있어요."],["일상","be good at","~을 잘하다","My brother is good at cooking.","제 남동생은 요리를 잘해요."],["일상","be used to","~에 익숙하다","I'm used to getting up early.","저는 일찍 일어나는 데 익숙해요."],["일상","look forward to","~을 기대하다","I'm looking forward to the weekend.","주말이 기대돼요."],["일상","spend time doing","~하는 데 시간을 보내다","I spend time reading before bed.","저는 잠들기 전에 책을 읽으며 시간을 보내요."],["일상","take care of","~을 돌보다, 챙기다","I take care of my dog every morning.","저는 매일 아침 반려견을 돌봐요."],["일상","once in a while","가끔씩","I go hiking once in a while.","저는 가끔 등산을 가요."],["일상","most of the time","대부분의 시간에","I work from home most of the time.","저는 대부분 재택근무를 해요."],["일상","these days","요즘","These days, I try to exercise regularly.","요즘 저는 규칙적으로 운동하려고 해요."],["일상","keep in touch","계속 연락하다","We still keep in touch after graduation.","우리는 졸업 후에도 계속 연락하고 있어요."],["직장","be in charge of","~을 담당하다","I'm in charge of quality control.","저는 품질 관리를 담당하고 있어요."],["직장","get along with","~와 잘 지내다","I get along well with my coworkers.","저는 직장 동료들과 잘 지내요."],["직장","work on","~을 작업하다, 진행하다","I'm working on a new project.","저는 새 프로젝트를 진행하고 있어요."],["직장","deal with","~을 처리하다, 다루다","I deal with customer requests every day.","저는 매일 고객 요청을 처리해요."],["직장","take part in","~에 참여하다","I took part in a team meeting yesterday.","저는 어제 팀 회의에 참여했어요."],["직장","make sure","반드시 확인하다","I always make sure the report is accurate.","저는 보고서가 정확한지 항상 확인해요."],["직장","be responsible for","~에 책임이 있다","Our team is responsible for testing.","우리 팀은 테스트를 담당하고 있어요."],["직장","have a hard time doing","~하는 데 어려움을 겪다","I have a hard time speaking English quickly.","저는 영어를 빠르게 말하는 데 어려움을 겪어요."],["직장","be supposed to","~하기로 되어 있다, ~해야 한다","I'm supposed to finish the report today.","저는 오늘 보고서를 끝내기로 되어 있어요."],["직장","make a difference","변화를 만들다, 도움이 되다","Small improvements can make a big difference.","작은 개선도 큰 변화를 만들 수 있어요."],["답변","in my opinion","제 생각에는","In my opinion, public transportation is convenient.","제 생각에는 대중교통이 편리해요."],["답변","to be honest","솔직히 말하면","To be honest, I prefer staying at home.","솔직히 말하면 저는 집에 있는 게 더 좋아요."],["답변","for example","예를 들면","For example, I often listen to music on the bus.","예를 들어 저는 버스에서 음악을 자주 들어요."],["답변","on the other hand","반면에","On the other hand, working from home can feel lonely.","반면에 재택근무는 외로울 수도 있어요."],["답변","as far as I know","제가 아는 한","As far as I know, the store closes at nine.","제가 아는 한 그 가게는 9시에 문을 닫아요."],["답변","it depends on","~에 따라 달라지다","It depends on the weather.","날씨에 따라 달라요."],["답변","first of all","우선, 먼저","First of all, I check my schedule.","우선 저는 일정을 확인해요."],["답변","that's why","그래서, 그것이 ~한 이유다","I love being outdoors. That's why I go camping.","저는 야외 활동을 좋아해요. 그래서 캠핑을 가요."],["답변","compared to","~와 비교하면","Compared to last year, I feel more confident.","작년과 비교하면 저는 자신감이 더 생겼어요."],["답변","one of the reasons is that","이유 중 하나는 ~라는 것이다","One of the reasons is that it's close to my home.","이유 중 하나는 집에서 가깝기 때문이에요."]].map(function (item, index) {
    return { id: index + 1, category: item[0], phrase: item[1], meaning: item[2], example: item[3], translation: item[4] };
  });
  // Share the same 30 curated expressions with the English practice games.
  // Keep the game questions grounded in the study page's single source of truth.
  window.JINI_ESSENTIAL_EXPRESSIONS = EXPRESSIONS.map(function (item) { return Object.assign({}, item); });
  let saved = [];
  let category = "전체";
  let page = 1;
  let phraseQuery = "";
  let currentVoice = null;
  let playbackToken = 0;

  try {
    const stored = JSON.parse(localStorage.getItem(STORE) || "[]");
    if (Array.isArray(stored)) saved = stored.filter(function (id) {
      return Number.isInteger(id) && id > 0 && id <= EXPRESSIONS.length;
    });
  } catch (error) {
    saved = [];
  }

  function element(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function button(label, cls, action, title) {
    const el = element("button", cls, label);
    el.type = "button";
    el.addEventListener("click", action);
    if (title) el.setAttribute("aria-label", title);
    return el;
  }

  function cancelSpeech() {
    playbackToken += 1;
    currentVoice = null;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  // Same four-part playback order as the 필수 단어 cards.
  function speakSequence(parts) {
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      status.textContent = "이 브라우저는 음성 재생을 지원하지 않아요.";
      return;
    }
    cancelSpeech();
    const token = playbackToken;
    const synth = window.speechSynthesis;
    const voices = typeof synth.getVoices === "function" ? synth.getVoices() : [];
    const queue = parts.filter(function (part) { return part.text && String(part.text).trim(); });
    if (!queue.length) return;
    status.textContent = queue.length > 1 ?
      "표현 → 한국어 뜻 → 영어 예문 → 해석을 순서대로 재생하고 있어요." :
      "영어 음성을 재생하고 있어요.";

    function next(index) {
      if (token !== playbackToken || section.hidden) return;
      if (index >= queue.length) {
        currentVoice = null;
        status.textContent = "재생을 완료했어요.";
        return;
      }
      const part = queue[index];
      const utterance = new window.SpeechSynthesisUtterance(part.text);
      utterance.lang = part.lang;
      utterance.rate = part.lang === "ko-KR" ? 0.94 : 0.9;
      const locale = part.lang.toLowerCase();
      const voice = voices.find(function (v) { return v.lang && v.lang.toLowerCase() === locale; }) ||
        voices.find(function (v) { return v.lang && v.lang.toLowerCase().startsWith(locale.slice(0, 2)); });
      if (voice) utterance.voice = voice;
      currentVoice = utterance;
      utterance.onend = function () {
        if (token === playbackToken) next(index + 1);
      };
      utterance.onerror = function (event) {
        if (token !== playbackToken || event.error === "canceled" || event.error === "interrupted") return;
        cancelSpeech();
        status.textContent = "음성을 끝까지 재생하지 못했어요. 다시 눌러 주세요.";
      };
      synth.speak(utterance);
    }
    next(0);
  }

  function speak(text) {
    speakSequence([{ text: text, lang: "en-US" }]);
  }

  function speakCard(item) {
    speakSequence([
      { text: item.phrase, lang: "en-US" },
      { text: item.meaning, lang: "ko-KR" },
      { text: item.example, lang: "en-US" },
      { text: item.translation, lang: "ko-KR" }
    ]);
  }

  function persist() {
    try {
      localStorage.setItem(STORE, JSON.stringify(saved));
      return true;
    } catch (error) {
      status.textContent = "책갈피를 저장할 수 없어요. 브라우저 저장 설정을 확인해 주세요.";
      return false;
    }
  }

  function visibleItems() {
    const q = phraseQuery.trim().toLocaleLowerCase();
    return EXPRESSIONS.filter(function (item) {
      const categoryMatches = category === "전체" || category === "책갈피" && saved.includes(item.id) || category === item.category;
      return categoryMatches && (!q || [item.phrase, item.meaning, item.example, item.translation].some(function (field) {
        return field.toLocaleLowerCase().includes(q);
      }));
    });
  }

  function toggleBookmark(id) {
    if (saved.includes(id)) saved = saved.filter(function (entry) { return entry !== id; });
    else saved.unshift(id);
    if (persist()) status.textContent = saved.includes(id) ? "책갈피에 저장했어요." : "책갈피를 해제했어요.";
    render();
  }

  function renderCategories() {
    categoryBar.replaceChildren();
    ["전체", "일상", "직장", "답변", "책갈피"].forEach(function (name) {
      const label = name === "전체" ? "전체 30" : name === "책갈피" ? "책갈피 " + saved.length : name;
      const el = button(label, "ee-category" + (category === name ? " selected" : ""), function () {
        category = name;
        page = 1;
        render();
      });
      el.setAttribute("aria-pressed", String(category === name));
      categoryBar.appendChild(el);
    });
  }

  function renderPages(totalPages) {
    nav.replaceChildren();
    if (totalPages <= 1) return;
    const previous = button("‹ 이전", "ee-page-button", function () { page = Math.max(1, page - 1); render(true); });
    previous.disabled = page === 1;
    nav.appendChild(previous);
    nav.appendChild(element("span", "ee-page-status", page + " / " + totalPages));
    const next = button("다음 ›", "ee-page-button", function () { page = Math.min(totalPages, page + 1); render(true); });
    next.disabled = page === totalPages;
    nav.appendChild(next);
  }

  function render(scrollToTop) {
    renderCategories();
    const filtered = visibleItems();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    page = Math.min(page, totalPages);
    count.textContent = filtered.length + "개 표현" + (filtered.length < EXPRESSIONS.length ? " / 전체 " + EXPRESSIONS.length + "개" : "");
    root.replaceChildren();
    if (!filtered.length) {
      root.appendChild(element("p", "ee-empty", category === "책갈피" && !phraseQuery ? "저장한 표현이 없어요. ☆ 버튼으로 책갈피를 추가해 보세요." : "일치하는 표현이 없어요. 다른 검색어를 입력해 보세요."));
    }
    filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(function (item) {
      const card = element("article", "ee-card");
      card.tabIndex = 0;
      card.setAttribute("aria-label", item.phrase + " 표현 카드. 눌러서 표현과 뜻, 예문과 해석 듣기");
      card.addEventListener("click", function (event) {
        if (event.target.closest("button, a, select, input, textarea")) return;
        speakCard(item);
      });
      card.addEventListener("keydown", function (event) {
        if (event.target !== card || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        speakCard(item);
      });
      const header = element("div", "ee-card-head");
      const heading = element("div", "ee-card-heading");
      heading.appendChild(element("span", "ee-index", String(item.id).padStart(2, "0") + " · " + item.category));
      heading.appendChild(element("h2", "ee-phrase", item.phrase));
      heading.appendChild(element("p", "ee-meaning", item.meaning));
      header.appendChild(heading);
      const mark = button(saved.includes(item.id) ? "★" : "☆", "ee-bookmark" + (saved.includes(item.id) ? " selected" : ""), function () {
        toggleBookmark(item.id);
      }, item.phrase + (saved.includes(item.id) ? " 책갈피 해제" : " 책갈피 추가"));
      mark.setAttribute("aria-pressed", String(saved.includes(item.id)));
      header.appendChild(mark);
      card.appendChild(header);
      const phraseListen = button("▶ 표현 듣기", "ee-listen", function () { speak(item.phrase); }, item.phrase + " 영어 발음 듣기");
      const exampleArea = element("div", "ee-example");
      exampleArea.appendChild(element("span", "ee-example-label", "예문"));
      exampleArea.appendChild(element("p", "ee-example-en", item.example));
      exampleArea.appendChild(element("p", "ee-example-ko", item.translation));
      exampleArea.appendChild(button("▶ 예문 듣기", "ee-listen ee-listen-example", function () { speak(item.example); }, item.phrase + " 영어 예문 듣기"));
      card.appendChild(phraseListen);
      card.appendChild(exampleArea);
      root.appendChild(card);
    });
    renderPages(totalPages);
    if (scrollToTop) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  search.addEventListener("input", function () {
    phraseQuery = search.value;
    page = 1;
    render();
  });
  document.getElementById("ee-search-clear").addEventListener("click", function () {
    search.value = "";
    phraseQuery = "";
    page = 1;
    render();
    search.focus();
  });
  window.JINI_STOP_ENGLISH_EXPRESSIONS = function () {
    cancelSpeech();
    status.textContent = "";
  };
  window.JINI_SHOW_ENGLISH_EXPRESSIONS = function () {
    // The listening player shares this bookmark store; reload on return.
    try {
      const stored = JSON.parse(localStorage.getItem(STORE) || "[]");
      saved = Array.isArray(stored) ? stored.filter(function (id) {
        return Number.isInteger(id) && id > 0 && id <= EXPRESSIONS.length;
      }) : [];
    } catch (error) { saved = []; }
    render(false);
  };
  render(false);
}());
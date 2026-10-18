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
  const EXPRESSIONS = [["일상","be interested in","~에 관심이 있다","I'm interested in photography.","저는 사진 촬영에 관심이 있어요."],["일상","be good at","~을 잘하다","My brother is good at cooking.","제 남동생은 요리를 잘해요."],["일상","be used to","~에 익숙하다","I'm used to getting up early.","저는 일찍 일어나는 데 익숙해요."],["일상","look forward to","~을 기대하다","I'm looking forward to the weekend.","주말이 기대돼요."],["일상","spend time doing","~하는 데 시간을 보내다","I spend time reading before bed.","저는 잠들기 전에 책을 읽으며 시간을 보내요."],["일상","take care of","~을 돌보다, 챙기다","I take care of my dog every morning.","저는 매일 아침 반려견을 돌봐요."],["일상","once in a while","가끔씩","I go hiking once in a while.","저는 가끔 등산을 가요."],["일상","most of the time","대부분의 시간에","I work from home most of the time.","저는 대부분 재택근무를 해요."],["일상","these days","요즘","These days, I try to exercise regularly.","요즘 저는 규칙적으로 운동하려고 해요."],["일상","keep in touch","계속 연락하다","We still keep in touch after graduation.","우리는 졸업 후에도 계속 연락하고 있어요."],["직장","be in charge of","~을 담당하다","I'm in charge of quality control.","저는 품질 관리를 담당하고 있어요."],["직장","get along with","~와 잘 지내다","I get along well with my coworkers.","저는 직장 동료들과 잘 지내요."],["직장","work on","~을 작업하다, 진행하다","I'm working on a new project.","저는 새 프로젝트를 진행하고 있어요."],["직장","deal with","~을 처리하다, 다루다","I deal with customer requests every day.","저는 매일 고객 요청을 처리해요."],["직장","take part in","~에 참여하다","I took part in a team meeting yesterday.","저는 어제 팀 회의에 참여했어요."],["직장","make sure","반드시 확인하다","I always make sure the report is accurate.","저는 보고서가 정확한지 항상 확인해요."],["직장","be responsible for","~에 책임이 있다","Our team is responsible for testing.","우리 팀은 테스트를 담당하고 있어요."],["직장","have a hard time doing","~하는 데 어려움을 겪다","I have a hard time speaking English quickly.","저는 영어를 빠르게 말하는 데 어려움을 겪어요."],["직장","be supposed to","~하기로 되어 있다, ~해야 한다","I'm supposed to finish the report today.","저는 오늘 보고서를 끝내기로 되어 있어요."],["직장","make a difference","변화를 만들다, 도움이 되다","Small improvements can make a big difference.","작은 개선도 큰 변화를 만들 수 있어요."],["답변","in my opinion","제 생각에는","In my opinion, public transportation is convenient.","제 생각에는 대중교통이 편리해요."],["답변","to be honest","솔직히 말하면","To be honest, I prefer staying at home.","솔직히 말하면 저는 집에 있는 게 더 좋아요."],["답변","for example","예를 들면","For example, I often listen to music on the bus.","예를 들어 저는 버스에서 음악을 자주 들어요."],["답변","on the other hand","반면에","On the other hand, working from home can feel lonely.","반면에 재택근무는 외로울 수도 있어요."],["답변","as far as I know","제가 아는 한","As far as I know, the store closes at nine.","제가 아는 한 그 가게는 9시에 문을 닫아요."],["답변","it depends on","~에 따라 달라지다","It depends on the weather.","날씨에 따라 달라요."],["답변","first of all","우선, 먼저","First of all, I check my schedule.","우선 저는 일정을 확인해요."],["답변","that's why","그래서, 그것이 ~한 이유다","I love being outdoors. That's why I go camping.","저는 야외 활동을 좋아해요. 그래서 캠핑을 가요."],["답변","compared to","~와 비교하면","Compared to last year, I feel more confident.","작년과 비교하면 저는 자신감이 더 생겼어요."],["답변","one of the reasons is that","이유 중 하나는 ~라는 것이다","One of the reasons is that it's close to my home.","이유 중 하나는 집에서 가깝기 때문이에요."],["일상","get into the habit of","~하는 습관을 들이다","I got into the habit of walking after dinner.","저녁 식사 후에 걷는 습관이 생겼어요."],["일상","cut down on","~을 줄이다","I'm trying to cut down on sugary drinks.","당분이 많은 음료를 줄이려고 노력하고 있어요."],["일상","run out of","~이 다 떨어지다","We ran out of milk, so I went to the store.","우유가 다 떨어져서 가게에 다녀왔어요."],["일상","make time for","~할 시간을 내다","I make time for stretching every morning.","저는 매일 아침 스트레칭할 시간을 내요."],["일상","feel like doing","~하고 싶은 기분이다","I feel like watching a comedy tonight.","오늘 밤에는 코미디 영화를 보고 싶어요."],["일상","end up doing","결국 ~하게 되다","I ended up staying home because it rained.","비가 와서 결국 집에 있었어요."],["일상","be about to","막 ~하려고 하다","I was about to leave when my friend called.","친구에게 전화가 왔을 때 막 나가려던 참이었어요."],["일상","on my way to","~로 가는 길에","I'm on my way to the gym.","지금 헬스장에 가는 길이에요."],["일상","be into","~을 좋아하다, 푹 빠져 있다","I'm really into mystery novels these days.","요즘 추리 소설에 푹 빠져 있어요."],["일상","stick to","~을 지키다","I try to stick to my weekly budget.","저는 일주일 예산을 지키려고 노력해요."],["일상","take a break","잠깐 쉬다","I take a short break after an hour of studying.","한 시간 공부한 뒤 잠깐 쉬어요."],["일상","catch up on","밀린 ~을 하다","I caught up on my laundry on Sunday.","일요일에 밀린 빨래를 했어요."],["일상","get rid of","~을 없애다, 버리다","I got rid of some old clothes.","오래된 옷 몇 벌을 정리했어요."],["일상","put off","~을 미루다","I kept putting off cleaning my desk.","책상 청소를 계속 미뤘어요."],["일상","look up","~을 찾아보다","I looked up the word in a dictionary.","그 단어를 사전에서 찾아봤어요."],["직장","meet a deadline","마감 기한을 지키다","We worked late to meet the deadline.","마감 기한을 지키려고 늦게까지 일했어요."],["직장","follow up on","~의 진행 상황을 확인하다","I'll follow up on the client's request tomorrow.","내일 고객의 요청 사항을 다시 확인할게요."],["직장","get back to someone","~에게 다시 연락하다","I'll get back to you by tomorrow afternoon.","내일 오후까지 다시 연락드릴게요."],["직장","bring up","~을 화제로 꺼내다","She brought up a useful idea during the meeting.","그녀는 회의에서 유용한 아이디어를 꺼냈어요."],["직장","come up with","~을 생각해 내다","Our team came up with a simpler process.","우리 팀은 더 간단한 절차를 생각해 냈어요."],["직장","figure out","~을 알아내다, 해결하다","We figured out why the test failed.","시험이 실패한 이유를 알아냈어요."],["직장","take notes","메모하다","I take notes during team meetings.","저는 팀 회의 중에 메모해요."],["직장","go over","~을 검토하다","Let's go over the results together.","결과를 함께 검토해 봅시다."],["직장","point out","~을 지적하다, 짚어 주다","He pointed out a mistake in the report.","그는 보고서에 있는 실수를 짚어 줬어요."],["직장","ahead of schedule","예정보다 일찍","We finished the task ahead of schedule.","예정보다 일찍 작업을 끝냈어요."],["직장","on short notice","갑작스러운 요청에도","Thanks for joining the meeting on short notice.","갑작스러운 요청에도 회의에 참석해 주셔서 감사해요."],["직장","keep someone updated","~에게 진행 상황을 알려주다","I'll keep you updated on the project.","프로젝트 진행 상황을 계속 알려드릴게요."],["직장","reach an agreement","합의에 이르다","Both teams reached an agreement on the timeline.","양쪽 팀은 일정에 대해 합의했어요."],["직장","set priorities","우선순위를 정하다","We need to set priorities before starting.","시작하기 전에 우선순위를 정해야 해요."],["직장","be on the same page","서로 같은 내용을 이해하다","Let's make sure we're on the same page.","서로 같은 내용을 이해하고 있는지 확인합시다."],["답변","what I like most about","~에서 가장 좋아하는 점","What I like most about my neighborhood is the park.","우리 동네에서 가장 좋아하는 점은 공원이에요."],["답변","the best part is that","가장 좋은 점은 ~라는 것이다","The best part is that I can walk to work.","가장 좋은 점은 걸어서 출근할 수 있다는 거예요."],["답변","the main reason is that","가장 큰 이유는 ~라는 것이다","The main reason is that it's affordable.","가장 큰 이유는 가격이 부담스럽지 않기 때문이에요."],["답변","what matters to me is","제게 중요한 것은 ~이다","What matters to me is spending time with family.","제게 중요한 것은 가족과 시간을 보내는 일이에요."],["답변","from my experience","제 경험으로는","From my experience, practicing daily helps a lot.","제 경험으로는 매일 연습하는 것이 큰 도움이 돼요."],["답변","as a result","그 결과","I practiced every day. As a result, I felt more confident.","매일 연습했어요. 그 결과 자신감이 더 생겼어요."],["답변","in addition to","~ 외에도","In addition to running, I enjoy swimming.","달리기 외에도 수영을 즐겨요."],["답변","not only ... but also","~뿐만 아니라 ...도","This café is not only quiet but also affordable.","이 카페는 조용할 뿐만 아니라 가격도 합리적이에요."],["답변","if I had to choose","꼭 선택해야 한다면","If I had to choose, I'd pick the beach.","꼭 선택해야 한다면 바다를 고르겠어요."],["답변","unlike","~와 달리","Unlike my brother, I prefer quiet weekends.","동생과 달리 저는 조용한 주말을 좋아해요."],["답변","ever since","~한 이후로 줄곧","Ever since I moved here, I've walked more.","이곳으로 이사 온 뒤로 걷는 시간이 늘었어요."],["답변","it reminds me of","~을 떠올리게 한다","The smell reminds me of my grandmother's kitchen.","그 냄새를 맡으면 할머니의 부엌이 떠올라요."],["답변","what surprised me was","저를 놀라게 한 것은 ~였다","What surprised me was how friendly everyone was.","저를 놀라게 한 건 사람들이 모두 친절했다는 점이에요."],["답변","I used to ... but now","예전에는 ~했지만 지금은 ...하다","I used to drive to work, but now I take the train.","예전에는 차로 출근했지만 지금은 기차를 타요."],["답변","if I remember correctly","제 기억이 맞다면","If I remember correctly, I visited Busan last spring.","제 기억이 맞다면 지난봄에 부산을 방문했어요."],["여행","check in at","~에서 체크인하다","We checked in at the hotel after lunch.","점심을 먹고 호텔에서 체크인했어요."],["여행","check out of","~에서 체크아웃하다","We checked out of the hotel at ten.","10시에 호텔에서 체크아웃했어요."],["여행","get around","여기저기 이동하다","It's easy to get around the city by subway.","지하철로 시내를 돌아다니기 편해요."],["여행","get off at","~에서 내리다","Get off at the next station.","다음 역에서 내리세요."],["여행","transfer to","~으로 갈아타다","We transferred to the airport train.","우리는 공항철도로 갈아탔어요."],["여행","book in advance","미리 예약하다","I booked the museum tickets in advance.","박물관 입장권을 미리 예약했어요."],["여행","be fully booked","예약이 다 차다","The hotel was fully booked that weekend.","그 주말에는 호텔 예약이 모두 찼어요."],["여행","be worth visiting","방문할 가치가 있다","The old town is worth visiting in the evening.","구시가지는 저녁에 가 볼 만해요."],["여행","try local food","현지 음식을 먹어 보다","I like to try local food when I travel.","여행할 때 현지 음식을 맛보는 것을 좋아해요."],["여행","take a day trip","당일치기 여행을 하다","We took a day trip to Kyoto.","교토로 당일치기 여행을 다녀왔어요."],["여행","on foot","걸어서, 도보로","We explored the neighborhood on foot.","동네를 걸어서 둘러봤어요."],["여행","ask for directions","길을 물어보다","I asked for directions at the station.","역에서 길을 물어봤어요."],["여행","lose my way","길을 잃다","I lost my way in the narrow streets.","좁은 골목길에서 길을 잃었어요."],["여행","catch a flight","비행기를 타다","We left early to catch our flight.","비행기를 놓치지 않으려고 일찍 출발했어요."],["여행","be delayed","지연되다","Our flight was delayed because of heavy rain.","폭우 때문에 비행기가 지연됐어요."],["관계","hit it off","처음부터 잘 통하다","We hit it off as soon as we met.","우리는 처음 만났을 때부터 잘 통했어요."],["관계","have a lot in common","공통점이 많다","We have a lot in common, including our taste in music.","우리는 음악 취향을 비롯해 공통점이 많아요."],["관계","hang out with","~와 어울려 시간을 보내다","I hang out with my friends on weekends.","주말에는 친구들과 어울려 시간을 보내요."],["관계","open up to","~에게 속마음을 털어놓다","She opened up to me about her worries.","그녀는 제게 고민을 털어놓았어요."],["관계","count on","~을 믿고 의지하다","I know I can count on my sister.","저는 언니를 믿고 의지할 수 있다는 걸 알아요."],["관계","cheer someone up","~의 기운을 북돋아 주다","I called my friend to cheer her up.","친구를 기운 나게 해 주려고 전화했어요."],["관계","make up with","~와 화해하다","I made up with my friend after our argument.","말다툼을 한 뒤 친구와 화해했어요."],["관계","stay close to","~와 가까운 관계를 유지하다","I try to stay close to my old friends.","오래된 친구들과 계속 가깝게 지내려고 해요."],["관계","be there for someone","~의 곁에서 힘이 되어 주다","My friends were there for me when I was stressed.","스트레스를 받을 때 친구들이 제게 힘이 되어 줬어요."],["관계","have a heart-to-heart","마음을 터놓고 대화하다","We had a heart-to-heart over dinner.","저녁을 먹으며 진솔한 대화를 나눴어요."]].map(function (item, index) {
    return { id: index + 1, category: item[0], phrase: item[1], meaning: item[2], example: item[3], translation: item[4] };
  });
  // Share the same 100 curated expressions with the English practice games.
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
    ["전체", "일상", "직장", "답변", "여행", "관계", "책갈피"].forEach(function (name) {
      const label = name === "전체" ? "전체 " + EXPRESSIONS.length : name === "책갈피" ? "책갈피 " + saved.length : name;
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
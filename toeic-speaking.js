/* JINI TOEIC Speaking beginner practice — static, server-free lesson examples. */
(function () {
  "use strict";
  const root = document.getElementById("toeic-speaking-root");
  if (!root) return;

  // These are study examples, not official ETS exam questions or score predictions.
  const exercises = [
    {
      title: "주말에 하는 일",
      type: "유형 3 · 질문에 답하기", number: "연습 1", duration: "답변 연습 15초",
      question: "What do you usually do on weekends?",
      translation: "주말에 보통 무엇을 하나요?",
      answers: {
        IL: ["I usually stay home. I watch TV and rest.", "저는 보통 집에 있어요. TV를 보고 쉬어요.", "I usually ~로 시작해 보세요."],
        IM: ["I usually stay home and watch movies on weekends. I like it because I can relax after a busy week.", "저는 주말에 보통 집에서 영화를 봐요. 바쁜 한 주를 보낸 뒤 쉴 수 있어서 좋아요.", "because를 이용해 이유를 덧붙여 보세요."],
        IH: ["On weekends, I prefer staying home and watching movies. It helps me recharge after a busy week, so I feel refreshed on Monday.", "주말에는 집에서 영화를 보는 걸 좋아해요. 바쁜 한 주를 보낸 뒤 재충전할 수 있어서 월요일에 상쾌한 기분이 들어요.", "선호하는 일과 그 결과를 자연스럽게 연결한 참고 표현이에요."]
      }
    },
    {
      title: "영어 공부 장소",
      type: "유형 3 · 질문에 답하기", number: "연습 2", duration: "답변 연습 15초",
      question: "Where do you usually study English?",
      translation: "보통 어디에서 영어를 공부하나요?",
      answers: {
        IL: ["I study English at home. It is quiet.", "저는 집에서 영어를 공부해요. 조용해요.", "장소를 먼저 말하고 특징 하나를 더하세요."],
        IM: ["I usually study English at home because it is quiet. I can focus better there.", "저는 조용하기 때문에 보통 집에서 영어를 공부해요. 그곳에서 더 집중할 수 있어요.", "장소 + because + 이유 순서로 말해 보세요."],
        IH: ["I prefer studying English at home since it is quiet and comfortable. Without distractions, I can concentrate on speaking practice.", "집이 조용하고 편안해서 영어를 집에서 공부하는 편이에요. 방해받지 않고 말하기 연습에 집중할 수 있어요.", "비슷한 뜻을 여러 문장으로 자연스럽게 연결하는 방법을 참고하세요."]
      }
    },
    {
      title: "시간표 정보 활용",
      type: "유형 4 · 제공 정보로 답하기", number: "연습 3", duration: "답변 연습 15초",
      question: "What time does the beginner English class start?",
      translation: "초급 영어 수업은 몇 시에 시작하나요?",
      info: "Beginner English Class · Saturday · 10:00 a.m. · Room 201",
      answers: {
        IL: ["It starts at ten a.m.", "오전 10시에 시작해요.", "표의 시간을 정확하게 전달하세요."],
        IM: ["The beginner English class starts at ten a.m. on Saturday.", "초급 영어 수업은 토요일 오전 10시에 시작해요.", "수업 이름, 요일, 시간을 한 문장에 담아 보세요."],
        IH: ["According to the schedule, the beginner English class begins at ten a.m. on Saturday in Room 201.", "일정표에 따르면 초급 영어 수업은 토요일 오전 10시에 201호에서 시작해요.", "According to the schedule은 정보를 근거로 답할 때 쓰는 참고 표현이에요."]
      }
    },
    {
      title: "의견 제시하기",
      type: "유형 5 · 의견 제시하기", number: "연습 4", duration: "답변 연습 60초",
      question: "Do you prefer studying alone or with others? Why?",
      translation: "혼자 공부하는 것과 다른 사람과 함께 공부하는 것 중 무엇을 더 선호하나요? 왜 그런가요?",
      answers: {
        IL: ["I prefer studying alone. It is quiet, and I can focus.", "저는 혼자 공부하는 것을 더 좋아해요. 조용하고 집중할 수 있어요.", "먼저 I prefer ~로 내 의견을 밝히세요."],
        IM: ["I prefer studying alone because I can focus better. For example, when I study at home, I can follow my own schedule and take breaks when I need them.", "혼자 공부하면 더 잘 집중할 수 있어서 좋아요. 예를 들어 집에서는 제 일정에 맞춰 공부하고 필요할 때 쉴 수 있어요.", "의견 → 이유 → 예시의 세 단계로 말해 보세요."],
        IH: ["I prefer studying alone because I can manage my time more effectively. For example, when I prepare for an English test, I can spend extra time on difficult topics without slowing anyone else down. This allows me to stay focused and make steady progress.", "시간을 더 효율적으로 관리할 수 있기 때문에 혼자 공부하는 편을 선호해요. 예를 들어 영어 시험을 준비할 때 다른 사람의 속도에 맞출 필요 없이 어려운 주제에 시간을 더 쓸 수 있어요. 덕분에 집중력을 유지하고 꾸준히 발전할 수 있어요.", "이유를 구체적인 사례와 결과까지 확장하는 참고 답변이에요."]
      }
    }
  ];
  const levelNames = {
    IL: "IL · 짧고 쉬운 기본 답변",
    IM: "IM · 이유를 더한 목표 답변",
    IH: "IH · 확장 표현 참고 답변"
  };
  let index = 0;
  let level = "IL";
  const escapeHtml = value => String(value).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  root.innerHTML = '<div class="ts-shell">' +
    '<div class="ts-intro"><span class="ts-kicker">BEGINNER PRACTICE · 무료 예시답변</span>' +
    '<h2>짧게 말하고, 한 문장씩 늘려가요</h2>' +
    '<p>IL로 시작해 IM까지 연습해 보세요. IH는 표현을 확장할 때 참고하면 돼요.</p></div>' +
    '<div class="ts-question-picker" role="group" aria-label="연습 문제 선택">' +
      exercises.map((e, i) => '<button type="button" class="ts-pick" data-ts-index="' + i + '">' +
        '<span>' + escapeHtml(e.number) + '</span><strong>' + escapeHtml(e.title) + '</strong></button>').join("") +
    '</div>' +
    '<article class="ts-card" aria-labelledby="ts-question-title">' +
      '<div class="ts-question-meta"><span id="ts-type"></span><span id="ts-duration"></span></div>' +
      '<h3 id="ts-question-title"></h3><p id="ts-question-translation" class="ts-translation"></p>' +
      '<div id="ts-info" class="ts-info" hidden></div>' +
      '<div class="ts-level-heading"><strong>난이도별 예시답변</strong><span>IL · IM 목표 / IH 참고</span></div>' +
      '<div class="ts-levels" role="tablist" aria-label="답변 난이도 선택">' +
        '<button type="button" role="tab" class="ts-level" data-ts-level="IL">IL 기본</button>' +
        '<button type="button" role="tab" class="ts-level" data-ts-level="IM">IM 목표</button>' +
        '<button type="button" role="tab" class="ts-level" data-ts-level="IH">IH 참고</button></div>' +
      '<div class="ts-answer" role="tabpanel" aria-live="polite">' +
        '<div id="ts-level-label" class="ts-answer-label"></div>' +
        '<p id="ts-answer-en" lang="en"></p>' +
        '<div class="ts-answer-divider"></div>' +
        '<p id="ts-answer-ko"></p>' +
        '<p id="ts-hint" class="ts-hint"></p>' +
      '</div>' +
      '<div class="ts-card-actions">' +
        '<button type="button" id="ts-prev" class="ts-next-button">← 이전 문제</button>' +
        '<span id="ts-progress" aria-live="polite"></span>' +
        '<button type="button" id="ts-next" class="ts-next-button ts-next-primary">다음 문제 →</button>' +
      '</div>' +
    '</article>' +
    '<p class="ts-note">IL·IM·IH는 학습용 답변 난이도 표시예요. 실제 TOEIC Speaking 성적이나 ETS 공식 문항·채점이 아닙니다. 이 화면은 서버 없이 작동하며, 녹음·AI 채점은 포함하지 않아요.</p>' +
  '</div>';

  function render() {
    const exercise = exercises[index];
    const answer = exercise.answers[level];
    root.querySelector("#ts-type").textContent = exercise.type;
    root.querySelector("#ts-duration").textContent = exercise.duration;
    root.querySelector("#ts-question-title").textContent = exercise.question;
    root.querySelector("#ts-question-translation").textContent = exercise.translation;
    const info = root.querySelector("#ts-info");
    info.hidden = !exercise.info;
    info.textContent = exercise.info || "";
    root.querySelector("#ts-level-label").textContent = levelNames[level];
    root.querySelector("#ts-answer-en").textContent = answer[0];
    root.querySelector("#ts-answer-ko").textContent = answer[1];
    root.querySelector("#ts-hint").textContent = "학습 팁 · " + answer[2];
    root.querySelector("#ts-progress").textContent = (index + 1) + " / " + exercises.length;
    root.querySelector("#ts-prev").disabled = index === 0;
    root.querySelector("#ts-next").disabled = index === exercises.length - 1;
    root.querySelectorAll("[data-ts-level]").forEach(button => {
      const selected = button.dataset.tsLevel === level;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    root.querySelectorAll("[data-ts-index]").forEach(button => {
      const selected = Number(button.dataset.tsIndex) === index;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  root.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button || !root.contains(button)) return;
    if (button.dataset.tsLevel) level = button.dataset.tsLevel;
    else if (button.dataset.tsIndex !== undefined) index = Number(button.dataset.tsIndex);
    else if (button.id === "ts-prev") index = Math.max(0, index - 1);
    else if (button.id === "ts-next") index = Math.min(exercises.length - 1, index + 1);
    else return;
    render();
  });
  root.querySelector(".ts-levels").addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const levels = ["IL", "IM", "IH"];
    const current = levels.indexOf(level);
    level = levels[event.key === "Home" ? 0 : event.key === "End" ? 2 :
      (current + (event.key === "ArrowRight" ? 1 : 2)) % levels.length];
    event.preventDefault();
    render();
    root.querySelector('[data-ts-level="' + level + '"]').focus();
  });
  render();
}());

/* JINI study-time statistics. Local, versioned records for eventual account migration. */
(function () {
  "use strict";

  const KEY = "jini-study-time-v1";
  const IDLE_MS = 90 * 1000;
  const MAX_TICK_MS = 20 * 1000;
  const ENGLISH = new Set(["vocabulary", "player", "english-expressions",
    "english-expression-player", "verb-forms", "english-game",
    "speaking", "opic", "opic-basic", "opic-mock"]);
  const KOREAN = new Set(["ko-vocabulary", "ko-player", "ko-expressions",
    "ko-expression-player", "ko-game"]);
  const root = document.getElementById("jini-study-time-root");
  if (!root) return;

  let page = "home";
  let lastTick = Date.now();
  let lastActivity = lastTick;
  let selectedView = "calendar";
  let selectedLanguage = "all";
  const today = new Date();
  let monthCursor = new Date(today.getFullYear(), today.getMonth(), 1);
  let selectedDay = dayKey(today);
  let storageFailed = false;

  function dayKey(date) {
    return date.getFullYear() + "-" +
      String(date.getMonth() + 1).padStart(2, "0") + "-" +
      String(date.getDate()).padStart(2, "0");
  }
  function parseDay(key) {
    const parts = String(key).split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  function newData() {
    return { schema: 1, deviceId: "jini-" + Date.now().toString(36) +
      "-" + Math.random().toString(36).slice(2, 10), days: {} };
  }
  let fallback = newData();
  function readData() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.schema === 1 && parsed.days &&
          typeof parsed.days === "object" && !Array.isArray(parsed.days)) {
        fallback = parsed;
        return parsed;
      }
    } catch (_) { storageFailed = true; }
    return fallback;
  }
  function writeData(data) {
    fallback = data;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      storageFailed = false;
    } catch (_) { storageFailed = true; }
    notifyToday();
  }
  function notifyToday() {
    window.dispatchEvent(new Event("jini-study-time-updated"));
  }
  function languageFor(pageName) {
    return ENGLISH.has(pageName) ? "english" : KOREAN.has(pageName) ? "korean" : null;
  }
  function addTime(start, end, language) {
    if (!language || end <= start) return;
    const data = readData();
    let cursor = start;
    while (cursor < end) {
      const date = new Date(cursor);
      const midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
      const segmentEnd = Math.min(end, midnight);
      const key = dayKey(date);
      const record = data.days[key] || { englishMs: 0, koreanMs: 0 };
      const field = language + "Ms";
      record[field] = Math.max(0, Number(record[field]) || 0) + segmentEnd - cursor;
      data.days[key] = record;
      cursor = segmentEnd;
    }
    writeData(data);
  }
  function voicePlaying() {
    try {
      return !!(window.speechSynthesis && window.speechSynthesis.speaking &&
        !window.speechSynthesis.paused);
    } catch (_) { return false; }
  }
  function settle(forceVisible) {
    const now = Date.now();
    const study = languageFor(page);
    if (study && (!document.hidden || forceVisible)) {
      // Do not credit large gaps when mobile browsers sleep in the background.
      const start = Math.max(lastTick, now - MAX_TICK_MS);
      const until = voicePlaying() ? now : Math.min(now, lastActivity + IDLE_MS);
      if (until > start && until - start >= 1000) addTime(start, until, study);
    }
    lastTick = now;
  }
  function markActivity() {
    // Settle *before* reactivating, so a returning learner isn't credited idle time.
    settle();
    lastActivity = Date.now();
  }
  function onNavigate(nextPage) {
    settle();
    page = nextPage;
    lastTick = Date.now();
    lastActivity = lastTick;
    if (page === "study-info") render();
    if (page === "home") notifyToday();
  }
  function duration(milliseconds) {
    const ms = Math.max(0, Number(milliseconds) || 0);
    if (!ms) return "0분";
    if (ms < 60000) return "1분 미만";
    const min = Math.floor(ms / 60000);
    const h = Math.floor(min / 60);
    return h ? h + "시간" + (min % 60 ? " " + (min % 60) + "분" : "") : min + "분";
  }
  function getMs(data, key, language) {
    const item = data.days[key] || {};
    const en = Math.max(0, Number(item.englishMs) || 0);
    const ko = Math.max(0, Number(item.koreanMs) || 0);
    return language === "english" ? en : language === "korean" ? ko : en + ko;
  }
  function getToday(language) {
    const value = ["english", "korean"].includes(language) ? getMs(readData(), dayKey(new Date()), language) : 0;
    const milliseconds = Number.isFinite(value) && value >= 0 ? value : 0;
    return { milliseconds: milliseconds, label: duration(milliseconds) };
  }
  function monthTotal(data, year, month, language) {
    const days = new Date(year, month + 1, 0).getDate();
    let sum = 0, activeDays = 0;
    for (let d = 1; d <= days; d++) {
      const amount = getMs(data, dayKey(new Date(year, month, d)), language);
      sum += amount;
      if (amount > 0) activeDays++;
    }
    return { sum: sum, activeDays: activeDays };
  }
  function streak(data, language) {
    const date = new Date();
    if (!getMs(data, dayKey(date), language)) date.setDate(date.getDate() - 1);
    let count = 0;
    while (count < 3650 && getMs(data, dayKey(date), language) > 0) {
      count++;
      date.setDate(date.getDate() - 1);
    }
    return count;
  }
  function calendar(data) {
    const year = monthCursor.getFullYear();
    const month = monthCursor.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const max = new Date(year, month + 1, 0).getDate();
    const thisDay = dayKey(new Date());
    const cells = [];
    for (let i = 0; i < firstWeekday; i++) cells.push('<span class="jst-blank"></span>');
    for (let d = 1; d <= max; d++) {
      const key = dayKey(new Date(year, month, d));
      const ms = getMs(data, key, selectedLanguage);
      const mins = Math.floor(ms / 60000);
      const tone = ms >= 3600000 ? "tone-4" : ms >= 1800000 ? "tone-3" :
        ms >= 600000 ? "tone-2" : ms > 0 ? "tone-1" : "tone-0";
      const future = key > thisDay;
      cells.push('<button type="button" class="jst-day jst-' + tone +
        (key === selectedDay ? ' is-selected' : '') +
        (key === thisDay ? ' is-today' : '') +
        '" data-day="' + key + '"' + (future ? ' disabled' : '') +
        ' aria-label="' + key + ', 공부 ' + duration(ms) + '"' +
        (key === selectedDay ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>' +
        '<strong>' + d + '</strong><span>' + (ms ? (mins || "<1") + "분" : "·") + '</span></button>');
    }
    const selectedTotal = getMs(data, selectedDay, selectedLanguage);
    const selectedEnglish = getMs(data, selectedDay, "english");
    const selectedKorean = getMs(data, selectedDay, "korean");
    const sum = selectedEnglish + selectedKorean;
    const englishPct = sum ? (selectedEnglish / sum * 100).toFixed(1) : 0;
    const koreanPct = sum ? (selectedKorean / sum * 100).toFixed(1) : 0;
    return '<div class="jst-card">' +
      '<div class="jst-monthbar"><button type="button" data-action="prev" aria-label="이전 달">‹</button>' +
      '<h2>' + year + '년 ' + (month + 1) + '월</h2>' +
      '<button type="button" data-action="next" aria-label="다음 달"' +
      (year === new Date().getFullYear() && month === new Date().getMonth() ? ' disabled' : '') +
      '>›</button></div>' +
      '<div class="jst-calendar-weekdays">' + ["일","월","화","수","목","금","토"].map(function (name) {
        return '<span>' + name + '</span>';
      }).join("") + '</div><div class="jst-calendar">' + cells.join("") + '</div>' +
      '<p class="jst-legend"><span>공부시간</span><i class="jst-tone-0"></i> 0분 ' +
      '<i class="jst-tone-1"></i> ~9분 <i class="jst-tone-2"></i> 10~29분 ' +
      '<i class="jst-tone-3"></i> 30~59분 <i class="jst-tone-4"></i> 60분+</p></div>' +
      '<div class="jst-card jst-detail"><h2>📅 ' + selectedDay.replace(/-/g, ".") + ' 학습 내역</h2>' +
      '<strong class="jst-time-large">' + duration(selectedTotal) + '</strong>' +
      '<div class="jst-splitbar"><span style="width:' + englishPct + '%"></span>' +
      '<span style="width:' + koreanPct + '%"></span></div>' +
      '<div class="jst-language-times"><span>📘 영어 <strong>' + duration(selectedEnglish) +
      '</strong></span><span>📕 한글 <strong>' + duration(selectedKorean) + '</strong></span></div>' +
      (sum ? '' : '<p class="jst-empty">이날은 아직 기록된 학습시간이 없어요.</p>') + '</div>';
  }
  function daily(data) {
    const anchor = Math.min(parseDay(selectedDay).getTime(), Date.now());
    const rows = [];
    let weekTotal = 0;
    for (let i = 6; i >= 0; i--) {
      const dt = new Date(anchor);
      dt.setDate(dt.getDate() - i);
      const key = dayKey(dt);
      const ms = getMs(data, key, selectedLanguage);
      weekTotal += ms;
      rows.push({ label: (dt.getMonth() + 1) + "/" + dt.getDate(), ms: ms });
    }
    const peak = Math.max(60000, ...rows.map(function (r) { return r.ms; }));
    return '<div class="jst-card"><h2>최근 7일 학습시간</h2>' +
      '<p class="jst-subtitle">' + rows[0].label + ' ~ ' + rows[6].label +
      ' · 달력에서 날짜를 선택하면 기준일이 바뀌어요.</p>' +
      '<div class="jst-bars">' + rows.map(function (r) {
        return '<div class="jst-bar-row"><span>' + r.label + '</span>' +
          '<div class="jst-bar-track"><div style="width:' +
          (r.ms ? Math.max(1, r.ms / peak * 100).toFixed(1) : 0) +
          '%"></div></div><strong>' + duration(r.ms) + '</strong></div>';
      }).join("") + '</div><div class="jst-totalline"><span>7일 누적</span><strong>' +
      duration(weekTotal) + '</strong></div></div>';
  }
  function monthly(data) {
    const rows = [];
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(monthCursor.getFullYear(), monthCursor.getMonth() - i, 1);
      const summary = monthTotal(data, dt.getFullYear(), dt.getMonth(), selectedLanguage);
      rows.push({ label: dt.getFullYear() + "." + String(dt.getMonth() + 1).padStart(2, "0"),
        ms: summary.sum, days: summary.activeDays });
    }
    const peak = Math.max(60000, ...rows.map(function (r) { return r.ms; }));
    return '<div class="jst-card"><h2>월별 누적 학습시간</h2>' +
      '<p class="jst-subtitle">선택한 달을 포함한 최근 6개월</p><div class="jst-bars">' +
      rows.map(function (r) {
        return '<div class="jst-bar-row"><span>' + r.label + '</span>' +
          '<div class="jst-bar-track"><div style="width:' +
          (r.ms ? Math.max(1, r.ms / peak * 100).toFixed(1) : 0) +
          '%"></div></div><strong>' + duration(r.ms) + '</strong></div>';
      }).join("") + '</div><div class="jst-totalline"><span>6개월 누적</span><strong>' +
      duration(rows.reduce(function (n, r) { return n + r.ms; }, 0)) +
      '</strong></div></div>';
  }
  function render() {
    const data = readData();
    const total = monthTotal(data, monthCursor.getFullYear(), monthCursor.getMonth(), selectedLanguage);
    const tabs = [["calendar", "달력"], ["daily", "일별"], ["monthly", "월별"]].map(function (entry) {
      return '<button type="button" data-view="' + entry[0] + '"' +
        (selectedView === entry[0] ? ' class="active" aria-pressed="true"' : ' aria-pressed="false"') +
        '>' + entry[1] + '</button>';
    }).join("");
    const filters = [["all", "전체"], ["english", "📘 영어"], ["korean", "📕 한글"]].map(function (entry) {
      return '<button type="button" data-lang="' + entry[0] + '"' +
        (selectedLanguage === entry[0] ? ' class="active" aria-pressed="true"' : ' aria-pressed="false"') +
        '>' + entry[1] + '</button>';
    }).join("");
    root.innerHTML = '<div class="jst-heading"><div><span class="jst-eyebrow">MY STUDY RECORD</span>' +
      '<h1>📊 나의 학습정보</h1><p>영어·한글 공부시간을 달력과 통계로 확인해요.</p></div>' +
      '<button type="button" data-action="home" class="jst-back">← 홈으로</button></div>' +
      '<div class="jst-summary">' +
      '<article><span>선택한 달 누적</span><strong>' + duration(total.sum) + '</strong></article>' +
      '<article><span>선택한 달 학습일</span><strong>' + total.activeDays + '일</strong></article>' +
      '<article><span>연속 학습</span><strong>🔥 ' + streak(data, selectedLanguage) + '일</strong></article></div>' +
      '<div class="jst-controls"><div class="jst-switch jst-filters" role="group" aria-label="학습 언어">' +
      filters + '</div><div class="jst-switch jst-views" role="group" aria-label="통계 보기">' +
      tabs + '</div></div>' +
      (selectedView === "calendar" ? calendar(data) :
        selectedView === "daily" ? daily(data) : monthly(data)) +
      '<p class="jst-note">실제 학습 화면에서 활동한 시간만 이 기기에 저장해요. ' +
      '약 90초간 조작이 없으면 타이머가 멈춰요(음성 재생 중 제외). ' +
      '기존 기록에 없던 과거 공부시간은 소급되지 않아요.</p>' +
      (storageFailed ? '<p class="jst-error">브라우저 저장공간에 기록을 저장하지 못했어요. 저장공간과 브라우저 설정을 확인해 주세요.</p>' : '');
  }

  root.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.view) selectedView = button.dataset.view;
    else if (button.dataset.lang) selectedLanguage = button.dataset.lang;
    else if (button.dataset.day) selectedDay = button.dataset.day;
    else if (button.dataset.action === "prev" || button.dataset.action === "next") {
      monthCursor = new Date(monthCursor.getFullYear(), monthCursor.getMonth() +
        (button.dataset.action === "prev" ? -1 : 1), 1);
      const todayDate = new Date();
      const todayMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
      if (monthCursor > todayMonth) monthCursor = todayMonth;
      selectedDay = dayKey(new Date(monthCursor.getFullYear(), monthCursor.getMonth(),
        Math.min(todayDate > monthCursor ? new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 0).getDate() : 1,
          monthCursor.getTime() === todayMonth.getTime() ? todayDate.getDate() : 1)));
    } else if (button.dataset.action === "home") {
      document.querySelector('.home-nav [data-page="home"]').click();
      return;
    }
    render();
  });

  ["pointerdown", "keydown", "touchstart", "scroll"].forEach(function (name) {
    document.addEventListener(name, markActivity, { passive: true });
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) settle(true);
    lastTick = Date.now();
    if (!document.hidden) { lastActivity = lastTick; notifyToday(); }
  });
  window.addEventListener("pagehide", function () { settle(true); });
  window.addEventListener("storage", function (event) {
    if (event.key === KEY) {
      if (page === "study-info") render();
      notifyToday();
    }
  });
  window.addEventListener("jini-learning-progress-merged", function () {
    if (page === "study-info") render();
    notifyToday();
  });
  window.setInterval(function () {
    settle();
    if (page === "study-info") render();
    if (page === "home") notifyToday();
  }, 10000);
  window.JINI_STUDY_TIME = { navigate: onNavigate, getToday: getToday };
}());



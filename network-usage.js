/* Device-only JINI traffic estimates. No analytics or measurement requests. */
(function () {
  "use strict";
  const root = document.getElementById("jini-network-usage-root");
  if (!root) return;
  const PREFIX = "jini-network-usage-v1:";
  // Separate writers prevent two open JINI tabs from overwriting each other.
  const writerKey = PREFIX + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
  const own = { schema: 1, days: {} };
  const seen = new Set();
  let timer = null, storageFailed = false;
  function dayKey(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }
  function dayAgo(count) {
    const date = new Date();
    date.setDate(date.getDate() - count);
    return dayKey(date);
  }
  function bytes(value) {
    return Number.isSafeInteger(value) && value >= 0 ? value : 0;
  }
  function emptyDay() { return { download: 0, upload: 0, unknown: 0 }; }
  function bodyBytes(body) {
    if (!body) return 0;
    const text = typeof body === "string" ? body : JSON.stringify(body);
    return new TextEncoder().encode(text).byteLength;
  }
  function formatBytes(value) {
    if (value < 1024) return value.toLocaleString("ko-KR") + " B";
    if (value < 1048576) return (value / 1024).toFixed(1) + " KB";
    if (value < 1073741824) return (value / 1048576).toFixed(2) + " MB";
    return (value / 1073741824).toFixed(2) + " GB";
  }
  function totals() {
    const all = {};
    function include(record) {
      if (!record || record.schema !== 1 || !record.days || typeof record.days !== "object") return;
      for (const [key, row] of Object.entries(record.days)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || key < dayAgo(89) || key > dayAgo(0) || !row) continue;
        const total = all[key] || (all[key] = emptyDay());
        total.download += bytes(row.download);
        total.upload += bytes(row.upload);
        total.unknown += bytes(row.unknown);
      }
    }
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith(PREFIX) || key === writerKey) continue;
        try { include(JSON.parse(localStorage.getItem(key))); } catch (_) {}
      }
    } catch (_) { storageFailed = true; }
    include(own);
    return all;
  }
  function render() {
    const all = totals(), today = all[dayAgo(0)] || emptyDay();
    const expanded = !!root.querySelector("details")?.open;
    const rows = Array.from({ length: 7 }, function (_, i) {
      const key = dayAgo(i), row = all[key];
      return '<tr><th scope="row">' + key + '</th><td>' + (row ? formatBytes(row.download + row.upload) : "기록 없음") + '</td></tr>';
    }).join("");
    root.innerHTML = '<div class="jsy-usage-today"><span>오늘 사용량 <small>(추정)</small></span><strong>' + formatBytes(today.download + today.upload) + '</strong></div>' +
      '<p class="jsy-muted">다운로드 ' + formatBytes(today.download) + ' · 업로드 ' + formatBytes(today.upload) + '</p>' +
      '<details class="jsy-usage-history"' + (expanded ? ' open' : '') + '><summary>최근 7일 사용량</summary><table><caption>이 브라우저의 JINI 일별 추정 전송량</caption><thead><tr><th scope="col">날짜</th><th scope="col">사용량</th></tr></thead><tbody>' + rows + '</tbody></table></details>' +
      '<p class="jsy-muted">이 기기·이 브라우저에서 지니 이용 중 발생한 통신만 집계해요. Wi-Fi와 모바일 데이터는 구분할 수 없어 합산해 표시해요. 기록은 이 브라우저에만 보관해요.</p>' +
      '<p class="jsy-muted">사이트 파일 다운로드와 Drive 백업·복원 데이터를 기준으로 한 추정치예요. 캐시에서 불러온 파일은 추가 다운로드로 세지 않아요. 압축·통신 부가 데이터 및 확인할 수 없는 외부 음성·인증 통신 때문에 통신사 사용량과 다를 수 있어요.</p>' +
      (today.unknown ? '<p class="jsy-muted">오늘 전송량을 확인할 수 없는 요청 ' + today.unknown.toLocaleString("ko-KR") + '건은 합계에서 제외했어요.</p>' : '') +
      (!window.performance || !window.performance.getEntriesByType ? '<p class="jsy-muted">이 브라우저는 파일 전송량 측정을 지원하지 않아 Drive 통신만 집계해요.</p>' : '') +
      (storageFailed ? '<p class="jsy-muted">브라우저 저장을 사용할 수 없어 현재 열린 화면의 집계만 유지돼요.</p>' : '');
  }
  function flush() {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
    for (const key of Object.keys(own.days)) if (key < dayAgo(89)) delete own.days[key];
    try { localStorage.setItem(writerKey, JSON.stringify(own)); }
    catch (_) { storageFailed = true; }
    render();
  }
  function add(download, upload, unknown, at) {
    const date = new Date(at === undefined ? Date.now() : at);
    if (!Number.isFinite(date.getTime())) return;
    const key = dayKey(date);
    const row = own.days[key] || (own.days[key] = emptyDay());
    row.download += bytes(download);
    row.upload += bytes(upload);
    row.unknown += bytes(unknown);
    if (timer === null) timer = window.setTimeout(flush, 250);
  }
  function isDrive(url) {
    return url.origin === "https://www.googleapis.com" && /^\/(?:upload\/)?drive\/v3\//.test(url.pathname);
  }
  function observeEntry(entry) {
    if (entry.entryType !== "navigation" && entry.entryType !== "resource") return;
    let url;
    try { url = new URL(entry.name); } catch (_) { return; }
    if (!/^https?:$/.test(url.protocol) || isDrive(url)) return;
    const id = [entry.entryType, entry.name, entry.startTime, entry.responseEnd].join("|");
    if (seen.has(id)) return;
    seen.add(id);
    const size = bytes(entry.transferSize);
    const cached = !size && (bytes(entry.decodedBodySize) > 0 || entry.deliveryType === "cache");
    const origin = window.performance.timeOrigin;
    const at = Number.isFinite(origin) && Number.isFinite(entry.responseEnd) ? origin + entry.responseEnd : Date.now();
    add(size, 0, !size && !cached ? 1 : 0, at);
  }
  // Drive response bodies are counted here, since cross-origin timing data
  // usually hides their sizes. The resource observer skips the same requests.
  window.JINI_NETWORK_USAGE = {
    recordDrive: function (uploadBody, downloadBody) {
      try { add(bodyBytes(downloadBody), bodyBytes(uploadBody), 0); } catch (_) {}
    }
  };
  const perf = window.performance;
  if (perf && perf.getEntriesByType) {
    let observing = false;
    if (window.PerformanceObserver) {
      try {
        const observer = new window.PerformanceObserver(function (list) {
          list.getEntries().forEach(observeEntry);
        });
        observer.observe({ type: "resource", buffered: true });
        observing = true;
      } catch (_) {}
    }
    function collect() {
      perf.getEntriesByType("navigation").forEach(observeEntry);
      if (!observing) perf.getEntriesByType("resource").forEach(observeEntry);
    }
    if (document.readyState === "complete") collect();
    else window.addEventListener("load", collect, { once: true });
    // Older browsers without observers can still collect resources on return.
    document.addEventListener("visibilitychange", function () { if (!document.hidden) collect(); });
  }
  window.addEventListener("pagehide", flush);
  window.addEventListener("storage", function (event) {
    if (event.key === null || event.key.startsWith(PREFIX)) render();
  });
  document.addEventListener("visibilitychange", function () { if (document.hidden) flush(); });
  if (window.setInterval) window.setInterval(function () { if (!document.hidden) render(); }, 60000);
  // Remove expired tab journals so daily estimates cannot grow indefinitely.
  try {
    const expired = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(PREFIX)) continue;
      try {
        const saved = JSON.parse(localStorage.getItem(key));
        if (saved && saved.schema === 1 && saved.days && Object.keys(saved.days).every(function (day) {
          return /^\d{4}-\d{2}-\d{2}$/.test(day) && day < dayAgo(89);
        })) expired.push(key);
      } catch (_) {}
    }
    expired.forEach(function (key) { localStorage.removeItem(key); });
  } catch (_) {}
  render();
}());

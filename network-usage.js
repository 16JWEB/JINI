/* Local-only JINI network estimates; never sends telemetry. */
(function () {
  "use strict";
  const root = document.getElementById("jini-network-usage-root");
  if (!root) return;

  const PREFIX = "jini-network-usage-v1:";
  const writerKey = PREFIX + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
  const own = { schema: 2, days: {} };
  const seen = new Set();
  const GROUPS = [
    ["learning", "학습 데이터 (단어·표현)"],
    ["scripts", "사이트 기능 (JavaScript)"],
    ["images", "이미지·캐릭터"],
    ["styles", "디자인·폰트"],
    ["pages", "페이지 (HTML)"],
    ["driveUpload", "Google Drive 업로드"],
    ["driveDownload", "Google Drive 다운로드"],
    ["external", "외부 리소스"],
    ["other", "기타 파일"],
    ["legacy", "이전 기록 (분류 불가)"]
  ];
  let timer = null, storageFailed = false, refreshEntries = function () {};

  function dayKey(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }
  function dayAgo(count) {
    const d = new Date();
    d.setDate(d.getDate() - count);
    return dayKey(d);
  }
  function bytes(value) {
    return Number.isSafeInteger(value) && value >= 0 ? value : 0;
  }
  function emptyDay() { return { download: 0, upload: 0, unknown: 0, groups: {}, files: {} }; }
  function bodyBytes(body) {
    if (!body) return 0;
    const content = typeof body === "string" ? body : JSON.stringify(body);
    return new TextEncoder().encode(content).byteLength;
  }
  function formatBytes(value) {
    if (value < 1024) return Math.round(value).toLocaleString("ko-KR") + " B";
    if (value < 1048576) return (value / 1024).toFixed(1) + " KB";
    if (value < 1073741824) return (value / 1048576).toFixed(2) + " MB";
    return (value / 1073741824).toFixed(2) + " GB";
  }
  function safeText(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }
  function addGroup(row, group, download, upload) {
    const item = row.groups[group] || (row.groups[group] = { download: 0, upload: 0 });
    item.download += bytes(download);
    item.upload += bytes(upload);
  }
  function totals() {
    const all = {};
    const start = dayAgo(89), end = dayAgo(0);
    function include(record) {
      if (!record || (record.schema !== 1 && record.schema !== 2) ||
          !record.days || typeof record.days !== "object") return;
      for (const [key, original] of Object.entries(record.days)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(key) || key < start || key > end || !original) continue;
        const total = all[key] || (all[key] = emptyDay());
        const down = bytes(original.download), up = bytes(original.upload);
        total.download += down;
        total.upload += up;
        total.unknown += bytes(original.unknown);
        let categorized = 0;
        if (original.groups && typeof original.groups === "object") {
          Object.entries(original.groups).forEach(function ([group, item]) {
            if (!item || typeof item !== "object") return;
            const d = bytes(item.download), u = bytes(item.upload);
            addGroup(total, group, d, u);
            categorized += d + u;
          });
        }
        const remainder = Math.max(0, down + up - categorized);
        if (remainder) addGroup(total, "legacy", remainder, 0);
        if (original.files && typeof original.files === "object") {
          Object.entries(original.files).forEach(function ([file, amount]) {
            if (file.length > 100) return;
            total.files[file] = (total.files[file] || 0) + bytes(amount);
          });
        }
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
  function category(url, entryType) {
    if (url.origin !== location.origin) return "external";
    if (entryType === "navigation" || /\.html?$/i.test(url.pathname)) return "pages";
    const file = url.pathname.split("/").pop() || "";
    if (/\.(?:png|jpe?g|gif|webp|avif|svg|ico)$/i.test(file)) return "images";
    if (/\.(?:css|woff2?|ttf|otf)$/i.test(file)) return "styles";
    if (/\.js$/i.test(file)) {
      if (/^(?:words|korean-words|korean-expressions|english-expressions|content-|english-learning-order|korean-learning-order|opic-data|opic-mock-data)/i.test(file))
        return "learning";
      return "scripts";
    }
    return "other";
  }
  function resourceName(url) {
    if (url.origin !== location.origin) return "외부: " + url.hostname.slice(0, 70);
    const name = url.pathname.split("/").pop() || "index.html";
    return decodeSafe(name).slice(0, 95);
  }
  function decodeSafe(s) {
    try { return decodeURIComponent(s); } catch (_) { return s; }
  }
  function render() {
    const all = totals(), today = all[dayAgo(0)] || emptyDay();
    const opened = {};
    root.querySelectorAll("details[data-usage-panel]").forEach(function (el) {
      opened[el.dataset.usagePanel] = el.open;
    });
    const total = today.download + today.upload;
    const groups = GROUPS.map(function (entry) {
      const [key, label] = entry, item = today.groups[key];
      return { key: key, label: label, size: item ? item.download + item.upload : 0 };
    }).filter(function (item) { return item.size > 0; }).sort(function (a, b) { return b.size - a.size; });
    const groupHtml = groups.length ? groups.map(function (g) {
      const share = total ? (g.size / total * 100) : 0;
      return '<div class="jsy-usage-group"><div class="jsy-usage-group-line"><span>' + safeText(g.label) +
        '</span><strong>' + formatBytes(g.size) + ' <small>(' + share.toFixed(1) + '%)</small></strong></div>' +
        '<div class="jsy-usage-track"><span style="width:' + Math.min(100, share).toFixed(2) + '%"></span></div></div>';
    }).join("") : '<p class="jsy-muted">아직 분류 가능한 사용 기록이 없어요. 페이지를 이용하면 새 기록이 쌓여요.</p>';
    const files = Object.entries(today.files).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10);
    const filesHtml = files.length ? '<table><thead><tr><th scope="col">파일·통신</th><th scope="col">다운로드</th></tr></thead><tbody>' +
      files.map(function (item) { return '<tr><th scope="row" class="jsy-usage-file">' + safeText(item[0]) +
        '</th><td>' + formatBytes(item[1]) + '</td></tr>'; }).join("") + '</tbody></table>' :
      '<p class="jsy-muted">새로 측정된 파일이 생기면 여기에 표시돼요.</p>';
    const rows = Array.from({ length: 7 }, function (_, i) {
      const key = dayAgo(i), row = all[key];
      return '<tr><th scope="row">' + key + '</th><td>' +
        (row ? formatBytes(row.download + row.upload) : "기록 없음") + '</td></tr>';
    }).join("");
    root.innerHTML =
      '<div class="jsy-usage-today"><span>오늘 사용량 <small>(추정)</small></span><strong>' + formatBytes(total) + '</strong></div>' +
      '<p class="jsy-muted">다운로드 ' + formatBytes(today.download) + ' · 업로드 ' + formatBytes(today.upload) + '</p>' +
      '<div class="jsy-usage-breakdown"><h3>항목별 사용량</h3>' + groupHtml + '</div>' +
      '<details class="jsy-usage-history" data-usage-panel="files"' + (opened.files ? ' open' : '') +
        '><summary>많이 사용한 파일 TOP 10</summary>' + filesHtml + '</details>' +
      '<details class="jsy-usage-history" data-usage-panel="history"' + (opened.history ? ' open' : '') +
        '><summary>최근 7일 사용량</summary><table><caption>이 브라우저의 JINI 일별 추정 전송량</caption>' +
        '<thead><tr><th scope="col">날짜</th><th scope="col">사용량</th></tr></thead><tbody>' + rows + '</tbody></table></details>' +
      '<p class="jsy-muted">많이 사용한 파일은 기록된 다운로드량 기준이며, Google Drive는 항목별 표에서 업로드·다운로드를 확인할 수 있어요.</p>' +
      '<p class="jsy-muted">이 브라우저에서 측정한 JINI 통신 추정치예요. 데이터는 이 기기에만 저장하며 Wi-Fi/모바일망은 구분하지 않아요. 이전 기록은 항목별로 복원할 수 없어 별도 표시해요.</p>' +
      '<p class="jsy-muted">캐시 파일은 다시 계산하지 않으며, 압축·통신 헤더·브라우저 보안상 크기를 알 수 없는 외부 요청 때문에 휴대전화의 데이터 사용량과 다를 수 있어요.</p>' +
      (today.unknown ? '<p class="jsy-muted">크기를 측정할 수 없는 요청 ' + today.unknown.toLocaleString("ko-KR") + '건은 합계에서 제외했어요.</p>' : '') +
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
  function add(download, upload, unknown, at, group, filename) {
    const date = new Date(at === undefined ? Date.now() : at);
    if (!Number.isFinite(date.getTime())) return;
    const key = dayKey(date);
    const row = own.days[key] || (own.days[key] = emptyDay());
    const down = bytes(download), up = bytes(upload);
    row.download += down;
    row.upload += up;
    row.unknown += bytes(unknown);
    if (group && (down || up)) addGroup(row, group, down, up);
    if (filename && down) {
      row.files[filename] = (row.files[filename] || 0) + down;
    }
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
    add(size, 0, !size && !cached ? 1 : 0, at, category(url, entry.entryType), resourceName(url));
  }
  // Google Drive response bodies are not exposed to cross-origin performance timing.
  // Keep counts separate from resource entries to prevent double counting.
  window.JINI_NETWORK_USAGE = {
    recordDrive: function (uploadBody, downloadBody) {
      try {
        const uploaded = bodyBytes(uploadBody), downloaded = bodyBytes(downloadBody);
        if (uploaded) add(0, uploaded, 0, undefined, "driveUpload");
        if (downloaded) add(downloaded, 0, 0, undefined, "driveDownload");
      } catch (_) {}
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
    refreshEntries = function () {
      // All seen resources remain deduplicated, including those in buffered observations.
      perf.getEntriesByType("navigation").forEach(observeEntry);
      perf.getEntriesByType("resource").forEach(observeEntry);
    };
    if (document.readyState === "complete") collect();
    else window.addEventListener("load", collect, { once: true });
    document.addEventListener("visibilitychange", function () { if (!document.hidden) refreshEntries(); });
  }
  const button = document.getElementById("jini-network-usage-refresh");
  if (button) button.addEventListener("click", function () { refreshEntries(); flush(); });
  window.addEventListener("pagehide", flush);
  window.addEventListener("storage", function (event) {
    if (event.key === null || event.key.startsWith(PREFIX)) render();
  });
  document.addEventListener("visibilitychange", function () { if (document.hidden) flush(); });
  if (window.setInterval) window.setInterval(function () { if (!document.hidden) render(); }, 60000);
  try {
    const expired = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith(PREFIX)) continue;
      try {
        const saved = JSON.parse(localStorage.getItem(key));
        if (saved && (saved.schema === 1 || saved.schema === 2) && saved.days &&
          Object.keys(saved.days).every(function (day) {
            return /^\d{4}-\d{2}-\d{2}$/.test(day) && day < dayAgo(89);
          })) expired.push(key);
      } catch (_) {}
    }
    expired.forEach(function (key) { localStorage.removeItem(key); });
  } catch (_) {}
  render();
}());

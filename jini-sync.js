/* JINI Google Drive 동기화: Google 로그인 인증은 브라우저 메모리에만 유지합니다. */
(function () {
  "use strict";
  const CONFIG_ID = (window.JINI_GOOGLE_CLIENT_ID || "").trim();
  const META_KEY = "jini-drive-sync-meta-v1";
  const REWARD_NOTIFICATIONS_KEY = "jini-character-reward-popups-v1";
  // Reading position belongs to this device, like jini-last-study-state.
  // Page numbers, player cursors and scroll offsets are not learning results.
  const DEVICE_STATE_KEYS = ["jini-last-study-state",
    "jini-vocabulary-level-state-v1", "jini-player-level-state-v1",
    "jini-essential-expressions-positions-v1", "jini-expression-player-state-v1"];
  // Google browser-tab session only. Never include access tokens in localStorage
  // or Drive backups. Google OAuth tokens still expire and must be renewed by
  // an explicit user click after expiry (no server-side refresh token here).
  const SESSION_KEY = "jini-drive-tab-session-v2";
  // Keep the first XP change deadline across a same-tab page reload.
  const XP_BATCH_DUE_KEY = "jini-drive-xp-batch-due-v1";
  const LEGACY_HANDOFF_KEY = "jini-drive-reload-token-once-v1";
  const FOLDER_NAME = "JINI";
  const FILE_NAME = "jini-backup.json";
  // One upload window per first game-progress change; no per-answer requests.
  const XP_BATCH_MS = 5 * 60 * 1000;
  const DRIVE_POLL_MS = 10 * 60 * 1000;
  const RETURN_CHECK_MIN_MS = DRIVE_POLL_MS;
  const SCOPE = "https://www.googleapis.com/auth/drive.file";
  const API = "https://www.googleapis.com/drive/v3/files";
  const UPLOAD_API = "https://www.googleapis.com/upload/drive/v3/files";
  const $ = function (id) { return document.getElementById(id); };
  const root = $("jini-sync-section");
  const syncPage = $("jini-sync-page");
  if (!root || !syncPage) return;
  function syncPageOpen() {
    return !syncPage.hidden;
  }
  let token = "";
  let expiresAt = 0;
  let busy = false;
  let connecting = false;
  let disconnecting = false;
  let connectionStage = "";
  let lastCycleFinishedAt = 0;
  let fileId = "";
  // undefined: not checked yet, null: no backup, number: exact Drive file bytes.
  let driveSizeBytes;
  let conflict = null;
  let confirmAction = null;
  let syncAfterXP = null;
  let xpBatchDueAt = 0;
  let meta = readMeta();
  let accountHintChecked = false;
  // Restore only within the same browser tab, not as a stored site login.
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) ||
      sessionStorage.getItem(LEGACY_HANDOFF_KEY) || "null");
    sessionStorage.removeItem(LEGACY_HANDOFF_KEY);
    if (saved && typeof saved.token === "string" &&
        Number(saved.expiresAt) > Date.now() + 30000) {
      token = saved.token;
      expiresAt = Number(saved.expiresAt);
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch (_) { }
  function keepTabToken() {
    try {
      if (token && expiresAt > Date.now() + 30000)
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token: token, expiresAt: expiresAt }));
      else sessionStorage.removeItem(SESSION_KEY);
    } catch (_) {}
  }
  function clearTabToken() {
    token = "";
    expiresAt = 0;
    try {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(LEGACY_HANDOFF_KEY);
    } catch (_) {}
  }


  function readMeta() {
    try {
      const value = JSON.parse(localStorage.getItem(META_KEY) || "{}");
      return value && typeof value === "object" ? value : {};
    } catch (_) { return {}; }
  }
  function saveMeta() {
    try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch (_) {}
  }
  function included(key) {
    return key.startsWith("jini-") && key !== META_KEY &&
      key !== REWARD_NOTIFICATIONS_KEY && // Device-only notification queue, not earned rewards.
      !DEVICE_STATE_KEYS.includes(key) && !key.startsWith("jini-drive-") &&
      !key.startsWith("jini-network-usage-") && // Traffic belongs to this browser, not learning progress.
      !/oauth|access.?token|refresh.?token|client.?secret|admin.?pass/i.test(key);
  }
  function snapshot() {
    const records = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && included(key)) records[key] = localStorage.getItem(key);
      }
    } catch (_) {}
    const keys = Object.keys(records).sort();
    const sorted = {};
    keys.forEach(function (k) { sorted[k] = records[k]; });
    return sorted;
  }
  // Merely opening JINI can create a level-1 character, a device ID and
  // empty game records. These must NOT block first-time Drive restoration.
  function meaningful(records) {
    return Object.keys(records).some(function (key) {
      const raw = records[key];
      let o;
      try { o = JSON.parse(raw); } catch (_) { return true; }
      if (!o || typeof o !== "object") return !!String(raw).trim();
      if (key === "jini-study-time-v1") {
        return Object.values(o.days || {}).some(function (d) {
          return Number(d.englishMs || 0) > 0 || Number(d.koreanMs || 0) > 0;
        });
      }
      if (key === "jini-english-game-v1" || key === "jini-korean-games-v1") {
        return Number(o.xp || 0) > 0 || Number(o.tries || o.attempts || 0) > 0 ||
          Object.keys(o.items || {}).length > 0;
      }
      if (key === "jini-character-reward-popups-v1") {
        return Object.keys(o).some(function (k) {
          const entry = o[k] || {};
          return Number(entry.observedLevel || 1) > 1 ||
            (Array.isArray(entry.pending) && entry.pending.length > 0);
        });
      }
      if (key === "jini-opic-basic-v1") {
        return (o.completed || []).length > 0 ||
          Object.values(o.answers || {}).some(function (answer) { return !!String(answer || "").trim(); });
      }
      if (key === "jini-learning-bookmarks") {
        return Object.values(o).some(function (v) { return Array.isArray(v) && v.length > 0; });
      }
      if (key === "jini-essential-expressions-bookmarks-v1") {
        return Array.isArray(o) && o.length > 0;
      }
      if (key === "jini-game-character-english-v1" ||
          key === "jini-game-character-korean-v1" || key === "jini-game-character-v1") {
        const isEn = key.includes("english");
        const isKo = key.includes("korean");
        const defaultName = isEn ? "영어 모험가" : "한글 모험가";
        const defaultAvatar = isEn ? "fox" : "rabbit";
        if (!isEn && !isKo) return true; // Legacy customisation: protect it.
        return (o.name && o.name !== defaultName) ||
          (o.avatar && o.avatar !== defaultAvatar) ||
          (o.auraSelection && o.auraSelection !== "auto");
      }
      // Unknown app data is treated as meaningful, never silently overwritten.
      return true;
    });
  }
  // Summaries allow the learner to tell "Google connected" from
  // "actual XP and study history saved/restored".
  function summary(records) {
    function json(k) {
      try { return JSON.parse(records[k] || "null") || {}; } catch (_) { return {}; }
    }
    const en = json("jini-english-game-v1");
    const ko = json("jini-korean-games-v1");
    const study = json("jini-study-time-v1");
    const days = study.days && typeof study.days === "object" ? Object.values(study.days) : [];
    const minutes = Math.floor(days.reduce(function (sum, d) {
      return sum + Math.max(0, Number(d.englishMs || 0)) + Math.max(0, Number(d.koreanMs || 0));
    }, 0) / 60000);
    const enProfile = json("jini-game-character-english-v1");
    const koProfile = json("jini-game-character-korean-v1");
    const legacyProfile = json("jini-game-character-v1");
    const englishName = enProfile.name || legacyProfile.name || "기본 캐릭터";
    const koreanName = koProfile.name || legacyProfile.name || "기본 캐릭터";
    const enXp = Math.max(0, Number(en.xp || 0));
    const koXp = Math.max(0, Number(ko.xp || 0));
    return {
      enXp: enXp, koXp: koXp, minutes: minutes,
      enLevel: Math.floor(enXp / 100) + 1, koLevel: Math.floor(koXp / 100) + 1,
      englishName: englishName, koreanName: koreanName,
      keys: Object.keys(records).length, hasProgress: meaningful(records)
    };
  }
  function description(records) {
    const x = summary(records);
    return "영어 Lv." + x.enLevel + " (" + x.enXp + " XP), 한글 Lv." +
      x.koLevel + " (" + x.koXp + " XP) · 학습시간 " + x.minutes + "분 · 캐릭터 " +
      x.englishName + " / " + x.koreanName +
      (x.hasProgress ? "" : " · 실제 학습기록 없음");
  }
  let driveSnapshot = null;
  let driveChecked = false;
  // Keep only the last confirmed Drive XP totals for comparison after expiry
  // and page reloads. This device-only metadata is never part of a backup.
  function rememberBackedUpXP(records) {
    const totals = summary(records || {});
    if (!Number.isSafeInteger(totals.enXp) || !Number.isSafeInteger(totals.koXp)) return;
    const saved = meta.lastBackedUpXP;
    if (saved && saved.enXp === totals.enXp && saved.koXp === totals.koXp) return;
    meta.lastBackedUpXP = { enXp: totals.enXp, koXp: totals.koXp };
    saveMeta();
  }
  function showDataComparison(remote, note) {
    $("jsy-local-summary").textContent = description(snapshot());
    if (remote === null) {
      $("jsy-remote-summary").textContent = "백업 파일 없음";
      driveChecked = true;
      driveSnapshot = null;
      rememberBackedUpXP({});
    } else if (remote) {
      $("jsy-remote-summary").textContent = description(remote);
      driveChecked = true;
      driveSnapshot = remote;
      rememberBackedUpXP(remote);
    } else if (!driveChecked) {
      $("jsy-remote-summary").textContent = "아직 확인 전";
    }
    if (note) $("jsy-compare-note").textContent = note;
  }
  // Compare parsed data, not JSON whitespace or object insertion order.
  // Arrays retain their order because it can carry learning/bookmark meaning.
  function stableValue(value) {
    if (Array.isArray(value)) return value.map(stableValue);
    if (value && typeof value === "object") {
      const sorted = {};
      Object.keys(value).sort().forEach(function (key) { sorted[key] = stableValue(value[key]); });
      return sorted;
    }
    return value;
  }
  function recordValue(raw) {
    try { return JSON.stringify(stableValue(JSON.parse(raw))); }
    catch (_) { return raw; }
  }
  function sameRecord(a, b) { return a === b || recordValue(a) === recordValue(b); }
  function differingKeys(local, remote) {
    return Array.from(new Set(Object.keys(local).concat(Object.keys(remote)))).sort()
      .filter(function (key) { return !sameRecord(local[key], remote[key]); });
  }
  function fingerprint(records) {
    const normalized = {};
    Object.keys(records).sort().forEach(function (key) { normalized[key] = recordValue(records[key]); });
    const value = JSON.stringify(normalized);
    let n = 2166136261;
    for (let i = 0; i < value.length; i++) {
      n ^= value.charCodeAt(i);
      n = Math.imul(n, 16777619);
    }
    return String(value.length) + "-" + (n >>> 0).toString(16);
  }
  function mergeStudyTimes(primaryRaw, otherRaw) {
    if (!primaryRaw) return otherRaw || undefined;
    if (!otherRaw || primaryRaw === otherRaw) return primaryRaw;
    let a, b;
    try { a = JSON.parse(primaryRaw); b = JSON.parse(otherRaw); } catch (_) { return null; }
    if (!a || !b || a.schema !== 1 || b.schema !== 1 ||
        !a.days || !b.days || typeof a.days !== "object" || typeof b.days !== "object" ||
        Array.isArray(a.days) || Array.isArray(b.days)) return null;
    const days = {};
    for (const date of Array.from(new Set(Object.keys(a.days).concat(Object.keys(b.days)))).sort()) {
      const rowA = a.days[date] || {}, rowB = b.days[date] || {};
      const en = Math.max(Number(rowA.englishMs || 0), Number(rowB.englishMs || 0));
      const ko = Math.max(Number(rowA.koreanMs || 0), Number(rowB.koreanMs || 0));
      if (![en, ko].every(n => Number.isFinite(n) && n >= 0)) return null;
      days[date] = { englishMs: en, koreanMs: ko };
    }
    // Stable metadata prevents two devices from repeatedly uploading different
    // deviceId values even if their merged durations are identical.
    const deviceIds = [a.deviceId, b.deviceId].filter(id => typeof id === "string").sort();
    const merged = Object.assign({}, a, b, { days: days });
    if (deviceIds.length) merged.deviceId = deviceIds[0];
    return JSON.stringify(merged);
  }
  function creditedQuestion(row) {
    return !!(row && typeof row === "object" &&
      (row.xpAwarded === true || (row.xpAwarded === undefined && Number(row.streak) > 0)));
  }
  function mergeGameHistory(localRaw, remoteRaw, english) {
    if (!localRaw) return remoteRaw || undefined;
    if (!remoteRaw || localRaw === remoteRaw) return localRaw;
    let local, remote;
    try { local = JSON.parse(localRaw); remote = JSON.parse(remoteRaw); } catch (_) { return null; }
    if (!local || !remote || typeof local !== "object" || typeof remote !== "object" ||
        !local.items || !remote.items || typeof local.items !== "object" ||
        typeof remote.items !== "object" || Array.isArray(local.items) || Array.isArray(remote.items)) return null;
    const lp = Number(local.xp), rp = Number(remote.xp);
    if (![lp, rp].every(n => Number.isSafeInteger(n) && n >= 0)) return null;
    const localCount = Object.values(local.items).filter(creditedQuestion).length;
    const remoteCount = Object.values(remote.items).filter(creditedQuestion).length;
    const items = {};
    for (const id of Array.from(new Set(Object.keys(local.items).concat(Object.keys(remote.items)))).sort()) {
      const a = local.items[id], b = remote.items[id];
      if ((a && (typeof a !== "object" || Array.isArray(a))) ||
          (b && (typeof b !== "object" || Array.isArray(b)))) return null;
      if (!a || !b) { items[id] = a || b; continue; }
      if (JSON.stringify(a) === JSON.stringify(b)) { items[id] = a; continue; }
      // Preserve both devices' XP credit for the same question only once.
      // For retry/scheduling state choose the more recent attempt when known.
      const timestamp = row => Number(english ? row.due : row.lastAt) || 0;
      const newest = timestamp(a) >= timestamp(b) ? a : b;
      const older = newest === a ? b : a;
      const merged = Object.assign({}, older, newest);
      merged.wrong = Math.max(Number(a.wrong || 0), Number(b.wrong || 0));
      if (creditedQuestion(a) || creditedQuestion(b)) merged.xpAwarded = true;
      if (!merged.snapshot && (a.snapshot || b.snapshot)) merged.snapshot = a.snapshot || b.snapshot;
      items[id] = merged;
    }
    // XP comes from unique credited question IDs. Preserve the larger legacy
    // XP remainder for old records that lack item-level credit information.
    const uniqueCredits = Object.values(items).filter(creditedQuestion).length;
    const legacy = Math.max(0, lp - localCount * 10, rp - remoteCount * 10);
    const xp = Math.max(lp, rp, uniqueCredits * 10 + legacy);
    const attemptsKey = english ? "tries" : "attempts";
    const localAttempts = Number(local[attemptsKey] || 0), remoteAttempts = Number(remote[attemptsKey] || 0);
    const localCorrect = Number(local.correct || 0), remoteCorrect = Number(remote.correct || 0);
    if (![localAttempts, remoteAttempts, localCorrect, remoteCorrect].every(n =>
        Number.isSafeInteger(n) && n >= 0)) return null;
    const mergedGame = Object.assign({}, remote, local, {
      xp: xp,
      [attemptsKey]: Math.max(localAttempts, remoteAttempts, uniqueCredits),
      correct: Math.max(localCorrect, remoteCorrect, uniqueCredits),
      items: items
    });
    // Unknown future schema fields must agree; never silently lose new data.
    for (const k of Object.keys(local).filter(k => !["xp", attemptsKey, "correct", "items"].includes(k))) {
      if (k in remote && JSON.stringify(local[k]) !== JSON.stringify(remote[k])) return null;
    }
    return JSON.stringify(mergedGame);
  }
  // Merge distinct answered questions, deduplicate XP for questions solved on
  // both devices, and keep unrelated settings untouched when they agree.
  // Unknown conflicting profile/bookmark values still require manual review.
  function mergeIndependentProgress(local, remote) {
    const en = "jini-english-game-v1", ko = "jini-korean-games-v1", time = "jini-study-time-v1";
    const merged = {};
    for (const key of Array.from(new Set(Object.keys(local).concat(Object.keys(remote)))).sort()) {
      const a = local[key], b = remote[key];
      let result;
      if (key === en || key === ko) result = mergeGameHistory(a, b, key === en);
      else if (key === time) result = mergeStudyTimes(a, b);
      else if (a === undefined) result = b;
      else if (b === undefined || sameRecord(a, b)) result = a;
      else return null;
      if (result === null) return null;
      if (result !== undefined) merged[key] = result;
    }
    return merged;
  }
  // Integrate cloud-side answers without interrupting a running quiz.
  // Game modules reload their cached progress via an explicit event.
  function applyMergedLocally(cloudRecords) {
    const current = snapshot();
    const next = mergeIndependentProgress(current, cloudRecords);
    if (!next) return false;
    let changedGame = false;
    try {
      for (const key of Object.keys(next)) {
        if (current[key] === next[key]) continue;
        localStorage.setItem(key, next[key]);
        if (key === "jini-english-game-v1" || key === "jini-korean-games-v1")
          changedGame = true;
      }
    } catch (_) { return false; }
    if (changedGame) {
      if (window.JINI_CHARACTER && typeof window.JINI_CHARACTER.adoptSyncedLevels === "function")
        window.JINI_CHARACTER.adoptSyncedLevels();
      window.dispatchEvent(new Event("jini-learning-progress-merged"));
    }
    return true;
  }
  function payload(records) {
    return { app: "JINI", schema: 1, exportedAt: new Date().toISOString(), data: records };
  }
  function validate(value) {
    if (!value || value.app !== "JINI" || value.schema !== 1 ||
        !value.data || typeof value.data !== "object" || Array.isArray(value.data)) {
      throw new Error("JINI 백업파일 형식이 올바르지 않습니다.");
    }
    const data = value.data;
    if (Object.keys(data).length > 1000) throw new Error("백업 항목이 너무 많습니다.");
    const restored = {};
    // Legacy backups may contain device-specific reading positions
    // and unrelated localStorage entries. Filter those out; do not reject
    // legitimate XP, character, study-time and bookmark data because of them.
    for (const k of Object.keys(data).sort()) {
      if (typeof data[k] !== "string" || data[k].length > 2000000) {
        throw new Error("백업파일에 잘못된 학습정보가 포함되어 있습니다.");
      }
      if (included(k)) restored[k] = data[k];
    }
    return restored;
  }
  function download(records) {
    const blob = new Blob([JSON.stringify(payload(records), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "JINI-학습데이터-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }
  // Imported XP is existing progress, not a new level-up. Discard only
  // pending reward notifications, while keeping XP, character outfits and auras.
  function restoredRewardProgress(records) {
    // Old backups might still contain a pending-popup queue; never replay it.
    let saved = {};
    try { saved = JSON.parse(records[REWARD_NOTIFICATIONS_KEY] || "null") || {}; } catch (_) {}
    const progress = {};
    [["english", "jini-english-game-v1"], ["korean", "jini-korean-games-v1"]]
      .forEach(function (entry) {
        const study = entry[0], scoreKey = entry[1];
        let score = {};
        try { score = JSON.parse(records[scoreKey] || "null") || {}; } catch (_) {}
        const xp = Number(score.xp);
        const level = Number.isSafeInteger(xp) && xp >= 0 ? Math.floor(xp / 100) + 1 : 1;
        const previous = saved[study] && typeof saved[study] === "object" &&
          !Array.isArray(saved[study]) ? saved[study] : {};
        progress[study] = Object.assign({}, previous, { observedLevel: level, pending: [] });
      });
    return JSON.stringify(progress);
  }
  function applyRecords(records) {
    const existing = snapshot();
    // 복원 전에 현재 기록을 파일로 별도 저장해 실수로 잃지 않게 합니다.
    if (meaningful(existing)) download(existing);
    // Preserve the authorized browser-tab session across this reload.
    if (validToken()) keepTabToken();
    Object.keys(existing).forEach(function (key) { localStorage.removeItem(key); });
    Object.keys(records).forEach(function (key) { localStorage.setItem(key, records[key]); });
    // Replace stale notification state only after the imported data is saved.
    // All restore paths (Drive, conflict resolution, JSON) run through here.
    localStorage.setItem(REWARD_NOTIFICATIONS_KEY, restoredRewardProgress(records));
    window.location.reload();
  }
  function status(message, isError) {
    $("jsy-message").textContent = message;
    $("jsy-message").hidden = !message;
    $("jsy-message").classList.toggle("is-error", !!isError);
  }
  function dateTime(value) {
    if (!value) return "기록 없음";
    try { return new Date(value).toLocaleString("ko-KR"); } catch (_) { return "기록 없음"; }
  }
  function validToken() { return !!token && Date.now() < expiresAt - 30000; }
  function setDriveSize(file) {
    if (!file) { driveSizeBytes = null; return; }
    const value = Number(file.size);
    driveSizeBytes = file.size !== undefined && file.size !== null && file.size !== "" &&
      Number.isFinite(value) && value >= 0 ? value : NaN;
  }
  function formatDriveSize(bytes) {
    if (bytes < 1024) return bytes.toLocaleString("ko-KR") + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(2) + " MB";
  }
  function render() {
    const on = validToken();
    const reconnectNeeded = !on && !!meta.previouslyConnected;
    $("jsy-expired-notice").hidden = !reconnectNeeded || connecting || disconnecting;
    if (reconnectNeeded) {
      const current = summary(snapshot());
      const saved = meta.lastBackedUpXP;
      const known = saved && Number.isSafeInteger(saved.enXp) && saved.enXp >= 0 &&
        Number.isSafeInteger(saved.koXp) && saved.koXp >= 0 &&
        Number.isSafeInteger(current.enXp) && Number.isSafeInteger(current.koXp);
      const englishXP = known ? Math.max(0, current.enXp - saved.enXp) : 0;
      const koreanXP = known ? Math.max(0, current.koXp - saved.koXp) : 0;
      $("jsy-unbacked-xp").textContent = !known ?
        "미백업 경험치는 재연결 후 확인할 수 있어요." : englishXP + koreanXP > 0 ?
        "Drive에 아직 백업되지 않은 경험치 +" + (englishXP + koreanXP).toLocaleString("ko-KR") + " XP" :
        "추가로 백업할 경험치 0 XP";
      $("jsy-unbacked-xp-detail").hidden = !known;
      $("jsy-unbacked-xp-detail").textContent = known ?
        "영어 +" + englishXP.toLocaleString("ko-KR") + " XP · 한글 +" + koreanXP.toLocaleString("ko-KR") + " XP" : "";
      $("jsy-expired-reconnect").textContent = meta.accountEmail ? "이전 계정으로 다시 연결" : "Google 다시 연결";
    }
    $("jsy-expired-reconnect").disabled = on || busy || connecting || disconnecting;
    $("jsy-state").textContent = on ? "Google 연결됨" :
      reconnectNeeded ? "Google 재연결 필요" : "연결 안 됨";
    $("jsy-state").classList.toggle("is-connected", on);
    const equalRecords = on && driveSnapshot &&
      fingerprint(snapshot()) === fingerprint(driveSnapshot);
    // Home menu status is independent of the sync-page visibility. Never
    // label an OAuth connection as "synced" until the snapshots match.
    // Show the same state in the Home menu and the large Home shortcut.
    let syncState = "disconnected";
    let syncMessage = "연결 안 됨";
    if (disconnecting) { syncState = "disconnecting"; syncMessage = "해제 중…"; }
    else if (connecting || busy) { syncState = "syncing"; syncMessage = "동기화 중…"; }
    else if (!on && meta.previouslyConnected) { syncState = "expired"; syncMessage = "인증 만료"; }
    else if (!on && meta.manuallyDisconnected) { syncState = "disconnected"; syncMessage = "해제됨"; }
    else if (on && conflict) { syncState = "attention"; syncMessage = "확인 필요"; }
    else if (on && driveChecked && driveSnapshot && equalRecords) {
      syncState = "synced"; syncMessage = "동기화 완료";
    } else if (on) { syncState = "connected"; syncMessage = "연결됨"; }
    [
      [document.querySelector(".home-sync-link"), $("jini-sync-menu-status")],
      [document.querySelector(".home-sync-quicklink"), $("jini-sync-home-status")]
    ].forEach(function (entry) {
      const link = entry[0], field = entry[1];
      if (!link || !field) return;
      link.dataset.syncState = syncState;
      if (field.textContent !== syncMessage) field.textContent = syncMessage;
      link.setAttribute("aria-label", "학습정보 동기화 · " + syncMessage + " · 열기");
    });
    $("jsy-auto").textContent = !on ? "확인 불가" :
      conflict ? "기록 충돌" : !driveChecked ? "백업 확인 전" :
      driveSnapshot === null ? "백업 없음" :
      equalRecords ? "학습기록 일치" : "";
    $("jsy-learning-status-row").hidden = !$("jsy-auto").textContent;
    $("jsy-last").textContent = dateTime(meta.lastSyncedAt);
    $("jsy-backup-size").textContent = !on ? "Google 연결 후 확인" :
      driveSizeBytes === undefined ? "백업 확인 전" :
      driveSizeBytes === null ? "백업 없음" :
      Number.isFinite(driveSizeBytes) ? formatDriveSize(driveSizeBytes) : "용량 확인 불가";
    $("jsy-connect").disabled = on || busy || connecting || disconnecting;
    $("jsy-connect-label").textContent = connecting || busy ? "↻ 동기화 처리 중" :
      on && conflict ? "⚠ 기록 확인 필요" :
      on && driveChecked && driveSnapshot && equalRecords ? "✓ 동기화 완료" :
      on ? "✓ Google 연결됨" :
      reconnectNeeded ? "↻ Google 다시 연결" : "↻ 동기화 하기";
    $("jsy-connect-progress").hidden = !(connecting || busy);
    $("jsy-connect-progress").textContent = connecting ?
      (connectionStage || "Google 인증 중…") : "학습기록 확인 중…";
    // Allow an explicit local disconnect even after the Google token expires.
    $("jsy-disconnect").disabled = (!on && !meta.previouslyConnected) || busy || connecting || disconnecting;
    $("jsy-disconnect-progress").hidden = !disconnecting;
    $("jsy-backup").disabled = !on || busy;
    $("jsy-restore").disabled = !on || busy;
    $("jsy-delete").disabled = !on || busy;
    $("jsy-config").hidden = !!CONFIG_ID;
    $("jsy-conflict").hidden = !conflict;
    $("jsy-local-summary").textContent = description(snapshot());
    if (!driveChecked && !on) $("jsy-remote-summary").textContent = "Google 연결 후 확인";
  }
  async function request(url, opts) {
    if (!validToken()) {
      clearTabToken();
      render();
      throw new Error("Google 연결이 만료되었습니다. '동기화 하기'를 다시 눌러 주세요.");
    }
    const options = opts || {};
    options.headers = Object.assign({ Authorization: "Bearer " + token }, options.headers || {});
    const res = await fetch(url, options);
    let receivedBody = "";
    try {
      if (res.status === 401) {
        clearTabToken();
        render();
        throw new Error("Google 인증이 만료되었습니다. 다시 동기화를 연결해 주세요.");
      }
      if (!res.ok) {
        const raw = receivedBody = await res.text();
        throw new Error("Google Drive 요청 실패 (" + res.status + "): " + raw.slice(0, 150));
      }
      if (res.status === 204) return null;
      if (res.headers.get("Content-Type") && res.headers.get("Content-Type").includes("application/json")) {
        const data = await res.json();
        receivedBody = JSON.stringify(data);
        return data;
      }
      receivedBody = await res.text();
      return receivedBody;
    } finally {
      // Metering must never interrupt backup, restoration or authorization.
      try {
        if (window.JINI_NETWORK_USAGE) window.JINI_NETWORK_USAGE.recordDrive(options.body || "", receivedBody);
      } catch (_) {}
    }
  }
  function query(params) {
    return API + "?" + new URLSearchParams(params);
  }
  async function list(q) {
    const result = await request(query({ q: q, pageSize: "100", fields: "nextPageToken,files(id,name,mimeType,version,modifiedTime,size)", spaces: "drive" }));
    return (result.files || []);
  }
  function escapeQuery(s) { return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'"); }
  async function findFolder(create) {
    const folders = await list("name = '" + escapeQuery(FOLDER_NAME) + "' and mimeType = 'application/vnd.google-apps.folder' and trashed = false");
    if (folders.length) return folders[0].id;
    if (!create) return "";
    const folder = await request(API + "?fields=id", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: FOLDER_NAME, mimeType: "application/vnd.google-apps.folder" })
    });
    return folder.id;
  }
  async function findFile() {
    const folder = await findFolder(false);
    if (!folder) return null;
    const files = await list("'" + folder + "' in parents and name = '" + escapeQuery(FILE_NAME) + "' and trashed = false");
    return files[0] || null;
  }
  async function readFile(id) {
    const data = await request(API + "/" + encodeURIComponent(id) + "?alt=media");
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    return validate(parsed);
  }
  async function rememberGoogleAccount() {
    if (accountHintChecked) return;
    accountHintChecked = true;
    // Drive's existing drive.file permission identifies the connected account;
    // no extra profile scope or stored credentials are needed.
    try {
      const about = await request("https://www.googleapis.com/drive/v3/about?fields=user(emailAddress)");
      const email = about && about.user && about.user.emailAddress;
      if (typeof email === "string" && /^[^\s@]+@[^\s@]+$/.test(email)) {
        meta.accountEmail = email;
        saveMeta();
      }
    } catch (_) { /* A missing account hint must not prevent Drive backup. */ }
  }
  async function writeFile(records, existing) {
    let id = existing && existing.id;
    if (!id) {
      const folder = await findFolder(true);
      const created = await request(API + "?fields=id", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: FILE_NAME, mimeType: "application/json", parents: [folder] })
      });
      id = created.id;
    }
    await request(UPLOAD_API + "/" + encodeURIComponent(id) + "?uploadType=media", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload(records))
    });
    const info = await request(API + "/" + encodeURIComponent(id) + "?fields=id,version,modifiedTime,size");
    return info;
  }
  function markSynced(records, remote) {
    setDriveSize(remote);
    rememberBackedUpXP(records);
    meta.lastHash = fingerprint(records);
    meta.lastRemoteVersion = String(remote.version || "");
    meta.lastRemoteFileId = remote.id || "";
    meta.lastSyncedAt = new Date().toISOString();
    meta.lastVerifiedAt = Date.now();
    if (remote.size !== undefined && remote.size !== null &&
        Number.isFinite(Number(remote.size)) && Number(remote.size) >= 0)
      meta.lastRemoteSize = Number(remote.size);
    meta.deleted = false;
    saveMeta();
    fileId = remote.id || fileId;
    render();
  }
  function showConflict(local, remote, remoteMeta) {
    conflict = { local: local, remote: remote, remoteMeta: remoteMeta };
    const labels = {
      "jini-english-game-v1": "영어 문제별 정답·오답·XP",
      "jini-korean-games-v1": "한글 문제별 정답·오답·XP",
      "jini-study-time-v1": "날짜별 학습시간",
      "jini-game-character-english-v1": "영어 캐릭터 설정",
      "jini-game-character-korean-v1": "한글 캐릭터 설정",
      "jini-game-character-v1": "공통 캐릭터 설정",
      "jini-learning-bookmarks": "학습 책갈피",
      "jini-essential-expressions-bookmarks-v1": "표현 책갈피",
      "jini-opic-basic-v1": "스피킹 답변·진도"
    };
    const differences = differingKeys(local, remote);
    $("jsy-differences").textContent = "서로 다른 항목: " + differences.map(function (key) {
      return labels[key] || "기타 학습 설정";
    }).join(", ") + ". XP·분 단위 요약이 같아도 세부 기록이나 설정은 다를 수 있어요.";
    const remoteHasProgress = meaningful(remote);
    $("jsy-use-drive").disabled = !remoteHasProgress;
    $("jsy-conflict-text").textContent = remoteHasProgress ?
      "이 기기와 Google Drive에 서로 다른 실제 학습기록이 있어요. 어느 기록을 사용할지 선택하세요. Drive 기록을 사용하면 기기의 현재 기록을 먼저 JSON 파일로 백업합니다." :
      "Drive 백업파일에 학습기록이 없습니다. 기존 기기의 XP·캐릭터·학습시간을 보관하려면 '이 기기 기록 사용'을 선택하세요. 비어 있는 Drive 기록으로 이 기기를 복원할 수는 없습니다.";
    render();
    status(remoteHasProgress ?
      "기기와 Drive 기록이 서로 달라 안전을 위해 자동 동기화를 중단했습니다. 기록을 비교한 뒤 선택해 주세요." :
      "Drive 백업파일이 비어 있어 자동 복원을 중지했습니다. 실제 학습기록이 있는 기기에서 백업해 주세요.", true);
    if (syncPageOpen()) {
      try { $("jsy-conflict").scrollIntoView({ behavior: "smooth", block: "center" }); } catch (_) {}
    }
  }
  async function syncCycle(force) {
    // An explicit login completes one full Drive reconciliation, even while a
    // mobile Google account chooser briefly hides the original page.
    // Background focus / visibility / timer checks must not race that login.
    if (!validToken() || busy || (conflict && !force) ||
        (!force && (connecting || document.hidden))) return;
    // Returning from the Google popup can fire focus and visibility events.
    // Avoid a second identical scan immediately after a completed upload.
    if (!force && Date.now() - lastCycleFinishedAt < 8000 &&
        fingerprint(snapshot()) === meta.lastHash) return;
    busy = true;
    render();
    try {
      if (!meta.accountEmail) await rememberGoogleAccount();
      const remoteMeta = await findFile();
      setDriveSize(remoteMeta);
      // Never reuse sync baselines from a different Drive file/account.
      if (remoteMeta && meta.lastRemoteFileId &&
          meta.lastRemoteFileId !== remoteMeta.id) {
        meta.lastHash = "";
        meta.lastRemoteVersion = "";
        meta.lastRemoteFileId = "";
        delete meta.lastBackedUpXP;
        saveMeta();
      }
      if (!remoteMeta) {
        const local = snapshot();
        conflict = null;
        clearAsk();
        showDataComparison(null, "Google Drive에서 JINI 백업파일을 찾지 못했습니다.");
        // 다른 기기에서 백업을 삭제했으면 자동으로 다시 만들지 않습니다.
        if (meta.lastRemoteVersion || meta.deleted) {
          clearTabToken();
          status("Drive에서 기존 백업이 사라졌습니다. 자동 재업로드를 막기 위해 연결을 중지했어요.", true);
          render();
          return;
        }
        if (meaningful(local)) {
          const saved = await writeFile(local, null);
          markSynced(local, saved);
          showDataComparison(local, "첫 백업 생성 및 업로드 완료.");
          status("Google Drive에 첫 학습기록 백업을 저장했습니다.");
        } else {
          status("이 기기에 실제 학습기록이 없어 빈 백업을 만들지 않았습니다.", true);
        }
        return;
      }
      fileId = remoteMeta.id;
      const remoteVersion = String(remoteMeta.version || "");
      // A previously confirmed file id/version/hash remains trustworthy
      // across a same-tab reload. First check remote metadata, then skip the
      // full JSON only if both that version and local data still match.
      // Manual checks, account reconnects and changed records always use
      // the full comparison/merge path.
      if (!force && !conflict && remoteVersion &&
          meta.lastRemoteVersion === remoteVersion &&
          meta.lastRemoteFileId === remoteMeta.id && meta.lastHash &&
          meta.lastHash === fingerprint(snapshot()) &&
          (!driveChecked || (driveSnapshot &&
            meta.lastHash === fingerprint(driveSnapshot)))) {
        if (!driveChecked) showDataComparison(snapshot(),
          "Drive 백업 버전 확인 완료 · 전체 다운로드 생략");
        else $("jsy-compare-note").textContent =
          "Drive 파일 버전 " + remoteVersion + " · 변경 없음 (전체 다운로드 생략)";
        meta.lastVerifiedAt = Date.now();
        if (remoteMeta.size !== undefined && remoteMeta.size !== null &&
            Number.isFinite(Number(remoteMeta.size)) && Number(remoteMeta.size) >= 0)
          meta.lastRemoteSize = Number(remoteMeta.size);
        saveMeta();
        status("Drive 백업이 변경되지 않아 전체 학습데이터 다운로드를 생략했습니다.");
        return;
      }
      // Read the full backup if the file identity, version, or local data
      // differs, or when no trustworthy previous sync baseline exists.
      const remoteData = await readFile(remoteMeta.id);
      // Studying can continue while the Drive request is in flight.
      const local = snapshot();
      const localHash = fingerprint(local);
      // Keep the previous conflict until a fresh Drive read succeeds. A failed
      // recheck must not silently resume background uploads or hide the choice.
      conflict = null;
      clearAsk();
      const remoteHash = fingerprint(remoteData);
      showDataComparison(remoteData, "Drive 파일 수정: " + dateTime(remoteMeta.modifiedTime) +
        " · 버전 " + (remoteVersion || "확인 불가"));
      if (!meaningful(remoteData)) {
        status("Google Drive에 백업파일은 있지만 실제 학습기록이 없습니다. 기록이 있는 원래 기기에서 '지금 백업하기'로 저장해 주세요.", true);
        // Do not silently overwrite an existing backup using test devices.
        if (meaningful(local)) showConflict(local, remoteData, remoteMeta);
        return;
      }
      // Previously saved sync metadata may have been calculated with a different
      // set of keys. Never interpret an empty/new device as a newer snapshot.
      // Read Drive progress first, before the "same version -> upload" branch.
      if (!meaningful(local)) {
        if (fingerprint(remoteData) !== localHash) {
          meta.lastHash = fingerprint(remoteData);
          meta.lastRemoteVersion = remoteVersion;
          meta.lastRemoteFileId = remoteMeta.id;
          meta.lastSyncedAt = new Date().toISOString();
          saveMeta();
          status("Drive의 학습기록을 우선 복원합니다. 빈 기기 정보로 백업을 덮어쓰지 않아요.");
          applyRecords(remoteData);
          return;
        }
      }
      if (remoteHash === localHash) {
        if (meta.lastHash !== localHash || String(meta.lastRemoteVersion || "") !== remoteVersion)
          markSynced(local, remoteMeta);
        else {
          meta.lastVerifiedAt = Date.now();
          if (remoteMeta.size !== undefined && remoteMeta.size !== null &&
              Number.isFinite(Number(remoteMeta.size)) && Number(remoteMeta.size) >= 0)
            meta.lastRemoteSize = Number(remoteMeta.size);
          saveMeta();
        }
        status("이 기기와 Google Drive의 학습기록이 일치합니다.");
        return;
      }
      let joined = mergeIndependentProgress(local, remoteData);
      // A profile/bookmark edit on this device is safe to upload when Drive
      // still contains the exact last-synced data. Require a choice only when
      // both sides changed or the baseline is unavailable.
      const localOnlyChange = !joined && !!meta.lastHash && remoteHash === meta.lastHash;
      if (localOnlyChange) joined = local;
      if (joined) {
        if (fingerprint(joined) === remoteHash) {
          applyMergedLocally(remoteData);
          markSynced(remoteData, remoteMeta);
          showDataComparison(remoteData, "다른 기기의 최신 학습기록을 반영했습니다.");
          status("다른 기기의 학습기록을 이 기기로 동기화했습니다.");
          return;
        }
        // Recheck the file version right before writing. A newer edit on
        // another device is re-read on the next cycle, not blindly overwritten.
        const latest = await findFile();
        if (!latest || latest.id !== remoteMeta.id ||
            String(latest.version || "") !== remoteVersion) {
          status("다른 기기의 백업 변경을 감지했습니다. 최신 기록을 다시 확인합니다.");
          return;
        }
        const saved = await writeFile(joined, latest);
        applyMergedLocally(joined);
        markSynced(joined, saved);
        showDataComparison(joined, localOnlyChange ? "이 기기의 변경사항을 Drive에 반영했습니다." :
          "두 기기의 문제별 학습기록을 중복 XP 없이 합쳤습니다.");
        status(localOnlyChange ? "이 기기의 변경사항을 Google Drive에 저장했습니다." :
          "휴대폰·PC에서 학습한 서로 다른 문제를 Google Drive에 합쳐 저장했습니다.");
        return;
      }
      // Non-game settings or unrecognized data differ: protect both versions.
      if (!meaningful(local) || (meta.lastHash && localHash === meta.lastHash)) {
        meta.lastHash = remoteHash;
        meta.lastRemoteVersion = remoteVersion;
        meta.lastRemoteFileId = remoteMeta.id;
        meta.lastSyncedAt = new Date().toISOString();
        saveMeta();
        status("Drive에서 더 최신 기록을 확인해 복원합니다.");
        applyRecords(remoteData);
      } else {
        showConflict(local, remoteData, remoteMeta);
      }
    } catch (e) { status(e.message || "동기화에 실패했습니다.", true); }
    finally { busy = false; lastCycleFinishedAt = Date.now(); render(); }
  }
  async function beginConnect() {
    if (!syncPageOpen()) return;
    if (!CONFIG_ID) {
      status("Google Drive 연동을 사용하려면 사이트 관리자가 Google OAuth 클라이언트 ID를 먼저 등록해야 해요. 현재 학습기록은 변경되지 않습니다.", true);
      return;
    }
    if (!window.google || !google.accounts || !google.accounts.oauth2) {
      status("Google 인증 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요.", true);
      return;
    }
    if (connecting || busy || disconnecting) return;
    connecting = true;
    connectionStage = "Google 인증 중…";
    render();
    try {
      const accountEmail = typeof meta.accountEmail === "string" ? meta.accountEmail : "";
      const reuseAccount = !!(meta.previouslyConnected && !meta.manuallyDisconnected && accountEmail);
      const client = google.accounts.oauth2.initTokenClient({
        client_id: CONFIG_ID, scope: SCOPE,
        callback: async function (response) {
          if (!response || !response.access_token) {
            const detail = response && (response.error_description || response.error) || "";
            connecting = false;
            connectionStage = "";
            status("Google Drive 연결이 취소되었거나 거부되었습니다." +
              (detail ? " (" + detail + ")" : ""), true);
            render();
            return;
          }
          token = response.access_token;
          expiresAt = Date.now() + (Number(response.expires_in) || 3600) * 1000;
          keepTabToken();
          accountHintChecked = false;
          if (!reuseAccount) {
            delete meta.accountEmail;
            delete meta.lastBackedUpXP;
            delete meta.lastVerifiedAt;
            driveSnapshot = null;
            driveChecked = false;
          }
          await rememberGoogleAccount();
          if (!validToken()) {
            connecting = false;
            connectionStage = "";
            status("Google 인증이 만료되었습니다. Google 다시 연결을 눌러 주세요.", true);
            render();
            return;
          }
          // Reconnect intent is not a credential. Never persist tokens in localStorage.
          meta.previouslyConnected = true;
          meta.manuallyDisconnected = false;
          saveMeta();
          conflict = null;
          // An explicit reconnect already performs a full sync; remove only
          // the old timer. Any new study changes during this sync form a new batch.
          cancelXpBatch();
          connectionStage = "학습기록 비교·백업 중…";
          status("Google Drive 연결 후 현재 기기와 백업을 비교·반영하고 있습니다.");
          render();
          try { await syncCycle(true); }
          finally { connecting = false; connectionStage = ""; render(); }
        },
        error_callback: function (error) {
          connecting = false;
          connectionStage = "";
          status("Google 로그인 창을 열지 못했습니다. 팝업 설정을 확인해 주세요." +
            (error && error.type ? " (" + error.type + ")" : ""), true);
          render();
        }
      });
      // After expiry, prefer the last connected account. A first connection or
      // deliberate disconnect still allows choosing a different Google account.
      client.requestAccessToken(reuseAccount ? { prompt: "", login_hint: accountEmail } :
        { prompt: "select_account" });
    } catch (e) {
      connecting = false;
      connectionStage = "";
      status(e.message, true);
      render();
    }
  }
  function disconnect() {
    if (disconnecting || connecting || busy) return;
    disconnecting = true;
    cancelXpBatch();
    // Disconnect JINI immediately, without a confirmation or network request.
    // This is an auto-sync toggle, not a Google account permission revocation;
    // keeping consent also makes reconnecting less cumbersome.
    clearTabToken();
    meta.previouslyConnected = false;
    meta.manuallyDisconnected = true;
    saveMeta();
    conflict = null;
    driveChecked = false;
    driveSnapshot = null;
    driveSizeBytes = undefined;
    $("jsy-remote-summary").textContent = "Google 연결 후 확인";
    status("이 기기의 Google Drive 자동 동기화를 해제하고 있습니다.");
    render();
    // Briefly paint '해제 중…' beneath the button; disconnect itself is
    // already complete and no Google reply is required.
    window.setTimeout(function () {
      disconnecting = false;
      status("동기화 해제 완료 · 기기의 XP와 Google Drive 백업은 그대로 유지됩니다.");
      render();
    }, 350);
  }
  function ask(action, title, body) {
    confirmAction = action;
    $("jsy-confirm-title").textContent = title;
    $("jsy-confirm-body").textContent = body;
    $("jsy-confirm").hidden = false;
  }
  function clearAsk() { confirmAction = null; $("jsy-confirm").hidden = true; }
  async function withBusy(fn) {
    if (busy) return;
    busy = true; render();
    try { await fn(); }
    catch (e) { status(e.message || "작업을 완료하지 못했습니다.", true); }
    finally { busy = false; render(); }
  }
  async function manualBackup(force) {
    if (!validToken()) return status("먼저 동기화 하기를 눌러 연결해 주세요.", true);
    // A normal backup uses the same content comparison and lossless game merge
    // as automatic sync. A Drive version change alone is not a data conflict.
    // Only the explicitly confirmed conflict choice may overwrite a snapshot.
    if (!force) {
      if (connecting || disconnecting) return;
      await syncCycle(true);
      return;
    }
    await withBusy(async function () {
      const now = await findFile();
      setDriveSize(now);
      const local = snapshot();
      if (!meaningful(local)) throw new Error("이 기기에 실제 학습기록이 없습니다. 빈 백업으로 기존 기록을 덮어쓰지 않아요.");
      const result = await writeFile(local, now);
      conflict = null;
      markSynced(local, result);
      showDataComparison(local, "직접 백업 완료 · " + dateTime(new Date().toISOString()));
      status("Google Drive / JINI / jini-backup.json에 실제 학습정보를 백업했습니다.");
    });
  }
  async function restore() {
    if (!validToken()) return status("먼저 동기화 하기를 눌러 연결해 주세요.", true);
    await withBusy(async function () {
      const found = await findFile();
      setDriveSize(found);
      if (!found) throw new Error("Google Drive에서 복원할 JINI 백업을 찾지 못했습니다.");
      const data = await readFile(found.id);
      showDataComparison(data, "백업 복원 전 확인.");
      if (!meaningful(data)) throw new Error("Drive 백업에 실제 학습기록이 없습니다. 빈 데이터로 덮어쓰지 않았습니다.");
      meta.lastHash = fingerprint(data);
      meta.lastRemoteVersion = String(found.version || "");
      meta.lastRemoteFileId = found.id;
      meta.lastSyncedAt = new Date().toISOString();
      saveMeta();
      status("Drive 기록을 복원하고 페이지를 새로 고칩니다.");
      applyRecords(data);
    });
  }
  async function deleteBackup() {
    if (!validToken()) return status("먼저 Google Drive에 연결해 주세요.", true);
    await withBusy(async function () {
      const found = await findFile();
      if (found) await request(API + "/" + encodeURIComponent(found.id), { method: "DELETE" });
      setDriveSize(null);
      meta.deleted = true;
      delete meta.lastBackedUpXP;
      meta.lastRemoteVersion = "";
      meta.lastRemoteFileId = "";
      meta.lastHash = "";
      delete meta.lastVerifiedAt;
      saveMeta();
      clearTabToken();
      meta.previouslyConnected = false;
      saveMeta();
      conflict = null;
      status("Drive의 JINI 백업을 삭제했습니다. 이 기기의 학습기록은 유지됩니다. 다른 기기에서는 기존 연결을 해제해 주세요.");
    });
  }
  $("jsy-connect").addEventListener("click", beginConnect);
  $("jsy-expired-reconnect").addEventListener("click", beginConnect);
  $("jsy-disconnect").addEventListener("click", function () { disconnect(); });
  $("jsy-backup").addEventListener("click", function () { manualBackup(false); });
  $("jsy-restore").addEventListener("click", function () {
    ask("restore", "Google Drive 백업을 복원할까요?", "현재 기기의 학습정보를 JSON 파일로 먼저 다운로드한 다음 Drive 기록으로 교체합니다. 이후 화면이 새로고침됩니다.");
  });
  $("jsy-delete").addEventListener("click", function () {
    ask("delete", "Google Drive 백업을 삭제할까요?", "Drive의 JINI/jini-backup.json 파일이 삭제됩니다. 현재 기기 학습기록은 유지되지만, 다른 기기의 자동 동기화는 별도로 해제해야 합니다.");
  });
  $("jsy-cancel").addEventListener("click", clearAsk);
  $("jsy-confirm-yes").addEventListener("click", function () {
    const choice = confirmAction;
    clearAsk();
    if (choice === "restore") restore();
    if (choice === "delete") deleteBackup();
  });
  $("jsy-use-drive").addEventListener("click", function () {
    if (!conflict) return;
    ask("conflict-restore", "Drive의 데이터를 사용할까요?", "현재 학습정보를 먼저 JSON 파일로 다운로드한 뒤 Drive 기록으로 교체합니다.");
  });
  $("jsy-use-local").addEventListener("click", function () {
    if (!conflict) return;
    ask("conflict-upload", "현재 기기의 데이터를 사용할까요?", "Google Drive에 있는 다른 기기의 학습기록이 이 기기 기록으로 덮어써집니다. 복구를 위해 Drive 기록을 먼저 파일로 다운로드합니다.");
  });
  // 충돌 선택은 별도로 확인을 거쳐서만 실행합니다.
  $("jsy-save-local").addEventListener("click", function () {
    try { download(snapshot()); status("학습정보 JSON 파일을 다운로드했습니다."); }
    catch (e) { status(e.message, true); }
  });
  $("jsy-load-local").addEventListener("change", async function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      if (file.size > 10000000) throw new Error("10MB 이하의 JSON 파일을 선택해 주세요.");
      const records = validate(JSON.parse(await file.text()));
      if (!confirm("현재 학습정보를 별도 파일로 백업한 후 선택한 파일로 복원할까요?")) return;
      meta.lastHash = "";
      meta.lastRemoteVersion = "";
      meta.lastRemoteFileId = "";
      saveMeta();
      applyRecords(records);
    } catch (e) { status(e.message, true); }
    finally { event.target.value = ""; }
  });
  // 사용자가 두 기기에서 동시에 공부한 경우 자동 병합하지 않고 선택권을 줍니다.
  const confirmButton = $("jsy-confirm-yes");
  // 충돌 전용 확인 이벤트: capture 단계에서 중복 실행을 방지합니다.
  confirmButton.addEventListener("click", function (e) {
    const choice = confirmAction;
    if (choice !== "conflict-restore" && choice !== "conflict-upload") return;
    e.stopImmediatePropagation();
    clearAsk();
    if (!conflict) return;
    const item = conflict;
    if (choice === "conflict-restore") {
      meta.lastHash = fingerprint(item.remote);
      meta.lastRemoteVersion = String(item.remoteMeta.version || "");
      meta.lastSyncedAt = new Date().toISOString();
      saveMeta();
      applyRecords(item.remote);
    } else {
      if (meaningful(item.remote)) download(item.remote);
      manualBackup(true);
    }
  }, true);
  function saveXpDeadline() {
    try {
      if (xpBatchDueAt) sessionStorage.setItem(XP_BATCH_DUE_KEY, String(xpBatchDueAt));
      else sessionStorage.removeItem(XP_BATCH_DUE_KEY);
    } catch (_) {}
  }
  function cancelXpBatch() {
    if (syncAfterXP !== null) window.clearTimeout(syncAfterXP);
    syncAfterXP = null;
    xpBatchDueAt = 0;
    saveXpDeadline();
  }
  function flushXpBatch() {
    if (syncAfterXP !== null) window.clearTimeout(syncAfterXP);
    syncAfterXP = null;
    if (!xpBatchDueAt) return;
    if (Date.now() < xpBatchDueAt) {
      syncAfterXP = window.setTimeout(flushXpBatch, xpBatchDueAt - Date.now());
      return;
    }
    // If the tab sleeps, keep the due batch until the learner returns.
    if (document.hidden) return;
    if (!validToken() || conflict) {
      cancelXpBatch();
      render();
      return;
    }
    if (busy || connecting || disconnecting) {
      syncAfterXP = window.setTimeout(flushXpBatch, 15000);
      return;
    }
    xpBatchDueAt = 0;
    saveXpDeadline();
    syncCycle();
  }
  // A fixed five-minute window starts with the FIRST changed game record.
  // Additional answers do not extend that window.
  window.addEventListener("jini-learning-progress-changed", function () {
    if (!validToken()) { render(); return; }
    if (conflict || disconnecting) return;
    if (xpBatchDueAt) return;
    xpBatchDueAt = Date.now() + XP_BATCH_MS;
    saveXpDeadline();
    syncAfterXP = window.setTimeout(flushXpBatch, XP_BATCH_MS);
    render();
  });
  window.JINI_SYNC_PAGE_OPEN = function () {
    render();
    // Just opening the settings page must not trigger another Drive request.
    if (validToken() && !xpBatchDueAt &&
        Date.now() - lastCycleFinishedAt >= DRIVE_POLL_MS) syncCycle();
  };
  // Refreshing the page is not a new sync event. If this tab's token,
  // previously verified Drive identity and unchanged local hash are present,
  // reuse that *metadata* until the 10-minute check is due. No Drive payload,
  // access token or other learning records are persisted for this shortcut.
  const sameVerifiedLocal = validToken() && meta.previouslyConnected &&
    !meta.manuallyDisconnected && !meta.deleted &&
    !!meta.lastHash && !!meta.lastRemoteVersion && !!meta.lastRemoteFileId &&
    fingerprint(snapshot()) === meta.lastHash;
  const verifiedAt = Number(meta.lastVerifiedAt || 0);
  const recentlyVerified = sameVerifiedLocal && Number.isFinite(verifiedAt) &&
    verifiedAt > 0 && verifiedAt <= Date.now() &&
    Date.now() - verifiedAt < DRIVE_POLL_MS;
  if (recentlyVerified) {
    showDataComparison(snapshot(), "이전 동기화 확인 기록 유지 · 새로고침 시 Drive 통신 생략");
    if (Number.isFinite(Number(meta.lastRemoteSize)) &&
        Number(meta.lastRemoteSize) >= 0)
      setDriveSize({ size: meta.lastRemoteSize });
    lastCycleFinishedAt = verifiedAt;
  }
  // A reload during the XP batching window must not upload early.
  try {
    const due = Number(sessionStorage.getItem(XP_BATCH_DUE_KEY) || 0);
    if (validToken() && due > 0 && Number.isFinite(due) &&
        meta.lastHash && fingerprint(snapshot()) !== meta.lastHash) {
      xpBatchDueAt = due;
      syncAfterXP = window.setTimeout(flushXpBatch, Math.max(0, due - Date.now()));
    } else sessionStorage.removeItem(XP_BATCH_DUE_KEY);
  } catch (_) {}
  render();
  if (validToken()) {
    status(recentlyVerified ?
      "새로고침 시 Drive 다운로드 없이 기존 확인 기록을 유지합니다. 다음 확인은 10분 주기입니다." :
      xpBatchDueAt ? "이전 학습 변경을 첫 획득부터 5분간 모아 동기화합니다." :
      "Google Drive 연결을 유지하고 있습니다. 변경사항이 없을 때는 약 10분마다 최신 백업을 확인합니다.");
    if (!recentlyVerified && !xpBatchDueAt) syncCycle();
  } else if (meta.previouslyConnected) {
    status("이전 Google 연결의 인증이 필요합니다. 기기와 Drive 학습기록은 유지되어 있으며, 'Google 다시 연결'을 누르면 이어서 확인할 수 있습니다.");
  }
  // Local 1-minute timer only checks deadlines: Drive is contacted after ten
  // idle minutes, or when a pending five-minute XP batch becomes due.
  window.setInterval(function () {
    if (validToken()) {
      if (xpBatchDueAt) {
        if (Date.now() >= xpBatchDueAt) flushXpBatch();
      } else if (Date.now() - lastCycleFinishedAt >= DRIVE_POLL_MS) {
        syncCycle();
      }
    } else if (token) {
      clearTabToken();
      status("Google 인증이 만료되었습니다. 기기와 Drive 기록은 유지됩니다. Google 다시 연결을 눌러 주세요.", true);
      render();
    }
  }, 60000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
      render();
      if (validToken()) {
        if (xpBatchDueAt) {
          if (Date.now() >= xpBatchDueAt) flushXpBatch();
        } else if (Date.now() - lastCycleFinishedAt >= RETURN_CHECK_MIN_MS) {
          syncCycle();
        }
      }
    }
  });
  // Reflect an expired authorization on return without extra Drive requests.
  window.addEventListener("focus", render);
})();


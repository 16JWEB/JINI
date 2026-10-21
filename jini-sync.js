/* JINI Google Drive 동기화: Google 로그인 인증은 브라우저 메모리에만 유지합니다. */
(function () {
  "use strict";
  const CONFIG_ID = (window.JINI_GOOGLE_CLIENT_ID || "").trim();
  const META_KEY = "jini-drive-sync-meta-v1";
  const REWARD_NOTIFICATIONS_KEY = "jini-character-reward-popups-v1";
  // Google browser-tab session only. Never include access tokens in localStorage
  // or Drive backups. Google OAuth tokens still expire and must be renewed by
  // an explicit user click after expiry (no server-side refresh token here).
  const SESSION_KEY = "jini-drive-tab-session-v2";
  const LEGACY_HANDOFF_KEY = "jini-drive-reload-token-once-v1";
  const FOLDER_NAME = "JINI";
  const FILE_NAME = "jini-backup.json";
  const SCOPE = "https://www.googleapis.com/auth/drive.file";
  const API = "https://www.googleapis.com/drive/v3/files";
  const UPLOAD_API = "https://www.googleapis.com/upload/drive/v3/files";
  const $ = function (id) { return document.getElementById(id); };
  const root = $("jini-sync-section");
  const adminDialog = $("jini-admin-dialog");
  const adminPanel = $("ja-panel");
  const adminSyncTab = $("ja-sync-panel");
  if (!root || !adminDialog || !adminPanel || !adminSyncTab) return;
  function adminOpen() {
    return adminDialog.open && !adminPanel.hidden && !adminSyncTab.hidden;
  }
  let token = "";
  let expiresAt = 0;
  let busy = false;
  let fileId = "";
  // undefined: not checked yet, null: no backup, number: exact Drive file bytes.
  let driveSizeBytes;
  let conflict = null;
  let confirmAction = null;
  let syncAfterXP = null;
  let meta = readMeta();
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
      key !== "jini-last-study-state" && !key.startsWith("jini-drive-") &&
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
  function showDataComparison(remote, note) {
    $("jsy-local-summary").textContent = description(snapshot());
    if (remote === null) {
      $("jsy-remote-summary").textContent = "백업 파일 없음";
      driveChecked = true;
      driveSnapshot = null;
    } else if (remote) {
      $("jsy-remote-summary").textContent = description(remote);
      driveChecked = true;
      driveSnapshot = remote;
    } else if (!driveChecked) {
      $("jsy-remote-summary").textContent = "아직 확인 전";
    }
    if (note) $("jsy-compare-note").textContent = note;
  }
  function fingerprint(records) {
    const value = JSON.stringify(records);
    let n = 2166136261;
    for (let i = 0; i < value.length; i++) {
      n ^= value.charCodeAt(i);
      n = Math.imul(n, 16777619);
    }
    return String(value.length) + "-" + (n >>> 0).toString(16);
  }
  // A higher XP value alone is not enough to overwrite another device.
  // Only auto-advance when the newer game history contains every remote result,
  // and all non-game settings are unchanged. Merge per-day study time by max
  // rather than silently replacing a larger recorded duration.
  function safeXPAdvance(local, remote) {
    const gameKeys = ["jini-english-game-v1", "jini-korean-games-v1"];
    const timeKey = "jini-study-time-v1";
    const parse = raw => {
      try { return JSON.parse(raw || "null"); } catch (_) { return null; }
    };
    let gainedXP = false;
    for (const key of gameKeys) {
      const before = parse(remote[key]), after = parse(local[key]);
      if (!before && !after) continue;
      if (!before || !after || typeof before !== "object" || typeof after !== "object") return null;
      const oldXP = Number(before.xp), newXP = Number(after.xp);
      if (!Number.isSafeInteger(oldXP) || !Number.isSafeInteger(newXP) ||
          oldXP < 0 || newXP < oldXP) return null;
      if (newXP > oldXP) gainedXP = true;
      const oldItems = before.items || {}, newItems = after.items || {};
      if (typeof oldItems !== "object" || !oldItems || Array.isArray(oldItems) ||
          typeof newItems !== "object" || !newItems || Array.isArray(newItems)) return null;
      for (const id of Object.keys(oldItems)) {
        if (!Object.prototype.hasOwnProperty.call(newItems, id)) return null;
        const a = oldItems[id], b = newItems[id];
        if (!a || !b || typeof a !== "object" || typeof b !== "object") return null;
        const awarded = item => item.xpAwarded === true ||
          (item.xpAwarded === undefined && Number(item.streak) > 0);
        if (awarded(a) && !awarded(b)) return null;
      }
      const attemptKey = key === gameKeys[0] ? "tries" : "attempts";
      if (Number(after[attemptKey] || 0) < Number(before[attemptKey] || 0) ||
          Number(after.correct || 0) < Number(before.correct || 0)) return null;
    }
    if (!gainedXP) return null;
    const merged = Object.assign({}, remote, local);
    for (const key of Object.keys(remote)) {
      if (key === timeKey || gameKeys.includes(key)) continue;
      if (!(key in local) || local[key] !== remote[key]) return null;
    }
    if (remote[timeKey] && local[timeKey] && remote[timeKey] !== local[timeKey]) {
      const before = parse(remote[timeKey]), after = parse(local[timeKey]);
      if (!before || !after || before.schema !== 1 || after.schema !== 1 ||
          !before.days || !after.days) return null;
      const days = {};
      for (const day of new Set(Object.keys(before.days).concat(Object.keys(after.days)))) {
        const a = before.days[day] || {}, b = after.days[day] || {};
        const en = Math.max(Number(a.englishMs || 0), Number(b.englishMs || 0));
        const ko = Math.max(Number(a.koreanMs || 0), Number(b.koreanMs || 0));
        if (![en, ko].every(n => Number.isFinite(n) && n >= 0)) return null;
        days[day] = { englishMs: en, koreanMs: ko };
      }
      merged[timeKey] = JSON.stringify(Object.assign({}, after, { days: days }));
    } else if (remote[timeKey] && !local[timeKey]) {
      merged[timeKey] = remote[timeKey];
    }
    return merged;
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
    // Legacy backups created before Oct 20 may contain jini-last-study-state
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
    $("jsy-state").textContent = on ? "Google 연결됨" :
      reconnectNeeded ? "Google 재연결 필요" : "연결 안 됨";
    $("jsy-state").classList.toggle("is-connected", on);
    const equalRecords = on && driveSnapshot &&
      fingerprint(snapshot()) === fingerprint(driveSnapshot);
    $("jsy-auto").textContent = !on ? "확인 불가" :
      conflict ? "기록 충돌" : !driveChecked ? "백업 확인 전" :
      driveSnapshot === null ? "백업 없음" :
      equalRecords ? "학습기록 일치" : "변경사항 동기화 대기";
    $("jsy-last").textContent = dateTime(meta.lastSyncedAt);
    $("jsy-backup-size").textContent = !on ? "Google 연결 후 확인" :
      driveSizeBytes === undefined ? "백업 확인 전" :
      driveSizeBytes === null ? "백업 없음" :
      Number.isFinite(driveSizeBytes) ? formatDriveSize(driveSizeBytes) : "용량 확인 불가";
    $("jsy-connect").disabled = on || busy;
    $("jsy-connect").textContent = reconnectNeeded ? "↻ Google 다시 연결" : "↻ 동기화 하기";
    $("jsy-disconnect").disabled = !on || busy;
    $("jsy-backup").disabled = !on || busy;
    $("jsy-restore").disabled = !on || busy;
    $("jsy-delete").disabled = !on || busy;
    $("jsy-config").hidden = !!CONFIG_ID;
    $("jsy-conflict").hidden = !conflict;
    $("jsy-refresh").disabled = !on || busy;
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
    if (res.status === 401) {
      clearTabToken();
      render();
      throw new Error("Google 인증이 만료되었습니다. 다시 동기화를 연결해 주세요.");
    }
    if (!res.ok) {
      const raw = await res.text();
      throw new Error("Google Drive 요청 실패 (" + res.status + "): " + raw.slice(0, 150));
    }
    if (res.status === 204) return null;
    if (res.headers.get("Content-Type") && res.headers.get("Content-Type").includes("application/json")) return res.json();
    return res.text();
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
    meta.lastHash = fingerprint(records);
    meta.lastRemoteVersion = String(remote.version || "");
    meta.lastRemoteFileId = remote.id || "";
    meta.lastSyncedAt = new Date().toISOString();
    meta.deleted = false;
    saveMeta();
    fileId = remote.id || fileId;
    render();
  }
  function showConflict(local, remote, remoteMeta) {
    conflict = { local: local, remote: remote, remoteMeta: remoteMeta };
    const remoteHasProgress = meaningful(remote);
    $("jsy-use-drive").disabled = !remoteHasProgress;
    $("jsy-conflict-text").textContent = remoteHasProgress ?
      "이 기기와 Google Drive에 서로 다른 실제 학습기록이 있어요. 어느 기록을 사용할지 선택하세요. Drive 기록을 사용하면 기기의 현재 기록을 먼저 JSON 파일로 백업합니다." :
      "Drive 백업파일에 학습기록이 없습니다. 기존 기기의 XP·캐릭터·학습시간을 보관하려면 '이 기기 기록 사용'을 선택하세요. 비어 있는 Drive 기록으로 이 기기를 복원할 수는 없습니다.";
    render();
    status(remoteHasProgress ?
      "기기와 Drive 기록이 서로 달라 안전을 위해 자동 동기화를 중단했습니다. 기록을 비교한 뒤 선택해 주세요." :
      "Drive 백업파일이 비어 있어 자동 복원을 중지했습니다. 실제 학습기록이 있는 기기에서 백업해 주세요.", true);
    if (adminOpen()) {
      try { $("jsy-conflict").scrollIntoView({ behavior: "smooth", block: "center" }); } catch (_) {}
    }
  }
  async function syncCycle() {
    // Once the learner explicitly connects Google Drive, sync whenever the
    // JINI page is visible; opening the admin sync tab is no longer required.
    // Existing remote-version and meaningful-data safeguards still apply.
    if (!validToken() || busy || conflict || document.hidden) return;
    busy = true;
    render();
    try {
      const local = snapshot();
      const localHash = fingerprint(local);
      const remoteMeta = await findFile();
      setDriveSize(remoteMeta);
      // Never reuse sync baselines from a different Drive file/account.
      if (remoteMeta && meta.lastRemoteFileId &&
          meta.lastRemoteFileId !== remoteMeta.id) {
        meta.lastHash = "";
        meta.lastRemoteVersion = "";
        meta.lastRemoteFileId = "";
        saveMeta();
      }
      if (!remoteMeta) {
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
      // Always inspect the remote payload. Version equality alone does not
      // prove that the file contains the latest character and study progress.
      const remoteData = await readFile(remoteMeta.id);
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
      // Equality of actual records wins over old per-device hash metadata.
      // This avoids a spurious upload after an import cleared popup notifications.
      if (remoteHash === localHash) {
        if (meta.lastHash !== localHash || String(meta.lastRemoteVersion || "") !== remoteVersion)
          markSynced(local, remoteMeta);
        return;
      }
      // A device can earn XP while another device updates Drive (often just
      // study time), changing the file version. Fast-forward verified, non-
      // regressing progress instead of treating that as a permanent conflict.
      const advanced = safeXPAdvance(local, remoteData);
      if (advanced) {
        const latest = await findFile();
        if (!latest || latest.id !== remoteMeta.id ||
            String(latest.version || "") !== remoteVersion) {
          status("다른 기기의 백업이 갱신되어 최신 기록을 다시 확인합니다.");
          return;
        }
        const saved = await writeFile(advanced, latest);
        const timeKey = "jini-study-time-v1";
        if (advanced[timeKey] && advanced[timeKey] !== local[timeKey]) {
          // Preserve time added during the network request as well.
          const current = snapshot();
          if (current[timeKey] === local[timeKey])
            localStorage.setItem(timeKey, advanced[timeKey]);
          // If this device accrued more time mid-request, the next cycle
          // will detect it rather than replacing those new seconds.
        }
        markSynced(advanced, saved);
        showDataComparison(advanced, "새로 얻은 XP를 Drive에 자동 백업했습니다.");
        status("새 학습 경험치를 Google Drive에 자동 저장했습니다.");
        return;
      }
      if (meta.lastRemoteVersion && remoteVersion === String(meta.lastRemoteVersion)) {
        if (localHash !== meta.lastHash) {
          const now = await findFile();
          if (!now || String(now.version) !== remoteVersion) {
            const remote = now ? await readFile(now.id) : remoteData;
            showConflict(local, remote, now || remoteMeta);
            return;
          }
          const saved = await writeFile(local, remoteMeta);
          markSynced(local, saved);
          showDataComparison(local, "기기 변경사항을 Drive에 업로드했습니다.");
          status("이 기기에서 바뀐 학습정보를 Drive에 저장했습니다.");
        }
        return;
      }
      const remote = remoteData;
      if (!meaningful(local) || (meta.lastHash && localHash === meta.lastHash)) {
        meta.lastHash = remoteHash;
        meta.lastRemoteVersion = remoteVersion;
        meta.lastRemoteFileId = remoteMeta.id;
        meta.lastSyncedAt = new Date().toISOString();
        saveMeta();
        status("Drive에서 기존 학습기록을 찾았습니다. 이 기기로 복원하고 있어요.");
        applyRecords(remote);
      } else {
        showConflict(local, remote, remoteMeta);
      }
    } catch (e) { status(e.message || "동기화에 실패했습니다.", true); }
    finally { busy = false; render(); }
  }
  async function beginConnect() {
    if (!adminOpen()) return;
    if (!CONFIG_ID) {
      status("Google Drive 연동을 사용하려면 사이트 관리자가 Google OAuth 클라이언트 ID를 먼저 등록해야 해요. 현재 학습기록은 변경되지 않습니다.", true);
      return;
    }
    if (!window.google || !google.accounts || !google.accounts.oauth2) {
      status("Google 인증 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요.", true);
      return;
    }
    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: CONFIG_ID, scope: SCOPE,
        callback: function (response) {
          if (!response || !response.access_token) {
            const detail = response && (response.error_description || response.error) || "";
            status("Google Drive 연결이 취소되었거나 거부되었습니다." +
              (detail ? " (" + detail + ")" : ""), true);
            return;
          }
          token = response.access_token;
          expiresAt = Date.now() + (Number(response.expires_in) || 3600) * 1000;
          keepTabToken();
          // Reconnect intent is not a credential. Never persist tokens in localStorage.
          meta.previouslyConnected = true;
          saveMeta();
          conflict = null;
          status("Google Drive에 연결했습니다. 기존 백업과 학습기록을 비교합니다.");
          render();
          syncCycle();
        },
        error_callback: function (error) {
          status("Google 로그인 창을 열지 못했습니다. 팝업 설정을 확인해 주세요." +
            (error && error.type ? " (" + error.type + ")" : ""), true);
        }
      });
      // Keep account selection to avoid uploading to a different Google Drive,
      // but do not force a repeated consent screen at every connection.
      client.requestAccessToken({ prompt: "select_account" });
    } catch (e) { status(e.message, true); }
  }
  function disconnect() {
    if (token && window.google && google.accounts && google.accounts.oauth2) {
      try { google.accounts.oauth2.revoke(token, function () {}); } catch (_) {}
    }
    clearTabToken();
    meta.previouslyConnected = false;
    saveMeta();
    conflict = null;
    status("이 기기의 동기화를 해제했어요. Drive 백업과 기기 학습기록은 그대로 유지됩니다.");
    render();
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
  async function checkDrive() {
    if (!adminOpen() || !validToken()) return status("먼저 관리자 화면에서 Google Drive에 연결해 주세요.", true);
    await withBusy(async function () {
      const found = await findFile();
      setDriveSize(found);
      if (!found) {
        showDataComparison(null, "Drive에 JINI 백업 파일이 없습니다.");
        status("Drive에 백업파일이 없습니다. 실제 기록이 있는 기기에서 첫 백업을 생성하세요.", true);
        return;
      }
      const records = await readFile(found.id);
      showDataComparison(records, "Drive 파일 수정: " + dateTime(found.modifiedTime));
      status(meaningful(records) ?
        "Drive 학습기록을 확인했습니다. 아래 XP와 학습시간을 비교하세요." :
        "Drive 백업에 학습 진도나 캐릭터 기록이 없습니다. 원래 기기에서 새 백업이 필요합니다.", !meaningful(records));
    });
  }
  async function manualBackup(force) {
    if (!validToken()) return status("먼저 동기화 하기를 눌러 연결해 주세요.", true);
    await withBusy(async function () {
      const now = await findFile();
      setDriveSize(now);
      if (now && !force && meta.lastRemoteVersion &&
          String(now.version) !== String(meta.lastRemoteVersion)) {
        showConflict(snapshot(), await readFile(now.id), now);
        return;
      }
      if (now && !force && !meta.lastRemoteVersion) {
        const remote = await readFile(now.id);
        if (fingerprint(remote) !== fingerprint(snapshot())) {
          showConflict(snapshot(), remote, now);
          return;
        }
      }
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
      meta.lastRemoteVersion = "";
      meta.lastRemoteFileId = "";
      meta.lastHash = "";
      saveMeta();
      clearTabToken();
      meta.previouslyConnected = false;
      saveMeta();
      conflict = null;
      status("Drive의 JINI 백업을 삭제했습니다. 이 기기의 학습기록은 유지됩니다. 다른 기기에서는 기존 연결을 해제해 주세요.");
    });
  }
  $("jsy-connect").addEventListener("click", beginConnect);
  $("jsy-refresh").addEventListener("click", checkDrive);
  $("jsy-disconnect").addEventListener("click", function () {
    ask("disconnect", "동기화를 해제할까요?", "이 기기에서 자동 동기화만 중단됩니다. 기기와 Google Drive에 저장된 학습정보는 삭제되지 않습니다.");
  });
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
    if (choice === "disconnect") disconnect();
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
  window.JINI_SYNC_ADMIN_OPEN = function () {
    render();
    if (validToken()) syncCycle();
  };
  render();
  if (validToken()) {
    status("Google Drive 연결이 이 탭에 유지되어 있습니다. 학습 화면에서도 자동 동기화하며, 상세 기록은 관리자 동기화 탭에서 확인할 수 있습니다.");
    syncCycle();
  } else if (meta.previouslyConnected) {
    status("이전 Google 연결의 인증이 필요합니다. 기기와 Drive 학습기록은 유지되어 있으며, 'Google 다시 연결'을 누르면 이어서 확인할 수 있습니다.");
  }
  // XP should be uploaded shortly after an answer, not only on the 45-second poll.
  // Avoid writing on every question by combining rapid saves into one sync.
  window.addEventListener("jini-learning-progress-changed", function () {
    if (!validToken() || conflict) return;
    if (syncAfterXP !== null) window.clearTimeout(syncAfterXP);
    syncAfterXP = window.setTimeout(function () {
      syncAfterXP = null;
      if (validToken() && !document.hidden) syncCycle();
    }, 2000);
  });
  setInterval(function () {
    if (validToken()) syncCycle();
    else if (token) { clearTabToken(); status("Google 인증이 만료되었습니다. 기기와 Drive 기록은 유지됩니다. Google 다시 연결을 눌러 주세요.", true); render(); }
  }, 45000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && validToken()) syncCycle();
  });
})();

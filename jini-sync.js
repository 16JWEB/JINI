/* JINI Google Drive 동기화: Google 로그인 인증은 브라우저 메모리에만 유지합니다. */
(function () {
  "use strict";
  const CONFIG_ID = (window.JINI_GOOGLE_CLIENT_ID || "").trim();
  const META_KEY = "jini-drive-sync-meta-v1";
  const FOLDER_NAME = "JINI";
  const FILE_NAME = "jini-backup.json";
  const SCOPE = "https://www.googleapis.com/auth/drive.file";
  const API = "https://www.googleapis.com/drive/v3/files";
  const UPLOAD_API = "https://www.googleapis.com/upload/drive/v3/files";
  const $ = function (id) { return document.getElementById(id); };
  const root = $("jini-sync-section");
  if (!root) return;
  let token = "";
  let expiresAt = 0;
  let busy = false;
  let fileId = "";
  let conflict = null;
  let confirmAction = null;
  let meta = readMeta();

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
    return key !== META_KEY && !key.startsWith("jini-drive-") &&
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
  function meaningful(records) {
    return Object.keys(records).some(function (key) {
      return key !== "jini-last-study-state";
    });
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
    for (const k of Object.keys(data)) {
      if (!included(k) || typeof data[k] !== "string" || data[k].length > 2000000) {
        throw new Error("백업파일에 허용되지 않는 데이터가 포함되어 있습니다.");
      }
    }
    return data;
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
  function applyRecords(records) {
    const existing = snapshot();
    // 복원 전에 현재 기록을 파일로 별도 저장해 실수로 잃지 않게 합니다.
    if (Object.keys(existing).length) download(existing);
    Object.keys(existing).forEach(function (key) { localStorage.removeItem(key); });
    Object.keys(records).forEach(function (key) { localStorage.setItem(key, records[key]); });
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
  function render() {
    const on = validToken();
    $("jsy-state").textContent = on ? "연결됨" : "연결 안 됨";
    $("jsy-state").classList.toggle("is-connected", on);
    $("jsy-auto").textContent = on && !conflict ? "활성화" : "비활성화";
    $("jsy-last").textContent = dateTime(meta.lastSyncedAt);
    $("jsy-connect").disabled = on || busy;
    $("jsy-disconnect").disabled = !on || busy;
    $("jsy-backup").disabled = !on || busy;
    $("jsy-restore").disabled = !on || busy;
    $("jsy-delete").disabled = !on || busy;
    $("jsy-config").hidden = !!CONFIG_ID;
    $("jsy-conflict").hidden = !conflict;
  }
  async function request(url, opts) {
    if (!validToken()) {
      token = "";
      render();
      throw new Error("Google 연결이 만료되었습니다. '동기화 하기'를 다시 눌러 주세요.");
    }
    const options = opts || {};
    options.headers = Object.assign({ Authorization: "Bearer " + token }, options.headers || {});
    const res = await fetch(url, options);
    if (res.status === 401) {
      token = "";
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
    const result = await request(query({ q: q, pageSize: "100", fields: "nextPageToken,files(id,name,mimeType,version,modifiedTime)", spaces: "drive" }));
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
    const info = await request(API + "/" + encodeURIComponent(id) + "?fields=id,version,modifiedTime");
    return info;
  }
  function markSynced(records, remote) {
    meta.lastHash = fingerprint(records);
    meta.lastRemoteVersion = String(remote.version || "");
    meta.lastSyncedAt = new Date().toISOString();
    meta.deleted = false;
    saveMeta();
    fileId = remote.id || fileId;
    render();
  }
  function showConflict(local, remote, remoteMeta) {
    conflict = { local: local, remote: remote, remoteMeta: remoteMeta };
    $("jsy-conflict-text").textContent = "이 기기와 Google Drive 양쪽에 서로 다른 학습기록이 있습니다. 안전을 위해 자동 덮어쓰기를 중지했어요. 어느 기록을 사용할지 선택해 주세요. Drive 기록을 사용하면 현재 기록이 JSON 파일로 별도 다운로드됩니다.";
    render();
    status("기기 간 기록 충돌로 자동 동기화가 일시 중지되었습니다.", true);
  }
  async function syncCycle() {
    if (!validToken() || busy || conflict || document.hidden) return;
    busy = true;
    render();
    try {
      const local = snapshot();
      const localHash = fingerprint(local);
      const remoteMeta = await findFile();
      if (!remoteMeta) {
        // 다른 기기에서 백업을 삭제했으면 자동으로 다시 만들지 않습니다.
        if (meta.lastRemoteVersion || meta.deleted) {
          token = "";
          status("Drive에서 기존 백업이 사라졌습니다. 자동 재업로드를 막기 위해 연결을 중지했어요.", true);
          render();
          return;
        }
        if (Object.keys(local).length) {
          const saved = await writeFile(local, null);
          markSynced(local, saved);
          status("Google Drive에 첫 백업을 저장했습니다.");
        } else {
          status("아직 저장할 학습기록이 없습니다. 학습을 시작하면 백업을 생성합니다.");
        }
        return;
      }
      fileId = remoteMeta.id;
      const remoteVersion = String(remoteMeta.version || "");
      if (meta.lastRemoteVersion && remoteVersion === String(meta.lastRemoteVersion)) {
        if (localHash !== meta.lastHash) {
          const now = await findFile();
          if (!now || String(now.version) !== remoteVersion) {
            const remote = now ? await readFile(now.id) : {};
            showConflict(local, remote, now || remoteMeta);
            return;
          }
          const saved = await writeFile(local, remoteMeta);
          markSynced(local, saved);
          status("이 기기에서 바뀐 학습정보를 Drive에 저장했습니다.");
        }
        return;
      }
      const remote = await readFile(remoteMeta.id);
      const remoteHash = fingerprint(remote);
      if (remoteHash === localHash) {
        markSynced(local, remoteMeta);
        status("학습정보가 최신 상태입니다.");
      } else if (!meaningful(local) || (meta.lastHash && localHash === meta.lastHash)) {
        meta.lastHash = remoteHash;
        meta.lastRemoteVersion = remoteVersion;
        meta.lastSyncedAt = new Date().toISOString();
        saveMeta();
        status("다른 기기의 최신 학습정보를 불러옵니다.");
        applyRecords(remote);
      } else {
        showConflict(local, remote, remoteMeta);
      }
    } catch (e) { status(e.message || "동기화에 실패했습니다.", true); }
    finally { busy = false; render(); }
  }
  async function beginConnect() {
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
            status("Google Drive 연결이 취소되었거나 거부되었습니다.", true);
            return;
          }
          token = response.access_token;
          expiresAt = Date.now() + (Number(response.expires_in) || 3600) * 1000;
          conflict = null;
          status("Google Drive에 연결했습니다. 기존 백업과 학습기록을 비교합니다.");
          render();
          syncCycle();
        },
        error_callback: function () { status("Google 로그인 창을 열지 못했습니다. 팝업 설정을 확인해 주세요.", true); }
      });
      client.requestAccessToken({ prompt: "consent" });
    } catch (e) { status(e.message, true); }
  }
  function disconnect() {
    if (token && window.google && google.accounts && google.accounts.oauth2) {
      try { google.accounts.oauth2.revoke(token, function () {}); } catch (_) {}
    }
    token = "";
    expiresAt = 0;
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
  async function manualBackup(force) {
    if (!validToken()) return status("먼저 동기화 하기를 눌러 연결해 주세요.", true);
    await withBusy(async function () {
      const now = await findFile();
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
      if (!Object.keys(local).length) throw new Error("저장할 학습기록이 없습니다. 빈 백업으로 기존 기록을 덮어쓰지 않아요.");
      const result = await writeFile(local, now);
      conflict = null;
      markSynced(local, result);
      status("Google Drive / JINI / jini-backup.json에 백업을 저장했습니다.");
    });
  }
  async function restore() {
    if (!validToken()) return status("먼저 동기화 하기를 눌러 연결해 주세요.", true);
    await withBusy(async function () {
      const found = await findFile();
      if (!found) throw new Error("Google Drive에서 복원할 JINI 백업을 찾지 못했습니다.");
      const data = await readFile(found.id);
      meta.lastHash = fingerprint(data);
      meta.lastRemoteVersion = String(found.version || "");
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
      meta.deleted = true;
      meta.lastRemoteVersion = "";
      meta.lastHash = "";
      saveMeta();
      token = "";
      expiresAt = 0;
      conflict = null;
      status("Drive의 JINI 백업을 삭제했습니다. 이 기기의 학습기록은 유지됩니다. 다른 기기에서는 기존 연결을 해제해 주세요.");
    });
  }
  $("jsy-connect").addEventListener("click", beginConnect);
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
      download(item.remote);
      manualBackup(true);
    }
  }, true);
  render();
  setInterval(function () {
    if (validToken()) syncCycle();
    else if (token) { token = ""; status("Google 인증 시간이 만료되었어요. 다시 동기화 해 주세요.", true); render(); }
  }, 45000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && validToken()) syncCycle();
  });
})();

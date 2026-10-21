(function () {
  "use strict";
  const source = document.querySelector(".home-sync-link");
  const sourceStatus = document.getElementById("jini-sync-menu-status");
  const target = document.querySelector(".study-sync-link");
  const targetStatus = document.getElementById("study-sync-status");
  if (!source || !sourceStatus || !target || !targetStatus) return;
  function update() {
    target.dataset.syncState = source.dataset.syncState || "disconnected";
    targetStatus.textContent = sourceStatus.textContent;
    target.setAttribute("aria-label", source.getAttribute("aria-label"));
  }
  new MutationObserver(update).observe(source, {
    attributes: true, attributeFilter: ["data-sync-state", "aria-label"],
    childList: true, characterData: true, subtree: true
  });
  update();
}());
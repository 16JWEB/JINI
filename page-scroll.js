/* Show one page-top control across the word, expression and study screens. */
(function () {
  "use strict";
  const button = document.getElementById("page-top-button");
  if (!button) return;
  function update() {
    button.hidden = window.scrollY < 300;
  }
  button.addEventListener("click", function () {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "instant" : "smooth" });
  });
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("pageshow", update);
  update();
}());

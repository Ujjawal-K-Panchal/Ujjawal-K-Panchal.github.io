/* Classic script, no modules, no fetch — the page must also open from file://.
   Every other disclosure on the page is a native <details>; only the identity
   cards need script, because they are exclusive and their panels are full-width
   below a three-column grid. */
(function () {
  "use strict";

  /* ---- the philosophy loop: one beat lit at a time, then round again ---- */
  var beats = [].slice.call(document.querySelectorAll(".philosophy .beat"));
  if (beats.length && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var i = 0;
    setInterval(function () {
      beats.forEach(function (b, n) { b.classList.toggle("lit", n === i); });
      i = (i + 1) % beats.length;
    }, 900);
  }

  /* ---- three identities: independent disclosures, all shut on load ---- */
  var cards = [].slice.call(document.querySelectorAll(".ident"));
  var panels = [].slice.call(document.querySelectorAll(".ident-panel"));

  function show(key) {
    cards.forEach(function (c) { c.setAttribute("aria-expanded", String(c.dataset.ident === key)); });
    panels.forEach(function (p) { p.classList.toggle("is-active", p.dataset.ident === key); });
  }

  cards.forEach(function (c) {
    c.addEventListener("click", function () {
      // clicking the open card shuts it, so the reader can get back to nothing
      show(c.getAttribute("aria-expanded") === "true" ? null : c.dataset.ident);
    });
    c.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      var n = cards.indexOf(c) + (e.key === "ArrowRight" ? 1 : -1);
      cards[(n + cards.length) % cards.length].focus();
    });
  });

})();

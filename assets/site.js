/* Classic script, no modules, no fetch — the page must also open from file://.
   Every other disclosure on the page is a native <details>; only the identity
   cards need script, because they are exclusive and their panels are full-width
   below a three-column grid. */
(function () {
  "use strict";

  /* ---- the method as a terminal: each line types itself in, once ---- */
  var lines = [].slice.call(document.querySelectorAll(".term-lines li"));
  if (lines.length && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var cmds = lines.map(function (li) { return li.querySelector(".cmd"); });
    var lens = cmds.map(function (c) { return c.textContent.length; });
    var li = 0, ci = 0;

    // Types itself in once, then stays. A loop would leave the top of the page
    // showing bare prompts most of the time, which no shell ever does.
    cmds.forEach(function (c) { c.style.width = "0ch"; });
    lines[0].classList.add("typing");

    function tick() {
      if (li >= lines.length) return;
      if (ci < lens[li]) {
        cmds[li].style.width = ++ci + "ch";
        setTimeout(tick, 32 + (ci % 3) * 12);          // uneven, like a person typing
      } else {
        lines[li].classList.remove("typing");
        li++; ci = 0;
        if (li < lines.length) lines[li].classList.add("typing");
        setTimeout(tick, 260);
      }
    }
    setTimeout(tick, 250);
  }

  /* ---- three identities: exclusive disclosures, all shut on load ---- */
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

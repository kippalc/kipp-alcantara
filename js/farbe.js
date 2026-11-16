/* Schalter hell / dunkel. Standard ist hell; die Wahl bleibt nur im Browser des Besuchers. */
(function () {
  var wurzel = document.documentElement;
  var knoepfe = document.querySelectorAll(".farbwahl button");
  function setze(farbe, merken) {
    if (farbe === "dunkel") wurzel.setAttribute("data-theme", "dark"); else wurzel.removeAttribute("data-theme");
    Array.prototype.forEach.call(knoepfe, function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-farbe") === farbe); });
    if (merken) { try { localStorage.setItem("farbe", farbe); } catch (e) {} }
  }
  setze(wurzel.getAttribute("data-theme") === "dark" ? "dunkel" : "hell", false);
  Array.prototype.forEach.call(knoepfe, function (b) {
    b.addEventListener("click", function () { setze(b.getAttribute("data-farbe"), true); });
  });
})();

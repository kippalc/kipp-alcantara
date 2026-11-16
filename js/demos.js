/* Interaktive Nachbauten der sechs Werkzeuge.
   Jede Demo baut sich in ihrem <div class="demo" data-demo="…"> selbst auf.
   Alle Zahlen sind erfunden oder stammen aus eigenem Testmaterial. Kein Laden von fremden Servern. */
(function () {
  "use strict";

  var ruhig = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }
  function klemm(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function sichtbar(knoten, fn) {
    if (!("IntersectionObserver" in window)) { fn(); return; }
    var io = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { io.disconnect(); fn(); }
    }, { threshold: 0.35 });
    io.observe(knoten);
  }
  function zahl(x, stellen) { return x.toFixed(stellen).replace(".", ","); }

  /* ================= 01 KI-Schnitt: After Effects ================= */
  function kiSchnitt(root) {
    var DAUER = 6;
    var woerter = [
      ["Warum", 0.2, 0.5], ["ruckelt", 0.5, 0.95], ["ein", 0.95, 1.1], ["Video?", 1.1, 1.6],
      ["Jedes", 2.8, 3.1], ["24.", 3.1, 3.7], ["Bild", 3.7, 4.0], ["steht", 4.0, 4.3], ["doppelt", 4.3, 4.85], ["da.", 4.85, 5.1]
    ];
    var log = [
      [0.0, "Skript gelesen: 2 Sätze, 5 Grafiken"],
      [0.2, "Sprechertext transkribiert, „Warum“ bei 0:00:05"],
      [1.0, "Balken 01–05 gestaffelt, je 0,32 s versetzt"],
      [2.8, "Text 2 auf das Wort „Jedes“ gelegt"],
      [5.3, "Kontrolle: 0 fehlende Medien, Pegel ok"],
      [5.8, "Fertig zur Abnahme, nicht exportiert"]
    ];
    var ebenen = [
      { name: "TXT 01 Titel", art: "text", ab: 0.2, keys: [0.2, 0.7] },
      { name: "TXT 02 Erklärung", art: "text", ab: 2.8, keys: [2.8, 3.3] }
    ];
    for (var b = 0; b < 5; b++) {
      var t0 = 1.0 + b * 0.32;
      ebenen.push({ name: "Balken 0" + (b + 1), art: "form", ab: 0, keys: [t0, t0 + 0.4, t0 + 0.56], farbe: b === 2 ? "#ef5a45" : "#3b82f6" });
    }

    root.className += " d-ae";
    var kopf = el("div", "kopf"); kopf.innerHTML = "<b>Komposition: Erklaerfilm_Demo</b><span>1920 × 1080 · 25 fps</span>";
    var oben = el("div", "oben");
    var viewer = el("div", "viewer"); var bild = el("div", "bild");
    var titel = el("div", "titel", "Warum ruckelt ein Video?");
    var unter = el("div", "unter", "Jedes 24. Bild steht doppelt da");
    var balken = el("div", "balken"); var bars = [];
    var hoehen = [58, 80, 50, 100, 72];
    for (var i = 0; i < 5; i++) { var bi = el("i", i === 2 ? "rot" : ""); bi.style.height = hoehen[i] + "%"; balken.appendChild(bi); bars.push(bi); }
    var ut = el("div", "untertitel");
    bild.append(titel, unter, balken, ut); viewer.appendChild(bild);
    var logBox = el("div", "log"); logBox.appendChild(el("p", "kopfzeile", "Agent · Protokoll"));
    var logZeilen = log.map(function (l) { var p = el("p", "", l[1]); logBox.appendChild(p); return p; });
    oben.append(viewer, logBox);

    var steuer = el("div", "steuer");
    var knopf = el("button", "", "▶ Abspielen"); knopf.type = "button";
    var tc = el("span", "tc", "0:00:00:00");
    var hinweis = el("span", "", "Klick oder Ziehen in der Timeline springt an die Stelle");
    hinweis.style.cssText = "font-size:11px;color:#8e8e93";
    steuer.append(knopf, tc, hinweis);

    var tl = el("div", "timeline");
    var namen = el("div", "namen"); namen.appendChild(el("div", "lineal-platz"));
    var spuren = el("div", "spuren");
    var lineal = el("div", "lineal");
    for (var s = 0; s <= DAUER; s++) { var m = el("span", "", s + "s"); m.style.left = (s / DAUER * 100) + "%"; lineal.appendChild(m); }
    [["Titel", 0.2], ["Balken", 1.0], ["Erklärung", 2.8]].forEach(function (mk) {
      var mm = el("span", "marker", mk[0]); mm.style.left = (mk[1] / DAUER * 100) + "%"; lineal.appendChild(mm);
    });
    spuren.appendChild(lineal);
    ebenen.forEach(function (e) {
      var n = el("div", "", e.name); n.style.setProperty("--f", e.farbe || "#ef5a45"); namen.appendChild(n);
      var z = el("div", "zeile"); var balk = el("div", "ebene " + e.art);
      balk.style.left = (e.ab / DAUER * 100) + "%"; balk.style.right = "0"; z.appendChild(balk);
      e.keys.forEach(function (k) { var d = el("i", "key"); d.style.left = (k / DAUER * 100) + "%"; z.appendChild(d); });
      spuren.appendChild(z);
    });
    var nSpr = el("div", "", "A1 Sprecher"); nSpr.style.setProperty("--f", "#2ecc71"); namen.appendChild(nSpr);
    var zSpr = el("div", "zeile");
    var wortEl = woerter.map(function (w) {
      var d = el("div", "wort", w[0]); d.style.left = (w[1] / DAUER * 100) + "%"; d.style.width = ((w[2] - w[1]) / DAUER * 100) + "%"; zSpr.appendChild(d); return d;
    });
    spuren.appendChild(zSpr);
    var kopflinie = el("div", "kopflinie"); spuren.appendChild(kopflinie);
    tl.append(namen, spuren);
    root.append(kopf, oben, steuer, tl);

    var t = 0, laeuft = false, letzte = 0;
    function ease(x) { return 1 - Math.pow(1 - x, 3); }
    function zeichne() {
      var a = klemm((t - 0.2) / 0.5, 0, 1);
      titel.style.opacity = a; titel.style.transform = "translateY(" + (1 - ease(a)) * 14 + "px)";
      var c = klemm((t - 2.8) / 0.5, 0, 1);
      unter.style.opacity = c; unter.style.transform = "translateY(" + (1 - ease(c)) * 10 + "px)";
      bars.forEach(function (bar, k) {
        var s0 = 1.0 + k * 0.32, v;
        if (t <= s0) v = 0;
        else if (t < s0 + 0.4) v = ease((t - s0) / 0.4) * 1.08;
        else if (t < s0 + 0.56) v = 1.08 - 0.08 * ((t - s0 - 0.4) / 0.16);
        else v = 1;
        bar.style.transform = "scaleY(" + v + ")";
      });
      var gesprochen = "";
      woerter.forEach(function (w, k) {
        var an = t >= w[1] && t < w[2] + 0.05; wortEl[k].classList.toggle("an", an);
        if (t >= w[1] && ((k < 4 && t < 2.6) || (k >= 4 && t >= 2.8))) gesprochen += w[0] + " ";
      });
      ut.textContent = gesprochen.trim();
      log.forEach(function (l, k) { logZeilen[k].classList.toggle("an", t >= l[0]); });
      kopflinie.style.left = (t / DAUER * 100) + "%";
      var f = Math.round(t * 25); tc.textContent = "0:00:0" + Math.floor(f / 25) + ":" + ("0" + (f % 25)).slice(-2);
    }
    function schritt(zeit) {
      if (!laeuft) return;
      if (letzte) t += (zeit - letzte) / 1000;
      letzte = zeit;
      if (t >= DAUER) { t = DAUER; stop(); }
      zeichne();
      if (laeuft) requestAnimationFrame(schritt);
    }
    function start() { if (t >= DAUER) t = 0; laeuft = true; letzte = 0; knopf.textContent = "❚❚ Pause"; requestAnimationFrame(schritt); }
    function stop() { laeuft = false; knopf.textContent = "▶ Abspielen"; }
    knopf.addEventListener("click", function () { laeuft ? stop() : start(); });
    function springe(ev) {
      var r = spuren.getBoundingClientRect();
      var x = (ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left;
      t = klemm(x / r.width, 0, 1) * DAUER; stop(); zeichne();
    }
    var zieht = false;
    spuren.addEventListener("pointerdown", function (ev) { zieht = true; springe(ev); });
    window.addEventListener("pointermove", function (ev) { if (zieht) springe(ev); });
    window.addEventListener("pointerup", function () { zieht = false; });
    zeichne();
    if (!ruhig) sichtbar(root, start); else { t = DAUER; zeichne(); }
  }

  /* ================= 02 TNT Margin Intelligence ================= */
  function tnt(root) {
    root.className += " d-tnt";
    var saetze = {
      PY: { name: "Vorjahr", basis: 1.12, ist: 1.09, eff: [["Menge", 0.08], ["Preis", 0.05], ["Material", -0.11], ["Mix", -0.03], ["Währung", -0.02]] },
      BUD: { name: "Budget", basis: 1.17, ist: 1.09, eff: [["Menge", -0.04], ["Preis", 0.02], ["Material", -0.05], ["Mix", 0.01], ["Währung", -0.02]] },
      FC: { name: "Forecast", basis: 1.11, ist: 1.09, eff: [["Menge", 0.01], ["Preis", 0.01], ["Material", -0.03], ["Mix", -0.01], ["Währung", 0.0]] }
    };
    var texte = {
      Menge: "Mehr verkaufte Stück in Land A und B. Größter Beitrag: Segment 2 in Land A.",
      Preis: "Höhere Nettopreise in 3 von 4 Segmenten, Rabatte leicht gesunken.",
      Material: "Höhere Materialkosten je Stück. Die größte Wirkung hat Segment 1 in Land B.",
      Mix: "Mehr Umsatz mit Produkten, die weniger Marge tragen.",
      "Währung": "Schwächere Fremdwährung drückt den umgerechneten Ertrag."
    };
    var reiter = el("div", "reiter");
    var kach = el("div", "kacheln");
    var br = el("div", "bruecke"); var h = el("h4", "", ""); br.appendChild(h);
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg"); svg.setAttribute("viewBox", "0 0 640 230"); br.appendChild(svg);
    var detail = el("div", "detail", "Klick auf einen Balken: Woher kommt die Abweichung?");
    br.appendChild(detail);
    root.append(reiter, kach, br);
    var hin = el("p", "", "Alle Zahlen erfunden, Länder und Segmente anonym."); hin.style.cssText = "margin:8px 0 0;font-size:10.5px;color:#7b8ea3"; root.appendChild(hin);

    var aktiv = "PY", knoepfe = {};
    ["PY", "BUD", "FC"].forEach(function (k) {
      var bt = el("button", "", "Ist vs. " + saetze[k].name); bt.type = "button";
      bt.addEventListener("click", function () { aktiv = k; male(true); });
      reiter.appendChild(bt); knoepfe[k] = bt;
    });
    function kachel(titel, wert, diff, prozent) {
      var d = el("div", "kachel");
      d.innerHTML = "<small>" + titel + "</small><b>" + wert + "</b><em class='" + (diff >= 0 ? "plus" : "minus") + "'>" + (diff >= 0 ? "▲ +" : "▼ ") + prozent + "</em>";
      return d;
    }
    function male(animiert) {
      var S = saetze[aktiv];
      Object.keys(knoepfe).forEach(function (k) { knoepfe[k].setAttribute("aria-pressed", k === aktiv); });
      var diff = S.ist - S.basis;
      kach.innerHTML = "";
      kach.append(
        kachel("Umsatz", zahl(2.6, 1) + " Mio. €", aktiv === "BUD" ? -1 : 1, aktiv === "BUD" ? "−6,6 %" : "+4,5 %"),
        kachel("Deckungsbeitrag I", zahl(S.ist, 2) + " Mio. €", diff, (diff >= 0 ? "" : "−") + zahl(Math.abs(diff / S.basis * 100), 1) + " %"),
        kachel("Marge", "41,9 %", diff, zahl(diff / S.basis * 41.9, 1) + " pp")
      );
      h.textContent = "Deckungsbeitrag I: " + S.name + " → Ist, in Mio. €";
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var schritte = [["" + S.name, S.basis, "basis"]].concat(S.eff.map(function (e) { return [e[0], e[1], "eff"]; })).concat([["Ist", S.ist, "basis"]]);
      var min = 0.8, max = 1.3, H = 180, top = 12, B = 640 / schritte.length;
      function y(v) { return top + (max - v) / (max - min) * H; }
      var lauf = S.basis;
      schritte.forEach(function (sch, k) {
        var x = k * B + B * 0.18, w = B * 0.64, y0, y1, farbe;
        if (sch[2] === "basis") { y0 = y(sch[1]); y1 = y(min); farbe = "#4b6a8a"; if (k > 0) lauf = sch[1]; }
        else { var neu = lauf + sch[1]; y0 = y(Math.max(lauf, neu)); y1 = y(Math.min(lauf, neu)); farbe = sch[1] >= 0 ? "#3ecf8e" : "#ff7a6b"; lauf = neu; }
        var r = document.createElementNS(svgNS, "rect");
        r.setAttribute("x", x); r.setAttribute("width", w); r.setAttribute("fill", farbe); r.setAttribute("rx", 2);
        r.setAttribute("class", "bar"); r.style.opacity = 0.85;
        var hoehe = Math.max(2, y1 - y0);
        if (animiert && !ruhig) {
          r.setAttribute("y", y1); r.setAttribute("height", 0);
          setTimeout(function () { r.style.transition = "y .5s, height .5s"; r.setAttribute("y", y0); r.setAttribute("height", hoehe); }, 40 + k * 70);
        } else { r.setAttribute("y", y0); r.setAttribute("height", hoehe); }
        svg.appendChild(r);
        var l = document.createElementNS(svgNS, "text");
        l.setAttribute("x", x + w / 2); l.setAttribute("y", 222); l.setAttribute("text-anchor", "middle"); l.setAttribute("fill", "#8aa0b5"); l.setAttribute("font-size", "12");
        l.textContent = sch[0]; svg.appendChild(l);
        var v = document.createElementNS(svgNS, "text");
        v.setAttribute("x", x + w / 2); v.setAttribute("y", y0 - 5); v.setAttribute("text-anchor", "middle"); v.setAttribute("fill", "#e6edf5"); v.setAttribute("font-size", "11");
        v.textContent = (sch[2] === "eff" && sch[1] >= 0 ? "+" : "") + zahl(sch[1], 2); svg.appendChild(v);
        if (sch[2] === "eff") {
          var auswahl = function () {
            Array.prototype.forEach.call(svg.querySelectorAll(".bar"), function (q) { q.classList.remove("aktiv"); });
            r.classList.add("aktiv");
            var anteil = Math.abs(sch[1]) / S.eff.reduce(function (s, e) { return s + Math.abs(e[1]); }, 0) * 100;
            detail.innerHTML = "<b>" + sch[0] + ": " + (sch[1] >= 0 ? "+" : "−") + zahl(Math.abs(sch[1]), 2) + " Mio. €</b> · " + zahl(anteil, 0) + " % der Bewegung<br>" + texte[sch[0]];
          };
          r.addEventListener("click", auswahl); r.addEventListener("mouseenter", auswahl);
        }
      });
    }
    male(false);
    sichtbar(root, function () { male(true); });
  }

  /* ================= 03 FreezeFramesFinder ================= */
  function fff(root) {
    root.className += " d-fff";
    var bildQuelle = "img/werkzeuge/fff-bild.jpg";
    var dateien = [
      ["Hochzeitslocation_Teaser_v3.mov", "00:00:29:15", "10 Stellen, 10 wiederholte Frames", "rot"],
      ["Hochzeitslocation_Imagefilm_v2.mov", "00:00:27:15", "20 Stellen, 20 wiederholte Frames", "rot"],
      ["Hochzeitslocation_Social_final.mov", "00:00:20:00", "Keine Freeze Frames", "gruen"]
    ];
    var positionen = [250, 274, 299, 323, 347, 372, 396, 420, 445, 469];
    function tcVon(f) { var s = Math.floor(f / 25), fr = f % 25; return "10:00:" + ("0" + s).slice(-2) + ":" + ("0" + fr).slice(-2); }

    var tit = el("div", "titelleiste", "FreezeFramesFinder");
    var dl = el("div", "dateien");
    dl.innerHTML = "<div class='kopf'><span>Datei</span><span>Dauer</span><span>Ergebnis</span></div>";
    var dateiZeilen = dateien.map(function (d, k) {
      var z = el("div", d[3]); z.innerHTML = "<span>" + d[0] + "</span><span>" + d[1] + "</span><span>" + d[2] + "</span>";
      z.addEventListener("click", function () { waehleDatei(k); }); dl.appendChild(z); return z;
    });
    var unten = el("div", "unten");
    var stellen = el("div", "stellen");
    var vorschau = el("div", "vorschau"); var vImg = el("img"); vImg.src = bildQuelle; vImg.alt = "Vorschaubild der gewählten Stelle"; vImg.loading = "lazy";
    var vText = el("p", "", ""); vorschau.append(vImg, vText);
    unten.append(stellen, vorschau);
    var urs = el("div", "ursache");
    var ursText = el("span", "", "");
    var knoepfe = el("span", ""); knoepfe.style.cssText = "display:flex;gap:6px";
    var bVergl = el("button", "", "Bilder vergleichen"); bVergl.type = "button";
    var bFix = el("button", "", "So beheben …"); bFix.type = "button";
    knoepfe.append(bVergl, bFix); urs.append(ursText, knoepfe);
    var diag = el("div", "diagramm");
    var verg = el("div", "vergleich");
    root.append(tit, dl, unten, urs, diag, verg);

    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg"); svg.setAttribute("viewBox", "0 0 600 90"); svg.setAttribute("preserveAspectRatio", "none"); diag.appendChild(svg);
    var werte = []; var seed = 7;
    function zufall() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var f = 0; f < 740; f++) werte.push(28 + 18 * Math.sin(f / 37) + zufall() * 14);
    var gewaehlt = 0, dateiNr = 0;

    function male() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var pfad = "";
      werte.forEach(function (v, f) {
        var x = f / 739 * 600, val = (dateiNr === 2 || positionen.indexOf(f) < 0) ? v : 1;
        if (dateiNr === 1 && positionen.indexOf(f - 12) >= 0) val = 1;
        pfad += (f ? "L" : "M") + x.toFixed(1) + " " + (86 - val).toFixed(1);
      });
      var p = document.createElementNS(svgNS, "path"); p.setAttribute("d", pfad); p.setAttribute("fill", "none"); p.setAttribute("stroke", "#5aa0ff"); p.setAttribute("stroke-width", "1");
      svg.appendChild(p);
      if (dateiNr === 2) return;
      aktuelleStellen().forEach(function (pos, k) {
        var x = pos / 739 * 600;
        var r = document.createElementNS(svgNS, "rect");
        r.setAttribute("x", x - 2); r.setAttribute("y", 4); r.setAttribute("width", 4); r.setAttribute("height", 82);
        r.setAttribute("fill", k === gewaehlt ? "#ff4d4d" : "rgba(255,77,77,.45)");
        r.style.cursor = "pointer";
        r.addEventListener("click", function () { waehleStelle(k); });
        r.addEventListener("mouseenter", function () { waehleStelle(k); });
        svg.appendChild(r);
      });
    }
    function aktuelleStellen() {
      if (dateiNr === 2) return [];
      if (dateiNr === 1) return positionen.concat(positionen.map(function (p) { return p + 12; })).sort(function (a, b) { return a - b; });
      return positionen;
    }
    function waehleDatei(k) {
      dateiNr = k; gewaehlt = 0;
      dateiZeilen.forEach(function (z, j) { z.classList.toggle("sel", j === k); });
      var st = aktuelleStellen();
      stellen.innerHTML = "<div class='kopf'><span>Nr</span><span>Art</span><span>Start-TC</span><span>Ende-TC</span></div>";
      if (!st.length) {
        var leer = el("div", "", ""); leer.innerHTML = "<span></span><span>Keine Freeze Frames gefunden</span><span></span><span></span>"; stellen.appendChild(leer);
        ursText.textContent = "Alles in Ordnung: nichts zu beheben."; vText.textContent = ""; verg.classList.remove("offen");
        bVergl.disabled = bFix.disabled = true; male(); return;
      }
      bVergl.disabled = bFix.disabled = false;
      st.forEach(function (pos, j) {
        var z = el("div", ""); z.innerHTML = "<span>" + (j + 1) + "</span><span>Doppelter Frame · Muster 1</span><span>" + tcVon(pos) + "</span><span>" + tcVon(pos + 1) + "</span>";
        z.addEventListener("click", function () { waehleStelle(j); }); stellen.appendChild(z);
      });
      ursText.textContent = k === 0
        ? "Ursache (vermutlich): Bildratenwandlung 23,976 oder 24 → 25 fps, alle ~24 Frames"
        : "Ursache (vermutlich): Bildratenwandlung in zwei Clips, alle ~12 Frames";
      waehleStelle(0);
    }
    function waehleStelle(j) {
      gewaehlt = j;
      var st = aktuelleStellen(), pos = st[j];
      Array.prototype.forEach.call(stellen.querySelectorAll("div:not(.kopf)"), function (z, i) { z.classList.toggle("sel", i === j); });
      vText.textContent = "Stelle " + (j + 1) + ": Frame " + pos + " bis " + (pos + 1);
      vImg.style.objectPosition = (40 + j * 5) + "% 50%";
      male();
      if (verg.classList.contains("offen")) zeigeVergleich(pos);
    }
    function frameBild(verschiebung) {
      var i = el("img"); i.src = bildQuelle; i.alt = ""; i.style.transform = "scale(1.12) translateX(" + verschiebung + "%)"; return i;
    }
    function zeigeVergleich(pos) {
      verg.innerHTML = "";
      var r1 = el("div", "reihe"), r2 = el("div", "reihe");
      var versatz = [0, 2.2, 2.2];
      [pos - 1, pos, pos + 1].forEach(function (f, k) {
        var fig = el("figure"); fig.appendChild(frameBild(versatz[k]));
        var c = el("figcaption", "", "Frame " + f); fig.appendChild(c); r1.appendChild(fig);
        var d = el("figure", "diff");
        if (k === 0) { d.appendChild(frameBild(-2.2)); d.appendChild(frameBild(0)); }
        else { d.appendChild(frameBild(versatz[k - 1])); d.appendChild(frameBild(versatz[k])); }
        d.appendChild(el("figcaption", "", k === 2 ? "Unterschied: keiner, doppelter Frame" : "Unterschied zum Vorgänger"));
        r2.appendChild(d);
      });
      verg.append(r1, el("div", "", ""), r2);
      r2.style.marginTop = "6px";
    }
    bVergl.addEventListener("click", function () {
      if (verg.classList.contains("offen") && !verg.querySelector(".schritte")) { verg.classList.remove("offen"); return; }
      verg.classList.add("offen"); zeigeVergleich(aktuelleStellen()[gewaehlt]);
    });
    bFix.addEventListener("click", function () {
      verg.classList.add("offen");
      verg.innerHTML = "<b>In Premiere Pro beheben</b><ol class='schritte'><li>Zur Stelle " + tcVon(aktuelleStellen()[gewaehlt]) + " springen und den Clip prüfen.</li><li>Clip im Projekt auswählen: Clip › Ändern › Filmmaterial interpretieren (Interpret Footage) › Diese Framerate annehmen: 25.</li><li>Sequenz neu ausgeben und erneut prüfen.</li></ol>";
    });
    waehleDatei(0);
  }

  /* ================= 04 OneClick Motion ================= */
  function ocm(root) {
    root.className += " d-ocm";
    var comp = el("div", "comp");
    var rahmen = el("div", "rahmen"); var img = el("img"); img.src = "img/werkzeuge/fff-bild.jpg"; img.alt = "Beispielbild in der Komposition"; img.loading = "lazy"; rahmen.appendChild(img);
    var info = el("div", "keyinfo", "Ebene ausgewählt: Drohne_01.jpg · Maus über eine Schaltfläche");
    comp.append(rahmen, info);
    var panel = el("div", "panel");
    panel.innerHTML = "<h4>OneClick Motion</h4><div class='sub'>96 Presets · Werte: aktuelle Ebene · Keyframes bleiben</div>";
    var opt = el("div", "optionen"); opt.appendChild(el("span", "", "Tempo"));
    var tempo = "Ease", tKnoepfe = {};
    ["Linear", "Ease", "Smooth"].forEach(function (tn) {
      var b = el("button", "", tn); b.type = "button"; b.setAttribute("aria-pressed", tn === tempo);
      b.addEventListener("click", function () { tempo = tn; Object.keys(tKnoepfe).forEach(function (k) { tKnoepfe[k].setAttribute("aria-pressed", k === tn); }); });
      tKnoepfe[tn] = b; opt.appendChild(b);
    });
    var mat = el("div", "matrix");
    var zeilen = [
      ["Zoom In", "scale", [4, 12, 24, 36], "%"],
      ["Zoom Out", "scale", [-4, -12, -24, -4], "%"],
      ["Rot R", "rotate", [2, 6, 12, 18], "°"],
      ["Rot L", "rotate", [-2, -6, -12, -18], "°"],
      ["Pan H", "x", [3, -3, 8, -8], "%"],
      ["Pan V", "y", [3, -3, 8, -8], "%"],
      ["Pop-in", "pop", [1, 1, 1, 1], ""],
      ["Ken Burns", "kb", [1, 1, 1, 1], ""]
    ];
    var stufen = ["Subtle", "Medium", "Strong", "Special"];
    ["", "Subtle", "Medium", "Strong", "Special"].forEach(function (k) { mat.appendChild(el("span", "", k)); });
    var zul = el("div", "zuletzt", "Zuletzt: noch nichts angewendet");
    var aktivKnopf = null, anim = null;
    function easing() { return tempo === "Linear" ? "linear" : tempo === "Ease" ? "cubic-bezier(.33,0,.2,1)" : "cubic-bezier(.65,0,.35,1)"; }
    function frames(art, wert, k) {
      if (art === "scale") return [{ transform: "scale(1)" }, { transform: "scale(" + (1 + wert / 100) + ")" }];
      if (art === "rotate") return [{ transform: "scale(1.25) rotate(0deg)" }, { transform: "scale(1.25) rotate(" + wert + "deg)" }];
      if (art === "x") return [{ transform: "scale(1.2) translateX(0)" }, { transform: "scale(1.2) translateX(" + wert + "%)" }];
      if (art === "y") return [{ transform: "scale(1.2) translateY(0)" }, { transform: "scale(1.2) translateY(" + wert + "%)" }];
      if (art === "pop") return [{ transform: "scale(0)", opacity: 0 }, { transform: "scale(" + [1.04, 1.08, 1.14, 1.2][k] + ")", opacity: 1, offset: 0.7 }, { transform: "scale(1)", opacity: 1 }];
      return [{ transform: "scale(1.05) translate(-2%,1%)" }, { transform: "scale(" + [1.12, 1.2, 1.3, 1.4][k] + ") translate(3%,-2%)" }];
    }
    function spiele(z, k, endlos) {
      if (anim) anim.cancel();
      var art = z[1], w = z[2][k];
      anim = img.animate(frames(art, w, k), { duration: art === "pop" ? 900 : 2200, easing: easing(), iterations: endlos ? Infinity : 1, direction: endlos && art !== "pop" ? "alternate" : "normal", fill: "forwards" });
      var eig = art === "scale" || art === "pop" ? "Skalierung" : art === "rotate" ? "Drehung" : art === "kb" ? "Skalierung + Position" : "Position";
      var text = art === "pop" ? "0 % → " + [104, 108, 114, 120][k] + " % → 100 %" : art === "kb" ? "langsame Fahrt über das Bild" : (art === "scale" ? "100 % → " + (100 + w) + " %" : (w > 0 ? "+" : "") + w + z[3]);
      info.textContent = eig + ": " + text + " · " + (art === "pop" ? "0,9 s" : "ganze Ebene") + " · " + tempo;
    }
    zeilen.forEach(function (z) {
      mat.appendChild(el("span", "", z[0]));
      stufen.forEach(function (st, k) {
        var w = z[2][k];
        var lab = z[1] === "pop" || z[1] === "kb" ? st : ((w > 0 ? "+" : "") + w + z[3] + " " + st);
        var b = el("button", "", lab); b.type = "button"; b.title = z[0] + " " + st;
        b.addEventListener("mouseenter", function () { spiele(z, k, true); });
        b.addEventListener("focus", function () { spiele(z, k, true); });
        b.addEventListener("mouseleave", function () { if (anim) anim.cancel(); info.textContent = aktivKnopf ? info.dataset.fest : "Maus über eine Schaltfläche"; });
        b.addEventListener("click", function () {
          if (aktivKnopf) aktivKnopf.classList.remove("aktiv");
          aktivKnopf = b; b.classList.add("aktiv");
          spiele(z, k, false);
          info.dataset.fest = "Angewendet: " + info.textContent + " · 2 Keyframes gesetzt";
          info.textContent = info.dataset.fest;
          zul.textContent = "Zuletzt: " + z[0] + " " + st;
        });
        mat.appendChild(b);
      });
    });
    panel.append(opt, mat, zul);
    root.append(comp, panel);
  }

  /* ================= 05 Cuelaro ================= */
  function cuelaro(root) {
    root.className += " d-cue";
    var RATE = 22050;
    var sounds = [
      { name: "Whoosh, stark", datei: "WAV · 48 kHz · Stereo", rubrik: "Effekte", dauer: 1.2, tags: "whoosh luft schnell übergang wind swoosh", art: "whoosh" },
      { name: "Handy-Nummer wählen, Telefon", datei: "WAV · 44,1 kHz · Stereo", rubrik: "Technik", dauer: 1.6, tags: "telefon handy wählen töne piepen dtmf", art: "dtmf" },
      { name: "Glocke, Klavier, hell", datei: "WAV · 44,1 kHz · Stereo", rubrik: "Musik", dauer: 2.0, tags: "glocke klavier ding hell musik ton", art: "glocke" },
      { name: "Laser-Schuss, groß", datei: "WAV · 48 kHz · Mono", rubrik: "Sci-Fi", dauer: 0.7, tags: "laser schuss sci-fi pew space waffe", art: "laser" },
      { name: "Wind, stark", datei: "WAV · 44,1 kHz · Stereo", rubrik: "Natur", dauer: 2.0, tags: "wind sturm natur draußen luft wetter", art: "wind" },
      { name: "Schritte auf Kies", datei: "WAV · 44,1 kHz · Mono", rubrik: "Foley", dauer: 2.0, tags: "schritte gehen kies foley laufen boden", art: "schritte" },
      { name: "Pop, kurz", datei: "WAV · 48 kHz · Mono", rubrik: "Effekte", dauer: 0.3, tags: "pop blase einblendung klick grafik", art: "pop" },
      { name: "10 kHz Ton, Loop", datei: "WAV · 48 kHz · Stereo", rubrik: "Technik", dauer: 1.0, tags: "ton sinus test piep signal", art: "sinus" }
    ];
    var rubriken = [["Alle Sounds", 1558], ["Effekte", 325], ["Technik", 196], ["Musik", 65], ["Sci-Fi", 179], ["Natur", 78], ["Foley", 56]];
    function erzeuge(s) {
      var n = Math.floor(s.dauer * RATE), d = new Float32Array(n), ph = 0, lp = 0;
      for (var i = 0; i < n; i++) {
        var t = i / RATE, x = 0, r = Math.random() * 2 - 1, rel = t / s.dauer;
        if (s.art === "whoosh") { var env = Math.sin(Math.PI * rel); lp += (r - lp) * (0.02 + 0.25 * env); x = lp * env * 2.2; }
        else if (s.art === "wind") { lp += (r - lp) * 0.04; x = lp * (0.6 + 0.4 * Math.sin(t * 3)) * 2.5; }
        else if (s.art === "dtmf") { var ton = Math.floor(t / 0.2), an = (t % 0.2) < 0.13; var f1 = [697, 770, 852, 941][ton % 4], f2 = [1209, 1336, 1477][ton % 3]; x = an ? 0.35 * (Math.sin(2 * Math.PI * f1 * t) + Math.sin(2 * Math.PI * f2 * t)) : 0; }
        else if (s.art === "glocke") { x = Math.exp(-t * 2.5) * (0.5 * Math.sin(2 * Math.PI * 880 * t) + 0.25 * Math.sin(2 * Math.PI * 1760 * t) + 0.12 * Math.sin(2 * Math.PI * 2640 * t)); }
        else if (s.art === "laser") { ph += 2 * Math.PI * (1800 * Math.exp(-t * 6) + 120) / RATE; x = 0.5 * Math.sign(Math.sin(ph)) * Math.exp(-t * 4); }
        else if (s.art === "schritte") { var st = t % 0.5; x = st < 0.09 ? r * Math.exp(-st * 40) * 0.9 : 0; }
        else if (s.art === "pop") { ph += 2 * Math.PI * (400 + 600 * Math.exp(-t * 30)) / RATE; x = Math.sin(ph) * Math.exp(-t * 18) * 0.8; }
        else { x = 0.25 * Math.sin(2 * Math.PI * 1000 * t); }
        d[i] = Math.max(-1, Math.min(1, x));
      }
      return d;
    }
    sounds.forEach(function (s) { s.daten = erzeuge(s); });

    var seite = el("aside"); seite.appendChild(el("small", "", "RUBRIKEN"));
    var main = el("main");
    var feld = el("input"); feld.type = "search"; feld.placeholder = "Suche nach Namen, Tags, Stimmung … z. B. „Luft“ oder „Grafik“";
    feld.setAttribute("aria-label", "Sounds durchsuchen");
    var treffer = el("div", "treffer"); var liste = el("div", "liste");
    var ppro = el("div", "ppro"); ppro.innerHTML = "<div class='kopf'>Premiere Pro · Sequenz „Demo“ · Sound auf A5 ziehen oder Doppelklick</div>";
    var spV = el("div", "spur"); spV.innerHTML = "<b>V1</b>"; var feldV = el("div", "feld"); spV.appendChild(feldV);
    var cv = el("div", "clip v", "Interview_01.mp4"); cv.style.left = "0"; cv.style.width = "70%"; feldV.appendChild(cv);
    var spA = el("div", "spur"); spA.innerHTML = "<b>A5</b>"; var feldA = el("div", "feld"); spA.appendChild(feldA);
    ppro.append(spV, spA);
    main.append(feld, treffer, liste, ppro);
    root.append(seite, main);

    var rubrik = "Alle Sounds", rKnoepfe = [];
    rubriken.forEach(function (r) {
      var b = el("button"); b.type = "button"; b.innerHTML = "<span>" + r[0] + "</span><em>" + r[1].toLocaleString("de-DE") + "</em>";
      b.setAttribute("aria-pressed", r[0] === rubrik);
      b.addEventListener("click", function () { rubrik = r[0]; rKnoepfe.forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); zeige(); });
      rKnoepfe.push(b); seite.appendChild(b);
    });

    var ctx = null, quelle = null, spielendeZeile = null, platz = 4;
    function spiele(s, zeile, knopf) {
      try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
      if (quelle) { try { quelle.stop(); } catch (e) {} }
      if (spielendeZeile) { spielendeZeile.classList.remove("spielt"); spielendeZeile.querySelector("button").textContent = "▶"; }
      if (spielendeZeile === zeile) { spielendeZeile = null; return; }
      var buf = ctx.createBuffer(1, s.daten.length, RATE); buf.getChannelData(0).set(s.daten);
      quelle = ctx.createBufferSource(); quelle.buffer = buf;
      var g = ctx.createGain(); g.gain.value = 0.5; quelle.connect(g); g.connect(ctx.destination);
      quelle.start(); zeile.classList.add("spielt"); knopf.textContent = "■"; spielendeZeile = zeile;
      quelle.onended = function () { if (spielendeZeile === zeile) { zeile.classList.remove("spielt"); knopf.textContent = "▶"; spielendeZeile = null; } };
    }
    function welle(canvas, daten) {
      var dpr = window.devicePixelRatio || 1, w = canvas.clientWidth || 110, h = 22;
      canvas.width = w * dpr; canvas.height = h * dpr;
      var c = canvas.getContext("2d"); c.scale(dpr, dpr); c.fillStyle = "#9a9aa3";
      var schritt = Math.floor(daten.length / w);
      for (var x = 0; x < w; x++) {
        var m = 0; for (var i = x * schritt; i < (x + 1) * schritt; i += 8) m = Math.max(m, Math.abs(daten[i] || 0));
        var hh = Math.max(1, m * h); c.fillRect(x, (h - hh) / 2, 1, hh);
      }
    }
    function lege(s) {
      var c = el("div", "clip", s.name); var breite = Math.max(8, s.dauer * 9);
      if (platz + breite > 98) { platz = 4; feldA.innerHTML = ""; }
      c.style.left = platz + "%"; c.style.width = breite + "%"; platz += breite + 2;
      feldA.appendChild(c);
      if (!ruhig) c.animate([{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "none" }], { duration: 250 });
    }
    function passt(s, q) {
      if (rubrik !== "Alle Sounds" && s.rubrik !== rubrik) return false;
      if (!q) return true;
      return q.toLowerCase().split(/\s+/).every(function (w) { return (s.name + " " + s.tags).toLowerCase().indexOf(w) >= 0; });
    }
    function zeige() {
      var q = feld.value.trim(); liste.innerHTML = "";
      var gef = sounds.filter(function (s) { return passt(s, q); });
      treffer.textContent = gef.length + (gef.length === 1 ? " Treffer" : " Treffer") + (q ? " für „" + q + "“" : "") + " · Ausschnitt aus 1.558 Sounds";
      gef.forEach(function (s) {
        var z = el("div"); z.draggable = true;
        var b = el("button", "", "▶"); b.type = "button"; b.setAttribute("aria-label", "Vorhören: " + s.name);
        var n = el("div", "name"); n.innerHTML = s.name + "<small>" + s.datei + "</small>";
        var cvs = el("canvas"); var d = el("span", "dauer", "0:0" + Math.max(1, Math.round(s.dauer)));
        z.append(b, n, cvs, d); liste.appendChild(z);
        requestAnimationFrame(function () { welle(cvs, s.daten); });
        b.addEventListener("click", function (e) { e.stopPropagation(); spiele(s, z, b); });
        z.addEventListener("dblclick", function () { lege(s); });
        z.addEventListener("dragstart", function (e) { e.dataTransfer.setData("text/plain", s.name); feldA.classList.add("ziel"); });
        z.addEventListener("dragend", function () { feldA.classList.remove("ziel"); });
      });
    }
    feldA.addEventListener("dragover", function (e) { e.preventDefault(); });
    feldA.addEventListener("drop", function (e) {
      e.preventDefault(); feldA.classList.remove("ziel");
      var name = e.dataTransfer.getData("text/plain");
      var s = sounds.filter(function (x) { return x.name === name; })[0]; if (s) lege(s);
    });
    feld.addEventListener("input", zeige);
    zeige();
  }

  /* ================= 06 MAZ Tracker ================= */
  function maz(root) {
    root.className += " d-maz";
    var ZIEL = 700, tage = [3, 2, 2, 3, 0, 0, 2, 6], gesamt = 519, plan = 534, tag = 0;
    var namenTage = ["Di", "Mi", "Do", "Fr", "Sa", "So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So", "Mo"];
    var reihe = el("div", "reihe");
    var kHeute = el("div", "karte blau"), kGestern = el("div", "karte"), kWoche = el("div", "karte"), kProg = el("div", "karte rot");
    reihe.append(kHeute, kGestern, kWoche, kProg);
    var ges = el("div", "karte gesamt");
    var diag = el("div", "diagramm"); var dk = el("div", "kopf"); dk.appendChild(el("span", "", "Neue Beiträge pro Tag"));
    var knopf = el("button", "", "Nächsten Schnitttag simulieren"); knopf.type = "button"; dk.appendChild(knopf);
    var saeulen = el("div", "saeulen"); diag.append(dk, saeulen);
    var warn = el("div", "warnungen");
    root.append(reihe, ges, diag, warn);
    var hin = el("p", "", "Alle Zahlen erfunden."); hin.style.cssText = "margin:8px 0 0;font-size:10.5px;color:#6b7487"; root.appendChild(hin);
    var meldungen = [];
    function tempo() {
      var arbeit = tage.filter(function (x, i) { return x > 0 || (i % 7 !== 4 && i % 7 !== 5); }).slice(-6, -1);
      var s = arbeit.reduce(function (a, b) { return a + b; }, 0); return Math.max(0.1, s / Math.max(1, arbeit.length));
    }
    function karte(k, titel, wert, unter) { k.innerHTML = "<small>" + titel + "</small><b>" + wert + "</b><em>" + unter + "</em>"; }
    function male(neu) {
      var heute = tage[tage.length - 1], gestern = tage[tage.length - 2];
      var woche = tage.slice(-3).reduce(function (a, b) { return a + b; }, 0);
      var tp = tempo(), prognose = Math.round(gesamt + tp * 22);
      karte(kHeute, "Heute geschnitten", heute, "selbst gezählt");
      karte(kGestern, "Gestern", gestern, "selbst gezählt");
      karte(kWoche, "Diese Woche", woche, "seit Samstag");
      karte(kProg, "Prognose Staffelende", prognose, "Ziel " + ZIEL + " · " + zahl(tp, 1) + " pro Tag");
      kProg.className = "karte " + (prognose >= ZIEL ? "blau" : "rot");
      ges.innerHTML = "<small>Fertig gesamt</small><b>" + gesamt + "</b><em>" + gesamt + " von " + ZIEL + " · Plan heute " + plan + "</em><div class='balkenleiste'><i style='width:" + (gesamt / ZIEL * 100) + "%'></i><u style='left:" + (plan / ZIEL * 100) + "%'></u></div>";
      saeulen.innerHTML = "";
      var max = Math.max.apply(null, tage.concat([8]));
      tage.slice(-14).forEach(function (v, i, arr) {
        var d = el("div", i === arr.length - 1 && neu ? "neu" : ""); var s = el("i"); s.style.height = (v / max * 78) + "%";
        d.append(el("span", "", v ? v : ""), s, el("span", "", namenTage[(i + tag) % 14])); saeulen.appendChild(d);
      });
      warn.innerHTML = meldungen.length ? meldungen.slice(-2).map(function (m) { return "<div><span>WARNUNG</span>" + m + "</div>"; }).join("") : "<div style='color:#6b7487'>Was beim Lauf auffiel: nichts.</div>";
    }
    knopf.addEventListener("click", function () {
      var n = 5 + Math.floor(Math.random() * 6);
      tage.push(n); gesamt += n; plan += 7; tag++;
      if (tage.length > 14) tage.shift();
      if (Math.random() < 0.45) {
        var nr = 90000 + Math.floor(Math.random() * 900);
        meldungen.push(Math.random() < 0.5 ? "MAZ " + nr + " liegt doppelt in zwei Abnahmeordnern, gezählt wird sie einmal." : "MAZ " + nr + " ist fertig geschnitten, aber noch nicht abgelegt.");
      }
      male(true);
    });
    male(false);
  }

  var demos = { "ki-schnitt": kiSchnitt, tnt: tnt, fff: fff, ocm: ocm, cuelaro: cuelaro, maz: maz };
  Array.prototype.forEach.call(document.querySelectorAll(".demo[data-demo]"), function (root) {
    var fn = demos[root.getAttribute("data-demo")];
    if (fn) { try { fn(root); } catch (e) { root.style.display = "none"; if (window.console) console.error(e); } }
  });
})();

// ============================================================
// THOMAS KIPP ALCANTARA — main.js
// Schaltet zwischen DE und EN um. Alle Inhalte stehen im HTML
// (Deutsch) und in js/texte.js (beide Sprachen) —
// hier muss man normalerweise nichts ändern.
// ============================================================

(function () {
  'use strict';

  // Gewählte Sprache merken. In privaten Fenstern kann das fehlschlagen,
  // deshalb try/catch – die Seite funktioniert dann trotzdem.
  function gemerkteSprache() {
    try { return localStorage.getItem('tka-sprache'); } catch (e) { return null; }
  }
  function spracheMerken(lang) {
    try { localStorage.setItem('tka-sprache', lang); } catch (e) { /* egal */ }
  }

  let lang = gemerkteSprache() ||
    ((navigator.language || 'de').toLowerCase().startsWith('de') ? 'de' : 'en');
  if (!TEXTE[lang]) lang = 'de';

  const t = (key) => (TEXTE[lang] && TEXTE[lang][key]) || TEXTE.de[key] || key;

  function spracheSetzen(neu) {
    lang = neu;
    document.documentElement.lang = lang;
    document.title = t('titel');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('.sprache button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  }

  document.querySelectorAll('.sprache button').forEach((b) => {
    b.addEventListener('click', () => {
      spracheMerken(b.dataset.lang);
      spracheSetzen(b.dataset.lang);
    });
  });

  // Deutsch steht schon im HTML – nur bei Englisch muss etwas getauscht werden
  if (lang !== 'de') spracheSetzen(lang);
})();

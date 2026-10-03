/* Draughtsman Mechanical EN i18n extras — merges into ITI_I18N.dict */
(function () {
  "use strict";
  var extra = {
    en: {
      "blog.draughtsman.crumb": "Draughtsman checklist",
      "blog.draughtsman.h1": "ITI Draughtsman Mechanical CBT: Orthographic Views, Dimensioning & Drawing Office Safety Checklist"
    }
  };
  function mergeAndApply() {
    if (!window.ITI_I18N || !window.ITI_I18N.dict) return false;
    var d = window.ITI_I18N.dict;
    Object.keys(extra).forEach(function (lang) {
      if (!d[lang]) d[lang] = {};
      var src = extra[lang] || {};
      Object.keys(src).forEach(function (k) { d[lang][k] = src[k]; });
    });
    if (typeof window.ITI_I18N.apply === "function" && typeof window.ITI_I18N.getLang === "function") {
      window.ITI_I18N.apply(window.ITI_I18N.getLang());
    }
    return true;
  }
  if (!mergeAndApply()) {
    var n = 0;
    var t = setInterval(function () {
      if (mergeAndApply() || ++n > 80) clearInterval(t);
    }, 50);
  }
})();

/* ITI Exam Prep — i18n bootstrap (loads base dict + RAC/MMV extras) */
(function () {
  "use strict";
  function loadScript(src, onload) {
    var s = document.createElement("script");
    s.src = src;
    s.async = false;
    if (onload) s.onload = onload;
    document.head.appendChild(s);
  }
  var base = "https://cdn.jsdelivr.net/gh/sachin1024-92/itiexamprep-com@cde9bc780a917e9e12c499e31c4d939a30aca9a6/assets/js/i18n.js";
  var here = document.currentScript && document.currentScript.src;
  function sibling(name) {
    if (here) return here.replace(/i18n\.js(?:\?.*)?$/, name);
    var el = document.querySelector('script[src*="i18n.js"]');
    var src = (el && el.src) || "../../assets/js/i18n.js";
    return src.replace(/i18n\.js(?:\?.*)?$/, name);
  }
  loadScript(base, function () {
    loadScript(sibling("i18n-rac-mmv-en.js"), function () {
      loadScript(sibling("i18n-rac-mmv-hi.js"));
    });
  });
})();

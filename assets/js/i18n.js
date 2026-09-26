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
  var extras = "i18n-rac-mmv.js";
  if (here) {
    extras = here.replace(/i18n\.js(?:\?.*)?$/, "i18n-rac-mmv.js");
  } else {
    /* fallback relative to typical pages depth */
    extras = (document.querySelector('script[src*="i18n.js"]') || {src: "../../assets/js/i18n.js"}).src.replace(/i18n\.js(?:\?.*)?$/, "i18n-rac-mmv.js");
  }
  loadScript(base, function () {
    loadScript(extras);
  });
})();

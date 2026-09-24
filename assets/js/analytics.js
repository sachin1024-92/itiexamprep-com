/* ITI Exam Prep — GA4 loader (only when Measurement ID is set) */
(function () {
  "use strict";
  var cfg = window.ITI_SITE_CONFIG || {};
  var id = (typeof window.ITI_GA_ID === "string" && window.ITI_GA_ID) ||
    (cfg.gaMeasurementId || "");
  id = String(id).trim();
  if (!id || id.indexOf("G-") !== 0) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, { anonymize_ip: true });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);
})();

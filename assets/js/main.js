/* ITI Exam Prep — site interactions */
(function () {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Highlight current nav link
  var path = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    try {
      var href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto")) return;
      var linkPath = new URL(href, window.location.href).pathname
        .replace(/\/index\.html$/, "/")
        .replace(/\/$/, "") || "/";
      if (linkPath !== "/" && path.indexOf(linkPath) === 0) {
        a.classList.add("active");
      } else if (linkPath === "/" && (path === "" || path.endsWith("itiexamprep.com") || path.endsWith("/workspace/itiexamprep.com"))) {
        a.classList.add("active");
      }
    } catch (err) { /* ignore */ }
  });

  // Year in footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

/* Blog index: ensure Draughtsman Mechanical card is first */
(function () {
  "use strict";
  try {
    var path = (location.pathname || "").replace(/\\/g, "/");
    if (!(path.indexOf("/blog") !== -1 && (path.endsWith("/blog") || path.endsWith("/blog/") || path.endsWith("/blog/index.html")))) return;
    var grid = document.querySelector(".blog-grid");
    if (!grid) return;
    if (grid.querySelector('a[href*="iti-draughtsman-mechanical"]')) return;
    var art = document.createElement("article");
    art.className = "blog-card";
    art.innerHTML = '<div class="blog-card-img" aria-hidden="true" style="background:linear-gradient(135deg,#1e3a5f,#4f46e5)">📐</div>' +
      '<div class="blog-card-body">' +
      '<div class="blog-meta" data-i18n="blog.draughtsman.cardMeta">3 Oct 2026 · Draughtsman Mechanical</div>' +
      '<h3><a href="iti-draughtsman-mechanical-cbt-orthographic-dimensioning-safety.html" data-i18n="blog.draughtsman.cardTitle">ITI Draughtsman Mechanical CBT: Orthographic Views, Dimensioning &amp; Drawing Office Safety Checklist</a></h3>' +
      '<p data-i18n="blog.draughtsman.cardDesc">Orthographic projection (first/third angle), front/top/side &amp; section traps, line types &amp; dimensioning favourites, instruments &amp; CAD habits, and a drawing-office safety checklist.</p>' +
      '<a class="link-more" href="iti-draughtsman-mechanical-cbt-orthographic-dimensioning-safety.html" data-i18n="common.readMore">Read article →</a>' +
      '</div>';
    grid.insertBefore(art, grid.firstChild);
    if (window.ITI_I18N && typeof window.ITI_I18N.apply === "function") {
      try { window.ITI_I18N.apply(); } catch (e) {}
    }
  } catch (err) { /* ignore */ }
})();

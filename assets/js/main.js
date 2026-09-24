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

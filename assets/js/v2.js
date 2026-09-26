/* ITI Exam Prep — v2 UI: language toggle, dropdown nav, site search, progress */
(function () {
  "use strict";
  var H = document.documentElement, R = H.getAttribute("data-root") || "";
  function lang() { return H.getAttribute("data-lang") === "hi" ? "hi" : "en"; }
  function setLang(l) {
    try { localStorage.setItem("itie_lang", l); } catch (e) { }
    H.setAttribute("data-lang", l); H.lang = l === "hi" ? "hi" : "en-IN";
    document.querySelectorAll("[data-lang-set]").forEach(function (b) { var on = b.getAttribute("data-lang-set") === l; b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on ? "true" : "false"); });
    try { window.dispatchEvent(new CustomEvent("itie:langchange", { detail: { lang: l } })); } catch (e) { }
  }
  (function () { var l = "en"; try { l = localStorage.getItem("itie_lang") === "hi" ? "hi" : "en"; } catch (e) { } setLang(l); })();
  document.querySelectorAll("[data-lang-set]").forEach(function (b) { b.addEventListener("click", function () { setLang(b.getAttribute("data-lang-set")); }); });

  /* dropdowns */
  var dds = document.querySelectorAll(".dd");
  function closeAll(except) { dds.forEach(function (d) { if (d !== except) { d.classList.remove("open"); var b = d.querySelector(".dd-btn"); if (b) b.setAttribute("aria-expanded", "false"); } }); }
  dds.forEach(function (d) {
    var b = d.querySelector(".dd-btn");
    b.addEventListener("click", function (e) { e.stopPropagation(); var o = !d.classList.contains("open"); closeAll(d); d.classList.toggle("open", o); b.setAttribute("aria-expanded", o ? "true" : "false"); });
  });
  document.addEventListener("click", function (e) { if (!e.target.closest(".dd")) closeAll(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeAll(); closeSearch(); } });

  /* search */
  var ov = document.getElementById("search-overlay"), idx = null, loading = null;
  function load() {
    if (idx) return Promise.resolve(idx);
    if (!loading) loading = fetch(R + "assets/data/search.json").then(function (r) { return r.json(); }).then(function (d) { idx = d; return d; }).catch(function () { idx = []; return idx; });
    return loading;
  }
  function norm(s) { return String(s || "").toLowerCase(); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var KIND = { en: { t: "Trade", n: "Notes", g: "Guide", p: "Test", q: "Question", b: "Blog", s: "Page" }, hi: { t: "ट्रेड", n: "नोट्स", g: "गाइड", p: "टेस्ट", q: "प्रश्न", b: "ब्लॉग", s: "पेज" } };
  function search(q, box, limit) {
    var terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) { box.innerHTML = ""; return; }
    load().then(function (d) {
      var res = [];
      for (var i = 0; i < d.length; i++) {
        var it = d[i], hay = norm(it.t + " " + (it.h || "") + " " + (it.d || "")), sc = 0, ok = true;
        for (var j = 0; j < terms.length; j++) { var p = hay.indexOf(terms[j]); if (p < 0) { ok = false; break; } sc += norm(it.t).indexOf(terms[j]) > -1 ? 3 : 1; }
        if (ok) { if (it.k !== "q") sc += 2; res.push([sc, it]); }
      }
      res.sort(function (a, b) { return b[0] - a[0]; });
      var L = lang();
      box.innerHTML = res.length ? res.slice(0, limit || 12).map(function (r) { var it = r[1]; return '<a class="sr" href="' + R + it.u + '"><span class="sr-k">' + KIND[L][it.k] + "</span><span>" + esc(L === "hi" && it.h ? it.h : it.t) + "</span></a>"; }).join("") : '<p class="sr-none">' + (L === "hi" ? "कोई परिणाम नहीं मिला।" : "No results found.") + "</p>";
    });
  }
  function openSearch() { if (!ov) return; ov.hidden = false; var i = ov.querySelector("[data-search]"); i.focus(); load(); }
  function closeSearch() { if (ov) ov.hidden = true; }
  document.querySelectorAll("[data-search-open]").forEach(function (b) { b.addEventListener("click", openSearch); });
  document.querySelectorAll("[data-search-close]").forEach(function (b) { b.addEventListener("click", closeSearch); });
  if (ov) ov.addEventListener("click", function (e) { if (e.target === ov) closeSearch(); });
  document.querySelectorAll("[data-search]").forEach(function (inp) {
    var box = inp.parentNode.querySelector("[data-search-results]"), tm;
    inp.addEventListener("focus", load);
    inp.addEventListener("input", function () { clearTimeout(tm); tm = setTimeout(function () { search(inp.value, box, inp.hasAttribute("data-search-page") ? 60 : 12); }, 120); });
    inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { var a = box.querySelector("a"); if (inp.hasAttribute("data-search-page")) return; if (a) location.href = a.href; } });
    if (inp.hasAttribute("data-search-page")) { var m = /[?&]q=([^&]*)/.exec(location.search); if (m) { inp.value = decodeURIComponent(m[1].replace(/\+/g, " ")); search(inp.value, box, 60); } }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); openSearch(); } });

  /* progress widget */
  function renderProgress() {
    document.querySelectorAll("[data-progress]").forEach(function (el) {
      var p = {}; try { p = JSON.parse(localStorage.getItem("itie_progress") || "{}"); } catch (e) { }
      var ks = Object.keys(p).sort(function (a, b) { return (p[b].t || 0) - (p[a].t || 0); }), L = lang();
      if (!ks.length) { el.innerHTML = '<p class="note">' + (L === "hi" ? "अभी तक कोई टेस्ट नहीं दिया। कोई भी प्रैक्टिस टेस्ट दें — आपके स्कोर इसी डिवाइस पर सेव होंगे (कोई लॉगिन नहीं)।" : "No tests attempted yet. Take any practice test — your scores are saved on this device only (no login).") + "</p>"; return; }
      var lim = parseInt(el.getAttribute("data-progress"), 10) || 100, tot = 0, sum = 0;
      var rows = ks.slice(0, lim).map(function (k) { var r = p[k]; tot += r.n; sum += r.best; var u = r.url ? R + r.url.replace(/^\/?(itiexamprep-com\/)?/, "") : "#"; if (!/^pages\//.test(r.url || "")) { var m = /pages\/.+$/.exec(r.url || ""); u = m ? R + m[0] : "#"; } return '<tr><td><a href="' + u + '">' + esc(r.title || k) + "</a></td><td>" + r.n + "</td><td>" + r.last + "%</td><td><b>" + r.best + "%</b></td></tr>"; }).join("");
      el.innerHTML = '<div class="table-wrap"><table><tr><th>' + (L === "hi" ? "टेस्ट" : "Test") + "</th><th>" + (L === "hi" ? "प्रयास" : "Attempts") + "</th><th>" + (L === "hi" ? "पिछला" : "Last") + "</th><th>" + (L === "hi" ? "सर्वश्रेष्ठ" : "Best") + "</th></tr>" + rows + "</table></div>" + (el.hasAttribute("data-progress-reset") ? '<button type="button" class="btn btn-ghost btn-sm" data-reset>' + (L === "hi" ? "प्रगति रीसेट करें" : "Reset progress") + "</button>" : "");
      var rb = el.querySelector("[data-reset]"); if (rb) rb.addEventListener("click", function () { if (confirm(L === "hi" ? "सारी प्रगति मिटानी है?" : "Delete all saved progress?")) { localStorage.removeItem("itie_progress"); renderProgress(); } });
    });
  }
  renderProgress();
  window.addEventListener("itie:langchange", renderProgress);
})();

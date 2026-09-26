/* ITI Exam Prep — CBT quiz engine v2 (bilingual, timer, palette, review, progress) */
(function () {
  "use strict";
  var root = document.getElementById("cbt");
  if (!root) return;
  var UI = {
    en: { practice: "Practice mode", practiceD: "Instant answer + explanation after each question", exam: "Exam mode (CBT)", examD: "Timer, question palette, mark for review, result at the end", count: "Questions", all: "All", shuffle: "Shuffle questions", start: "Start", best: "Your best", attempts: "attempts", q: "Question", of: "of", prev: "← Previous", next: "Save & Next →", mark: "Mark for review", clear: "Clear", submit: "Submit test", confirm: "Submit the test now?", unans: "unanswered", timeLeft: "Time left", exp: "Explanation", finish: "Finish", result: "Your result", score: "Score", correct: "Correct", wrong: "Wrong", skipped: "Not attempted", marks: "Marks", subj: "Subject", review: "Review all answers", reviewWrong: "Review wrong only", retry: "Retry", newTest: "New test", your: "Your answer", right: "Correct answer", none: "Not answered", tt: "Trade Theory", wcs: "Workshop Calculation & Science", ed: "Engineering Drawing", es: "Employability Skills", noNeg: "2 marks per question · No negative marking", legendA: "Answered", legendM: "Marked", legendN: "Not answered", loading: "Loading questions…", fail: "Could not load questions. Please check your connection and retry.", great: "Excellent! Keep revising to stay sharp.", good: "Good attempt — review the wrong answers and retry.", low: "Keep going — read the notes, then retry this test." },
    hi: { practice: "प्रैक्टिस मोड", practiceD: "हर प्रश्न के बाद तुरंत उत्तर + व्याख्या", exam: "परीक्षा मोड (CBT)", examD: "टाइमर, प्रश्न पैलेट, मार्क फॉर रिव्यू, अंत में परिणाम", count: "प्रश्न", all: "सभी", shuffle: "प्रश्न मिलाएँ (शफल)", start: "शुरू करें", best: "आपका सर्वश्रेष्ठ", attempts: "प्रयास", q: "प्रश्न", of: "में से", prev: "← पिछला", next: "सेव करें और आगे →", mark: "रिव्यू के लिए मार्क करें", clear: "हटाएँ", submit: "टेस्ट सबमिट करें", confirm: "क्या अभी टेस्ट सबमिट करना है?", unans: "अनुत्तरित", timeLeft: "बचा समय", exp: "व्याख्या", finish: "समाप्त", result: "आपका परिणाम", score: "स्कोर", correct: "सही", wrong: "गलत", skipped: "प्रयास नहीं किया", marks: "अंक", subj: "विषय", review: "सभी उत्तर देखें", reviewWrong: "केवल गलत देखें", retry: "फिर से दें", newTest: "नया टेस्ट", your: "आपका उत्तर", right: "सही उत्तर", none: "उत्तर नहीं दिया", tt: "ट्रेड थ्योरी", wcs: "वर्कशॉप कैलकुलेशन एवं साइंस", ed: "इंजीनियरिंग ड्राइंग", es: "एम्प्लॉयबिलिटी स्किल्स", noNeg: "प्रति प्रश्न 2 अंक · कोई नेगेटिव मार्किंग नहीं", legendA: "उत्तर दिया", legendM: "मार्क किया", legendN: "उत्तर नहीं दिया", loading: "प्रश्न लोड हो रहे हैं…", fail: "प्रश्न लोड नहीं हो सके। इंटरनेट जाँचकर फिर कोशिश करें।", great: "शानदार! तैयारी बनाए रखने के लिए रिवीज़न करते रहें।", good: "अच्छा प्रयास — गलत उत्तर देखें और फिर से दें।", low: "हिम्मत रखें — नोट्स पढ़ें, फिर यह टेस्ट दोबारा दें।" }
  };
  function lang() { return document.documentElement.getAttribute("data-lang") === "hi" ? "hi" : "en"; }
  function t(k) { return UI[lang()][k] || UI.en[k] || k; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  var NOSH = /option|विकल्प|above|both|A and B|उपरोक्त|दोनों|none of/i;
  function norm(bank) {
    return (bank.q || []).map(function (a, i) {
      var o = a[2], oh = (a[3] && a[3].length === a[2].length) ? a[3] : a[2], ans = a[4];
      if (!NOSH.test((a[5] || "") + (a[6] || "") + o.join("|") + oh.join("|"))) { var ord = shuffle(o.map(function (_, k) { return k; })); o = ord.map(function (k) { return a[2][k]; }); oh = ord.map(function (k) { return (a[3] && a[3].length === a[2].length ? a[3] : a[2])[k]; }); ans = ord.indexOf(a[4]); }
      return { en: a[0], hi: a[1] || a[0], o: o, oh: oh, a: ans, e: a[5] || "", eh: a[6] || a[5] || "", s: bank.s || "tt", id: bank.id + "-" + i };
    });
  }
  function qText(q) { return lang() === "hi" ? q.hi : q.en; }
  function oText(q, i) { return lang() === "hi" ? q.oh[i] : q.o[i]; }
  function eText(q) { return lang() === "hi" ? q.eh : q.e; }
  var PKEY = "itie_progress";
  function getP() { try { return JSON.parse(localStorage.getItem(PKEY) || "{}"); } catch (e) { return {}; } }
  function saveP(key, title, pct, n) {
    try { var p = getP(); var r = p[key] || { n: 0, best: 0 }; r.n++; r.last = pct; r.best = Math.max(r.best || 0, pct); r.t = Date.now(); r.title = title; r.q = n; r.url = location.pathname.split("/").slice(-3).join("/") + location.search; p[key] = r; localStorage.setItem(PKEY, JSON.stringify(p)); } catch (e) { }
    try { if (window.gtag) window.gtag("event", "quiz_complete", { quiz_id: key, score_pct: pct }); } catch (e) { }
  }
  var key = root.getAttribute("data-key");
  function title() { return root.getAttribute("data-title-" + lang()) || root.getAttribute("data-title-en"); }
  var pool = [], st = null, view = "setup", timer = null, reviewWrongOnly = false;

  function setupHTML() {
    var p = getP()[key];
    var h = '<div class="cbt-setup card"><h2>' + esc(title()) + '</h2><p class="note">' + pool.length + " MCQs · " + esc(t("noNeg")) + "</p>";
    if (p) h += '<p class="best-chip">🏆 ' + esc(t("best")) + ": <strong>" + p.best + "%</strong> · " + p.n + " " + esc(t("attempts")) + "</p>";
    h += '<div class="mode-grid"><label class="mode"><input type="radio" name="cbt-mode" value="practice" checked><span><strong>' + esc(t("practice")) + "</strong><small>" + esc(t("practiceD")) + '</small></span></label><label class="mode"><input type="radio" name="cbt-mode" value="exam"><span><strong>' + esc(t("exam")) + "</strong><small>" + esc(t("examD")) + "</small></span></label></div>";
    h += '<div class="setup-row"><label class="field">' + esc(t("count")) + ' <select id="cbt-count">';
    [10, 25, 50].forEach(function (n) { if (n < pool.length) h += '<option value="' + n + '"' + (n === 25 ? " selected" : "") + ">" + n + "</option>"; });
    h += '<option value="0"' + (pool.length <= 25 ? " selected" : "") + ">" + esc(t("all")) + " (" + pool.length + ')</option></select></label><label class="check"><input type="checkbox" id="cbt-shuffle" checked> ' + esc(t("shuffle")) + "</label></div>";
    h += '<button type="button" class="btn btn-primary" id="cbt-start">▶ ' + esc(t("start")) + "</button></div>";
    return h;
  }
  function begin(qs, mode) {
    st = { qs: qs, mode: mode, i: 0, ans: qs.map(function () { return null; }), mk: qs.map(function () { return false; }), rev: qs.map(function () { return false; }), secs: Math.max(300, Math.round(qs.length * 96)), done: false };
    view = "quiz"; clearInterval(timer);
    if (mode === "exam") timer = setInterval(function () { st.secs--; var el = document.getElementById("cbt-time"); if (el) el.textContent = fmt(st.secs); if (st.secs <= 0) finish(); }, 1000);
    render(); root.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function fmt(s) { s = Math.max(0, s); var m = Math.floor(s / 60), x = s % 60; return (m < 10 ? "0" : "") + m + ":" + (x < 10 ? "0" : "") + x; }
  function quizHTML() {
    var q = st.qs[st.i], n = st.qs.length, answered = st.ans[st.i] !== null, show = st.mode === "practice" && st.rev[st.i];
    var h = '<div class="cbt-top"><strong>' + esc(title()) + "</strong>";
    if (st.mode === "exam") h += '<span class="cbt-timer" aria-live="off">⏱ ' + esc(t("timeLeft")) + ': <b id="cbt-time">' + fmt(st.secs) + "</b></span>";
    h += '</div><div class="cbt-body"><div class="cbt-main"><div class="quiz-meta"><span>' + esc(t("q")) + " " + (st.i + 1) + " " + esc(t("of")) + " " + n + "</span><span class=\"subj-tag\">" + esc(t(q.s)) + "</span></div>";
    h += '<div class="quiz-progress"><div class="quiz-progress-bar" style="width:' + Math.round((st.i + 1) / n * 100) + '%"></div></div>';
    h += '<h2 class="quiz-question" id="cbt-q">' + esc(qText(q)) + '</h2><div class="quiz-options" role="radiogroup" aria-labelledby="cbt-q">';
    for (var k = 0; k < q.o.length; k++) {
      var c = "quiz-option"; if (st.ans[st.i] === k) c += " selected";
      if (show) { if (k === q.a) c += " correct"; else if (st.ans[st.i] === k) c += " wrong"; }
      h += '<button type="button" role="radio" aria-checked="' + (st.ans[st.i] === k) + '" class="' + c + '" data-o="' + k + '"' + (show ? " disabled" : "") + '><span class="opt-letter">' + String.fromCharCode(65 + k) + "</span><span>" + esc(oText(q, k)) + "</span></button>";
    }
    h += "</div>";
    if (show && eText(q)) h += '<div class="quiz-explain show"><strong>' + esc(t("exp")) + ":</strong> " + esc(eText(q)) + "</div>";
    h += '<div class="quiz-actions"><button type="button" class="btn btn-secondary btn-sm" data-act="prev"' + (st.i === 0 ? " disabled" : "") + ">" + esc(t("prev")) + "</button>";
    if (st.mode === "exam") h += '<button type="button" class="btn btn-ghost btn-sm" data-act="mark">🔖 ' + esc(t("mark")) + '</button><button type="button" class="btn btn-ghost btn-sm" data-act="clear"' + (answered ? "" : " disabled") + ">" + esc(t("clear")) + "</button>";
    h += st.i < n - 1 ? '<button type="button" class="btn btn-primary btn-sm" data-act="next">' + esc(t("next")) + "</button>" : '<button type="button" class="btn btn-amber btn-sm" data-act="submit">' + esc(st.mode === "exam" ? t("submit") : t("finish")) + "</button>";
    h += "</div></div><aside class=\"cbt-palette\"><div class=\"pal-grid\">";
    for (var j = 0; j < n; j++) {
      var pc = "pal"; if (j === st.i) pc += " cur"; if (st.ans[j] !== null) pc += " ans"; if (st.mk[j]) pc += " mk";
      if (st.mode === "practice" && st.rev[j]) pc += st.ans[j] === st.qs[j].a ? " ok" : " bad";
      h += '<button type="button" class="' + pc + '" data-go="' + j + '" aria-label="' + esc(t("q")) + " " + (j + 1) + '">' + (j + 1) + "</button>";
    }
    h += '</div><p class="pal-legend"><i class="lg ans"></i>' + esc(t("legendA")) + ' <i class="lg mk"></i>' + esc(t("legendM")) + ' <i class="lg"></i>' + esc(t("legendN")) + '</p><button type="button" class="btn btn-amber btn-sm pal-submit" data-act="submit">' + esc(st.mode === "exam" ? t("submit") : t("finish")) + "</button></aside></div>";
    return h;
  }
  function finish() {
    clearInterval(timer); st.done = true; view = "result";
    var c = 0, w = 0, s = 0, by = {};
    st.qs.forEach(function (q, i) { var b = by[q.s] || (by[q.s] = { n: 0, c: 0 }); b.n++; if (st.ans[i] === null) s++; else if (st.ans[i] === q.a) { c++; b.c++; } else w++; });
    st.res = { c: c, w: w, s: s, by: by, pct: Math.round(c / st.qs.length * 100) };
    saveP(key, root.getAttribute("data-title-en"), st.res.pct, st.qs.length);
    render(); root.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function resultHTML() {
    var r = st.res, n = st.qs.length;
    var h = '<div class="quiz-result card"><h2>' + esc(t("result")) + '</h2><div class="score-circle" style="--p:' + r.pct + '"><span>' + r.pct + "%</span></div>";
    h += '<p class="res-line"><b>' + esc(t("marks")) + ": " + (r.c * 2) + " / " + (n * 2) + "</b></p>";
    h += '<div class="res-stats"><span class="ok">✔ ' + esc(t("correct")) + ": " + r.c + '</span><span class="bad">✘ ' + esc(t("wrong")) + ": " + r.w + "</span><span>○ " + esc(t("skipped")) + ": " + r.s + "</span></div>";
    h += "<p>" + esc(r.pct >= 75 ? t("great") : r.pct >= 45 ? t("good") : t("low")) + "</p>";
    var subs = Object.keys(r.by);
    if (subs.length > 1) { h += '<div class="table-wrap"><table><tr><th>' + esc(t("subj")) + "</th><th>" + esc(t("correct")) + "</th><th>" + esc(t("marks")) + "</th></tr>"; subs.forEach(function (k) { var b = r.by[k]; h += "<tr><td>" + esc(t(k)) + "</td><td>" + b.c + " / " + b.n + "</td><td>" + b.c * 2 + " / " + b.n * 2 + "</td></tr>"; }); h += "</table></div>"; }
    h += '<div class="quiz-actions center"><button type="button" class="btn btn-primary btn-sm" data-act="review">' + esc(t("review")) + '</button><button type="button" class="btn btn-secondary btn-sm" data-act="reviewWrong">' + esc(t("reviewWrong")) + '</button><button type="button" class="btn btn-ghost btn-sm" data-act="retry">↻ ' + esc(t("retry")) + '</button><button type="button" class="btn btn-ghost btn-sm" data-act="new">' + esc(t("newTest")) + "</button></div></div>";
    if (view === "review") {
      h += '<div class="quiz-review">';
      st.qs.forEach(function (q, i) {
        var ua = st.ans[i], ok = ua === q.a; if (reviewWrongOnly && ok) return;
        h += '<div class="quiz-review-item ' + (ok ? "ok-item" : "wrong-item") + '"><p><strong>Q' + (i + 1) + ".</strong> " + esc(qText(q)) + ' <span class="subj-tag">' + esc(t(q.s)) + "</span></p>";
        h += "<p>" + esc(t("your")) + ": <b>" + (ua === null ? esc(t("none")) : String.fromCharCode(65 + ua) + ". " + esc(oText(q, ua))) + "</b></p>";
        if (!ok) h += "<p>" + esc(t("right")) + ": <b>" + String.fromCharCode(65 + q.a) + ". " + esc(oText(q, q.a)) + "</b></p>";
        if (eText(q)) h += '<p class="note">' + esc(t("exp")) + ": " + esc(eText(q)) + "</p>";
        h += "</div>";
      });
      h += "</div>";
    }
    return h;
  }
  function render() {
    if (view === "setup") root.innerHTML = setupHTML();
    else if (view === "quiz") root.innerHTML = quizHTML();
    else root.innerHTML = resultHTML();
  }
  root.addEventListener("click", function (e) {
    var b = e.target.closest("button, [data-go]"); if (!b || b.disabled) return;
    if (b.id === "cbt-start") {
      var mode = (root.querySelector('input[name="cbt-mode"]:checked') || {}).value || "practice";
      var cnt = parseInt(document.getElementById("cbt-count").value, 10) || 0;
      var qs = document.getElementById("cbt-shuffle").checked ? shuffle(pool) : pool.slice();
      if (cnt) qs = qs.slice(0, cnt);
      begin(qs, mode); return;
    }
    if (b.id === "cbt-build") { buildFull(); return; }
    if (b.hasAttribute("data-o")) {
      st.ans[st.i] = parseInt(b.getAttribute("data-o"), 10);
      if (st.mode === "practice") st.rev[st.i] = true;
      render(); return;
    }
    if (b.hasAttribute("data-go")) { st.i = parseInt(b.getAttribute("data-go"), 10); render(); return; }
    var a = b.getAttribute("data-act");
    if (a === "prev" && st.i > 0) { st.i--; render(); }
    else if (a === "next") { st.i++; render(); }
    else if (a === "mark") { st.mk[st.i] = !st.mk[st.i]; if (st.i < st.qs.length - 1) st.i++; render(); }
    else if (a === "clear") { st.ans[st.i] = null; render(); }
    else if (a === "submit") {
      var un = st.ans.filter(function (x) { return x === null; }).length;
      if (st.mode === "exam" && !window.confirm(t("confirm") + (un ? " (" + un + " " + t("unans") + ")" : ""))) return;
      finish();
    }
    else if (a === "review" || a === "reviewWrong") { reviewWrongOnly = a === "reviewWrong"; view = "review"; render(); }
    else if (a === "retry") { begin(st.qs, st.mode); }
    else if (a === "new") { if (root.getAttribute("data-full")) { location.reload(); } else { view = "setup"; render(); } }
  });
  document.addEventListener("keydown", function (e) {
    if (view !== "quiz" || /INPUT|SELECT|TEXTAREA/.test((e.target || {}).tagName || "")) return;
    var k = e.key.toUpperCase();
    if ("ABCD".indexOf(k) > -1 && k.length === 1) { var btn = root.querySelector('[data-o="' + "ABCD".indexOf(k) + '"]'); if (btn && !btn.disabled) btn.click(); }
    else if (e.key === "ArrowRight" && st.i < st.qs.length - 1) { st.i++; render(); }
    else if (e.key === "ArrowLeft" && st.i > 0) { st.i--; render(); }
  });
  window.addEventListener("itie:langchange", function () { if (view === "setup" && root.getAttribute("data-full") && !pool.length) return; render(); });

  function buildFull() {
    var sel = document.getElementById("cbt-trade"), trade = sel.value, eng = sel.options[sel.selectedIndex].getAttribute("data-type") === "eng";
    var R = root.getAttribute("data-root") || "";
    var plan = eng ? [[trade, 38], ["workshop-calculation-science", 6], ["engineering-drawing", 6], ["employability-skills", 25]] : [[trade, 50], ["employability-skills", 25]];
    var tname = sel.options[sel.selectedIndex].textContent;
    root.innerHTML = '<p class="card">' + esc(t("loading")) + "</p>";
    Promise.all(plan.map(function (p) { return fetch(R + "assets/q/" + p[0] + ".json").then(function (r) { if (!r.ok) throw 0; return r.json(); }); }))
      .then(function (banks) {
        var qs = [];
        banks.forEach(function (b, i) { qs = qs.concat(shuffle(norm(b)).slice(0, plan[i][1])); });
        key = "full-" + trade;
        root.setAttribute("data-title-en", "Full CBT mock — " + tname.split(" / ")[0]);
        root.setAttribute("data-title-hi", "फुल CBT मॉक — " + (tname.split(" / ")[1] || tname));
        pool = qs; begin(qs, "exam");
      })
      .catch(function () { root.innerHTML = '<p class="card">' + esc(t("fail")) + "</p>"; });
  }
  if (root.getAttribute("data-full")) {
    var m = /[?&]trade=([a-z-]+)/.exec(location.search), sel = document.getElementById("cbt-trade");
    if (m && sel) sel.value = m[1];
  } else {
    try { pool = norm(JSON.parse(document.getElementById("qbank").textContent)); } catch (e) { pool = []; }
    render();
  }
})();

/* ITI Exam Prep — interactive MCQ quiz engine (i18n-aware labels) */
(function () {
  "use strict";

  function letter(i) {
    return String.fromCharCode(65 + i);
  }

  function tr(key, fallback) {
    if (window.ITI_I18N && typeof window.ITI_I18N.t === "function") {
      var v = window.ITI_I18N.t(key);
      if (v && v !== key) return v;
    }
    return fallback;
  }

  function Quiz(root, questions) {
    this.root = root;
    this.questions = questions;
    this.index = 0;
    this.answers = new Array(questions.length).fill(null);
    this.revealed = false;
    var self = this;
    this._onLang = function () { if (!self._resultMode) self.render(); };
    window.addEventListener("itie:langchange", this._onLang);
    this.render();
  }

  Quiz.prototype.render = function () {
    this._resultMode = false;
    var q = this.questions[this.index];
    var pct = ((this.index) / this.questions.length) * 100;
    var qLabel = tr("quiz.questionOf", "Question {n} of {total}")
      .replace("{n}", String(this.index + 1))
      .replace("{total}", String(this.questions.length));
    var html = "";
    html += '<div class="quiz-progress" role="progressbar" aria-valuenow="' + Math.round(pct) + '" aria-valuemin="0" aria-valuemax="100"><div class="quiz-progress-bar" style="width:' + pct + '%"></div></div>';
    html += '<div class="quiz-meta"><span>' + qLabel + '</span><span>' + escapeHtml(q.topic || "MCQ") + "</span></div>";
    html += '<h2 class="quiz-question" id="quiz-q">' + escapeHtml(q.q) + "</h2>";
    html += '<div class="quiz-options" role="group" aria-labelledby="quiz-q">';
    for (var i = 0; i < q.options.length; i++) {
      var cls = "quiz-option";
      if (this.answers[this.index] === i) cls += " selected";
      if (this.revealed) {
        if (i === q.answer) cls += " correct";
        else if (this.answers[this.index] === i && i !== q.answer) cls += " wrong";
      }
      html += '<button type="button" class="' + cls + '" data-i="' + i + '" ' + (this.revealed ? "disabled" : "") + '>';
      html += '<span class="opt-letter">' + letter(i) + "</span><span>" + escapeHtml(q.options[i]) + "</span></button>";
    }
    html += "</div>";
    if (this.revealed && q.explain) {
      html += '<div class="quiz-explain show"><strong>' + escapeHtml(tr("quiz.explain", "Explanation:")) + '</strong> ' + escapeHtml(q.explain) + "</div>";
    } else {
      html += '<div class="quiz-explain" id="quiz-explain"></div>';
    }
    html += '<div class="quiz-actions">';
    html += '<button type="button" class="btn btn-secondary btn-sm" id="quiz-prev"' + (this.index === 0 ? " disabled" : "") + ">" + escapeHtml(tr("quiz.prev", "← Previous")) + "</button>";
    html += '<div style="display:flex;gap:.5rem;flex-wrap:wrap">';
    if (!this.revealed) {
      html += '<button type="button" class="btn btn-amber btn-sm" id="quiz-check">' + escapeHtml(tr("quiz.check", "Check Answer")) + "</button>";
    }
    if (this.index < this.questions.length - 1) {
      html += '<button type="button" class="btn btn-primary btn-sm" id="quiz-next">' + escapeHtml(tr("quiz.next", "Next →")) + "</button>";
    } else {
      html += '<button type="button" class="btn btn-primary btn-sm" id="quiz-finish">' + escapeHtml(tr("quiz.finish", "See Score")) + "</button>";
    }
    html += "</div></div>";
    this.root.innerHTML = html;
    this.bind();
  };

  Quiz.prototype.bind = function () {
    var self = this;
    this.root.querySelectorAll(".quiz-option").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (self.revealed) return;
        self.answers[self.index] = parseInt(btn.getAttribute("data-i"), 10);
        self.revealed = false;
        self.render();
      });
    });
    var prev = this.root.querySelector("#quiz-prev");
    if (prev) prev.addEventListener("click", function () {
      self.index--;
      self.revealed = self.answers[self.index] !== null;
      self.render();
    });
    var next = this.root.querySelector("#quiz-next");
    if (next) next.addEventListener("click", function () {
      if (self.answers[self.index] === null) {
        alert(tr("quiz.selectFirst", "Please select an answer before continuing."));
        return;
      }
      self.index++;
      self.revealed = false;
      self.render();
    });
    var check = this.root.querySelector("#quiz-check");
    if (check) check.addEventListener("click", function () {
      if (self.answers[self.index] === null) {
        alert(tr("quiz.selectOpt", "Select an option first."));
        return;
      }
      self.revealed = true;
      self.render();
    });
    var finish = this.root.querySelector("#quiz-finish");
    if (finish) finish.addEventListener("click", function () {
      if (self.answers[self.index] === null) {
        alert(tr("quiz.selectFinish", "Please select an answer before finishing."));
        return;
      }
      self.showResult();
    });

    this.root.setAttribute("tabindex", "0");
    this.root.onkeydown = function (e) {
      if (self.revealed && (e.key === "Enter" || e.key === "ArrowRight")) {
        var n = self.root.querySelector("#quiz-next") || self.root.querySelector("#quiz-finish");
        if (n) n.click();
        return;
      }
      var num = parseInt(e.key, 10);
      if (num >= 1 && num <= 4 && !self.revealed) {
        var opts = self.root.querySelectorAll(".quiz-option");
        if (opts[num - 1]) opts[num - 1].click();
      }
    };
  };

  Quiz.prototype.showResult = function () {
    this._resultMode = true;
    var score = 0;
    var review = "";
    for (var i = 0; i < this.questions.length; i++) {
      var q = this.questions[i];
      var ok = this.answers[i] === q.answer;
      if (ok) score++;
      review += '<div class="quiz-review-item ' + (ok ? "ok-item" : "wrong-item") + '">';
      review += "<strong>Q" + (i + 1) + ".</strong> " + escapeHtml(q.q) + "<br>";
      review += '<span style="font-size:.9rem">' + escapeHtml(tr("quiz.yourAnswer", "Your answer:")) + ' <strong>' +
        (this.answers[i] !== null ? letter(this.answers[i]) + ". " + escapeHtml(q.options[this.answers[i]]) : "—") +
        "</strong></span><br>";
      if (!ok) {
        review += '<span style="font-size:.9rem;color:#065f46">' + escapeHtml(tr("quiz.correct", "Correct:")) + ' <strong>' +
          letter(q.answer) + ". " + escapeHtml(q.options[q.answer]) + "</strong></span><br>";
      }
      if (q.explain) review += '<span style="font-size:.85rem;color:#475569">' + escapeHtml(q.explain) + "</span>";
      review += "</div>";
    }
    var pct = Math.round((score / this.questions.length) * 100);
    var msg = pct >= 70 ? tr("quiz.msgHigh", "Great job! Keep practising.")
      : pct >= 40 ? tr("quiz.msgMid", "Good start — revise the weak topics.")
      : tr("quiz.msgLow", "Keep going — review explanations and try again.");
    var scoreTitle = tr("quiz.yourScore", "Your Score: {pct}%").replace("{pct}", String(pct));
    var html = '<div class="quiz-result">';
    html += '<div class="score-circle" aria-label="Score ' + score + " out of " + this.questions.length + '">' + score + "/" + this.questions.length + "</div>";
    html += "<h2>" + escapeHtml(scoreTitle) + "</h2>";
    html += "<p>" + escapeHtml(msg) + "</p>";
    html += '<p style="font-size:.9rem;color:#64748b">' + escapeHtml(tr("quiz.passHint", "Pass target for AITT CBT is about 33%. Aim higher for confidence.")) + "</p>";
    html += '<button type="button" class="btn btn-primary" id="quiz-retry">' + escapeHtml(tr("quiz.retry", "Retry Quiz")) + "</button>";
    html += '<div class="quiz-review"><h3>' + escapeHtml(tr("quiz.review", "Review")) + '</h3>' + review + "</div></div>";
    this.root.innerHTML = html;
    var self = this;
    this.root.querySelector("#quiz-retry").addEventListener("click", function () {
      self.index = 0;
      self.answers = new Array(self.questions.length).fill(null);
      self.revealed = false;
      self.render();
    });
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.initQuiz = function (selector, questions) {
    var el = document.querySelector(selector);
    if (!el || !questions || !questions.length) return;
    return new Quiz(el, questions);
  };
})();

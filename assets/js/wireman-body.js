/* Wireman blog body — builds sections; i18n fills strings */
(function () {
  "use strict";
  var el = document.getElementById("wireman-body");
  if (!el) return;
  function h2(k, t) { return "<h2 data-i18n=\"" + k + "\">" + t + "</h2>"; }
  function p(k, t) { return "<p data-i18n=\"" + k + "\">" + t + "</p>"; }
  function li(k, t) { return "<li data-i18n=\"" + k + "\">" + t + "</li>"; }
  var html = "";
  html += h2("blog.wireman.h2.wire", "1. Wiring methods flash cards (memorise these)");
  html += "<ul>" +
    li("blog.wireman.wire1", "<strong>Casing-capping wiring:</strong> surface channel + capping for insulated conductors.") +
    li("blog.wireman.wire2", "<strong>Conduit wiring:</strong> conductors drawn through metal or PVC conduit.") +
    li("blog.wireman.wire3", "<strong>Cleat wiring:</strong> open wiring on porcelain/plastic cleats.") +
    li("blog.wireman.wire4", "<strong>Batten wiring:</strong> cables fixed on wooden battens with clips.") +
    li("blog.wireman.wire5", "<strong>Concealed wiring:</strong> buried in walls/floors under plaster.") +
    li("blog.wireman.wire6", "<strong>Method selection:</strong> match method to location, load, appearance, protection.") +
    "</ul>";
  html += p("blog.wireman.wireTip", "Exam tip: casing-capping is a surface method with insulated conductors in a channel.");
  html += h2("blog.wireman.h2.traps", "2. Common CBT traps (cables, joints, earthing link vs method)");
  html += p("blog.wireman.trapsP", "Learn the job of each idea — papers love swapping cable types, joint purposes, and wiring-method names:");
  html += "<ul>" +
    li("blog.wireman.trap1", "<strong>Cable type vs job:</strong> match insulation and size to circuit as taught.") +
    li("blog.wireman.trap2", "<strong>Cable size habit:</strong> cross-section relates to current-carrying capacity.") +
    li("blog.wireman.trap3", "<strong>Joints & termination:</strong> reliable continuity and insulation restoration.") +
    li("blog.wireman.trap4", "<strong>Termination habit:</strong> secure lugs/screws; no loose strands.") +
    li("blog.wireman.trap5", "<strong>Earthing link vs wiring method:</strong> method ≠ earthing; keep both as taught.") +
    li("blog.wireman.trap6", "<strong>MCB vs fuse:</strong> MCB resettable; fuse link melts and is replaced.") +
    "</ul>";
  html += p("blog.wireman.trapTip", "Trap: cleat wiring ≠ concealed conduit wiring.");
  html += h2("blog.wireman.h2.cond", "3. Conduit & accessories favourites");
  html += "<ul>" +
    li("blog.wireman.cond1", "<strong>PVC conduit:</strong> light, corrosion-resistant for many domestic/industrial runs.") +
    li("blog.wireman.cond2", "<strong>GI / metal conduit:</strong> steel for mechanical protection; bushes/glands as taught.") +
    li("blog.wireman.cond3", "<strong>Couplings, bends, elbows, tees:</strong> continuous protected path.") +
    li("blog.wireman.cond4", "<strong>Junction / inspection boxes:</strong> drawing, jointing, future inspection.") +
    li("blog.wireman.cond5", "<strong>Saddles & spacers:</strong> fix conduit at proper intervals.") +
    li("blog.wireman.cond6", "<strong>Bushes & glands:</strong> protect insulation at conduit ends.") +
    li("blog.wireman.cond7", "<strong>Draw wire habit:</strong> pull conductors without tearing insulation.") +
    "</ul>";
  html += p("blog.wireman.condTip", "Exam tip: adhesive ≠ protective earthing.");
  html += h2("blog.wireman.h2.tools", "4. Tools & measuring habits");
  html += "<ul>" +
    li("blog.wireman.tool1", "<strong>Line tester:</strong> live indication — not a full megger substitute.") +
    li("blog.wireman.tool2", "<strong>Megger idea:</strong> insulation resistance between conductors / earth.") +
    li("blog.wireman.tool3", "<strong>Continuity:</strong> confirm path before energising.") +
    li("blog.wireman.tool4", "<strong>Multimeter:</strong> correct range and category as taught.") +
    li("blog.wireman.tool5", "<strong>Hand tools:</strong> insulated tools where required.") +
    li("blog.wireman.tool6", "<strong>Prove-dead:</strong> isolate, test the tester, prove dead, then work.") +
    "</ul>";
  html += p("blog.wireman.toolTip", "Exam tip: never energise first to “test” joints.");
  html += h2("blog.wireman.h2.safety", "5. Electrical safety checklist (high-yield)");
  html += "<ul class=\"checklist\">" +
    li("blog.wireman.safe1", "Isolation first: switch off and prove circuits dead before work") +
    li("blog.wireman.safe2", "PPE & insulated tools; no wet hands on live parts") +
    li("blog.wireman.safe3", "Cable & conduit handling: bushes at metal ends; support with saddles") +
    li("blog.wireman.safe4", "Joints & terminations: restore insulation; correct polarity") +
    li("blog.wireman.safe5", "Earthing & protection awareness alongside wiring method") +
    li("blog.wireman.safe6", "Housekeeping & ladders: dry workplace; stable ladder") +
    "</ul>";
  html += h2("blog.wireman.h2.ex", "6. Three exemplar MCQs (original)");
  html += "<div class=\"practice-box\"><p class=\"note\" data-i18n=\"common.practiceNote\">Practice / exemplar questions — not from any leaked paper. Written for learning only.</p>";
  html += "<div class=\"practice-q\"><strong>Q1.</strong> <span data-i18n=\"blog.wireman.q1\">Which statement best describes the main purpose of casing-capping wiring?</span><br>";
  html += "A. <span data-i18n=\"blog.wireman.q1a\">It is only used to bury bare uninsulated conductors deep in wet concrete forever</span><br>";
  html += "B. <span data-i18n=\"blog.wireman.q1b\">It is a surface wiring method where insulated conductors run in a casing channel closed by a capping cover</span><br>";
  html += "C. <span data-i18n=\"blog.wireman.q1c\">It permanently replaces the need for any cable insulation or earthing on every circuit</span><br>";
  html += "D. <span data-i18n=\"blog.wireman.q1d\">It is identical to heavy underground armoured cable tray systems in every factory</span>";
  html += "<div class=\"ans\" data-i18n=\"blog.wireman.q1ans\">Answer: B — Casing-capping = surface channel + capping for insulated conductors.</div></div>";
  html += "<div class=\"practice-q\"><strong>Q2.</strong> <span data-i18n=\"blog.wireman.q2\">A trainee says conduit wiring method and protective earthing are the same thing, so earthing is never needed if PVC conduit is used. Which correction is best?</span><br>";
  html += "A. <span data-i18n=\"blog.wireman.q2a\">Yes — any conduit automatically cancels all earthing and overcurrent protection forever</span><br>";
  html += "B. <span data-i18n=\"blog.wireman.q2b\">Wiring method describes how conductors are routed and protected mechanically; earthing is a separate protective connection — do not treat conduit choice as a full substitute for earthing as taught</span><br>";
  html += "C. <span data-i18n=\"blog.wireman.q2c\">Earthing is only decorative paint on the DB door and has no electrical purpose</span><br>";
  html += "D. <span data-i18n=\"blog.wireman.q2d\">PVC conduit is only used for plumbing water pipes, never for electrical conductors</span>";
  html += "<div class=\"ans\" data-i18n=\"blog.wireman.q2ans\">Answer: B — Method ≠ earthing; protect routes and keep earthing/protection ideas as taught.</div></div>";
  html += "<div class=\"practice-q\"><strong>Q3.</strong> <span data-i18n=\"blog.wireman.q3\">Which pair correctly matches a Wireman electrical safety / testing habit?</span><br>";
  html += "A. <span data-i18n=\"blog.wireman.q3a\">Energise first and look for sparks to “test” every new joint</span><br>";
  html += "B. <span data-i18n=\"blog.wireman.q3b\">Isolate and prove-dead — use tester/continuity/insulation ideas as taught, restore insulation on joints, bush metal conduit ends, and keep earthing/overcurrent awareness with the chosen wiring method</span><br>";
  html += "C. <span data-i18n=\"blog.wireman.q3c\">Remove all insulation from joints so heat can “escape faster”</span><br>";
  html += "D. <span data-i18n=\"blog.wireman.q3d\">Work with wet hands on live terminals because “water improves continuity”</span>";
  html += "<div class=\"ans\" data-i18n=\"blog.wireman.q3ans\">Answer: B — Isolate/prove-dead, proper joints, bushes, earthing/protection awareness.</div></div></div>";
  html += h2("blog.wireman.h2.week", "7. One-week Wireman theory sprint");
  html += "<ul>" +
    li("blog.wireman.w1", "Day 1–2: Wiring methods — casing-capping, conduit, cleat, batten, concealed") +
    li("blog.wireman.w2", "Day 3: Cables, sizes, joints & terminations; MCB vs fuse; earthing vs method") +
    li("blog.wireman.w3", "Day 4: Conduit & accessories — PVC/GI, couplings, boxes, saddles, bushes") +
    li("blog.wireman.w4", "Day 5: Tools & measuring — tester, megger, continuity, prove-dead") +
    li("blog.wireman.w5", "Day 6: Electrical safety checklist + Employability Skills") +
    li("blog.wireman.w6", "Day 7: Timed Wireman mini-mock + error-notebook repair only") +
    "</ul>";
  html += h2("blog.wireman.h2.next", "Next steps on this site");
  html += "<ul>" +
    "<li><a href=\"../trades.html\" data-i18n=\"blog.wireman.linkTrade\">All Trades</a> — browse trade hubs & exemplar practice</li>" +
    "<li><a href=\"../employability-skills.html\" data-i18n=\"common.es\">Employability Skills</a></li>" +
    "<li><a href=\"../exam-pattern.html\" data-i18n=\"common.examPattern\">Exam pattern</a></li>" +
    "<li><a href=\"../resources.html\" data-i18n=\"footer.resourcesPage\">Official Resources</a></li>" +
    "<li><a href=\"../mock-tests.html\" data-i18n=\"common.allMocks\">All mocks</a></li>" +
    "<li><a href=\"https://bharatskills.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\">Bharat Skills</a> · <a href=\"https://dgt.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\">DGT</a> · <a href=\"https://www.ncvtmis.gov.in\" target=\"_blank\" rel=\"noopener noreferrer\">NCVT MIS</a></li>" +
    "</ul>";
  el.innerHTML = html;
  if (window.ITI_I18N && typeof window.ITI_I18N.apply === "function" && typeof window.ITI_I18N.getLang === "function") {
    window.ITI_I18N.apply(window.ITI_I18N.getLang());
  }
})();

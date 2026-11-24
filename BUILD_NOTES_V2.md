## v2 architecture (Jekyll, Sep 2026)
- GitHub Pages builds this repo with Jekyll (no .nojekyll). Old static HTML without front matter (incl. pages/blog/*) is copied unchanged, so the blog routine keeps working (it edits sitemap.xml + pages/blog/index.html only).
- Content lives in `_data/`: `trades/<id>.json` (15 hubs), `q/<id>.json` (18 question banks: `[q_en,q_hi,[opts_en],[opts_hi],ansIdx,exp_en,exp_hi]`), `notes/{es,wcs,ed}.json` (chapters), `guides/<id>.json`, `ui.json` (bilingual UI strings), `home.json`.
- Pages are tiny stubs with front matter (`trade:`, `bank:`, `subj:`+`ch:`, `guide:`) rendered by `_layouts/{trade,quiz,notes,guide}.html` via `_layouts/base.html`. `assets/q/<id>.json` and `assets/data/search.json` are generated from `_data`.
- To add a trade: add `_data/trades/<id>.json` + `_data/q/<id>.json`, then stubs `pages/trades/<id>.html`, `pages/practice/<id>.html`, `assets/q/<id>.json` (copy an existing one, change the id). Nav, grids, search and sitemap-v2.xml update automatically.
- Bilingual: `<span class="l-en">/<span class="l-hi">` toggled by CSS on `html[data-lang]`; `assets/js/v2.js` handles the EN | हिन्दी switch (localStorage `itie_lang`). Quiz engine: `assets/js/cbt.js` (options shuffled per attempt; progress in localStorage `itie_progress`).
- Local build: `jekyll build -d /tmp/site` (Jekyll 3.x, as on GitHub Pages).
- IMPORTANT for Hostinger/itiexamprep.com later: upload the BUILT output (`_site` / /tmp/site), not the raw repo source.

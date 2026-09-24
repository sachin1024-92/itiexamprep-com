# ITI Exam Prep — Build Notes

**Site:** https://itiexamprep.com  
**Brand:** ITI Exam Prep (Success Tips / Sachin Majhee, Jabalpur, MP)  
**Stack:** Static HTML + CSS + JS (no build step)  
**Updated:** 24 Sep 2026

## What was built

Production-ready static website for NCVT/SCVT CTS AITT CBT exam prep:

- Homepage with hero, trust strip, feature cards, trade grid, CTA, FAQ + JSON-LD
- 7 trade hubs with original topic outlines + 8 exemplar practice MCQs each
- Interactive mock quizzes: Electrician (12 Q) + COPA (12 Q) with scoring & review (bilingual UI labels)
- Exam pattern, syllabus map, Employability Skills (expanded with WCS tips), study tips
- **Resources** page (official links + original checklists)
- **SEO / Search Console** owner guide
- 3 SEO blog articles (including original 30-day study plan / common mistakes)
- About, Contact, Privacy, custom 404
- **EN | हिन्दी language toggle** (top-left, `localStorage` key `itie_lang`)
- **GA4 hook** via `assets/js/config.js` + `analytics.js` (loads only when Measurement ID set)
- `robots.txt`, `sitemap.xml`, `favicon.svg`, hreflang + `og:locale:alternate`
- Shared design system: indigo/violet + amber, Plus Jakarta Sans + Fraunces

## Language toggle

- Control sits **top-left** in the header on every page (`EN | हिन्दी`).
- Preference: `localStorage.itie_lang` = `en` | `hi` (default English).
- Implementation: `assets/js/i18n.js` + `data-i18n` / `data-i18n-html` attributes.
- `document.documentElement.lang` switches between `en-IN` and `hi`.
- Quiz question stems stay English in v1; **Score / Review / Check** buttons translate.
- Trade names and acronyms (ITI, NCVT, CBT, COPA, …) kept as students expect.

## Google Analytics 4 setup

1. Create a GA4 property at https://analytics.google.com and copy the Measurement ID (`G-XXXXXXXXXX`).
2. Edit `assets/js/config.js`:

```js
window.ITI_SITE_CONFIG = {
  gaMeasurementId: "G-XXXXXXXXXX"  // was ""
};
```

3. Alternatively set `window.ITI_GA_ID = "G-XXXXXXXXXX"` before `analytics.js` runs.
4. If the ID is empty, **gtag is not loaded** (no console errors).
5. Upload/redeploy `config.js` (and ensure `analytics.js` is present).

HTML comments in each page `<head>` also document this.

## Google Search Console

1. Confirm https://itiexamprep.com/robots.txt allows crawl and lists the sitemap.
2. Verify domain/URL-prefix ownership in Search Console.
3. Submit `https://itiexamprep.com/sitemap.xml`.
4. Full owner walkthrough: `/pages/seo-guide.html`.

Note: Analytics ≠ ranking. Search Console helps discovery/indexing monitoring.

Language: one URL serves EN/HI via client-side i18n; `hreflang` en-IN / hi-IN point to the same absolute URL.

## How to upload / redeploy zip to Hostinger `public_html`

1. Use the latest zip under `/workspace/itiexamprep.com_YYYYMMDD_HHMMSS.zip` (files at zip **root**, `index.html` at root).
2. Log in to Hostinger hPanel → **Files** → **File Manager** (or FTP/SFTP).
3. Open `public_html` for `itiexamprep.com`.
4. Backup existing files, then extract/upload zip contents (do not nest an extra folder).
5. Optional: omit `BUILD_NOTES.md` from the live root.
6. Spot-check: home language toggle, a nested trade page, mock quiz, `/sitemap.xml`.
7. After setting GA ID, verify Realtime in GA4.

**Do not** upload generator scripts. This site is unofficial — not affiliated with DGT/NCVT.

## Local preview

```bash
cd /workspace/itiexamprep.com
python3 -m http.server 8080
```

Visit `http://localhost:8080/`. Toggle हिन्दी, reload, confirm persistence.

## Page inventory (highlights)

| Path | Purpose |
|------|---------|
| `index.html` | Homepage |
| `pages/resources.html` | Official links + checklists |
| `pages/seo-guide.html` | Search Console / GA owner guide |
| `pages/trades/*.html` | 7 trade hubs + practice MCQs |
| `pages/mock-tests/*.html` | Interactive quizzes |
| `pages/blog/iti-cbt-study-plan-common-mistakes.html` | New study-plan article |
| `assets/js/config.js` | GA Measurement ID |
| `assets/js/i18n.js` | Translations dictionary |
| `assets/js/analytics.js` | Conditional gtag loader |

## Notes

- Official NIMI PDFs are **not** hosted; link out to Bharat Skills / DGT / NCVT MIS.
- Practice MCQs marked as practice / exemplar — not from leaked papers.
- Footer disclaimer on every page.
- Contact: sachin1024@gmail.com

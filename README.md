# ITI Exam Prep

Source for [itiexamprep.com](https://itiexamprep.com): free, bilingual (English and Hindi) preparation for the NCVT CTS computer-based test.

## What is on the site

- 15 trade hubs with topic outlines
- 418 practice questions across 18 question banks, each with an explanation in both languages
- Timed mock tests that follow the real paper's subject mix, with no negative marking
- Short notes for Employability Skills, Workshop Calculation & Science, and Engineering Drawing
- Guides (admission, admit card, results, apprenticeship, jobs after ITI) and trade-wise blog articles

## How it is built

The site is built by Jekyll on GitHub Pages. Content lives in `_data/` as JSON, and small page stubs render it through the layouts in `_layouts/`. See [BUILD_NOTES_V2.md](BUILD_NOTES_V2.md) for the structure and for how to add a trade.

```bash
jekyll build -d /tmp/site      # Jekyll 3.x, as used by GitHub Pages
```

## Check content before publishing

```bash
python3 scripts/validate.py
```

This checks every question bank (field count, answer index, option counts, duplicates), that each trade and bank has its page stubs, that every sitemap URL exists and every blog post is listed, and that relative links in hand-written pages resolve. It also runs automatically on every push and pull request.

## Question format

Each entry in `_data/q/<id>.json` is:

```
[question_en, question_hi, [options_en], [options_hi], answer_index, explanation_en, explanation_hi]
```

`options_hi` may be an empty list when the options are numbers or units; the English options are then shown in both languages. Options are shuffled on each attempt, so the stored answer position does not matter.

## Content

All questions and notes are original. This is an independent site and is not affiliated with NCVT, DGT or any government body.

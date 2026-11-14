#!/usr/bin/env python3
"""Checks the site's content before it is published.

Run from the repo root:  python3 scripts/validate.py
Exits with status 1 if anything is wrong.
"""

from __future__ import annotations

import glob
import json
import os
import re
import sys
from html.parser import HTMLParser

errors: list[str] = []


def check_question_banks() -> int:
    total = 0
    for path in sorted(glob.glob("_data/q/*.json")):
        name = os.path.basename(path)
        try:
            bank = json.load(open(path, encoding="utf-8"))
        except json.JSONDecodeError as exc:
            errors.append(f"{name}: invalid JSON ({exc})")
            continue
        if bank.get("id") != name[:-5]:
            errors.append(f"{name}: id {bank.get('id')!r} does not match the file name")
        seen: dict[str, int] = {}
        for i, q in enumerate(bank.get("q", []), start=1):
            where = f"{name} question {i}"
            if len(q) != 7:
                errors.append(f"{where}: expected 7 fields, found {len(q)}")
                continue
            q_en, q_hi, opts_en, opts_hi, answer, exp_en, exp_hi = q
            if not str(q_en).strip() or not str(exp_en).strip():
                errors.append(f"{where}: empty English question or explanation")
            if not str(q_hi).strip() or not str(exp_hi).strip():
                errors.append(f"{where}: empty Hindi question or explanation")
            if len(opts_en) < 2:
                errors.append(f"{where}: fewer than 2 options")
            if len(set(opts_en)) != len(opts_en):
                errors.append(f"{where}: duplicate options")
            # Hindi options may be left empty to reuse the English ones (numbers, units).
            if opts_hi and len(opts_hi) != len(opts_en):
                errors.append(f"{where}: {len(opts_en)} English options but {len(opts_hi)} Hindi")
            if not isinstance(answer, int) or not 0 <= answer < len(opts_en):
                errors.append(f"{where}: answer index {answer!r} is out of range")
            key = str(q_en).strip().lower()
            if key in seen:
                errors.append(f"{where}: same question as number {seen[key]}")
            seen[key] = i
        total += len(bank.get("q", []))
    return total


def check_data_stubs() -> None:
    """Every trade and question bank needs its page stubs, and the reverse."""
    for path in glob.glob("_data/trades/*.json"):
        tid = os.path.basename(path)[:-5]
        if not os.path.exists(f"pages/trades/{tid}.html"):
            errors.append(f"trade {tid}: missing pages/trades/{tid}.html")
    for path in glob.glob("_data/q/*.json"):
        qid = os.path.basename(path)[:-5]
        for stub in (f"pages/practice/{qid}.html", f"assets/q/{qid}.json"):
            if not os.path.exists(stub):
                errors.append(f"question bank {qid}: missing {stub}")
    for path in glob.glob("_data/**/*.json", recursive=True):
        try:
            json.load(open(path, encoding="utf-8"))
        except json.JSONDecodeError as exc:
            errors.append(f"{path}: invalid JSON ({exc})")


def check_sitemap() -> int:
    locs = re.findall(r"<loc>https://itiexamprep\.com(/[^<]*)</loc>", open("sitemap.xml", encoding="utf-8").read())
    for loc in locs:
        target = loc.lstrip("/") or "index.html"
        if target.endswith("/"):
            target += "index.html"
        if not os.path.exists(target):
            errors.append(f"sitemap.xml: {loc} does not exist")
    listed = set(locs)
    for path in glob.glob("pages/blog/*.html"):
        if not path.endswith("index.html") and "/" + path not in listed:
            errors.append(f"sitemap.xml: blog post {path} is not listed")
    return len(locs)


class _Links(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in ("href", "src") and value:
                self.links.append(value)


def check_static_links() -> int:
    """Relative links in hand-written pages (those without Jekyll front matter)."""
    checked = 0
    for path in glob.glob("**/*.html", recursive=True):
        if path.startswith(("_", "assets/")):
            continue
        text = open(path, encoding="utf-8").read()
        if text.startswith("---"):
            continue
        parser = _Links()
        parser.feed(text)
        for link in parser.links:
            if re.match(r"^(https?:|mailto:|tel:|#|data:|javascript:|//)", link) or "{{" in link:
                continue
            target = link.split("#")[0].split("?")[0]
            if not target:
                continue
            resolved = target.lstrip("/") if target.startswith("/") else os.path.normpath(os.path.join(os.path.dirname(path), target))
            if resolved.endswith("/") or os.path.isdir(resolved):
                resolved = os.path.join(resolved, "index.html")
            checked += 1
            if not os.path.exists(resolved):
                errors.append(f"{path}: broken link {link}")
    return checked


def main() -> int:
    questions = check_question_banks()
    check_data_stubs()
    urls = check_sitemap()
    links = check_static_links()
    print(f"{questions} questions, {urls} sitemap URLs, {links} static links checked")
    for line in errors:
        print("ERROR:", line)
    print("OK" if not errors else f"{len(errors)} problem(s) found")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())

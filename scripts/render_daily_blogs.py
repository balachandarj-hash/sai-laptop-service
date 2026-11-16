#!/usr/bin/env python3
"""Write 90 daily repair articles, starting 17 November 2026."""

from __future__ import annotations

import html
import json
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SHELL = (ROOT / "blog-laptop-running-slow.html").read_text()
TOPICS = json.loads((ROOT / "scripts" / "blog-topics.json").read_text())
START = date(2026, 11, 17)


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def article_html(item: dict, when: date) -> str:
    related = (
        '<a href="services.html">services page</a>',
        '<a href="blog-laptop-running-slow.html">a slow laptop</a>',
        '<a href="blog-ssd-hard-disk.html">an SSD or a new hard disk</a>',
        '<a href="blog-laptop-not-turning-on.html">a laptop that will not turn on</a>',
    )[when.toordinal() % 4]
    image = f"images/blog-{item['slug']}.webp"
    alt = esc(item["scene"][0].upper() + item["scene"][1:])
    return f"""        <p>{esc(item['lead'])}</p>
        <p>The name of the fault is spoken at the counter, before any paid work. No charge is printed on this page. Dell, HP, Lenovo, Acer, ASUS, Apple, and MSI are opened in that room. This is a walk-in bench, not a claim to be the maker's own service centre.</p>
        <figure>
          <img src="{image}" width="1200" height="675" alt="{alt}" />
          <figcaption>{esc(item['lead'])}</figcaption>
        </figure>
        <h2>What you can notice without opening the lid</h2>
        <p>{esc(item['signs'])} Write the pattern down in ordinary words and bring the note with the laptop. A pattern is more useful than a part name you are not sure of.</p>
        <p>Do not open the case to look. Clips and ribbon cables break easily, and a broken clip becomes part of the job. If the machine is wet, hot to the point of smell, or the battery area has risen, switch it off and unplug the charger before you travel.</p>
        <h2>What to stop doing</h2>
        <p>{esc(item['avoid'])} Repeated power cycles, extra downloads, and home remedies that add dust or liquid make the next hour on the bench longer.</p>
        <p>If the files on the disk matter, say so before the bottom cover comes off. Nothing on this page promises those files. A copy is a separate decision, and a disk that will not read cannot be promised back.</p>
        <h2>What the bench checks</h2>
        <p>{esc(item['bench'])}</p>
        <p>{esc(item['detail'])}</p>
        <h2>After you agree</h2>
        <p>Work starts only after you have heard the job in ordinary words. If a second fault shows up once the machine is open, it is named before any extra paid work. You collect the same laptop you brought, and you can switch it on at the counter and look at the fault you came for.</p>
        <h2>Where to bring it</h2>
        <p>The counter is at NO 35/1, NO 26, Ganesh Complex, Above TVS Showroom Main Road, Hosur Rd, opp. to Infosys Limited, Electronic City, Bengaluru, Karnataka 560100. You walk the laptop in. Nobody is sent to collect it. The counter is open Monday to Saturday, 10:00 AM to 8:00 PM, and Sunday, 11:00 AM to 3:00 PM.</p>
        <p>Call or WhatsApp 099724 47766. Describe what the laptop is doing, and ask for the quote before any paid work. Related reading sits with {related}. The rest of the bench's work is on the <a href="services.html">services page</a>.</p>
"""


def render_page(item: dict, when: date) -> str:
    title = item["title"]
    description = item["lead"]
    if len(description) > 155:
        description = description[:152].rsplit(" ", 1)[0] + "."
    description = description + " Call 099724 47766."
    page = SHELL
    page = page.replace(
        "<title>Laptop Running Slow? Expert Repair and Performance Solutions</title>",
        f"<title>{esc(title)}</title>",
        1,
    )
    old_desc = 'content="A slow laptop can be the drive, the memory, heat, or software. SAI Laptop Service names which one it is in Electronic City before any paid work. Call 099724 47766."'
    page = page.replace(old_desc, f'content="{esc(description)}"', 1)
    page = page.replace(
        '<span aria-current="page">Laptop Running Slow? Expert Repair and Performance Solutions</span>',
        f'<span aria-current="page">{esc(title)}</span>',
        1,
    )
    page = page.replace(
        '<h1 class="blog-title">Laptop Running Slow? Expert Repair and Performance Solutions</h1>',
        f'<h1 class="blog-title">{esc(title)}</h1>',
        1,
    )
    start = page.index('<article class="prose">') + len('<article class="prose">')
    end = page.index("</article>")
    page = page[:start] + "\n" + article_html(item, when) + "      " + page[end:]
    if page.count("<title>") != 1:
        raise SystemExit(f"title replace failed for {item['slug']}")
    return page


def main() -> None:
    if len(TOPICS) != 90:
        raise SystemExit(f"expected 90 topics, got {len(TOPICS)}")
    posts = []
    for index, item in enumerate(TOPICS):
        when = START + timedelta(days=index)
        href = f"blog-{item['slug']}.html"
        (ROOT / href).write_text(render_page(item, when))
        posts.append(
            {
                "date": when.isoformat(),
                "href": href,
                "image": f"images/blog-{item['slug']}.webp",
                "alt": item["scene"][0].upper() + item["scene"][1:],
                "meta": f"{item['label']} · {when.day} {when.strftime('%B %Y')}",
                "title": item["title"],
                "excerpt": item["lead"],
                "topics": item["topics"],
                "text": f"{item['title']} {item['lead']} electronic city laptop repair".lower(),
                "scene": item["scene"],
            }
        )
    (ROOT / "public" / "scheduled-blogs.json").write_text(json.dumps(posts, indent=2) + "\n")
    (ROOT / "scripts" / "image-scenes.json").write_text(
        json.dumps([{"file": f"blog-{item['slug']}.webp", "scene": item["scene"]} for item in TOPICS], indent=2)
        + "\n"
    )
    print(f"wrote {len(posts)} articles, {posts[0]['date']} through {posts[-1]['date']}")


if __name__ == "__main__":
    main()

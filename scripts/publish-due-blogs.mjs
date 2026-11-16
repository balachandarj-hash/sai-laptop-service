import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
const posts = JSON.parse(readFileSync(resolve(root, "public/scheduled-blogs.json"), "utf8"));
const due = posts.filter((post) => post.date <= today).sort((a, b) => (a.date < b.date ? 1 : -1));

const blogPath = resolve(root, "blog.html");
let blog = readFileSync(blogPath, "utf8");
const marker = '<div class="blog-grid" data-blog-grid>';
const markerAt = blog.indexOf(marker);
if (markerAt < 0) throw new Error("Blog grid not found");

const missing = due.filter((post) => !blog.includes(`href="${post.href}"`));
if (missing.length) {
  const cards = missing
    .map((post) => {
      const title = post.title.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      const excerpt = post.excerpt.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      const alt = post.alt.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      return `          <article class="blog-card" data-blog-card data-publish="${post.date}" data-topics="${post.topics}" data-text="${post.text.replace(/"/g, "")}">
            <a href="${post.href}">
              <img src="${post.image}" alt="${alt}" />
              <p class="blog-meta">${post.meta}</p>
              <h2>${title}</h2>
              <p>${excerpt}</p>
            </a>
          </article>`;
    })
    .join("\n");
  blog = blog.slice(0, markerAt + marker.length) + "\n" + cards + blog.slice(markerAt + marker.length);
  writeFileSync(blogPath, blog);
}

const sitemapPath = resolve(root, "public/sitemap.xml");
if (!existsSync(sitemapPath)) throw new Error("public/sitemap.xml is missing");
let sitemap = readFileSync(sitemapPath, "utf8");
let sitemapAdded = 0;
for (const post of due) {
  const loc = `https://sailaptopservice.in/${post.href}`;
  if (sitemap.includes(loc)) continue;
  const block = `  <url>
       <loc>${loc}</loc>
       <lastmod>${post.date}T02:30:00+00:00</lastmod>
       <priority>0.6400</priority>
  </url>
`;
  sitemap = sitemap.replace("</urlset>", `${block}</urlset>`);
  sitemapAdded += 1;
}
if (sitemapAdded) writeFileSync(sitemapPath, sitemap);

const readmePath = resolve(root, "README.md");
let readme = readFileSync(readmePath, "utf8");
let readmeAdded = 0;
for (const post of [...due].reverse()) {
  const bullet = `- \`${post.href}\` — ${post.title}`;
  if (readme.includes(bullet)) continue;
  const anchor = "- `blog.html` — Blog index";
  if (!readme.includes(anchor)) break;
  readme = readme.replace(anchor, `${anchor}\n${bullet}`);
  readmeAdded += 1;
}
if (readmeAdded) writeFileSync(readmePath, readme);

console.log(
  `Today in Asia/Kolkata is ${today}. Due posts: ${due.length}. Cards added: ${missing.length}. Sitemap URLs added: ${sitemapAdded}.`,
);

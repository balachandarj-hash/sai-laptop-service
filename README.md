# SAI Laptop Service

Public website for SAI Laptop Service, a laptop repair shop in Electronic City Phase 2, Bengaluru. It is a static Vite and TypeScript site hosted on GitHub Pages.

Live site: https://balachandarj-hash.github.io/sai-laptop-service/

## Run locally

```bash
npm install
npm run dev
```

`npm run build` typechecks and writes the static site to `dist/`. `npm run preview` serves that build.

## Pages

- `index.html` — Home
- `services.html` — Services
- `about.html` — About Us
- `why.html` — Why Choose Us
- `gallery.html` — Gallery
- `blog.html` — Blog index
- `blog-common-problems.html` — Laptop Repair Services: Common Problems and Their Solutions
- `blog-ssd-hard-disk.html` — SSD and hard disk upgrade for a slow laptop
- `blog-why-choose.html` — Why choose Sai Laptop Service?
- `blog-screen-keyboard-battery.html` — Screen, keyboard, and battery replacement
- `computer-repair.html` — Computer repair
- `computer-technician-near-me.html` — Computer technician near me in Electronic City
- `contact.html` — Contact

Book a Service and the contact form open WhatsApp (`https://wa.me/919972447766`). Get Directions opens Google Maps for the Ganesh Complex address. There is no backend.

## Shop details on the site

- Phone and WhatsApp: 099724 47766
- Hours: Monday–Saturday 10:00 AM–8:00 PM, Sunday 11:00 AM–3:00 PM
- Address: NO 35/1, NO 26, Ganesh Complex, Above TVS Showroom Main Road, Hosur Rd, opp. to Infosys Limited, Electronic City, Bengaluru, Karnataka 560100

## GitHub Pages

The built site is on the `gh-pages` branch at the repository root, with `.nojekyll`. Pages is set to that branch, folder `/`.

```bash
npm run build
cp dist/index.html dist/404.html
```

Then replace the `gh-pages` branch with the contents of `dist/`.

# Sai Laptop Service

Public website for Sai Laptop Service, a laptop repair shop in Electronic City Phase 2, Bengaluru. The page is a static site (Vite and TypeScript) so GitHub Pages can host it.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints. `npm run build` typechecks and writes the static site to `dist/`. `npm run preview` serves that build.

## What is on the page

- Services the shop lists: screen, battery, keyboard, fan, hard drive, and regular maintenance
- Why the counter is easy to find, and the brands named on the shop’s Electronic City page
- The published street address and phone number
- Opening hours and email left as “Add your hours” and “Add your email” until the owner fills them in

No prices, reviews, or extra phone numbers are shown.

## Details that were confirmed

Address and phone `+91 99724 47766` match the public shop listing on [o2osell](https://o2osell.com/shops/sai-laptop-service) and the shop’s Electronic City page, [Sai Laptop Service Center in Electronic City](https://sailaptopservice.com/laptop-service-center-in-electronic-city/) (read from the Internet Archive; the live domain did not resolve in the build environment).

Service names and the brand list (Dell, HP, Lenovo, Acer, Apple, Asus, Toshiba) come from that Electronic City page. Hours and a confirmed public email were not on those pages.

## GitHub Pages

The static build is published on the `gh-pages` branch, at the repository root, with a `.nojekyll` file. In the repository’s Pages settings, set the source to **Deploy from a branch**, branch **gh-pages**, folder **/** (root).

Asset paths are relative, so a project site works at `https://<user>.github.io/<repo>/`.

To refresh the branch after a content change:

```bash
npm run build
cp dist/index.html dist/404.html
```

Then replace the `gh-pages` branch with the contents of `dist/`.

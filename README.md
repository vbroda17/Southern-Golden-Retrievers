# Southern Golden Retrievers

Website for Southern Golden Retrievers, a golden retriever breeder in Knoxville, TN. It shows off our dams and their past pups, and lists current litters so families can find their dream dog.

Built with [Astro](https://astro.build) as a static site and hosted on GitHub Pages.

- **Live site:** https://vbroda17.github.io/Southern-Golden-Retrievers/
- **Code:** everything lives in [`astro-site/`](astro-site/)

---

## Contents

- [Running the site locally](#running-the-site-locally)
- [How changes go live](#how-changes-go-live)
- [Updating litters](#updating-litters)
- [Adding photos of the dams](#adding-photos-of-the-dams)
- [Other common edits](#other-common-edits)
- [Moving to a custom domain](#moving-to-a-custom-domain)
- [Project layout](#project-layout)

---

## Running the site locally

Requires **Node.js 22.22 or newer** (we use Node 24).

```sh
cd astro-site
npm install
npm run dev
```

Then open http://localhost:4321/Southern-Golden-Retrievers/. The page refreshes automatically as you save files.

To check a production build before pushing:

```sh
npm run build     # builds to astro-site/dist/
npm run preview   # serves that build locally
```

## How changes go live

1. Create a branch off `dev` (e.g. `feature/new-litter`).
2. Make your changes and open a pull request into **`dev`**.
3. When you're ready to release, open a pull request from `dev` into **`main`**.

Every push to `main` automatically builds and deploys the site through GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). You can watch it in the repo's **Actions** tab; it takes a couple of minutes. Merging into `dev` does not change the live site.

---

## Updating litters

All litter information is in one file: **[`astro-site/src/data/litters.js`](astro-site/src/data/litters.js)**. The Current Litters page is built from it, and the Home and Contact pages read it to say how many litters there are ("one litter", "two litters", or a waiting-list message when there are none). You never need to edit those pages by hand.

### Adding a new litter

1. **Add the puppy photos.** Make a folder named after the litter inside `astro-site/src/assets/images/litters/`, for example:

   ```
   astro-site/src/assets/images/litters/raine-spring-2027/
     puppy1.jpg
     puppy2.jpg
   ```

   Photos straight off a phone are fine. The site automatically resizes and compresses them.

2. **Add the litter to `litters.js`.** Copy an existing litter block inside `currentLitters = [ ... ]` and change the details:

   ```js
   {
     id: "raine-spring-2027",            // unique; also the photo folder name and the page link (#raine-spring-2027)
     dam: {
       name: "Raine",
       image: "Raine/raine1.jpeg",       // any photo under src/assets/images/
       link: "/dams#raine"               // links the photo to her section on the Dams page
     },
     sire: {
       name: "Duke",
       image: "sires/duke.jpg",
       link: null                        // null = no link
     },
     bornDate: "March 3, 2027",          // shown exactly as written
     availableDate: "April 28, 2027",
     puppies: [
       {
         name: "Blue Collar",
         image: "litters/raine-spring-2027/puppy1.jpg",
         gender: "Male",
         color: "Golden",
         status: "Available",
         description: "Playful and loves to fetch."   // optional
       },
       // ...one block per puppy
     ]
   },
   ```

3. Run `npm run dev` and check the Current Litters page.

Image paths are always relative to `astro-site/src/assets/images/`. Don't start them with `/images/`.

### Puppy status

`status` must be exactly one of the following (capitalized as shown):

| Status | What the site does |
|---|---|
| `"Available"` | Green status, shows a **Contact About …** button, counted in "Available: X of Y" |
| `"Reserved"` | Gold status, no contact button |
| `"Adopted"` | Grey status, no contact button |

Puppies are automatically shown in that order: available first. If a status is misspelled (e.g. `"available"`), the build stops with a message naming the puppy, so a typo can't silently go live.

### Other litter tips

- **No photo yet?** Leave out `image` (or point it at a file that doesn't exist yet). The card shows a "Photo coming soon" box.
- **No description?** Leave out `description`; nothing extra is shown.
- **Updating a pup:** just change its `status`, e.g. from `"Available"` to `"Reserved"`.
- **Removing a litter:** delete its block once every pup has gone home. You can also delete its photo folder.
- **No current litters:** set `export const currentLitters = [];`. The Current Litters page shows a "join our waiting list" message, and Home/Contact update their wording.
- With two or more litters, a "Jump to Litter" menu appears at the top of the page automatically.

---

## Adding photos of the dams

Each dam's photo carousel on the Dams page shows **every image in her folder**:

```
astro-site/src/assets/images/Lilly/
astro-site/src/assets/images/Roux/
astro-site/src/assets/images/Raine/
```

Drop a photo (`.jpg`, `.jpeg`, `.png`, `.webp`, or `.gif`) into the folder and it appears in her carousel, sorted by file name. Rename files to control the order. Names sort as text, so once a dam has 10+ photos use two digits (`lilly01.jpeg`, `lilly02.jpeg`, …); otherwise `lilly10` sorts before `lilly2`. Delete a file to remove it.

### Adding a new dam

1. Create her photo folder, e.g. `astro-site/src/assets/images/Daisy/`, and add photos.
2. In [`astro-site/src/pages/dams.astro`](astro-site/src/pages/dams.astro), copy one of the `<section id="...">` blocks and change the id, name, folder, and description.
3. Update the "Meet Our Moms" text on the home page ([`index.astro`](astro-site/src/pages/index.astro)), which names the dams.

---

## Other common edits

| What | Where |
|---|---|
| Contact email (top bar, all email links) | `email` in [`astro-site/src/config.js`](astro-site/src/config.js) |
| Default page description for search results | `defaultDescription` in `config.js` |
| Page text | the matching file in [`astro-site/src/pages/`](astro-site/src/pages/) |
| Nav menu links | `navLinks` in [`astro-site/src/components/Navbar.astro`](astro-site/src/components/Navbar.astro) |
| Colors | the `--gold`, `--cream`, etc. variables at the top of [`astro-site/src/styles/global.css`](astro-site/src/styles/global.css) |
| Photo shown when a link is shared (Facebook, texts) | `shareImageSource` import in [`astro-site/src/layouts/Layout.astro`](astro-site/src/layouts/Layout.astro) |
| Favicon (browser tab icon) | [`astro-site/public/favicon.svg`](astro-site/public/favicon.svg) |

---

## Moving to a custom domain

The site's address is set in **one place**: [`astro-site/astro.config.mjs`](astro-site/astro.config.mjs). Everything else (links, images, sitemap, robots.txt, canonical URLs, and link-preview images) is built from it.

### 1. Update the Astro config

```js
// Before (GitHub Pages project URL)
site: 'https://vbroda17.github.io',
base: '/Southern-Golden-Retrievers/',

// After (custom domain; use your real domain)
site: 'https://www.example.com',
base: '/',
```

Commit this through the usual `dev` → `main` flow. Do this step at the same time as step 2 (or just after), because once the domain is live, pages built with the old `base` would have broken links.

### 2. Point the domain at GitHub Pages

1. In the GitHub repo, go to **Settings → Pages → Custom domain**, enter the domain, and save.
2. At your domain registrar, add DNS records:
   - **`www.example.com`:** a `CNAME` record pointing to `vbroda17.github.io`
   - **`example.com` (no www):** `A` records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Wait for DNS to update (minutes to a few hours), then tick **Enforce HTTPS** in Settings → Pages.

No `CNAME` file is needed in the repo, because the site deploys through GitHub Actions, which uses the domain from the Pages settings.

### 3. After it's live

- Visit the site and click through every page and photo.
- Check `https://your-domain/robots.txt` and `https://your-domain/sitemap-index.xml`; both should show the new domain.
- Add the domain in [Google Search Console](https://search.google.com/search-console) and submit `https://your-domain/sitemap-index.xml` so Google indexes it.
- Paste a link into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to check the preview photo.

You can also check the build locally before switching. This writes to `dist/domain-test/` (ignored by git) and doesn't change any files:

```sh
cd astro-site
npx astro build --site https://www.example.com --base / --outDir dist/domain-test
```

Then open `dist/domain-test/robots.txt` and `sitemap-index.xml` to confirm they use the new domain.

---

## Project layout

```
astro-site/
  astro.config.mjs        site address, base path, sitemap
  public/                 files copied as-is (favicon)
  src/
    assets/images/        all photos (optimized at build time)
      <Dam name>/         carousel photos for each dam
      litters/<id>/       puppy photos for each litter
      sires/              sire photos
      Group/              group photos used on Home/About/Contact/Testimonials
    components/           reusable pieces (Navbar, Footer, ImageCarousel, LitterSection, ...)
    data/litters.js       current litters
    layouts/Layout.astro  shared page shell: <head>, SEO tags, nav, footer
    pages/                one file per page (404, robots.txt included)
    scripts/              browser scripts (carousel, copy email)
    styles/               CSS, one file per page/component plus global.css
    config.js             email, site name, default description
    images.js             photo lookup used by the carousel and litter cards
    utils.js              url() for base-path links, countOf() for wording
```

---

## Notes from planning

- Put past litters in moms
- Make litters just Current
- Litter organized by mom
- Have a section for dads (sires)

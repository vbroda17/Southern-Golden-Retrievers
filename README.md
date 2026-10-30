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
- [Updating the FAQ](#updating-the-faq)
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

There are two kinds of changes:

- **Litter updates** (adding a litter, marking a pup Reserved, new puppy photos) are made in **Pages CMS on `main`** and go live automatically a couple of minutes after saving. See [Updating litters](#updating-litters).
- **Code and design changes** go through `dev`:
  1. Create a branch off `dev` (e.g. `feature/new-page`).
  2. Make your changes and open a pull request into **`dev`**.
  3. When you're ready to release, open a pull request from `dev` into **`main`**.

Every push to `main` (including every save in Pages CMS) builds and deploys the site through GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). You can watch it in the repo's **Actions** tab. Merging into `dev` does not change the live site.

### Keeping `dev` up to date with litter edits

Because litter edits are committed straight to `main`, `dev` falls behind. Before starting new code work (and before a `dev` → `main` release), bring those edits into `dev`:

```sh
git checkout dev
git pull
git merge origin/main
git push
```

This only conflicts if the same litter file was changed on both branches, so avoid editing `astro-site/src/content/litters/` on feature branches.

---

## Updating litters

Litters are edited through **[Pages CMS](https://app.pagescms.org)**, a free web editor with simple forms. No code, no installs. Each litter is saved as a small file in [`astro-site/src/content/litters/`](astro-site/src/content/litters/), and the site rebuilds itself after every save.

The Current Litters page is built from these files, and the Home and Contact pages count them to say "one litter", "two litters", or show a waiting-list message when there are none. You never need to edit those pages by hand.

### One-time setup

**Site owner (once):**
1. Go to https://app.pagescms.org and sign in with GitHub.
2. When asked, install the Pages CMS GitHub App on this repository.

**Each person who will update litters:**
1. Create a free account at https://github.com.
2. The site owner adds them in the repo under **Settings → Collaborators → Add people** (they'll get an email invite to accept).
3. They go to https://app.pagescms.org, choose **Sign in with GitHub**, then open this repository on the **`main`** branch.

### Adding a new litter (in Pages CMS)

1. Open **Litters** and click **Add an entry**.
2. Fill in the form:
   - **Mom (dam):** pick from the list. Her photo and the link to her Dams-page section are added automatically. Optionally choose a different **Mom's photo**.
   - **Dad (sire):** type his name and upload his photo.
   - **Date born** and **Ready to go home:** pick the dates.
   - **Puppies:** click **Add** for each pup, then fill in name, photo, gender, color, status, and an optional description. You can leave this empty until the pups have names; the page will say details are coming soon.
3. Click **Save**. The site updates in about two minutes.

Photos straight off a phone are fine. The site automatically resizes and compresses them.

### Updating or removing a litter

- **A pup was reserved or went home:** open the litter, expand the pup, change **Status**, and save.
- **Add photos later:** open the pup and upload a **Photo**. Pups without one show a "Photo coming soon" box.
- **Remove a litter:** once every pup has gone home, open the litter and delete the entry. With no litters, the Current Litters page shows a "join our waiting list" message, and Home/Contact update their wording.

With two or more litters, a "Jump to Litter" menu appears at the top of the Current Litters page automatically. Litters are listed oldest first.

### Puppy status

| Status | What the site does |
|---|---|
| **Available** | Green status, shows a **Contact About …** button, counted in "Available: X of Y" |
| **Reserved** | Gold status, no contact button |
| **Adopted** | Grey status, no contact button |

Puppies are automatically shown in that order: available first.

### If a save doesn't show up

Every litter is checked when the site builds. If something is wrong (for example, a file edited by hand with a misspelled status), the update **won't go live** and the previous version of the site stays up; nothing breaks. To see why, open the repo's **Actions** tab, click the failed (red ✗) run, and look for a message like:

```
litters → roux-2026-11: puppies.0.status: Invalid option: expected one of "Available"|"Reserved"|"Adopted"
```

That names the litter file and the field to fix. Fix it in Pages CMS (or the file) and save again.

### Editing litter files by hand

You can also edit the YAML files directly. Each looks like this:

```yaml
dam: Lilly                     # must match a dam's gallery folder name for her photo/link
damPhoto: Lilly/lilly3.jpeg    # optional; default is her first gallery photo
sire: Champion Bruno
sirePhoto: sires/bruno.jpg
born: 2026-01-01               # YYYY-MM-DD; shown as "January 1, 2026"
readyDate: 2026-02-26
puppies:
  - name: Puppy 1
    photo: litters/puppy1.jpg  # optional
    gender: Male               # Male or Female
    color: Golden
    status: Available          # Available, Reserved, or Adopted
    description: Playful and loves to fetch.   # optional
```

- The file name (e.g. `lilly-winter-2026.yml`) becomes the litter's link on the page (`#lilly-winter-2026`).
- Photo paths are relative to `astro-site/src/assets/images/`. Puppy photos go in `astro-site/src/assets/images/litters/`.
- The rules the site checks are in [`astro-site/src/content.config.ts`](astro-site/src/content.config.ts).

---

## Updating the FAQ

The FAQ page ([`/faq`](https://vbroda17.github.io/Southern-Golden-Retrievers/faq/)) is edited in **Pages CMS** under **FAQ**, the same way as litters. Saves on `main` go live in about two minutes.

- **Intro:** the short line under the page title.
- **Sections:** groups like "Getting a Puppy" or "Health". Drag to reorder.
- **Questions:** each has a question and an answer. Drag to reorder within a section.
  - Leave a blank line in an answer to start a new paragraph.
  - A question with an **empty answer is hidden** on the site, so you can add questions now and answer them later. A section whose questions are all unanswered is hidden too.

The questions are stored in [`astro-site/src/content/faq.json`](astro-site/src/content/faq.json) and checked by [`astro-site/src/faq.js`](astro-site/src/faq.js); a section without a title or a question without text stops the build with a message saying which one.

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
2. In [`astro-site/src/pages/dams.astro`](astro-site/src/pages/dams.astro), copy one of the `<section id="...">` blocks and change the id, name, folder, and description. Use her name in lowercase as the id (e.g. `id="daisy"`) so litter pages can link to her.
3. Add her name to the **Mom (dam)** list in [`.pages.yml`](.pages.yml) (`values: [Lilly, Roux, Raine, Daisy]`) so she can be picked in Pages CMS.
4. Update the "Meet Our Moms" text on the home page ([`index.astro`](astro-site/src/pages/index.astro)), which names the dams.

---

## Other common edits

| What | Where |
|---|---|
| Contact email (top bar, all email links) | `email` in [`astro-site/src/config.js`](astro-site/src/config.js) |
| Default page description for search results | `defaultDescription` in `config.js` |
| Page text | the matching file in [`astro-site/src/pages/`](astro-site/src/pages/) |
| FAQ questions and answers | Pages CMS → **FAQ** (see [Updating the FAQ](#updating-the-faq)) |
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
.pages.yml                Pages CMS forms for editing litters and the FAQ
astro-site/
  astro.config.mjs        site address, base path, sitemap
  public/                 files copied as-is (favicon)
  src/
    assets/images/        all photos (optimized at build time)
      <Dam name>/         carousel photos for each dam
      litters/            puppy photos
      sires/              sire photos
      Group/              group photos used on Home/About/Contact/Testimonials
    components/           reusable pieces (Navbar, Footer, ImageCarousel, LitterSection, ...)
    content/litters/      one YAML file per current litter (edited via Pages CMS)
    content/faq.json      FAQ intro, sections, questions, and answers (edited via Pages CMS)
    content.config.ts     rules each litter file is checked against
    layouts/Layout.astro  shared page shell: <head>, SEO tags, nav, footer
    pages/                one file per page (404, robots.txt included)
    scripts/              browser scripts (carousel, copy email)
    styles/               CSS, one file per page/component plus global.css
    config.js             email, site name, default description
    faq.js                loads and checks faq.json for the FAQ page
    images.js             photo lookup used by the carousel and litter cards
    litters.js            loads litter files and fills in dam photo/link and dates
    utils.js              url() for base-path links, countOf() for wording
```

---

## Notes from planning

- Put past litters in moms
- Make litters just Current
- Litter organized by mom
- Have a section for dads (sires)

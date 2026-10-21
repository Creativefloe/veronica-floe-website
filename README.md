# Creative Flø website

The portfolio and booking website for Veronika Flø (Creative Flø), photographer in Oslo.
Norwegian is the main language (`/`), English lives at `/en/`.

Built with [Astro](https://astro.build) and plain CSS. No cookies and no tracking.

---

## 1. Run it on your computer

You need [Node.js](https://nodejs.org) version 22 or newer (choose "LTS" on the website).

Open the Terminal in this folder and run:

```bash
npm install
```

(only needed the first time), then:

```bash
npm run dev
```

Open <http://localhost:4321> in your browser. The page updates as soon as you save a file.
Press `Ctrl + C` in the Terminal to stop.

To build the finished site (the files that get published):

```bash
npm run build
```

The result ends up in the `dist/` folder. `npm run preview` shows the built version.

---

## 2. Publish (deploy)

### Netlify (recommended)

1. Put this folder in a GitHub repository.
2. On [netlify.com](https://netlify.com): **Add new site → Import an existing project**, pick the repository.
   The settings are read from `netlify.toml` automatically (build command `npm run build`, publish folder `dist`).
3. Under **Site configuration → Environment variables**, add:
   - `SITE_URL` = your domain, e.g. `https://creativefloe.com`
   - `PUBLIC_FORM_ENDPOINT` = your Formspree address (see section 3)
4. Under **Domain management**, connect your domain.
5. **Editor login** (needed once, for /admin/): on GitHub open *Settings → Developer settings → OAuth Apps → New OAuth App*.
   Name: `Creative Flø editor`, Homepage URL: `https://creativefloe.com`, Callback URL: `https://api.netlify.com/auth/done`.
   Copy the Client ID and generate a Client Secret. In Netlify: *Project configuration → Security → OAuth →
   Install provider → GitHub*, paste both and save.
6. In `public/admin/config.yml`, `backend.repo` must match the GitHub repository (currently `Creativefloe/veronica-floe-website`).

### Cloudflare Pages

1. On Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**.
2. Framework preset: **Astro**. Build command `npm run build`, output folder `dist`.
3. Add the same two environment variables (`SITE_URL`, `PUBLIC_FORM_ENDPOINT`) and set `NODE_VERSION` = `22`.

After changing environment variables, start a new deploy so they take effect.

---

## 3. Connect the contact form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io) with `creativefloe@gmail.com`.
2. Create a new form. You get an address like `https://formspree.io/f/abcdwxyz`.
3. Put it in `PUBLIC_FORM_ENDPOINT` in Netlify/Cloudflare (and in a `.env` file for local testing, see `.env.example`).
4. Send a test message from the live site and confirm it in your inbox.

Until this is done, the form tells visitors to email you directly. The email link is always visible on the contact page.
Spam protection: the form has a hidden "honeypot" field (`_gotcha`) that Formspree uses to block bots.

---

## 4. Edit text and photos (for Veronika)

Go to **https://creativefloe.com/admin/** and click **Sign in with GitHub**.

| What you want to change | Where in the editor |
|---|---|
| Add, remove or reorder portfolio photos | **Portefølje / Portfolio** |
| The rotating photos at the top of the home page | **Bildeveksling på forsiden / Home slideshow** |
| Any text on any page (Norwegian and English) | **Tekst på sidene / Page text** |
| Email, Instagram, prices, org. number, your portrait | **Innstillinger / Settings** |

- Text pages show a **language menu** at the top (Norwegian / English). Remember to update both.
- **Adding a photo:** open *Portfolio*, click *Add*, upload the photo, pick a category, write a short description
  in both languages and tick *Show on home page* if you like (max 6). Big camera files are shrunk automatically.
- The **first photo of each category** is also used on the session cards on the home and pricing pages,
  so drag your best one to the top.
- Click **Save** when done. The site updates by itself about 1-2 minutes later.
- **Testimonials** appear on the home page as soon as you add the first one (*Page text → Home*).
- **Privacy policy**: once it has been reviewed, empty the *Draft notice* field to remove the red draft banner.

Behind the scenes every save is stored in GitHub and Netlify rebuilds the site. Nothing can break permanently:
every earlier version is kept in GitHub's history.

### Where the content lives (for developers)

| File | Content |
|---|---|
| `src/content/pages/*.json` | Page text, one file per page, with `no` and `en` inside |
| `src/content/ui/no.json`, `ui/en.json` | Technical text: menu labels, form messages, buttons (not in the editor) |
| `src/content/portfolio.json` | Portfolio photos (order, category, home page, descriptions) |
| `src/content/hero.json` | Home page slideshow |
| `src/content/settings.json` | Email, Instagram, prices, org. number, portrait |
| `src/assets/images/photos/` | All photos (uploads from the editor land here) |
| `public/admin/config.yml` | Editor configuration (fields, labels, image settings) |

## 5. Logo and brand colours

- **Logo**: the text "Creative Flø" is a placeholder. When a logo is ready, follow the note at the top of `src/components/Wordmark.astro`.
- **Colours**: all colours are in `src/styles/global.css` at the very top (`:root`). Change the hex values there and the whole site follows. Keep text dark enough to read easily.
- **Favicon** (browser tab icon): `public/favicon.svg`.
- **Fonts**: Cormorant Garamond (headings) and Jost (text), served from the website itself.

---

## 6. Optional: privacy-friendly visitor statistics

Off by default. If you want simple statistics without cookies (Plausible or Umami):
fill in `analytics` in `src/config/site.ts`, then follow the comment in `src/layouts/BaseLayout.astro`.
Remember to mention it in the privacy policy.

---

## Project map

```
src/
  content/pages/         page text edited in the CMS (no + en in each file)
  content/ui/            technical text (menus, form messages)
  content/*.json         portfolio, slideshow, settings (edited in the CMS)
  config/site.ts         reads settings.json, plus form endpoint and analytics
  assets/images/photos/  all photos
  i18n/                  page addresses in both languages, text loader
  views/                 page layouts (shared by both languages)
  pages/                 one small file per page and language
  components/            header, footer, buttons and other parts
  styles/global.css      colours, fonts and shared styles
public/admin/            the editor (Sveltia CMS) at /admin/
public/                  favicon, social preview image, security headers
DESIGN.md                design reference (warm editorial base, adapted)
```

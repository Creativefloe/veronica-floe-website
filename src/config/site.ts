import settings from '../content/settings.json';

/**
 * Business details shared by both languages.
 * Email, Instagram, org. number, prices and the portrait are edited in the CMS
 * (Settings), which saves them in src/content/settings.json.
 */
export const site = {
  name: 'Veronika Flø',
  brand: 'Creative Flø',
  email: settings.email,
  instagram: settings.instagram.replace(/^@/, ''), // without @
  city: 'Oslo',
  country: 'NO',

  /** Organisation number. Shown in the footer and search engine data only when filled in. */
  orgNumber: settings.orgNumber ?? '',

  /** Starting prices in NOK, used on the home page, prices page and search engine data. */
  prices: settings.prices,

  /** Portrait used on the About page and home page. */
  aboutImage: settings.aboutImage,

  /** Contact form endpoint (Formspree). Set PUBLIC_FORM_ENDPOINT in .env or your hosting dashboard. */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',

  /**
   * Optional privacy-friendly analytics (no cookies), e.g. Plausible or Umami.
   * Off by default. To turn on, set `enabled: true` and fill in the details,
   * then uncomment the script tag in src/layouts/BaseLayout.astro.
   */
  analytics: {
    enabled: false,
    domain: '', // e.g. 'creativefloe.com'
    src: '', // e.g. 'https://plausible.io/js/script.js'
  },
};

export const instagramUrl = `https://www.instagram.com/${site.instagram}/`;

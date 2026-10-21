// @ts-check
import { defineConfig } from 'astro/config';

// Set SITE_URL in your hosting dashboard (or .env) to the real domain, e.g. https://creativefloe.com
const site = process.env.SITE_URL || 'https://creativefloe.com';

export default defineConfig({
  site,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'no',
    locales: ['no', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  devToolbar: { enabled: false },
  image: {
    // Responsive, lazy-loaded images with automatic srcset
    responsiveStyles: true,
  },
});

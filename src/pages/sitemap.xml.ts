import type { APIRoute } from 'astro';
import { routes, languages, htmlLang } from '../i18n/routes';

// Localized sitemap: every page in both languages, with hreflang alternates.
export const GET: APIRoute = ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const urls = Object.values(routes).flatMap((route) =>
    languages.map((lang) => {
      const alternates = languages
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${htmlLang[l]}" href="${abs(route[l])}"/>`)
        .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(route.no)}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${abs(route[lang])}</loc>\n${alternates}\n  </url>`;
    }),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

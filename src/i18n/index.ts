/**
 * All text on the site, per language.
 *
 * - src/content/pages/*.json   Text Veronika edits in the CMS (/admin). Each file holds "no" and "en".
 * - src/content/ui/{no,en}.json  Technical text: menu labels, form messages, buttons. Edit by hand.
 *
 * The two are merged into one object, so pages read e.g. t(lang).home.intro.heading.
 */
import uiNo from '../content/ui/no.json';
import uiEn from '../content/ui/en.json';
import seo from '../content/pages/seo.json';
import home from '../content/pages/home.json';
import sessions from '../content/pages/sessions.json';
import portfolio from '../content/pages/portfolio.json';
import about from '../content/pages/about.json';
import services from '../content/pages/services.json';
import faq from '../content/pages/faq.json';
import contact from '../content/pages/contact.json';
import privacy from '../content/pages/privacy.json';
import type { Lang } from './routes';

export * from './routes';

type Testimonial = { quote: string; name: string; session?: string };

function deepMerge<A extends object, B extends object>(a: A, b: B): A & B {
  const out: any = Array.isArray(a) ? [...a] : { ...a };
  for (const [k, v] of Object.entries(b)) {
    out[k] =
      v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object'
        ? deepMerge(out[k], v)
        : v;
  }
  return out;
}

function build(lang: 'no') {
  const content = deepMerge(lang === 'no' ? uiNo : (uiEn as typeof uiNo), {
    meta: seo[lang],
    home: home[lang],
    sessions: sessions[lang],
    portfolio: portfolio[lang],
    about: about[lang],
    services: services[lang],
    faq: faq[lang],
    contact: contact[lang],
    privacy: privacy[lang],
  });
  // Testimonials may be empty, so give them a proper type
  return content as typeof content & {
    home: { testimonials: { heading: string; items: Testimonial[] } };
  };
}

export type Content = ReturnType<typeof build>;

const cache: Partial<Record<Lang, Content>> = {};
export const t = (lang: Lang): Content => (cache[lang] ??= build(lang as 'no'));

/** "fra 3 500 kr" / "from NOK 3,500" */
export function formatPrice(lang: Lang, amount: number) {
  if (lang === 'no') {
    return `${new Intl.NumberFormat('nb-NO').format(amount)} kr`;
  }
  return `NOK ${new Intl.NumberFormat('en-GB').format(amount)}`;
}

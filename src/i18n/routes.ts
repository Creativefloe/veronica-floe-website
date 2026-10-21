export type Lang = 'no' | 'en';
export const languages: Lang[] = ['no', 'en'];
export const defaultLang: Lang = 'no';

/** Every page and its URL in each language. The language switcher uses this map. */
export const routes = {
  home: { no: '/', en: '/en/' },
  portfolio: { no: '/portefolje/', en: '/en/portfolio/' },
  about: { no: '/om-meg/', en: '/en/about/' },
  services: { no: '/priser/', en: '/en/services/' },
  faq: { no: '/sporsmal-og-svar/', en: '/en/faq/' },
  contact: { no: '/kontakt/', en: '/en/contact/' },
  privacy: { no: '/personvern/', en: '/en/privacy/' },
} as const;

export type RouteKey = keyof typeof routes;

export const url = (key: RouteKey, lang: Lang) => routes[key][lang];

export const htmlLang: Record<Lang, string> = { no: 'nb', en: 'en' };
export const ogLocale: Record<Lang, string> = { no: 'nb_NO', en: 'en_GB' };

/** Anchor for the booking terms on the Services page (linked from the FAQ). */
export const termsAnchor: Record<Lang, string> = { no: 'vilkar', en: 'terms' };

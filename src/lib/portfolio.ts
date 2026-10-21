import type { ImageMetadata } from 'astro';
import data from '../content/portfolio.json';
import { resolveImage } from './images';
import { t, type Lang } from '../i18n';

/**
 * Portfolio photos are managed in the CMS (Portfolio), which saves them in
 * src/content/portfolio.json. Order in that list = order on the site.
 * The first photo of each category is also used on the session cards.
 */
export type Category = 'couples' | 'pregnancy' | 'family' | 'portrait';
export const categories: Category[] = ['couples', 'pregnancy', 'family', 'portrait'];

export interface Photo {
  id: string;
  src: ImageMetadata;
  category: Category;
  featured: boolean;
  alt: string;
}

type Entry = { image: string; category: string; featured?: boolean; alt?: { no?: string; en?: string } };

export function getPhotos(lang: Lang): Photo[] {
  return (data.photos as Entry[]).flatMap((p) => {
    const src = resolveImage(p.image);
    const category = p.category as Category;
    if (!src || !categories.includes(category)) return [];
    return [{
      id: p.image,
      src,
      category,
      featured: !!p.featured,
      alt: p.alt?.[lang]?.trim() || t(lang).portfolio.defaultAlt[category] || '',
    }];
  });
}

/** First photo of a category, used for session cards. */
export const firstOf = (lang: Lang, category: Category) =>
  getPhotos(lang).find((p) => p.category === category);

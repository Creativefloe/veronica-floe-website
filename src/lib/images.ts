import type { ImageMetadata } from 'astro';

// Every photo in src/assets/images/ (including ones uploaded through the CMS),
// so Astro can resize and optimise them at build time.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif}',
  { eager: true },
);

/**
 * Turn a path stored by the CMS, like "/src/assets/images/photos/par-benk.jpg",
 * into an optimisable image. Returns undefined if the file is missing.
 */
export function resolveImage(stored: string | undefined): ImageMetadata | undefined {
  if (!stored) return undefined;
  const rel = stored.replace(/^\/?src\/assets\/images\//, '');
  return files[`../assets/images/${rel}`]?.default;
}

/**
 * Genuine stock PHOTOGRAPHS from Pexels (not generated illustrations).
 * These are curated visual DEMO assets, not verified photos of Lumora SKUs.
 * Replace source IDs with photos supplied by the optical shop before launch.
 * Remote Pexels CDN images require an internet connection.
 * License/source details: IMAGE-SOURCES.md included in the patch.
 */
export const pexels = (id, width = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const HERO_LOOKS = {
  midnight: { name: 'The Modernist', image: 16587280, caption: 'A fresh point of view' },
  amber: { name: 'The Classic', image: 6109552, caption: 'Quiet confidence' },
  crystal: { name: 'The Statement', image: 28616246, caption: 'Details worth seeing' },
  olive: { name: 'The Original', image: 5990266, caption: 'Made for expression' },
};

export const COLLECTION_PHOTOS = {
  Eyeglasses: 5677349,
  Sunglasses: 6837219,
  'Blue Light': 5273692,
};

export const SHAPE_PHOTOS = [25651729, 14482342, 5752398];
export const STORY_PHOTO = 3986482;

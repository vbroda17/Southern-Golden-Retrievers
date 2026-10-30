// src/litters.js
// Loads the litter files from src/content/litters/ and fills in the details the pages need.
// To add or update litters, use Pages CMS or edit those YAML files (see README).
import { getCollection } from 'astro:content';
import { folderImages } from './images.js';

// "2026-01-01" -> "January 1, 2026" (YAML dates are midnight UTC, so format in UTC)
const formatDate = (date) =>
  date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// Fills in the dam's photo and Dams-page link, formats dates, and renames photo -> image
function toLitter({ id, data }) {
  // A dam with a gallery folder has a section on the Dams page (#lilly, #roux, ...)
  const damGallery = folderImages(data.dam);

  return {
    id,
    dam: {
      name: data.dam,
      image: data.damPhoto ?? damGallery[0]?.path,
      link: damGallery.length > 0 ? `/dams#${data.dam.toLowerCase()}` : null
    },
    sire: { name: data.sire, image: data.sirePhoto, link: null },
    bornDate: formatDate(data.born),
    availableDate: data.readyDate && formatDate(data.readyDate),
    note: data.pastNote,
    puppies: data.puppies.map(({ photo, ...puppy }) => ({ ...puppy, image: photo })),
    familyPhotos: data.familyPhotos.map(({ photo, caption }) => ({ image: photo, caption }))
  };
}

const byBorn = (a, b) => a.data.born.getTime() - b.data.born.getTime();

// Current litters, oldest first
export async function getCurrentLitters() {
  const entries = await getCollection('litters', ({ data }) => !data.archived);
  return entries.sort(byBorn).map(toLitter);
}

// Archived litters, newest first
export async function getPastLitters() {
  const entries = await getCollection('litters', ({ data }) => data.archived);
  return entries.sort(byBorn).reverse().map(toLitter);
}

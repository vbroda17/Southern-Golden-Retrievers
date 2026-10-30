// src/litters.js
// Loads the litter files from src/content/litters/ and fills in the details the pages need.
// To add or update litters, use Pages CMS or edit those YAML files (see README).
import { getCollection } from 'astro:content';
import { folderImages } from './images.js';
import { countOf } from './utils.js';

// "2026-01-01" -> "January 1, 2026" (YAML dates are midnight UTC, so format in UTC)
const formatDate = (date) =>
  date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// A dam's name, photo (default: first photo in her gallery folder), and Dams-page link.
// A dam with a gallery folder has a section on the Dams page (#lilly, #roux, ...)
export function damInfo(name, photo) {
  const gallery = folderImages(name);
  return {
    name,
    image: photo ?? gallery[0]?.path,
    link: gallery.length > 0 ? `/dams#${name.toLowerCase()}` : null
  };
}

// Fills in the dam's photo and Dams-page link, formats dates, and renames photo -> image
function toLitter({ id, data }) {
  return {
    id,
    dam: damInfo(data.dam, data.damPhoto),
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

// Available puppies across current litters, for Puppy News and the home page:
// "We have two puppies available right now from Roux's litter." or undefined if none
export async function getAvailableNowText() {
  const litters = (await getCurrentLitters())
    .map(litter => ({ dam: litter.dam.name, count: litter.puppies.filter(p => p.status === 'Available').length }))
    .filter(litter => litter.count > 0);
  if (litters.length === 0) return undefined;

  const total = litters.reduce((sum, litter) => sum + litter.count, 0);
  const from = litters.length === 1 ? `from ${litters[0].dam}'s litter` : 'across our current litters';
  return `We have ${countOf(total, 'puppy', 'puppies')} available right now ${from}.`;
}

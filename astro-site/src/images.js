// src/images.js
// Lookup for photos in src/assets/images so Astro can resize and compress them at build time

// Every image under src/assets/images, imported as Astro image metadata
/** @type {Record<string, import('astro').ImageMetadata>} */
const modules = import.meta.glob('./assets/images/**/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  import: 'default'
});

// Keyed by path relative to src/assets/images, e.g. "Lilly/lilly1.jpeg"
const images = Object.fromEntries(
  Object.entries(modules).map(([path, image]) => [path.replace('./assets/images/', ''), image])
);

// Get one image by its path, or undefined if the file doesn't exist.
// Accepts "Lilly/lilly1.jpeg" as well as the "/images/Lilly/lilly1.jpeg" form Pages CMS saves.
export function findImage(path) {
  const key = path.replace(/^\/+/, '').replace(/^images\//, '');
  return images[key];
}

// Get every image in a folder (e.g. "Lilly"), sorted by file name
export function folderImages(folder) {
  return Object.keys(images)
    .filter(path => path.startsWith(`${folder}/`))
    .sort()
    .map(path => ({ path, image: images[path] }));
}

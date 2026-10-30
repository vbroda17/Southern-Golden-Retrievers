// src/utils.js
// Helper function to handle base path for GitHub Pages

// Get base path from import.meta.env or default to empty string
export const base = import.meta.env.BASE_URL || '/';

// Helper function to create proper URLs
export function url(path) {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Add base and ensure single slash
  return `${base}${cleanPath}`.replace(/\/+/g, '/');
}

const NUMBER_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

// Count with the right noun form for reading: "no litters", "one litter", "two litters", "12 litters"
export function countOf(count, singular, plural = `${singular}s`) {
  const number = NUMBER_WORDS[count] ?? String(count);
  return `${number} ${count === 1 ? singular : plural}`;
}
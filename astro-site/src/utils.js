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
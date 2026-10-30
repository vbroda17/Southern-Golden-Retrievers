// src/puppy-news.js
// Loads the planned litters from src/content/puppy-news.json (normally edited through Pages CMS)
// and checks them, so a broken edit fails the build with a clear message instead of going live.
import { z } from 'astro/zod';
import newsData from './content/puppy-news.json';
import { damInfo } from './litters.js';
import { slugify } from './utils.js';

// Pages CMS may save a blank field as "" or null; treat both as "not set"
const optionalText = z.string().nullish().transform(value => value?.trim() || undefined);

const newsSchema = z.object({
  plannedLitters: z.array(z.object({
    dam: z.string().trim().min(1, 'Every planned litter needs a mom (dam)'),
    sire: optionalText,
    sirePhoto: optionalText,
    expected: z.union([z.coerce.date(), z.literal('')]).nullish().transform(value => value || undefined),
    note: optionalText
  })).nullish().transform(litters => litters ?? [])
});

// Date -> "March 2027". Only the month is shown since it's a rough estimate.
const formatMonth = (date) => date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// Months since year 0, to compare dates by month only
const monthIndex = (date) => date.getUTCFullYear() * 12 + date.getUTCMonth();

// Planned litters in the order they're listed in Pages CMS. `expected` is "March 2027", or
// undefined when no estimate is set or the month has already passed (the page then uses
// its "not sure yet" wording instead of showing an old date).
export function getPlannedLitters() {
  const result = newsSchema.safeParse(newsData);
  if (!result.success) {
    const problems = result.error.issues.map(issue => `  ${issue.path.join('.')}: ${issue.message}`).join('\n');
    throw new Error(`src/content/puppy-news.json has a problem:\n${problems}`);
  }

  const thisMonth = monthIndex(new Date());
  return result.data.plannedLitters.map(({ dam, sire, sirePhoto, expected, note }, index) => ({
    id: `planned-${slugify(dam)}-${index + 1}`,
    dam: damInfo(dam),
    sire: sire ? { name: sire, image: sirePhoto } : undefined,
    expected: expected && monthIndex(expected) >= thisMonth ? formatMonth(expected) : undefined,
    note
  }));
}

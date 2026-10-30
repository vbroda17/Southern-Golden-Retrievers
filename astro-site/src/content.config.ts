// src/content.config.ts
// Defines the litter data files and checks them at build time, so a bad value fails the
// build with a clear message instead of going live. Each litter is one YAML file in
// src/content/litters/, normally edited through Pages CMS (see /.pages.yml).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PUPPY_STATUSES } from './config.js';

// Pages CMS may save an empty optional field as "" or null; treat both as "not set"
const optionalText = z.string().nullish().transform(value => value || undefined);
const optionalDate = z.union([z.coerce.date(), z.literal('')]).nullish().transform(value => value || undefined);

const litters = defineCollection({
  loader: glob({ pattern: '*.{yml,yaml}', base: './src/content/litters' }),
  schema: z.object({
    dam: z.string(),
    damPhoto: optionalText,   // defaults to the first photo in her gallery folder
    sire: z.string(),
    sirePhoto: optionalText,
    born: z.coerce.date(),
    readyDate: optionalDate,  // required while the litter is current (checked below)
    // true moves the litter from Current Litters to Past Litters
    archived: z.boolean().nullish().transform(value => value ?? false),
    pastNote: optionalText,   // short note shown on Past Litters
    puppies: z.array(z.object({
      name: z.string(),
      photo: optionalText,
      gender: z.enum(['Male', 'Female']),
      status: z.enum(PUPPY_STATUSES),
      description: optionalText
    })).nullish().transform(puppies => puppies ?? []),
    // "All grown up" photos families send in, shown on Past Litters
    familyPhotos: z.array(z.object({
      photo: z.string(),
      caption: optionalText
    })).nullish().transform(photos => photos ?? [])
  }).refine(litter => litter.archived || litter.readyDate, {
    path: ['readyDate'],
    message: 'A current litter needs a "Ready to go home" date'
  })
});

export const collections = { litters };

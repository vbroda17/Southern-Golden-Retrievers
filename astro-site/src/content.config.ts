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

const litters = defineCollection({
  loader: glob({ pattern: '*.{yml,yaml}', base: './src/content/litters' }),
  schema: z.object({
    dam: z.string(),
    damPhoto: optionalText,   // defaults to the first photo in her gallery folder
    sire: z.string(),
    sirePhoto: optionalText,
    born: z.coerce.date(),
    readyDate: z.coerce.date(),
    puppies: z.array(z.object({
      name: z.string(),
      photo: optionalText,
      gender: z.enum(['Male', 'Female']),
      color: z.string(),
      status: z.enum(PUPPY_STATUSES),
      description: optionalText
    })).nullish().transform(puppies => puppies ?? [])
  })
});

export const collections = { litters };

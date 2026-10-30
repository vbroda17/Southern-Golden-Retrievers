// src/faq.js
// Loads the FAQ from src/content/faq.json (normally edited through Pages CMS) and checks it,
// so a broken edit fails the build with a clear message instead of going live.
import { z } from 'astro/zod';
import faqData from './content/faq.json';

// Pages CMS may save a blank field as "" or null; treat both as "not set"
const optionalText = z.string().nullish().transform(value => value?.trim() || undefined);

const faqSchema = z.object({
  intro: optionalText,
  sections: z.array(z.object({
    title: z.string().trim().min(1, 'Every FAQ section needs a title'),
    questions: z.array(z.object({
      question: z.string().trim().min(1, 'Every FAQ question needs question text'),
      answer: optionalText
    })).nullish().transform(questions => questions ?? [])
  }))
});

// Sections with their answered questions; questions without an answer yet are left out,
// and sections left empty are dropped
export function getFaq() {
  const result = faqSchema.safeParse(faqData);
  if (!result.success) {
    const problems = result.error.issues.map(issue => `  ${issue.path.join('.')}: ${issue.message}`).join('\n');
    throw new Error(`src/content/faq.json has a problem:\n${problems}`);
  }

  const sections = result.data.sections
    .map(section => ({ ...section, questions: section.questions.filter(q => q.answer) }))
    .filter(section => section.questions.length > 0);

  return { intro: result.data.intro, sections };
}

// Split an answer into paragraphs on blank lines
export function paragraphs(text) {
  return text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
}

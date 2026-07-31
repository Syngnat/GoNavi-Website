import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    description: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }),
    highlights: z.array(z.string()),
    features: z.array(z.object({ title: z.string(), description: z.string(), icon: z.enum(['native', 'multi', 'flow', 'team']) })),
    screenshots: z.array(z.object({ badge: z.string(), title: z.string(), description: z.string(), image: z.string() })),
    screenshotsHeading: z.object({ eyebrow: z.string(), title: z.string(), description: z.string() }),
    featuresHeading: z.object({ eyebrow: z.string(), title: z.string(), description: z.string() }),
    databases: z.array(z.object({ name: z.string(), kind: z.string(), status: z.enum(['primary', 'supported']), detail: z.string() })),
    databasesHeading: z.object({ eyebrow: z.string(), title: z.string(), description: z.string() }),
    cta: z.object({ title: z.string(), description: z.string(), note: z.string(), primary: z.string(), secondary: z.string() }),
  }),
});

const docs = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/docs',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    order: z.number().optional(),
    locale: z.enum(['zh', 'en']),
    slug: z.string(),
  }),
});

const roadmap = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/roadmap' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    locale: z.enum(['zh', 'en']),
    lanes: z.array(
      z.object({
        title: z.string(),
        items: z.array(z.string()),
      }),
    ),
  }),
});

export const collections = { site, docs, roadmap };

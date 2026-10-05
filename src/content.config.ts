import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sectionHeading = z.object({ kicker: z.string(), title: z.string(), description: z.string() });
const link = z.object({ label: z.string(), href: z.string() });

const site = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/site' }),
  schema: z.object({
    /** Meta title and description; the visible headline lives in `hero`. */
    title: z.string(),
    description: z.string(),
    hero: z.object({
      /** One entry per line of the headline. */
      headline: z.array(z.string()),
      lede: z.string(),
      download: z.string(),
      facts: z.array(z.object({ label: z.string(), href: z.string().optional() })),
    }),
    tour: z.object({
      label: z.string(),
      note: z.string(),
      shots: z.array(z.object({ id: z.string(), label: z.string(), caption: z.string(), image: z.string() })),
    }),
    scorecard: sectionHeading.extend({
      sample: z.string(),
      metrics: z.array(z.object({ label: z.string(), question: z.string(), value: z.string(), note: z.string() })),
      compare: z.object({
        caption: z.string(),
        other: z.string(),
        rows: z.array(z.object({ label: z.string(), other: z.string(), gonavi: z.string() })),
      }),
      method: z.string(),
      methodLink: link,
    }),
    capabilities: sectionHeading.extend({
      items: z.array(z.object({
        id: z.string(),
        title: z.string(),
        summary: z.string(),
        points: z.array(z.string()),
        image: z.string(),
        alt: z.string(),
        /** Crop of the 1440×900 screenshot: magnification, then left/top offset in % of the image. */
        zoom: z.number(),
        x: z.number(),
        y: z.number(),
      })),
    }),
    agents: sectionHeading.extend({
      points: z.array(z.string()),
      clientsLabel: z.string(),
      clients: z.array(z.string()),
      flow: z.object({ label: z.string(), steps: z.array(z.string()) }),
      snippets: z.array(z.object({ id: z.string(), label: z.string(), code: z.string() })),
      link,
    }),
    sources: sectionHeading.extend({
      categories: z.array(z.object({ id: z.string(), label: z.string() })),
    }),
    databases: z.array(z.object({
      name: z.string(),
      /** Must match an id in `sources.categories`. */
      category: z.string(),
      /** primary = built in, supported = optional driver agent. */
      status: z.enum(['primary', 'supported']),
      detail: z.string(),
      /** Slug of a dedicated guide under /docs, when one exists. */
      doc: z.string().optional(),
    })),
    cta: z.object({
      title: z.string(),
      description: z.string(),
      platforms: z.array(z.object({ id: z.enum(['windows', 'macos', 'linux']), name: z.string(), note: z.string() })),
    }),
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


const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/\//g, '-'),
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    locale: z.enum(['zh', 'en']),
    slug: z.string(),
    date: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = { site, docs, roadmap, blog };

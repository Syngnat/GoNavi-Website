import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { withLocale } from '../lib/i18n';

export const prerender = true;

function markdownToText(markdown: string): string {
  const codeSegments: string[] = [];
  const protectCode = (value: string): string => {
    const token = `GONAVIDOCSCODE${codeSegments.length}TOKEN`;
    codeSegments.push(value);
    return token;
  };

  let text = markdown
    .replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '')
    .replace(/```[^\n]*\n?([\s\S]*?)```/g, (_match, code: string) => ` ${protectCode(code)} `)
    .replace(/`([^`\n]+)`/g, (_match, code: string) => protectCode(code))
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^[\t ]{0,3}#{1,6}[\t ]+/gm, '')
    .replace(/^[\t ]{0,3}>[\t ]?/gm, '')
    .replace(/^[\t ]*(?:[-*+]|\d+[.)])[\t ]+/gm, '')
    .replace(/[*_~]/g, '');

  codeSegments.forEach((code, index) => {
    text = text.replace(`GONAVIDOCSCODE${index}TOKEN`, code);
  });

  return text.replace(/\s+/g, ' ').trim();
}

export const GET: APIRoute = async () => {
  const docs = (await getCollection('docs'))
    .slice()
    .sort((a, b) =>
      a.data.locale.localeCompare(b.data.locale)
      || (a.data.order ?? 99) - (b.data.order ?? 99)
      || a.data.title.localeCompare(b.data.title),
    );

  const index = docs.map((doc) => {
    const body = 'body' in doc && typeof doc.body === 'string' ? doc.body : '';
    return {
      id: `${doc.data.locale}-${doc.data.slug}`,
      locale: doc.data.locale,
      title: doc.data.title,
      summary: doc.data.summary ?? '',
      href: withLocale(doc.data.locale, `/docs/${doc.data.slug}`),
      text: markdownToText(body),
    };
  });

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};

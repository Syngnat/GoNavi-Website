import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const siteUrl = 'https://gonavi.org';

function fail(message) {
  throw new Error(`SEO verification failed: ${message}`);
}

function read(file) {
  return readFileSync(file, 'utf8');
}

function collectLocalizedPages(directory, files = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collectLocalizedPages(path, files);
    if (entry.isFile() && entry.name === 'index.html') files.push(path);
  }
  return files;
}

function toUrlPath(file) {
  const segments = relative(distDir, file).split(sep);
  segments.pop();
  return `/${segments.join('/')}/`.replace(/\/+/g, '/');
}

for (const file of ['robots.txt', 'sitemap-index.xml', 'sitemap-0.xml', 'screenshots/01-home-workbench.png']) {
  if (!existsSync(join(distDir, file))) fail(`missing dist/${file}`);
}

const robots = read(join(distDir, 'robots.txt'));
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap-index.xml`)) fail('robots.txt does not declare sitemap-index.xml');

const sitemap = read(join(distDir, 'sitemap-0.xml'));
const pages = ['zh', 'en'].flatMap((locale) => collectLocalizedPages(join(distDir, locale)));
if (pages.length === 0) fail('no localized pages found');

for (const page of pages) {
  const html = read(page);
  const path = toUrlPath(page);
  const locale = path.startsWith('/zh/') ? 'zh' : 'en';
  const otherLocale = locale === 'zh' ? 'en' : 'zh';
  const alternatePath = path.replace(`/${locale}/`, `/${otherLocale}/`);
  const canonical = `${siteUrl}${path}`;

  for (const fragment of [
    `<link rel="canonical" href="${canonical}">`,
    `<link rel="alternate" hreflang="${locale === 'zh' ? 'zh-CN' : 'en-US'}" href="${canonical}">`,
    `<link rel="alternate" hreflang="${otherLocale === 'zh' ? 'zh-CN' : 'en-US'}" href="${siteUrl}${alternatePath}">`,
    '<link rel="alternate" hreflang="x-default"',
    '<link rel="sitemap" href="/sitemap-index.xml">',
    '<meta property="og:image" content="https://gonavi.org/screenshots/01-home-workbench.png">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<script type="application/ld+json">',
  ]) {
    if (!html.includes(fragment)) fail(`${path} is missing ${fragment}`);
  }

  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(`${path} is missing from sitemap-0.xml`);
}

for (const locale of ['zh', 'en']) {
  const home = read(join(distDir, locale, 'index.html'));
  if (!home.includes('"@type":"SoftwareApplication"')) fail(`/${locale}/ is missing SoftwareApplication JSON-LD`);
}

const root = read(join(distDir, 'index.html'));
if (!root.includes('<meta name="robots" content="noindex,follow">')) fail('root route must remain noindex');

console.log(`SEO verification passed for ${pages.length} localized pages.`);

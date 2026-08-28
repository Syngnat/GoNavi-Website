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

function extract(html, pattern, label) {
  const match = html.match(pattern);
  if (!match?.[1]) fail(`missing ${label}`);
  return match[1];
}

function parseStructuredData(html, path) {
  const raw = extract(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/, `${path} JSON-LD`);
  try {
    return JSON.parse(raw);
  } catch (error) {
    fail(`${path} JSON-LD is invalid: ${error.message}`);
  }
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
  const title = extract(html, /<title>([\s\S]*?)<\/title>/, `${path} title`);
  const description = extract(html, /<meta name="description" content="([^"]+)">/, `${path} description`);
  const structured = parseStructuredData(html, path);
  const graph = Array.isArray(structured['@graph']) ? structured['@graph'] : [];
  const pageEntity = graph.find((entry) => entry['@type'] === 'WebPage');
  const breadcrumb = graph.find((entry) => entry['@type'] === 'BreadcrumbList');

  if (title.length < 10 || title.length > 80) fail(`${path} title length is outside 10-80 characters`);
  if (description.length < 20 || description.length > 180) fail(`${path} description length is outside 20-180 characters`);
  if (!pageEntity) fail(`${path} is missing WebPage JSON-LD`);
  if (!breadcrumb || !Array.isArray(breadcrumb.itemListElement) || breadcrumb.itemListElement.length === 0) {
    fail(`${path} is missing BreadcrumbList JSON-LD`);
  }

  for (const fragment of [
    `<link rel="canonical" href="${canonical}">`,
    `<link rel="alternate" hreflang="${locale === 'zh' ? 'zh-CN' : 'en-US'}" href="${canonical}">`,
    `<link rel="alternate" hreflang="${otherLocale === 'zh' ? 'zh-CN' : 'en-US'}" href="${siteUrl}${alternatePath}">`,
    '<link rel="alternate" hreflang="x-default"',
    '<link rel="sitemap" type="application/xml" href="/sitemap-index.xml">',
    '<meta property="og:image" content="https://gonavi.org/screenshots/01-home-workbench.png">',
    '<meta name="twitter:card" content="summary_large_image">',
  ]) {
    if (!html.includes(fragment)) fail(`${path} is missing ${fragment}`);
  }

  const sitemapEntry = sitemap.match(new RegExp(`<url>[\\s\\S]*?<loc>${canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/loc>[\\s\\S]*?<\\/url>`))?.[0];
  if (!sitemapEntry) fail(`${path} is missing from sitemap-0.xml`);
  if (!sitemapEntry.includes(`hreflang="${locale === 'zh' ? 'zh-CN' : 'en-US'}"`)) fail(`${path} is missing its sitemap language alternate`);
  if (!sitemapEntry.includes(`hreflang="${otherLocale === 'zh' ? 'zh-CN' : 'en-US'}" href="${siteUrl}${alternatePath}"`)) {
    fail(`${path} is missing its paired sitemap language alternate`);
  }

  if (path.includes('/docs/') && !path.endsWith('/docs/') && !graph.some((entry) => entry['@type'] === 'TechArticle')) {
    fail(`${path} is missing TechArticle JSON-LD`);
  }
}

for (const locale of ['zh', 'en']) {
  const home = read(join(distDir, locale, 'index.html'));
  const structured = parseStructuredData(home, `/${locale}/`);
  const app = structured['@graph']?.find((entry) => entry['@type'] === 'SoftwareApplication');
  if (!app) fail(`/${locale}/ is missing SoftwareApplication JSON-LD`);
  if (app.operatingSystem !== 'Windows, macOS, Linux') fail(`/${locale}/ has incomplete operatingSystem JSON-LD`);
  if (!Array.isArray(app.featureList) || app.featureList.length < 3) fail(`/${locale}/ has incomplete featureList JSON-LD`);
}

const root = read(join(distDir, 'index.html'));
if (!root.includes('<meta name="robots" content="noindex,follow">')) fail('root route must remain noindex');

console.log(`SEO verification passed for ${pages.length} localized pages.`);

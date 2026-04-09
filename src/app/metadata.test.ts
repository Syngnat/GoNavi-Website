import fs from 'node:fs';

test('website index includes descriptive title and social metadata', () => {
  const html = fs.readFileSync('index.html', 'utf8');

  expect(html).toMatch(/<meta name="viewport"/);
  expect(html).toMatch(/<title>GoNavi \| Native Database Workflow<\/title>/);
  expect(html).toMatch(/name="description"/);
  expect(html).toMatch(/property="og:title"/);
  expect(html).toMatch(/property="og:image" content="\/og-cover\.svg"/);
  expect(html).toMatch(/rel="icon" href="\/favicon\.svg"/);
});

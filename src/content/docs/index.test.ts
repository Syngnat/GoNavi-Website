import { getDocBySlug, getDocsForLocale } from './index';

test('returns mirrored doc slugs for zh and en', () => {
  const zhDocs = getDocsForLocale('zh');
  const enDocs = getDocsForLocale('en');

  expect(zhDocs.map((doc) => doc.slug)).toEqual(enDocs.map((doc) => doc.slug));
  expect(getDocBySlug('zh', 'quick-start')?.title).toBeTruthy();
  expect(getDocBySlug('en', 'quick-start')?.title).toBeTruthy();
});

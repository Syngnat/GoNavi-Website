import { describe, expect, test } from 'vitest';
import { resolveLocale, SUPPORTED_LOCALES, withLocalePath } from './locale';

describe('locale helpers', () => {
  test('exposes the supported locale list', () => {
    expect(SUPPORTED_LOCALES).toEqual(['zh', 'en']);
  });

  test.each([undefined, '', 'fr', 'zh-CN', 'de'])('falls back to zh for %s', (input) => {
    expect(resolveLocale(input)).toBe('zh');
  });

  test('returns en only for the exact en locale', () => {
    expect(resolveLocale('en')).toBe('en');
  });

  test('prefixes internal paths with the requested locale', () => {
    expect(withLocalePath('zh', '/')).toBe('/zh');
    expect(withLocalePath('en', '/download')).toBe('/en/download');
    expect(withLocalePath('en', 'docs/getting-started')).toBe('/en/docs/getting-started');
  });
});

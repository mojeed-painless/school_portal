import { describe, expect, it } from 'vitest';

describe('test environment setup', () => {
  it('provides a matchMedia mock for jsdom', () => {
    expect(window.matchMedia).toBeTypeOf('function');

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    expect(mediaQuery).toMatchObject({
      matches: false,
      media: '(max-width: 768px)',
    });
    expect(mediaQuery.addEventListener).toBeTypeOf('function');
    expect(mediaQuery.removeEventListener).toBeTypeOf('function');
  });
});

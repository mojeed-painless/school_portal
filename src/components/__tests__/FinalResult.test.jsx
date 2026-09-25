import { describe, it, expect } from 'vitest';
import { getPrincipalComment, getRemark } from '../FinalResult';

describe('FinalResult helper logic', () => {
  it('returns correct principal comment based on average score', () => {
    expect(getPrincipalComment(85)).toBe('An outstanding performance. Keep it up!');
    expect(getPrincipalComment(65)).toBe('A very good result. Continue striving for excellence.');
    expect(getPrincipalComment(55)).toBe('A fair performance. There is room for improvement.');
    expect(getPrincipalComment(40)).toBe('Needs significant improvement. Encouraged to work harder.');
  });

  it('returns correct grade remarks', () => {
    expect(getRemark('A')).toBe('EXCELLENT');
    expect(getRemark('B')).toBe('VERY GOOD');
    expect(getRemark('C')).toBe('GOOD');
    expect(getRemark('F')).toBe('FAIL');
  });
});

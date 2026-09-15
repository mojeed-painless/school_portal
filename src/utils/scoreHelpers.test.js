import { describe, it, expect } from 'vitest';
import { normalizeScores, resolveStudentId } from './scoreHelpers';

describe('normalizeScores', () => {
  it('handles standard numerical strings and numbers', () => {
    expect(normalizeScores(85)).toBe(85);
    expect(normalizeScores('90')).toBe(90);
  });

  it('clamps values outside 0-100 range', () => {
    expect(normalizeScores(120)).toBe(100);
    expect(normalizeScores(-10)).toBe(0);
  });

  it('returns 0 for invalid inputs', () => {
    expect(normalizeScores('invalid')).toBe(0);
    expect(normalizeScores(null)).toBe(0);
  });
});

describe('resolveStudentId', () => {
  it('extracts id or _id correctly', () => {
    expect(resolveStudentId({ id: '123' })).toBe('123');
    expect(resolveStudentId({ _id: '456' })).toBe('456');
    expect(resolveStudentId(null)).toBeNull();
  });
});
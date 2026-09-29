import { describe, it, expect } from 'vitest';
import { parseSearchFilter } from '../queryParser';

describe('queryParser - parseSearchFilter', () => {
  it('extracts q, status, and term parameters correctly', () => {
    const parsed = parseSearchFilter('?q=John&status=APPROVED&term=First%20Term');
    expect(parsed).toEqual({
      query: 'John',
      status: 'approved',
      term: 'First Term',
    });
  });

  it('falls back to default filter options when parameters are missing', () => {
    const parsed = parseSearchFilter('');
    expect(parsed).toEqual({
      query: '',
      status: 'all',
      term: 'all',
    });
  });
});

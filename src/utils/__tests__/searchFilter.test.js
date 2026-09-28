import { describe, expect, it } from 'vitest';
import { debounce, filterStudentsByQuery, normalizeStudentName } from '../searchFilter';

describe('searchFilter', () => {
  it('normalizes a student name from common shape variations', () => {
    expect(normalizeStudentName({ firstName: 'Ada', lastName: 'Lovelace' })).toBe('Ada Lovelace');
    expect(normalizeStudentName({ fullName: 'Grace Hopper' })).toBe('Grace Hopper');
    expect(normalizeStudentName({ username: 'ghopper' })).toBe('ghopper');
  });

  it('filters students by a multi-token query across multiple fields', () => {
    const students = [
      { id: 'ST-001', name: 'Ada Lovelace', department: 'Science' },
      { id: 'ST-002', name: 'Grace Hopper', department: 'Arts' },
      { id: 'ST-003', name: 'Alan Turing', department: 'Science' },
    ];

    expect(filterStudentsByQuery(students, 'ada')).toEqual([students[0]]);
    expect(filterStudentsByQuery(students, 'science ada')).toEqual([students[0]]);
    expect(filterStudentsByQuery(students, 'grace')).toEqual([students[1]]);
    expect(filterStudentsByQuery(students, 'missing')).toEqual([]);
  });

  it('debounces callbacks and returns a function that can be called repeatedly', () => {
    vi.useFakeTimers();

    try {
      const fn = vi.fn();
      const debounced = debounce(fn, 200);

      debounced('first');
      debounced('second');

      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(200);

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('second');
    } finally {
      vi.useRealTimers();
    }
  });
});

import { describe, it, expect } from 'vitest';
import { calculateSubjectTotal, calculateMO, calculatePercentage } from '../EditableSpreadsheet';

describe('EditableSpreadsheet score calculations', () => {
  it('calculates subject total accurately from CA and Exam', () => {
    expect(calculateSubjectTotal(25, 60)).toBe(85);
    expect(calculateSubjectTotal('20', '50')).toBe(70);
  });

  it('calculates total marks obtained (MO)', () => {
    const subjects = [
      { ca: 20, exam: 50 },
      { ca: 15, exam: 45 },
    ];
    expect(calculateMO(subjects)).toBe(130);
  });

  it('calculates score percentage correctly', () => {
    expect(calculatePercentage(150, 200)).toBe(75);
    expect(calculatePercentage(0, 100)).toBe(0);
    expect(calculatePercentage(100, 0)).toBe(0);
  });
});

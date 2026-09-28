import { describe, expect, it } from 'vitest';
import {
  calculateSubjectTotal,
  calculateMO,
  calculatePercentage,
  calculateAverageOfScores,
  calculateStudentPercentage,
} from '../spreadsheetHelpers';

describe('spreadsheetHelpers', () => {
  it('calculates a subject total from CA and exam values', () => {
    expect(calculateSubjectTotal(25, 60)).toBe(85);
    expect(calculateSubjectTotal('20', '50')).toBe(70);
    expect(calculateSubjectTotal(undefined, '30')).toBe(30);
  });

  it('sums MO across subjects with safe number coercion', () => {
    expect(calculateMO([{ ca: 20, exam: 50 }, { ca: 15, exam: 45 }])).toBe(130);
    expect(calculateMO([{ ca: 'invalid', exam: '10' }, { ca: 10, exam: 'na' }])).toBe(20);
  });

  it('calculates percentage from obtained and total marks', () => {
    expect(calculatePercentage(150, 200)).toBe(75);
    expect(calculatePercentage(0, 100)).toBe(0);
    expect(calculatePercentage(100, 0)).toBe(0);
  });

  it('averages valid scores while ignoring zero and invalid values', () => {
    expect(calculateAverageOfScores([40, 60, 80])).toBe(60);
    expect(calculateAverageOfScores([0, 40, 80])).toBe(60);
    expect(calculateAverageOfScores(['bad', 30, '70'])).toBe(50);
  });

  it('calculates the student percentage from the subject score map', () => {
    const subjects = [{ code: 'ENG' }, { code: 'MATH' }];
    const scores = {
      ENG: { test: 30, exam: 50 },
      MATH: { test: 25, exam: 40 },
    };

    expect(calculateStudentPercentage(subjects, scores)).toBe(72.5);
  });
});

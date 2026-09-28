import { describe, it, expect } from 'vitest';
import { classifyGrade } from '../gradeClassifier';

describe('gradeClassifier - classifyGrade', () => {
  it('assigns Grade A for scores 75 and above', () => {
    expect(classifyGrade(75)).toEqual({ grade: 'A', remark: 'Excellent', isPassing: true });
    expect(classifyGrade(95)).toEqual({ grade: 'A', remark: 'Excellent', isPassing: true });
  });

  it('assigns Grade C for credit boundary scores (50-64)', () => {
    expect(classifyGrade(50)).toEqual({ grade: 'C', remark: 'Credit', isPassing: true });
    expect(classifyGrade(64)).toEqual({ grade: 'C', remark: 'Credit', isPassing: true });
  });

  it('assigns Grade F for scores below 40', () => {
    expect(classifyGrade(39)).toEqual({ grade: 'F', remark: 'Fail', isPassing: false });
    expect(classifyGrade(0)).toEqual({ grade: 'F', remark: 'Fail', isPassing: false });
  });

  it('handles invalid inputs out of 0-100 range', () => {
    expect(classifyGrade(-10)).toEqual({ grade: 'F', remark: 'Invalid Score', isPassing: false });
    expect(classifyGrade(105)).toEqual({ grade: 'F', remark: 'Invalid Score', isPassing: false });
    expect(classifyGrade('abc')).toEqual({ grade: 'F', remark: 'Invalid Score', isPassing: false });
  });
});

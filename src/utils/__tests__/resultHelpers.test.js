import { describe, it, expect } from 'vitest';
import { getClassWideStudentsFromResults } from '../resultHelpers';

describe('resultHelpers - getClassWideStudentsFromResults', () => {
  it('returns empty array when input is null, undefined, or empty', () => {
    expect(getClassWideStudentsFromResults(null)).toEqual([]);
    expect(getClassWideStudentsFromResults(undefined)).toEqual([]);
    expect(getClassWideStudentsFromResults([])).toEqual([]);
  });

  it('aggregates multiple subjects for a single student correctly', () => {
    const fixtures = [
      { studentId: 'STD-001', studentName: 'John Doe', subject: 'Mathematics', totalScore: 80 },
      { studentId: 'STD-001', studentName: 'John Doe', subject: 'English', totalScore: 70 },
      { studentId: 'STD-001', studentName: 'John Doe', subject: 'Basic Science', totalScore: 90 },
    ];

    const result = getClassWideStudentsFromResults(fixtures);

    expect(result).toHaveLength(1);
    expect(result[0].studentId).toBe('STD-001');
    expect(result[0].totalScore).toBe(240);
    expect(result[0].subjectCount).toBe(3);
    expect(result[0].averageScore).toBe(80);
  });

  it('aggregates multiple students with distinct admission numbers and calculates averages', () => {
    const fixtures = [
      { studentId: 'STD-001', studentName: 'John Doe', subject: 'Math', totalScore: 80 },
      { studentId: 'STD-002', studentName: 'Jane Smith', subject: 'Math', totalScore: 60 },
      { studentId: 'STD-002', studentName: 'Jane Smith', subject: 'English', totalScore: 65 },
    ];

    const result = getClassWideStudentsFromResults(fixtures);

    expect(result).toHaveLength(2);

    const john = result.find((s) => s.studentId === 'STD-001');
    const jane = result.find((s) => s.studentId === 'STD-002');

    expect(john.totalScore).toBe(80);
    expect(john.averageScore).toBe(80);

    expect(jane.totalScore).toBe(125);
    expect(jane.averageScore).toBe(62.5);
  });
});

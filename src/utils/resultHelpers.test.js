import { describe, it, expect } from 'vitest';
import { getClassWideStudentsFromResults } from './resultHelpers';

describe('getClassWideStudentsFromResults', () => {
  const resultsData = {
    terms: [
      {
        termName: 'First Term',
        classes: [
          {
            className: 'SS 1',
            department: 'Science',
            students: [
              { studentId: { id: 's1', name: 'Alice' }, scores: { math: 95 }, comments: 'Great' },
              { studentId: { _id: 's2', firstName: 'Bob', lastName: 'Brown' }, scores: { math: 80 }, comments: 'Solid' },
              { studentId: { id: 's1', name: 'Alice Duplicate' }, scores: { math: 100 }, comments: 'Repeat' },
              { studentId: { id: 's3' }, name: 'Charlie', scores: { math: 70 }, comments: '' },
            ],
          },
          {
            className: 'SS 1',
            department: 'Art',
            students: [
              { studentId: { id: 's4' }, name: 'Dora', scores: { math: 60 }, comments: 'Average' },
            ],
          },
        ],
      },
    ],
  };

  it('returns unique students for a class and department', () => {
    const students = getClassWideStudentsFromResults(resultsData, 'First Term', 'SS 1', 'Science');

    expect(students).toHaveLength(3);
    expect(students.map((student) => student.id)).toEqual(['s1', 's2', 's3']);
    expect(students[0].name).toBe('Alice');
    expect(students[0].scores).toEqual({ math: 95 });
  });

  it('includes all matching classes when no department is supplied', () => {
    const students = getClassWideStudentsFromResults(resultsData, 'First Term', 'SS 1');

    expect(students.map((student) => student.id)).toEqual(['s1', 's2', 's3', 's4']);
  });

  it('returns an empty list for missing term data', () => {
    expect(getClassWideStudentsFromResults({ terms: [] }, 'Second Term', 'SS 1')).toEqual([]);
  });
});

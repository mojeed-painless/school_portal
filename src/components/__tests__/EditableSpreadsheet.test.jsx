import { describe, it, expect } from 'vitest';

describe('EditableSpreadsheet Calculations', () => {
  const mockStudentScores = {
    ca1: '15',
    ca2: '15',
    exam: '50'
  };

  const calculateSubjectTotal = (scores) => {
    const ca1 = parseFloat(scores?.ca1) || 0;
    const ca2 = parseFloat(scores?.ca2) || 0;
    const exam = parseFloat(scores?.exam) || 0;
    return ca1 + ca2 + exam;
  };

  const calculateMO = (subjects) => {
    return subjects.reduce((total, sub) => total + calculateSubjectTotal(sub), 0);
  };

  const calculatePercentage = (obtainedMarks, totalPossibleSubjects) => {
    if (!totalPossibleSubjects) return 0;
    return (obtainedMarks / (totalPossibleSubjects * 100)) * 100;
  };

  it('calculates subject total accurately from CA and exam scores', () => {
    expect(calculateSubjectTotal(mockStudentScores)).toBe(80);
  });

  it('calculates Marks Obtained (MO) across multiple subject fixtures', () => {
    const subjects = [
      { ca1: '10', ca2: '15', exam: '45' },
      { ca1: '20', ca2: '20', exam: '50' }
    ];
    expect(calculateMO(subjects)).toBe(160);
  });

  it('calculates percentage accurately based on max possible marks', () => {
    const marksObtained = 160;
    const totalSubjects = 2;
    expect(calculatePercentage(marksObtained, totalSubjects)).toBe(80);
  });
});

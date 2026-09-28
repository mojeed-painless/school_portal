export const toNumber = (value, fallback = 0) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
};

export const calculateSubjectTotal = (test = 0, exam = 0) => {
  return toNumber(test) + toNumber(exam);
};

export const calculateMO = (subjects = []) => {
  return subjects.reduce((sum, subject) => {
    const ca = toNumber(subject?.ca, 0);
    const exam = toNumber(subject?.exam, 0);
    return sum + calculateSubjectTotal(ca, exam);
  }, 0);
};

export const calculatePercentage = (obtained, totalPossible) => {
  if (!totalPossible || totalPossible === 0) return 0;
  return Number(((toNumber(obtained) / toNumber(totalPossible)) * 100).toFixed(2));
};

export const calculateAverageOfScores = (scores = []) => {
  const validScores = scores
    .map((score) => toNumber(score, 0))
    .filter((score) => score > 0);

  if (validScores.length === 0) return 0;

  return Math.ceil(validScores.reduce((sum, score) => sum + score, 0) / validScores.length);
};

export const calculateStudentPercentage = (subjects = [], studentScores = {}) => {
  const subjectTotals = subjects.map((subject) => {
    const test = toNumber(studentScores?.[subject?.code]?.test, 0);
    const exam = toNumber(studentScores?.[subject?.code]?.exam, 0);
    return calculateSubjectTotal(test, exam);
  });

  const totalMarks = subjectTotals.reduce((sum, total) => sum + total, 0);
  const maxPossible = Math.max(subjects.length * 100, 0);

  return calculatePercentage(totalMarks, maxPossible);
};

import { normalizeScores, resolveStudentId } from './scoreHelpers.js';

const normalizeStudentScores = (scores = {}) => {
  if (!scores || typeof scores !== 'object' || Array.isArray(scores)) {
    return normalizeScores(scores);
  }

  return Object.fromEntries(
    Object.entries(scores).map(([subject, value]) => {
      if (value && typeof value === 'object') {
        return [
          subject,
          {
            ...value,
            test: normalizeScores(value.test),
            exam: normalizeScores(value.exam),
            score: normalizeScores(value.score),
            total: normalizeScores(value.total),
          },
        ];
      }

      return [subject, normalizeScores(value)];
    })
  );
};

export const getClassWideStudentsFromResults = (resultData, termName, className, department) => {
  if (!resultData?.terms) return [];

  const term = resultData.terms.find((t) => t.termName === termName);
  if (!term) return [];

  const seen = new Set();

  return term.classes
    .filter((cls) => {
      if (cls.className !== className) return false;
      if (department === undefined) return true;
      return cls.department === department || cls.department === '' || cls.department === undefined;
    })
    .flatMap((cls) => (cls.students || []).map((student) => {
      const id = resolveStudentId(student.studentId);
      if (!id || seen.has(id)) return null;
      seen.add(id);

      const studentInfo = typeof student.studentId === 'object' ? student.studentId : null;
      const name = studentInfo
        ? (studentInfo.name || `${studentInfo.firstName || ''} ${studentInfo.lastName || ''}`.trim())
        : undefined;

      return {
        id,
        name: name || student.name || 'Unknown',
        scores: normalizeStudentScores(student.scores),
        comments: student.comments || '',
      };
    }))
    .filter(Boolean);
};

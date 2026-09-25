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

const aggregateFlatStudentResults = (records = []) => {
  const grouped = new Map();

  for (const record of records) {
    if (!record || typeof record !== 'object') continue;

    const studentId = record.studentId ?? record.id ?? record.studentID ?? null;
    if (!studentId) continue;

    const current = grouped.get(studentId) ?? {
      studentId,
      studentName: record.studentName || record.name || 'Unknown',
      totalScore: 0,
      subjectCount: 0,
    };

    const scoreValue = Number(record.totalScore ?? record.score ?? 0);
    current.totalScore += Number.isFinite(scoreValue) ? scoreValue : 0;
    current.subjectCount += 1;
    current.studentName = current.studentName || record.studentName || record.name || 'Unknown';
    grouped.set(studentId, current);
  }

  return [...grouped.values()].map((student) => ({
    studentId: student.studentId,
    studentName: student.studentName,
    totalScore: student.totalScore,
    subjectCount: student.subjectCount,
    averageScore: student.subjectCount ? student.totalScore / student.subjectCount : 0,
  }));
};

export const getClassWideStudentsFromResults = (resultData, termName, className, department) => {
  if (!resultData) return [];

  if (Array.isArray(resultData)) {
    return aggregateFlatStudentResults(resultData);
  }

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

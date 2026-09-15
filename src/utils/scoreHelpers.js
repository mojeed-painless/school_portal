export const normalizeScores = (score) => {
  const parsed = parseFloat(score);
  if (isNaN(parsed)) return 0;
  return Math.min(Math.max(parsed, 0), 100);
};

export const resolveStudentId = (student) => {
  return student?.id || student?._id || null;
};
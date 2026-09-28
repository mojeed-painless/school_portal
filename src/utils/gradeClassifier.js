/**
 * Classifies numerical total score into standard academic grade and remark.
 * @param {number} score - Total numerical score (0-100)
 * @returns {Object} Grade and performance remark
 */
export function classifyGrade(score) {
  const numScore = Number(score);

  if (isNaN(numScore) || numScore < 0 || numScore > 100) {
    return { grade: 'F', remark: 'Invalid Score', isPassing: false };
  }

  if (numScore >= 75) {
    return { grade: 'A', remark: 'Excellent', isPassing: true };
  }
  if (numScore >= 65) {
    return { grade: 'B', remark: 'Very Good', isPassing: true };
  }
  if (numScore >= 50) {
    return { grade: 'C', remark: 'Credit', isPassing: true };
  }
  if (numScore >= 45) {
    return { grade: 'D', remark: 'Pass', isPassing: true };
  }
  if (numScore >= 40) {
    return { grade: 'E', remark: 'Fair Pass', isPassing: true };
  }

  return { grade: 'F', remark: 'Fail', isPassing: false };
}

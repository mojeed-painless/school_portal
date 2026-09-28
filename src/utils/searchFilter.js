export const normalizeStudentName = (student = {}) => {
  if (!student || typeof student !== 'object') return '';

  return (
    student.name ||
    student.fullName ||
    [student.firstName, student.lastName].filter(Boolean).join(' ') ||
    student.username ||
    student.email ||
    ''
  ).trim();
};

export const filterStudentsByQuery = (students = [], query = '') => {
  const normalizedQuery = String(query ?? '').trim().toLowerCase();

  if (!normalizedQuery) return [...students];

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);

  return students.filter((student) => {
    if (!student || typeof student !== 'object') return false;

    const values = [
      normalizeStudentName(student),
      student.id,
      student._id,
      student.admissionNo,
      student.className,
      student.department,
      student.email,
      student.username,
    ]
      .filter(Boolean)
      .map((value) => String(value).trim().toLowerCase());

    return terms.every((term) => values.some((value) => value.includes(term)));
  });
};

export const debounce = (fn, delay = 300) => {
  let timeoutId = null;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

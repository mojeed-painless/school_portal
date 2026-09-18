import React from 'react';
import { resolveStudentId } from '../../utils/scoreHelpers';

const ResultChecker = ({ student, onCheckResult }) => {
  const studentId = resolveStudentId(student);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Check Results</h3>
      <p className="text-sm text-gray-600 mb-2">Student ID: {studentId || 'N/A'}</p>
      <button
        onClick={() => onCheckResult(studentId)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        View Academic Report
      </button>
    </div>
  );
};

export default ResultChecker;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function calculateAttendancePercentage(presentDays, totalDays) {
  const safePresent = Math.max(0, Number(presentDays) || 0);
  const safeTotal = Math.max(0, Number(totalDays) || 0);
  if (safeTotal === 0) return 0;
  return Math.min(100, Number(((safePresent / safeTotal) * 100).toFixed(1)));
}

export default function AttendanceTracker({ presentDays, totalDays, onUpdate }) {
  const [present, setPresent] = useState(presentDays);
  const percentage = calculateAttendancePercentage(present, totalDays);

  const handleIncrement = () => {
    if (present < totalDays) {
      const updated = present + 1;
      setPresent(updated);
      if (onUpdate) onUpdate(updated);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow-sm" data-testid="attendance-tracker">
      <h3 className="text-sm font-semibold text-gray-700">Attendance Record</h3>
      <div className="mt-2 text-2xl font-bold text-blue-600">{percentage}%</div>
      <p className="text-xs text-gray-500 mt-1">
        {present} of {totalDays} days attended
      </p>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={present >= totalDays}
        className="mt-3 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Mark Present
      </button>
    </div>
  );
}

AttendanceTracker.propTypes = {
  presentDays: PropTypes.number,
  totalDays: PropTypes.number,
  onUpdate: PropTypes.func,
};

AttendanceTracker.defaultProps = {
  presentDays: 0,
  totalDays: 60,
  onUpdate: null,
};

import React, { useState } from 'react';

export default function ResultChecker({ onCheckResult }) {
  const [pin, setPin] = useState('');
  const [admissionNo, setAdmissionNo] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!pin || !admissionNo) return;
    onCheckResult({ pin, admissionNo });
  };

  return (
    <div className="result-checker-card p-6 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Check Term Result</h3>
      <form onSubmit={handleSearch} className="space-y-3">
        <input
          type="text"
          placeholder="Student Admission No"
          className="w-full border px-3 py-2 rounded"
          value={admissionNo}
          onChange={(e) => setAdmissionNo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Scratch Card PIN"
          className="w-full border px-3 py-2 rounded"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded">
          Check Result
        </button>
      </form>
    </div>
  );
}

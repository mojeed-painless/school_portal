import React, { useState } from 'react';

export default function InputResult({ onSaveScores }) {
  const [studentId, setStudentId] = useState('');
  const [scores, setScores] = useState({ ca: 0, exam: 0 });

  const handleSave = (e) => {
    e.preventDefault();
    onSaveScores({ studentId, scores });
  };

  return (
    <div className="input-result-card p-6 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Enter Student Marks</h3>
      <form onSubmit={handleSave} className="space-y-3">
        <input
          type="text"
          placeholder="Student ID"
          className="w-full border px-3 py-2 rounded"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="CA Score (40)"
            className="w-1/2 border px-3 py-2 rounded"
            onChange={(e) => setScores({ ...scores, ca: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Exam Score (60)"
            className="w-1/2 border px-3 py-2 rounded"
            onChange={(e) => setScores({ ...scores, exam: Number(e.target.value) })}
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
          Save Record
        </button>
      </form>
    </div>
  );
}

import React from 'react';
import { normalizeScores } from '../../utils/scoreHelpers';

const InputResult = ({ onSubmitScores }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const score = normalizeScores(formData.get('score'));
    onSubmitScores({ score });
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Score Entry</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="score"
          placeholder="Enter Score (0-100)"
          className="border rounded px-3 py-2 w-full mb-3"
          min="0"
          max="100"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Score
        </button>
      </form>
    </div>
  );
};

export default InputResult;

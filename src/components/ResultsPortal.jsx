import React from 'react';
import PropTypes from 'prop-types';
import ResultChecker from './results/ResultChecker';
import InputResult from './results/InputResult';

export default function ResultsPortal({
  onCheckResult,
  onSaveScores,
}) {
  return (
    <div className="results-portal p-6">
      <h2 className="text-2xl font-bold mb-6">Results Portal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultChecker onCheckResult={onCheckResult} />
        <InputResult onSaveScores={onSaveScores} />
      </div>
    </div>
  );
}

ResultsPortal.propTypes = {
  onCheckResult: PropTypes.func.isRequired,
  onSaveScores: PropTypes.func.isRequired,
};

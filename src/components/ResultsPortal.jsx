import React from 'react';
import ResultChecker from './results/ResultChecker';
import InputResult from './results/InputResult';

export default function ResultsPortal(props) {
  return (
    <div className="results-portal p-6">
      <h2 className="text-2xl font-bold mb-6">Results Portal</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultChecker onCheckResult={props.onCheckResult} />
        <InputResult onSaveScores={props.onSaveScores} />
      </div>
    </div>
  );
}

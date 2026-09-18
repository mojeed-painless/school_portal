import React, { useState } from 'react';
import { formatApiError } from '../utils/errorHandler';
import { logger } from '../utils/logger';

const SpreadSheet = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSpreadsheetSave = async (data) => {
    try {
      // Save operation
    } catch (err) {
      logger.error('SpreadSheet.handleSpreadsheetSave', err);
      setErrorMessage(formatApiError(err));
    }
  };

  return (
    <div className="p-4">
      {errorMessage && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-3">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SpreadSheet;

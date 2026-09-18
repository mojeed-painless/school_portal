import React, { useState, useEffect } from 'react';
import { formatApiError } from '../utils/errorHandler';
import { logger } from '../utils/logger';

const AcademicsPortal = () => {
  const [error, setError] = useState(null);

  const fetchAcademicsData = async () => {
    try {
      // API fetch call
    } catch (err) {
      const friendlyMessage = formatApiError(err);
      logger.error('AcademicsPortal.fetchAcademicsData', err);
      setError(friendlyMessage);
    }
  };

  useEffect(() => {
    fetchAcademicsData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Academics Portal</h1>
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4 border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
};

export default AcademicsPortal;

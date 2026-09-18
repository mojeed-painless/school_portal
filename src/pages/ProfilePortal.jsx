import React, { useState } from 'react';
import { formatApiError } from '../utils/errorHandler';
import { logger } from '../utils/logger';

const ProfilePortal = () => {
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const handleSave = async (profileData) => {
    try {
      // Profile save logic
      setStatusMessage({ type: 'success', text: 'Profile updated successfully.' });
    } catch (error) {
      const parsedError = formatApiError(error);
      logger.error('ProfilePortal.handleSave', error);
      setStatusMessage({ type: 'error', text: parsedError });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setStatusMessage({ type: 'error', text: 'File size exceeds the 5MB limit.' });
      return;
    }
    // File upload logic
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      {statusMessage.text && (
        <div
          className={`p-3 rounded mb-4 ${
            statusMessage.type === 'error'
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-green-100 text-green-700 border border-green-300'
          }`}
        >
          {statusMessage.text}
        </div>
      )}
      {/* Profile Form Content */}
    </div>
  );
};

export default ProfilePortal;

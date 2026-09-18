import React from 'react';

const AcademicsSettings = ({ settings, onSaveSettings }) => {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Academic Settings</h3>
      <form onSubmit={onSaveSettings}>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Academic Session</label>
          <input
            type="text"
            defaultValue={settings?.session || ''}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. 2025/2026"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AcademicsSettings;

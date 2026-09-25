import React from 'react';

export default function AcademicsSettings({ settings, onSaveSettings }) {
  return (
    <div className="academics-settings-panel p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Academic System Settings</h3>
      <form onSubmit={(e) => { e.preventDefault(); onSaveSettings(settings); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Current Academic Session</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            defaultValue={settings?.session || '2025/2026'}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Current Term</label>
          <select className="w-full border rounded px-3 py-2" defaultValue={settings?.term || 'First Term'}>
            <option value="First Term">First Term</option>
            <option value="Second Term">Second Term</option>
            <option value="Third Term">Third Term</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Settings
        </button>
      </form>
    </div>
  );
}

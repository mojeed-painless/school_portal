import React, { useState } from 'react';

export default function AddNewStudent({ onAddStudent, classOptions = [] }) {
  const [formData, setFormData] = useState({ fullName: '', admissionNo: '', targetClass: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.admissionNo) return;
    onAddStudent(formData);
    setFormData({ fullName: '', admissionNo: '', targetClass: '' });
  };

  return (
    <div className="add-student-modal p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Admission Number</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formData.admissionNo}
            onChange={(e) => setFormData({ ...formData, admissionNo: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Assigned Class</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={formData.targetClass}
            onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
          >
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
              <option key={cls.id || cls} value={cls.id || cls}>{cls.name || cls}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Register Student
        </button>
      </form>
    </div>
  );
}

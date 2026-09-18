import React from 'react';

const AddNewStudent = ({ onAddStudent }) => {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Add New Student</h3>
      <form onSubmit={onAddStudent}>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="border rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Register Student
        </button>
      </form>
    </div>
  );
};

export default AddNewStudent;

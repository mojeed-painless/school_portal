import React from 'react';
import AcademicsSettings from './academics/AcademicsSettings';
import AddNewStudent from './academics/AddNewStudent';

export default function AcademicsPortal(props) {
  return (
    <div className="academics-portal">
      <h2>Academics Management Portal</h2>
      <AcademicsSettings settings={props.settings} onSaveSettings={props.onSaveSettings} />
      <AddNewStudent onAddStudent={props.onAddStudent} classOptions={props.classOptions} />
    </div>
  );
}

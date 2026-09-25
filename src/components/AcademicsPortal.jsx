import React from 'react';
import PropTypes from 'prop-types';
import AcademicsSettings from './academics/AcademicsSettings';
import AddNewStudent from './academics/AddNewStudent';

export default function AcademicsPortal({
  settings = { session: '2025/2026', term: 'First Term' },
  onSaveSettings,
  onAddStudent,
  classOptions = [],
}) {
  return (
    <div className="academics-portal">
      <h2>Academics Management Portal</h2>
      <AcademicsSettings settings={settings} onSaveSettings={onSaveSettings} />
      <AddNewStudent onAddStudent={onAddStudent} classOptions={classOptions} />
    </div>
  );
}

AcademicsPortal.propTypes = {
  settings: PropTypes.shape({
    session: PropTypes.string,
    term: PropTypes.string,
  }),
  onSaveSettings: PropTypes.func.isRequired,
  onAddStudent: PropTypes.func.isRequired,
  classOptions: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
      }),
    ])
  ),
};

AcademicsPortal.defaultProps = {
  settings: { session: '2025/2026', term: 'First Term' },
  classOptions: [],
};

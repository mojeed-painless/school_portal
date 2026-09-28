import React from 'react';
import PropTypes from 'prop-types';

export default function StatusBadge({ status }) {
  const normalizedStatus = String(status || '').toLowerCase();

  const statusStyles = {
    approved: 'bg-green-100 text-green-800 border-green-300',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    rejected: 'bg-red-100 text-red-800 border-red-300',
    paid: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  }[normalizedStatus] || 'bg-gray-100 text-gray-800 border-gray-300';

  return (
    <span
      data-testid="status-badge"
      className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full border ${statusStyles}`}
    >
      {status ? status.toUpperCase() : 'UNKNOWN'}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string,
};

StatusBadge.defaultProps = {
  status: 'pending',
};

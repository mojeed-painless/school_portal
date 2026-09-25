import React, { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgStyles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-amber-500 text-white',
  }[type] || 'bg-gray-800 text-white';

  return (
    <div className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-sm z-50 transition-all flex items-center justify-between gap-4 min-w-[280px] ${bgStyles}`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="font-bold text-white hover:opacity-75 focus:outline-none"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AttendanceTracker, { calculateAttendancePercentage } from '../AttendanceTracker';

describe('AttendanceTracker Component & Helpers', () => {
  it('calculates correct attendance percentage', () => {
    expect(calculateAttendancePercentage(45, 60)).toBe(75);
    expect(calculateAttendancePercentage(0, 60)).toBe(0);
    expect(calculateAttendancePercentage(10, 0)).toBe(0);
  });

  it('renders attendance percentage and updates count on button click', () => {
    const handleUpdate = vi.fn();
    render(<AttendanceTracker presentDays={30} totalDays={60} onUpdate={handleUpdate} />);

    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('30 of 60 days attended')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Mark Present/i });
    fireEvent.click(button);

    expect(handleUpdate).toHaveBeenCalledWith(31);
    expect(screen.getByText('31 of 60 days attended')).toBeInTheDocument();
  });
});

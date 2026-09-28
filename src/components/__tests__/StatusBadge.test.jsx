import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatusBadge from '../StatusBadge';

describe('StatusBadge Component', () => {
  it('renders uppercase status label', () => {
    render(<StatusBadge status="approved" />);
    const badge = screen.getByTestId('status-badge');
    expect(badge.textContent).toBe('APPROVED');
  });

  it('applies green styling for approved status', () => {
    render(<StatusBadge status="approved" />);
    const badge = screen.getByTestId('status-badge');
    expect(badge.className).toContain('bg-green-100');
  });

  it('applies yellow styling for pending status', () => {
    render(<StatusBadge status="pending" />);
    const badge = screen.getByTestId('status-badge');
    expect(badge.className).toContain('bg-yellow-100');
  });

  it('falls back gracefully when status is undefined or empty', () => {
    render(<StatusBadge status="" />);
    const badge = screen.getByTestId('status-badge');
    expect(badge.textContent).toBe('UNKNOWN');
    expect(badge.className).toContain('bg-gray-100');
  });
});

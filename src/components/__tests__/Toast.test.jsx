import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Toast from '../Toast';
import { reportError } from '../../utils/errorHandler';

describe('Toast and error reporting', () => {
  it('logs a structured error and returns a user-facing message', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const message = reportError('Failed to save profile', new Error('Network down'));

    expect(message).toContain('Failed to save profile');
    expect(consoleSpy).toHaveBeenCalledWith('[AppError]', expect.stringContaining('"context": "Failed to save profile"'));

    consoleSpy.mockRestore();
  });

  it('renders and closes a toast message', () => {
    const onClose = vi.fn();

    render(<Toast message="Profile saved" type="success" onClose={onClose} duration={1000} />);

    expect(screen.getByText('Profile saved')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close notification'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

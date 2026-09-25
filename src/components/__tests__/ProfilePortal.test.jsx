import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProfilePortal from '../ProfilePortal';
import { getProfile } from '../../api/auth';

vi.mock('../../api/auth.js', () => ({
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
}));

describe('ProfilePortal', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders a toast when profile fetch fails', async () => {
    getProfile.mockRejectedValue(new Error('Network down'));

    render(<ProfilePortal />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch profile/i)).toBeInTheDocument();
    });
  });
});

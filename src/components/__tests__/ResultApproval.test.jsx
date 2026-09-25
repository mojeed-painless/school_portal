import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ResultApproval from '../ResultApproval';
import { getResultsByYear } from '../../api/results';

vi.mock('../../api/results.js', () => ({
  getResultsByYear: vi.fn(),
  getResultsByYearTermClass: vi.fn(),
  approveResults: vi.fn(),
  rejectResults: vi.fn(),
  reverseApproval: vi.fn(),
}));

vi.mock('../../api/classes.js', () => ({
  getClassSubjects: vi.fn(),
}));

describe('ResultApproval', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows a toast when fetching approval data fails', async () => {
    getResultsByYear.mockRejectedValue(new Error('API down'));

    render(<ResultApproval />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch results/i)).toBeInTheDocument();
    });
  });
});

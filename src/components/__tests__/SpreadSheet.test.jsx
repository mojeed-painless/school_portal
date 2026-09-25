import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SpreadSheet from '../SpreadSheet';
import { getApprovalStatus } from '../../api/results';

vi.mock('../../api/results.js', () => ({
  getApprovalStatus: vi.fn(),
  updateStudentScores: vi.fn(),
  submitForApproval: vi.fn(),
}));

describe('SpreadSheet', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows a toast when the approval status request fails', async () => {
    getApprovalStatus.mockRejectedValue(new Error('Network issue'));

    render(
      <SpreadSheet
        students={[{ id: 'student-1', name: 'Ada' }]}
        subjects={[{ code: 'ENG' }]}
        initialScores={{}}
        academicYear="2025-2026"
        termName="First Term"
        className="JSS 1"
        department="Science"
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch approval status/i)).toBeInTheDocument();
    });
  });
});

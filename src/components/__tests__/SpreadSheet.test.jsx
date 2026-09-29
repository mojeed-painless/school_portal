import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SpreadSheet from '../SpreadSheet';
import * as resultsApi from '../../api/results';

vi.mock('../../api/results', () => ({
  getApprovalStatus: vi.fn(),
  updateStudentScores: vi.fn(),
  submitForApproval: vi.fn(),
}));

describe('SpreadSheet Component', () => {
  const mockStudents = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    resultsApi.getApprovalStatus.mockResolvedValue({ approvalStatus: null });
  });

  it('renders table headers and student rows for the selected class', async () => {
    render(
      <SpreadSheet
        students={mockStudents}
        subjects={[{ code: 'ENG' }, { code: 'MATH' }]}
        initialScores={{
          '1': { scores: { ENG: { test: 35, exam: 55 }, MATH: { test: 30, exam: 45 } }, comments: '' },
          '2': { scores: { ENG: { test: 20, exam: 40 }, MATH: { test: 25, exam: 35 } }, comments: '' },
        }}
        academicYear="2025-2026"
        termName="First Term"
        className="JSS1-A"
        department="Science"
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });
  });

  it('calculates total marks correctly from the displayed student scores', async () => {
    render(
      <SpreadSheet
        students={mockStudents}
        subjects={[{ code: 'ENG' }, { code: 'MATH' }]}
        initialScores={{
          '1': { scores: { ENG: { test: 35, exam: 55 }, MATH: { test: 30, exam: 45 } }, comments: '' },
          '2': { scores: { ENG: { test: 20, exam: 40 }, MATH: { test: 25, exam: 35 } }, comments: '' },
        }}
        academicYear="2025-2026"
        termName="First Term"
        className="JSS1-A"
        department="Science"
      />
    );

    await waitFor(() => {
      expect(screen.getAllByText('90').length).toBeGreaterThan(0);
      expect(screen.getAllByText('60').length).toBeGreaterThan(0);
    });
  });

  it('allows changing a score input without breaking the input state', async () => {
    render(
      <SpreadSheet
        students={mockStudents}
        subjects={[{ code: 'ENG' }, { code: 'MATH' }]}
        initialScores={{
          '1': { scores: { ENG: { test: 35, exam: 55 }, MATH: { test: 30, exam: 45 } }, comments: '' },
          '2': { scores: { ENG: { test: 20, exam: 40 }, MATH: { test: 25, exam: 35 } }, comments: '' },
        }}
        academicYear="2025-2026"
        termName="First Term"
        className="JSS1-A"
        department="Science"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Edit Scores/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('spinbutton').length).toBeGreaterThan(0);
    });

    const caInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(caInput, { target: { value: '38' } });

    expect(caInput.value).toBe('38');
  });
});

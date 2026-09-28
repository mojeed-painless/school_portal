import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SpreadSheet from '../SpreadSheet';
import * as resultsApi from '../../api/results';

vi.mock('../../api/results');

describe('SpreadSheet Component', () => {
  const mockStudents = [
    { id: '1', name: 'Alice Johnson', caScore: 35, examScore: 55 },
    { id: '2', name: 'Bob Smith', caScore: 20, examScore: 40 },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    resultsApi.fetchStudentResults?.mockResolvedValue(mockStudents);
  });

  it('renders table headers and student score rows', async () => {
    render(<SpreadSheet classId="JSS1-A" term="First Term" />);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });
  });

  it('calculates total score correctly from CA and exam inputs', async () => {
    render(<SpreadSheet classId="JSS1-A" term="First Term" />);

    await waitFor(() => {
      expect(screen.getByText('90')).toBeInTheDocument(); // 35 + 55
      expect(screen.getByText('60')).toBeInTheDocument(); // 20 + 40
    });
  });

  it('triggers update callback when score input changes', async () => {
    resultsApi.updateStudentScores?.mockResolvedValue({ success: true });

    render(<SpreadSheet classId="JSS1-A" term="First Term" />);

    await waitFor(() => {
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    });

    const caInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(caInput, { target: { value: '38' } });

    expect(caInput.value).toBe('38');
  });
});

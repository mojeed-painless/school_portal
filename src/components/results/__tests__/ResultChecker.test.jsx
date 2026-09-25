import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultChecker from '../ResultChecker';
import InputResult from '../InputResult';

describe('result subcomponents', () => {
  it('submits the student result check payload', () => {
    const onCheckResult = vi.fn();

    render(<ResultChecker onCheckResult={onCheckResult} />);

    fireEvent.change(screen.getByPlaceholderText('Student Admission No'), {
      target: { value: 'STD-001' },
    });
    fireEvent.change(screen.getByPlaceholderText('Scratch Card PIN'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Check Result' }));

    expect(onCheckResult).toHaveBeenCalledWith({ pin: '123456', admissionNo: 'STD-001' });
  });

  it('submits the entered student mark record', () => {
    const onSaveScores = vi.fn();

    render(<InputResult onSaveScores={onSaveScores} />);

    fireEvent.change(screen.getByPlaceholderText('Student ID'), {
      target: { value: 'STD-002' },
    });
    fireEvent.change(screen.getByPlaceholderText('CA Score (40)'), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByPlaceholderText('Exam Score (60)'), {
      target: { value: '45' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save Record' }));

    expect(onSaveScores).toHaveBeenCalledWith({
      studentId: 'STD-002',
      scores: { ca: 30, exam: 45 },
    });
  });
});

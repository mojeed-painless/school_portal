import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AcademicsSettings from '../AcademicsSettings';
import AddNewStudent from '../AddNewStudent';

describe('Academics extracted subcomponents', () => {
  it('renders academic settings form fields', () => {
    render(
      <AcademicsSettings
        settings={{ session: '2025/2026', term: 'First Term' }}
        onSaveSettings={() => {}}
      />,
    );

    expect(screen.getByText('Academic System Settings')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2025/2026')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save settings/i })).toBeInTheDocument();
  });

  it('submits a new student form with the selected class', () => {
    const onAddStudent = vi.fn();

    render(
      <AddNewStudent
        onAddStudent={onAddStudent}
        classOptions={[{ id: 'JSS1', name: 'JSS 1' }, { id: 'SS1', name: 'SS 1' }]}
      />,
    );

    fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Alice Johnson' } });
    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'ADM-001' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'JSS1' } });
    fireEvent.click(screen.getByRole('button', { name: /register student/i }));

    expect(onAddStudent).toHaveBeenCalledWith({
      fullName: 'Alice Johnson',
      admissionNo: 'ADM-001',
      targetClass: 'JSS1',
    });
  });
});

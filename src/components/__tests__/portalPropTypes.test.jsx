import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AcademicsPortal from '../AcademicsPortal';
import ResultsPortal from '../ResultsPortal';
import ProfilePortal from '../ProfilePortal';

vi.mock('../../api/auth.js', () => ({
  getProfile: vi.fn(() => Promise.resolve({
    user: {
      firstName: 'Ada',
      lastName: 'Lovelace',
      username: 'ada',
      class: 'SS 3',
      dateOfBirth: '10 August 2009',
      gender: 'Female',
      homeAddress: 'Lagos',
      guardianName: 'John',
      contactNumber: '08000000000',
      whatsappNumber: '08000000001',
    },
  })),
  updateProfile: vi.fn(),
})); 

describe('portal prop contracts', () => {
  it('renders the major portal components with valid props', async () => {
    render(
      <AcademicsPortal
        settings={{ session: '2025/2026', term: 'First Term' }}
        onSaveSettings={vi.fn()}
        onAddStudent={vi.fn()}
        classOptions={['JSS 1', { id: 'ss3', name: 'SS 3' }]}
      />
    );
    expect(screen.getByText('Academics Management Portal')).toBeInTheDocument();

    render(
      <ResultsPortal
        onCheckResult={vi.fn()}
        onSaveScores={vi.fn()}
      />
    );
    expect(screen.getByText('Results Portal')).toBeInTheDocument();

    render(
      <ProfilePortal
        userProfile={{ id: 'student-1', fullName: 'Ada Lovelace', email: 'ada@example.com', role: 'student' }}
        onSaveProfile={vi.fn()}
        isEditing={false}
      />
    );

    expect(await screen.findByText(/Username:/i)).toBeInTheDocument();
  });
});

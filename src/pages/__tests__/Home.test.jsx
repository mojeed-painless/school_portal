import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Home from '../Home';
import { getAllClasses } from '../../api/classes';

vi.mock('../../api/classes', () => ({
  getAllClasses: vi.fn().mockResolvedValue([]),
}));

describe('Home Page Component', () => {
  it('renders the landing portal heading and primary auth CTA', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Welcome to At-Tanzeel Students Personalized Portal/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Staff Registration/i })).toBeInTheDocument();
  });

  it('switches between the login form and registration form', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const registerTab = screen.getByRole('button', { name: /Staff Registration/i });
    fireEvent.click(registerTab);

    expect(screen.getByRole('heading', { name: /Staff Registration/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back to Login/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Back to Login/i }));

    expect(screen.getByRole('heading', { name: /Login to your account/i })).toBeInTheDocument();
  });
});

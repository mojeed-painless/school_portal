import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Home from '../Home';

describe('Home Page Component', () => {
  it('renders portal hero title and quick navigation actions', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/School Portal/i)).toBeInTheDocument();
  });

  it('switches between Login and Registration tabs seamlessly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const registerTab = screen.getByRole('button', { name: /Register/i });
    fireEvent.click(registerTab);

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();

    const loginTab = screen.getByRole('button', { name: /Login/i });
    fireEvent.click(loginTab);

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { LoginCredentialsSchema } from '../../schemas/authSchemas';

describe('API Boundary Validation - src/schemas/authSchemas.js', () => {
  it('validates valid email and password credentials', () => {
    const valid = { email: 'admin@school.edu', password: 'securePassword123' };
    expect(() => LoginCredentialsSchema.parse(valid)).not.toThrow();
  });

  it('rejects invalid email formats', () => {
    const invalid = { email: 'not-an-email', password: 'securePassword123' };
    expect(() => LoginCredentialsSchema.parse(invalid)).toThrow();
  });

  it('rejects passwords shorter than 6 characters', () => {
    const invalid = { email: 'admin@school.edu', password: '123' };
    expect(() => LoginCredentialsSchema.parse(invalid)).toThrow();
  });
});

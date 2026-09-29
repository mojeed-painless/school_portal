import { describe, it, expect } from 'vitest';
import { isTokenExpired } from '../tokenValidator';

describe('tokenValidator - isTokenExpired', () => {
  it('returns true for missing or non-string tokens', () => {
    expect(isTokenExpired(null)).toBe(true);
    expect(isTokenExpired(undefined)).toBe(true);
    expect(isTokenExpired('')).toBe(true);
  });

  it('detects expired JWT token payload', () => {
    const expiredPayload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 3600 }));
    const mockToken = `header.${expiredPayload}.signature`;
    expect(isTokenExpired(mockToken)).toBe(true);
  });

  it('validates active non-expired JWT token payload', () => {
    const activePayload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }));
    const mockToken = `header.${activePayload}.signature`;
    expect(isTokenExpired(mockToken)).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import { validateBankInfo } from '../Bills';

describe('Bills Component - validateBankInfo', () => {
  it('validates correct 10-digit account details', () => {
    const result = validateBankInfo({
      bankName: 'First Bank',
      accountNumber: '0123456789',
      accountName: 'School Admin',
    });

    expect(result.isValid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('rejects invalid account numbers non-10 digits', () => {
    const result = validateBankInfo({
      bankName: 'First Bank',
      accountNumber: '12345',
      accountName: 'School Admin',
    });

    expect(result.isValid).toBe(false);
    expect(result.error).toContain('10 digits');
  });
});

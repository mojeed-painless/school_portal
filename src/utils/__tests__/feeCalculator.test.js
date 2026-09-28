import { describe, it, expect } from 'vitest';
import { calculateNetTuition } from '../feeCalculator';

describe('feeCalculator - calculateNetTuition', () => {
  it('calculates standard net total without discount or prior balance', () => {
    const result = calculateNetTuition({ baseTuition: 150000 });
    expect(result).toEqual({
      baseTuition: 150000,
      discountAmount: 0,
      outstandingBalance: 0,
      netTotal: 150000,
    });
  });

  it('applies percentage discount correctly', () => {
    const result = calculateNetTuition({ baseTuition: 100000, discountPercent: 15 });
    expect(result.discountAmount).toBe(15000);
    expect(result.netTotal).toBe(85000);
  });

  it('includes outstanding balance in the final net total', () => {
    const result = calculateNetTuition({ baseTuition: 100000, discountPercent: 10, outstandingBalance: 25000 });
    expect(result.discountAmount).toBe(10000);
    expect(result.netTotal).toBe(115000);
  });

  it('handles negative or invalid input gracefully', () => {
    const result = calculateNetTuition({ baseTuition: -5000, discountPercent: 150, outstandingBalance: -200 });
    expect(result.baseTuition).toBe(0);
    expect(result.discountAmount).toBe(0);
    expect(result.netTotal).toBe(0);
  });
});

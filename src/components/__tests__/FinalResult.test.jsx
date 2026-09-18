import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FinalResult from '../FinalResult';

describe('FinalResult Assessment Boundaries', () => {
  const getRemark = (percentage) => {
    if (percentage >= 75) return 'Distinction';
    if (percentage >= 50) return 'Pass';
    if (percentage >= 40) return 'Fair';
    return 'Fail';
  };

  const getPrincipalComment = (percentage) => {
    if (percentage >= 75) return 'An outstanding performance, keep it up.';
    if (percentage >= 50) return 'A good performance with room for improvement.';
    if (percentage >= 40) return 'Fair performance, needs to work harder.';
    return 'Poor performance, requires immediate intervention.';
  };

  it('evaluates Distinction and top comment at 75% boundary', () => {
    expect(getRemark(75)).toBe('Distinction');
    expect(getPrincipalComment(75)).toBe('An outstanding performance, keep it up.');
  });

  it('evaluates Pass and solid comment at 50% boundary', () => {
    expect(getRemark(50)).toBe('Pass');
    expect(getPrincipalComment(50)).toBe('A good performance with room for improvement.');
  });

  it('evaluates Fair and warning comment at 40% boundary', () => {
    expect(getRemark(40)).toBe('Fair');
    expect(getPrincipalComment(40)).toBe('Fair performance, needs to work harder.');
  });

  it('evaluates Fail below 40%', () => {
    expect(getRemark(39.9)).toBe('Fail');
    expect(getPrincipalComment(35)).toBe('Poor performance, requires immediate intervention.');
  });
});

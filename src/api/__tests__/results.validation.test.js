import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { updateStudentScores, saveResults } from '../results';

vi.mock('axios');

describe('API Boundary Validation - src/api/results.js', () => {
  it('throws ZodError on malformed updateStudentScores payload before making network call', async () => {
    const invalidPayload = {
      studentId: 'STD-101',
      subject: 'Mathematics',
    };

    await expect(updateStudentScores(invalidPayload)).rejects.toThrow();
    expect(axios.put).not.toHaveBeenCalled();
  });

  it('throws ZodError when score values exceed boundaries', async () => {
    const invalidScoresPayload = {
      studentId: 'STD-101',
      subject: 'Mathematics',
      term: 'First Term',
      session: '2025/2026',
      scores: {
        caScore: 50,
        examScore: 70,
      },
    };

    await expect(updateStudentScores(invalidScoresPayload)).rejects.toThrow();
    expect(axios.put).not.toHaveBeenCalled();
  });

  it('successfully passes validated payload to axios.put when payload is correct', async () => {
    const validPayload = {
      studentId: 'STD-101',
      subject: 'Mathematics',
      term: 'First Term',
      session: '2025/2026',
      scores: {
        caScore: 30,
        examScore: 50,
      },
    };

    axios.put.mockResolvedValueOnce({ data: { success: true } });

    const result = await updateStudentScores(validPayload);
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:5000/api/results/update',
      validPayload
    );
    expect(result).toEqual({ success: true });
  });

  it('throws ZodError on empty results array in saveResults before making network call', async () => {
    const invalidSavePayload = {
      classId: 'JSS1-A',
      results: [],
    };

    await expect(saveResults(invalidSavePayload)).rejects.toThrow();
    expect(axios.post).not.toHaveBeenCalled();
  });
});

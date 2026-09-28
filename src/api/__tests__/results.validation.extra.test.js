import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { updateStudentScores, saveResults } from '../results';

vi.mock('axios');

describe('API Boundary Validation - additional guards', () => {
  it('allows valid saveResults payload through schema validation', async () => {
    axios.post.mockResolvedValueOnce({ data: { saved: true } });

    const payload = {
      classId: 'JSS1-A',
      results: [
        {
          studentId: 'STD-101',
          subject: 'Mathematics',
          term: 'First Term',
          session: '2025/2026',
          scores: { caScore: 22, examScore: 44 },
        },
      ],
    };

    await expect(saveResults(payload)).resolves.toEqual({ saved: true });
    expect(axios.post).toHaveBeenCalledWith('/api/results/save', payload);
  });

  it('rejects malformed score payloads before sending any request', async () => {
    await expect(
      updateStudentScores({
        studentId: 'STD-101',
        subject: 'Mathematics',
        term: 'First Term',
        session: '2025/2026',
        scores: { caScore: -1, examScore: 40 },
      })
    ).rejects.toThrow();
    expect(axios.put).not.toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

vi.mock('axios');

describe('Results API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getResultsByYear = async (year) => {
    const response = await axios.get(`/api/results?year=${year}`);
    return response.data;
  };

  const updateStudentScores = async (studentId, payload) => {
    const response = await axios.put(`/api/results/student/${studentId}`, payload);
    return response.data;
  };

  it('calls getResultsByYear with correct endpoint and query parameter', async () => {
    const mockData = [{ id: '1', score: 85 }];
    axios.get.mockResolvedValueOnce({ data: mockData });

    const result = await getResultsByYear('2026');
    expect(axios.get).toHaveBeenCalledWith('/api/results?year=2026');
    expect(result).toEqual(mockData);
  });

  it('calls updateStudentScores with correct parameters and payload', async () => {
    const payload = { ca1: 20, exam: 60 };
    axios.put.mockResolvedValueOnce({ data: { success: true } });

    const response = await updateStudentScores('stu-123', payload);
    expect(axios.put).toHaveBeenCalledWith('/api/results/student/stu-123', payload);
    expect(response).toEqual({ success: true });
  });

  it('handles API network failure correctly', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));
    await expect(getResultsByYear('2026')).rejects.toThrow('Network Error');
  });
});

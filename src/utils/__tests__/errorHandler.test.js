import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { reportError } from '../errorHandler';

describe('errorHandler - reportError', () => {
  beforeEach(() => {
    delete window.__ERROR_SINK__;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('formats error into a structured payload with timestamp and context', () => {
    const error = new Error('Database connection failed');
    const result = reportError(error, { component: 'Bills', action: 'save' });

    expect(result.message).toBe('Database connection failed');
    expect(result.name).toBe('Error');
    expect(result.context.component).toBe('Bills');
    expect(result.context.action).toBe('save');
    expect(result.context.timestamp).toBeDefined();
  });

  it('forwards structured payload to window.__ERROR_SINK__ when registered', () => {
    const mockSink = vi.fn();
    window.__ERROR_SINK__ = mockSink;

    const error = new Error('Validation exception');
    reportError(error, { feature: 'results' });

    expect(mockSink).toHaveBeenCalledOnce();
    expect(mockSink).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Validation exception',
        context: expect.objectContaining({ feature: 'results' }),
      })
    );
  });

  it('handles string errors gracefully by converting to Error instance', () => {
    const result = reportError('Network Timeout');
    expect(result.message).toBe('Network Timeout');
    expect(result.name).toBe('Error');
  });
});

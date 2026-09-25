/**
 * Logs a structured error object and returns a clean, user-facing error message.
 * @param {string} context - Context or operational step where error occurred
 * @param {Error|object|string} error - Caught error details
 * @returns {string} User-facing feedback string
 */
export function reportError(context, error) {
  const message = error?.message || (typeof error === 'string' ? error : 'An unexpected error occurred.');

  const structuredError = {
    context,
    message,
    timestamp: new Date().toISOString(),
    stack: error?.stack || null,
  };

  console.error('[AppError]', JSON.stringify(structuredError, null, 2));

  return `${context}: ${message}`;
}

export const formatApiError = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Structured error reporting utility.
 * Formats errors and forwards structured telemetry to a central sink or error tracking service.
 *
 * Legacy signature: reportError(context, error)
 * Structured signature: reportError(error, context)
 *
 * @param {Error|string} errorOrContext - The caught error object, message string, or legacy context label
 * @param {Object|Error|string} [contextOrError={}] - Structured metadata or the legacy error value
 */
export function reportError(errorOrContext, contextOrError = {}) {
  const hasLegacyErrorArg = arguments.length > 1;
  const isLegacySignature = hasLegacyErrorArg && (
    contextOrError instanceof Error ||
    typeof contextOrError === 'string' ||
    (contextOrError && typeof contextOrError === 'object' && !('component' in contextOrError) && !('action' in contextOrError) && !('feature' in contextOrError) && !('userId' in contextOrError) && !('timestamp' in contextOrError) && !('url' in contextOrError))
  );

  if (isLegacySignature) {
    const context = errorOrContext;
    const error = contextOrError instanceof Error || typeof contextOrError === 'string'
      ? contextOrError
      : new Error(contextOrError?.message || 'An unexpected error occurred.');

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

  const error = typeof errorOrContext === 'string' ? new Error(errorOrContext) : errorOrContext;
  const context = contextOrError && typeof contextOrError === 'object' && !('message' in contextOrError) ? contextOrError : {};

  const structuredPayload = {
    message: error?.message || (typeof errorOrContext === 'string' ? errorOrContext : 'An unknown error occurred'),
    name: error?.name || 'Error',
    stack: error?.stack || null,
    context: {
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString(),
      ...context,
    },
    dsn: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_ERROR_TRACKING_DSN || null : null,
  };

  if (typeof window !== 'undefined' && typeof window.__ERROR_SINK__ === 'function') {
    window.__ERROR_SINK__(structuredPayload);
  }

  const hasGlobalSink = typeof window !== 'undefined' && typeof window.__ERROR_SINK__ === 'function';
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE !== 'production' && !hasGlobalSink) {
    console.warn('[Structured Error Report]', structuredPayload);
  }

  return structuredPayload;
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

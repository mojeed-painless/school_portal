/**
 * Checks if a mock or standard base64/JWT token is expired.
 * @param {string} token
 * @returns {boolean} True if token is missing or expired
 */
export function isTokenExpired(token) {
  if (!token || typeof token !== 'string') return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false; // Non-JWT tokens fallback to active
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
}

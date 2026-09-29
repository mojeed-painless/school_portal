/**
 * Parses search query string into structured filter parameters.
 * @param {string} searchStr
 * @returns {Object} Structured query filter object
 */
export function parseSearchFilter(searchStr) {
  if (!searchStr || typeof searchStr !== 'string') {
    return { query: '', status: 'all', term: 'all' };
  }

  const params = new URLSearchParams(searchStr.startsWith('?') ? searchStr : `?${searchStr}`);
  
  return {
    query: (params.get('q') || '').trim(),
    status: (params.get('status') || 'all').toLowerCase(),
    term: (params.get('term') || 'all').trim(),
  };
}

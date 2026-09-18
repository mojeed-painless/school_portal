export const logger = {
  info: (moduleName, message, ...args) => {
    console.log(`[INFO][${moduleName}]: ${message}`, ...args);
  },
  warn: (moduleName, message, ...args) => {
    console.warn(`[WARN][${moduleName}]: ${message}`, ...args);
  },
  error: (moduleName, error, ...args) => {
    console.error(`[ERROR][${moduleName}]:`, error, ...args);
  },
};

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: [
        'src/App.jsx',
        'src/data.js',
        'src/utils/**/*.js',
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
      exclude: [
        'node_modules/',
        'src/test/',
        'src/assets/**',
        'src/**/*.css',
        'src/**/*.test.*',
        'src/**/*.spec.*',
        'src/api/**',
        'src/components/**',
        'src/pages/**',
      ],
    },
  },
});

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    coverage: {
      provider: 'v8', // hoặc 'c8' nếu bạn dùng c8
      reporter: ['text', 'lcov'], // lcov để Sonar đọc
      reportsDirectory: 'coverage', // nơi lưu file
      all: false, // nếu true sẽ include cả file chưa test
      include: ['src/**/*.{ts,tsx,js,jsx}'], // files muốn include
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      lines: 80,
      statements: 80,
      branches: 80,
      functions: 80,
      include: ['src/**/*.{js,vue}'],
      exclude: [
        'src/main.js',
        'src/assets/data/**',
        'src/assets/scripts/datadoc.js'
      ]
    }
  }
});

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import i18n from 'laravel-react-i18n/vite';

export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      port: 3000
    }
  },
  plugins: [
    laravel({
      input: [
        'resources/js/app.js',
      ],
      refresh: true,
    }),
    react(),
    i18n(),
  ],
});

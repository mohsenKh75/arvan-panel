import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BASE_URL } from '@/apis/constants';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      figma: path.resolve(__dirname, './figma')
    }
  },
  server: {
    proxy: {
      '/prx': {
        target: 'https://api-3281216083-arvancloud-challenge.apps.ir-central1.arvancaas.ir/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prx/, '')
      }
    }
  }
});

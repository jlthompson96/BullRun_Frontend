import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('Loading Vite config...');

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/stockData':'https://thompsonserver.net',
      '/users':'https://thompsonserver.net',
    }
  }
});

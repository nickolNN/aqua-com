import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      plugins: ['babel-plugin-react-compiler'],
    }),
  ],
  root: '.',
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            const url = req.url || '';
            if (url.includes('.ts') || url.includes('.tsx') || url.includes('.js') || url.includes('.jsx')) {
              return;
            }
          });
        },
      },
    },
  },
});

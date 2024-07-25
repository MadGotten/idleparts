import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@context': '/src/context',
        '@pages': '/src/pages',
        '@hooks': '/src/hooks',
        '@assets': '/src/assets',
      },
    },
  };
});

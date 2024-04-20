import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  server: {
    port: 3333,
  },
  plugins: [react(), glsl()],
  // root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  base: '/tangible-values/',
  build: {
    outDir: '../docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});

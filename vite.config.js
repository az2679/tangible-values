import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  server: {
    port: 3333,
  },
  plugins: [react(), glsl()],
});

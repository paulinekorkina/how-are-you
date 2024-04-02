import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://paulinekorkina.github.io/',
  plugins: [vue()],
  resolve: {
    alias: {
      /* Указываем символ "@" как псевдоним для пути к директории "./src" */
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const { GENERATE_SOURCEMAP, BUILD_PATH } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [autoprefixer({}), cssnano()]
    }
  },
  base: '/',
  build: {
    outDir: BUILD_PATH,
    sourcemap: !!GENERATE_SOURCEMAP
  }
});

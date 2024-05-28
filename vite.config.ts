import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const { GENERATE_SOURCEMAP, BUILD_PATH } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: BUILD_PATH,
    sourcemap: !!GENERATE_SOURCEMAP,
  },
});

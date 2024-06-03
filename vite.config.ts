/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import mockPlugin from 'vite-plugin-mock-dev-server';

const { GENERATE_SOURCEMAP, BUILD_PATH, MOCK } = process.env;

const plugins = [react()];

if (MOCK !== 'none') {
  plugins.push(mockPlugin());
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins,
    server: {
      proxy: {
        '^/api': {
          target: 'https://example.com',
          changeOrigin: true,
          secure: false
        },
        '^/(user|repos)': {
          target: 'https://api.github.com',
          changeOrigin: true,
          secure: false
        }
      }
    },
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
    },
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : []
    },

    // https://cn.vitest.dev/guide/
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts']
    }
  };
});

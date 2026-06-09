/// <reference types="vitest/config" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server';

const { GENERATE_SOURCEMAP, BUILD_PATH, MOCK } = process.env;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const useMock = MOCK !== 'none';

  return {
    plugins: [react(), useMock && mockDevServerPlugin()],
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
    css: {
      devSourcemap: true
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    base: '/',
    build: {
      outDir: BUILD_PATH,
      sourcemap: !!GENERATE_SOURCEMAP,
      rolldownOptions: {
        output: {
          // ref: https://rolldown.rs/in-depth/manual-code-splitting
          codeSplitting: {
            groups: [
              {
                test: /node_modules\/(react|react-dom|scheduler)\//,
                name: 'react'
              },
              {
                test: /node_modules/,
                name: 'vendor'
              }
            ]
          },
          minify: {
            compress: {
              dropConsole: isProd,
              dropDebugger: isProd
            }
          }
        }
      }
    },

    // https://cn.vitest.dev/guide/
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts']
    }
  };
});

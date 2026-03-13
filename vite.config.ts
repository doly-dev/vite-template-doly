/// <reference types="vitest/config" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
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
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    base: '/',
    build: {
      outDir: BUILD_PATH,
      sourcemap: !!GENERATE_SOURCEMAP,
      // TODO vite8 重命名为 rolldownOptions
      // ref: https://cn.vite.dev/guide/migration#other-related-deprecations
      rollupOptions: {
        output: {
          // experimentalMinChunkSize: 20 * 1024,
          // TODO vite8 manualChunks 弃用函数形式，改为 codeSplitting 选项
          // ref: https://cn.vite.dev/guide/migration#remove-object-form-build-rollupoptions-output-manualchunks-and-deprecate-function-form-one
          manualChunks(id) {
            if (
              id.includes('/node_modules/react/') ||
              id.includes('/node_modules/react-dom/') ||
              id.includes('/node_modules/scheduler/')
            ) {
              return 'react';
            }
            // if (id.includes('/node_modules/')) {
            //   return 'vendor';
            // }
          }
        }
      }
    },
    // TODO vite8 esbuild drop 配置调整
    // ref: https://cn.vite.dev/guide/migration#javascript-minification-by-oxc
    esbuild: {
      drop: isProd ? ['console', 'debugger'] : []
    },

    // https://cn.vitest.dev/guide/
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts']
    }
  };
});

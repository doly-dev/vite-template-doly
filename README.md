# vite-template-doly

React + TypeScript + Vite

## 开发

本地开发

```shell
pnpm dev
```

构建

```shell
pnpm build
```

本地预览构建产物

> 如果需要本地预览构建产物，构建时 `base` 配置为 `/` 。

```shell
pnpm preview
```

分析构建产物

```shell
pnpm analyze
```

## 常见问题

### 兼容低版本浏览器？

> 参考：[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

**比如兼容 `ie11`**

安装依赖

```shell
pnpm add @vitejs/plugin-legacy terser -D
```

`vite.config.ts` 配置

```diff
+ import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    // ...,
+    legacy({
+      targets: ['ie >= 11'],
+      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
+    }),
  ],

  // ...,
  build: {
    // ...,
+    minify: 'terser',
  },
});
```

## 推荐

## 参考

- [vite](https://cn.vitejs.dev/)
- [vite-plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)

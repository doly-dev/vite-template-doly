# vite-template-doly

[React] + [TypeScript] + [Vite]

基于 [create-vite/template-react-ts] 扩展的脚手架，增加以下特性：

- 🚀 开箱即用，内置路由组件、axios请求
- ✨ 支持页面切换动画
- 🌈 样式处理，Less、Postcss(autoprefixer、cssnano)
- 🔗 本地开发 mock 数据
- 🔍 代码规范检测(eslint、stylelint、commitlint)
- 🎯 构建产物分析

## 安装

```shell
npx degit doly-dev/vite-template-doly myapp
```

```shell
cd myapp
pnpm install
pnpm dev
```

### 更多命令

```shell
pnpm dev                       # 本地开发
pnpm dev:no-mock               # 本地开发，不启用 mock
pnpm dev --mode production     # 本地开发，生产模式
pnpm build                     # 构建
pnpm preview                   # 本地预览构建产物，建议 vite.config.ts base 设置为 '/'
pnpm analyze                   # 分析构建产物
pnpm lint                      # 运行 eslint
pnpm lint:style                # 运行 stylelint
pnpm prettier                  # 运行 prettier
pnpm commit                    # 运行 commitizen
```

## 常见问题

<details>
  <summary>配置 mock 和 proxy</summary>

> 参考：[vite-plugin-mock-dev-server]、[server.proxy](https://cn.vitejs.dev/config/server-options.html#server-proxy)

</details>

<details>
  <summary>兼容低版本浏览器</summary>

> 参考：[@vitejs/plugin-legacy]

**下面是兼容 `ie11` 示例：**

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
+    terserOptions: {
+      compress: {
+        warnings: false,
+        drop_console: true,
+        drop_debugger: true,
+        pure_funcs: ['console.log']
+      }
+    }
  },
-  esbuild: {
-    drop: isProd ? ['console', 'debugger'] : []
-  }
});
```

</details>

<details>
  <summary>使用 keep-alive</summary>
  
  > 参考：[集成 keep-alive](https://doly-dev.github.io/cra-template-doly-site/latest/index.html#/docs/example-keep-alive)
</details>

<details>
  <summary>环境变量和模式</summary>
  
  > 参考：[环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)

常见的使用场景是 本地开发（mock）、本地联调（proxy）。

一般在不同环境设置不同的请求 `url` 。

<mark>本地开发</mark>时，需要使用 mock 接口数据，将请求 `url` 设置为空，请求本地服务。

```yaml
# .env.development
VITE_APP_API=''
```

<mark>本地联调</mark>时，需要通过 proxy 代理请求真实接口，避免跨域等问题。

```yaml
# .env
VITE_APP_API='https://api.example.com'
```

除此之外，还可以用 `.env.*.local` 本地变量存放用户信息等，便于本地开发调试。

</details>

<details>
  <summary>删除测试相关依赖和配置</summary>

1. 删除 `vitest.steup.ts` `src/pages/home/__snapshots__` `src/pages/home/Home.test.tsx` 文件

2. `vite.config.ts` 删除配置

```diff
- /// <reference types="vitest" />

-  // https://cn.vitest.dev/guide/
-  test: {
-    environment: 'jsdom',
-    setupFiles: ['./vitest.setup.ts']
-  }
```

3. `package.json` 删除依赖和脚本

```diff
"scripts": {
-  "test": "vitest"
},

"devDependencies": {
-  "@testing-library/jest-dom": "^6.4.5",
-  "@testing-library/react": "^15.0.7",
-  "@testing-library/user-event": "^14.5.2",
-  "jsdom": "^24.1.0",
-  "vitest": "^1.6.0",
}
```

</details>

<details>
  <summary>关闭页面切换动画</summary>

`src/router.tsx`

```diff
const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path="*"
      element={(
        <AnimatedRoutes
          routes={routes}
+         animated={false}
        />
      )}
    />
  )
);
```

</details>

<details>
  <summary>非组件模块中如何跳转页面</summary>

> 参考：[React Router]

正常页面中的跳转

```typescript
import { useNavigate } from 'react-router-dom'

function Component(){
  const navigate = useNavigate();
  return (
    <div>
      <a onClick={()=>{navigate('/path')}}></a>
    </div>
  )
}
```

非组件模块

如 `utils/utils.ts`

```typescript
import router from '@/router';

function toLoginPage() {
  router.navigate('/login');
}
```

</details>

<details>
  <summary>使用 PWA</summary>

> 参考：[vite-plugin-pwa]

安装依赖

```shell
pnpm add vite-plugin-pwa -D
```

`vite.config.ts` 配置

```diff
+ import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [
    // ...,
+  VitePWA({
+    registerType: 'autoUpdate',
+    devOptions: {
+      enabled: true
+    },
+    workbox: {
+      globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif}']
+    },
+    manifest: {
+      name: 'vite-template-doly',
+      description: 'a vite template',
+      short_name: 'VTD',
+      display: 'standalone',
+      background_color: '#ffffff',
+      theme_color: '#ffffff',
+      icons: [
+        {
+          src: '/logo.png',
+          sizes: '144x144',
+          type: 'image/png'
+        }
+      ]
+    }
+  })
  ],
  // ...
})
```

本地开发可以在浏览器开发者工具 `应用-Service workers` 查看。

_注意： 如果要取消对 Service Worker 注册，请查阅 [Unregister Service Worker](https://vite-pwa-org.netlify.app/guide/unregister-service-worker.html#unregister-service-worker)。如果只是本地开发或预览取消注册，可以在`浏览器开发工具-应用-Service Worker` 点击 “取消注册” 即可。_

</details>

<details>
  <summary>使用 Tailwind CSS</summary>

> 参考：[Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)、[Using with Preprocessors](https://tailwindcss.com/docs/using-with-preprocessors)

如果使用 Tailwind CSS 的话，不建议再使用 `less` ，可以先卸载 `pnpm rm less` ，然后将 `*.less` 文件名改为 `*.css` 。

安装 Tailwind CSS

```shell
pnpm add tailwindcss -D

npx tailwindcss init -p
```

`postcss.config.js` 配置

```diff
export default {
  plugins: {
    // ...
+   tailwindcss: {}
  }
};
```

`tailwind.config.js` 配置

```diff
/** @type {import('tailwindcss').Config} */
export default {
+ content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  //...
}
```

`src/index.css` 添加 Tailwind 指令

```diff
+ @tailwind base;
+ @tailwind components;
+ @tailwind utilities;
// ...
```

</details>

## 推荐

- [ut2] - 基础工具方法
- [util-helpers] - 业务工具方法
- [cache2] - 缓存管理
- [rc-hooks] - React Hooks
- [valtio] - 状态管理
- [doly-icons] - Bootstrap 图标 React 组件
- [antd-mobile] + [mobile-more]: 移动端UI组件
- [antd] + [antd-more]: PC端UI组件
- [mockjs] + [mockjs-extend] - 生成随机数据
- [vConsole] - 移动端调试控制台

[react]: https://react.dev/
[typescript]: https://www.typescriptlang.org/
[vite]: https://cn.vitejs.dev/
[create-vite/template-react-ts]: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts
[vite-plugin-mock-dev-server]: https://github.com/pengzhanbo/vite-plugin-mock-dev-server
[@vitejs/plugin-legacy]: https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
[valtio]: https://valtio.pmnd.rs/
[cache2]: https://www.npmjs.com/package/cache2
[mockjs]: https://github.com/nuysoft/Mock
[mockjs-extend]: https://www.npmjs.com/package/mockjs-extend
[vconsole]: https://github.com/Tencent/vConsole
[ut2]: https://caijf.github.io/ut2/index.html
[util-helpers]: https://doly-dev.github.io/util-helpers/index.html
[rc-hooks]: https://doly-dev.github.io/rc-hooks/latest/index.html
[doly-icons]: https://doly-dev.github.io/doly-icons/latest/index.html#/icons
[antd-mobile]: https://mobile.ant.design/zh/
[mobile-more]: https://doly-dev.github.io/mobile-more/latest/index.html#/
[antd]: https://ant-design.antgroup.com/index-cn
[antd-more]: https://doly-dev.github.io/mobile-more/latest/index.html#/
[React Router]: https://reactrouter.com/
[vite-plugin-pwa]: https://vite-pwa-org.netlify.app/

# vite-template-doly

[React] + [TypeScript] + [Vite]

基于 [vite-plugin-react-swc] 扩展的脚手架，增加以下特性：

- 🚀 内置基础组件，开箱即用，支持页面切换动画
- 🌈 支持 Less、Postcss(autoprefixer、cssnano)
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
pnpm start
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
  },
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
[vite-plugin-react-swc]: https://github.com/vitejs/vite-plugin-react-swc
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

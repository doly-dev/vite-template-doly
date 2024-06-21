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

> 如遇下列问题或使用场景，[请点击查阅更多信息](https://github.com/doly-dev/vite-template-doly/wiki) 。

- 配置 mock 和 proxy
- 兼容低版本浏览器
- 使用 keep-alive
- 环境变量和模式
- 删除测试相关依赖和配置
- 关闭页面切换动画
- 非组件模块中如何跳转页面
- 使用 PWA
- ...

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

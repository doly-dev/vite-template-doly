import { createHashRouter, createRoutesFromElements, Route } from 'react-router';
import defineRoutes from './utils/defineRoutes';
import AnimatedRoutes from './components/AnimatedRoutes';

/** 是否开启路由动画 */
const EnableAnimatedRoutes = true;

const routes = defineRoutes([
  {
    path: '/',
    children: [
      {
        index: true,
        element: () => import('./pages/home'),
        title: '首页'
      },
      {
        path: 'repos',
        children: [
          {
            path: 'list',
            element: () => import('./pages/repos/List'),
            title: '列表页'
          },
          {
            path: 'detail/:name',
            element: () => import('./pages/repos/Detail'),
            title: '详情页'
          }
        ]
      },
      {
        path: '*',
        element: () => import('./pages/404'),
        title: '404'
      }
    ]
  }
]);

/**
 * 路由模块。
 *
 * 在非组件模块中，页面跳转可以使用 `router.navigate` 方法。
 *
 * @see {@link https://reactrouter.com/api/data-routers/createHashRouter | createHashRouter }
 * @example
 * import router from '@/router'
 *
 * router.navigate('/page')
 */
const router = createHashRouter(
  EnableAnimatedRoutes
    ? createRoutesFromElements(<Route path="*" element={<AnimatedRoutes routes={routes} />} />)
    : routes
);

export default router;

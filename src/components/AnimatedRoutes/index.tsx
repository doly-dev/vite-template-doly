import { isArray } from 'ut2';
import { IndexRouteObject, NonIndexRouteObject, RouteObject } from 'react-router';
import AnimatedRoutes, { AnimatedRoutesProps } from './AnimatedRoutes';
import AsyncComponent, { AsyncComponentProps } from '../AsyncComponent';
import { PageLoading } from '../PageLoader';

type TCustomRoute = {
  element?: AsyncComponentProps['component'];
  title?: AsyncComponentProps['title'];
  children?: TAnimatedRouteObject[];
};
type TCustomIndexRouteObject = Omit<IndexRouteObject, 'element'> & Omit<TCustomRoute, 'children'>;
type TCustomNonIndexRouteObject = Omit<NonIndexRouteObject, 'element' | 'children'> & TCustomRoute;

export type TAnimatedRouteObject = TCustomIndexRouteObject | TCustomNonIndexRouteObject;

function transformCustomRoutes(routesConfig: TAnimatedRouteObject[]): RouteObject[] {
  return routesConfig.map(({ title, element, children, index, ...rest }) => {
    const newElement = element ? <AsyncComponent component={element} title={title} /> : element;
    const hydrateFallbackElement = <PageLoading />;
    if (index) {
      return {
        index,
        element: newElement,
        hydrateFallbackElement,
        ...rest
      };
    }
    return {
      element: newElement,
      children: isArray(children) ? transformCustomRoutes(children) : children,
      hydrateFallbackElement,
      ...rest
    };
  });
}

const WrapperAnimatedRoutes: React.FC<
  Omit<AnimatedRoutesProps, 'routes'> & { routes: TAnimatedRouteObject[] }
> = ({ routes, ...restProps }) => {
  return <AnimatedRoutes routes={transformCustomRoutes(routes)} {...restProps} />;
};

export default WrapperAnimatedRoutes;

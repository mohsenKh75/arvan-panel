import { LayoutWrapper } from '@/components/Layout/MainLayoutContainer';
import { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { privateRoutes } from './privatePaths';
import { LayoutProps } from '@/components/Layout/layoutProps';

const pages = import.meta.glob('@/pages/**/*.tsx', { eager: true });

const routes = Object.entries(pages).map(([path, module]) => {
  const PageComponent = (module as { default: ComponentType & { layoutProps?: LayoutProps } }).default;
  const routePath = path
    .replace(/^.*\/pages/, '') // Remove everything before `/pages`
    .replace(/\.tsx$/, '') // Remove `.tsx` extension
    .replace(/\/index$/, '') // route file defined with index.tsx - use folder name for pathName
    .toLowerCase(); // Make sure everything is lowercase

  const cleanPath = routePath === '/home' ? '/' : routePath;
  const layoutProps = PageComponent?.layoutProps;

  const element = privateRoutes.includes(cleanPath) ? (
    <PrivateRoute>
      <PageComponent />
    </PrivateRoute>
  ) : (
    <PageComponent />
  );

  return {
    path: routePath === '/home' ? '/' : routePath,
    element,
    handle: { layoutProps }
  };
});

export const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: routes
  }
]);

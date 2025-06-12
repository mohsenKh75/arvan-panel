import { LayoutWrapper } from '@/components/Layout/MainLayoutContainer';
import { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const pages = import.meta.glob('@/pages/**/*.tsx', { eager: true });

const routes = Object.entries(pages).map(([path, module]) => {
  const PageComponent = (module as { default: ComponentType }).default;
  const routePath = path
    .replace(/^.*\/pages/, '') // Remove everything before `/pages`
    .replace(/\.tsx$/, '') // Remove `.tsx` extension
    .replace(/\/index$/, '') // route file defined with index.tsx - use folder name for pathName
    .toLowerCase(); // Make sure everything is lowercase

  return {
    path: routePath === '/home' ? '/' : routePath,
    element: PageComponent ? <PageComponent /> : null
  };
});

export const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: routes
  }
]);

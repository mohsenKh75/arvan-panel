import { Outlet, useMatches } from 'react-router-dom';
import { Box } from '@/components/core/Box';
import { GridContainer } from '@/components/core/GridContainer';
import { classnames } from '@/utils/classnames';
import { LayoutProps } from './layoutProps';

export function MainLayoutContainer({ children }: { children: React.ReactNode }) {
  const matches = useMatches();
  const layoutProps = matches?.[matches.length - 1]?.handle as {
    layoutProps: LayoutProps;
  };

  const isCentered = layoutProps.layoutProps.position === 'centered';

  return (
    <GridContainer direction='flex-col' className='mx-auto min-h-screen h-full bg-gray-300'>
      <Box
        tag='main'
        className={classnames('flex-1 flex', {
          'items-center justify-center': isCentered
        })}
      >
        {children}
      </Box>
    </GridContainer>
  );
}
export function LayoutWrapper() {
  return (
    <MainLayoutContainer>
      <Outlet />
    </MainLayoutContainer>
  );
}

import { Outlet } from 'react-router-dom';
import { Box } from '@/components/core/Box';
import { GridContainer } from '@/components/core/GridContainer';

export function MainLayoutContainer({ children }: { children: React.ReactNode }) {
  return (
    <GridContainer direction='flex-col' className='mx-auto min-h-screen h-full bg-gray-300'>
      <Box tag='header'></Box>
      <Box tag='main' className='flex-1 flex items-center justify-center'>
        {children}
      </Box>
      <Box tag='footer' className='p-4 text-center'></Box>
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

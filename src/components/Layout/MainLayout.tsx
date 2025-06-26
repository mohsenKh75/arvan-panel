import { ReactNode } from 'react';
import { Box } from '../core/Box';
import { GridContainer } from '../core/GridContainer';
import { Typography } from '../core/Typography';
import { Button } from '../core/Button';
import { NavLink } from 'react-router-dom';
import { URLS } from '@/router/urls';
import { classnames } from '@/utils/classnames';
import { useAuth } from '@/Providers/AuthProvider';
import { Spinner } from '../core/Button/Spinner';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { logoutAction } from '@/store/authSlice';

interface Props {
  hasHeader?: boolean;
  hasSideBar?: boolean;
  children: ReactNode;
}
const sideBarItems = [
  { title: 'All Articles', link: URLS.HOME },
  { title: 'New Article', link: URLS.article }
];
export function MainLayout({ children, hasHeader, hasSideBar }: Props) {
  const { loading, user } = useAuth();
  const { request: requestLogout } = useAsyncAction({ action: logoutAction });

  return (
    <GridContainer direction='flex-col' className='relative w-full'>
      {hasHeader && (
        <GridContainer
          tag='header'
          backgroundColor='bg-neutral-bg-1-default'
          className='h-16 px-4 border-b border-neutral-st-3-default'
          alignItems='items-center'
          justifyContent='justify-between'
        >
          {loading ? (
            <Spinner color='border-primary-default' />
          ) : (
            <Typography variant='text-body-2'> welcome {user?.username}</Typography>
          )}
          <Button onClick={requestLogout} variant='secondary'>
            Logout
          </Button>
        </GridContainer>
      )}
      <GridContainer
        tag='nav'
        direction='flex-col'
        ySpacing='space-y-3'
        className='h-full absolute top-16 min-w-[20%] p-4'
        backgroundColor='bg-neutral-bg-1-default'
      >
        {hasSideBar &&
          sideBarItems.map((item) => (
            <NavLink
              key={item.link}
              to={item.link}
              className={({ isActive }) =>
                classnames('text-body-1-0 py-1 px-2 rounded-sm', {
                  'bg-primary-bg-1-default text-primary-default': isActive
                })
              }
              end
            >
              {item.title}
            </NavLink>
          ))}
      </GridContainer>
      <Box className='ml-[20%] p-4'>{children}</Box>
    </GridContainer>
  );
}

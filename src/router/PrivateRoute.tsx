// src/components/ProtectedRoute.tsx
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { URLS } from './urls';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user || localStorage.getItem('auth_token') !== null;
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={URLS.LOGIN} replace state={{ from: location }} />;
  }

  return children;
}

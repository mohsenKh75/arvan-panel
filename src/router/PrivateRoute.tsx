// src/components/ProtectedRoute.tsx

import { Navigate, useLocation } from 'react-router-dom';
import { URLS } from './urls';
import { useUser } from '@/hooks/useUser';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={URLS.LOGIN} replace state={{ from: location }} />;
  }

  return children;
}

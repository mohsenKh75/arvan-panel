import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export function useUser() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user !== null || localStorage.getItem('auth_token') !== 'undefined';

  return { user: user?.user, isLoggedIn };
}

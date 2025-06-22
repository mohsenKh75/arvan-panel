import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export function useUser() {
  const user = useSelector((state: RootState) => state.auth.user);

  const isLoggedIn = user || localStorage.getItem('auth_token') !== null;
  return { user: user?.user, isLoggedIn };
}

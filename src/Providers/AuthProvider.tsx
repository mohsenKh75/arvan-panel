import React, { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAsyncAction } from '@/hooks/useAsyncAction';
import { getCurrentUserAction } from '@/store/authSlice';
import { RootState } from '@/store/store';

interface AuthContextProps {
  isReady: boolean;
  loading: boolean;
  user: {
    id: number;
    email: string;
    username: string;
    bio: string | null;
    image: string | null;
    token: string;
  } | null;
}

const AuthContext = createContext<AuthContextProps>({
  isReady: false,
  loading: true,
  user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user?.user || null);

  const { pending } = useAsyncAction({
    action: getCurrentUserAction,
    fireOnLoad: true
  });

  const value = useMemo(
    () => ({
      isReady: !!user,
      loading: pending,
      user
    }),
    [user, pending]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

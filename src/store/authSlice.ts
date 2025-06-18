import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { apiHandler } from '@/utils/apiHandler';
import { POST_LOGIN_DATA, POST_REGISTER_DATA } from '@/apis/auth/endpints';

interface User {
  user: {
    id: number;
    email: string;
    username: string;
    bio: string | null;
    image: string | null;
    token: string;
  };
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const loginAction =
  (payload: { email: string; password: string }) =>
  async (dispatch: Dispatch): Promise<User> => {
    dispatch(setLoading(true));
    try {
      const res = await apiHandler<User, { user: typeof payload }>({
        ep: POST_LOGIN_DATA,
        method: 'POST',
        payload: { user: payload }
      });

      localStorage.setItem('auth_token', res.user.token);
      dispatch(setUser(res));
      return res;
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Login failed';
      dispatch(setError(message));
      throw new Error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const registerAction =
  (payload: { username: string; email: string; password: string }) =>
  async (dispatch: Dispatch): Promise<User> => {
    dispatch(setLoading(true));
    try {
      const res = await apiHandler<User, { user: typeof payload }>({
        ep: POST_REGISTER_DATA,
        method: 'POST',
        payload: { user: payload }
      });

      localStorage.setItem('auth_token', res.user.token);
      dispatch(setUser(res));
      return res;
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Registration failed';
      dispatch(setError(message));
      throw new Error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      localStorage.setItem('auth_token', action.payload.user.token);
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('auth_token');
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  }
});

export const { setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;

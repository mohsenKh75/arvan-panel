import { RootState } from './store';

export const selectUser = (state: RootState) => state.auth;
export const selectIsLoggedIn = (state: RootState) => Boolean(state.auth);

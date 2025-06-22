import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/authSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

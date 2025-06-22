import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ToastProvider } from './Providers/ToastProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { AuthProvider } from './Providers/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider />
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);

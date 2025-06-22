import axios from 'axios';
import axiosRetry from 'axios-retry';
import { toast } from 'react-toastify';

export const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true
});
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return (
      axiosRetry.isNetworkError(error) ||
      axiosRetry.isRetryableError(error) ||
      (error.response?.status as number) >= 500
    );
  }
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error?.response?.data;

    if (data?.errors && typeof data.errors === 'object') {
      const messages = Object.entries(data.errors).map(
        ([field, messages]) => `${field} ${(messages as Array<string>).join(', ')}`
      );
      messages.forEach((msg) => toast.error(msg));
    } else {
      const fallback = data?.message || error.message || 'An unexpected error occurred';
      toast.error(fallback);
    }
    return Promise.reject(error);
  }
);

import { BASE_URL } from '@/apis/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
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

import { BASE_URL } from '@/apis/constants';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

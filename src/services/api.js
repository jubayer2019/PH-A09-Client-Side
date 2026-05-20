import axios from 'axios';

const DEFAULT_API_URL = 'https://drivefleet-server-lovat.vercel.app';
const AUTH_TOKEN_KEY = 'drivefleet-auth-token';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
export { AUTH_TOKEN_KEY };

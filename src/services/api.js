import axios from 'axios';

const DEFAULT_API_URL = 'https://drivefleet-server-lovat.vercel.app';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL,
  withCredentials: true,
});

export default api;

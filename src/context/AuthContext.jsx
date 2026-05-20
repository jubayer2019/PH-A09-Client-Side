'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '@/services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/auth/me');
      setUser(response.data?.data ?? null);
      return response.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const register = useCallback(async ({ name, email, photo, password }) => {
    try {
      const response = await api.post('/api/auth/register', { name, email, password, photo });
      setUser(response.data?.data ?? null);
      toast.success('Welcome to DriveFleet. Registration complete.');
      return true;
    } catch (error) {
      throw new Error(error?.response?.data?.message || error?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }, [refetch]);

  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      setUser(response.data?.data ?? null);
      toast.success('Login successful.');
      return true;
    } catch (error) {
      throw new Error(error?.response?.data?.message || error?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }, [refetch]);

  const loginWithGoogle = useCallback(async () => {
    if (typeof window === 'undefined') {
      throw new Error('Google sign-in can only start in the browser.');
    }

    const baseURL = api.defaults.baseURL || process.env.NEXT_PUBLIC_API_URL;
    if (!baseURL) {
      throw new Error('API URL is missing. Set NEXT_PUBLIC_API_URL first.');
    }

    window.location.assign(new URL('/api/auth/google', baseURL).toString());
  }, []);

  const logout = useCallback(async () => {
    await api.post('/api/auth/logout');
    setUser(null);
    await refetch();
    toast.success('You are now logged out.');
    router.replace('/login');
  }, [refetch, router]);

  const value = useMemo(
    () => ({
      user,
      loading,
      register,
      login,
      loginWithGoogle,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, loading, register, login, loginWithGoogle, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used inside AuthProvider');
  }
  return context;
};

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user ?? null;
  const loading = isPending;

  const register = useCallback(async ({ name, email, photo, password }) => {
    try {
      const { error } = await authClient.signUp.email({ name, email, password });
      if (error) {
        throw new Error(error.message || 'Registration failed');
      }

      if (photo) {
        const { error: updateError } = await authClient.updateUser({ image: photo });
        if (updateError) {
          throw new Error(updateError.message || 'Registration failed');
        }
      }

      await refetch();
      toast.success('Welcome to DriveFleet. Registration complete.');
      return true;
    } finally {
      await refetch();
    }
  }, [refetch]);

  const login = useCallback(async ({ email, password }) => {
    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) {
        throw new Error(error.message || 'Login failed');
      }

      await refetch();
      toast.success('Login successful.');
      return true;
    } finally {
      await refetch();
    }
  }, [refetch]);

  const loginWithGoogle = useCallback(async () => {
    const { error } = await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
    if (error) {
      const details = [error.code, error.status, error.statusText, error.message]
        .filter(Boolean)
        .join(' | ');
      throw new Error(details || 'Google sign-in failed');
    }
  }, []);

  const logout = useCallback(async () => {
    const { error } = await authClient.signOut();
    if (error) {
      throw new Error(error.message || 'Logout failed');
    }

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

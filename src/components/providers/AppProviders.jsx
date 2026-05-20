'use client';

import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

function AppToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: theme === 'light'
          ? {
              background: '#f8fbff',
              color: '#071427',
              border: '1px solid rgba(8, 22, 49, 0.14)',
            }
          : {
              background: '#161d2f',
              color: '#f5f8ff',
              border: '1px solid rgba(255,255,255,0.15)',
            },
      }}
    />
  );
}

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <AppToaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

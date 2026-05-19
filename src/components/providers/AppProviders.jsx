'use client';

import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#161d2f',
              color: '#f5f8ff',
              border: '1px solid rgba(255,255,255,0.15)',
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

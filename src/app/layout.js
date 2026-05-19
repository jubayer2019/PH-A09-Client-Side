import { Manrope, Sora } from 'next/font/google';
import './globals.css';
import AppProviders from '@/components/providers/AppProviders';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
});

export const metadata = {
  title: 'DriveFleet | Car Rental Platform',
  description: 'Premium SaaS-style car rental platform built with Next.js and Express.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable} antialiased`}>
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

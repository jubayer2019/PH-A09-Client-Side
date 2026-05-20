'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiBars3BottomRight, HiMiniXMark } from 'react-icons/hi2';
import useAuth from '@/hooks/useAuth';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme } = useTheme();

  const panelClass = theme === 'light' ? 'bg-white/95 text-slate-900 border-slate-200/80' : 'bg-slate-900 text-slate-100 border-white/10';
  const mutedLinkClass = theme === 'light' ? 'text-slate-700 hover:text-cyan-700' : 'text-slate-200 hover:text-cyan-200';

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${theme === 'light' ? 'border-slate-200/80 bg-white/75' : 'border-white/10 bg-slate-950/70'}`}>
      <nav className="mx-auto flex h-18 w-[92%] max-w-7xl items-center justify-between py-3">
        <Link href="/" className={`text-2xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-950' : 'text-white'}`}>
          DriveFleet
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className={mutedLinkClass}>Home</Link>
          <Link href="/explore-cars" className={mutedLinkClass}>Explore Cars</Link>
          <Link href="/add-car" className={mutedLinkClass}>Add Car</Link>
          <Link href="/my-bookings" className={mutedLinkClass}>My Bookings</Link>
          <Link href="/my-added-cars" className={mutedLinkClass}>My Added Cars</Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link href="/login" className={`rounded-xl border px-4 py-2 ${theme === 'light' ? 'border-slate-300 bg-white text-slate-900' : 'border-white/20 text-slate-100'}`}>Login</Link>
              <Link href="/register" className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900">Register</Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className={`flex items-center gap-3 rounded-xl border px-3 py-1 ${theme === 'light' ? 'border-slate-300 bg-white' : 'border-white/20 bg-white/5'}`}
              >
                <Image
                  src={user?.image || user?.photo || 'https://i.ibb.co/6Jz4QfD/user.png'}
                  alt={user?.name || 'User'}
                  width={32}
                  height={32}
                  unoptimized
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className={`text-sm ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>{user?.name?.split(' ')[0] || 'Profile'}</span>
              </button>

              {profileOpen && (
                <div className={`absolute right-0 mt-2 w-52 rounded-xl border p-2 shadow-xl ${panelClass}`}>
                  <Link href="/profile" className={`block rounded-lg px-3 py-2 ${theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-100 hover:bg-white/10'}`}>Profile</Link>
                  <Link href="/add-car" className={`block rounded-lg px-3 py-2 ${theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-100 hover:bg-white/10'}`}>Add Car</Link>
                  <Link href="/my-bookings" className={`block rounded-lg px-3 py-2 ${theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-100 hover:bg-white/10'}`}>My Bookings</Link>
                  <Link href="/my-added-cars" className={`block rounded-lg px-3 py-2 ${theme === 'light' ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-100 hover:bg-white/10'}`}>My Added Cars</Link>
                  <button
                    onClick={async () => {
                      setProfileOpen(false);
                      await logout();
                    }}
                    className={`mt-1 w-full rounded-lg px-3 py-2 text-left ${theme === 'light' ? 'text-rose-700 hover:bg-rose-50' : 'text-rose-200 hover:bg-rose-500/10'}`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
          {open ? <HiMiniXMark size={28} /> : <HiBars3BottomRight size={28} />}
        </button>
      </nav>

      {open && (
        <div className={`space-y-3 border-t p-5 md:hidden ${theme === 'light' ? 'border-slate-200 bg-white/95' : 'border-white/10 bg-slate-950'}`}>
          <Link href="/" className={`block ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>Home</Link>
          <Link href="/explore-cars" className={`block ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>Explore Cars</Link>
          <Link href="/add-car" className={`block ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>Add Car</Link>
          <Link href="/my-bookings" className={`block ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>My Bookings</Link>
          <Link href="/my-added-cars" className={`block ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>My Added Cars</Link>
          {isAuthenticated && (
            <button
              onClick={async () => {
                setOpen(false);
                await logout();
              }}
              className={`w-full rounded-xl border p-2 ${theme === 'light' ? 'border-slate-300 text-slate-900' : 'border-white/20 text-slate-100'}`}
            >
              Logout
            </button>
          )}
          {!isAuthenticated && (
            <div className="flex gap-3">
              <Link href="/login" className={`w-full rounded-xl border p-2 text-center ${theme === 'light' ? 'border-slate-300 text-slate-900' : 'border-white/20 text-slate-100'}`}>Login</Link>
              <Link href="/register" className="w-full rounded-xl bg-cyan-400 p-2 text-center font-semibold text-slate-900">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

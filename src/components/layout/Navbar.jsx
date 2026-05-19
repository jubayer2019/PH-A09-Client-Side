'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HiBars3BottomRight, HiMiniXMark } from 'react-icons/hi2';
import useAuth from '@/hooks/useAuth';
import ThemeToggle from '@/components/shared/ThemeToggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 w-[92%] max-w-7xl items-center justify-between py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          DriveFleet
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-slate-200 hover:text-cyan-200">Home</Link>
          <Link href="/explore-cars" className="text-slate-200 hover:text-cyan-200">Explore Cars</Link>
          <Link href="/add-car" className="text-slate-200 hover:text-cyan-200">Add Car</Link>
          <Link href="/my-bookings" className="text-slate-200 hover:text-cyan-200">My Bookings</Link>
          <Link href="/my-added-cars" className="text-slate-200 hover:text-cyan-200">My Added Cars</Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="rounded-xl border border-white/20 px-4 py-2 text-slate-100">Login</Link>
              <Link href="/register" className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900">Register</Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center gap-3 rounded-xl border border-white/20 px-3 py-1"
              >
                <Image
                  src={user?.image || user?.photo || 'https://i.ibb.co/6Jz4QfD/user.png'}
                  alt={user?.name || 'User'}
                  width={32}
                  height={32}
                  unoptimized
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm text-slate-100">{user?.name?.split(' ')[0] || 'Profile'}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-slate-900 p-2">
                  <Link href="/profile" className="block rounded-lg px-3 py-2 text-slate-100 hover:bg-white/10">Profile</Link>
                  <Link href="/add-car" className="block rounded-lg px-3 py-2 text-slate-100 hover:bg-white/10">Add Car</Link>
                  <Link href="/my-bookings" className="block rounded-lg px-3 py-2 text-slate-100 hover:bg-white/10">My Bookings</Link>
                  <Link href="/my-added-cars" className="block rounded-lg px-3 py-2 text-slate-100 hover:bg-white/10">My Added Cars</Link>
                  <button
                    onClick={async () => {
                      setProfileOpen(false);
                      await logout();
                    }}
                    className="mt-1 w-full rounded-lg px-3 py-2 text-left text-rose-200 hover:bg-rose-500/10"
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
        <div className="space-y-3 border-t border-white/10 bg-slate-950 p-5 md:hidden">
          <Link href="/" className="block text-slate-100">Home</Link>
          <Link href="/explore-cars" className="block text-slate-100">Explore Cars</Link>
          <Link href="/add-car" className="block text-slate-100">Add Car</Link>
          <Link href="/my-bookings" className="block text-slate-100">My Bookings</Link>
          <Link href="/my-added-cars" className="block text-slate-100">My Added Cars</Link>
          {isAuthenticated && (
            <button
              onClick={async () => {
                setOpen(false);
                await logout();
              }}
              className="w-full rounded-xl border border-white/20 p-2 text-slate-100"
            >
              Logout
            </button>
          )}
          {!isAuthenticated && (
            <div className="flex gap-3">
              <Link href="/login" className="w-full rounded-xl border border-white/20 p-2 text-center text-slate-100">Login</Link>
              <Link href="/register" className="w-full rounded-xl bg-cyan-400 p-2 text-center font-semibold text-slate-900">Register</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

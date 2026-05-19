'use client';

import Image from 'next/image';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import useAuth from '@/hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <MainLayout>
        <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black text-white">My Profile</h1>
          <p className="mt-2 text-slate-300">Manage your account identity used across DriveFleet bookings.</p>

          <div className="mt-6 flex items-center gap-4">
            <Image
              src={user?.image || user?.photo || 'https://i.ibb.co/6Jz4QfD/user.png'}
              alt={user?.name || 'User'}
              width={80}
              height={80}
              unoptimized
              className="h-20 w-20 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-white">{user?.name}</h2>
              <p className="text-slate-300">{user?.email}</p>
            </div>
          </div>
        </section>
      </MainLayout>
    </ProtectedRoute>
  );
}

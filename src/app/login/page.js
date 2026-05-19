'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa6';
import MainLayout from '@/layouts/MainLayout';
import useAuth from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(formData);
      router.push('/');
    } catch (error) {
      toast.error(error?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      toast.error(error?.message || 'Google sign-in failed');
    }
  };

  return (
    <MainLayout>
      <section className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-black text-white">Welcome Back</h1>
        <p className="mt-2 text-slate-300">Log in to continue managing your premium rentals.</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100"
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100"
            onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
          />
          <button className="w-full rounded-xl bg-cyan-400 p-3 font-semibold text-slate-900">Login</button>
        </form>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 p-3 text-slate-100"
        >
          <FaGoogle /> Login with Gmail
        </button>

        <p className="mt-4 text-sm text-slate-300">
          New here? <Link href="/register" className="text-cyan-200">Create account</Link>
        </p>
      </section>
    </MainLayout>
  );
}

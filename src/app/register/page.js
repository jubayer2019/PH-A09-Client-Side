'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa6';
import MainLayout from '@/layouts/MainLayout';
import useAuth from '@/hooks/useAuth';

const validatePassword = (password) => {
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  return hasMinLength && hasUppercase && hasLowercase;
};

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    password: '',
  });

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validatePassword(formData.password)) {
      toast.error('Password must be 6+ chars with uppercase and lowercase letters.');
      return;
    }

    try {
      await register(formData);
      router.push('/');
    } catch (error) {
      toast.error(error?.message || 'Registration failed');
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      toast.error(error?.message || 'Google sign-in failed');
    }
  };

  return (
    <MainLayout>
      <section className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-black text-white">Create Account</h1>
        <p className="mt-2 text-slate-300">Start your DriveFleet journey in under a minute.</p>
        <p className="mt-2 text-sm text-slate-300">Accounts are stored in the MongoDB-backed server.</p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <input
            type="text"
            required
            placeholder="Name"
            className="w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100"
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100"
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            type="url"
            placeholder="Photo URL"
            className="w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100"
            onChange={(event) => setFormData((prev) => ({ ...prev, photo: event.target.value }))}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100"
            onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
          />
          <button className="w-full rounded-xl bg-cyan-400 p-3 font-semibold text-slate-900">Register</button>
        </form>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 p-3 text-slate-100"
        >
          <FaGoogle /> Continue with Gmail
        </button>

        <p className="mt-4 text-sm text-slate-300">
          Already have an account? <Link href="/login" className="text-cyan-200">Login</Link>
        </p>
      </section>
    </MainLayout>
  );
}

'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import BookingModal from '@/components/booking/BookingModal';
import ErrorState from '@/components/shared/ErrorState';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import MainLayout from '@/layouts/MainLayout';
import { fetchCarById } from '@/services/carService';
import useAuth from '@/hooks/useAuth';
import { useTheme } from '@/context/ThemeContext';

export default function CarDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const loadCar = useCallback(async () => {
    try {
      const response = await fetchCarById(id);
      setCar(response.data);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load car details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCar();
  }, [loadCar]);

  if (loading) return <MainLayout><LoadingSpinner /></MainLayout>;
  if (error) return <MainLayout><ErrorState title="Details unavailable" message={error} /></MainLayout>;

  const cardClass = theme === 'light' ? 'border-slate-200 bg-white/85 text-slate-900' : 'border-white/10 bg-white/5 text-slate-100';
  const statClass = theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-900 text-slate-200';
  const mutedTextClass = theme === 'light' ? 'text-slate-700' : 'text-slate-300';

  return (
    <MainLayout>
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative h-107.5 overflow-hidden rounded-2xl">
            <Image
              src={car.image}
              alt={car.carName}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="relative h-24 overflow-hidden rounded-xl">
              <Image src={car.image} alt={`${car.carName} exterior`} fill unoptimized sizes="33vw" className="object-cover" />
            </div>
            <div className="relative h-24 overflow-hidden rounded-xl">
              <Image src={car.image} alt={`${car.carName} interior`} fill unoptimized sizes="33vw" className="object-cover" />
            </div>
            <div className="relative h-24 overflow-hidden rounded-xl">
              <Image src={car.image} alt={`${car.carName} side profile`} fill unoptimized sizes="33vw" className="object-cover" />
            </div>
          </div>
        </div>

        <div className={`rounded-2xl border p-6 ${cardClass}`}>
          <h1 className={`text-4xl font-black ${theme === 'light' ? 'text-slate-950' : 'text-white'}`}>{car.carName}</h1>
          <p className={`mt-3 ${mutedTextClass}`}>{car.description}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <p className={`rounded-xl p-3 ${statClass}`}>Type: {car.carType}</p>
            <p className={`rounded-xl p-3 ${statClass}`}>Seats: {car.seatCapacity}</p>
            <p className={`rounded-xl p-3 ${statClass}`}>Location: {car.pickupLocation}</p>
            <p className={`rounded-xl p-3 ${statClass}`}>Bookings: {car.bookingCount}</p>
            <p className={`rounded-xl p-3 ${statClass}`}>Owner: {car.ownerEmail}</p>
            <p className={`rounded-xl p-3 ${car.availability ? (theme === 'light' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-900/40 text-emerald-200') : (theme === 'light' ? 'bg-rose-100 text-rose-800' : 'bg-rose-900/40 text-rose-200')}`}>
              {car.availability ? 'Available' : 'Unavailable'}
            </p>
          </div>

          <p className={`mt-6 text-3xl font-bold ${theme === 'light' ? 'text-cyan-700' : 'text-cyan-200'}`}>${car.dailyRentPrice}/day</p>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                toast.error('Please login to book this car.');
                return;
              }
              setShowModal(true);
            }}
            className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-900"
          >
            Book Now
          </button>
        </div>
      </section>

      {showModal && <BookingModal car={car} onClose={() => setShowModal(false)} onBooked={loadCar} />}
    </MainLayout>
  );
}

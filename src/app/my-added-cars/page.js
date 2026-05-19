'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import ErrorState from '@/components/shared/ErrorState';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { deleteCar, fetchMyCars, updateCar } from '@/services/carService';

export default function MyAddedCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [carToDelete, setCarToDelete] = useState(null);

  const loadCars = useCallback(async () => {
    try {
      const response = await fetchMyCars();
      setCars(response.data);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load your cars.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleDelete = async () => {
    if (!carToDelete) return;

    await deleteCar(carToDelete._id);
    toast.success('Car deleted.');
    setCarToDelete(null);
    loadCars();
  };

  const handleQuickUpdate = async (car) => {
    await updateCar(car._id, {
      availability: !car.availability,
      description: car.description,
      image: car.image,
      carType: car.carType,
      pickupLocation: car.pickupLocation,
      dailyRentPrice: car.dailyRentPrice,
    });
    toast.success('Car availability updated.');
    loadCars();
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <h1 className="text-3xl font-black text-white">My Added Cars</h1>
        {loading && <LoadingSpinner text="Loading your fleet..." />}
        {error && <ErrorState title="Could not load cars" message={error} />}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {cars.map((car) => (
            <article key={car._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="relative h-44 w-full overflow-hidden rounded-xl">
                <Image
                  src={car.image}
                  alt={car.carName}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{car.carName}</h3>
              <p className="text-slate-300">${car.dailyRentPrice}/day</p>
              <p className="text-slate-300">{car.availability ? 'Available' : 'Unavailable'}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => handleQuickUpdate(car)} className="rounded-xl border border-white/20 px-4 py-2 text-slate-100">Update</button>
                <button onClick={() => setCarToDelete(car)} className="rounded-xl bg-rose-400 px-4 py-2 font-semibold text-slate-950">Delete</button>
              </div>
            </article>
          ))}
        </div>

        {carToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold text-white">Delete Car Listing</h3>
              <p className="mt-2 text-slate-300">
                Are you sure you want to remove {carToDelete.carName} from your fleet?
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setCarToDelete(null)}
                  className="rounded-xl border border-white/20 px-4 py-2 text-slate-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="rounded-xl bg-rose-400 px-4 py-2 font-semibold text-slate-950"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </ProtectedRoute>
  );
}

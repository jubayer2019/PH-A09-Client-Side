'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import ErrorState from '@/components/shared/ErrorState';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { deleteCar, fetchMyCars, updateCar } from '@/services/carService';
import { useTheme } from '@/context/ThemeContext';
import { formatBDTPrice } from '@/utils/formatCurrency';

export default function MyAddedCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [carToDelete, setCarToDelete] = useState(null);
  const [carToEdit, setCarToEdit] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const { theme } = useTheme();

  const dialogClass = theme === 'light' ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-slate-900 text-slate-100';
  const mutedTextClass = theme === 'light' ? 'text-slate-700' : 'text-slate-300';
  const inputClass = theme === 'light'
    ? 'w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-400'
    : 'w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400';
  const labelClass = theme === 'light' ? 'text-slate-700' : 'text-slate-200';

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

  const openEditModal = (car) => {
    setCarToEdit(car);
    setEditForm({
      dailyRentPrice: String(car.dailyRentPrice ?? ''),
      description: car.description ?? '',
      availability: Boolean(car.availability),
      image: car.image ?? '',
      carType: car.carType ?? '',
      pickupLocation: car.pickupLocation ?? '',
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!carToEdit || !editForm) return;

    setSaving(true);
    try {
      await updateCar(carToEdit._id, {
        dailyRentPrice: Number(editForm.dailyRentPrice),
        description: editForm.description,
        availability: editForm.availability,
        image: editForm.image,
        carType: editForm.carType,
        pickupLocation: editForm.pickupLocation,
      });
      toast.success('Car updated successfully.');
      setCarToEdit(null);
      setEditForm(null);
      loadCars();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update car.');
    } finally {
      setSaving(false);
    }
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
              <p className="text-slate-300">{formatBDTPrice(car.dailyRentPrice)}/day</p>
              <p className="text-slate-300">{car.availability ? 'Available' : 'Unavailable'}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => openEditModal(car)} className="rounded-xl border border-white/20 px-4 py-2 text-slate-100">Update</button>
                <button onClick={() => setCarToDelete(car)} className="rounded-xl bg-rose-400 px-4 py-2 font-semibold text-slate-950">Delete</button>
              </div>
            </article>
          ))}
        </div>

        {carToEdit && editForm && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme === 'light' ? 'bg-slate-900/35' : 'bg-slate-950/70'}`}>
            <form onSubmit={handleEditSubmit} className={`w-full max-w-2xl rounded-2xl border p-6 ${dialogClass}`}>
              <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-slate-950' : 'text-white'}`}>Update Car</h3>
              <p className={`mt-2 ${mutedTextClass}`}>Edit only the fields owners are allowed to change.</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className={`space-y-2 md:col-span-1 ${labelClass}`}>
                  <span className="text-sm font-medium">Price</span>
                  <input
                    type="number"
                    min="0"
                    value={editForm.dailyRentPrice}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, dailyRentPrice: event.target.value }))}
                    className={inputClass}
                    required
                  />
                </label>

                <label className={`space-y-2 md:col-span-1 ${labelClass}`}>
                  <span className="text-sm font-medium">Type</span>
                  <input
                    type="text"
                    value={editForm.carType}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, carType: event.target.value }))}
                    className={inputClass}
                    required
                  />
                </label>

                <label className={`space-y-2 md:col-span-2 ${labelClass}`}>
                  <span className="text-sm font-medium">Description</span>
                  <textarea
                    value={editForm.description}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, description: event.target.value }))}
                    className={`${inputClass} h-32`}
                    required
                  />
                </label>

                <label className={`space-y-2 md:col-span-2 ${labelClass}`}>
                  <span className="text-sm font-medium">Image</span>
                  <input
                    type="url"
                    value={editForm.image}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, image: event.target.value }))}
                    className={inputClass}
                    required
                  />
                </label>

                <label className={`space-y-2 md:col-span-2 ${labelClass}`}>
                  <span className="text-sm font-medium">Location</span>
                  <input
                    type="text"
                    value={editForm.pickupLocation}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, pickupLocation: event.target.value }))}
                    className={inputClass}
                    required
                  />
                </label>

                <label className={`flex items-center gap-2 md:col-span-2 ${labelClass}`}>
                  <input
                    type="checkbox"
                    checked={editForm.availability}
                    onChange={(event) => setEditForm((prev) => ({ ...prev, availability: event.target.checked }))}
                  />
                  <span className="text-sm font-medium">Availability</span>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCarToEdit(null);
                    setEditForm(null);
                  }}
                  className={`rounded-xl border px-4 py-2 ${theme === 'light' ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-white/20 text-slate-200 hover:bg-white/10'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {carToDelete && (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${theme === 'light' ? 'bg-slate-900/35' : 'bg-slate-950/70'}`}>
            <div className={`w-full max-w-md rounded-2xl border p-6 ${dialogClass}`}>
              <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-slate-950' : 'text-white'}`}>Delete Car Listing</h3>
              <p className={`mt-2 ${mutedTextClass}`}>
                Are you sure you want to remove {carToDelete.carName} from your fleet?
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setCarToDelete(null)}
                  className={`rounded-xl border px-4 py-2 ${theme === 'light' ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-white/20 text-slate-200 hover:bg-white/10'}`}
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

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import { addCar } from '@/services/carService';
import { CAR_TYPES } from '@/utils/constants';

export default function AddCarPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    carName: '',
    dailyRentPrice: '',
    carType: 'SUV',
    image: '',
    seatCapacity: '',
    pickupLocation: '',
    description: '',
    availability: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addCar({
        ...formData,
        dailyRentPrice: Number(formData.dailyRentPrice),
        seatCapacity: Number(formData.seatCapacity),
      });
      toast.success('Car added to your fleet successfully.');
      router.push('/my-added-cars');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add car.');
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <section className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-black text-white">Add a New Car</h1>
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <input required placeholder="Car Name" className="rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100" onChange={(event) => setFormData((prev) => ({ ...prev, carName: event.target.value }))} />
            <input required type="number" placeholder="Daily Price" className="rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100" onChange={(event) => setFormData((prev) => ({ ...prev, dailyRentPrice: event.target.value }))} />
            <select className="rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100" onChange={(event) => setFormData((prev) => ({ ...prev, carType: event.target.value }))}>
              {CAR_TYPES.map((type) => <option key={type}>{type}</option>)}
            </select>
            <input required type="url" placeholder="Image URL" className="rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100" onChange={(event) => setFormData((prev) => ({ ...prev, image: event.target.value }))} />
            <input required type="number" placeholder="Seat Capacity" className="rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100" onChange={(event) => setFormData((prev) => ({ ...prev, seatCapacity: event.target.value }))} />
            <input required placeholder="Pickup Location" className="rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100" onChange={(event) => setFormData((prev) => ({ ...prev, pickupLocation: event.target.value }))} />
            <textarea required placeholder="Description" className="md:col-span-2 h-28 rounded-xl border border-white/20 bg-slate-950 p-3 text-slate-100" onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))} />
            <label className="md:col-span-2 flex items-center gap-2 text-slate-200">
              <input type="checkbox" defaultChecked onChange={(event) => setFormData((prev) => ({ ...prev, availability: event.target.checked }))} /> Available now
            </label>
            <button className="md:col-span-2 rounded-xl bg-cyan-400 p-3 font-semibold text-slate-900">Add Car</button>
          </form>
        </section>
      </MainLayout>
    </ProtectedRoute>
  );
}

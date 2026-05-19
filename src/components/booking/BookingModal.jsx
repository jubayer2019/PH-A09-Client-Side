'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { createBooking } from '@/services/bookingService';

export default function BookingModal({ car, onClose, onBooked }) {
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createBooking({
        carId: car._id,
        bookingDate: new Date().toISOString(),
        driverNeeded,
        specialNote,
      });
      toast.success('Booking confirmed. Your trip is reserved.');
      onBooked?.();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to complete booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md">
      <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 p-6">
        <h3 className="text-2xl font-semibold text-white">Book {car.carName}</h3>
        <p className="mt-2 text-sm text-slate-300">Base rent: ${car.dailyRentPrice}/day. Private chauffeur adds $45.</p>

        <div className="mt-4 space-y-4">
          <label className="flex items-center gap-2 text-slate-200">
            <input
              type="checkbox"
              checked={driverNeeded}
              onChange={(event) => setDriverNeeded(event.target.checked)}
            />
            Driver Needed
          </label>

          <textarea
            value={specialNote}
            onChange={(event) => setSpecialNote(event.target.value)}
            placeholder="Any pickup preferences or extra request?"
            className="h-28 w-full rounded-xl border border-white/15 bg-slate-950 p-3 text-slate-100 outline-none"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/20 px-4 py-2 text-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 disabled:opacity-60"
          >
            {submitting ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}

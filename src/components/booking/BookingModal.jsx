'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { createBooking } from '@/services/bookingService';
import { useTheme } from '@/context/ThemeContext';
import { formatBDTPrice } from '@/utils/formatCurrency';

export default function BookingModal({ car, onClose, onBooked }) {
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { theme } = useTheme();

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
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md ${theme === 'light' ? 'bg-slate-900/35' : 'bg-slate-950/70'}`}>
      <form onSubmit={handleSubmit} className={`w-full max-w-xl rounded-2xl border p-6 ${theme === 'light' ? 'border-slate-200 bg-white text-slate-900' : 'border-white/10 bg-slate-900 text-slate-100'}`}>
        <h3 className={`text-2xl font-semibold ${theme === 'light' ? 'text-slate-950' : 'text-white'}`}>Book {car.carName}</h3>
        <p className={`mt-2 text-sm ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
          Base rent: {formatBDTPrice(car.dailyRentPrice)}/day. Private chauffeur adds {formatBDTPrice(45)}.
        </p>

        <div className="mt-4 space-y-4">
          <label className={`flex items-center gap-2 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
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
            className={`h-28 w-full rounded-xl border p-3 outline-none ${theme === 'light' ? 'border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-500' : 'border-white/15 bg-slate-950 text-slate-100 placeholder:text-slate-400'}`}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`rounded-xl border px-4 py-2 ${theme === 'light' ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-white/20 text-slate-200'}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !car.availability}
            className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900 disabled:opacity-60"
            title={!car.availability ? 'This car is not available' : ''}
          >
            {submitting ? 'Booking...' : !car.availability ? 'Unavailable' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}

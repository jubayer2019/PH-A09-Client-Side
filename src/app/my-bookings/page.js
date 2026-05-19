'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ErrorState from '@/components/shared/ErrorState';
import { fetchMyBookings } from '@/services/bookingService';
import { BOOKING_STATUS_COLORS } from '@/utils/constants';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        const response = await fetchMyBookings();
        setBookings(response.data);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <ProtectedRoute>
      <MainLayout>
        <h1 className="text-3xl font-black text-white">My Bookings</h1>

        {loading && <LoadingSpinner text="Loading your reservations..." />}
        {error && <ErrorState title="Could not load bookings" message={error} />}

        {!loading && !error && (
          <>
            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/10 md:block">
              <table className="w-full text-left text-sm text-slate-200">
                <thead className="bg-white/5 text-slate-300">
                  <tr>
                    <th className="p-4">Car Name</th>
                    <th className="p-4">Booking Date</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Driver Needed</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-t border-white/10">
                      <td className="p-4">{booking.carId?.carName || 'Car removed'}</td>
                      <td className="p-4">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                      <td className="p-4">${booking.totalPrice}</td>
                      <td className="p-4">{booking.driverNeeded ? 'Yes' : 'No'}</td>
                      <td className="p-4">
                        <span className={`rounded-full px-3 py-1 text-xs ${BOOKING_STATUS_COLORS[booking.status]}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4 md:hidden">
              {bookings.map((booking) => (
                <article key={booking._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold text-white">{booking.carId?.carName || 'Car removed'}</h3>
                  <p className="mt-2 text-slate-300">Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  <p className="text-slate-300">Price: ${booking.totalPrice}</p>
                  <p className="text-slate-300">Driver: {booking.driverNeeded ? 'Yes' : 'No'}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </MainLayout>
    </ProtectedRoute>
  );
}

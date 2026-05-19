import api from './api';

export const createBooking = async (payload) => {
  const response = await api.post('/api/bookings', payload);
  return response.data;
};

export const fetchMyBookings = async () => {
  const response = await api.get('/api/bookings');
  return response.data;
};

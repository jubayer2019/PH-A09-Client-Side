import api from './api';

export const fetchCars = async (params = {}) => {
  const response = await api.get('/api/cars', { params });
  return response.data;
};

export const fetchCarById = async (id) => {
  const response = await api.get(`/api/cars/${id}`);
  return response.data;
};

export const addCar = async (payload) => {
  const response = await api.post('/api/cars', payload);
  return response.data;
};

export const updateCar = async (id, payload) => {
  const response = await api.patch(`/api/cars/${id}`, payload);
  return response.data;
};

export const deleteCar = async (id) => {
  const response = await api.delete(`/api/cars/${id}`);
  return response.data;
};

export const fetchMyCars = async () => {
  const response = await api.get('/api/cars/my-cars');
  return response.data;
};

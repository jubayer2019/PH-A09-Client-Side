export const APP_NAME = 'DriveFleet';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Explore Cars', href: '/explore-cars' },
  { label: 'Add Car', href: '/add-car', private: true },
  { label: 'My Bookings', href: '/my-bookings', private: true },
];

export const CAR_TYPES = [
  'SUV',
  'Sedan',
  'Electric',
  'Luxury',
  'Convertible',
  'Sports',
  'Hatchback',
  'Truck',
];

export const BOOKING_STATUS_COLORS = {
  pending: 'bg-amber-500/20 text-amber-200',
  confirmed: 'bg-emerald-500/20 text-emerald-200',
  completed: 'bg-sky-500/20 text-sky-200',
  cancelled: 'bg-rose-500/20 text-rose-200',
};

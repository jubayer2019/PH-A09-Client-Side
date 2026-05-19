'use client';

import { useEffect, useState } from 'react';
import CarCard from '@/components/cars/CarCard';
import ErrorState from '@/components/shared/ErrorState';
import SkeletonCard from '@/components/shared/SkeletonCard';
import MainLayout from '@/layouts/MainLayout';
import { CAR_TYPES } from '@/utils/constants';
import { fetchCars } from '@/services/carService';

export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ search: '', carType: '', sortByPrice: '' });

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchCars({ page, limit: 9, ...filters });
        setCars(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load cars.');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [page, filters]);

  return (
    <MainLayout>
      <section>
        <h1 className="text-4xl font-black text-white">Explore Premium Cars</h1>
        <p className="mt-3 text-slate-300">Search by name, filter by category, and sort prices in real-time.</p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-4">
          <input
            placeholder="Search by car name"
            className="rounded-xl border border-white/20 bg-slate-950 px-4 py-2 text-slate-100"
            value={filters.search}
            onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
          />
          <select
            className="rounded-xl border border-white/20 bg-slate-950 px-4 py-2 text-slate-100"
            value={filters.carType}
            onChange={(event) => setFilters((prev) => ({ ...prev, carType: event.target.value }))}
          >
            <option value="">All Types</option>
            {CAR_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="rounded-xl border border-white/20 bg-slate-950 px-4 py-2 text-slate-100"
            value={filters.sortByPrice}
            onChange={(event) => setFilters((prev) => ({ ...prev, sortByPrice: event.target.value }))}
          >
            <option value="">Latest</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <button onClick={() => setPage(1)} className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-900">
            Apply Filters
          </button>
        </div>

        {error && <div className="mt-6"><ErrorState title="Something went wrong" message={error} /></div>}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          {!loading && cars.map((car) => <CarCard key={car._id} car={car} />)}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            className="rounded-xl border border-white/20 px-4 py-2 text-slate-100 disabled:opacity-40"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <p className="text-slate-300">Page {page} of {totalPages}</p>
          <button
            className="rounded-xl border border-white/20 px-4 py-2 text-slate-100 disabled:opacity-40"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </section>
    </MainLayout>
  );
}

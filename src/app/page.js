'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CarCard from '@/components/cars/CarCard';
import SkeletonCard from '@/components/shared/SkeletonCard';
import MainLayout from '@/layouts/MainLayout';
import { fetchCars } from '@/services/carService';

const testimonials = [
  {
    name: 'Sophie Tran',
    role: 'Product Designer, San Francisco',
    quote:
      'DriveFleet feels like an executive travel desk in your pocket. Booking quality cars is consistently effortless.',
  },
  {
    name: 'Marcus Ibrahim',
    role: 'Startup Founder, Austin',
    quote:
      'I switched from legacy rental apps to DriveFleet for reliability and clear pricing. The fleet quality is excellent.',
  },
  {
    name: 'Nadia Rahman',
    role: 'Operations Lead, Toronto',
    quote:
      'Our team books weekly and the dashboard saves time every single trip. It is polished and practical.',
  },
];

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const response = await fetchCars({ limit: 6 });
        setCars(response);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  return (
    <MainLayout>
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-16 md:px-12">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-3xl">
          <p className="inline-block rounded-full border border-cyan-200/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-100">
            Premium Mobility Platform
          </p>
          <h1 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
            Rent exceptional cars with a SaaS-grade experience.
          </h1>
          <p className="mt-5 text-lg text-slate-200">
            DriveFleet helps professionals discover, reserve, and manage top-tier vehicles with speed, trust, and complete transparency.
          </p>
          <Link href="/explore-cars" className="mt-8 inline-flex rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-900">
            Explore Cars
          </Link>
        </motion.div>
      </section>

      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-black text-white">Available Cars</h2>
          <Link href="/explore-cars" className="text-cyan-200">View all inventory</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          {!loading && cars.map((car) => <CarCard key={car._id} car={car} />)}
        </div>
        {!loading && cars.length === 0 && (
          <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
            No cars are available yet. Add a listing from the server side or confirm the client is connected to the correct API URL.
          </p>
        )}
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          { title: 'Concierge-level support', text: 'Dedicated rental specialists help you pick the right vehicle for every trip.' },
          { title: 'Verified premium fleet', text: 'Every listing is quality checked for cleanliness, safety, and condition.' },
          { title: 'Transparent pricing', text: 'See exact rental rates and booking demand before you check out.' },
        ].map((item) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-slate-300">{item.text}</p>
          </motion.article>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-black text-white">Customer Testimonials</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-slate-100">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-4 font-semibold text-cyan-200">{item.name}</p>
              <p className="text-sm text-slate-400">{item.role}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </MainLayout>
  );
}

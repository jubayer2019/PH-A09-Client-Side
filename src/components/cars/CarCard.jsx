'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiMapPin, HiOutlineUsers } from 'react-icons/hi2';

export default function CarCard({ car }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={car.image}
          alt={car.carName}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{car.carName}</h3>
          <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-sm text-cyan-200">{car.carType}</span>
        </div>
        <p className="flex items-center gap-2 text-sm text-slate-300">
          <HiOutlineUsers /> {car.seatCapacity} seats
        </p>
        <p className="flex items-center gap-2 text-sm text-slate-300">
          <HiMapPin /> {car.pickupLocation}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-cyan-200">${car.dailyRentPrice}/day</p>
          <span className="text-sm text-slate-300">Booked {car.bookingCount} times</span>
        </div>
        <p className={`text-sm ${car.availability ? 'text-emerald-300' : 'text-rose-300'}`}>
          {car.availability ? 'Available now' : 'Currently unavailable'}
        </p>
        <Link
          href={`/cars/${car._id}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-cyan-300"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}

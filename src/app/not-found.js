import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-black text-cyan-200">404</h1>
      <p className="mt-4 text-xl text-slate-200">This route is off the map.</p>
      <p className="mt-2 max-w-xl text-slate-300">
        The page you are looking for may have moved. Return to your premium dashboard and continue your trip.
      </p>
      <Link href="/" className="mt-6 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-900">
        Back to Home
      </Link>
    </div>
  );
}

export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="h-48 animate-pulse rounded-xl bg-white/10" />
      <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-white/10" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-white/10" />
      <div className="mt-6 h-10 w-full animate-pulse rounded-xl bg-white/10" />
    </div>
  );
}

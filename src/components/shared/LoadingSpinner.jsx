export default function LoadingSpinner({ text = 'Loading DriveFleet...' }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-300/40 border-t-cyan-300" />
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}

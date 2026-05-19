export default function ErrorState({ title, message }) {
  return (
    <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-6 text-center">
      <h3 className="text-xl font-semibold text-rose-200">{title}</h3>
      <p className="mt-2 text-rose-100/80">{message}</p>
    </div>
  );
}

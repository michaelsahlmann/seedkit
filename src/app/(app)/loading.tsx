export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse p-8">
      <div className="h-7 w-48 rounded bg-muted" />
      <div className="mt-2 h-4 w-72 rounded bg-muted" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

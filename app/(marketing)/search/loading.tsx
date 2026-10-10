export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="bg-surface-secondary h-6 w-40 animate-pulse rounded" />
        <div className="bg-surface-secondary mt-2 h-4 w-32 animate-pulse rounded" />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface-secondary h-64 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    </main>
  );
}

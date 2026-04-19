function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-[1.75rem] bg-[rgba(255,255,255,0.5)] ${className}`}
    />
  );
}

export default function Loading() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <SkeletonBlock className="min-h-[220px]" />
        <SkeletonBlock className="min-h-[220px]" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <SkeletonBlock className="min-h-[520px]" />
        <SkeletonBlock className="min-h-[520px]" />
      </div>
    </main>
  );
}

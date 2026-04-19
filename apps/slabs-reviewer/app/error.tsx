"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[920px] items-center px-4 py-10">
      <div className="w-full rounded-[2.5rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,252,247,0.92)] p-8 shadow-[0_24px_60px_-28px_rgba(59,42,27,0.18)]">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">
          Local Review Surface
        </p>
        <h1 className="mt-4 text-4xl tracking-tighter text-[var(--foreground)] md:text-6xl">
          The reviewer hit a loading fault.
        </h1>
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[var(--muted)]">
          {error.message ||
            "Something in the local project data could not be read cleanly."}
        </p>
        <button
          className="mt-8 inline-flex items-center rounded-full border border-[rgba(15,118,110,0.2)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-[1px] active:scale-[0.98]"
          onClick={() => reset()}
          type="button"
        >
          Reload reviewer
        </button>
      </div>
    </main>
  );
}

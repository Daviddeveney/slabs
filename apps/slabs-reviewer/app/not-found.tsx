import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[920px] items-center px-4 py-10">
      <div className="w-full rounded-[2.5rem] border border-[var(--line)] bg-[rgba(255,252,247,0.92)] p-8 shadow-[var(--shadow)]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
          Slabs reviewer
        </p>
        <h1 className="mt-4 text-4xl tracking-tighter text-[var(--foreground)] md:text-6xl">
          That project could not be found.
        </h1>
        <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[var(--muted)]">
          The project slug does not exist in the local `projects/` workspace, or
          the folder has not been scaffolded yet.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
          href="/"
        >
          Return to project index
        </Link>
      </div>
    </main>
  );
}

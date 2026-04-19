import Link from "next/link";
import {
  ArrowSquareOut,
  FolderOpen,
  GlobeHemisphereWest,
} from "@phosphor-icons/react/dist/ssr";
import type { GlobalContextItem } from "@/lib/slabs";

export function GlobalContextShell({
  items,
}: {
  items: GlobalContextItem[];
}) {
  return (
    <section className="rounded-[2.5rem] border border-[var(--line)] bg-[var(--panel-strong)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-7">
      <div className="border-b border-[rgba(78,66,53,0.08)] pb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Global Context
            </p>
            <h2 className="mt-3 text-2xl tracking-tight text-[var(--foreground)]">
              Shared references
            </h2>
            <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--muted)]">
              Keep repo registries, system notes, and other workspace-wide references
              here once so multiple projects can link back to the same source.
            </p>
          </div>

          <Link
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
            href="/source?path=global-context"
          >
            <FolderOpen size={14} weight="duotone" />
            Open directory
          </Link>
        </div>
      </div>

      {items.length ? (
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <Link
              className="group rounded-[1.8rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.72)] p-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.995]"
              href={`/source?path=${encodeURIComponent(item.repoPath)}`}
              key={item.slug}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[var(--muted)]">
                    <GlobeHemisphereWest size={14} weight="duotone" />
                    <span>{item.repoPath.replace(/^global-context\//, "")}</span>
                  </div>
                  <h3 className="mt-3 text-xl tracking-tight text-[var(--foreground)]">
                    {item.title}
                  </h3>
                </div>

                <ArrowSquareOut
                  className="text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={18}
                  weight="bold"
                />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {item.summary || "Workspace-wide supporting context."}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.8rem] border border-dashed border-[rgba(78,66,53,0.14)] bg-[rgba(255,255,255,0.46)] px-5 py-5">
          <p className="text-base tracking-tight text-[var(--foreground)]">
            No global context notes yet.
          </p>
          <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-[var(--muted)]">
            Add workspace-wide references under <code>global-context/</code> when
            several projects need the same repos, systems, or supporting material.
          </p>
        </div>
      )}
    </section>
  );
}

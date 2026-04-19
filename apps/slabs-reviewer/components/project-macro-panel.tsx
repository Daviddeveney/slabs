"use client";

import { startTransition, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CaretDown,
  CaretRight,
  Plus,
  WarningCircle,
} from "@phosphor-icons/react";
import { StatusPill } from "@/components/slab-status";
import type { SlabStatus } from "@/lib/slab-statuses";

type SaveState = "idle" | "saving" | "error";

type MacroListItem = {
  id: string;
  title: string;
  status: SlabStatus;
};

export function ProjectMacroPanel({
  linkedMicroCounts,
  macros,
  projectSlug,
}: {
  linkedMicroCounts: Record<string, number>;
  macros: MacroListItem[];
  projectSlug: string;
}) {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState("");

  const openMacros = macros.filter((macro) => macro.status !== "Done");
  const doneMacros = macros.filter((macro) => macro.status === "Done");

  async function handleCreateMacro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setSaveState("error");
      setError("Add a macro title first.");
      return;
    }

    setSaveState("saving");
    setError("");

    try {
      const response = await fetch(`/api/project/${projectSlug}/macro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        macro?: { id: string };
      };

      if (!response.ok || !payload.macro?.id) {
        throw new Error(payload.error || "Could not create the macro slab.");
      }

      startTransition(() => {
        router.push(`/project/${projectSlug}/macro/${payload.macro?.id}`);
        router.refresh();
      });
    } catch (createError) {
      setSaveState("error");
      setError(
        createError instanceof Error ? createError.message : "Could not create the macro slab.",
      );
    }
  }

  return (
    <section className="rounded-[2.25rem] border border-[var(--line)] bg-[var(--panel-strong)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-7">
      <div className="border-b border-[rgba(78,66,53,0.08)] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Macro slabs
          </p>

          <button
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
            onClick={() => {
              setShowCreateForm((current) => !current);
              setSaveState("idle");
              setError("");
            }}
            type="button"
          >
            <Plus size={14} weight="bold" />
            {showCreateForm ? "Close" : "Macro slab"}
          </button>
        </div>
      </div>

      {showCreateForm ? (
        <form
          className="mt-5 rounded-[1.75rem] border border-[rgba(15,118,110,0.12)] bg-[rgba(255,255,255,0.72)] p-4"
          onSubmit={handleCreateMacro}
        >
          <div className="flex flex-wrap items-end gap-4">
            <label className="grid min-w-[240px] flex-1 gap-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Title
              </span>
              <input
                className="w-full rounded-[1.2rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Design booking flow"
                value={title}
              />
            </label>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.18)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px] active:scale-[0.98]"
              disabled={saveState === "saving"}
              type="submit"
            >
              <Plus size={18} weight="bold" />
              {saveState === "saving" ? "Creating..." : "Create macro slab"}
            </button>
          </div>

          {saveState === "error" ? (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-[rgb(157,23,77)]">
              <WarningCircle size={18} weight="fill" />
              {error}
            </div>
          ) : null}
        </form>
      ) : null}

      {macros.length ? (
        <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-[rgba(78,66,53,0.1)] bg-[rgba(255,255,255,0.56)]">
          <div className="hidden grid-cols-[90px_120px_minmax(0,1fr)_120px_28px] border-b border-[rgba(78,66,53,0.08)] bg-[rgba(15,23,42,0.04)] px-5 py-3 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--muted)] md:grid">
            <span>ID</span>
            <span>Status</span>
            <span>Macro</span>
            <span className="text-right">Micros</span>
            <span />
          </div>

          {openMacros.length ? (
            <div className="divide-y divide-[rgba(78,66,53,0.08)]">
              {openMacros.map((macro) => (
                <Link
                  className="group grid gap-4 px-5 py-5 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[rgba(15,118,110,0.04)] active:scale-[0.998] md:grid-cols-[90px_120px_minmax(0,1fr)_120px_28px] md:items-center"
                  href={`/project/${projectSlug}/macro/${macro.id}`}
                  key={macro.id}
                >
                  <div className="flex items-center gap-3 md:block">
                    <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      {macro.id}
                    </span>
                  </div>

                  <div className="md:justify-self-start">
                    <StatusPill className="w-fit" status={macro.status} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl tracking-tight text-[var(--foreground)] md:text-2xl">
                      {macro.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:block md:text-right">
                    <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--muted)] md:hidden">
                      Linked micros
                    </span>
                    <p className="font-[var(--font-mono)] text-2xl text-[var(--foreground)]">
                      {linkedMicroCounts[macro.id] ?? 0}
                    </p>
                  </div>

                  <div className="hidden justify-self-end md:block">
                    <CaretRight
                      className="text-[var(--foreground)] transition-transform duration-300 group-hover:translate-x-1"
                      size={20}
                      weight="bold"
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-5 py-8 text-sm text-[var(--muted)]">No open macro slabs.</div>
          )}
        </div>
      ) : (
        <div className="py-10 text-base tracking-tight text-[var(--foreground)]">
          No macro slabs yet.
        </div>
      )}

      {doneMacros.length ? (
        <details className="mt-5 overflow-hidden rounded-[1.75rem] border border-[rgba(78,66,53,0.1)] bg-[rgba(255,255,255,0.5)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
                Done slabs
              </span>
              <span className="inline-flex rounded-full bg-[rgba(15,23,42,0.05)] px-3 py-1.5 text-xs text-[var(--muted)]">
                {doneMacros.length}
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
              Expand
              <CaretDown
                className="transition-transform duration-300 group-open:rotate-180"
                size={14}
                weight="bold"
              />
            </span>
          </summary>

          <div className="border-t border-[rgba(78,66,53,0.08)]">
            <div className="hidden grid-cols-[90px_120px_minmax(0,1fr)_120px_28px] border-b border-[rgba(78,66,53,0.08)] bg-[rgba(15,23,42,0.04)] px-5 py-3 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--muted)] md:grid">
              <span>ID</span>
              <span>Status</span>
              <span>Macro</span>
              <span className="text-right">Micros</span>
              <span />
            </div>

            <div className="divide-y divide-[rgba(78,66,53,0.08)]">
              {doneMacros.map((macro) => (
                <Link
                  className="group grid gap-4 px-5 py-5 transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[rgba(15,118,110,0.04)] active:scale-[0.998] md:grid-cols-[90px_120px_minmax(0,1fr)_120px_28px] md:items-center"
                  href={`/project/${projectSlug}/macro/${macro.id}`}
                  key={macro.id}
                >
                  <div className="flex items-center gap-3 md:block">
                    <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                      {macro.id}
                    </span>
                  </div>

                  <div className="md:justify-self-start">
                    <StatusPill className="w-fit" status={macro.status} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl tracking-tight text-[var(--foreground)] md:text-2xl">
                      {macro.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between gap-4 md:block md:text-right">
                    <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--muted)] md:hidden">
                      Linked micros
                    </span>
                    <p className="font-[var(--font-mono)] text-2xl text-[var(--foreground)]">
                      {linkedMicroCounts[macro.id] ?? 0}
                    </p>
                  </div>

                  <div className="hidden justify-self-end md:block">
                    <CaretRight
                      className="text-[var(--foreground)] transition-transform duration-300 group-hover:translate-x-1"
                      size={20}
                      weight="bold"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </details>
      ) : null}
    </section>
  );
}

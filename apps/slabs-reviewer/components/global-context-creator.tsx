"use client";

import { startTransition, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, WarningCircle } from "@phosphor-icons/react";

type SaveState = "idle" | "saving" | "error";

export function GlobalContextCreator() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setSaveState("error");
      setError("Add a title first.");
      return;
    }

    setSaveState("saving");
    setError("");

    try {
      const response = await fetch("/api/global-context", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          summary: summary.trim(),
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        item?: { repoPath: string };
      };

      if (!response.ok || !payload.item?.repoPath) {
        throw new Error(payload.error || "Could not create the shared context note.");
      }

      startTransition(() => {
        router.push(`/source?path=${encodeURIComponent(payload.item?.repoPath ?? "")}`);
        router.refresh();
      });
    } catch (createError) {
      setSaveState("error");
      setError(
        createError instanceof Error
          ? createError.message
          : "Could not create the shared context note.",
      );
    }
  }

  return (
    <div className="w-full max-w-[420px]">
      <div className="flex justify-end">
        <button
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
          onClick={() => {
            setShowForm((current) => !current);
            setSaveState("idle");
            setError("");
          }}
          type="button"
        >
          <Plus size={14} weight="bold" />
          {showForm ? "Close" : "New shared context"}
        </button>
      </div>

      {showForm ? (
        <form
          className="mt-4 grid gap-4 rounded-[1.7rem] border border-[rgba(15,118,110,0.12)] bg-[rgba(255,255,255,0.72)] p-4"
          onSubmit={handleSubmit}
        >
          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Title
            </span>
            <input
              className="w-full rounded-[1.2rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Shared staging repositories"
              value={title}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Summary
            </span>
            <textarea
              className="min-h-[112px] w-full rounded-[1.2rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white"
              onChange={(event) => setSummary(event.target.value)}
              rows={4}
              value={summary}
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3">
            {saveState === "error" ? (
              <div className="inline-flex items-center gap-2 text-sm text-[rgb(157,23,77)]">
                <WarningCircle size={18} weight="fill" />
                {error}
              </div>
            ) : (
              <span className="text-sm text-[var(--muted)]" />
            )}

            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.18)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px] active:scale-[0.98]"
              disabled={saveState === "saving"}
              type="submit"
            >
              <Plus size={18} weight="bold" />
              {saveState === "saving" ? "Creating..." : "Create note"}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

"use client";

import { startTransition, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowSquareOut,
  CheckCircle,
  LinkSimple,
  NotePencil,
  Plus,
  WarningCircle,
} from "@phosphor-icons/react";

type SaveState = "idle" | "saving" | "saved" | "error";

export function BriefLinkManager({
  projectSlug,
  briefUrl,
}: {
  projectSlug: string;
  briefUrl: string | null;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(briefUrl ?? "");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState("");

  async function saveBriefLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextValue = value.trim();

    if (!nextValue) {
      setSaveState("error");
      setError("Add the Google Doc link first.");
      return;
    }

    setSaveState("saving");
    setError("");

    try {
      const response = await fetch(`/api/project/${projectSlug}/brief`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: nextValue,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not save the brief link.");
      }

      setSaveState("saved");
      setIsEditing(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (saveError) {
      setSaveState("error");
      setError(
        saveError instanceof Error ? saveError.message : "Could not save the brief link.",
      );
    }
  }

  return (
    <>
      {briefUrl ? (
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.18)] bg-[rgba(15,118,110,0.09)] px-4 py-2.5 text-sm text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
          href={briefUrl}
          rel="noreferrer"
        >
          <ArrowSquareOut size={18} weight="bold" />
          Open brief
        </a>
      ) : null}

      <button
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.05)] px-4 py-2.5 text-sm text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
        onClick={() => {
          setIsEditing((current) => !current);
          setSaveState("idle");
          setError("");
          setValue(briefUrl ?? value);
        }}
        type="button"
      >
        {briefUrl ? <NotePencil size={18} weight="bold" /> : <Plus size={18} weight="bold" />}
        {briefUrl ? "Edit brief link" : "Add brief link"}
      </button>

      {isEditing ? (
        <form
          className="basis-full rounded-[1.75rem] border border-[rgba(15,118,110,0.12)] bg-[rgba(255,255,255,0.76)] p-4"
          onSubmit={saveBriefLink}
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Google Doc URL
              </span>
              <input
                className="w-full rounded-[1.2rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white"
                onChange={(event) => setValue(event.target.value)}
                placeholder="https://docs.google.com/document/d/..."
                value={value}
              />
            </label>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.18)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px] active:scale-[0.98]"
              disabled={saveState === "saving"}
              type="submit"
            >
              <LinkSimple size={18} weight="bold" />
              {saveState === "saving" ? "Saving..." : "Save link"}
            </button>
          </div>

          {saveState === "saved" ? (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-[rgb(15,118,110)]">
              <CheckCircle size={18} weight="fill" />
              Brief link saved.
            </div>
          ) : null}

          {saveState === "error" ? (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-[rgb(157,23,77)]">
              <WarningCircle size={18} weight="fill" />
              {error}
            </div>
          ) : null}
        </form>
      ) : null}
    </>
  );
}

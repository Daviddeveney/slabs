"use client";

import {
  startTransition,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  FolderOpen,
  ListChecks,
  Plus,
  Stack,
  WarningCircle,
} from "@phosphor-icons/react";
import { StatusPill } from "@/components/slab-status";
import type { ProjectIndexItem } from "@/lib/slabs";

type SaveState = "idle" | "saving" | "error";

export function ProjectsHomeShell({
  initialProjects,
}: {
  initialProjects: ProjectIndexItem[];
}) {
  const router = useRouter();
  const [projects] = useState(initialProjects);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [title, setTitle] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState("");

  async function handleCreateProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setSaveState("error");
      setError("Add a project title first.");
      return;
    }

    setSaveState("saving");
    setError("");

    try {
      const response = await fetch("/api/project", {
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
        project?: { slug: string };
      };

      if (!response.ok || !payload.project?.slug) {
        throw new Error(payload.error || "Could not create the project.");
      }

      startTransition(() => {
        router.push(`/project/${payload.project?.slug}`);
        router.refresh();
      });
    } catch (createError) {
      setSaveState("error");
      setError(
        createError instanceof Error ? createError.message : "Could not create the project.",
      );
    }
  }

  return (
    <section className="rounded-[2.5rem] border border-[var(--line)] bg-[var(--panel-strong)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-7">
      <div className="border-b border-[rgba(78,66,53,0.08)] pb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Projects
            </p>
            <h2 className="mt-3 text-2xl tracking-tight text-[var(--foreground)]">
              Your Projects
            </h2>
          </div>

          <button
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
            onClick={() => {
              setShowCreateForm((current) => !current);
              setSaveState("idle");
              setError("");
              setTitle("");
            }}
            type="button"
          >
            <Plus size={14} weight="bold" />
            {showCreateForm ? "Close" : "New project"}
          </button>
        </div>
      </div>

      {showCreateForm ? (
        <form
          className="mt-5 rounded-[1.9rem] border border-[rgba(15,118,110,0.12)] bg-[rgba(255,255,255,0.72)] p-5"
          onSubmit={handleCreateProject}
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.18)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px] active:scale-[0.98]"
              disabled={saveState === "saving"}
              type="submit"
            >
              <Plus size={18} weight="bold" />
              {saveState === "saving" ? "Creating..." : "Create project"}
            </button>
          </div>

          <div className="mt-5">
            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Title
              </span>
              <input
                className="w-full rounded-[1.2rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.9)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Client Portal"
                value={title}
              />
            </label>
          </div>

          {saveState === "error" ? (
            <div className="mt-5 inline-flex items-center gap-2 text-sm text-[rgb(157,23,77)]">
              <WarningCircle size={18} weight="fill" />
              {error}
            </div>
          ) : null}
        </form>
      ) : null}

      {projects.length ? (
        <div className="divide-y divide-[rgba(78,66,53,0.08)]">
          {projects.map((project) => (
            <Link
              className="group grid gap-4 py-6 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.995] md:grid-cols-[minmax(0,1fr)_220px]"
              href={`/project/${project.slug}`}
              key={project.slug}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <FolderOpen className="text-[var(--accent)]" size={20} weight="duotone" />
                  <h3 className="text-2xl tracking-tight text-[var(--foreground)]">
                    {project.title}
                  </h3>
                  <StatusPill status={project.primaryStatus} />
                </div>

                <p className="mt-3 max-w-[64ch] text-sm leading-relaxed text-[var(--muted)]">
                  {project.summary || "No project summary captured yet."}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 md:justify-end">
                <div className="flex flex-wrap gap-2 text-sm text-[var(--muted)] md:justify-end">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-3 py-1.5">
                    <Stack size={16} weight="duotone" />
                    {project.macroCount} macros
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-3 py-1.5">
                    <ListChecks size={16} weight="duotone" />
                    {project.microCount} micros
                  </span>
                </div>

                <ArrowRight
                  className="text-[var(--foreground)] transition-transform duration-300 group-hover:translate-x-1"
                  size={18}
                  weight="bold"
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-10">
          <p className="text-base tracking-tight text-[var(--foreground)]">
            No projects are available yet.
          </p>
          <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[var(--muted)]">
            Create the first project here and the local Slabs workspace will scaffold it
            automatically.
          </p>
        </div>
      )}
    </section>
  );
}

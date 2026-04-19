"use client";

import {
  startTransition,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CaretDown,
  CheckCircle,
  FloppyDiskBack,
  LinkSimple,
  ListChecks,
  NotePencil,
  Plus,
  Trash,
  WarningCircle,
} from "@phosphor-icons/react";
import { BriefLinkManager } from "@/components/brief-link-manager";
import { StatusPill } from "@/components/slab-status";
import type { MacroSlab, MicroSlab } from "@/lib/slabs";
import {
  EDITABLE_SLAB_STATUSES,
  toEditableSlabStatus,
  type EditableSlabStatus,
} from "@/lib/slab-statuses";

type SaveState = "idle" | "saving" | "saved" | "error";
type ListVariant = "bullet" | "link";

type MacroFormState = {
  title: string;
  status: EditableSlabStatus;
  objective: string;
  whyItMatters: string;
  inScope: string[];
  outOfScope: string[];
  dependencies: string[];
  doneCriteria: string[];
  artifacts: string[];
  notes: string;
};

type MicroFormState = {
  title: string;
  status: EditableSlabStatus;
  type: string;
  toolSurface: string;
  goal: string;
  workingContext: string;
  doneCriteria: string[];
  artifacts: string[];
  notes: string;
};

type NewMicroFormState = {
  title: string;
  status: EditableSlabStatus;
};

type ArtifactPreview = {
  raw: string;
  label: string;
  href: string | null;
};

function buildMacroFormState(macro: MacroSlab): MacroFormState {
  return {
    title: macro.title,
    status: toEditableSlabStatus(macro.status),
    objective: macro.objective,
    whyItMatters: macro.whyItMatters,
    inScope: macro.inScope,
    outOfScope: macro.outOfScope,
    dependencies: macro.dependencies,
    doneCriteria: macro.doneCriteria,
    artifacts: macro.artifacts,
    notes: macro.notes,
  };
}

function buildMicroFormState(micro: MicroSlab): MicroFormState {
  return {
    title: micro.title,
    status: toEditableSlabStatus(micro.status),
    type: micro.type,
    toolSurface: micro.toolSurface,
    goal: micro.goal,
    workingContext: micro.workingContext,
    doneCriteria: micro.doneCriteria,
    artifacts: micro.artifacts,
    notes: micro.notes,
  };
}

function buildNewMicroFormState(): NewMicroFormState {
  return {
    title: "",
    status: "Backlog",
  };
}

function isCodexSuggested(origin: string) {
  return origin.trim().toLowerCase() === "codex suggested";
}

function normalizeList(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

function updateListItem(items: string[], index: number, value: string) {
  const next = [...items];
  next[index] = value;
  return next;
}

function removeListItem(items: string[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

function cleanLabel(value: string) {
  return value.replace(/^`|`$/g, "").trim();
}

function resolveRelativeRepoPath(basePath: string | null, target: string) {
  if (!basePath) {
    return null;
  }

  const baseSegments = basePath.replace(/\\/g, "/").split("/");
  baseSegments.pop();

  for (const segment of target.replace(/\\/g, "/").split("/")) {
    if (!segment || segment === ".") {
      continue;
    }

    if (segment === "..") {
      baseSegments.pop();
      continue;
    }

    baseSegments.push(segment);
  }

  return baseSegments.join("/");
}

function parseArtifactPreview(raw: string, basePath: string | null): ArtifactPreview {
  const markdownLinkMatch = raw.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  const label = cleanLabel(markdownLinkMatch?.[1] ?? raw);
  const target = (markdownLinkMatch?.[2] ?? raw).trim();
  const isWorkspaceRootRelative = /^(apps|docs|global-context|plugins|projects|scripts|skills|templates)\//.test(
    target.replace(/^`|`$/g, ""),
  );

  if (/^https?:\/\//.test(target)) {
    return {
      raw,
      label,
      href: target,
    };
  }

  if (!markdownLinkMatch && !target.startsWith(".") && !target.startsWith("/") && !isWorkspaceRootRelative) {
    return {
      raw,
      label,
      href: null,
    };
  }

  const repoPath = resolveRelativeRepoPath(basePath, target);
  return {
    raw,
    label,
    href: repoPath ? `/source?path=${encodeURIComponent(repoPath)}` : null,
  };
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
        {label}
      </span>
      {children}
      {hint ? (
        <span className="text-xs leading-relaxed text-[var(--muted)]">{hint}</span>
      ) : null}
    </label>
  );
}

function StructuredListField({
  label,
  hint,
  items,
  onChange,
  variant = "bullet",
  basePath = null,
  emptyLabel,
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (items: string[]) => void;
  variant?: ListVariant;
  basePath?: string | null;
  emptyLabel: string;
}) {
  const [editing, setEditing] = useState(false);
  const normalizedItems = normalizeList(items);

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
          {label}
        </span>
        <button
          className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-3 py-1.5 text-xs uppercase tracking-[0.22em] text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
          onClick={() => setEditing((current) => !current)}
          type="button"
        >
          <NotePencil size={14} weight="bold" />
          {editing ? "Done editing" : "Edit"}
        </button>
      </div>

      {editing ? (
        <div className="rounded-[1.45rem] border border-[rgba(78,66,53,0.1)] bg-[rgba(255,255,255,0.68)] p-4">
          <div className="grid gap-3">
            {items.map((item, index) => {
              const preview = parseArtifactPreview(item, basePath);

              return (
                <div
                  className="rounded-[1.1rem] border border-[rgba(78,66,53,0.08)] bg-white/70 p-3"
                  key={`${label}-${index}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {variant === "link" && preview.href ? (
                      <Link
                        className="inline-flex min-w-0 items-center gap-2 text-sm text-[rgb(15,118,110)] hover:underline"
                        href={preview.href}
                      >
                        <LinkSimple size={16} weight="bold" />
                        <span className="truncate">{preview.label}</span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        <span>{variant === "link" ? "Artifact item" : "List item"}</span>
                      </div>
                    )}
                    <button
                      className="inline-flex items-center gap-1 rounded-full bg-[rgba(190,24,93,0.08)] px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-[rgb(157,23,77)]"
                      onClick={() => onChange(removeListItem(items, index))}
                      type="button"
                    >
                      <Trash size={12} weight="bold" />
                      Remove
                    </button>
                  </div>
                  <input
                    className="mt-3 w-full rounded-[1rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.9)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)]"
                    onChange={(event) => onChange(updateListItem(items, index, event.target.value))}
                    value={item}
                  />
                </div>
              );
            })}
          </div>

          <button
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-3 py-2 text-xs uppercase tracking-[0.22em] text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
            onClick={() => onChange([...items, ""])}
            type="button"
          >
            <Plus size={14} weight="bold" />
            Add item
          </button>
        </div>
      ) : normalizedItems.length ? (
        <div className="rounded-[1.45rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.6)] px-4 py-4">
          {variant === "link" ? (
            <div className="grid gap-2">
              {normalizedItems.map((item) => {
                const preview = parseArtifactPreview(item, basePath);

                return preview.href ? (
                  <Link
                    className="inline-flex items-center gap-2 rounded-[1rem] bg-[rgba(15,118,110,0.08)] px-3 py-2 text-sm text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
                    href={preview.href}
                    key={item}
                  >
                    <LinkSimple size={16} weight="bold" />
                    <span>{preview.label}</span>
                  </Link>
                ) : (
                  <div
                    className="inline-flex items-center gap-2 rounded-[1rem] bg-[rgba(15,23,42,0.05)] px-3 py-2 text-sm text-[var(--muted)]"
                    key={item}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <ul className="grid gap-2">
              {normalizedItems.map((item) => (
                <li className="flex items-start gap-3 text-sm leading-relaxed text-[var(--foreground)]" key={item}>
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="rounded-[1.45rem] border border-dashed border-[rgba(78,66,53,0.14)] bg-[rgba(255,255,255,0.42)] px-4 py-4 text-sm text-[var(--muted)]">
          {emptyLabel}
        </div>
      )}

      {hint ? (
        <span className="text-xs leading-relaxed text-[var(--muted)]">{hint}</span>
      ) : null}
    </div>
  );
}

function SaveNotice({
  state,
  error,
}: {
  state: SaveState;
  error: string;
}) {
  if (state === "idle") {
    return null;
  }

  if (state === "saving") {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--accent)]" />
        Saving changes to the local slab file.
      </div>
    );
  }

  if (state === "saved") {
    return (
      <div className="inline-flex items-center gap-2 text-sm text-[rgb(15,118,110)]">
        <CheckCircle size={18} weight="fill" />
        Saved to Markdown.
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 text-sm text-[rgb(157,23,77)]">
      <WarningCircle size={18} weight="fill" />
      {error || "Could not save the file."}
    </div>
  );
}

const inputClassName =
  "w-full rounded-[1.2rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.72)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white";

const textareaClassName = `${inputClassName} min-h-[128px] resize-y`;

const buttonClassName =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.18)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px] active:scale-[0.98]";

export function MacroDetailEditor({
  projectSlug,
  projectTitle,
  primaryArtifact,
  macro,
  macroSourcePath,
  micros,
  microSourcePaths,
}: {
  projectSlug: string;
  projectTitle: string;
  primaryArtifact: string | null;
  macro: MacroSlab;
  macroSourcePath: string | null;
  micros: MicroSlab[];
  microSourcePaths: Record<string, string | null>;
}) {
  const router = useRouter();
  const [macroForm, setMacroForm] = useState<MacroFormState>(() =>
    buildMacroFormState(macro),
  );
  const [microForms, setMicroForms] = useState<Record<string, MicroFormState>>(() =>
    Object.fromEntries(micros.map((micro) => [micro.id, buildMicroFormState(micro)])),
  );
  const [macroSaveState, setMacroSaveState] = useState<SaveState>("idle");
  const [macroError, setMacroError] = useState("");
  const [showMacroEditor, setShowMacroEditor] = useState(false);
  const [microSaveStates, setMicroSaveStates] = useState<Record<string, SaveState>>({});
  const [microErrors, setMicroErrors] = useState<Record<string, string>>({});
  const [microIgnoreStates, setMicroIgnoreStates] = useState<Record<string, SaveState>>({});
  const [microIgnoreErrors, setMicroIgnoreErrors] = useState<Record<string, string>>({});
  const [showNewMicroForm, setShowNewMicroForm] = useState(false);
  const [newMicroForm, setNewMicroForm] = useState<NewMicroFormState>(
    buildNewMicroFormState(),
  );
  const [createMicroState, setCreateMicroState] = useState<SaveState>("idle");
  const [createMicroError, setCreateMicroError] = useState("");

  useEffect(() => {
    setMacroForm(buildMacroFormState(macro));
    setMacroSaveState("idle");
    setMacroError("");
    setShowMacroEditor(false);
  }, [macro]);

  useEffect(() => {
    setMicroForms(
      Object.fromEntries(micros.map((micro) => [micro.id, buildMicroFormState(micro)])),
    );
    setMicroSaveStates({});
    setMicroErrors({});
    setMicroIgnoreStates({});
    setMicroIgnoreErrors({});
  }, [micros]);

  useEffect(() => {
    if (createMicroState === "saved") {
      setNewMicroForm(buildNewMicroFormState());
    }
  }, [createMicroState]);

  async function saveMacro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMacroSaveState("saving");
    setMacroError("");

    try {
      const response = await fetch(`/api/project/${projectSlug}/macro/${macro.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...macroForm,
          inScope: normalizeList(macroForm.inScope),
          outOfScope: normalizeList(macroForm.outOfScope),
          dependencies: normalizeList(macroForm.dependencies),
          doneCriteria: normalizeList(macroForm.doneCriteria),
          artifacts: normalizeList(macroForm.artifacts),
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not save the macro slab.");
      }

      setMacroSaveState("saved");
      startTransition(() => router.refresh());
    } catch (error) {
      setMacroSaveState("error");
      setMacroError(
        error instanceof Error ? error.message : "Could not save the macro slab.",
      );
    }
  }

  async function saveMicro(event: FormEvent<HTMLFormElement>, microId: string) {
    event.preventDefault();
    setMicroSaveStates((current) => ({ ...current, [microId]: "saving" }));
    setMicroErrors((current) => ({ ...current, [microId]: "" }));

    try {
      const form = microForms[microId];
      const response = await fetch(`/api/project/${projectSlug}/micro/${microId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          doneCriteria: normalizeList(form.doneCriteria),
          artifacts: normalizeList(form.artifacts),
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not save the micro slab.");
      }

      setMicroSaveStates((current) => ({ ...current, [microId]: "saved" }));
      startTransition(() => router.refresh());
    } catch (error) {
      setMicroSaveStates((current) => ({ ...current, [microId]: "error" }));
      setMicroErrors((current) => ({
        ...current,
        [microId]:
          error instanceof Error ? error.message : "Could not save the micro slab.",
      }));
    }
  }

  async function createMicro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newMicroForm.title.trim()) {
      setCreateMicroState("error");
      setCreateMicroError("Give the new micro slab a title first.");
      return;
    }

    setCreateMicroState("saving");
    setCreateMicroError("");

    try {
      const response = await fetch(
        `/api/project/${projectSlug}/macro/${macro.id}/micro`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newMicroForm.title,
            status: newMicroForm.status,
          }),
        },
      );

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not create the micro slab.");
      }

      setCreateMicroState("saved");
      setShowNewMicroForm(false);
      startTransition(() => router.refresh());
    } catch (error) {
      setCreateMicroState("error");
      setCreateMicroError(
        error instanceof Error ? error.message : "Could not create the micro slab.",
      );
    }
  }

  async function ignoreMicro(
    event: React.MouseEvent<HTMLButtonElement>,
    microId: string,
  ) {
    event.preventDefault();
    event.stopPropagation();

    setMicroIgnoreStates((current) => ({ ...current, [microId]: "saving" }));
    setMicroIgnoreErrors((current) => ({ ...current, [microId]: "" }));

    try {
      const response = await fetch(`/api/project/${projectSlug}/micro/${microId}/ignore`, {
        method: "POST",
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not ignore the micro slab.");
      }

      setMicroIgnoreStates((current) => ({ ...current, [microId]: "saved" }));
      startTransition(() => router.refresh());
    } catch (error) {
      setMicroIgnoreStates((current) => ({ ...current, [microId]: "error" }));
      setMicroIgnoreErrors((current) => ({
        ...current,
        [microId]:
          error instanceof Error ? error.message : "Could not ignore the micro slab.",
      }));
    }
  }

  return (
    <div className="grid gap-6">
      <section className="rounded-[2.5rem] border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
            Macro slab view
          </span>
          <span className="h-1 w-1 rounded-full bg-[rgba(78,66,53,0.3)]" />
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
            {projectTitle}
          </span>
          <span className="h-1 w-1 rounded-full bg-[rgba(78,66,53,0.3)]" />
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
            {macro.id}
          </span>
          <StatusPill status={macroForm.status} />
        </div>

        <h1 className="mt-5 max-w-[12ch] text-4xl tracking-tighter text-[var(--foreground)] md:text-6xl md:leading-none">
          {macroForm.title || macro.title}
        </h1>

        {macroForm.objective ? (
          <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[var(--muted)]">
            {macroForm.objective}
          </p>
        ) : null}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <BriefLinkManager briefUrl={primaryArtifact} projectSlug={projectSlug} />
          {macroSourcePath ? (
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.05)] px-4 py-2.5 text-sm text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
              href={`/source?path=${encodeURIComponent(macroSourcePath)}`}
            >
              <LinkSimple size={18} weight="duotone" />
              Open source file
            </Link>
          ) : null}
          <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-4 py-2.5 text-sm text-[var(--muted)]">
            <ListChecks size={18} weight="duotone" />
            {micros.length} linked micro slabs
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-4 py-2.5 text-sm text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
            onClick={() => setShowMacroEditor((current) => !current)}
            type="button"
          >
            <NotePencil size={18} weight="bold" />
            {showMacroEditor ? "Close editor" : "Edit macro"}
          </button>
        </div>
      </section>

      <div
        className={
          showMacroEditor
            ? "grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]"
            : "grid gap-6"
        }
      >
        {showMacroEditor ? (
          <section className="rounded-[2.25rem] border border-[var(--line)] bg-[var(--panel-strong)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-7">
            <form className="grid gap-5" onSubmit={saveMacro}>
              <div className="grid gap-5 md:grid-cols-[170px_minmax(0,1fr)]">
                <Field label="Status">
                  <select
                    className={inputClassName}
                    onChange={(event) =>
                      setMacroForm((current) => ({
                        ...current,
                        status: event.target.value as EditableSlabStatus,
                      }))
                    }
                    value={macroForm.status}
                  >
                    {EDITABLE_SLAB_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Title">
                  <input
                    className={inputClassName}
                    onChange={(event) =>
                      setMacroForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    value={macroForm.title}
                  />
                </Field>
              </div>

              <Field label="Objective">
                <textarea
                  className={textareaClassName}
                  onChange={(event) =>
                    setMacroForm((current) => ({
                      ...current,
                      objective: event.target.value,
                    }))
                  }
                  rows={4}
                  value={macroForm.objective}
                />
              </Field>

              <Field label="Why It Matters">
                <textarea
                  className={textareaClassName}
                  onChange={(event) =>
                    setMacroForm((current) => ({
                      ...current,
                      whyItMatters: event.target.value,
                    }))
                  }
                  rows={4}
                  value={macroForm.whyItMatters}
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <StructuredListField
                  emptyLabel="No in-scope items recorded yet."
                  items={macroForm.inScope}
                  label="In Scope"
                  onChange={(items) =>
                    setMacroForm((current) => ({
                      ...current,
                      inScope: items,
                    }))
                  }
                />
                <StructuredListField
                  emptyLabel="No out-of-scope items recorded yet."
                  items={macroForm.outOfScope}
                  label="Out Of Scope"
                  onChange={(items) =>
                    setMacroForm((current) => ({
                      ...current,
                      outOfScope: items,
                    }))
                  }
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <StructuredListField
                  emptyLabel="No dependencies recorded yet."
                  items={macroForm.dependencies}
                  label="Dependencies"
                  onChange={(items) =>
                    setMacroForm((current) => ({
                      ...current,
                      dependencies: items,
                    }))
                  }
                />
                <StructuredListField
                  emptyLabel="No done criteria recorded yet."
                  items={macroForm.doneCriteria}
                  label="Done Criteria"
                  onChange={(items) =>
                    setMacroForm((current) => ({
                      ...current,
                      doneCriteria: items,
                    }))
                  }
                />
              </div>

              <StructuredListField
                basePath={macroSourcePath}
                emptyLabel="No artifacts linked yet."
                items={macroForm.artifacts}
                label="Artifacts"
                onChange={(items) =>
                  setMacroForm((current) => ({
                    ...current,
                    artifacts: items,
                  }))
                }
                variant="link"
              />

              <Field label="Notes">
                <textarea
                  className={textareaClassName}
                  onChange={(event) =>
                    setMacroForm((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  rows={5}
                  value={macroForm.notes}
                />
              </Field>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(78,66,53,0.08)] pt-5">
                <SaveNotice error={macroError} state={macroSaveState} />
                <button
                  className={buttonClassName}
                  disabled={macroSaveState === "saving"}
                  type="submit"
                >
                  <FloppyDiskBack size={18} weight="bold" />
                  {macroSaveState === "saving" ? "Saving..." : "Save macro"}
                </button>
              </div>
            </form>
          </section>
        ) : null}

        <section className="rounded-[2.25rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] md:p-7">
          <div className="border-b border-[rgba(78,66,53,0.08)] pb-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Linked micro slabs
                </p>
                <h2 className="mt-3 text-2xl tracking-tight text-[var(--foreground)]">
                  Review and update attached work
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
                  onClick={() => {
                    setShowNewMicroForm((current) => !current);
                    setCreateMicroState("idle");
                    setCreateMicroError("");
                  }}
                  type="button"
                >
                  <Plus size={14} weight="bold" />
                  {showNewMicroForm ? "Close" : "New micro slab"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {showNewMicroForm ? (
              <form
                className="rounded-[1.85rem] border border-[rgba(15,118,110,0.12)] bg-[rgba(255,255,255,0.76)] p-5"
                onSubmit={createMicro}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                    New micro slab
                  </p>
                  <button
                    className={buttonClassName}
                    disabled={createMicroState === "saving"}
                    type="submit"
                  >
                    <Plus size={18} weight="bold" />
                    {createMicroState === "saving" ? "Creating..." : "Create micro"}
                  </button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_170px]">
                  <Field label="Title">
                    <input
                      className={inputClassName}
                      onChange={(event) =>
                        setNewMicroForm((current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                      placeholder="Name the next focused unit of work"
                      value={newMicroForm.title}
                    />
                  </Field>

                  <Field label="Status">
                    <select
                      className={inputClassName}
                      onChange={(event) =>
                        setNewMicroForm((current) => ({
                          ...current,
                          status: event.target.value as EditableSlabStatus,
                        }))
                      }
                      value={newMicroForm.status}
                    >
                      {EDITABLE_SLAB_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="mt-5">
                  {createMicroState === "saving" ? (
                    <div className="inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--accent)]" />
                      Creating a new linked Markdown slab.
                    </div>
                  ) : createMicroState === "saved" ? (
                    <div className="inline-flex items-center gap-2 text-sm text-[rgb(15,118,110)]">
                      <CheckCircle size={18} weight="fill" />
                      New micro slab created and linked.
                    </div>
                  ) : createMicroState === "error" ? (
                    <div className="inline-flex items-center gap-2 text-sm text-[rgb(157,23,77)]">
                      <WarningCircle size={18} weight="fill" />
                      {createMicroError || "Could not create the micro slab."}
                    </div>
                  ) : null}
                </div>
              </form>
            ) : null}

            {micros.length ? (
              micros.map((micro) => {
                const form = microForms[micro.id] ?? buildMicroFormState(micro);
                const saveState = microSaveStates[micro.id] ?? "idle";
                const error = microErrors[micro.id] ?? "";
                const ignoreState = microIgnoreStates[micro.id] ?? "idle";
                const ignoreError = microIgnoreErrors[micro.id] ?? "";

                return (
                  <details
                    className="group rounded-[1.85rem] border border-[rgba(78,66,53,0.1)] bg-[rgba(255,255,255,0.7)]"
                    key={micro.id}
                  >
                    <summary className="cursor-pointer list-none px-5 py-5 [&::-webkit-details-marker]:hidden">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                              Micro slab
                            </span>
                            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                              {micro.id}
                            </span>
                            <StatusPill status={form.status} />
                            {isCodexSuggested(micro.origin) ? (
                              <span className="inline-flex items-center rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[rgb(15,118,110)]">
                                Codex suggested
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-3 text-lg tracking-tight text-[var(--foreground)]">
                            {form.title}
                          </p>
                          <p className="mt-2 max-w-[54ch] text-sm leading-relaxed text-[var(--muted)]">
                            {form.goal || "No goal captured yet."}
                          </p>
                          {ignoreState === "error" ? (
                            <p className="mt-2 text-sm leading-relaxed text-[rgb(157,23,77)]">
                              {ignoreError || "Could not ignore the micro slab."}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            className="inline-flex items-center gap-2 rounded-full bg-[rgba(190,24,93,0.08)] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[rgb(157,23,77)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px] active:scale-[0.98]"
                            disabled={ignoreState === "saving"}
                            onClick={(event) => ignoreMicro(event, micro.id)}
                            type="button"
                          >
                            <Trash size={14} weight="bold" />
                            {ignoreState === "saving" ? "Ignoring..." : "Ignore"}
                          </button>
                          {microSourcePaths[micro.id] ? (
                            <Link
                              className="hidden rounded-full bg-[rgba(15,23,42,0.05)] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--muted)] md:inline-flex"
                              href={`/source?path=${encodeURIComponent(microSourcePaths[micro.id] ?? "")}`}
                            >
                              Source
                            </Link>
                          ) : null}
                          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                            Expand
                            <CaretDown
                              className="transition-transform duration-300 group-open:rotate-180"
                              size={14}
                              weight="bold"
                            />
                          </span>
                        </div>
                      </div>
                    </summary>

                    <form
                      className="border-t border-[rgba(78,66,53,0.08)] px-5 py-5"
                      onSubmit={(event) => saveMicro(event, micro.id)}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                            Micro slab view
                          </span>
                          <StatusPill status={form.status} />
                          {isCodexSuggested(micro.origin) ? (
                            <span className="inline-flex items-center rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-[rgb(15,118,110)]">
                              Codex suggested
                            </span>
                          ) : null}
                        </div>
                        <button
                          className={buttonClassName}
                          disabled={saveState === "saving"}
                          type="submit"
                        >
                          <FloppyDiskBack size={18} weight="bold" />
                          {saveState === "saving" ? "Saving..." : "Save micro"}
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4">
                        <div className="grid gap-4 md:grid-cols-[150px_minmax(0,1fr)]">
                          <Field label="Status">
                            <select
                              className={inputClassName}
                              onChange={(event) =>
                                setMicroForms((current) => ({
                                  ...current,
                                  [micro.id]: {
                                    ...form,
                                    status: event.target.value as EditableSlabStatus,
                                  },
                                }))
                              }
                              value={form.status}
                            >
                              {EDITABLE_SLAB_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </Field>

                          <Field label="Title">
                            <input
                              className={inputClassName}
                              onChange={(event) =>
                                setMicroForms((current) => ({
                                  ...current,
                                  [micro.id]: {
                                    ...form,
                                    title: event.target.value,
                                  },
                                }))
                              }
                              value={form.title}
                            />
                          </Field>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <Field label="Type">
                            <input
                              className={inputClassName}
                              onChange={(event) =>
                                setMicroForms((current) => ({
                                  ...current,
                                  [micro.id]: {
                                    ...form,
                                    type: event.target.value,
                                  },
                                }))
                              }
                              value={form.type}
                            />
                          </Field>

                          <Field label="Tool Surface">
                            <input
                              className={inputClassName}
                              onChange={(event) =>
                                setMicroForms((current) => ({
                                  ...current,
                                  [micro.id]: {
                                    ...form,
                                    toolSurface: event.target.value,
                                  },
                                }))
                              }
                              value={form.toolSurface}
                            />
                          </Field>
                        </div>

                        <Field label="Goal">
                          <textarea
                            className={textareaClassName}
                            onChange={(event) =>
                              setMicroForms((current) => ({
                                ...current,
                                [micro.id]: {
                                  ...form,
                                  goal: event.target.value,
                                },
                              }))
                            }
                            rows={4}
                            value={form.goal}
                          />
                        </Field>

                        <Field label="Working Context">
                          <textarea
                            className={textareaClassName}
                            onChange={(event) =>
                              setMicroForms((current) => ({
                                ...current,
                                [micro.id]: {
                                  ...form,
                                  workingContext: event.target.value,
                                },
                              }))
                            }
                            rows={4}
                            value={form.workingContext}
                          />
                        </Field>

                        <div className="grid gap-4 md:grid-cols-2">
                          <StructuredListField
                            emptyLabel="No done criteria recorded yet."
                            items={form.doneCriteria}
                            label="Done Criteria"
                            onChange={(items) =>
                              setMicroForms((current) => ({
                                ...current,
                                [micro.id]: {
                                  ...form,
                                  doneCriteria: items,
                                },
                              }))
                            }
                          />

                          <StructuredListField
                            basePath={microSourcePaths[micro.id] ?? null}
                            emptyLabel="No artifacts linked yet."
                            items={form.artifacts}
                            label="Artifacts"
                            onChange={(items) =>
                              setMicroForms((current) => ({
                                ...current,
                                [micro.id]: {
                                  ...form,
                                  artifacts: items,
                                },
                              }))
                            }
                            variant="link"
                          />
                        </div>

                        <Field label="Notes">
                          <textarea
                            className={textareaClassName}
                            onChange={(event) =>
                              setMicroForms((current) => ({
                                ...current,
                                [micro.id]: {
                                  ...form,
                                  notes: event.target.value,
                                },
                              }))
                            }
                            rows={4}
                            value={form.notes}
                          />
                        </Field>
                      </div>

                      <div className="mt-5 border-t border-[rgba(78,66,53,0.08)] pt-4">
                        <SaveNotice error={error} state={saveState} />
                      </div>
                    </form>
                  </details>
                );
              })
            ) : (
              <div className="rounded-[1.85rem] border border-dashed border-[rgba(78,66,53,0.14)] bg-[rgba(255,255,255,0.54)] px-5 py-10 text-center">
                <p className="text-base tracking-tight text-[var(--foreground)]">
                  No micro slabs are linked to this macro yet.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                  Once linked micro slab files exist, they will show up here as editable
                  working documents.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

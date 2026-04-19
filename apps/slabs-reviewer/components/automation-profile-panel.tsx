"use client";

import { startTransition, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowSquareOut,
  CheckCircle,
  FloppyDisk,
  NotePencil,
  Plus,
  WarningCircle,
} from "@phosphor-icons/react";
import type {
  AutomationCatalog,
  AutomationCatalogOption,
} from "@/lib/codex-environment";
import type { AutomationProfile } from "@/lib/slabs";

type SaveState = "idle" | "saving" | "saved" | "error";

type AutomationProfileFormState = {
  purpose: string;
  primaryRepositories: string;
  mcpServers: string[];
  codexSkills: string[];
  plugins: string[];
  notes: string;
};

function joinLines(items: string[]) {
  return items.join("\n");
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function createFormState(profile: AutomationProfile | null): AutomationProfileFormState {
  return {
    purpose: profile?.purpose ?? "",
    primaryRepositories: joinLines(profile?.primaryRepositories ?? []),
    mcpServers: profile?.mcpServers ?? [],
    codexSkills: profile?.codexSkills ?? [],
    plugins: profile?.plugins ?? [],
    notes: profile?.notes ?? "",
  };
}

function hasProfileContent(profile: AutomationProfile | null) {
  if (!profile) {
    return false;
  }

  return Boolean(
    profile.purpose ||
      profile.notes ||
      profile.primaryRepositories.length ||
      profile.mcpServers.length ||
      profile.codexSkills.length ||
      profile.plugins.length,
  );
}

function mergeCatalogOptions(
  options: AutomationCatalogOption[],
  selectedIds: string[],
) {
  const optionMap = new Map(options.map((option) => [option.id, option]));

  for (const selectedId of selectedIds) {
    if (!optionMap.has(selectedId)) {
      optionMap.set(selectedId, {
        id: selectedId,
        label: selectedId,
      });
    }
  }

  return [...optionMap.values()].sort((left, right) => left.label.localeCompare(right.label));
}

function mapSelectedLabels(
  ids: string[],
  options: AutomationCatalogOption[],
) {
  const optionMap = new Map(options.map((option) => [option.id, option.label]));
  return ids.map((id) => optionMap.get(id) ?? id);
}

function SectionCard({
  items,
  title,
}: {
  items: string[];
  title: string;
}) {
  if (!items.length) {
    return null;
  }

  return (
    <article className="min-w-0 rounded-[1.6rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.64)] p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{title}</p>
      <ul className="mt-4 grid gap-3 pl-5 text-sm leading-7 text-[var(--foreground)]">
        {items.map((item) => (
          <li key={`${title}-${item}`} className="min-w-0 list-disc">
            <span className="block min-w-0 break-all">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function OptionChecklistCard({
  options,
  selectedIds,
  title,
  toggle,
}: {
  options: AutomationCatalogOption[];
  selectedIds: string[];
  title: string;
  toggle: (id: string) => void;
}) {
  const mergedOptions = mergeCatalogOptions(options, selectedIds);

  return (
    <article className="rounded-[1.6rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.64)] p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{title}</p>
      <div className="mt-4 grid max-h-[240px] gap-2 overflow-y-auto pr-1">
        {mergedOptions.map((option) => {
          const isSelected = selectedIds.includes(option.id);

          return (
            <label
              className="flex min-w-0 items-start gap-3 rounded-[1rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.72)] px-3 py-2"
              key={`${title}-${option.id}`}
            >
              <input
                checked={isSelected}
                className="mt-1 h-4 w-4 accent-[var(--accent)]"
                onChange={() => toggle(option.id)}
                type="checkbox"
              />
              <span className="min-w-0 text-sm leading-6 text-[var(--foreground)] break-all">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </article>
  );
}

function MultilineField({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{label}</span>
      <textarea
        className="min-h-[132px] w-full rounded-[1.35rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

export function AutomationProfilePanel({
  catalog,
  profile,
  projectSlug,
  sourcePath,
}: {
  catalog: AutomationCatalog;
  profile: AutomationProfile | null;
  projectSlug: string;
  sourcePath: string | null;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState<AutomationProfileFormState>(() =>
    createFormState(profile),
  );

  const hasContent = hasProfileContent(profile);
  const selectedMcpServerLabels = mapSelectedLabels(
    profile?.mcpServers ?? [],
    catalog.mcpServers,
  );
  const selectedCodexSkillLabels = mapSelectedLabels(
    profile?.codexSkills ?? [],
    catalog.codexSkills,
  );
  const selectedPluginLabels = mapSelectedLabels(
    profile?.plugins ?? [],
    catalog.plugins,
  );

  function resetEditor() {
    setForm(createFormState(profile));
    setSaveState("idle");
    setError("");
  }

  function toggleSelection(
    key: "mcpServers" | "codexSkills" | "plugins",
    id: string,
  ) {
    setForm((current) => {
      const currentValues = current[key];

      return {
        ...current,
        [key]: currentValues.includes(id)
          ? currentValues.filter((value) => value !== id)
          : [...currentValues, id],
      };
    });
  }

  async function saveAutomationProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveState("saving");
    setError("");

    try {
      const response = await fetch(`/api/project/${projectSlug}/automation-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          purpose: form.purpose.trim(),
          primaryRepositories: splitLines(form.primaryRepositories),
          mcpServers: form.mcpServers,
          codexSkills: form.codexSkills,
          plugins: form.plugins,
          notes: form.notes.trim(),
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Could not save the automation profile.");
      }

      setSaveState("saved");
      setIsEditing(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (saveError) {
      setSaveState("error");
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Could not save the automation profile.",
      );
    }
  }

  return (
    <section className="rounded-[2.25rem] border border-[var(--line)] bg-[var(--panel-strong)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-7">
      <div className="border-b border-[rgba(78,66,53,0.08)] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            Automation profile
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {sourcePath ? (
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.05)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
                href={`/source?path=${encodeURIComponent(sourcePath)}`}
              >
                <ArrowSquareOut size={14} weight="bold" />
                Open source file
              </Link>
            ) : null}

            <button
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,118,110,0.16)] bg-[rgba(15,118,110,0.08)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[rgb(15,118,110)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
              onClick={() => {
                setIsEditing((current) => !current);
                resetEditor();
              }}
              type="button"
            >
              {hasContent ? (
                <NotePencil size={14} weight="bold" />
              ) : (
                <Plus size={14} weight="bold" />
              )}
              {hasContent ? "Edit profile" : "Add profile"}
            </button>
          </div>
        </div>
      </div>

      {isEditing ? (
        <form className="mt-5 grid gap-5" onSubmit={saveAutomationProfile}>
          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Purpose
            </span>
            <textarea
              className="min-h-[132px] w-full rounded-[1.35rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white"
              onChange={(event) =>
                setForm((current) => ({ ...current, purpose: event.target.value }))
              }
              value={form.purpose}
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <MultilineField
              label="Primary repositories"
              onChange={(value) =>
                setForm((current) => ({ ...current, primaryRepositories: value }))
              }
              placeholder="/Users/daviddeveney/Documents/goals/LovableRoundReserve"
              value={form.primaryRepositories}
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <OptionChecklistCard
              options={catalog.mcpServers}
              selectedIds={form.mcpServers}
              title="MCP servers"
              toggle={(id) => toggleSelection("mcpServers", id)}
            />
            <OptionChecklistCard
              options={catalog.codexSkills}
              selectedIds={form.codexSkills}
              title="Codex skills"
              toggle={(id) => toggleSelection("codexSkills", id)}
            />
            <OptionChecklistCard
              options={catalog.plugins}
              selectedIds={form.plugins}
              title="Plugins"
              toggle={(id) => toggleSelection("plugins", id)}
            />
          </div>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Notes
            </span>
            <textarea
              className="min-h-[132px] w-full rounded-[1.35rem] border border-[rgba(78,66,53,0.12)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors focus:border-[rgba(15,118,110,0.32)] focus:bg-white"
              onChange={(event) =>
                setForm((current) => ({ ...current, notes: event.target.value }))
              }
              value={form.notes}
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,118,110,0.18)] bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-[1px] active:scale-[0.98]"
              disabled={saveState === "saving"}
              type="submit"
            >
              <FloppyDisk size={18} weight="bold" />
              {saveState === "saving" ? "Saving..." : "Save profile"}
            </button>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(15,23,42,0.08)] bg-[rgba(15,23,42,0.05)] px-5 py-3 text-sm text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
              onClick={() => {
                setIsEditing(false);
                resetEditor();
              }}
              type="button"
            >
              Close
            </button>
          </div>

          {saveState === "saved" ? (
            <div className="inline-flex items-center gap-2 text-sm text-[rgb(15,118,110)]">
              <CheckCircle size={18} weight="fill" />
              Automation profile saved.
            </div>
          ) : null}

          {saveState === "error" ? (
            <div className="inline-flex items-center gap-2 text-sm text-[rgb(157,23,77)]">
              <WarningCircle size={18} weight="fill" />
              {error}
            </div>
          ) : null}
        </form>
      ) : hasContent ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {profile?.purpose ? (
            <article className="rounded-[1.6rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.64)] p-5 md:col-span-2 xl:col-span-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Purpose
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
                {profile.purpose}
              </p>
            </article>
          ) : null}

          <SectionCard
            items={profile?.primaryRepositories ?? []}
            title="Primary repositories"
          />
          <SectionCard items={selectedMcpServerLabels} title="MCP servers" />
          <SectionCard items={selectedCodexSkillLabels} title="Codex skills" />
          <SectionCard items={selectedPluginLabels} title="Plugins" />

          {profile?.notes ? (
            <article className="rounded-[1.6rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.64)] p-5 md:col-span-2 xl:col-span-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                Notes
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
                {profile.notes}
              </p>
            </article>
          ) : null}
        </div>
      ) : (
        <div className="py-10 text-base tracking-tight text-[var(--foreground)]">
          No automation profile yet.
        </div>
      )}
    </section>
  );
}

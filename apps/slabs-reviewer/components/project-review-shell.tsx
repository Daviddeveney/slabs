import {
  ClockCounterClockwise,
  ListChecks,
  Stack,
} from "@phosphor-icons/react/dist/ssr";
import { AutomationProfilePanel } from "@/components/automation-profile-panel";
import { BriefLinkManager } from "@/components/brief-link-manager";
import { ProjectMacroPanel } from "@/components/project-macro-panel";
import { getAutomationCatalog } from "@/lib/codex-environment";
import { getAutomationProfileSourcePath, sortSlabsForReview } from "@/lib/slabs";
import type { ProjectDetails } from "@/lib/slabs";

export function ProjectReviewShell({ project }: { project: ProjectDetails }) {
  const macros = sortSlabsForReview(project.macros);
  const visibleMicros = project.micros.filter((micro) => micro.status !== "Superseded");
  const automationCatalog = getAutomationCatalog();
  const automationProfileSourcePath = getAutomationProfileSourcePath(project.slug);
  const linkedMicroCounts = visibleMicros.reduce<Record<string, number>>(
    (counts, micro) => {
      if (!micro.parentMacroId) {
        return counts;
      }

      counts[micro.parentMacroId] = (counts[micro.parentMacroId] ?? 0) + 1;
      return counts;
    },
    {},
  );

  return (
    <div className="grid gap-6">
      <section className="rounded-[2.5rem] border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-10">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
          Project view
        </p>
        <h1 className="mt-5 max-w-[11ch] text-4xl tracking-tighter text-[var(--foreground)] md:text-6xl md:leading-none">
          {project.title}
        </h1>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <BriefLinkManager briefUrl={project.primaryArtifact} projectSlug={project.slug} />

          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-4 py-2.5 text-sm text-[var(--muted)]">
            <Stack size={18} weight="duotone" />
            {project.macros.length} macros
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-4 py-2.5 text-sm text-[var(--muted)]">
            <ListChecks size={18} weight="duotone" />
            {visibleMicros.length} micros
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,23,42,0.05)] px-4 py-2.5 text-sm text-[var(--muted)]">
            <ClockCounterClockwise size={18} weight="duotone" />
            {project.memoryCount} memory files
          </span>
        </div>
      </section>

      <AutomationProfilePanel
        catalog={automationCatalog}
        profile={project.automationProfile}
        projectSlug={project.slug}
        sourcePath={automationProfileSourcePath}
      />

      <ProjectMacroPanel
        linkedMicroCounts={linkedMicroCounts}
        macros={macros.map((macro) => ({
          id: macro.id,
          title: macro.title,
          status: macro.status,
        }))}
        projectSlug={project.slug}
      />
    </div>
  );
}

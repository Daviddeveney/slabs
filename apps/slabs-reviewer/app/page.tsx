import { GlobalContextShell } from "@/components/global-context-shell";
import { ProjectsHomeShell } from "@/components/projects-home-shell";
import { getGlobalContextIndex, getProjectsIndex } from "@/lib/slabs";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const globalContext = getGlobalContextIndex();
  const projects = getProjectsIndex();

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
      <section className="rounded-[2.5rem] border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-10">
        <p className="text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
          Local workspace
        </p>
        <h1 className="mt-5 text-4xl tracking-tighter text-[var(--foreground)] md:text-6xl md:leading-none">
          Slabs
        </h1>
        <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-[var(--muted)]">
          Review shared workspace context, open live briefs, and step into macro
          work without spending time inside raw Markdown files.
        </p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <GlobalContextShell items={globalContext} />
        <ProjectsHomeShell initialProjects={projects} />
      </div>
    </main>
  );
}

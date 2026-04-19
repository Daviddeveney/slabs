import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowLeft, FileText, FolderOpen } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import { BriefLinkManager } from "@/components/brief-link-manager";
import { GlobalContextCreator } from "@/components/global-context-creator";
import { getProjectDetails } from "@/lib/slabs";

export const dynamic = "force-dynamic";

const SLABS_ROOT = path.resolve(/* turbopackIgnore: true */ process.cwd(), "../..");

function normalizeRepoPath(input: string) {
  return input.replace(/\\/g, "/").replace(/^\/+/, "");
}

function toAbsoluteRepoPath(repoPath: string) {
  return path.resolve(/* turbopackIgnore: true */ SLABS_ROOT, repoPath);
}

function isInsideRepo(filePath: string) {
  const relative = path.relative(SLABS_ROOT, filePath);
  return !!relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

export default async function SourcePage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  const { path: rawPath } = await searchParams;
  const repoPath = normalizeRepoPath(rawPath ?? "");
  const workBriefMatch = repoPath.match(/^projects\/([^/]+)\/work-brief\.md$/);

  if (!repoPath) {
    notFound();
  }

  if (workBriefMatch) {
    const projectSlug = workBriefMatch[1];
    const project = getProjectDetails(projectSlug);

    return (
      <main className="mx-auto min-h-[100dvh] max-w-[1200px] px-4 py-6 md:px-8 md:py-10">
        <div className="mb-6">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.58)] px-4 py-2 text-sm text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
            href={project ? `/project/${projectSlug}` : "/"}
          >
            <ArrowLeft size={16} weight="bold" />
            {project ? `Back to ${project.title}` : "Back to workspace"}
          </Link>
        </div>

        <section className="rounded-[2.25rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <FileText className="text-[var(--accent)]" size={20} weight="duotone" />
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Brief link
                </p>
              </div>
            </div>
          </div>
          <h1 className="mt-4 text-3xl tracking-tight text-[var(--foreground)]">
            Work briefs live in Google Docs
          </h1>
          <p className="mt-3 text-sm text-[var(--muted)]">{repoPath}</p>
          <div className="mt-6 rounded-[1.5rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.68)] p-5">
            <p className="text-base leading-relaxed text-[var(--foreground)]">
              This project no longer uses a repo-managed `work-brief.md` as the live
              brief.
            </p>
            {project ? (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <BriefLinkManager
                  briefUrl={project.primaryArtifact}
                  projectSlug={projectSlug}
                />
              </div>
            ) : null}
          </div>
        </section>
      </main>
    );
  }

  const absolutePath = toAbsoluteRepoPath(repoPath);
  if (!isInsideRepo(absolutePath) || !fs.existsSync(absolutePath)) {
    notFound();
  }

  const stat = fs.statSync(absolutePath);
  const isGlobalContextSurface =
    repoPath === "global-context" || repoPath.startsWith("global-context/");

  if (stat.isDirectory()) {
    const entries = fs
      .readdirSync(absolutePath, { withFileTypes: true })
      .sort((left, right) => left.name.localeCompare(right.name));

    return (
      <main className="mx-auto min-h-[100dvh] max-w-[1200px] px-4 py-6 md:px-8 md:py-10">
        <div className="mb-6">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.58)] px-4 py-2 text-sm text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
            href="/"
          >
            <ArrowLeft size={16} weight="bold" />
            Back to workspace
          </Link>
        </div>

        <section className="rounded-[2.25rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <FolderOpen className="text-[var(--accent)]" size={20} weight="duotone" />
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Directory preview
                </p>
              </div>
            </div>
            {isGlobalContextSurface ? <GlobalContextCreator /> : null}
          </div>
          <h1 className="mt-4 text-3xl tracking-tight text-[var(--foreground)]">
            {repoPath}
          </h1>
          <div className="mt-6 grid gap-3">
            {entries.map((entry) => {
              const nextPath = normalizeRepoPath(path.posix.join(repoPath, entry.name));

              return (
                <Link
                  className="rounded-[1.25rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.64)] px-4 py-3 text-sm text-[var(--foreground)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.99]"
                  href={`/source?path=${encodeURIComponent(nextPath)}`}
                  key={entry.name}
                >
                  {entry.name}
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    );
  }

  const content = fs.readFileSync(absolutePath, "utf8");

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[1200px] px-4 py-6 md:px-8 md:py-10">
      <div className="mb-6">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.58)] px-4 py-2 text-sm text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
          href="/"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to workspace
        </Link>
      </div>

      <section className="rounded-[2.25rem] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[var(--shadow)] shadow-[inset_0_1px_0_rgba(255,255,255,0.62)] md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <FileText className="text-[var(--accent)]" size={20} weight="duotone" />
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Source preview
              </p>
            </div>
          </div>
          {isGlobalContextSurface ? <GlobalContextCreator /> : null}
        </div>
        <h1 className="mt-4 text-3xl tracking-tight text-[var(--foreground)]">
          {path.basename(repoPath)}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">{repoPath}</p>
        <pre className="mt-6 overflow-x-auto rounded-[1.5rem] border border-[rgba(78,66,53,0.08)] bg-[rgba(255,255,255,0.68)] p-5 font-[var(--font-mono)] text-sm leading-7 text-[var(--foreground)] whitespace-pre-wrap">
          {content}
        </pre>
      </section>
    </main>
  );
}

import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import { ProjectReviewShell } from "@/components/project-review-shell";
import { SurfaceTrail } from "@/components/surface-trail";
import { getProjectDetails } from "@/lib/slabs";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectDetails(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-[100dvh] max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
      <div className="mb-6 grid gap-3 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.58)] px-4 py-2 text-sm text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-[1px] active:scale-[0.98]"
          href="/"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to projects
        </Link>
        <SurfaceTrail
          segments={[
            { label: "Workspace", href: "/" },
            { label: project.title, href: `/project/${project.slug}` },
            { label: "Project view", active: true, href: `/project/${project.slug}` },
          ]}
        />
      </div>
      <ProjectReviewShell project={project} />
    </main>
  );
}

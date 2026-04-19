import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(/* turbopackIgnore: true */ process.cwd(), "../..");
const SCAFFOLD_SCRIPT = path.join(REPO_ROOT, "scripts", "scaffold_project.sh");

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function slugifyProjectTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidProjectSlug(value: string) {
  return /^[a-z0-9][a-z0-9-]*$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = stringValue(body.title).trim();
    const requestedSlug = stringValue(body.slug).trim();

    if (!title) {
      return NextResponse.json({ error: "Project title is required." }, { status: 400 });
    }

    const slug = requestedSlug || slugifyProjectTitle(title);
    if (!slug) {
      return NextResponse.json(
        { error: "Could not derive a valid project slug from that title." },
        { status: 400 },
      );
    }

    if (!isValidProjectSlug(slug)) {
      return NextResponse.json(
        {
          error:
            "Project slug must be lower-case kebab-case, for example: client-portal",
        },
        { status: 400 },
      );
    }

    await execFileAsync(SCAFFOLD_SCRIPT, [slug, title], {
      cwd: REPO_ROOT,
    });

    revalidatePath("/");
    revalidatePath(`/project/${slug}`);

    return NextResponse.json({
      project: {
        slug,
        title,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create the project.";

    if (message.includes("already exists")) {
      return NextResponse.json(
        { error: "A project with that slug already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: message || "Could not create the project." },
      { status: 500 },
    );
  }
}

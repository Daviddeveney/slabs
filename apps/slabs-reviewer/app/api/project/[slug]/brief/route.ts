import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { updateProjectBriefLink } from "@/lib/slabs";

export const runtime = "nodejs";

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const url = stringValue(body.url).trim();

    if (!url) {
      return NextResponse.json(
        { error: "Google Docs brief link is required." },
        { status: 400 },
      );
    }

    const briefUrl = updateProjectBriefLink(slug, url);

    revalidatePath("/");
    revalidatePath(`/project/${slug}`);

    return NextResponse.json({ briefUrl });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save the brief link.";

    if (message === "Project not found.") {
      return NextResponse.json({ error: message }, { status: 404 });
    }

    if (message === "Add a valid Google Docs document link.") {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    return NextResponse.json(
      { error: message || "Could not save the brief link." },
      { status: 500 },
    );
  }
}

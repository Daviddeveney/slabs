import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createMicroSlab } from "@/lib/slabs";
import { isEditableSlabStatus } from "@/lib/slab-statuses";

export const runtime = "nodejs";

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string; macroId: string }> },
) {
  const { slug, macroId } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = stringValue(body.title).trim();
    if (!title) {
      return NextResponse.json({ error: "Micro title is required." }, { status: 400 });
    }

    const requestedStatus = isEditableSlabStatus(body.status)
      ? body.status
      : "Backlog";
    const micro = createMicroSlab(slug, macroId, {
      title,
      status: requestedStatus,
      origin: stringValue(body.origin).trim(),
      type: stringValue(body.type).trim() || "Execution",
      toolSurface: stringValue(body.toolSurface).trim() || "Markdown",
      goal: stringValue(body.goal).trim(),
      workingContext:
        stringValue(body.workingContext).trim() ||
        "Created from the local review surface and linked directly to this macro.",
      notes: stringValue(body.notes).trim(),
    });

    revalidatePath("/");
    revalidatePath(`/project/${slug}`);
    revalidatePath(`/project/${slug}/macro/${macroId}`);

    return NextResponse.json({ micro });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create the micro slab.";
    const status =
      message === "Project not found." || message === "Macro slab not found." ? 404 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { updateMicroSlab } from "@/lib/slabs";
import { isEditableSlabStatus } from "@/lib/slab-statuses";

export const runtime = "nodejs";

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function stringList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string; microId: string }> },
) {
  const { slug, microId } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const status = body.status;

    if (!isEditableSlabStatus(status)) {
      return NextResponse.json({ error: "Invalid slab status." }, { status: 400 });
    }

    const title = stringValue(body.title).trim();
    if (!title) {
      return NextResponse.json({ error: "Micro title is required." }, { status: 400 });
    }

    const micro = updateMicroSlab(slug, microId, {
      title,
      status,
      type: stringValue(body.type),
      toolSurface: stringValue(body.toolSurface),
      goal: stringValue(body.goal),
      workingContext: stringValue(body.workingContext),
      doneCriteria: stringList(body.doneCriteria),
      artifacts: stringList(body.artifacts),
      notes: stringValue(body.notes),
    });

    revalidatePath("/");
    revalidatePath(`/project/${slug}`);
    if (micro.parentMacroId) {
      revalidatePath(`/project/${slug}/macro/${micro.parentMacroId}`);
    }

    return NextResponse.json({ micro });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save the micro slab.";
    const status =
      message === "Micro slab not found."
        ? 404
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

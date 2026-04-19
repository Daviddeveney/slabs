import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { updateMacroSlab } from "@/lib/slabs";
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
  context: { params: Promise<{ slug: string; macroId: string }> },
) {
  const { slug, macroId } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const status = body.status;

    if (!isEditableSlabStatus(status)) {
      return NextResponse.json({ error: "Invalid slab status." }, { status: 400 });
    }

    const title = stringValue(body.title).trim();
    if (!title) {
      return NextResponse.json({ error: "Macro title is required." }, { status: 400 });
    }

    const macro = updateMacroSlab(slug, macroId, {
      title,
      status,
      objective: stringValue(body.objective),
      whyItMatters: stringValue(body.whyItMatters),
      inScope: stringList(body.inScope),
      outOfScope: stringList(body.outOfScope),
      dependencies: stringList(body.dependencies),
      doneCriteria: stringList(body.doneCriteria),
      artifacts: stringList(body.artifacts),
      notes: stringValue(body.notes),
    });

    revalidatePath("/");
    revalidatePath(`/project/${slug}`);
    revalidatePath(`/project/${slug}/macro/${macroId}`);

    return NextResponse.json({ macro });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save the macro slab.";
    const status =
      message === "Macro slab not found."
        ? 404
        : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

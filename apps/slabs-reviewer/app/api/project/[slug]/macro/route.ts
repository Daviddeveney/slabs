import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createMacroSlab } from "@/lib/slabs";

export const runtime = "nodejs";

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = stringValue(body.title).trim();

    if (!title) {
      return NextResponse.json({ error: "Macro title is required." }, { status: 400 });
    }

    const macro = createMacroSlab(slug, {
      title,
      status: "Backlog",
    });

    revalidatePath(`/project/${slug}`);
    revalidatePath(`/project/${slug}/macro/${macro.id}`);

    return NextResponse.json({ macro });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create the macro slab.";

    if (message === "Project not found.") {
      return NextResponse.json({ error: message }, { status: 404 });
    }

    return NextResponse.json(
      { error: message || "Could not create the macro slab." },
      { status: 500 },
    );
  }
}

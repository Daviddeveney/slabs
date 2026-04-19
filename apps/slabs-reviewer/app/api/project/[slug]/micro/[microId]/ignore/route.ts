import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ignoreMicroSlab } from "@/lib/slabs";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  context: { params: Promise<{ slug: string; microId: string }> },
) {
  const { slug, microId } = await context.params;

  try {
    const micro = ignoreMicroSlab(slug, microId);

    revalidatePath("/");
    revalidatePath(`/project/${slug}`);
    if (micro.parentMacroId) {
      revalidatePath(`/project/${slug}/macro/${micro.parentMacroId}`);
    }

    return NextResponse.json({ micro });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not ignore the micro slab.";
    const status = message === "Micro slab not found." ? 404 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}

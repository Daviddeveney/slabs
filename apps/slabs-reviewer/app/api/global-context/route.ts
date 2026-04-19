import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createGlobalContextNote } from "@/lib/slabs";

export const runtime = "nodejs";

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const title = stringValue(body.title).trim();
    const summary = stringValue(body.summary).trim();

    if (!title) {
      return NextResponse.json(
        { error: "Shared context title is required." },
        { status: 400 },
      );
    }

    const item = createGlobalContextNote({
      title,
      summary,
    });

    revalidatePath("/");
    revalidatePath("/source");

    return NextResponse.json({ item });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create the shared context.";

    return NextResponse.json(
      { error: message || "Could not create the shared context." },
      { status: 500 },
    );
  }
}

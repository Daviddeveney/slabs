import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { updateAutomationProfile } from "@/lib/slabs";

export const runtime = "nodejs";

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function stringList(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => stringValue(item).trim()).filter(Boolean)
    : [];
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  try {
    const body = (await request.json()) as Record<string, unknown>;

    const automationProfile = updateAutomationProfile(slug, {
      purpose: stringValue(body.purpose).trim(),
      primaryRepositories: stringList(body.primaryRepositories),
      mcpServers: stringList(body.mcpServers),
      codexSkills: stringList(body.codexSkills),
      plugins: stringList(body.plugins),
      notes: stringValue(body.notes).trim(),
    });

    revalidatePath("/");
    revalidatePath(`/project/${slug}`);
    revalidatePath("/source");

    return NextResponse.json({ automationProfile });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save the automation profile.";

    if (message === "Project not found.") {
      return NextResponse.json({ error: message }, { status: 404 });
    }

    return NextResponse.json(
      { error: message || "Could not save the automation profile." },
      { status: 500 },
    );
  }
}

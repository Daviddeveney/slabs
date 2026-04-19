---
name: google-doc-work-brief
description: Create a new Google Doc as the starting work brief for a Slabs initiative. Use when the user wants to start a project brief in Google Docs, seed the brief from the Slabs work brief template, or create a shareable editable work-brief artifact through the Google Drive plugin.
---

# Google Doc Work Brief

Use this skill when the default starting surface for a new Slabs work brief should be a native Google Doc rather than a local Markdown file.

This skill should use the [@google-drive](plugin://google-drive@openai-curated) plugin to create and seed the document.

## Source Template

- Read the local Slabs template first: [../../templates/work-brief-template.md](../../templates/work-brief-template.md)
- Treat the template as the canonical structure for the first pass of the document.

## Workflow

1. Ground the initiative title and scope.
- If the user gives a project or initiative name, use it.
- If the title is missing, infer a concise working title from the request and state that assumption in the final response.

2. Create a native Google Doc.
- Use the Google Drive plugin to create a new file with MIME type `application/vnd.google-apps.document`.
- Prefer the title format `Work Brief - <Initiative Name>` unless the user asked for a different naming pattern.

3. Seed the new doc from the Slabs template.
- Use the local `templates/work-brief-template.md` headings as the base structure.
- Replace `<Title>` with the chosen initiative name.
- Insert the headings even when section content is still blank.

4. Pre-fill what is already known.
- If the user already supplied enough context, draft concise first-pass content for `Summary`, `Why This Work Matters`, and any other clearly grounded sections.
- Leave short placeholders like `TBD` or `Add stakeholders` where information is not yet available.
- Do not invent detailed outcomes, decisions, or stakeholder lists when the request did not provide them.

5. Return the doc as the new system of record for the brief.
- Share the Google Doc link in the response.
- Summarize any assumptions you made while seeding the document.
- If the user wants the Markdown copy too, export or mirror it only after the Google Doc exists.

## Rules

- Default to Google Docs for this workflow, not a local file.
- Use the Google Drive plugin for document creation and Google Doc content updates.
- Keep the document editable and lightweight; do not over-format the first pass.
- Do not ask the user for a Google Doc URL when the task is to start a brand-new brief.
- Avoid creating duplicate briefs if the user clearly refers to an existing Google Doc; in that case, ground the existing file first and continue there.

## Good Output

A strong first-pass work brief document should:

- have the full work-brief structure in place
- reflect the initiative name in the document title and heading
- contain grounded starter content where the request already provides it
- leave obvious blanks for unresolved sections rather than hallucinating them
- give the user an editable artifact they can refine with future Codex sessions

import fs from "node:fs";
import path from "node:path";
import {
  type EditableSlabStatus,
  type SlabStatus,
  isStoredSlabStatus,
} from "@/lib/slab-statuses";

export type MacroSlab = {
  id: string;
  title: string;
  status: SlabStatus;
  objective: string;
  whyItMatters: string;
  inScope: string[];
  outOfScope: string[];
  dependencies: string[];
  doneCriteria: string[];
  artifacts: string[];
  notes: string;
  linkedMicroIds: string[];
};

export type MicroSlab = {
  id: string;
  title: string;
  status: SlabStatus;
  parentMacroId: string;
  origin: string;
  type: string;
  toolSurface: string;
  goal: string;
  workingContext: string;
  doneCriteria: string[];
  artifacts: string[];
  notes: string;
};

export type AutomationProfile = {
  purpose: string;
  primaryRepositories: string[];
  mcpServers: string[];
  codexSkills: string[];
  plugins: string[];
  notes: string;
};

export type ProjectIndexItem = {
  slug: string;
  title: string;
  summary: string;
  macroCount: number;
  microCount: number;
  memoryCount: number;
  primaryStatus: SlabStatus;
};

export type GlobalContextItem = {
  slug: string;
  title: string;
  summary: string;
  repoPath: string;
};

export type ProjectDetails = {
  slug: string;
  title: string;
  summary: string;
  primaryArtifact: string | null;
  automationProfile: AutomationProfile | null;
  memoryCount: number;
  macros: MacroSlab[];
  micros: MicroSlab[];
};

export type MacroSlabUpdateInput = {
  title: string;
  status: EditableSlabStatus;
  objective: string;
  whyItMatters: string;
  inScope: string[];
  outOfScope: string[];
  dependencies: string[];
  doneCriteria: string[];
  artifacts: string[];
  notes: string;
};

export type MicroSlabUpdateInput = {
  title: string;
  status: EditableSlabStatus;
  type: string;
  toolSurface: string;
  goal: string;
  workingContext: string;
  doneCriteria: string[];
  artifacts: string[];
  notes: string;
};

export type CreateMicroSlabInput = {
  title: string;
  status: EditableSlabStatus;
  origin?: string;
  type: string;
  toolSurface: string;
  goal: string;
  workingContext: string;
  notes: string;
};

export type CreateMacroSlabInput = {
  title: string;
  status: EditableSlabStatus;
};

export type CreateGlobalContextInput = {
  title: string;
  summary: string;
};

export type AutomationProfileUpdateInput = {
  purpose: string;
  primaryRepositories: string[];
  mcpServers: string[];
  codexSkills: string[];
  plugins: string[];
  notes: string;
};

function isVisibleMicroSlabStatus(status: SlabStatus) {
  return status !== "Superseded";
}

const REVIEW_PRIORITY: Record<SlabStatus, number> = {
  Active: 0,
  Ready: 1,
  Backlog: 2,
  Blocked: 3,
  Superseded: 4,
  Done: 5,
};

const SLABS_ROOT = path.resolve(process.cwd(), "../..");
const PROJECTS_DIR = path.join(SLABS_ROOT, "projects");
const GLOBAL_CONTEXT_DIR = path.join(SLABS_ROOT, "global-context");
const TEMPLATES_DIR = path.join(SLABS_ROOT, "templates");
const MACRO_SLAB_TEMPLATE_PATH = path.join(TEMPLATES_DIR, "macro-slab-template.md");
const AUTOMATION_PROFILE_TEMPLATE_PATH = path.join(
  TEMPLATES_DIR,
  "automation-profile-template.md",
);
const GLOBAL_CONTEXT_TEMPLATE_PATH = path.join(
  TEMPLATES_DIR,
  "global-context-note-template.md",
);

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readFileIfPresent(filePath: string) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  return fs.readFileSync(filePath, "utf8");
}

function listProjectSlugs() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));
}

function extractTitle(markdown: string, prefix: string) {
  const match = markdown.match(new RegExp(`^#\\s+${prefix}:\\s+(.+)$`, "m"));
  return match?.[1]?.trim() ?? "";
}

function findSectionRange(markdown: string, heading: string) {
  const headingRegex = new RegExp(`^##\\s+${escapeRegex(heading)}\\s*$`, "m");
  const headingMatch = headingRegex.exec(markdown);

  if (!headingMatch || headingMatch.index === undefined) {
    return null;
  }

  const sectionStart = headingMatch.index;
  const bodyStart = sectionStart + headingMatch[0].length;
  const remainder = markdown.slice(bodyStart);
  const nextHeadingMatch = /\n##\s+/.exec(remainder);
  const sectionEnd = nextHeadingMatch
    ? bodyStart + nextHeadingMatch.index
    : markdown.length;

  return {
    sectionStart,
    bodyStart,
    sectionEnd,
  };
}

function extractSection(markdown: string, heading: string) {
  const range = findSectionRange(markdown, heading);
  if (!range) {
    return "";
  }

  return markdown.slice(range.bodyStart, range.sectionEnd).trim();
}

function parseBullets(section: string) {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim());
}

function parseStatus(section: string): SlabStatus {
  const match = section.match(/`([^`]+)`/);
  const status = match?.[1]?.trim() as SlabStatus | undefined;

  if (status && isStoredSlabStatus(status)) {
    return status;
  }

  return "Backlog";
}

function parseLinkedIds(items: string[], prefix: "MI" | "M") {
  return items
    .map((item) => item.match(new RegExp(`${prefix}-?\\d+`))?.[0] ?? "")
    .filter(Boolean);
}

function parseMacroSlab(markdown: string): MacroSlab {
  const fullTitle = extractTitle(markdown, "Macro Slab");
  const [id = "", ...titleParts] = fullTitle.split(" ");

  return {
    id,
    title: titleParts.join(" ").trim(),
    status: parseStatus(extractSection(markdown, "Status")),
    objective: extractSection(markdown, "Objective"),
    whyItMatters: extractSection(markdown, "Why It Matters"),
    inScope: parseBullets(extractSection(markdown, "In Scope")),
    outOfScope: parseBullets(extractSection(markdown, "Out of Scope")),
    dependencies: parseBullets(extractSection(markdown, "Dependencies")),
    doneCriteria: parseBullets(extractSection(markdown, "Done Criteria")),
    artifacts: parseBullets(extractSection(markdown, "Artifacts")),
    notes: extractSection(markdown, "Notes"),
    linkedMicroIds: parseLinkedIds(
      parseBullets(extractSection(markdown, "Linked Micro Slabs")),
      "MI",
    ),
  };
}

function parseMicroSlab(markdown: string): MicroSlab {
  const fullTitle = extractTitle(markdown, "Micro Slab");
  const [id = "", ...titleParts] = fullTitle.split(" ");
  const parentMacroSection = extractSection(markdown, "Parent Macro Slab");

  return {
    id,
    title: titleParts.join(" ").trim(),
    status: parseStatus(extractSection(markdown, "Status")),
    parentMacroId: parentMacroSection.match(/M\d+/)?.[0] ?? "",
    origin: extractSection(markdown, "Origin"),
    type: extractSection(markdown, "Type"),
    toolSurface: extractSection(markdown, "Tool Surface"),
    goal: extractSection(markdown, "Goal"),
    workingContext: extractSection(markdown, "Working Context"),
    doneCriteria: parseBullets(extractSection(markdown, "Done Criteria")),
    artifacts: parseBullets(extractSection(markdown, "Artifacts")),
    notes: extractSection(markdown, "Notes"),
  };
}

function parseAutomationProfile(markdown: string): AutomationProfile {
  return {
    purpose: extractSection(markdown, "Purpose"),
    primaryRepositories: parseBullets(extractSection(markdown, "Primary Repositories")),
    mcpServers: parseBullets(extractSection(markdown, "MCP Servers")),
    codexSkills:
      parseBullets(extractSection(markdown, "Codex Skills")) ||
      parseBullets(extractSection(markdown, "Skills")),
    plugins: parseBullets(extractSection(markdown, "Plugins")),
    notes: extractSection(markdown, "Notes"),
  };
}

function readDirectoryMarkdown(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right))
    .map((fileName) => readFileIfPresent(path.join(dirPath, fileName)));
}

function readMarkdownEntriesRecursively(
  dirPath: string,
): Array<{ absolutePath: string; repoPath: string; markdown: string }> {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const absolutePath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        return readMarkdownEntriesRecursively(absolutePath);
      }

      if (!entry.name.endsWith(".md")) {
        return [];
      }

      return [
        {
          absolutePath,
          repoPath: path.relative(SLABS_ROOT, absolutePath).replace(/\\/g, "/"),
          markdown: readFileIfPresent(absolutePath),
        },
      ];
    });
}

function extractFirstHeading(markdown: string) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
}

function extractLeadParagraph(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .filter((chunk) => !chunk.startsWith("#"))
    .find((chunk) => !chunk.startsWith("##"))
    ?.replace(/\n/g, " ")
    .trim() ?? "";
}

function humanizeFileName(value: string) {
  return value
    .replace(/\.md$/i, "")
    .split(/[-_/]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function isGoogleDocsDocumentUrl(value: string) {
  return /^https:\/\/docs\.google\.com\/document\/d\/[^/\s]+/i.test(value.trim());
}

function extractFirstUrl(value: string) {
  return value.match(/https?:\/\/[^\s`]+/)?.[0] ?? "";
}

function normalizeProjectSummary(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "";
  }

  if (normalized === "This project follows the canonical Slabs layout.") {
    return "";
  }

  return normalized;
}

function readProjectBriefLink(projectDir: string) {
  const briefLinkFile = readFileIfPresent(path.join(projectDir, "brief-link.txt"));
  const url = extractFirstUrl(briefLinkFile);
  return isGoogleDocsDocumentUrl(url) ? url : null;
}

function readAutomationProfile(projectDir: string) {
  const automationProfileMarkdown = readFileIfPresent(
    path.join(projectDir, "automation-profile.md"),
  );

  return automationProfileMarkdown ? parseAutomationProfile(automationProfileMarkdown) : null;
}

function readProject(projectSlug: string): ProjectDetails | null {
  const projectDir = path.join(PROJECTS_DIR, projectSlug);
  if (!fs.existsSync(projectDir)) {
    return null;
  }

  const readme = readFileIfPresent(path.join(projectDir, "README.md"));
  const macroMarkdown = readDirectoryMarkdown(path.join(projectDir, "macro-slabs"));
  const microMarkdown = readDirectoryMarkdown(path.join(projectDir, "micro-slabs"));
  const memoryFiles = readDirectoryMarkdown(path.join(projectDir, "memory"));

  const macros = macroMarkdown.map(parseMacroSlab);
  const micros = microMarkdown.map(parseMicroSlab).map((micro) => {
    if (micro.parentMacroId) {
      return micro;
    }

    const matchingMacro = macros.find((macro) => macro.linkedMicroIds.includes(micro.id));
    return {
      ...micro,
      parentMacroId: matchingMacro?.id ?? "",
    };
  });

  return {
    slug: projectSlug,
    title: extractFirstHeading(readme) || humanizeFileName(projectSlug),
    summary: normalizeProjectSummary(extractLeadParagraph(readme)),
    primaryArtifact: readProjectBriefLink(projectDir),
    automationProfile: readAutomationProfile(projectDir),
    memoryCount: memoryFiles.length,
    macros,
    micros,
  };
}

function parseGlobalContextItem(
  repoPath: string,
  markdown: string,
): GlobalContextItem {
  const summary = (
    extractSection(markdown, "Summary") ||
    extractSection(markdown, "Why It Matters Across Projects") ||
    extractLeadParagraph(markdown)
  )
    .replace(/\s+/g, " ")
    .trim();

  const title =
    extractTitle(markdown, "Global Context") ||
    extractTitle(markdown, "Context Note") ||
    extractFirstHeading(markdown) ||
    humanizeFileName(path.posix.basename(repoPath));

  return {
    slug: repoPath.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase(),
    title,
    summary,
    repoPath,
  };
}

function normalizeList(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean);
}

function formatBulletSection(items: string[]) {
  return normalizeList(items)
    .map((item) => `- ${item}`)
    .join("\n");
}

function replaceTitleLine(markdown: string, prefix: string, value: string) {
  const regex = new RegExp(`^#\\s+${escapeRegex(prefix)}:\\s+.+$`, "m");
  return regex.test(markdown)
    ? markdown.replace(regex, `# ${prefix}: ${value.trim()}`)
    : markdown;
}

function replaceSection(markdown: string, heading: string, nextContent: string) {
  const content = nextContent.trim();
  const replacement = content ? `## ${heading}\n\n${content}\n` : `## ${heading}\n`;
  const range = findSectionRange(markdown, heading);

  if (!range) {
    return `${markdown.trimEnd()}\n\n${replacement}`;
  }

  return `${markdown.slice(0, range.sectionStart)}${replacement}${markdown.slice(
    range.sectionEnd,
  )}`;
}

function removeSection(markdown: string, heading: string) {
  const range = findSectionRange(markdown, heading);
  if (!range) {
    return markdown;
  }

  const before = markdown.slice(0, range.sectionStart).trimEnd();
  const after = markdown.slice(range.sectionEnd).trimStart();

  if (!before) {
    return after;
  }

  if (!after) {
    return `${before}\n`;
  }

  return `${before}\n\n${after}`;
}

function slugifyFileSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getNextMacroSlabId(projectSlug: string) {
  const project = readProject(projectSlug);
  const highestId =
    project?.macros.reduce((highest, macro) => {
      const match = macro.id.match(/^M(\d+)$/);
      const current = match ? Number(match[1]) : 0;
      return Math.max(highest, current);
    }, 0) ?? 0;

  return `M${String(highestId + 1).padStart(2, "0")}`;
}

function makeUniqueFilePath(dirPath: string, baseSlug: string) {
  let attempt = 1;
  let nextFilePath = path.join(dirPath, `${baseSlug}.md`);

  while (fs.existsSync(nextFilePath)) {
    attempt += 1;
    nextFilePath = path.join(dirPath, `${baseSlug}-${attempt}.md`);
  }

  return nextFilePath;
}

function findSlabFile(
  projectSlug: string,
  folderName: "macro-slabs" | "micro-slabs",
  slabId: string,
  parser: (markdown: string) => { id: string },
) {
  const dirPath = path.join(PROJECTS_DIR, projectSlug, folderName);

  if (!fs.existsSync(dirPath)) {
    return null;
  }

  const fileName = fs
    .readdirSync(dirPath)
    .filter((entry) => entry.endsWith(".md"))
    .sort((left, right) => left.localeCompare(right))
    .find((entry) => {
      const markdown = readFileIfPresent(path.join(dirPath, entry));
      return parser(markdown).id === slabId;
    });

  return fileName ? path.join(dirPath, fileName) : null;
}

function toRepoRelativePath(filePath: string | null) {
  if (!filePath) {
    return null;
  }

  return path.relative(SLABS_ROOT, filePath).replace(/\\/g, "/");
}

function getNextMicroSlabId(projectSlug: string) {
  const project = readProject(projectSlug);
  const highestId =
    project?.micros.reduce((highest, micro) => {
      const match = micro.id.match(/^MI-(\d+)$/);
      const current = match ? Number(match[1]) : 0;
      return Math.max(highest, current);
    }, 0) ?? 0;

  return `MI-${String(highestId + 1).padStart(3, "0")}`;
}

export function sortSlabsForReview<T extends { status: SlabStatus; id: string }>(
  items: T[],
) {
  return [...items].sort(
    (left, right) =>
      REVIEW_PRIORITY[left.status] - REVIEW_PRIORITY[right.status] ||
      left.id.localeCompare(right.id),
  );
}

export function getProjectsIndex(): ProjectIndexItem[] {
  return listProjectSlugs()
    .map((slug) => readProject(slug))
    .filter((project): project is ProjectDetails => Boolean(project))
    .map((project) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      macroCount: project.macros.length,
      microCount: project.micros.filter((micro) => isVisibleMicroSlabStatus(micro.status)).length,
      memoryCount: project.memoryCount,
      primaryStatus:
        project.macros.find((macro) => macro.status === "Active")?.status ??
        project.macros.find((macro) => macro.status === "Ready")?.status ??
        project.macros[0]?.status ??
        "Backlog",
    }));
}

export function getGlobalContextIndex(): GlobalContextItem[] {
  return readMarkdownEntriesRecursively(GLOBAL_CONTEXT_DIR)
    .filter((entry) => entry.repoPath !== "global-context/README.md")
    .map((entry) => parseGlobalContextItem(entry.repoPath, entry.markdown))
    .sort((left, right) => left.title.localeCompare(right.title));
}

export function getProjectDetails(projectSlug: string) {
  return readProject(projectSlug);
}

export function getMacroSlabSourcePath(projectSlug: string, macroId: string) {
  return toRepoRelativePath(
    findSlabFile(projectSlug, "macro-slabs", macroId, parseMacroSlab),
  );
}

export function getMicroSlabSourcePath(projectSlug: string, microId: string) {
  return toRepoRelativePath(
    findSlabFile(projectSlug, "micro-slabs", microId, parseMicroSlab),
  );
}

export function getAutomationProfileSourcePath(projectSlug: string) {
  const filePath = path.join(PROJECTS_DIR, projectSlug, "automation-profile.md");
  return fs.existsSync(filePath) ? toRepoRelativePath(filePath) : null;
}

export function updateMacroSlab(
  projectSlug: string,
  macroId: string,
  input: MacroSlabUpdateInput,
) {
  const filePath = findSlabFile(projectSlug, "macro-slabs", macroId, parseMacroSlab);

  if (!filePath) {
    throw new Error("Macro slab not found.");
  }

  let markdown = readFileIfPresent(filePath);
  markdown = replaceTitleLine(markdown, "Macro Slab", `${macroId} ${input.title}`);
  markdown = replaceSection(markdown, "Status", `\`${input.status}\``);
  markdown = replaceSection(markdown, "Objective", input.objective.trim());
  markdown = replaceSection(markdown, "Why It Matters", input.whyItMatters.trim());
  markdown = replaceSection(markdown, "In Scope", formatBulletSection(input.inScope));
  markdown = replaceSection(
    markdown,
    "Out of Scope",
    formatBulletSection(input.outOfScope),
  );
  markdown = replaceSection(
    markdown,
    "Dependencies",
    formatBulletSection(input.dependencies),
  );
  markdown = replaceSection(
    markdown,
    "Done Criteria",
    formatBulletSection(input.doneCriteria),
  );
  markdown = replaceSection(markdown, "Artifacts", formatBulletSection(input.artifacts));
  markdown = replaceSection(markdown, "Notes", input.notes.trim());

  fs.writeFileSync(filePath, `${markdown.trimEnd()}\n`);

  return parseMacroSlab(markdown);
}

export function updateMicroSlab(
  projectSlug: string,
  microId: string,
  input: MicroSlabUpdateInput,
) {
  const filePath = findSlabFile(projectSlug, "micro-slabs", microId, parseMicroSlab);

  if (!filePath) {
    throw new Error("Micro slab not found.");
  }

  let markdown = readFileIfPresent(filePath);
  markdown = replaceTitleLine(markdown, "Micro Slab", `${microId} ${input.title}`);
  markdown = replaceSection(markdown, "Status", `\`${input.status}\``);
  markdown = replaceSection(markdown, "Type", input.type.trim());
  markdown = replaceSection(markdown, "Tool Surface", input.toolSurface.trim());
  markdown = replaceSection(markdown, "Goal", input.goal.trim());
  markdown = replaceSection(markdown, "Working Context", input.workingContext.trim());
  markdown = replaceSection(
    markdown,
    "Done Criteria",
    formatBulletSection(input.doneCriteria),
  );
  markdown = replaceSection(markdown, "Artifacts", formatBulletSection(input.artifacts));
  markdown = replaceSection(markdown, "Notes", input.notes.trim());

  fs.writeFileSync(filePath, `${markdown.trimEnd()}\n`);

  return parseMicroSlab(markdown);
}

export function ignoreMicroSlab(projectSlug: string, microId: string) {
  const filePath = findSlabFile(projectSlug, "micro-slabs", microId, parseMicroSlab);

  if (!filePath) {
    throw new Error("Micro slab not found.");
  }

  let markdown = readFileIfPresent(filePath);
  const micro = parseMicroSlab(markdown);

  markdown = replaceSection(markdown, "Status", "`Superseded`");

  const ignoreNote =
    micro.origin.trim().toLowerCase() === "codex suggested"
      ? "Ignored from the reviewer after the user dismissed the Codex suggestion."
      : "Ignored from the reviewer after the user removed this micro slab from the active queue.";
  const currentNotes = extractSection(markdown, "Notes");
  const nextNotes = currentNotes.includes(ignoreNote)
    ? currentNotes
    : [currentNotes, ignoreNote].filter(Boolean).join("\n\n");
  markdown = replaceSection(markdown, "Notes", nextNotes);

  fs.writeFileSync(filePath, `${markdown.trimEnd()}\n`);

  return parseMicroSlab(markdown);
}

export function createMicroSlab(
  projectSlug: string,
  macroId: string,
  input: CreateMicroSlabInput,
) {
  const projectDir = path.join(PROJECTS_DIR, projectSlug);
  if (!fs.existsSync(projectDir)) {
    throw new Error("Project not found.");
  }

  const macroFilePath = findSlabFile(projectSlug, "macro-slabs", macroId, parseMacroSlab);
  if (!macroFilePath) {
    throw new Error("Macro slab not found.");
  }

  const microDir = path.join(projectDir, "micro-slabs");
  fs.mkdirSync(microDir, { recursive: true });

  const nextId = getNextMicroSlabId(projectSlug);
  const fileSlug = slugifyFileSegment(input.title) || "new-micro-slab";
  const microFilePath = path.join(microDir, `${nextId}-${fileSlug}.md`);

  const macroRelativePath = `../macro-slabs/${path.basename(macroFilePath)}`;
  const microRelativePath = `../micro-slabs/${path.basename(microFilePath)}`;

  const nextMicroMarkdown = [
    `# Micro Slab: ${nextId} ${input.title.trim()}`,
    "",
    "## Status",
    "",
    `\`${input.status}\``,
    "",
    "## Parent Macro Slab",
    "",
    `- [\`${macroRelativePath}\`](${macroRelativePath})`,
    "",
    "## Origin",
    "",
    input.origin?.trim() ?? "",
    "",
    "## Type",
    "",
    input.type.trim(),
    "",
    "## Tool Surface",
    "",
    input.toolSurface.trim(),
    "",
    "## Goal",
    "",
    input.goal.trim(),
    "",
    "## Working Context",
    "",
    input.workingContext.trim(),
    "",
    "## Done Criteria",
    "",
    "",
    "## Artifacts",
    "",
    "",
    "## Notes",
    "",
    input.notes.trim(),
    "",
  ].join("\n");

  fs.writeFileSync(microFilePath, nextMicroMarkdown);

  let macroMarkdown = readFileIfPresent(macroFilePath);
  const linkedMicros = parseBullets(extractSection(macroMarkdown, "Linked Micro Slabs"));
  const nextLinkedMicros = normalizeList([
    ...linkedMicros,
    `[\`${microRelativePath}\`](${microRelativePath})`,
  ]);
  macroMarkdown = replaceSection(
    macroMarkdown,
    "Linked Micro Slabs",
    formatBulletSection(nextLinkedMicros),
  );
  fs.writeFileSync(macroFilePath, `${macroMarkdown.trimEnd()}\n`);

  return parseMicroSlab(nextMicroMarkdown);
}

export function createMacroSlab(projectSlug: string, input: CreateMacroSlabInput) {
  const projectDir = path.join(PROJECTS_DIR, projectSlug);
  if (!fs.existsSync(projectDir)) {
    throw new Error("Project not found.");
  }

  const macroDir = path.join(projectDir, "macro-slabs");
  fs.mkdirSync(macroDir, { recursive: true });

  const nextId = getNextMacroSlabId(projectSlug);
  const fileSlug = slugifyFileSegment(input.title) || "new-macro-slab";
  const macroFilePath = path.join(macroDir, `${nextId}-${fileSlug}.md`);

  let markdown =
    readFileIfPresent(MACRO_SLAB_TEMPLATE_PATH) ||
    [
      "# Macro Slab: <ID> <Title>",
      "",
      "## Status",
      "",
      "`Backlog`",
      "",
      "## Parent Brief",
      "",
      "## Objective",
      "",
      "## Why It Matters",
      "",
      "## In Scope",
      "",
      "## Out of Scope",
      "",
      "## Dependencies",
      "",
      "## Linked Micro Slabs",
      "",
      "## Done Criteria",
      "",
      "## Artifacts",
      "",
      "## Notes",
      "",
    ].join("\n");

  markdown = markdown.replace("<ID>", nextId).replace("<Title>", input.title.trim());
  markdown = replaceSection(markdown, "Status", `\`${input.status}\``);
  markdown = replaceSection(markdown, "Parent Brief", "Google Doc brief link pending.");

  fs.writeFileSync(macroFilePath, `${markdown.trimEnd()}\n`);

  return parseMacroSlab(markdown);
}

export function updateProjectBriefLink(projectSlug: string, url: string) {
  const projectDir = path.join(PROJECTS_DIR, projectSlug);
  if (!fs.existsSync(projectDir)) {
    throw new Error("Project not found.");
  }

  const nextUrl = extractFirstUrl(url).trim();
  if (!isGoogleDocsDocumentUrl(nextUrl)) {
    throw new Error("Add a valid Google Docs document link.");
  }

  const briefLinkPath = path.join(projectDir, "brief-link.txt");
  fs.writeFileSync(briefLinkPath, `${nextUrl}\n`);

  return nextUrl;
}

export function updateAutomationProfile(
  projectSlug: string,
  input: AutomationProfileUpdateInput,
) {
  const projectDir = path.join(PROJECTS_DIR, projectSlug);
  if (!fs.existsSync(projectDir)) {
    throw new Error("Project not found.");
  }

  const readme = readFileIfPresent(path.join(projectDir, "README.md"));
  const projectTitle = extractFirstHeading(readme) || humanizeFileName(projectSlug);
  const automationProfilePath = path.join(projectDir, "automation-profile.md");

  let markdown =
    readFileIfPresent(automationProfilePath) ||
    readFileIfPresent(AUTOMATION_PROFILE_TEMPLATE_PATH) ||
    [
      "# Automation Profile: <Title>",
      "",
      "## Purpose",
      "",
      "## Primary Repositories",
      "",
      "## MCP Servers",
      "",
      "## Codex Skills",
      "",
      "## Plugins",
      "",
      "## Notes",
      "",
    ].join("\n");

  markdown = markdown.replace("<Title>", projectTitle.trim());
  markdown = removeSection(markdown, "Skills");
  markdown = removeSection(markdown, "Allowed Context Sources");
  markdown = removeSection(markdown, "Context Priorities");
  markdown = removeSection(markdown, "Suggestion Constraints");
  markdown = removeSection(markdown, "Skip Rules");
  markdown = replaceSection(markdown, "Purpose", input.purpose.trim());
  markdown = replaceSection(
    markdown,
    "Primary Repositories",
    formatBulletSection(input.primaryRepositories),
  );
  markdown = replaceSection(
    markdown,
    "MCP Servers",
    formatBulletSection(input.mcpServers),
  );
  markdown = replaceSection(
    markdown,
    "Codex Skills",
    formatBulletSection(input.codexSkills),
  );
  markdown = replaceSection(markdown, "Plugins", formatBulletSection(input.plugins));
  markdown = replaceSection(markdown, "Notes", input.notes.trim());

  fs.writeFileSync(automationProfilePath, `${markdown.trimEnd()}\n`);

  return parseAutomationProfile(markdown);
}

export function createGlobalContextNote(input: CreateGlobalContextInput) {
  fs.mkdirSync(GLOBAL_CONTEXT_DIR, { recursive: true });

  const fileSlug = slugifyFileSegment(input.title) || "shared-context-note";
  const filePath = makeUniqueFilePath(GLOBAL_CONTEXT_DIR, fileSlug);

  let markdown =
    readFileIfPresent(GLOBAL_CONTEXT_TEMPLATE_PATH) ||
    [
      "# Global Context: <Title>",
      "",
      "## Summary",
      "",
      "## Why It Matters Across Projects",
      "",
      "## Applies To",
      "",
      "## Source Or System",
      "",
      "## Linked Artifacts",
      "",
      "## Notes",
      "",
    ].join("\n");

  markdown = markdown.replace("<Title>", input.title.trim());
  markdown = replaceSection(markdown, "Summary", input.summary.trim());

  fs.writeFileSync(filePath, `${markdown.trimEnd()}\n`);

  const repoPath = path.relative(SLABS_ROOT, filePath).replace(/\\/g, "/");
  return parseGlobalContextItem(repoPath, markdown);
}

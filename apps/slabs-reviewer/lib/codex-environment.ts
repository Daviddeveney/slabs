import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export type AutomationCatalogOption = {
  id: string;
  label: string;
};

export type AutomationCatalog = {
  mcpServers: AutomationCatalogOption[];
  codexSkills: AutomationCatalogOption[];
  plugins: AutomationCatalogOption[];
};

const CODEX_HOME = path.join(os.homedir(), ".codex");
const CODEX_CONFIG_PATH = path.join(CODEX_HOME, "config.toml");
const CODEX_SKILLS_DIR = path.join(CODEX_HOME, "skills");
const SLABS_ROOT = path.resolve(process.cwd(), "../..");
const REPO_SKILLS_DIR = path.join(SLABS_ROOT, "skills");

function readFileIfPresent(filePath: string) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function stripQuotes(value: string) {
  return value.replace(/^"(.*)"$/, "$1");
}

function humanizeWords(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function parseEnabledPlugins(config: string) {
  const plugins: AutomationCatalogOption[] = [];
  const lines = config.split(/\r?\n/);
  let currentPluginId = "";
  let currentPluginEnabled = false;

  function flushPlugin() {
    if (!currentPluginId || !currentPluginEnabled) {
      return;
    }

    plugins.push({
      id: currentPluginId,
      label: humanizeWords(currentPluginId.split("@")[0] ?? currentPluginId),
    });
  }

  for (const line of lines) {
    const trimmed = line.trim();
    const pluginMatch = trimmed.match(/^\[plugins\."(.+)"\]$/);

    if (pluginMatch) {
      flushPlugin();
      currentPluginId = pluginMatch[1];
      currentPluginEnabled = false;
      continue;
    }

    if (currentPluginId && trimmed.startsWith("[") && !pluginMatch) {
      flushPlugin();
      currentPluginId = "";
      currentPluginEnabled = false;
      continue;
    }

    if (currentPluginId && /^enabled\s*=\s*true$/.test(trimmed)) {
      currentPluginEnabled = true;
    }
  }

  flushPlugin();

  return plugins.sort((left, right) => left.label.localeCompare(right.label));
}

function parseConfiguredMcpServers(config: string) {
  const servers = new Map<string, AutomationCatalogOption>();

  for (const line of config.split(/\r?\n/)) {
    const trimmed = line.trim();
    const match = trimmed.match(/^\[mcp_servers\.(.+)\]$/);

    if (!match) {
      continue;
    }

    const rawId = stripQuotes(match[1]);
    if (!rawId || rawId.endsWith(".env") || rawId.includes(".")) {
      continue;
    }

    servers.set(rawId, {
      id: rawId,
      label: humanizeWords(rawId),
    });
  }

  return [...servers.values()].sort((left, right) => left.label.localeCompare(right.label));
}

function collectSkillIds(rootDir: string) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }

  const skillIds = new Set<string>();

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name.startsWith(".")) {
        continue;
      }

      const nextPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(nextPath);
        continue;
      }

      if (entry.isFile() && entry.name === "SKILL.md") {
        const relativeDir = path
          .relative(rootDir, path.dirname(nextPath))
          .replace(/\\/g, "/")
          .trim();

        if (relativeDir) {
          skillIds.add(relativeDir);
        }
      }
    }
  }

  walk(rootDir);
  return [...skillIds];
}

function buildSkillOptions(skillIds: string[]) {
  return [...new Set(skillIds)]
    .sort((left, right) => left.localeCompare(right))
    .map((skillId) => ({
      id: skillId,
      label: skillId,
    }));
}

export function getAutomationCatalog(): AutomationCatalog {
  const config = readFileIfPresent(CODEX_CONFIG_PATH);

  return {
    mcpServers: parseConfiguredMcpServers(config),
    codexSkills: buildSkillOptions([
      ...collectSkillIds(CODEX_SKILLS_DIR),
      ...collectSkillIds(REPO_SKILLS_DIR),
    ]),
    plugins: parseEnabledPlugins(config),
  };
}


import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = resolve(fileURLToPath(new URL(".", import.meta.url)));
const publicDir = join(__dirname, "public");

loadEnv(join(__dirname, ".env"));

const port = Number(process.env.PORT || 3017);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const openAiOutputTokens = {
  "1024x1024": { low: 272, medium: 1056, high: 4160 },
  "1024x1536": { low: 408, medium: 1584, high: 6240 },
  "1536x1024": { low: 400, medium: 1568, high: 6208 }
};

const modelCosts = {
  openaiOutputPerMillion: 30,
  geminiPerImage: 0.039
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);

    if (request.method === "GET" && url.pathname === "/api/status") {
      return sendJson(response, 200, {
        openaiConfigured: Boolean(process.env.OPENAI_API_KEY),
        geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
        openaiModel: "gpt-image-2",
        geminiModel: "gemini-2.5-flash-image"
      });
    }

    if (request.method === "POST" && url.pathname === "/api/generate") {
      const payload = await readJson(request);
      const prompt = String(payload.prompt || "").trim();

      if (!prompt) {
        return sendJson(response, 400, { error: "Prompt is required." });
      }

      const providers = Array.isArray(payload.providers) && payload.providers.length
        ? payload.providers
        : ["openai", "gemini"];

      const size = normalizeSize(payload.size);
      const quality = normalizeQuality(payload.quality);
      const startedAt = Date.now();

      const tasks = providers.map((provider) =>
        provider === "openai"
          ? generateOpenAI({ prompt, size, quality })
          : generateGemini({ prompt, size })
      );

      const settled = await Promise.allSettled(tasks);
      const results = settled.map((result, index) => {
        const provider = providers[index];

        if (result.status === "fulfilled") {
          return result.value;
        }

        return {
          provider,
          ok: false,
          error: result.reason instanceof Error ? result.reason.message : "Generation failed."
        };
      });

      return sendJson(response, 200, {
        elapsedMs: Date.now() - startedAt,
        results
      });
    }

    if (request.method !== "GET") {
      return sendJson(response, 405, { error: "Method not allowed." });
    }

    return serveStatic(response, url.pathname);
  } catch (error) {
    console.error(error);
    return sendJson(response, 500, {
      error: error instanceof Error ? error.message : "Unexpected server error."
    });
  }
});

server.listen(port, () => {
  console.log(`Image Gen Compare running at http://localhost:${port}`);
});

function loadEnv(path) {
  if (!existsSync(path)) return;

  const text = readFileSync(path, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const text = Buffer.concat(chunks).toString("utf8");
  return text ? JSON.parse(text) : {};
}

function normalizeSize(size) {
  return ["1024x1024", "1024x1536", "1536x1024"].includes(size) ? size : "1024x1024";
}

function normalizeQuality(quality) {
  return ["low", "medium", "high"].includes(quality) ? quality : "medium";
}

async function generateOpenAI({ prompt, size, quality }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set in .env.");
  }

  const startedAt = Date.now();
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt,
      size,
      quality,
      output_format: "png",
      n: 1
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `OpenAI request failed with ${response.status}.`);
  }

  const base64 = data?.data?.[0]?.b64_json;
  if (!base64) {
    throw new Error("OpenAI response did not include image data.");
  }

  const outputTokens = openAiOutputTokens[size]?.[quality] || openAiOutputTokens["1024x1024"].medium;
  const estimatedCost = (outputTokens / 1_000_000) * modelCosts.openaiOutputPerMillion;

  return {
    provider: "openai",
    label: "OpenAI gpt-image-2",
    ok: true,
    imageUrl: `data:image/png;base64,${base64}`,
    elapsedMs: Date.now() - startedAt,
    estimatedCost,
    costLabel: `$${estimatedCost.toFixed(4)} plus input tokens`,
    meta: {
      size,
      quality,
      outputTokens
    }
  };
}

async function generateGemini({ prompt, size }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in .env.");
  }

  const startedAt = Date.now();
  const model = "gemini-2.5-flash-image";
  const aspectInstruction = size === "1536x1024"
    ? "Use a 3:2 landscape aspect ratio."
    : size === "1024x1536"
      ? "Use a 2:3 portrait aspect ratio."
      : "Use a 1:1 square aspect ratio.";

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${prompt}\n\n${aspectInstruction}`
              }
            ]
          }
        ],
        generationConfig: {
          responseModalities: ["IMAGE"]
        }
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `Gemini request failed with ${response.status}.`);
  }

  const image = extractGeminiImage(data);
  if (!image?.base64) {
    throw new Error("Gemini response did not include image data.");
  }

  return {
    provider: "gemini",
    label: "Google Gemini 2.5 Flash Image",
    ok: true,
    imageUrl: `data:${image.mimeType};base64,${image.base64}`,
    elapsedMs: Date.now() - startedAt,
    estimatedCost: modelCosts.geminiPerImage,
    costLabel: "$0.039 plus tiny input cost",
    meta: {
      size,
      quality: "fixed/default",
      outputTokens: 1290
    }
  };
}

function extractGeminiImage(data) {
  const generatedImage = data?.generated_images?.[0]?.image;
  if (generatedImage?.image_bytes) {
    return {
      base64: generatedImage.image_bytes,
      mimeType: generatedImage.mime_type || "image/png"
    };
  }

  const parts = data?.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    const inline = part.inlineData || part.inline_data;
    if (inline?.data) {
      return {
        base64: inline.data,
        mimeType: inline.mimeType || inline.mime_type || "image/png"
      };
    }
  }

  return null;
}

async function serveStatic(response, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = resolve(join(publicDir, safePath));

  if (!filePath.startsWith(publicDir)) {
    return sendJson(response, 403, { error: "Forbidden." });
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(file);
  } catch {
    sendJson(response, 404, { error: "Not found." });
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

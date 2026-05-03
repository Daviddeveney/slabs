const form = document.querySelector("#compareForm");
const button = document.querySelector("#generateButton");
const statusCard = document.querySelector("#statusCard");
const qualitySelect = document.querySelector("#quality");
const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");

const cards = {
  openai: {
    card: document.querySelector("#openaiCard"),
    cost: document.querySelector("#openaiCost"),
    quality: document.querySelector("#openaiQuality"),
    time: document.querySelector("#openaiTime")
  },
  gemini: {
    card: document.querySelector("#geminiCard"),
    cost: document.querySelector("#geminiCost"),
    time: document.querySelector("#geminiTime")
  }
};

const estimates = {
  low: "$0.008 est.",
  medium: "$0.032 est.",
  high: "$0.125 est."
};

hydrateStatus();
qualitySelect.addEventListener("change", () => {
  cards.openai.cost.textContent = estimates[qualitySelect.value] || estimates.medium;
  cards.openai.quality.textContent = titleCase(qualitySelect.value);
});

lightbox?.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-lightbox]")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const providers = [...form.querySelectorAll('input[name="provider"]:checked')].map((input) => input.value);
  if (!providers.length) {
    setStatus("Pick at least one provider.", false);
    return;
  }

  button.disabled = true;
  button.textContent = "Generating";
  for (const provider of providers) {
    setLoading(provider);
  }

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: document.querySelector("#prompt").value,
        size: document.querySelector("#size").value,
        quality: qualitySelect.value,
        providers
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Generation failed.");
    }

    for (const result of data.results) {
      renderResult(result);
    }
  } catch (error) {
    setStatus(error.message || "Generation failed.", false);
  } finally {
    button.disabled = false;
    button.textContent = "Generate comparison";
  }
});

async function hydrateStatus() {
  try {
    const response = await fetch("/api/status");
    const status = await response.json();
    const openai = status.openaiConfigured ? "OpenAI ready" : "OpenAI missing";
    const gemini = status.geminiConfigured ? "Gemini ready" : "Gemini missing";
    setStatus(`${openai} · ${gemini}`, status.openaiConfigured && status.geminiConfigured);
  } catch {
    setStatus("Server status unavailable", false);
  }
}

function setStatus(text, ready) {
  statusCard.textContent = "";
  const dot = document.createElement("span");
  dot.className = "status-dot";
  statusCard.append(dot, document.createTextNode(text));
  statusCard.classList.toggle("ready", Boolean(ready));
}

function setLoading(provider) {
  const stage = cards[provider]?.card.querySelector(".image-stage");
  if (!stage) return;

  stage.classList.remove("error");
  stage.innerHTML = "<p>Generating...</p>";
  if (cards[provider].time) {
    cards[provider].time.textContent = "-";
  }
}

function renderResult(result) {
  const target = cards[result.provider];
  if (!target) return;

  const stage = target.card.querySelector(".image-stage");
  if (!result.ok) {
    stage.classList.add("error");
    stage.innerHTML = `<p>${escapeHtml(result.error || "Generation failed.")}</p>`;
    return;
  }

  stage.classList.remove("error");
  stage.innerHTML = "";
  const image = document.createElement("img");
  image.src = result.imageUrl;
  image.alt = `${result.label} generated result`;

  const expandButton = document.createElement("button");
  expandButton.className = "expand-button";
  expandButton.type = "button";
  expandButton.textContent = "Expand";
  expandButton.setAttribute("aria-label", `Expand ${result.label} generated image`);
  expandButton.addEventListener("click", () => openLightbox(result.imageUrl, image.alt, result.label));
  image.addEventListener("click", () => openLightbox(result.imageUrl, image.alt, result.label));

  stage.append(image, expandButton);

  target.cost.textContent = result.costLabel;
  target.time.textContent = `${(result.elapsedMs / 1000).toFixed(1)}s`;
  if (target.quality) {
    target.quality.textContent = titleCase(result.meta?.quality || "medium");
  }
}

function titleCase(value) {
  return String(value).slice(0, 1).toUpperCase() + String(value).slice(1);
}

function openLightbox(src, alt, title) {
  if (!lightbox || !lightboxImage || !lightboxTitle) return;

  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightboxTitle.textContent = title;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.hidden = true;
  lightboxImage.removeAttribute("src");
  document.body.classList.remove("lightbox-open");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

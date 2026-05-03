# Image Gen Compare

Local side-by-side test bench for comparing OpenAI image generation against Google Gemini / Nano Banana output.

## Setup

```sh
cd apps/image-gen-compare
cp .env.example .env
```

Add your keys to `.env`:

```sh
OPENAI_API_KEY=...
GEMINI_API_KEY=...
PORT=3017
```

## Run

```sh
npm run dev
```

Open `http://localhost:3017`.

## Notes

- API keys stay server-side and are never entered into the browser UI.
- OpenAI defaults to `gpt-image-2`.
- Gemini defaults to `gemini-2.5-flash-image`.
- Cost estimates are approximate and shown for comparison, not billing reconciliation.

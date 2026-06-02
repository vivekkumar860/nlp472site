// Cloudflare Worker entry. Serves the static site (public/) and exposes a
// server-side AI proxy at POST /api/chat. The OpenRouter API key lives ONLY as
// the encrypted Worker secret `OPENROUTER_API_KEY` (set via `wrangler secret
// put` or .dev.vars locally) — it is never sent to the browser.

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Models the client is allowed to request. Anything else falls back to default.
const ALLOWED_MODELS = new Set([
  'nvidia/nemotron-3-super-120b-a12b:free',
  'openai/gpt-4o-mini',
  'anthropic/claude-3.5-haiku',
  'google/gemini-2.0-flash-001',
  'meta-llama/llama-3.3-70b-instruct',
]);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Light anti-abuse: if the request carries an Origin/Referer, it must be this
// same host. (Browsers from other sites would be blocked; server callers with
// no Origin are allowed through.)
function sameOriginOk(request, url) {
  const origin = request.headers.get('Origin') || request.headers.get('Referer');
  if (!origin) return true;
  try {
    return new URL(origin).host === url.host;
  } catch {
    return false;
  }
}

async function handleChat(request, env, url) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!sameOriginOk(request, url)) return json({ error: 'Forbidden origin' }, 403);
  if (!env.OPENROUTER_API_KEY) return json({ error: 'Server is missing OPENROUTER_API_KEY' }, 500);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return json({ error: '`messages` must be a non-empty array' }, 400);
  }

  const defaultModel = env.OPENROUTER_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free';
  const model = ALLOWED_MODELS.has(body.model) ? body.model : defaultModel;

  // Full parameter pass-through with sane clamps.
  const payload = {
    model,
    messages,
    stream: body.stream !== false, // default to streaming
    temperature: clamp(body.temperature, 0, 2, 0.4),
    top_p: clamp(body.top_p, 0, 1, 1),
    max_tokens: clampInt(body.max_tokens, 1, 4096, 1024),
    // Reasoning models otherwise stream their chain-of-thought into `content`.
    // Default to disabled for clean, fast tutor answers; client may override.
    reasoning: body.reasoning || { enabled: false },
  };
  if (typeof body.seed === 'number') payload.seed = body.seed;

  const upstream = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': url.origin,
      'X-Title': 'NLP Hub Study Assistant',
    },
    body: JSON.stringify(payload),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return json({ error: `Upstream error ${upstream.status}`, detail: text.slice(0, 500) }, 502);
  }

  // Stream the SSE body straight through to the browser.
  if (payload.stream) {
    return new Response(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }
  return new Response(await upstream.text(), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function clamp(v, min, max, fallback) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
function clampInt(v, min, max, fallback) {
  return Math.round(clamp(v, min, max, fallback));
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/chat') {
      return handleChat(request, env, url);
    }
    if (url.pathname === '/api/health') {
      return json({ ok: true, hasKey: Boolean(env.OPENROUTER_API_KEY) });
    }
    // Everything else: static assets.
    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response('Not found', { status: 404 });
  },
};

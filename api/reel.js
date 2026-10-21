const API_BASE_URL = process.env.POPLI_API_URL || 'https://poplibackend.onrender.com';
const SITE_ORIGIN = 'https://www.popliapp.com';
const SHELL_FETCH_ORIGIN = process.env.POPLI_SHELL_ORIGIN || SITE_ORIGIN;
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-default.png`;
const REEL_ID_PATTERN = /^[A-Za-z0-9_-]{4,64}$/;
const PUBLIC_PRIVACY_VALUES = new Set(['Public', 'Everyone']);
const FETCH_TIMEOUT_MS = 9000;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function collapseWhitespace(value) {
  return String(value).replace(/\s+/g, ' ').trim();
}

function truncate(value, maxLength) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trimEnd()}…`;
}

function isSafeHttpsUrl(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function sanitizeReelId(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const cleaned = raw.replace(/^reel-/, '').replace(/^temp-/, '');
  return REEL_ID_PATTERN.test(cleaned) ? cleaned : null;
}

async function fetchReel(reelId) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(`${API_BASE_URL}/reels/${encodeURIComponent(reelId)}`, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (response.status === 404) return { status: 'missing' };
    if (!response.ok) return { status: 'error', httpStatus: response.status };
    const reel = await response.json();
    if (!reel || !reel.id) return { status: 'error' };
    return { status: 'ok', reel };
  } catch (error) {
    return { status: 'error' };
  } finally {
    clearTimeout(timer);
  }
}

function isPubliclyVisible(reel) {
  if (!PUBLIC_PRIVACY_VALUES.has(reel.privacy)) return false;
  if (reel.ageRestricted || reel.copyrightFlag) return false;
  return true;
}

function buildTitles(reel) {
  const creatorLabel =
    (reel.creator && collapseWhitespace(reel.creator.name || '')) ||
    (reel.creator && reel.creator.username ? `@${reel.creator.username}` : 'A Popli creator');
  const caption = collapseWhitespace(reel.description || '');
  const excerpt = truncate(caption, 90);
  const title = excerpt
    ? `${creatorLabel} on Popli: "${excerpt}"`
    : `${creatorLabel} on Popli`;
  const description = caption
    ? truncate(caption, 240)
    : `Watch ${creatorLabel}'s reel on Popli - Create, Share and Earn.`;
  return { title, description };
}

function buildMetaTags(reel, canonicalUrl, imageUrl) {
  const { title, description } = buildTitles(reel);
  const isVideo = (reel.mediaType || 'VIDEO') === 'VIDEO';
  const ogType = isVideo ? 'video.other' : 'website';
  const creatorName =
    (reel.creator && collapseWhitespace(reel.creator.name || '')) ||
    (reel.creator && reel.creator.username ? `@${reel.creator.username}` : 'Popli creator');

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': isVideo ? 'VideoObject' : 'ImageObject',
    name: title,
    description,
    mainEntityOfPage: canonicalUrl,
    ...(isVideo
      ? { uploadDate: reel.createdAt ? new Date(reel.createdAt).toISOString() : undefined, thumbnailUrl: [imageUrl] }
      : { contentUrl: imageUrl }),
    publisher: { '@type': 'Organization', name: 'Popli' },
  }).replace(/</g, '\\u003c');

  return `<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(canonicalUrl)}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Popli">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonicalUrl)}">
<meta property="og:image" content="${escapeHtml(imageUrl)}">
<meta property="og:image:alt" content="Popli reel by ${escapeHtml(creatorName)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(imageUrl)}">
<script type="application/ld+json">${jsonLd}</script>`;
}

const FALLBACK_SHELL = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Popli | Create • Share • Earn</title>
</head>
<body style="margin:0;background:#050505;color:#fff;font-family:Inter,Arial,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh">
<main style="max-width:440px;text-align:center;padding:28px">
<h1 style="font-size:20px;font-weight:800">Open this reel in the Popli app</h1>
<p style="margin-top:12px;color:rgba(255,255,255,.6);line-height:1.6">The reel preview could not be loaded right now. Please try again in a moment, or open it in the Popli app.</p>
<a href="https://play.google.com/store/apps/details?id=com.popli.app" style="display:inline-block;margin-top:24px;padding:13px 26px;border-radius:999px;background:linear-gradient(90deg,#D4AF37,#B87333);color:#050505;font-size:14px;font-weight:800;text-decoration:none">Get the Popli app</a>
</main>
</body>
</html>`;

async function buildShell(metaTags) {
  try {
    const response = await fetch(`${SHELL_FETCH_ORIGIN}/`, {
      headers: { 'User-Agent': 'PopliReelPreview/1.0' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      cache: 'force-cache',
    });
    if (response.ok) {
      const html = await response.text();
      if (html.includes('</head>')) {
        return html.replace('</head>', `${metaTags}\n</head>`);
      }
      return html;
    }
  } catch (error) {}
  return FALLBACK_SHELL.replace('</head>', `${metaTags}\n</head>`);
}

function notFoundPage() {
  const title = 'This reel is unavailable | Popli';
  const description =
    'This Popli reel may have been deleted, made private, or the link may be broken.';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Popli">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="robots" content="noindex">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#050505;color:#fff;font-family:Inter,Arial,sans-serif}
.card{width:100%;max-width:440px;background:#111;border:1px solid rgba(212,175,55,.15);border-radius:24px;padding:40px 28px;text-align:center}
h1{font-size:20px;font-weight:800}
p{margin-top:12px;font-size:14px;color:rgba(255,255,255,.6);line-height:1.6}
a{display:inline-block;margin-top:24px;padding:13px 26px;border-radius:999px;background:linear-gradient(90deg,#D4AF37,#B87333);color:#050505;font-size:14px;font-weight:800;text-decoration:none}
</style>
</head>
<body>
<main class="card">
<h1>This reel is unavailable</h1>
<p>${escapeHtml(description)}</p>
<a href="${SITE_ORIGIN}/">Go to Popli</a>
</main>
</body>
</html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const reelId = sanitizeReelId(req.query && req.query.id);

  if (!reelId) {
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.status(404).send(notFoundPage());
    return;
  }

  const result = await fetchReel(reelId);

  if (result.status === 'missing' || (result.status === 'ok' && !isPubliclyVisible(result.reel))) {
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.status(404).send(notFoundPage());
    return;
  }

  const canonicalUrl = `${SITE_ORIGIN}/reel/${encodeURIComponent(reelId)}`;

  if (result.status === 'error') {
    const meta = `<title>Popli Reel</title>
<meta property="og:type" content="website">
<meta property="og:site_name" content="Popli">
<meta property="og:title" content="Popli | Create • Share • Earn">
<meta property="og:url" content="${escapeHtml(canonicalUrl)}">
<meta property="og:image" content="${escapeHtml(DEFAULT_OG_IMAGE)}">`;
    res.setHeader('Cache-Control', 'public, max-age=30');
    res.status(200).send(await buildShell(meta));
    return;
  }

  const reel = result.reel;
  const thumbnail = isSafeHttpsUrl(reel.thumbnailUrl) ? reel.thumbnailUrl : DEFAULT_OG_IMAGE;
  const meta = buildMetaTags(reel, canonicalUrl, thumbnail);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate, s-maxage=300, stale-while-revalidate=86400');
  res.status(200).send(await buildShell(meta));
}

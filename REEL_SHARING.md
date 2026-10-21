# Reel Sharing & WhatsApp Previews — Architecture & Deployment

This repository is the production source of `https://www.popliapp.com/`
(Vite + React SPA, deployed on Vercel). It now serves Instagram-style
reel sharing: `https://www.popliapp.com/reel/<reelId>` renders a functional
web reel page and dynamic, reel-specific Open Graph metadata for WhatsApp
and other link-preview crawlers.

## How it works

```
Share sheet (Android app) ──► https://www.popliapp.com/reel/<id>
                                  │  Vercel rewrite (vercel.json)
                                  ▼
                          GET /api/reel?id=<id>        (api/reel.js)
                                  │  fetches the existing public backend
                                  ▼
                  GET https://poplibackend.onrender.com/reels/<id>
                                  │
                                  ▼
      index.html (live SPA shell) + injected reel-specific OG/Twitter/JSON-LD
      meta → crawlers see the preview; browsers run the SPA which renders
      the /reel/:id route (src/pages/ReelPage.tsx) fetching the same API.
```

- **Crawlers (WhatsApp/Facebook):** never execute React. `api/reel.js`
  injects `og:title`, `og:description`, `og:image`, `og:url`, `og:type`,
  Twitter card tags and JSON-LD into the real site shell before serving it.
- **Humans:** the same HTML boots the SPA; the new `/reel/:id` route
  fetches the reel from the existing backend and renders thumbnail/creator/
  caption/stats plus a playable HLS player (Cloudflare Stream iframe) with
  "Open in Popli app" (`intent://` with APK fallback), Download APK and
  Play Store buttons. The marketing intro loader is skipped on `/reel/*`.
- **Android App Links:** `public/.well-known/assetlinks.json` delegates
  `https://www.popliapp.com/` to package `com.popli.app` (release + debug
  SHA-256 fingerprints, same set already verified on Firebase Hosting). The
  Expo app (separate repo) declares `www.popliapp.com` in its intent filters
  and shares links via `buildReelLink()` → canonical domain. When the app is
  not installed, the link lands on this web page.

## Privacy & failure handling

- Only `Public`/`Everyone` reels are exposed; friends-only, age-restricted
  and copyright-flagged reels return a safe HTTP 404 "unavailable" page
  (no metadata leak, `noindex`).
- Invalid IDs (pattern-rejected before touching the API) and deleted reels
  → 404 page. Backend 5xx/network failure → graceful branded page with
  generic metadata (HTTP 200) so the browser still gets a usable page.
- Missing or non-HTTPS thumbnails fall back to `/og-default.png` (branded
  1200×630 image in `public/`).

## Files changed in this repo

- `api/reel.js` — NEW: Vercel serverless function serving dynamic OG HTML
  (env overrides: `POPLI_API_URL`, `POPLI_SHELL_ORIGIN` — production
  defaults are hardcoded and require no configuration).
- `vercel.json` — added rewrite `/reel/:id` → `/api/reel?id=:id` **before**
  the existing SPA catch-all (order matters).
- `public/.well-known/assetlinks.json` — NEW: Android App Links verification.
- `public/og-default.png` — NEW: branded fallback OG image.
- `src/pages/ReelPage.tsx` — NEW: functional web reel page.
- `src/App.tsx` — added `/reel/:id` route; skip intro loader on reel links.
- `src/constants.ts` — API base URL, app/Play links, deep-link builders.

## Deployment steps (external)

1. Commit and push this repository to `github.com/KanhaMeena04/PoplifrontLive`
   (Vercel auto-deploys the production domain), or run `vercel --prod` with
   project access.
2. After deploy, smoke-test:
   `curl -s https://www.popliapp.com/reel/<some-public-reel-id> | grep og:`
   — expect reel-specific `og:title`/`og:image`.
   `curl -sI https://www.popliapp.com/.well-known/assetlinks.json` — 200 JSON.
3. App Links verification (no action needed on the domain; the app repo
   already ships matching intent filters): after the next Android build is
   installed, `https://www.popliapp.com/reel/<id>` opens in-app. Until then
   it opens this web page (working fallback).
4. WhatsApp preview caching: re-check changed metadata with the Facebook
   Sharing Debugger ("Scrape Again"), or share the URL with a `?` suffix as
   a distinct cache key. WhatsApp's own cache can lag for hours and cannot
   always be force-refreshed.

## Verified locally (headless Chrome + live backend)

- `npm run build` passes (tsc + vite).
- `api/reel.js` invoked end-to-end: valid reel → 200 with correct OG tags
  and injected SPA shell; different IDs → different title/description/
  thumbnail; unknown/malformed IDs → 404; POST → 405; friends-only and
  age-restricted fixtures → 404; backend 5xx/down → graceful branded page.
- `/reel/<id>` rendered in headless Chrome against the built `dist/` +
  function: creator, caption, stats, Cloudflare Stream player (video
  playing) and app CTAs all render; missing reel shows the 404 page.
- Not verifiable from this environment: the actual Vercel deployment and
  real WhatsApp message rendering (requires Vercel account + a device).

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.popli.app';

// All download buttons/links redirect to the Google Play Store listing.
export const ANDROID_APK_URL = PLAY_STORE_URL;

export const APP_SCHEME = 'popliapp';

export const API_BASE_URL =
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_POPLI_API_URL) ||
  'https://poplibackend.onrender.com';

export const REEL_ID_PATTERN = /^[A-Za-z0-9_-]{4,64}$/;

export const PUBLIC_PRIVACY_VALUES = ['Public', 'Everyone'];

export function buildAppDeepLink(reelId: string): string {
  return `${APP_SCHEME}://reel/${encodeURIComponent(reelId)}`;
}

export function buildAndroidIntentLink(reelId: string): string {
  const fallback = encodeURIComponent(ANDROID_APK_URL);
  return `intent://reel/${encodeURIComponent(reelId)}#Intent;scheme=${APP_SCHEME};package=com.popli.app;S.browser_fallback_url=${fallback};end`;
}

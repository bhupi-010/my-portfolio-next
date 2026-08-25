/** Extract an 11-character YouTube video ID from a URL or raw ID. */
export function extractYouTubeId(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  if (/^[\w-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const fromQuery = url.searchParams.get('v');
      if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) return fromQuery;

      const parts = url.pathname.split('/').filter(Boolean);
      const embedIndex = parts.findIndex((p) => p === 'embed' || p === 'shorts' || p === 'live');
      if (embedIndex >= 0 && parts[embedIndex + 1] && /^[\w-]{11}$/.test(parts[embedIndex + 1])) {
        return parts[embedIndex + 1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function youtubeEmbedSrc(
  videoId: string,
  options?: { autoplay?: boolean; origin?: string }
): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  const origin =
    options?.origin ?? (typeof window !== 'undefined' ? window.location.origin : undefined);
  if (origin) {
    params.set('origin', origin);
    params.set('widget_referrer', origin);
  }
  if (options?.autoplay) {
    params.set('autoplay', '1');
    params.set('mute', '1');
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/** Same-origin player used inside the PiP overlay so YouTube gets a real Referer. */
export function youtubeEmbedPath(videoId: string, options?: { autoplay?: boolean }): string {
  const params = new URLSearchParams({ v: videoId });
  if (options?.autoplay) params.set('autoplay', '1');
  return `/youtube-embed?${params.toString()}`;
}

export const YOUTUBE_IFRAME_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';

export const YOUTUBE_REFERRER_POLICY = 'strict-origin-when-cross-origin';

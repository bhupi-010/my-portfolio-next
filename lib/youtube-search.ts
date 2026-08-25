export type YouTubeSearchVideo = {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
};

const MAX_RESULTS = 16;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function textOf(value: unknown): string {
  const record = asRecord(value);
  if (!record) return '';
  if (typeof record.simpleText === 'string') return record.simpleText;
  if (Array.isArray(record.runs)) {
    return record.runs
      .map((run) => {
        const item = asRecord(run);
        return typeof item?.text === 'string' ? item.text : '';
      })
      .join('');
  }
  return '';
}

function collectVideos(node: unknown, videos: YouTubeSearchVideo[], seen: Set<string>) {
  if (!node || videos.length >= MAX_RESULTS) return;

  if (Array.isArray(node)) {
    for (const item of node) {
      collectVideos(item, videos, seen);
      if (videos.length >= MAX_RESULTS) return;
    }
    return;
  }

  const record = asRecord(node);
  if (!record) return;

  const renderer = asRecord(record.videoRenderer);
  const id = typeof renderer?.videoId === 'string' ? renderer.videoId : '';
  if (renderer && id && /^[\w-]{11}$/.test(id) && !seen.has(id)) {
    seen.add(id);
    videos.push({
      id,
      title: textOf(renderer.title) || 'YouTube video',
      channel: textOf(renderer.ownerText) || textOf(renderer.shortBylineText),
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
      duration: textOf(renderer.lengthText),
    });
  }

  for (const value of Object.values(record)) {
    collectVideos(value, videos, seen);
    if (videos.length >= MAX_RESULTS) return;
  }
}

async function searchWithDataApi(query: string, key: string): Promise<YouTubeSearchVideo[]> {
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', String(MAX_RESULTS));
  url.searchParams.set('safeSearch', 'moderate');
  url.searchParams.set('q', query);
  url.searchParams.set('key', key);

  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`YouTube Data API ${response.status}`);

  const payload = (await response.json()) as {
    items?: Array<{ id?: { videoId?: string }; snippet?: { title?: string; channelTitle?: string } }>;
  };

  return (payload.items ?? [])
    .map((item) => {
      const id = item.id?.videoId ?? '';
      if (!/^[\w-]{11}$/.test(id)) return null;
      return {
        id,
        title: item.snippet?.title || 'YouTube video',
        channel: item.snippet?.channelTitle || '',
        thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
        duration: '',
      };
    })
    .filter((video): video is YouTubeSearchVideo => video !== null);
}

async function searchWithInnerTube(query: string): Promise<YouTubeSearchVideo[]> {
  const response = await fetch('https://www.youtube.com/youtubei/v1/search?prettyPrint=false', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0',
    },
    body: JSON.stringify({
      context: {
        client: {
          clientName: 'WEB',
          clientVersion: '2.20240815.00.00',
          hl: 'en',
          gl: 'US',
        },
      },
      query,
      params: 'EgIQAQ==',
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) throw new Error(`YouTube search ${response.status}`);

  const payload: unknown = await response.json();
  const videos: YouTubeSearchVideo[] = [];
  collectVideos(payload, videos, new Set());
  return videos;
}

export async function searchYouTube(query: string): Promise<YouTubeSearchVideo[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (key) return searchWithDataApi(query, key);
  return searchWithInnerTube(query);
}

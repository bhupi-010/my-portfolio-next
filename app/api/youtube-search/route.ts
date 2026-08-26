import { NextResponse } from 'next/server';
import { searchYouTube } from '@/lib/youtube-search';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE = 'no-store, no-cache, must-revalidate';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')?.trim() ?? '';
  if (query.length < 1 || query.length > 100) {
    return NextResponse.json({ error: 'Enter a search between 1 and 100 characters.' }, { status: 400 });
  }

  try {
    const videos = await searchYouTube(query);
    return NextResponse.json(
      { videos },
      {
        headers: {
          'Cache-Control': NO_STORE,
          // Netlify Durable Cache ignores `q` unless told to vary on it.
          'Netlify-CDN-Cache-Control': NO_STORE,
          'Netlify-Vary': 'query=q',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  } catch {
    return NextResponse.json({ error: 'YouTube search is unavailable right now. Try again.' }, { status: 502 });
  }
}

import { NextResponse } from 'next/server';
import { searchYouTube } from '@/lib/youtube-search';

export const runtime = 'nodejs';

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
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=600',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  } catch {
    return NextResponse.json({ error: 'YouTube search is unavailable right now. Try again.' }, { status: 502 });
  }
}

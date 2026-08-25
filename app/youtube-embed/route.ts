import {
  extractYouTubeId,
  youtubeEmbedSrc,
  YOUTUBE_IFRAME_ALLOW,
  YOUTUBE_REFERRER_POLICY,
} from '@/lib/youtube';

function escapeAttr(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const videoId = extractYouTubeId(url.searchParams.get('v') ?? '');
  const autoplay = url.searchParams.get('autoplay') === '1';
  const origin = url.origin;

  if (!videoId) {
    return new Response('Missing video', { status: 400 });
  }

  const src = youtubeEmbedSrc(videoId, { autoplay, origin });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex,nofollow">
  <meta name="referrer" content="${YOUTUBE_REFERRER_POLICY}">
  <title>YouTube</title>
  <style>
    html,body{margin:0;height:100%;background:#0a0a0a;overflow:hidden}
    iframe{width:100%;height:100%;border:0;display:block}
  </style>
</head>
<body>
  <iframe
    src="${escapeAttr(src)}"
    title="YouTube"
    allow="${YOUTUBE_IFRAME_ALLOW}"
    referrerpolicy="${YOUTUBE_REFERRER_POLICY}"
    allowfullscreen
  ></iframe>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Referrer-Policy': YOUTUBE_REFERRER_POLICY,
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

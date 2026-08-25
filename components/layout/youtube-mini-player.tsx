'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  extractYouTubeId,
  youtubeEmbedSrc,
  youtubeEmbedPath,
  YOUTUBE_IFRAME_ALLOW,
  YOUTUBE_REFERRER_POLICY,
} from '@/lib/youtube';
import type { YouTubeSearchVideo } from '@/lib/youtube-search';
import { cn } from '@/lib/utils';

type PlayerMode = 'expanded' | 'minimized';

const PIP_WIDTH = 400;
const PIP_HEIGHT = 260;

type DocumentPiP = {
  requestWindow: (options: { width: number; height: number }) => Promise<Window>;
};

function getDocumentPiP(): DocumentPiP | undefined {
  return (window as unknown as { documentPictureInPicture?: DocumentPiP })
    .documentPictureInPicture;
}

function fillPipWindow(win: Window, videoId: string) {
  const doc = win.document;
  doc.title = 'YouTube';
  doc.documentElement.style.height = '100%';
  doc.body.style.cssText = 'margin:0;height:100%;overflow:hidden;background:#0a0a0a';

  const frame = doc.createElement('iframe');
  frame.title = 'YouTube';
  frame.src = youtubeEmbedPath(videoId, { autoplay: true });
  frame.allow = YOUTUBE_IFRAME_ALLOW;
  frame.referrerPolicy = YOUTUBE_REFERRER_POLICY;
  frame.style.cssText = 'width:100%;height:100%;border:0;display:block';
  doc.body.replaceChildren(frame);
}

export function YoutubeMiniPlayer() {
  const [mode, setMode] = useState<PlayerMode>('expanded');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<YouTubeSearchVideo[]>([]);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPip, setIsPip] = useState(false);
  const pipWindowRef = useRef<Window | null>(null);

  const closePip = useCallback(() => {
    const pip = pipWindowRef.current;
    pipWindowRef.current = null;
    if (pip && !pip.closed) pip.close();
    setIsPip(false);
  }, []);

  const trackPipWindow = useCallback((win: Window) => {
    pipWindowRef.current = win;
    setIsPip(true);
    setError(null);
    win.addEventListener('pagehide', () => {
      if (pipWindowRef.current === win) {
        pipWindowRef.current = null;
        setIsPip(false);
      }
    });
  }, []);

  const popOut = useCallback(() => {
    if (!videoId) return;
    if (pipWindowRef.current && !pipWindowRef.current.closed) {
      pipWindowRef.current.focus();
      return;
    }

    const api = getDocumentPiP();
    if (!api?.requestWindow) {
      setError('Picture-in-picture needs Chrome or Edge. Video stays on this page.');
      return;
    }

    try {
      api
        .requestWindow({ width: PIP_WIDTH, height: PIP_HEIGHT })
        .then((win: Window) => {
          try {
            fillPipWindow(win, videoId);
            trackPipWindow(win);
          } catch {
            win.close();
            setError('Picture-in-picture could not start. Video stays on this page.');
          }
        })
        .catch(() => {
          setError('Picture-in-picture was blocked. Video stays on this page.');
        });
    } catch {
      setError('Picture-in-picture was blocked. Video stays on this page.');
    }
  }, [trackPipWindow, videoId]);

  useEffect(() => {
    if (!isPip) return;
    const timer = window.setInterval(() => {
      if (pipWindowRef.current?.closed) {
        pipWindowRef.current = null;
        setIsPip(false);
      }
    }, 500);
    return () => window.clearInterval(timer);
  }, [isPip]);

  const playVideo = (id: string) => {
    setVideoId(id);
    if (pipWindowRef.current && !pipWindowRef.current.closed) {
      fillPipWindow(pipWindowRef.current, id);
    }
  };

  const searchYoutube = async (event?: FormEvent) => {
    event?.preventDefault();
    const next = search.trim();
    if (!next) {
      setError('Type something to search on YouTube.');
      return;
    }

    const pastedId = extractYouTubeId(next);
    if (pastedId) {
      setError(null);
      setResults([]);
      playVideo(pastedId);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/youtube-search?q=${encodeURIComponent(next)}`);
      const payload = (await response.json()) as { videos?: YouTubeSearchVideo[]; error?: string };
      if (!response.ok) {
        setError(payload.error || 'Search failed. Try again.');
        return;
      }
      const videos = payload.videos ?? [];
      setResults(videos);
      if (videos[0]) playVideo(videos[0].id);
      else setError('No videos found. Try another search.');
    } catch {
      setError('Search failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const isMini = mode === 'minimized';
  const selected = results.find((video) => video.id === videoId);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-background/95 shadow-lg',
        isMini ? 'w-full max-w-sm' : 'w-full'
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-2 py-1.5">
        <YoutubeIcon className="h-4 w-4 shrink-0 text-primary" />
        <span className="min-w-0 flex-1 truncate text-xs font-medium">
          {selected?.title || 'YouTube'}
        </span>
        {videoId && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            aria-label={isPip ? 'Dock player back to the page' : 'Pop out mini player'}
            onClick={() => {
              if (isPip) closePip();
              else popOut();
            }}
          >
            {isPip ? <DockIcon /> : <PopOutIcon />}
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          aria-label={isMini ? 'Expand player' : 'Minimize player'}
          onClick={() => setMode(isMini ? 'expanded' : 'minimized')}
        >
          {isMini ? <ExpandIcon /> : <MinimizeIcon />}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          aria-label="Close YouTube player"
          onClick={() => {
            closePip();
            setSearch('');
            setResults([]);
            setVideoId(null);
            setError(null);
            setMode('expanded');
          }}
        >
          <CloseIcon />
        </Button>
      </div>

      {!isMini && (
        <form onSubmit={searchYoutube} className="flex gap-1.5 p-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search YouTube"
            className="h-8 text-xs"
            aria-label="Search YouTube"
            disabled={loading}
          />
          <Button type="submit" size="sm" className="h-8 shrink-0 px-3" disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </Button>
        </form>
      )}

      {error && <p className="px-2 pb-2 text-xs text-destructive">{error}</p>}

      {isMini ? null : isPip ? (
        <p className="px-3 py-4 text-center text-xs text-muted-foreground">
          Playing in the mini overlay. Dock or close it to bring YouTube back.
        </p>
      ) : (
        <div className="grid gap-3 p-2 md:grid-cols-[minmax(0,1fr)_240px]">
          <div className="aspect-video w-full min-h-[220px] bg-black">
            {videoId ? (
              <iframe
                key={videoId}
                title={selected?.title || 'YouTube'}
                src={youtubeEmbedSrc(videoId)}
                className="h-full w-full"
                allow={YOUTUBE_IFRAME_ALLOW}
                referrerPolicy={YOUTUBE_REFERRER_POLICY}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-xs text-muted-foreground">
                Search YouTube to watch a video here.
              </div>
            )}
          </div>

          {results.length > 0 && (
            <ul className="max-h-[360px] space-y-1 overflow-y-auto md:max-h-[min(360px,52vw)]">
              {results.map((video) => (
                <li key={video.id}>
                  <button
                    type="button"
                    onClick={() => playVideo(video.id)}
                    aria-pressed={video.id === videoId}
                    className={cn(
                      'flex w-full gap-2 rounded-md p-1.5 text-left transition-colors hover:bg-accent',
                      video.id === videoId && 'bg-accent'
                    )}
                  >
                    <span className="relative h-12 w-20 shrink-0 overflow-hidden rounded bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      {video.duration && (
                        <span className="absolute bottom-0.5 right-0.5 rounded bg-black/80 px-1 text-[10px] text-white">
                          {video.duration}
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-xs font-medium leading-snug">{video.title}</span>
                      <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                        {video.channel}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function YoutubeIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.8 15.6V8.4L16 12l-6.2 3.6z" />
    </svg>
  );
}

function MinimizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
      <path d="M8 3v3a2 2 0 0 1-2 2H3M21 8h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3M16 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function PopOutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
      <path d="M15 3h6v6M21 3l-7 7M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}

function DockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden>
      <path d="M3 21V3h18v18H3zM9 9h6v6H9V9z" />
    </svg>
  );
}

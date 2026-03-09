'use client';

import React, { useRef, useState } from 'react';
import { Maximize2, RotateCcw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui';

interface GamePlayerProps {
  iframeUrl: string;
  title: string;
  /** When true, show "Play on site" card instead of iframe (e.g. X-Frame-Options blocks embed). */
  embedBlocked?: boolean;
}

function getPlayHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'external site';
  }
}

export function GamePlayer({ iframeUrl, title, embedBlocked = false }: GamePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Fullscreen error:', err.message);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleReload = () => setIframeKey((prev) => prev + 1);

  if (embedBlocked) {
    const hostname = getPlayHostname(iframeUrl);
    return (
      <div className="rounded-2xl border border-border bg-muted/30 p-8 md:p-12 text-center">
        <h1 className="text-xl font-black uppercase tracking-tighter mb-2">{title}</h1>
        <p className="text-muted-foreground text-sm mb-2 max-w-md mx-auto">
          This game doesn&apos;t allow embedding. Click below to open it on {hostname} and play there.
        </p>
        <p className="text-muted-foreground/80 text-xs mb-6 max-w-sm mx-auto">
          Same game, same fun—just opens in a new tab.
        </p>
        <Button variant="primary" size="lg" className="gap-2" asChild>
          <a href={iframeUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" /> Open {hostname} to play
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black uppercase tracking-tighter">{title}</h1>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" className="gap-1.5 text-xs" asChild>
            <a href={iframeUrl} target="_blank" rel="noopener noreferrer" title="Open in new tab">
              <ExternalLink className="h-3.5 w-3.5" /> Play on site
            </a>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleReload} title="Reload Game">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 md:flex hidden"
            onClick={toggleFullScreen}
            title="Toggle Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-border group"
      >
        <iframe
          key={iframeKey}
          src={iframeUrl}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button
          onClick={toggleFullScreen}
          className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
        </button>
      </div>
    </div>
  );
}

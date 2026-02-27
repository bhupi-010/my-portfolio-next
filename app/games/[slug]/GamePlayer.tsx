'use client';

import React, { useRef, useState } from 'react';
import { Maximize2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui';

interface GamePlayerProps {
  iframeUrl: string;
  title: string;
}

export function GamePlayer({ iframeUrl, title }: GamePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeKey, setIframeKey] = useState(0);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleReload = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
              <h1 className="text-xl font-black uppercase tracking-tighter">{title}</h1>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase">Live</span>
          </div>

          <div className="flex items-center gap-2">
             <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8" 
                onClick={handleReload}
                title="Reload Game"
             >
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
        
        {/* Float action button for mobile/easy access */}
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

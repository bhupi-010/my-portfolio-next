'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  pId: string;
  slot: string;
  format?: string;
  responsive?: string;
  className?: string;
}

/**
 * Reusable AdSense Ad Unit component.
 * Place this where you want ads to appear.
 */
export function AdUnit({ pId, slot, format = 'auto', responsive = 'true', className }: AdUnitProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      // AdSense might throw if and-block refers to a slot already filled or script not loaded
      console.warn('AdSense unit error:', e);
    }
  }, []);

  return (
    <div className={className} key={`ad-${slot}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '250px', minHeight: '90px' }}
        data-ad-client={pId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

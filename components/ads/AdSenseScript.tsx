'use client';

import Script from 'next/script';

/**
 * AdSense is loaded with strategy="lazyOnload" to avoid blocking.
 * Note: Lighthouse may report "Uses deprecated APIs" (unload listeners) from
 * Google's ad/consent scripts; that cannot be fixed in first-party code.
 */
export function AdSenseScript({ pId }: { pId: string }) {
  if (!pId) return null;
  
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}

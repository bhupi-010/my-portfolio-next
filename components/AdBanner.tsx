import { cn } from '@/lib/utils';

interface AdBannerProps {
  className?: string;
}

/**
 * Placeholder ad banner component.
 * Replace with real ad integration (e.g. AdSense AdUnit) when ready.
 */
export function AdBanner({ className }: AdBannerProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/50 bg-accent/30 backdrop-blur-sm',
        'flex items-center justify-center',
        'min-h-[120px] sm:min-h-[90px]',
        className
      )}
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="relative flex flex-col items-center gap-1 py-4 px-6 text-center">
        <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground/60">
          Sponsored
        </span>
        <span className="text-sm text-muted-foreground/40">
          Ad space available
        </span>
      </div>
    </div>
  );
}

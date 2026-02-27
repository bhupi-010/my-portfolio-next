import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        {
          'bg-primary/10 text-primary': variant === 'default',
          'border border-border bg-transparent text-muted-foreground': variant === 'outline',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'bg-destructive/10 text-destructive border border-destructive/20': variant === 'destructive',
        },
        className
      )}
    >
      {children}
    </span>
  );
}

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  containerClassName?: string;
}

export function Section({ id, className, children, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn('section-padding', className)}>
      <div className={cn('container-custom', containerClassName)}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = 'center',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {label && (
        <span className="mb-2 inline-block text-sm font-medium text-primary">
          {label}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-muted-foreground mx-auto text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

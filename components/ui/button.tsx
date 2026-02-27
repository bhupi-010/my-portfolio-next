import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25':
              variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80':
              variant === 'secondary',
            'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground':
              variant === 'outline',
            'bg-transparent hover:bg-accent hover:text-accent-foreground':
              variant === 'ghost',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-5 py-2.5 text-sm': size === 'md',
            'px-8 py-3 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };

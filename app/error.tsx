'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui';
import { RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="space-y-6 max-w-md mx-auto">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="text-3xl">!</span>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="text-muted-foreground">
              An unexpected error occurred. Please try again.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button onClick={reset}>
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <a href="/">
                <Home className="h-4 w-4" />
                Go Home
              </a>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

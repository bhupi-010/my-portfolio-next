import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container-custom text-center">
        <div className="space-y-6 max-w-md mx-auto">
          {/* 404 Text */}
          <h1 className="text-8xl font-bold text-primary/20">404</h1>
          
          {/* Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#projects">
                <ArrowLeft className="h-4 w-4" />
                View Projects
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

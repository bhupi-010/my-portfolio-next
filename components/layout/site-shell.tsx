'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col" suppressHydrationWarning>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}


import { Rss } from "lucide-react";

export default function NewsLoading() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-pulse">
            <Rss className="w-4 h-4" />
            <span>Loading News...</span>
          </div>
          <div className="h-16 w-64 bg-card border rounded-2xl mx-auto mb-6 animate-pulse" />
          <div className="h-4 w-96 bg-card border rounded-lg mx-auto animate-pulse" />
        </header>

        <div className="grid gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className="p-6 bg-card/50 border border-border/50 rounded-2xl animate-pulse"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div className="h-6 w-24 bg-primary/10 rounded" />
                  <div className="h-8 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted/50 rounded" />
                </div>
                <div className="w-24 h-8 bg-primary/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

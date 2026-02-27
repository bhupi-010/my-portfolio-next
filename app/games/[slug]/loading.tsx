import React from "react";

export default function GameLoading() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/20">
      <div className="container-custom max-w-5xl">
        <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-32 bg-muted rounded animate-pulse" />
            <div className="h-8 w-48 bg-muted rounded animate-pulse" />
            <div className="h-8 w-8 bg-muted rounded animate-pulse" />
        </div>
        <div className="w-full aspect-video bg-muted rounded-2xl animate-pulse shadow-2xl" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                <div className="h-20 w-full bg-muted rounded animate-pulse" />
            </div>
            <div className="h-32 bg-muted rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

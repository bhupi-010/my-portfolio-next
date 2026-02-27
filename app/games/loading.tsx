import React from "react";

export default function GamesLoading() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-muted/30">
      <div className="container-custom">
        <div className="h-24 w-1/3 bg-muted rounded-xl animate-pulse mb-12 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-background rounded-xl border border-border animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

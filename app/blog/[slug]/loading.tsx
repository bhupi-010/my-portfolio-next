export default function BlogPostLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom max-w-3xl animate-pulse">
        {/* Back link skeleton */}
        <div className="h-4 w-28 bg-muted rounded mb-8" />

        {/* Title skeleton */}
        <div className="space-y-3 mb-6">
          <div className="h-10 w-full bg-muted rounded" />
          <div className="h-10 w-3/4 bg-muted rounded" />
        </div>

        {/* Meta skeleton */}
        <div className="flex gap-4 mb-6">
          <div className="h-5 w-32 bg-muted rounded" />
          <div className="h-5 w-24 bg-muted rounded" />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-6 w-16 bg-muted rounded-full" />
          <div className="h-6 w-20 bg-muted rounded-full" />
          <div className="h-6 w-14 bg-muted rounded-full" />
        </div>

        {/* Cover image skeleton */}
        <div className="aspect-[16/9] bg-muted rounded-2xl mb-10" />

        {/* Content skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-muted rounded"
              style={{ width: `${75 + Math.random() * 25}%` }}
            />
          ))}
          <div className="h-8" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-4 bg-muted rounded"
              style={{ width: `${70 + Math.random() * 30}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-20">
      <div className="container-custom max-w-md text-center">
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20">
          <FileQuestion className="h-10 w-10 text-primary" />
        </div>

        <h1 className="text-3xl font-bold mb-3">Post Not Found</h1>
        <p className="text-muted-foreground mb-8 text-balance">
          The article you&apos;re looking for doesn&apos;t exist or may have been
          moved. Try browsing all articles below.
        </p>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    </div>
  );
}

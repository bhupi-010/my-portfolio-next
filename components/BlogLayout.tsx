import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { AdBanner } from '@/components/AdBanner';
import { BlogCard } from '@/components/BlogCard';
import type { Post, PostMeta } from '@/types/blog';

interface BlogLayoutProps {
  post: Post;
  relatedPosts: PostMeta[];
}

export function BlogLayout({ post, relatedPosts }: BlogLayoutProps) {
  const { frontmatter, content, readingTime } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="min-h-screen pt-24 pb-16">
      {/* ── Hero Section ─────────────────────────────────── */}
      <header className="container-custom max-w-3xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-[1.15] mb-4">
          {frontmatter.title}
        </h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {formattedDate}
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            {readingTime} min read
          </span>
        </div>

        {/* Tags */}
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {frontmatter.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        {/* Cover Image */}
        {frontmatter.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border mb-10 shadow-lg">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        )}
      </header>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="container-custom max-w-3xl">
        <MarkdownRenderer html={content} />

        {/* Ad after content */}
        <AdBanner className="my-10" />
      </div>

      {/* ── Related Posts ─────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="container-custom max-w-5xl mt-16">
          <div className="border-t border-border pt-12">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp, i) => (
                <BlogCard key={rp.slug} post={rp} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <div className="container-custom max-w-3xl mt-16 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/50 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
        >
          <ArrowLeft className="h-4 w-4" />
          Browse all articles
        </Link>
      </div>
    </article>
  );
}

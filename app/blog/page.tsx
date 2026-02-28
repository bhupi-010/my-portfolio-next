import type { Metadata } from 'next';
import { Search, BookOpen, Sparkles } from 'lucide-react';
import { getAllPosts } from '@/lib/githubBlog';
import { BlogCard } from '@/components/BlogCard';
import { SITE_CONFIG } from '@/constants';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles about React, Next.js, TypeScript, performance optimization, and modern web development best practices.',
  openGraph: {
    title: `Blog | ${SITE_CONFIG.name}`,
    description:
      'Articles about React, Next.js, TypeScript, performance optimization, and modern web development.',
    url: `${SITE_CONFIG.url}/blog`,
    type: 'website',
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Blog`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${SITE_CONFIG.name}`,
    description:
      'Articles about React, Next.js, TypeScript, performance optimization, and modern web development.',
    images: [SITE_CONFIG.ogImage],
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="container-custom text-center mb-16">
        <div className="relative max-w-2xl mx-auto">
          {/* Decorative blob */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Thoughts &amp; Insights
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              The{' '}
              <span className="gradient-text">Blog</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed text-balance">
              Deep dives into React, Next.js, performance, and the craft of
              building modern web applications.
            </p>
          </div>
        </div>
      </section>

      {/* ── Posts Grid ─────────────────────────────────────── */}
      <section className="container-custom">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">
              No posts yet
            </h2>
            <p className="text-sm text-muted-foreground/60">
              Articles are on their way. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${SITE_CONFIG.name} Blog`,
            description:
              'Articles about React, Next.js, TypeScript, performance optimization, and modern web development.',
            url: `${SITE_CONFIG.url}/blog`,
            author: {
              '@type': 'Person',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.url,
            },
          }),
        }}
      />
    </div>
  );
}

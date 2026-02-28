import type { Metadata } from 'next';
import { Search, BookOpen, Sparkles, LayoutGrid } from 'lucide-react';
import { getPaginatedPosts, getAllTags } from '@/lib/githubBlog';
import { BlogCard } from '@/components/BlogCard';
import { BlogSearch } from '@/components/BlogSearch';
import { BlogPagination } from '@/components/BlogPagination';
import { SITE_CONFIG } from '@/constants';
import { cn } from '@/lib/utils';

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    tag?: string;
    search?: string;
  }>;
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const { tag, search, page } = params;
  
  let title = "The Journal | Blog";
  let description = "Deep dives into React, Next.js, and modern web engineering.";
  
  if (tag) {
    title = `Articles tagged "${tag}" | The Journal`;
    description = `Browse all articles tagged with ${tag} on Bhupendra Nath's engineering blog.`;
  } else if (search) {
    title = `Search results for "${search}" | The Journal`;
  }
  
  if (page && page !== '1') {
    title += ` - Page ${page}`;
  }

  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url: `${SITE_CONFIG.url}/blog`,
      type: 'website',
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630 }],
    },
    // Prevent indexing search result pages or filtered pages to avoid duplicate content/low-value pages
    robots: (tag || search) ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog`,
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const tag = params.tag;
  const search = params.search;

  // Fetch data in parallel for efficiency
  const [{ posts, totalPages, currentPage, totalPosts }, tags] = await Promise.all([
    getPaginatedPosts({ page, tag, search }),
    getAllTags(),
  ]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* ── Hero Section ──────────────────────────────────── */}
      <section className="container-custom text-center mb-16 px-4">
        <div className="relative max-w-2xl mx-auto space-y-2">
          {/* Decorative blob */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-border bg-card/5 backdrop-blur-md text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary shadow-sm shadow-primary/5">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Insights & Engineering
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter mb-6 leading-none">
              The <span className="gradient-text">Journal</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed text-balance opacity-80 font-medium">
              A curated collection of deep dives into high-performance engineering, modern frontend architecture, and developer productivity.
            </p>
          </div>
        </div>
      </section>

      {/* ── Search & Filters ──────────────────────────────── */}
      <section className="container-custom mb-16 px-4">
        <BlogSearch 
          tags={tags} 
          currentTag={tag} 
          initialSearch={search} 
        />
      </section>

      {/* ── Posts Section ─────────────────────────────────── */}
      <section className="container-custom px-4">
        <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
              {tag ? `Tagged with "${tag}"` : search ? `Search results for "${search}"` : "Latest Articles"}
            </h2>
          </div>
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Showing {posts.length} of {totalPosts} posts
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl border border-dashed border-border/60 bg-card/10 animate-fade-up">
            <BookOpen className="h-16 w-16 mx-auto mb-6 text-muted-foreground/20" />
            <h3 className="text-2xl font-bold text-foreground mb-3">
              We couldn't find any articles matching your search.
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8 font-medium">
              Try adjusting your filters or search keywords to discover more engineering insights.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <BlogCard key={post.slug} post={post} index={i} />
              ))}
            </div>

            {/* Pagination Controls */}
            <BlogPagination 
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${SITE_CONFIG.name} Blog`,
            url: `${SITE_CONFIG.url}/blog`,
            description:
              'Articles about React, Next.js, and modern web architecture.',
            author: {
              '@type': 'Person',
              name: SITE_CONFIG.name,
            },
          }),
        }}
      />
    </div>
  );
}

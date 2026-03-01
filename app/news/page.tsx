import { getNewsList } from "@/lib/news";
import Link from "next/link";
import { Calendar, ArrowRight, Rss, Newspaper, ChevronLeft, ChevronRight, ExternalLink, Tag } from "lucide-react";
import { SITE_CONFIG } from "@/constants";

export const metadata = {
  title: "Daily Tech News | Bhupendra Nath",
  description: "Stay updated with the latest tech news, curated and generated daily by autonomous agents.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/news`,
  },
  openGraph: {
    title: "Daily Tech News | Bhupendra Nath",
    description: "Stay updated with the latest tech news, curated and generated daily by autonomous agents.",
    url: `${SITE_CONFIG.url}/news`,
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}/og-news.png`,
        width: 1200,
        height: 630,
        alt: "Daily Tech News",
      },
    ],
  },
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 5;

  const { items: news, totalPages, totalItems } = await getNewsList(currentPage, limit);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Schema.org Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_CONFIG.url },
              { "@type": "ListItem", position: 2, name: "News", item: `${SITE_CONFIG.url}/news` },
            ],
          }),
        }}
      />

      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 py-20 relative z-10">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
            <Rss className="w-4 h-4" />
            <span>Advanced Tech News Aggregator</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight animate-fade-up">
            Daily <span className="text-primary italic">Tech News</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            Stay ahead of the curve with our daily dose of technology updates, aggregated from
            multiple sources and indexed directly from our specialized news repository.
          </p>
        </header>

        {news.length === 0 ? (
          <div className="text-center py-20 bg-card/50 backdrop-blur-sm border rounded-2xl animate-fade-up [animation-delay:400ms]">
            <Newspaper className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-2xl font-bold mb-2">No News Yet</h2>
            <p className="text-muted-foreground">Check back later for fresh updates!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 animate-fade-up [animation-delay:400ms]">
              {news.map((item) => {
                // Extract readable source domain from the source URL or tags
                const sourceDomain =
                  item.tags?.[0] ??
                  (item.source
                    ? (() => {
                        try {
                          return new URL(item.source).hostname.replace(/^www\./, "");
                        } catch {
                          return null;
                        }
                      })()
                    : null);

                return (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="group p-6 bg-card/50 hover:bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 block"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        {/* Meta badges row */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="flex items-center gap-1.5 text-2xs font-bold uppercase tracking-wider text-primary py-0.5 px-2 bg-primary/10 rounded">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </span>

                          {item.category && (
                            <span className="text-2xs font-bold uppercase tracking-wider text-muted-foreground py-0.5 px-2 bg-muted rounded">
                              {item.category}
                            </span>
                          )}

                          {sourceDomain && (
                            <span className="flex items-center gap-1 text-2xs font-medium text-muted-foreground py-0.5 px-2 bg-muted/60 rounded border border-border/50">
                              <ExternalLink className="w-3 h-3" />
                              {sourceDomain}
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {item.title}
                        </h2>

                        <p className="text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none mb-3">
                          {item.description}
                        </p>

                        {/* Tags row */}
                        {item.tags && item.tags.length > 1 && (
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <Tag className="w-3 h-3 text-muted-foreground/60" />
                            {item.tags.slice(1).map((tag) => (
                              <span
                                key={tag}
                                className="text-2xs text-muted-foreground py-0.5 px-2 bg-muted/40 rounded-full border border-border/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="w-full md:w-auto h-12 flex items-center justify-center md:justify-end">
                        <div className="flex items-center gap-2 text-primary font-bold transition-all group-hover:gap-3">
                          Read More <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4 animate-fade-up [animation-delay:500ms]">
                <Link
                  href={`/news?page=${currentPage - 1}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    currentPage <= 1
                      ? "pointer-events-none opacity-50 cursor-not-allowed bg-muted"
                      : "hover:bg-primary/10 hover:border-primary/50 bg-card"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/news?page=${page}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground border-primary font-bold"
                          : "bg-card hover:bg-primary/10 hover:border-primary/50"
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/news?page=${currentPage + 1}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    currentPage >= totalPages
                      ? "pointer-events-none opacity-50 cursor-not-allowed bg-muted"
                      : "hover:bg-primary/10 hover:border-primary/50 bg-card"
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-up [animation-delay:600ms]">
              Showing {news.length} of {totalItems} news stories
            </div>
          </>
        )}

        <footer className="mt-20 pt-12 border-t border-border/50 text-center text-muted-foreground animate-fade-up [animation-delay:700ms]">
          <p>
            This newsfeed is powered by a dedicated Python news aggregator agent collecting from
            NewsAPI &amp; GNews.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href="https://github.com/bhupi-010/bhupi-news"
              className="text-sm font-medium hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repository
            </a>
            <span>•</span>
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Back to Portfolio
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

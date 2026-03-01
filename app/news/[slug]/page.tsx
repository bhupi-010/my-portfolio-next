import { getNewsContent, getNewsList } from "@/lib/news";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Calendar, Share, Clock, ChevronRight, ExternalLink, Tag } from "lucide-react";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/constants";

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const rawContent = await getNewsContent(slug);

  if (!rawContent) return { title: "News Not Found" };

  const { data: frontmatter } = matter(rawContent);
  const title = frontmatter.title || "Latest Tech News";
  const description =
    frontmatter.description ||
    "Read more about this technology update on Bhupendra Nath's newsfeed.";

  return {
    title: `${title} | Bhupendra News`,
    description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/news/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_CONFIG.url}/news/${slug}`,
      type: "article",
      publishedTime: frontmatter.date,
      authors: ["Bhupendra Nath"],
    },
  };
}

export async function generateStaticParams() {
  const { items: news } = await getNewsList(1, 100);
  return news.map((item) => ({ slug: item.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetail({ params }: PageProps) {
  const { slug } = await params;
  const rawContent = await getNewsContent(slug);

  if (!rawContent) {
    notFound();
  }

  const { data: frontmatter, content } = matter(rawContent);
  const { items: news } = await getNewsList(1, 1000);
  const newsItem = news.find((n) => n.slug === slug);

  const title =
    frontmatter.title ||
    newsItem?.title ||
    slug.replace(/-/g, " ").replace(/^\d{4}-\d{2}-\d{2}-/, "");
  let date =
    frontmatter.date ||
    newsItem?.date ||
    slug.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ||
    "";

  // Format the date if it's a valid ISO string
  try {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      date = d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  } catch (e) {
    // leave as is
  }
  const category = frontmatter.category || newsItem?.category;
  const sourceUrl = frontmatter.source || newsItem?.source;
  const tags: string[] = frontmatter.tags || newsItem?.tags || [];

  // Derive readable source domain
  let sourceDomain: string | null = null;
  if (sourceUrl) {
    try {
      sourceDomain = new URL(sourceUrl).hostname.replace(/^www\./, "");
    } catch {
      sourceDomain = null;
    }
  }

  // Extract first image for structured data
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const featuredImage = imageMatch ? imageMatch[1] : `${SITE_CONFIG.url}/og-news.png`;

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      {/* Article Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: title,
            description: frontmatter.description || newsItem?.description,
            image: [featuredImage],
            datePublished: date,
            author: [{ "@type": "Person", name: "Bhupendra Nath", url: SITE_CONFIG.url }],
            ...(sourceUrl && { url: sourceUrl }),
            ...(category && { articleSection: category }),
            ...(tags.length > 0 && { keywords: tags.join(", ") }),
          }),
        }}
      />

      {/* Background */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        {/* Breadcrumb nav */}
        <nav className="mb-12 flex items-center justify-between animate-fade-in">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            <div className="w-8 h-8 rounded-full border border-border group-hover:border-primary/50 group-hover:bg-primary/10 flex items-center justify-center transition-all">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to All News
          </Link>
          <div className="flex items-center gap-1.5 text-2xs font-bold uppercase tracking-wider text-muted-foreground">
            News <ChevronRight className="w-3 h-3" />{" "}
            <span className="text-primary truncate max-w-[100px] md:max-w-none capitalize">
              {title}
            </span>
          </div>
        </nav>

        <article className="animate-fade-up [animation-delay:200ms]">
          <header className="mb-12">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="flex items-center gap-1.5 text-sm font-medium py-1 px-3 bg-card border rounded-full">
                <Calendar className="w-4 h-4 text-primary" />
                {date}
              </span>

              <span className="flex items-center gap-1.5 text-sm font-medium py-1 px-3 bg-card border rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                2 min read
              </span>

              {category && (
                <span className="text-sm font-bold uppercase tracking-wider py-1 px-3 bg-primary/10 text-primary rounded-full">
                  {category}
                </span>
              )}

              {sourceDomain && (
                <a
                  href={sourceUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-sm font-medium py-1 px-3 bg-card border rounded-full text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {sourceDomain}
                </a>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
              {title}
            </h1>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <Tag className="w-3.5 h-3.5 text-muted-foreground/60" />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-muted-foreground py-0.5 px-2.5 bg-muted/50 rounded-full border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="h-1 w-20 bg-primary rounded-full" />
          </header>

          {/* Article body */}
          <div className="prose prose-xl dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-2xl max-w-none transition-all duration-500 hover:prose-p:text-foreground">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          <footer className="mt-20 pt-12 border-t border-border/50 animate-fade-up [animation-delay:400ms]">
            {/* Read original */}
            {sourceUrl && (
              <div className="mb-8 p-5 bg-card/60 rounded-2xl border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold mb-0.5">Original Article</p>
                  <p className="text-xs text-muted-foreground">{sourceDomain}</p>
                </div>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary border border-primary/30 font-bold rounded-full hover:bg-primary hover:text-primary-foreground transition-all text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read at Source
                </a>
              </div>
            )}

            {/* Share card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-card rounded-3xl border border-border/50">
              <div>
                <h3 className="text-lg font-bold mb-1">Found this interesting?</h3>
                <p className="text-muted-foreground">Share this update with your network.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                  <Share className="w-4 h-4" />
                  Share Now
                </button>
              </div>
            </div>

            <div className="mt-12 text-center text-sm text-muted-foreground">
              This article was aggregated by the{" "}
              <a
                href="https://github.com/bhupi-010/bhupi-news"
                className="text-primary hover:underline font-medium"
              >
                bhupi-news
              </a>{" "}
              Advanced Tech News Agent.
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

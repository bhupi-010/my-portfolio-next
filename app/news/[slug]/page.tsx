import { getNewsContent, getNewsList } from "@/lib/news";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";
import { ArrowLeft, Calendar, Share, Clock, ChevronRight } from "lucide-react";
import matter from 'gray-matter';

export async function generateStaticParams() {
  const { items: news } = await getNewsList(1, 100);
  return news.map((item) => ({
    slug: item.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetail({ params }: PageProps) {
  const { slug } = await params;
  const rawContent = await getNewsContent(slug);
  
  // Use gray-matter to parse any frontmatter if present
  const { data: frontmatter, content } = matter(rawContent);
  
  // Use frontmatter if it exists, otherwise use what we know
  // We can also try to find the item in the list to get title/date if not in frontmatter
  const { items: news } = await getNewsList(1, 1000); // Get more to be sure
  const newsItem = news.find(n => n.slug === slug);

  const title = frontmatter.title || newsItem?.title || (slug.replace(/-/g, ' ').replace(/^\d{4}-\d{2}-\d{2}-/, ''));
  const date = frontmatter.date || newsItem?.date || slug.match(/^\d{4}-\d{2}-\d{2}/)?.[0] || "";

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary selection:text-primary-foreground">
      {/* Background patterns */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-5 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10">
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
            News <ChevronRight className="w-3 h-3" /> <span className="text-primary truncate max-w-[100px] md:max-w-none capitalize">{title}</span>
          </div>
        </nav>

        <article className="animate-fade-up [animation-delay:200ms]">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
              <span className="flex items-center gap-1.5 text-sm font-medium py-1 px-3 bg-card border rounded-full">
                <Calendar className="w-4 h-4 text-primary" />
                {date}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium py-1 px-3 bg-card border rounded-full">
                <Clock className="w-4 h-4 text-primary" />
                2 min read
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
              {title}
            </h1>
            
            <div className="h-1 w-20 bg-primary rounded-full mb-12" />
          </header>

          <div className="prose prose-xl dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-2xl max-w-none transition-all duration-500 hover:prose-p:text-foreground">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          <footer className="mt-20 pt-12 border-t border-border/50 animate-fade-up [animation-delay:400ms]">
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
               This is a headless news content fetched from <a href="https://github.com/bhupi-010/bhupi-news" className="text-primary hover:underline font-medium">bhupi-news</a> repository.
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

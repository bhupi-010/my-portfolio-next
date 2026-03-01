const REVALIDATE_TIME = 3600; // 1 hour
const INDEX_URL = "https://raw.githubusercontent.com/bhupi-010/bhupi-news/main/news-index.json";
const CONTENT_URL = "https://raw.githubusercontent.com/bhupi-010/bhupi-news/main/news";

export interface NewsItem {
  id: string;        // URL MD5 hash – unique dedup key
  title: string;
  slug: string;
  date: string;
  description: string;
  category?: string;
  source?: string;   // Original article URL
  tags?: string[];   // Auto-extracted tags (e.g. source domain)
}

export interface PaginatedNews {
  items: NewsItem[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export async function getNewsList(page: number = 1, limit: number = 5): Promise<PaginatedNews> {
  try {
    const res = await fetch(INDEX_URL, {
      next: {
        revalidate: REVALIDATE_TIME,
        tags: ["news-list"],
      },
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch news index: ${res.statusText}`);
      return { items: [], totalPages: 0, currentPage: 1, totalItems: 0 };
    }

    const allNews: NewsItem[] = await res.json();

    // Sort by date descending
    allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Format ISO date to human-readable format right before slicing
    allNews.forEach(item => {
      try {
        const d = new Date(item.date);
        if (!isNaN(d.getTime())) {
          item.date = d.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
        }
      } catch (e) {
        // Fallback to original if parsing fails
      }
    });

    const totalItems = allNews.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedItems = allNews.slice(startIndex, startIndex + limit);

    return {
      items: paginatedItems,
      totalPages,
      currentPage: page,
      totalItems,
    };
  } catch (error) {
    console.error("Error fetching news list:", error);
    return { items: [], totalPages: 0, currentPage: 1, totalItems: 0 };
  }
}

export async function getNewsContent(slug: string): Promise<string | null> {
  try {
    const res = await fetch(`${CONTENT_URL}/${slug}.md`, {
      next: {
        revalidate: REVALIDATE_TIME,
        tags: [`news-content-${slug}`],
      },
    });

    if (!res.ok) {
      return null;
    }

    return res.text();
  } catch (error) {
    console.error(`Error fetching news content for ${slug}:`, error);
    return null;
  }
}

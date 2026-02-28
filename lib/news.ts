const INDEX_URL = "https://raw.githubusercontent.com/bhupi-010/bhupi-news/main/news-index.json";
const CONTENT_URL = "https://raw.githubusercontent.com/bhupi-010/bhupi-news/main/news";

export interface NewsItem {
  title: string;
  slug: string;
  date: string;
  description: string;
  category?: string;
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
      next: { revalidate: 3600 },
      headers: {
        'Cache-Control': 'no-cache',
      }
    });

    if (!res.ok) {
      console.error(`Failed to fetch news index: ${res.statusText}`);
      return { items: [], totalPages: 0, currentPage: 1, totalItems: 0 };
    }

    const allNews: NewsItem[] = await res.json();
    
    // Sort by date descending
    allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const totalItems = allNews.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedItems = allNews.slice(startIndex, startIndex + limit);

    return {
      items: paginatedItems,
      totalPages,
      currentPage: page,
      totalItems
    };
  } catch (error) {
    console.error("Error fetching news list:", error);
    return { items: [], totalPages: 0, currentPage: 1, totalItems: 0 };
  }
}

export async function getNewsContent(slug: string): Promise<string> {
  try {
    const res = await fetch(`${CONTENT_URL}/${slug}.md`, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return "# News Not Found\n\nSorry, the news item you are looking for does not exist.";
    }

    return res.text();
  } catch (error) {
    console.error(`Error fetching news content for ${slug}:`, error);
    return "# Error\n\nFailed to load news content.";
  }
}

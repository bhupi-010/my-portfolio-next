import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Post, PostMeta, PostFrontmatter, PaginatedPosts, BlogFilters } from '@/types/blog';

// ── Configuration ────────────────────────────────────────────
const GITHUB_USERNAME = 'bhupi-010';
const GITHUB_REPO = 'bhupi-blogs';
const GITHUB_BRANCH = 'main';
const POSTS_DIR = 'blogs';
const POSTS_PER_PAGE = 9;

const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;
const API_BASE = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}`;

// ── In-memory cache (per serverless instance) ────────────────
// Avoids N+1 fetches on every request within the revalidation window.
let cachedPosts: PostMeta[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60_000; // 60 seconds — matches ISR revalidation

function isCacheValid(): boolean {
  return cachedPosts !== null && Date.now() - cacheTimestamp < CACHE_TTL_MS;
}

// ── Helpers ──────────────────────────────────────────────────
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function parseFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  return {
    title: (data.title as string) || 'Untitled',
    description: (data.description as string) || '',
    date: (data.date as string) || new Date().toISOString(),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    coverImage: (data.cover as string) || (data.coverImage as string) || '',
  };
}

// ── Fetch a single post by slug (for detail pages) ───────────
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const url = `${RAW_BASE}/${POSTS_DIR}/${slug}.md`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const raw = await res.text();
    const { data, content } = matter(raw);
    const frontmatter = parseFrontmatter(data);

    const processed = await remark().use(html, { sanitize: false }).process(content);
    const htmlContent = processed.toString();

    return {
      slug,
      frontmatter,
      content: htmlContent,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

// ── Fetch all post slugs using the Git Trees API ─────────────
// The Trees API returns the entire directory in a SINGLE request
// regardless of how many files exist — much better than contents API.
export async function getAllSlugs(): Promise<string[]> {
  try {
    const url = `${API_BASE}/git/trees/${GITHUB_BRANCH}?recursive=1`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    });

    if (!res.ok) return [];

    const data: { tree: { path: string; type: string }[] } = await res.json();
    return data.tree
      .filter(
        (item) =>
          item.type === 'blob' &&
          item.path.startsWith(`${POSTS_DIR}/`) &&
          item.path.endsWith('.md')
      )
      .map((item) =>
        item.path
          .replace(`${POSTS_DIR}/`, '')
          .replace(/\.md$/, '')
      );
  } catch {
    return [];
  }
}

// ── Fetch all posts metadata (with in-memory cache) ──────────
// This fetches in parallel with concurrency limiting to avoid
// hammering GitHub's API when you have 200+ posts.
export async function getAllPosts(): Promise<PostMeta[]> {
  if (isCacheValid()) return cachedPosts!;

  const slugs = await getAllSlugs();

  // Fetch in batches of 10 to avoid overwhelming the API
  const BATCH_SIZE = 10;
  const allPosts: (PostMeta | null)[] = [];

  for (let i = 0; i < slugs.length; i += BATCH_SIZE) {
    const batch = slugs.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (slug) => {
        try {
          const url = `${RAW_BASE}/${POSTS_DIR}/${slug}.md`;
          const res = await fetch(url, {
            next: { revalidate: 60 },
          });

          if (!res.ok) return null;

          const raw = await res.text();
          const { data, content } = matter(raw);
          const frontmatter = parseFrontmatter(data);

          return {
            slug,
            frontmatter,
            readingTime: calculateReadingTime(content),
          } as PostMeta;
        } catch {
          return null;
        }
      })
    );
    allPosts.push(...results);
  }

  const posts = allPosts
    .filter((p): p is PostMeta => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  // Update cache
  cachedPosts = posts;
  cacheTimestamp = Date.now();

  return posts;
}

// ── Paginated + filtered posts ───────────────────────────────
export async function getPaginatedPosts(
  filters: BlogFilters = {}
): Promise<PaginatedPosts> {
  const { page = 1, tag, search } = filters;
  let posts = await getAllPosts();

  // Filter by tag
  if (tag) {
    posts = posts.filter((p) =>
      p.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  // Filter by search query (title + description)
  if (search && search.trim()) {
    const q = search.toLowerCase().trim();
    posts = posts.filter(
      (p) =>
        p.frontmatter.title.toLowerCase().includes(q) ||
        p.frontmatter.description.toLowerCase().includes(q) ||
        p.frontmatter.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  const totalPosts = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, start + POSTS_PER_PAGE);

  return {
    posts: paginatedPosts,
    totalPosts,
    totalPages,
    currentPage: safePage,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  };
}

// ── Get all unique tags ──────────────────────────────────────
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags) {
      const lower = tag.toLowerCase();
      tagMap.set(lower, (tagMap.get(lower) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// ── Get related posts by tag match ───────────────────────────
export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();

  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.frontmatter.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

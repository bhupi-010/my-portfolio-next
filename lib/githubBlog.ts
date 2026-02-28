import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { Post, PostMeta, PostFrontmatter } from '@/types/blog';

// ── Configuration ────────────────────────────────────────────
const GITHUB_USERNAME = 'bhupi-010';
const GITHUB_REPO = 'blog-posts';
const GITHUB_BRANCH = 'main';
const POSTS_DIR = 'posts';

const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_BRANCH}`;
const API_BASE = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}`;

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
    coverImage: (data.coverImage as string) || '',
  };
}

// ── Fetch a single post by slug ──────────────────────────────
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

// ── Fetch all post slugs from the GitHub API ─────────────────
export async function getAllSlugs(): Promise<string[]> {
  try {
    const url = `${API_BASE}/contents/${POSTS_DIR}?ref=${GITHUB_BRANCH}`;
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

    const files: { name: string }[] = await res.json();
    return files
      .filter((f) => f.name.endsWith('.md'))
      .map((f) => f.name.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

// ── Fetch all posts (metadata only, for listing) ─────────────
export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getAllSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
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

  return posts
    .filter((p): p is PostMeta => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
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

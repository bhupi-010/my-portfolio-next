import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/githubBlog';
import { getNewsList } from '@/lib/news';
import { SITE_CONFIG, TOOLS_ITEMS } from '@/constants';
import { GAMES } from '@/lib/games';
import { projects } from '@/data/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogSlugs = await getAllSlugs();
  const { items: newsItems } = await getNewsList(1, 100);

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const newsEntries: MetadataRoute.Sitemap = newsItems.map((item) => ({
    url: `${SITE_CONFIG.url}/news/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const toolEntries: MetadataRoute.Sitemap = TOOLS_ITEMS.map((tool) => ({
    url: `${SITE_CONFIG.url}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const gameEntries: MetadataRoute.Sitemap = GAMES.map((game) => ({
    url: `${SITE_CONFIG.url}/games/${game.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_CONFIG.url}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/games`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...blogEntries,
    ...newsEntries,
    ...toolEntries,
    ...gameEntries,
    ...projectEntries,
  ];
}

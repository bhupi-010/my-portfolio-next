import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/githubBlog';
import { getNewsList } from '@/lib/news';
import { SITE_CONFIG } from '@/constants';

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
    ...blogEntries,
    ...newsEntries,
  ];
}

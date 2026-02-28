import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getAllSlugs } from '@/lib/githubBlog';
import { BlogLayout } from '@/components/BlogLayout';
import { SITE_CONFIG } from '@/constants';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ── Dynamic metadata from frontmatter ────────────────────────
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const { frontmatter } = post;
  const url = `${SITE_CONFIG.url}/blog/${slug}`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [SITE_CONFIG.name],
      tags: frontmatter.tags,
      images: frontmatter.coverImage
        ? [
            {
              url: frontmatter.coverImage,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ]
        : [
            {
              url: SITE_CONFIG.ogImage,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.coverImage
        ? [frontmatter.coverImage]
        : [SITE_CONFIG.ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

// ── Page ─────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, post.frontmatter.tags);

  return (
    <>
      <BlogLayout post={post} relatedPosts={relatedPosts} />

      {/* Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.frontmatter.title,
            description: post.frontmatter.description,
            image: post.frontmatter.coverImage || SITE_CONFIG.ogImage,
            datePublished: post.frontmatter.date,
            dateModified: post.frontmatter.date,
            author: {
              '@type': 'Person',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.url,
            },
            publisher: {
              '@type': 'Person',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.url,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${SITE_CONFIG.url}/blog/${slug}`,
            },
            keywords: post.frontmatter.tags.join(', '),
            wordCount: post.content.split(/\s+/).length,
          }),
        }}
      />
    </>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { PostMeta } from '@/types/blog';

interface BlogCardProps {
  post: PostMeta;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const formattedDate = new Date(frontmatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${slug}`}
      id={`blog-card-${slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border',
        'bg-card/50 backdrop-blur-sm',
        'transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1.5',
        'hover:border-primary/30',
        'animate-fade-up'
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
    >
      {/* Cover Image */}
      {frontmatter.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Tags */}
        {frontmatter.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" className="text-2xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="mb-2 text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {frontmatter.title}
        </h2>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {frontmatter.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readingTime} min read
            </span>
          </div>

          <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Read
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

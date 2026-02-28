import { cn } from '@/lib/utils';

interface MarkdownRendererProps {
  html: string;
  className?: string;
}

export function MarkdownRenderer({ html, className }: MarkdownRendererProps) {
  return (
    <div
      className={cn('prose-blog', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

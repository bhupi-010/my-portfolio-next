'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface BlogSearchProps {
  tags: { tag: string; count: number }[];
  currentTag?: string;
  initialSearch?: string;
}

export function BlogSearch({ tags, currentTag, initialSearch = '' }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearch);

  // Update URL search params
  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Always reset to page 1 on search/filter change
    params.delete('page');
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== initialSearch) {
        updateParams('search', searchValue || null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          className={cn(
            "block w-full pl-11 pr-11 py-3 bg-card/50 border border-border rounded-2xl",
            "text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20",
            "focus:border-primary/50 transition-all outline-none backdrop-blur-sm shadow-sm"
          )}
          placeholder="Search articles by title or tags..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
        <button
          onClick={() => updateParams('tag', null)}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-300",
            !currentTag 
              ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20" 
              : "bg-card/50 text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
          )}
        >
          All Posts
        </button>
        {tags.map(({ tag, count }) => (
          <button
            key={tag}
            onClick={() => updateParams('tag', currentTag === tag ? null : tag)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 flex items-center gap-1.5",
              currentTag === tag
                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                : "bg-card/50 text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
            )}
          >
            <Tag className="h-3 w-3" />
            <span className="capitalize">{tag}</span>
            <span className={cn(
              "text-[10px] px-1.5 py-0.5 rounded-full",
              currentTag === tag ? "bg-white/20" : "bg-primary/10 text-primary"
            )}>
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

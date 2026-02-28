'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/blog?${params.toString()}`, { scroll: true });
  };

  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 animate-fade-up">
      <div className="flex items-center gap-2">
        {/* First Page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-card/10 backdrop-blur-sm border-border hover:border-primary/30 hover:text-primary disabled:opacity-30"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="First Page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-card/10 backdrop-blur-sm border-border hover:border-primary/30 hover:text-primary disabled:opacity-30"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1.5 mx-2">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={cn(
                "h-9 w-9 rounded-xl text-sm font-medium transition-all duration-300 border",
                page === currentPage
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-card/30 text-muted-foreground border-border hover:border-primary/30 hover:text-primary"
              )}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-card/10 backdrop-blur-sm border-border hover:border-primary/30 hover:text-primary disabled:opacity-30"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-card/10 backdrop-blur-sm border-border hover:border-primary/30 hover:text-primary disabled:opacity-30"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last Page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
        Page {currentPage} of {totalPages} — Total {totalPages * 9} Posts
      </p>
    </div>
  );
}

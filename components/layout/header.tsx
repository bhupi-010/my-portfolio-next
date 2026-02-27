'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, ChevronDown, Hash, FileJson, ArrowRightLeft, Image as ImageIcon, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE_CONFIG, TOOLS_ITEMS } from '@/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const TOOL_ICONS: Record<string, any> = {
  'SHA 256 Generator': Hash,
  'JSON Beautifier': FileJson,
  'Base64 Encode/Decode': ArrowRightLeft,
  'Base64 Image Encode/Decode': ImageIcon,
  'Tic Tac Toe Game': Gamepad2,
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // If not on the home page, we might want the header to be always "scrolled" (solid-ish)
  const isSolid = isScrolled || pathname !== '/';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isSolid
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
    >
      <nav className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors flex items-center gap-1"
          >
            {SITE_CONFIG.name.split(' ')[0]}
            <span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.label === 'Tools') {
                return (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent outline-none">
                        {item.label}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2 bg-background/95 backdrop-blur-xl border-border shadow-2xl">
                      {TOOLS_ITEMS.map((tool) => {
                        const Icon = TOOL_ICONS[tool.label];
                        return (
                          <DropdownMenuItem key={tool.label} asChild>
                            <Link href={tool.href} className="flex items-center gap-3 cursor-pointer py-2.5 px-3 rounded-md hover:bg-accent transition-colors">
                              <div className="bg-primary/10 p-1.5 rounded-md">
                                {Icon && <Icon className="h-4 w-4 text-primary" />}
                              </div>
                              <span className="font-medium text-sm">{tool.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}
                      <div className="h-px bg-border my-1 mx-[-2px]" />
                      <DropdownMenuItem asChild>
                        <Link href="/games" className="flex items-center gap-3 cursor-pointer py-2.5 px-3 rounded-md hover:bg-primary/10 hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest group">
                          <Gamepad2 className="h-4 w-4 group-hover:animate-bounce" />
                          Explore Games Arena
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" asChild>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors focus-ring"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <div className="container-custom py-4 space-y-2">
              {NAV_ITEMS.map((item, index) => {
                if (item.label === 'Tools') {
                    return (
                        <div key={item.label} className="space-y-1">
                            <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {item.label}
                            </div>
                            {TOOLS_ITEMS.map((tool) => {
                                const Icon = TOOL_ICONS[tool.label];
                                return (
                                    <Link
                                        key={tool.label}
                                        href={tool.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-8 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                                    >
                                        <div className="bg-primary/10 p-1.5 rounded-md">
                                            {Icon && <Icon className="h-4 w-4 text-primary" />}
                                        </div>
                                        <span className="font-medium">{tool.label}</span>
                                    </Link>
                                );
                            })}
                            <div className="mx-8 h-px bg-border my-2" />
                            <Link
                                href="/games"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 px-8 py-3 text-sm text-primary font-bold uppercase tracking-widest hover:bg-primary/5 rounded-lg transition-colors"
                            >
                                <div className="bg-primary/10 p-1.5 rounded-md">
                                    <Gamepad2 className="h-4 w-4 text-primary" />
                                </div>
                                <span>Games Arena</span>
                            </Link>
                        </div>
                    );
                }
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors font-medium"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 }}
                className="pt-4 px-4 pb-4 border-t border-border mt-2"
              >
                <Button className="w-full" size="sm" asChild>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

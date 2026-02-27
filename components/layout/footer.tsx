import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { SITE_CONFIG, NAV_ITEMS } from '@/constants';

const socialLinks = [
  { name: 'GitHub', href: SITE_CONFIG.links.github, icon: Github },
  { name: 'LinkedIn', href: SITE_CONFIG.links.linkedin, icon: Linkedin },
  { name: 'Twitter', href: SITE_CONFIG.links.twitter, icon: Twitter },
  { name: 'Email', href: 'mailto:nathbhupi10@gmail.com', icon: Mail },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold">
              {SITE_CONFIG.name.split(' ')[0]}
              <span className="text-primary">.</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Senior Frontend Developer crafting high-performance web experiences with
              React, Next.js, and TypeScript.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors focus-ring"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <a
            href="#"
            className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors focus-ring group"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
}

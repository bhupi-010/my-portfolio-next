# Agent notes — my-portfolio-next

Use this file plus `docs/architecture.md` for high-level context before scanning the whole tree.

## What this repo is

- **Next.js 15** App Router portfolio site (personal branding, blog, projects, tools, games).
- **TypeScript**, **Tailwind CSS**, **Radix UI** primitives, **Framer Motion** for motion.
- **SEO**: `app/sitemap.ts`, `app/robots.ts`, `next-sitemap` post-build. **AdSense** wired via `components/ads/` and `constants` — see `.cursor/rules/seo-adsense.mdc` when changing ads or meta.
- **Middleware** (`middleware.ts`): 301 redirect from `www.` to canonical host `bhupendranath.com.np`.

## Where things live

| Area | Path |
|------|------|
| Routes & layouts | `app/` |
| Page sections (home) | `features/` — hero, about, projects, experience, skills, contact, tools |
| Shared UI | `components/` — layout, `ui/`, ads, blog helpers |
| Data (static) | `data/` — projects, experience, games, tools content |
| Blog source | Fetched via `lib/githubBlog.ts` (GitHub-backed markdown) |
| Site constants | `constants/index.ts` |
| Utilities | `lib/` |

## Commands

- `npm run dev` — local dev
- `npm run build` — production build (runs `next-sitemap` via `postbuild`)
- `npm run lint` / `npm run typecheck` — quality checks

## Conventions

- Prefer existing patterns in `components/ui` and `features/*` for new UI.
- Keep **one canonical URL** story consistent with middleware and `SITE_CONFIG.url` in `constants`.

## Optional tooling

- **Graph-It-Live** (recommended in `.vscode/extensions.json`): interactive dependency/call graphs; enable its MCP server in Cursor if you need automated structure queries.

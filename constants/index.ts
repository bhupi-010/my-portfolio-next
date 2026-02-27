export const SITE_CONFIG = {
  name: 'Bhupendra Nath',
  title: 'Bhupendra Nath | Senior Frontend Developer',
  description: 'Senior Frontend Developer specializing in React, Next.js, and TypeScript. Building high-performance, scalable web applications with a focus on user experience and clean architecture.',
  url: 'https://bhupendranath.com.np',
  ogImage: 'https://bhupendranath.com.np/profile.png',
  links: {
    github: 'https://github.com/bhupi-010',
    linkedin: 'https://www.linkedin.com/in/bhupendra-nath-838887233/',
    twitter: 'https://twitter.com/bhupendranath',
  },
} as const;

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

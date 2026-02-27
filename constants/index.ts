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

export const ADSENSE_CONFIG = {
  pId: 'ca-pub-8950459557922291',
  slots: {
    gamesDashboard: '', // Add your slot IDs here when available
    gameDetail: '',
    toolsDashboard: '',
    toolDetail: '',
  }
} as const;

export const NAV_ITEMS = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Tools', href: '/tools' },
  { label: 'Contact', href: '/#contact' },
] as const;

export const TOOLS_ITEMS = [
  { 
    label: 'SHA 256 Generator', 
    href: '/tools/sha-256', 
    slug: 'sha-256',
    description: 'Securely generate SHA-256 hashes locally in your browser. Perfect for checksums, data integrity, and developer security needs.',
    keywords: 'SHA-256, hash generator, security tool, online hash, browser hash, checksum'
  },
  { 
    label: 'JSON Beautifier', 
    href: '/tools/json-beautifier', 
    slug: 'json-beautifier',
    description: 'Format, minify, and validate JSON data instantly. Our smart auto-fix engine repairs common syntax errors like missing commas or quotes.',
    keywords: 'JSON beautifier, JSON formatter, JSON validator, fix JSON, JSON minifier, developer tool'
  },
  { 
    label: 'Base64 Encode/Decode', 
    href: '/tools/base64-text', 
    slug: 'base64-text',
    description: 'Convert text to Base64 and vice versa with ease. Features real-time processing and expansion ratio analytics.',
    keywords: 'Base64 encoder, Base64 decoder, text to base64, base64 to text, developer utility'
  },
  { 
    label: 'Base64 Image Encode/Decode', 
    href: '/tools/base64-image', 
    slug: 'base64-image',
    description: 'Transform images into Base64 Data URIs or decode them back. Ideal for embedding small icons and assets directly into code.',
    keywords: 'image to base64, base64 image, data uri generator, icon encoder, png to base64'
  },
  { 
    label: 'Tic Tac Toe Game', 
    href: '/tools/tic-tac-toe', 
    slug: 'tic-tac-toe',
    description: 'Play a classic game of Tic Tac Toe. Challenge our smart AI or play locally with a friend. Features pro gaming UI and session scoring.',
    keywords: 'tic tac toe, online game, react game, mini game, play tic tac toe, coding game'
  },
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

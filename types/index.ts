export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'ai' | 'other';
  highlights?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
}

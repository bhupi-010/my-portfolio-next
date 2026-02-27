import { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'JavaScript', category: 'frontend' },
  { name: 'HTML5', category: 'frontend' },
  { name: 'CSS3', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Redux Toolkit', category: 'frontend' },
  { name: 'TanStack Query', category: 'frontend' },
  { name: 'Framer Motion', category: 'frontend' },
  { name: 'Material UI', category: 'frontend' },
  { name: 'Mantine UI', category: 'frontend' },
  
  // Backend
  { name: 'Node.js', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Firebase', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'MongoDB', category: 'backend' },
  
  // DevOps
  { name: 'Git', category: 'devops' },
  { name: 'GitHub Actions', category: 'devops' },
  { name: 'Vercel', category: 'devops' },
  { name: 'Netlify', category: 'devops' },
  { name: 'Docker', category: 'devops' },
  
  // Tools
  { name: 'VS Code', category: 'tools' },
  { name: 'Postman', category: 'tools' },
  { name: 'Figma', category: 'tools' },
  { name: 'Jira', category: 'tools' },
  { name: 'Jest', category: 'tools' },
  { name: 'React Testing Library', category: 'tools' },
];

export const skillsByCategory = {
  frontend: skills.filter((s) => s.category === 'frontend'),
  backend: skills.filter((s) => s.category === 'backend'),
  devops: skills.filter((s) => s.category === 'devops'),
  tools: skills.filter((s) => s.category === 'tools'),
};

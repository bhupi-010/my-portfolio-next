import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Fintech Solution company',
    role: 'Frontend Developer',
    period: 'Jul 2025 - Present',
    description: 'Leading frontend development for fintech applications, focusing on secure and performant user interfaces.',
    achievements: [
      'Developing secure fintech solutions with emphasis on user experience and data protection',
      'Implementing modern frontend architectures for financial services',
      'Collaborating with cross-functional teams on innovative financial products',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Redux-Saga', 'GraphQL', 'Material UI', 'Financial APIs'],
  },
  {
    id: '2',
    company: 'UX-Qode',
    role: 'Frontend Developer',
    period: 'Mar 2024 - Jul 2025',
    description: 'Leading frontend development for enterprise-level web applications, focusing on performance optimization and scalable architecture.',
    achievements: [
      'Reduced initial load time by 40% through code splitting and lazy loading strategies',
      'Architected reusable component library used across 5+ projects',
      'Implemented comprehensive testing strategies achieving 85%+ code coverage',
      'Mentored junior developers on React best practices and clean code principles',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Redux Toolkit', 'TanStack Query'],
  },
  {
    id: '3',
    company: 'CodeRush',
    role: 'Frontend Developer',
    period: 'Oct 2022 - Dec 2022',
    description: 'Contributed to dynamic web applications with focus on responsive design and cross-browser compatibility.',
    achievements: [
      'Delivered 3 client projects ahead of schedule with zero critical bugs',
      'Implemented responsive designs achieving 100% mobile compatibility',
      'Optimized bundle size by 30% through tree shaking and code optimization',
    ],
    technologies: ['React', 'JavaScript', 'Material UI', 'REST APIs'],
  },
  {
    id: '4',
    company: 'Softosys',
    role: 'Junior React Developer',
    period: 'Sep 2021 - Sep 2022',
    description: 'Started professional journey building and maintaining web applications using React and modern JavaScript.',
    achievements: [
      'Built 10+ responsive web components from Figma designs',
      'Collaborated with backend team to integrate RESTful APIs',
      'Participated in code reviews and implemented feedback effectively',
      'Documented component usage and best practices for team reference',
    ],
    technologies: ['React', 'JavaScript', 'CSS3', 'Bootstrap', 'Git'],
  },
];

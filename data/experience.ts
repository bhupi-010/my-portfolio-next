import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Fintech Solutions Pvt Ltd',
    role: 'React Developer',
    period: 'Jul 2025 - Present · 9 mos',
    description: 'Full-time React Developer building fintech solutions in Kathmandu. Focus on secure, performant user interfaces and great developer experience.',
    achievements: [
      'Developing secure fintech solutions with emphasis on user experience and data protection',
      'Implementing modern frontend architectures for financial services',
      'Collaborating with cross-functional teams on innovative financial products',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Fintech APIs'],
  },
  {
    id: '2',
    company: 'UX-Qode',
    role: 'Frontend Developer',
    period: 'Dec 2023 - Jul 2025 · 1 yr 8 mos',
    description: 'Frontend Developer at UX-Qode; worked at Code Rush on behalf of UX-Qode. Built intuitive UIs, component libraries, and data-heavy interfaces with Mantine.',
    achievements: [
      'Used Mantine (modals, notifications, forms), Yup and React Query for validation and data; Axios and JWT for REST APIs and secure sessions',
      'Delivered reusable component library and versatile table (sorting, pagination, custom columns); integrated Chart.js/Recharts for data visualization',
      'Implemented data export (CSV/xlsx) and PDF generation to support reporting and user workflows',
    ],
    technologies: ['React', 'Mantine', 'Yup', 'React Query', 'Axios', 'JWT', 'React Mantine Table', 'Chart.js', 'Recharts', 'xlsx', 'react-to-pdf'],
  },
  {
    id: '3',
    company: 'Softosys',
    role: 'Software Engineer',
    period: 'Nov 2022 - Nov 2023 · 1 yr 1 mo',
    description: 'Full-time Software Engineer in a remote role. Built scalable web apps with Next.js, robust testing, and clear API design.',
    achievements: [
      'Built scalable Next.js apps with Redux Toolkit and React Hook Form; designed and documented APIs with Swagger and tested with Postman',
      'Wrote robust unit tests with Jest (mocking and assertions); created responsive UIs with Tailwind CSS',
      'Managed tasks, sprints, and collaboration using Jira for efficient delivery',
    ],
    technologies: ['Jest', 'Swagger', 'Redux Toolkit', 'Postman', 'Next.js', 'React Hook Form', 'Tailwind CSS', 'Jira'],
  },
  {
    id: '4',
    company: 'Meraki Techs',
    role: 'React Developer',
    period: 'Oct 2021 - Nov 2022 · 1 yr 2 mos',
    description: 'Started as an on-site intern, then continued as part-time React Developer in Kathmandu. Shipped real-time features and maintained clean state and version control.',
    achievements: [
      'Built responsive layouts with CSS3, Flexbox, and Grid; strong JavaScript (ES6) and React SPAs with hooks and functional components',
      'Managed global state with Redux.js (reducers and middleware); real-time sync and auth with Firebase (Firestore, Authentication)',
      'Used Git for version control and collaborative workflows; developed interactive UIs with React.js',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux.js', 'Firebase', 'Git'],
  },
];

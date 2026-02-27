import { Hero } from '@/features/hero/hero';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/features/about/about').then(mod => mod.About), { ssr: true });
const Projects = dynamic(() => import('@/features/projects/projects').then(mod => mod.Projects), { ssr: true });
const Experience = dynamic(() => import('@/features/experience/experience').then(mod => mod.Experience), { ssr: true });
const Skills = dynamic(() => import('@/features/skills/skills').then(mod => mod.Skills), { ssr: true });
const Contact = dynamic(() => import('@/features/contact/contact').then(mod => mod.Contact), { ssr: true });

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}

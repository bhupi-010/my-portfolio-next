import { Hero } from '@/features';
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/features').then(mod => mod.About), { ssr: true });
const Projects = dynamic(() => import('@/features').then(mod => mod.Projects), { ssr: true });
const Experience = dynamic(() => import('@/features').then(mod => mod.Experience), { ssr: true });
const Skills = dynamic(() => import('@/features').then(mod => mod.Skills), { ssr: true });
const Contact = dynamic(() => import('@/features').then(mod => mod.Contact), { ssr: true });

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

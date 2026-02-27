import { Hero } from '@/features/hero';
import { About } from '@/features/about';
import { Projects } from '@/features/projects';
import { Experience } from '@/features/experience';
import { Skills } from '@/features/skills';
import { Contact } from '@/features/contact';

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

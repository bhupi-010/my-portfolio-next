'use client';

import Image from 'next/image';
import { Code2, Zap, Layers, Users } from 'lucide-react';
import { Section, SectionHeader, Card } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Architecture',
    description: 'Building maintainable, scalable codebases with SOLID principles and best practices.',
  },
  {
    icon: Zap,
    title: 'Performance Focus',
    description: 'Optimizing for Core Web Vitals and delivering sub-second load times.',
  },
  {
    icon: Layers,
    title: 'Modern Stack',
    description: 'Expertise in React, Next.js, TypeScript, and the modern frontend ecosystem.',
  },
  {
    icon: Users,
    title: 'Team Player',
    description: 'Collaborative mindset with experience mentoring developers and leading projects.',
  },
];

export function About() {
  return (
    <Section id="about" className="bg-muted/30">
      <SectionHeader
        label="About Me"
        title="Crafting Digital Experiences"
        description="A passionate developer with a focus on building products that users love."
      />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <FadeIn direction="right">
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/profile.png"
                alt="Bhupendra Nath - Senior Frontend Developer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-48 h-48 bg-primary/5 rounded-full blur-2xl -z-10" />
          </div>
        </FadeIn>

        {/* Content */}
        <FadeIn direction="left" delay={0.2}>
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over <span className="text-foreground font-medium">3 years of experience</span> in 
                frontend development, I specialize in building high-performance web applications 
                using React, Next.js, and TypeScript.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;ve worked across various domains including fintech, e-commerce, and agriculture tech, 
                always focusing on delivering exceptional user experiences while maintaining clean, 
                scalable code architecture.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently at <span className="text-foreground font-medium">Fintech Solution company</span>, where I lead
                frontend development for fintech applications, focusing on secure and performant user interfaces.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">3+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">95+</p>
                <p className="text-sm text-muted-foreground">Lighthouse Score</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Highlights */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {highlights.map((item) => (
          <StaggerItem key={item.title}>
            <Card className="h-full">
              <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
}

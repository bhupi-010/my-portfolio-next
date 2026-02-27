'use client';

import { Code2, Server, Cloud, Wrench } from 'lucide-react';
import { Section, SectionHeader, Badge, Card } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { skillsByCategory } from '@/data/skills';

const categories = [
  {
    key: 'frontend' as const,
    title: 'Frontend',
    description: 'Technologies for building user interfaces',
    icon: Code2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    key: 'backend' as const,
    title: 'Backend',
    description: 'Server-side technologies and databases',
    icon: Server,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    key: 'devops' as const,
    title: 'DevOps',
    description: 'Deployment and infrastructure',
    icon: Cloud,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    key: 'tools' as const,
    title: 'Tools',
    description: 'Development and productivity tools',
    icon: Wrench,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
];

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        label="Expertise"
        title="Skills & Technologies"
        description="The tools and technologies I use to bring products to life."
      />

      <StaggerContainer className="grid sm:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <StaggerItem key={category.key}>
            <FadeIn delay={index * 0.1}>
              <Card className="h-full min-h-[250px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${category.bgColor}`}>
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skillsByCategory[category.key].map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="px-3 py-1">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Additional info */}
      <FadeIn delay={0.4}>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Always learning and exploring new technologies.{' '}
            <span className="text-foreground">Currently exploring:</span>{' '}
            <Badge variant="outline" className="ml-1">AI/ML Integration</Badge>{' '}
            <Badge variant="outline" className="ml-1">Web3</Badge>{' '}
            <Badge variant="outline" className="ml-1">Edge Computing</Badge>
          </p>
        </div>
      </FadeIn>
    </Section>
  );
}

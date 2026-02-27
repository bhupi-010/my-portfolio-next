'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, Badge, Button, Card } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { projects, featuredProjects } from '@/data/projects';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col">
      {/* Image */}
      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted mb-4">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h3 className="font-bold text-lg mb-2">
          {project.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors focus-ring"
              aria-label={`View ${project.title} source code`}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors focus-ring"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
          >
            View Details
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

export function Projects() {
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeader
        label="My Work"
        title="Featured Projects"
        description="A selection of projects that showcase my expertise in building modern web applications."
      />

      {/* Featured Projects */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
        {featuredProjects.map((project, index) => (
          <StaggerItem key={project.id} className="h-full">
            <FadeIn delay={index * 0.1} className="h-full">
              <div className="group h-full">
                <ProjectCard project={project} />
              </div>
            </FadeIn>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mb-6">More Projects</h3>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {otherProjects.map((project, index) => (
              <StaggerItem key={project.id} className="h-full">
                <FadeIn delay={index * 0.1} className="h-full">
                  <div className="group h-full">
                    <ProjectCard project={project} />
                  </div>
                </FadeIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </>
      )}

      {/* CTA */}
      <FadeIn delay={0.3}>
        <div className="text-center mt-12">
          <Button variant="outline" asChild>
            <a
              href={SITE_CONFIG.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              View All on GitHub
            </a>
          </Button>
        </div>
      </FadeIn>
    </Section>
  );
}

import { SITE_CONFIG } from '@/constants';

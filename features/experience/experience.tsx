'use client';

import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { Section, SectionHeader, Badge, Card } from '@/components/ui';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';
import { experiences } from '@/data/experience';

export function Experience() {
  return (
    <Section id="experience" className="bg-muted/30">
      <SectionHeader
        label="Career"
        title="Work Experience"
        description="My professional journey building products and growing as a developer."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

        <StaggerContainer className="space-y-12">
          {experiences.map((exp, index) => (
            <StaggerItem key={exp.id}>
              <FadeIn delay={index * 0.15}>
                <div
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary border-4 border-background md:-translate-x-1/2 z-10" />

                  {/* Date badge (mobile) */}
                  <div className="md:hidden pl-8 flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {exp.period}
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <Card>
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <h3 className="font-bold text-lg">{exp.role}</h3>
                          </div>
                          <p className="text-muted-foreground font-medium">{exp.company}</p>
                        </div>
                        {/* Date badge (desktop) */}
                        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4">{exp.description}</p>

                      {/* Achievements */}
                      <div className="space-y-2 mb-4">
                        {exp.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{achievement}</p>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              </FadeIn>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}

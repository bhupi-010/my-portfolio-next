import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { projects } from '@/data/projects';
import { Button, Badge, Card } from '@/components/ui';
import { SITE_CONFIG } from '@/constants';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${SITE_CONFIG.name}`,
      description: project.description,
      images: [{ url: project.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  return (
    <main className="pt-24 pb-16">
      <article className="container-custom">
        {/* Back Button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 bg-muted">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </section>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Links */}
            <Card>
              <h3 className="font-semibold mb-4">Project Links</h3>
              <div className="space-y-3">
                {project.live && (
                  <Button className="w-full" asChild>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </Card>

            {/* Tech Stack */}
            <Card>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Category */}
            <Card>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Category
              </h3>
              <Badge variant="outline" className="capitalize">
                {project.category}
              </Badge>
            </Card>
          </aside>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedProjects.map((related) => (
                <Link key={related.id} href={`/projects/${related.slug}`} className="group">
                  <Card>
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {related.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}

import Image from 'next/image';
import { client } from '@/lib/sanity';
import type { Project } from '@/types';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: { slug: string };
}

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "images": images[].asset->url,
    "categories": categories[]->{title, "slug": slug.current},
    description,
    tags
  }`;
  const project = await client.fetch<Project>(query, { slug });
  return project;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  return {
    title: `${project.name} | DesignFlow Portfolio`,
    description: `Details about the ${project.name} project.`,
  };
}

export async function generateStaticParams() {
  const query = `*[_type == "project"]{"slug": slug.current}`;
  const slugs = await client.fetch<{ slug: string }[]>(query);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex justify-center gap-2 mb-4">
            {project.categories.map((category) => (
              <Badge key={category._id} variant="secondary" className="text-sm">
                {category.title}
              </Badge>
            ))}
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            {project.name}
          </h1>
        </header>

        <div className="mb-12">
          <Image
            src={project.mainImage}
            alt={project.name}
            width={1200}
            height={800}
            className="rounded-lg shadow-lg w-full object-cover"
            priority
            data-ai-hint="project showcase"
          />
        </div>

        <div className="prose prose-lg max-w-none font-body">
          <PortableText value={project.description} components={PortableTextComponent} />
        </div>

        {project.images && project.images.length > 0 && (
          <section className="mt-16">
            <h2 className="font-headline text-3xl font-bold text-center mb-8">Image Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${project.name} gallery image ${index + 1}`}
                  width={800}
                  height={600}
                  className="rounded-lg shadow-md w-full object-cover"
                  data-ai-hint="portfolio gallery"
                />
              ))}
            </div>
          </section>
        )}
        
        {project.tags && project.tags.length > 0 && (
          <section className="mt-16 border-t pt-8">
             <h3 className="font-headline text-2xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
}

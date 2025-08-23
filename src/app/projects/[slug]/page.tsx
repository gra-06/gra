
import Image from 'next/image';
import type { Project, Category } from '@/types'; // We'll expand the Project type
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { Calendar, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ProjectCard } from '@/components/ProjectCard';

// Define more detailed types to match our new schemas
interface ProjectPageProps {
  params: { slug: string };
}

// NOTE: This getProject function is a placeholder. 
// It simulates fetching the detailed project data based on the slug.
// In a real application, this would fetch data from Sanity.io.
async function getProject(slug: string): Promise<Project | null> {
  if (slug === 'unique-design') {
    return {
      _id: '1',
      name: 'Unique Design',
      slug: 'unique-design',
      mainImage: 'https://placehold.co/1200x800.png',
      categories: [{ _id: 'cat-1', title: 'Branding', slug: 'branding' }],
      client: 'Creative Inc.',
      date: '2023-10-26',
      services: ['Branding', 'UI/UX', 'Web Design'],
      overview: [
        { _key: '1', _type: 'block', style: 'normal', children: [{ _key: '1a', _type: 'span', text: 'This is a brief but impactful overview of the project. We collaborated with Creative Inc. to redefine their brand identity and create a compelling online presence that resonates with their target audience.' }] }
      ],
      challenge: [
        { _key: '2', _type: 'block', style: 'normal', children: [{ _key: '2a', _type: 'span', text: 'The main challenge was to create a modern and scalable design system that could be applied across all of Creative Inc.\'s digital platforms while staying true to their core values.' }] }
      ],
      solution: [
        { _key: '3', _type: 'block', style: 'normal', children: [{ _key: '3a', _type: 'span', text: 'Our team conducted extensive research and developed a flexible visual language. We delivered a comprehensive style guide, a new component-based website, and a set of marketing templates.' }] }
      ],
      result: [
        { _key: '4', _type: 'block', style: 'normal', children: [{ _key: '4a', _type: 'span', text: 'The new branding led to a 40% increase in user engagement and a 25% increase in conversions. The client was thrilled with the result, which provided a solid foundation for their future growth.' }] }
      ],
      contentSections: [
        {
          _type: 'imageGallery',
          images: [
            { _key: 'gal1', asset: { url: 'https://placehold.co/800x600.png' }, alt: 'Gallery image 1', caption: 'User flow diagrams' },
            { _key: 'gal2', asset: { url: 'https://placehold.co/800x600.png' }, alt: 'Gallery image 2', caption: 'High-fidelity mockups' },
          ]
        },
        {
          _type: 'fullWidthImage',
          image: { asset: { url: 'https://placehold.co/1200x700.png' } },
          alt: 'Full-width moodboard'
        },
        {
          _type: 'twoColumnText',
          leftContent: [{ _key: 'l1', _type: 'block', style: 'h3', children: [{_key: 'l1a', _type: 'span', text: 'Left Column Title'}]}, { _key: 'l2', _type: 'block', style: 'normal', children: [{_key: 'l2a', _type: 'span', text: 'This column can contain detailed explanations, lists, or any other rich text content to provide context.'}]}],
          rightContent: [{ _key: 'r1', _type: 'block', style: 'h3', children: [{_key: 'r1a', _type: 'span', text: 'Right Column Title'}]}, { _key: 'r2', _type: 'block', style: 'normal', children: [{_key: 'r2a', _type: 'span', text: 'Paired with the left column, this creates a balanced and easy-to-read layout for presenting information.'}]}],
        }
      ],
      relatedProjects: [
        { _id: '2', name: 'Modern Website', slug: 'modern-website', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat-2', title: 'Web Design', slug: 'web-design' }], description: [] },
        { _id: '4', name: 'Corporate Identity', slug: 'corporate-identity', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat-1', title: 'Branding', slug: 'branding' }], description: [] },
      ],
      tags: ['Branding', 'UI/UX', 'Figma', 'Case Study'],
      description: [], // Keep for base type compatibility
    };
  }
  return null; // For any other slug, return null
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-16">
    <h2 className="font-headline text-3xl font-bold mb-6 border-l-4 border-primary pl-4">{title}</h2>
    <div className="prose prose-lg max-w-none font-body text-muted-foreground">
      {children}
    </div>
  </div>
);

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return {
    title: `${project.name} | DesignFlow Portfolio`,
    description: `Details about the ${project.name} project.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-background">
      {/* Hero Section */}
      <header className="relative h-[70vh] min-h-[400px] w-full flex items-end p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.mainImage}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint="project showcase"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories.map((category) => (
                <Badge key={category._id} variant="secondary" className="text-sm backdrop-blur-sm bg-white/20 border-0">
                  {category.title}
                </Badge>
              ))}
            </div>
            <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight">
              {project.name}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
        
          {/* Project Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-8 border-b">
            <div className="flex items-start gap-3">
              <User className="h-8 w-8 text-primary mt-1" />
              <div>
                <p className="font-bold text-sm text-muted-foreground">Client</p>
                <p className="font-semibold text-lg">{project.client}</p>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <Calendar className="h-8 w-8 text-primary mt-1" />
              <div>
                <p className="font-bold text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-lg">{project.date ? format(new Date(project.date), 'MMMM yyyy') : 'N/A'}</p>
              </div>
            </div>
             <div className="flex items-start gap-3 col-span-2">
              <Tag className="h-8 w-8 text-primary mt-1" />
              <div>
                <p className="font-bold text-sm text-muted-foreground">Services</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.services?.map(s => <p key={s} className="font-semibold text-lg">{s}</p>)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Overview */}
          {project.overview && <Section title="Overview"><PortableText value={project.overview} components={PortableTextComponent} /></Section>}
          {project.challenge && <Section title="The Challenge"><PortableText value={project.challenge} components={PortableTextComponent} /></Section>}
          {project.solution && <Section title="The Solution"><PortableText value={project.solution} components={PortableTextComponent} /></Section>}
          {project.result && <Section title="The Result"><PortableText value={project.result} components={PortableTextComponent} /></Section>}

          {/* Dynamic Content Sections */}
          <div className="space-y-16">
            {project.contentSections?.map((section, index) => {
              const key = `${section._type}-${index}`;
              if (section._type === 'imageGallery' && section.images) {
                return (
                  <div key={key}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.images.map((img) => (
                        <figure key={img._key}>
                          <Image src={img.asset.url} alt={img.alt || ''} width={800} height={600} className="rounded-lg shadow-lg w-full object-cover" data-ai-hint="portfolio gallery" />
                          {img.caption && <figcaption className="text-center text-sm text-muted-foreground mt-2">{img.caption}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  </div>
                );
              }
              if (section._type === 'fullWidthImage' && section.image) {
                return <Image key={key} src={section.image.asset.url} alt={section.alt || ''} width={1200} height={700} className="rounded-lg shadow-lg w-full object-cover" data-ai-hint="project detail" />;
              }
              if (section._type === 'twoColumnText') {
                return (
                  <div key={key} className="grid md:grid-cols-2 gap-12">
                     <div className="prose prose-lg max-w-none font-body text-muted-foreground"><PortableText value={section.leftContent} components={PortableTextComponent}/></div>
                     <div className="prose prose-lg max-w-none font-body text-muted-foreground"><PortableText value={section.rightContent} components={PortableTextComponent}/></div>
                  </div>
                )
              }
              // Add videoBlock renderer when needed
              return null;
            })}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <section className="mt-16 border-t pt-8">
              <h3 className="font-headline text-2xl font-bold mb-4">Project Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* Related Projects */}
          {project.relatedProjects && project.relatedProjects.length > 0 && (
            <section className="mt-20 border-t pt-12">
              <h2 className="font-headline text-4xl font-bold text-center mb-12">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.relatedProjects.map((p) => (
                  <ProjectCard key={p._id} project={p as Project} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

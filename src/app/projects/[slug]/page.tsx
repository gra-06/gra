
'use client';

import Image from 'next/image';
import type { CaseStudyEntry, Project } from '@/types';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { Calendar, User, Tag, CheckIcon as Check } from 'lucide-react';
import { format } from 'date-fns';
import { ProjectCard } from '@/components/ProjectCard';
import imageUrlBuilder from '@sanity/image-url';
import React, { useState, useEffect } from 'react';
import { ImageLightbox } from '@/components/ImageLightbox';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface ProjectPageProps {
  params: { slug: string };
}

// We are fetching data on the client side in this component.
// In a real-world scenario with App Router, you'd likely fetch data in a server component
// and pass it down, or use the `generateStaticParams` with `getProject` for SSG.
// For this interactive prototype, client-side fetching simplifies state management for the lightbox.
export default function ProjectPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getProject(slug: string): Promise<Project | null> {
      const query = `*[_type == "project" && slug.current == $slug][0]{
        _id,
        name,
        "slug": slug.current,
        "mainImage": mainImage.asset->url,
        "mainImageObject": mainImage,
        categories[]->{
          _id,
          title,
          "slug": slug.current
        },
        client,
        date,
        services,
        overview,
        challenge,
        solution,
        result,
        caseStudy[]{
          _key,
          stage,
          description,
          'image': image.asset->{
            url,
            'metadata': metadata
          }
        },
        contentSections[]{
          ...,
          _type == 'imageGallery' => {
            'images': images[]{
              ...,
              'asset': asset->{
                url,
                'metadata': metadata
              }
            }
          },
          _type == 'fullWidthImage' => {
            'image': image.asset->{
              url,
              'metadata': metadata
            }
          }
        },
        "relatedProjects": *[_type == "project" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(date desc) [0...2] {
          _id,
          name,
          "slug": slug.current,
          "mainImage": mainImage.asset->url,
          categories[]->{
            _id,
            title,
            "slug": slug.current
          }
        },
        tags
      }`;
      const fetchedProject = await client.fetch(query, { slug });
      return fetchedProject;
    }

    getProject(params.slug).then(setProject);
  }, [params]);


  if (!project) {
    // You might want a more sophisticated loading state here
    return <div>Loading...</div>;
  }
  
  if (project?._id === null) {
      notFound();
  }


  return (
    <>
    <ImageLightbox 
        imageUrl={lightboxImageUrl} 
        onClose={() => setLightboxImageUrl(null)} 
        imageAlt={project.name || 'Project image'}
    />
    <article className="bg-background">
      {/* Hero Section */}
      <header className="relative h-[70vh] min-h-[400px] w-full flex items-end p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.mainImage}
            alt={project.name || 'Project image'}
            fill
            style={{objectFit: 'cover'}}
            priority
            data-ai-hint="project showcase"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories?.map((category) => (
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
          
          {/* Case Study Timeline */}
          {project.caseStudy && project.caseStudy.length > 0 && (
            <Section title="Case Study">
                <div className="relative">
                    {project.caseStudy.map((item, index) => (
                        <TimelineItem key={item._key} item={item} isLast={index === project.caseStudy.length - 1} onImageClick={setLightboxImageUrl}/>
                    ))}
                </div>
            </Section>
          )}

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
                        <figure key={img._key} onClick={() => setLightboxImageUrl(urlFor(img).url())} className="cursor-pointer">
                          <Image src={urlFor(img).width(800).height(600).url()} alt={img.alt || ''} width={800} height={600} className="rounded-lg shadow-lg w-full object-cover" data-ai-hint="portfolio gallery" />
                          {img.caption && <figcaption className="text-center text-sm text-muted-foreground mt-2">{img.caption}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  </div>
                );
              }
              if (section._type === 'fullWidthImage' && section.image?.asset) {
                return <Image key={key} src={urlFor(section.image).url()} alt={section.alt || ''} width={1200} height={700} className="rounded-lg shadow-lg w-full object-cover cursor-pointer" data-ai-hint="project detail" onClick={() => setLightboxImageUrl(urlFor(section.image).url())} />;
              }
              if (section._type === 'twoColumnText' && section.leftContent && section.rightContent) {
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
    </>
  );
}


const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-16">
      <h2 className="font-headline text-3xl font-bold mb-6 border-l-4 border-primary pl-4">{title}</h2>
      <div className="prose prose-lg max-w-none font-body text-muted-foreground">
        {children}
      </div>
    </div>
  );
  
const TimelineItem: React.FC<{ item: CaseStudyEntry, isLast: boolean, onImageClick: (url: string) => void }> = ({ item, isLast, onImageClick }) => (
      <div className="flex">
          <div className="flex flex-col items-center mr-6">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full text-primary-foreground font-bold">
                  <Check className="w-6 h-6" />
              </div>
              {!isLast && <div className="w-px h-full bg-border" />}
          </div>
          <div className="pb-16 w-full">
              <h3 className="font-headline text-2xl font-bold mb-2">{item.stage}</h3>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="prose prose-lg max-w-none font-body text-muted-foreground">
                   {item.description && <PortableText value={item.description} components={PortableTextComponent} />}
                </div>
                {item.image?.asset && (
                    <Image
                        src={urlFor(item.image).width(800).height(600).url()}
                        alt={item.stage || 'Case study image'}
                        width={800}
                        height={600}
                        className="rounded-lg shadow-lg w-full object-cover cursor-pointer"
                        data-ai-hint="case study step"
                        onClick={() => onImageClick(urlFor(item.image).url())}
                    />
                )}
              </div>
          </div>
      </div>
  );
  

    
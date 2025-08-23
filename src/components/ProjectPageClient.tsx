
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '@/types';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { Badge } from '@/components/ui/badge';
import { client } from '@/lib/sanity';
import { Calendar, User, Tag, CheckIcon as Check } from 'lucide-react';
import { format } from 'date-fns';
import { ProjectCard } from '@/components/ProjectCard';
import imageUrlBuilder from '@sanity/image-url';
import { ImageLightbox } from '@/components/ImageLightbox';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface ProjectPageClientProps {
  project: Project;
}

const Section: React.FC<{ title: string; children: React.ReactNode, delay?: number }> = ({ title, children, delay=0.2 }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="mb-16">
      <h2 className="font-headline text-3xl font-bold mb-6 border-l-4 border-primary pl-4">{title}</h2>
      <div className="prose prose-lg max-w-none font-body text-muted-foreground">
        {children}
      </div>
    </motion.div>
  );

export function ProjectPageClient({ project }: ProjectPageClientProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.article 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-background">

      {/* Hero Section */}
      <header className="relative h-[70vh] min-h-[400px] w-full flex items-end p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.mainImage}
            alt={project.name}
            fill
            style={{objectFit: 'cover'}}
            priority
            data-ai-hint="project showcase"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        <motion.div variants={itemVariants} className="relative z-10 container mx-auto">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories?.map((category) => (
                <Badge key={category._id} variant="secondary" className="text-sm">
                  {category.title}
                </Badge>
              ))}
            </div>
            <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight">
              {project.name}
            </h1>
          </div>
        </motion.div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
        
          {/* Project Meta Info */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-8 border-b">
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
          </motion.div>
          
          {/* Overview */}
          {project.overview && <Section title="Overview"><PortableText value={project.overview} components={PortableTextComponent} /></Section>}
          
          {/* Case Study Timeline */}
          {project.caseStudy && project.caseStudy.length > 0 && (
            <Section title="Case Study" delay={0.3}>
                <div className="relative">
                    {project.caseStudy.map((item, index) => (
                        <div key={item._key} className="flex">
                            <div className="flex flex-col items-center mr-6">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full text-primary-foreground font-bold">
                                    <Check className="w-6 h-6" />
                                </div>
                                {index < project.caseStudy.length - 1 && <div className="w-px h-full bg-border" />}
                            </div>
                            <div className="pb-16 w-full">
                                <h3 className="font-headline text-2xl font-bold mb-2">{item.stage}</h3>
                                <div className="grid md:grid-cols-2 gap-8 items-start">
                                  <div className="prose prose-lg max-w-none font-body text-muted-foreground">
                                     <PortableText value={item.description} components={PortableTextComponent} />
                                  </div>
                                  {item.image && (
                                      <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring' }}>
                                        <Image
                                            src={urlFor(item.image).width(800).height(600).url()}
                                            alt={item.stage}
                                            width={800}
                                            height={600}
                                            className="rounded-lg shadow-lg w-full object-cover cursor-pointer"
                                            data-ai-hint="case study step"
                                            onClick={() => setLightboxImage(urlFor(item.image).url())}
                                        />
                                      </motion.div>
                                  )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
          )}

          {project.challenge && <Section title="The Challenge" delay={0.2}><PortableText value={project.challenge} components={PortableTextComponent} /></Section>}
          {project.solution && <Section title="The Solution" delay={0.3}><PortableText value={project.solution} components={PortableTextComponent} /></Section>}
          {project.result && <Section title="The Result" delay={0.4}><PortableText value={project.result} components={PortableTextComponent} /></Section>}

          {/* Dynamic Content Sections */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-16">
            {project.contentSections?.map((section, index) => {
              const key = `${section._type}-${index}`;
              if (section._type === 'imageGallery' && section.images) {
                return (
                  <div key={key}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.images.map((img) => (
                        <figure key={img._key}>
                          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring' }}>
                            <Image src={urlFor(img).width(800).height(600).url()} alt={img.alt || ''} width={800} height={600} className="rounded-lg shadow-lg w-full object-cover cursor-pointer" data-ai-hint="portfolio gallery" onClick={() => setLightboxImage(urlFor(img).url())}/>
                          </motion.div>
                          {img.caption && <figcaption className="text-center text-sm text-muted-foreground mt-2">{img.caption}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  </div>
                );
              }
              if (section._type === 'fullWidthImage' && section.image) {
                return <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring' }}><Image key={key} src={urlFor(section.image).url()} alt={section.alt || ''} width={1200} height={700} className="rounded-lg shadow-lg w-full object-cover cursor-pointer" data-ai-hint="project detail" onClick={() => setLightboxImage(urlFor(section.image).url())} /></motion.div>;
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
          </motion.div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <Section title="Project Tags" delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </Section>
          )}

          {/* Related Projects */}
          {project.relatedProjects && project.relatedProjects.length > 0 && (
            <Section title="Related Projects" delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.relatedProjects.map((p) => (
                  <ProjectCard key={p._id} project={p as Project} />
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
      <ImageLightbox
        imageUrl={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </motion.article>
  );
}

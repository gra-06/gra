
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Partial<Project>;
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (!project.slug) {
    return null;
  }
  
  const imageUrl = typeof project.mainImage === 'object' && project.mainImage?.url
    ? project.mainImage.url
    : 'https://placehold.co/600x450.png';

  return (
      <Link href={`/projects/${project.slug}`} className="group block">
        <motion.div 
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card h-full flex flex-col">
          
          <div className="relative aspect-w-4 aspect-h-3 w-full overflow-hidden">
            <Image
              src={imageUrl}
              alt={project.name || 'Proje görseli'}
              width={600}
              height={450}
              className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint="project design"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {project.categories?.map((category) => (
                <Badge key={category.id} variant="secondary" className="backdrop-blur-sm">
                  {category.title}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-headline text-2xl font-bold text-card-foreground leading-tight mt-auto">
              {project.name}
            </h3>
          </div>
        </motion.div>
      </Link>
  );
}

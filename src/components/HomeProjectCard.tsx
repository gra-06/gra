
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types';
import { Badge } from './ui/badge';

interface HomeProjectCardProps {
  project: Partial<Project>;
}

export function HomeProjectCard({ project }: HomeProjectCardProps) {
  if (!project.slug) {
    return null;
  }

  // Directly check for the nested asset URL from Sanity.
  const imageUrl = (project.mainImage as any)?.asset?.url;

  return (
    <Link href={`/projects/${project.slug}`} className="group block overflow-hidden rounded-lg">
      <motion.div
        className="relative aspect-w-4 aspect-h-3 w-full"
        whileHover="hover"
        initial="initial"
      >
        <Image
          src={imageUrl || 'https://placehold.co/600x450.png'}
          alt={project.name || 'Project image'}
          width={600}
          height={450}
          className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint="project design"
        />
        <motion.div
          className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center"
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.3 }}
        >
           <motion.div
             variants={{
                initial: { y: 20, opacity: 0 },
                hover: { y: 0, opacity: 1 }
             }}
             transition={{ delay: 0.1, duration: 0.3 }}
           >
             <Button variant="outline" size="lg">View Case Study</Button>
           </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/70 to-transparent"
          variants={{
            initial: { opacity: 1 },
            hover: { opacity: 0 }
          }}
          transition={{ duration: 0.3 }}
        >
            <div className="flex flex-wrap gap-2 mb-2">
              {project.categories?.map((category) => (
                <Badge key={category._id} variant="secondary" className="backdrop-blur-sm">
                  {category.title}
                </Badge>
              ))}
            </div>
             <h3 className="font-headline text-3xl font-bold text-white">
              {project.name}
            </h3>
        </motion.div>
      </motion.div>
    </Link>
  );
}

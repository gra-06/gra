/**
 * ProjectCard.tsx: Portfolyo ızgarasındaki her bir proje için kart bileşeni.
 * 
 * Bu bileşen, bir projenin kapak görselini, başlığını ve kategorilerini gösterir.
 * Kartın üzerine gelindiğinde (hover) animasyon efekti uygular.
 * Karta tıklandığında ilgili projenin detay sayfasına yönlendirir.
 */
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Projenin bir slug'ı yoksa kartı render etme
  if (!project.slug) {
    return null;
  }
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card">
          <div className="relative aspect-w-4 aspect-h-3 w-full overflow-hidden">
            <Image
              src={project.mainImage || 'https://placehold.co/600x400.png'}
              alt={project.name || 'Proje görseli'}
              width={600}
              height={450}
              className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              data-ai-hint="project design"
            />
             {/* Hover efekti için overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories?.map((category) => (
                <Badge key={category._id} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
            <h3 className="font-headline text-2xl font-bold text-card-foreground leading-tight">
              {project.name}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

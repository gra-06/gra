import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/projects/${project.slug}`}>
        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
          <CardContent className="p-0">
            <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden">
              <Image
                src={project.mainImage || 'https://placehold.co/600x400.png'}
                alt={project.name}
                width={600}
                height={400}
                className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="project design"
              />
            </div>
          </CardContent>
          <CardFooter className="p-4 flex-col items-start flex-grow">
            <h3 className="font-headline text-xl font-semibold mb-2">{project.name}</h3>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <Badge key={category.slug} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

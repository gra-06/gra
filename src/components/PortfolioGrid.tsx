'use client';

import { useState, useMemo } from 'react';
import type { Project, Category } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

interface PortfolioGridProps {
  projects: Project[];
  categories: Category[];
}

export function PortfolioGrid({ projects, categories }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') {
      return projects;
    }
    return projects.filter((project) =>
      project.categories.some((cat) => cat.slug === activeCategory)
    );
  }, [activeCategory, projects]);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'secondary'}
          onClick={() => setActiveCategory('all')}
          className={`rounded-full px-6 transition-all duration-300 ${activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={activeCategory === category.slug ? 'default' : 'secondary'}
            onClick={() => setActiveCategory(category.slug)}
            className={`rounded-full px-6 transition-all duration-300 ${activeCategory === category.slug ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
          >
            {category.title}
          </Button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

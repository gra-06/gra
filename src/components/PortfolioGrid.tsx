
'use client';

import { useState, useMemo } from 'react';
import type { Project, Category } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';

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
          className="rounded-full px-6"
        >
          Tümü
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.slug ? 'default' : 'secondary'}
            onClick={() => setActiveCategory(category.slug)}
            className="rounded-full px-6"
          >
            {category.title}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
      </div>
    </div>
  );
}

import type { Project, Category } from '@/types';
import { PortfolioGrid } from '@/components/PortfolioGrid';

async function getProjects(): Promise<Project[]> {
  // TODO: Replace with actual Sanity fetch
  return [
    {
      _id: '1',
      name: 'Unique Design',
      slug: 'unique-design',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-1', title: 'Branding', slug: 'branding' }],
    },
    {
      _id: '2',
      name: 'Modern Website',
      slug: 'modern-website',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-2', title: 'Web Design', slug: 'web-design' }],
    },
    {
      _id: '3',
      name: 'Creative Illustration',
      slug: 'creative-illustration',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-3', title: 'Illustration', slug: 'illustration' }],
    },
     {
      _id: '4',
      name: 'Corporate Identity',
      slug: 'corporate-identity',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-1', title: 'Branding', slug: 'branding' }],
    },
    {
      _id: '5',
      name: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-2', title: 'Web Design', slug: 'web-design' }],
    },
    {
      _id: '6',
      name: 'Abstract Art',
      slug: 'abstract-art',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-3', title: 'Illustration', slug: 'illustration' }],
    },
  ];
}

async function getCategories(): Promise<Category[]> {
  // TODO: Replace with actual Sanity fetch
  return [
    { _id: 'cat-1', title: 'Branding', slug: 'branding' },
    { _id: 'cat-2', title: 'Web Design', slug: 'web-design' },
    { _id: 'cat-3', title: 'Illustration', slug: 'illustration' },
  ];
}

export default async function Home() {
  const projects = await getProjects();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Creative Work
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          A curated selection of our projects. We specialize in creating beautiful, functional, and user-centered designs.
        </p>
      </header>
      
      <PortfolioGrid projects={projects} categories={categories} />
    </div>
  );
}

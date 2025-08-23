import type { Project, Category } from '@/types';
import { PortfolioGrid } from '@/components/PortfolioGrid';

async function getProjects(): Promise<Project[]> {
  // const query = `*[_type == "project"] | order(_createdAt desc){
  //   _id,
  //   name,
  //   "slug": slug.current,
  //   "mainImage": mainImage.asset->url,
  //   "categories": categories[]->{title, "slug": slug.current}
  // }`;
  // const projects = await client.fetch<Project[]>(query);
  // return projects;
  return [];
}

async function getCategories(): Promise<Category[]> {
  // const query = `*[_type == "category"] | order(title asc){
  //   _id,
  //   title,
  //   "slug": slug.current
  // }`;
  // const categories = await client.fetch<Category[]>(query);
  // return categories;
  return [];
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

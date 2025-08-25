
import type { Project, Category } from '@/types';
import { PortfolioGrid } from '@/components/PortfolioGrid';
// import { client } from '@/lib/sanity';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Portfolyo | Mustafa Saraçoğlu',
    description: 'Projelerimden özenle seçilmiş bir koleksiyon. Sonuç odaklı, güzel, işlevsel ve kullanıcı merkezli tasarımlar yaratma konusunda uzmanım.',
};

async function getAllProjects(): Promise<Project[]> {
  // const query = `*[_type == "project"] | order(date desc){
  //   _id,
  //   name,
  //   "slug": slug.current,
  //   "mainImage": mainImage.asset->url,
  //   categories[]->{
  //     _id,
  //     title,
  //     "slug": slug.current
  //   }
  // }`;
  // const projects = await client.fetch(query);
  // return projects;
  return [];
}

async function getAllCategories(): Promise<Category[]> {
  // const query = `*[_type == "category"]{
  //   _id,
  //   title,
  //   "slug": slug.current
  // }`;
  // const categories = await client.fetch(query);
  // return categories;
  return [];
}

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Portfolyom
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Projelerimden özenle seçilmiş bir koleksiyon. Sonuç odaklı, güzel, işlevsel ve kullanıcı merkezli tasarımlar yaratma konusunda uzmanım.
        </p>
      </header>
      
      <PortfolioGrid projects={projects} categories={categories} />
    </div>
  );
}

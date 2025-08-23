
import type { Project, Category } from '@/types';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { client } from '@/lib/sanity';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Portfolio | DesignFlow',
    description: 'A curated selection of our projects. We specialize in creating beautiful, functional, and user-centered designs that drive results.',
};

const mockProjects: Project[] = [
  { _id: '1', name: 'Marka Kimliği Yenileme', slug: 'marka-kimligi-yenileme', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat1', title: 'Marka Kimliği', slug: 'branding' }] , description:[]},
  { _id: '2', name: 'E-Ticaret Sitesi Tasarımı', slug: 'e-ticaret-sitesi-tasarimi', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat2', title: 'Web Tasarımı', slug: 'web-design' }], description:[] },
  { _id: '3', name: 'Mobil Uygulama Arayüzü', slug: 'mobil-uygulama-arayuzu', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat3', title: 'UI/UX', slug: 'ui-ux' }], description:[] },
  { _id: '4', name: 'Kurumsal Web Sitesi', slug: 'kurumsal-web-sitesi', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat2', title: 'Web Tasarımı', slug: 'web-design' }], description:[] },
  { _id: '5', name: 'Sosyal Medya Tasarımları', slug: 'sosyal-medya-tasarimlari', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat1', title: 'Marka Kimliği', slug: 'branding' }], description:[] },
];

const mockCategories: Category[] = [
    { _id: 'cat1', title: 'Marka Kimliği', slug: 'branding' },
    { _id: 'cat2', title: 'Web Tasarımı', slug: 'web-design' },
    { _id: 'cat3', title: 'UI/UX', slug: 'ui-ux' },
];


// GROQ query to get all projects
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
  return mockProjects;
}

// GROQ query to get all categories
async function getAllCategories(): Promise<Category[]> {
  // const query = `*[_type == "category"]{
  //   _id,
  //   title,
  //   "slug": slug.current
  // }`;
  // const categories = await client.fetch(query);
  // return categories;
  return mockCategories;
}

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const categories = await getAllCategories();

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Our Portfolio
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          A curated selection of our projects. We specialize in creating beautiful, functional, and user-centered designs that drive results.
        </p>
      </header>
      
      <PortfolioGrid projects={projects} categories={categories} />
    </div>
  );
}

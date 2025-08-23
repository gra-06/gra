
import type { Project, Category } from '@/types';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

async function getFeaturedProjects(): Promise<Project[]> {
  // TODO: Replace with actual Sanity fetch for featured projects
  return [
    {
      _id: '1',
      name: 'Unique Design',
      slug: 'unique-design',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-1', title: 'Branding', slug: 'branding' }],
      description: [],
    },
    {
      _id: '2',
      name: 'Modern Website',
      slug: 'modern-website',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-2', title: 'Web Design', slug: 'web-design' }],
      description: [],
    },
    {
      _id: '3',
      name: 'Creative Illustration',
      slug: 'creative-illustration',
      mainImage: 'https://placehold.co/600x400.png',
      categories: [{ _id: 'cat-3', title: 'Illustration', slug: 'illustration' }],
      description: [],
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
  const featuredProjects = await getFeaturedProjects();
  const categories = await getCategories();

  const services = [
    "Brand Identity & Logo Design",
    "Web & Mobile App Design",
    "UI/UX Research and Strategy",
    "Illustration & Iconography",
    "Marketing & Social Media Assets",
    "Packaging & Print Design"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="Hero background"
            layout="fill"
            objectFit="cover"
            className="opacity-40"
            data-ai-hint="abstract background"
            priority
          />
          {/* Or for video background:
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source src="/path/to/video.mp4" type="video/mp4" />
          </video>
          */}
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tight mb-4 animate-fade-in-up">
            Creative Digital Studio
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 animate-fade-in-up animation-delay-300">
            We transform ideas into extraordinary digital experiences.
          </p>
          <Link href="/portfolio">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
              View Our Work
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="https://placehold.co/800x600.png"
              alt="About Us"
              width={800}
              height={600}
              className="rounded-lg shadow-xl"
              data-ai-hint="creative team"
            />
          </div>
          <div>
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">About DesignFlow</h2>
            <div className="prose prose-lg max-w-none font-body text-muted-foreground">
              <p>We are a passionate team of designers and developers dedicated to crafting beautiful, functional, and user-centered digital experiences. With a focus on collaboration and innovation, we partner with clients to bring their visions to life.</p>
              <p>Our process is built on a foundation of research, strategy, and meticulous execution, ensuring every project not only looks stunning but also achieves its goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to launch, we provide a complete suite of design services.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center gap-4">
                <Check className="h-6 w-6 text-primary shrink-0"/>
                <p className="text-lg text-secondary-foreground">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A curated selection of projects we are proud of.
            </p>
          </div>
          <PortfolioGrid projects={featuredProjects} categories={categories} />
          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button size="lg" variant="outline">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


import type { Project, Category } from '@/types';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { client } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

// GROQ query to get homepage data
async function getHomepageData() {
  const query = `*[_type == "homepage"][0]{
    heroSection {
      title,
      subtitle,
      "backgroundImage": backgroundImage.asset->url,
      backgroundVideo
    },
    aboutSection {
      title,
      content
    },
    servicesSection {
      title,
      "servicesList": servicesList[]->{
        title,
        _id
      }
    },
    "featuredProjects": featuredProjects[]->{
      _id,
      name,
      "slug": slug.current,
      "mainImage": mainImage.asset->url,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    },
    testimonialsSection
  }`;
  // const data = await client.fetch(query);
  // return data;
  return {
    heroSection: {
      title: 'Creative Digital Studio',
      subtitle: 'We transform ideas into extraordinary digital experiences.',
      backgroundImage: 'https://placehold.co/1920x1080.png',
    },
    aboutSection: {
      title: 'About DesignFlow',
      content: [
        {
          _type: 'block',
          style: 'normal',
          _key: '123',
          children: [
            {
              _type: 'span',
              _key: '123-1',
              text: 'We are a passionate team of designers and developers dedicated to crafting beautiful, functional, and user-centered digital experiences. With a focus on collaboration and innovation, we partner with clients to bring their visions to life.',
            },
          ],
        },
        {
          _type: 'block',
          style: 'normal',
          _key: '456',
          children: [
            {
              _type: 'span',
              _key: '456-1',
              text: 'Our process is built on a foundation of research, strategy, and meticulous execution, ensuring every project not only looks stunning but also achieves its goals.',
            },
          ],
        },
      ],
    },
    servicesSection: {
      title: 'Our Services',
      servicesList: [
        { _id: '1', title: 'Brand Identity & Logo Design' },
        { _id: '2', title: 'Web & Mobile App Design' },
        { _id: '3', title: 'UI/UX Research and Strategy' },
        { _id: '4', title: 'Illustration & Iconography' },
        { _id: '5', title: 'Marketing & Social Media Assets' },
        { _id: '6', title: 'Packaging & Print Design' },
      ],
    },
    featuredProjects: [
      {
        _id: 'proj1',
        name: 'Project One',
        slug: 'project-one',
        mainImage: 'https://placehold.co/600x400.png',
        categories: [{ _id: 'cat1', title: 'Web Design', slug: 'web-design' }],
      },
      {
        _id: 'proj2',
        name: 'Project Two',
        slug: 'project-two',
        mainImage: 'https://placehold.co/600x400.png',
        categories: [{ _id: 'cat2', title: 'Branding', slug: 'branding' }],
      },
      {
        _id: 'proj3',
        name: 'Project Three',
        slug: 'project-three',
        mainImage: 'https://placehold.co/600x400.png',
        categories: [{ _id: 'cat1', title: 'Web Design', slug: 'web-design' }],
      },
    ]
  }
}

async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]{
    _id,
    title,
    "slug": slug.current
  }`;
  // const categories = await client.fetch(query);
  // return categories;
  return [
    { _id: 'cat1', title: 'Web Design', slug: 'web-design' },
    { _id: 'cat2', title: 'Branding', slug: 'branding' },
  ];
}


export default async function Home() {
  const homepage = await getHomepageData();
  const categories = await getCategories();
  
  const services = homepage?.servicesSection?.servicesList?.map((s: any) => s.title) || [
    "Brand Identity & Logo Design",
    "Web & Mobile App Design",
    "UI/UX Research and Strategy",
    "Illustration & Iconography",
    "Marketing & Social Media Assets",
    "Packaging & Print Design"
  ];

  const featuredProjects = homepage?.featuredProjects || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
              src={homepage?.heroSection?.backgroundImage || "https://placehold.co/1920x1080.png"}
              alt="Hero background"
              fill
              style={{objectFit: 'cover'}}
              className="opacity-40"
              data-ai-hint="abstract background"
              priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tight mb-4 animate-fade-in-up">
            {homepage?.heroSection?.title || "Creative Digital Studio"}
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-8 animate-fade-in-up [animation-delay:300ms]">
            {homepage?.heroSection?.subtitle || "We transform ideas into extraordinary digital experiences."}
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
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">{homepage?.aboutSection?.title || "About DesignFlow"}</h2>
            <div className="prose prose-lg max-w-none font-body text-muted-foreground">
              {homepage?.aboutSection?.content ? (
                <PortableText value={homepage.aboutSection.content} components={PortableTextComponent} />
              ) : (
                <>
                  <p>We are a passionate team of designers and developers dedicated to crafting beautiful, functional, and user-centered digital experiences. With a focus on collaboration and innovation, we partner with clients to bring their visions to life.</p>
                  <p>Our process is built on a foundation of research, strategy, and meticulous execution, ensuring every project not only looks stunning but also achieves its goals.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{homepage?.servicesSection?.title || "Our Services"}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to launch, we provide a complete suite of design services.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {services.map((service: string, index: number) => (
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

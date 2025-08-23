
import type { Project, Category } from '@/types';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Quote } from 'lucide-react';
import { client } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface Testimonial {
  quote: string;
  author: string;
  authorRole?: string;
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
  const data = await client.fetch(query);
  return data;
}

async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"]{
    _id,
    title,
    "slug": slug.current
  }`;
  const categories = await client.fetch(query);
  return categories;
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
  const testimonials: Testimonial[] = homepage?.testimonialsSection || [];

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
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tight mb-4">
            {homepage?.heroSection?.title || "Creative Digital Studio"}
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
            {homepage?.heroSection?.subtitle || "We transform ideas into extraordinary digital experiences."}
          </p>
          <Link href="/portfolio">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6">
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

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                We are proud to have partnered with amazing brands.
              </p>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2">
                    <div className="p-1 h-full">
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col justify-center items-center p-6 text-center">
                          <Quote className="w-12 h-12 text-primary/20 mb-4" />
                          <p className="font-body text-xl italic text-foreground mb-6">
                            "{testimonial.quote}"
                          </p>
                          <div className="font-headline text-lg font-bold text-foreground">{testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.authorRole}</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      )}
    </>
  );
}



import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Download, PenTool, Palette, Waypoints, Camera, Star } from 'lucide-react';
import { HomeProjectCard } from '@/components/HomeProjectCard';
import { SkillsChart } from '@/components/SkillsChart';
import type { Project, Post } from '@/types';
import { client } from '@/lib/sanity';
import { PostCard } from '@/components/PostCard';
import { CtaBanner } from '@/components/CtaBanner';
import { Faq } from '@/components/Faq';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Brands } from '@/components/Brands';


const Behance = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 9.5H8M6.25 7v5M15 11h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2zM19 11h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2zM15 7h4"/></svg>
);

const Dribbble = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const socialLinks = [
  { platform: 'behance', url: '#' },
  { platform: 'dribbble', url: '#' },
  { platform: 'linkedin', url: '#' },
];

const socialIcons: { [key: string]: React.ElementType } = {
  behance: Behance,
  dribbble: Dribbble,
  linkedin: Linkedin,
};

const services = [
    {
        _id: '1',
        title: 'Digital Branding',
        description: 'Blend of strategic thinking and creative flair to craft digital identity.',
        Icon: PenTool
    },
    {
        _id: '2',
        title: 'Visual Design',
        description: 'Unique product branding and marketing strategies.',
        Icon: Palette
    },
    {
        _id: '3',
        title: 'UX Research',
        description: 'User-centered analysis for optimizing usability.',
        Icon: Waypoints
    },
    {
        _id: '4',
        title: 'Art Direction',
        description: 'Creative direction with consistent brand language.',
        Icon: Camera
    }
];

const projects: Partial<Project>[] = [
    { _id: '1', name: 'B & O', slug: 'b-o', mainImage: 'https://placehold.co/600x450.png', categories: [{ _id: '1', title: 'Marketing', slug: 'marketing' }] },
    { _id: '2', name: 'Cozmetic', slug: 'cozmetic', mainImage: 'https://placehold.co/600x450.png', categories: [{ _id: '2', title: 'Design', slug: 'design' }] },
    { _id: '3', name: 'Xendou', slug: 'xendou', mainImage: 'https://placehold.co/600x450.png', categories: [{ _id: '3', title: 'Branding', slug: 'branding' }] },
    { _id: '4', name: 'Blvck', slug: 'blvck', mainImage: 'https://placehold.co/600x450.png', categories: [{ _id: '4', title: 'Product', slug: 'product' }] }
];

const experiences = [
    {
      company: 'Freelance',
      role: 'Product Designer',
      period: '2020 - Present'
    },
    {
      company: 'AKQA',
      role: 'Senior Product Designer',
      period: '2018 - 2020'
    },
    {
      company: 'Google',
      role: 'Creative Head',
      period: '2016 - 2018'
    }
];

const educations = [
    {
        institution: 'University of Arts',
        degree: 'Master of Arts',
        period: '2014 - 2016'
    },
    {
        institution: 'University of Design',
        degree: 'Bachelor of Arts',
        period: '2010 - 2014'
    }
]

const testimonials = [
  {
    _id: '1',
    name: 'John Doe',
    role: 'CEO, Company',
    quote: "Olyve's design work is exceptional. She has a great eye for detail and a deep understanding of user experience. We're thrilled with the results.",
    avatar: 'https://placehold.co/100x100.png',
    rating: 5,
  },
  {
    _id: '2',
    name: 'Jane Smith',
    role: 'Marketing Manager, Another Co',
    quote: "Working with Olyve was a fantastic experience. She is a true professional and a pleasure to collaborate with. Highly recommended!",
    avatar: 'https://placehold.co/100x100.png',
    rating: 5,
  }
]


async function getRecentPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    publishedAt,
    excerpt,
    author->{
        name
    },
    categories[]->{
        _id,
        title
    }
  }`;
  const posts = await client.fetch(query);
  return posts;
}

interface Award {
    _id: string;
    title: string;
    organization: string;
    year: string;
    logoUrl: string;
}

async function getAwards(): Promise<Award[]> {
    const query = `*[_type == "award"] | order(year desc) {
        _id,
        title,
        organization,
        year,
        "logoUrl": logo.asset->url
    }`;
    const awards = await client.fetch(query);
    return awards;
}

interface FaqItem {
    _id: string;
    question: string;
    answer: any;
}

async function getFaqs(): Promise<FaqItem[]> {
    const query = `*[_type == "faq"] | order(_createdAt asc) {
        _id,
        question,
        answer
    }`;
    const faqs = await client.fetch(query);
    return faqs;
}

interface Tool {
    _id: string;
    name: string;
    description: string;
    logoUrl: string;
}

async function getTools(): Promise<Tool[]> {
    const query = `*[_type == "tool"] | order(name asc) {
        _id,
        name,
        description,
        "logoUrl": logo.asset->url
    }`;
    const tools = await client.fetch(query);
    return tools;
}


export default async function Home() {
    const recentPosts = await getRecentPosts();
    const awards = await getAwards();
    const faqs = await getFaqs();
    const tools = await getTools();

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] w-full flex flex-col justify-center bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left">
              <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
                Bring your vision to ultimate reality
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
                Specialize in creating unique visual identities for digital products...
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/portfolio">
                  <Button size="lg" className="text-lg px-8 py-6">View Portfolio</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">Hire Me</Button>
                </Link>
              </div>
            </div>
             <div className="flex justify-center items-center">
                  <Image
                        src="https://placehold.co/500x500.png"
                        alt="Olyve Schwarz"
                        width={500}
                        height={500}
                        className="rounded-full object-cover aspect-square"
                        data-ai-hint="portrait woman"
                        priority
                    />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8">
            <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                    const Icon = socialIcons[social.platform.toLowerCase()];
                    return Icon ? (
                        <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Icon className="h-6 w-6" />
                        </a>
                    ) : null;
                })}
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Services</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {services.map((service) => (
                      <div key={service._id} className="bg-card p-8 rounded-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
                          <div className="mb-6 inline-block bg-primary/10 text-primary p-4 rounded-full">
                            <service.Icon className="h-8 w-8" />
                          </div>
                          <h3 className="font-headline text-2xl font-bold mb-3">{service.title}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
        {/* Tools & Stack Section */}
        {tools.length > 0 && (
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Tools & Stack</h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            My favorite arsenal of tools and technologies to bring ideas to life.
                        </p>
                    </div>
                    <TooltipProvider>
                        <div className="flex flex-wrap justify-center gap-8">
                            {tools.map((tool) => (
                                <Tooltip key={tool._id}>
                                    <TooltipTrigger asChild>
                                        <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-32 h-32 flex items-center justify-center">
                                            {tool.logoUrl && (
                                                <Image src={tool.logoUrl} alt={`${tool.name} logo`} width={80} height={80} className="object-contain" />
                                            )}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-bold">{tool.name}</p>
                                        {tool.description && <p className="text-sm text-muted-foreground">{tool.description}</p>}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </TooltipProvider>
                </div>
            </section>
        )}

      {/* Works Section */}
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Works</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        A collection of projects that showcase my passion for creating meaningful digital products.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <HomeProjectCard key={project._id} project={project} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link href="/portfolio">
                        <Button size="lg">View All Works</Button>
                    </Link>
                </div>
            </div>
        </section>

      <Brands />

      {/* About Me Section */}
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-12 gap-12 items-center mb-16">
                    <div className="md:col-span-5 flex justify-center">
                        <Image
                            src="https://placehold.co/400x400.png"
                            alt="Olyve Schwarz"
                            width={400}
                            height={400}
                            className="rounded-full object-cover aspect-square"
                            data-ai-hint="portrait woman"
                        />
                    </div>
                    <div className="md:col-span-7">
                        <h2 className="font-headline text-4xl md:text-6xl font-bold mb-4">I am Olyve Schwarz</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            A product designer who crafts unique and powerful digital experiences. I find joy in solving complex problems and creating interfaces that are both beautiful and intuitive for users.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    <div>
                        <h3 className="font-headline text-3xl font-bold mb-8">My Journey</h3>
                        <div className="relative border-l-2 border-primary/20 pl-8 space-y-12">
                            {[...experiences, ...educations].sort((a, b) => parseInt(b.period.slice(0, 4)) - parseInt(a.period.slice(0, 4))).map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-10 h-4 w-4 bg-primary rounded-full top-1"></div>
                                    <p className="font-bold text-primary mb-1">{item.period}</p>
                                    <h4 className="font-headline text-2xl font-bold">{'role' in item ? item.role : item.degree}</h4>
                                    <p className="text-muted-foreground text-lg">{'company' in item ? item.company : item.institution}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-headline text-center text-3xl font-bold mb-8">Skills</h3>
                        <SkillsChart />
                    </div>
                </div>

                <div className="text-center mt-16">
                    <Button size="lg" className="text-lg px-8 py-6">
                        <Download className="mr-2 h-5 w-5"/>
                        Download Resume
                    </Button>
                </div>
            </div>
        </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Testimonials</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              What my clients say about me.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-card p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-headline text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Awards Section */}
      {awards.length > 0 && (
          <section className="py-20 bg-background">
              <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                      <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Awards & Recognition</h2>
                      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                          Recognitions for my dedication to design and excellence.
                      </p>
                  </div>
                  <div className="divide-y divide-border">
                      {awards.map((award) => (
                          <div key={award._id} className="flex flex-col sm:flex-row items-center justify-between p-6 transition-colors hover:bg-card/50">
                             <div className="flex items-center gap-6 mb-4 sm:mb-0">
                                {award.logoUrl && (
                                    <div className="relative w-16 h-16">
                                        <Image src={award.logoUrl} alt={`${award.organization} logo`} fill className="object-contain" />
                                    </div>
                                )}
                               <div>
                                    <h3 className="font-headline text-2xl font-bold">{award.title}</h3>
                                    <p className="text-muted-foreground text-lg">{award.organization}</p>
                               </div>
                             </div>
                              <p className="font-headline text-2xl font-bold text-primary">{award.year}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

       {/* Articles Section */}
       <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">From the Blog</h2>
                   <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Insights on design, development, and creativity from our team.
                    </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentPosts.map((post) => (
                      <PostCard key={post._id} post={post} />
                  ))}
              </div>
               {recentPosts.length > 0 && (
                <div className="text-center mt-12">
                    <Link href="/blog">
                        <Button size="lg">View All Articles</Button>
                    </Link>
                </div>
                )}
          </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Have questions? We have answers.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Faq items={faqs} />
                </div>
            </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}

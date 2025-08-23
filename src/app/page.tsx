

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PenTool, Palette, Waypoints, Camera, Download } from 'lucide-react';
import { HomeProjectCard } from '@/components/HomeProjectCard';
import { SkillsChart } from '@/components/SkillsChart';
import { client } from '@/lib/sanity';
import type { PortableTextBlock } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

interface HeroData {
  title: string;
  subtitle: PortableTextBlock[];
  profileImage: any;
  buttons: { _key: string; text: string; url: string }[];
  socialLinks: { _key: string; platform: string; url: string }[];
}

async function getHeroData(): Promise<HeroData> {
  const query = `*[_type == "homepage"][0]{
    "title": heroSection.title,
    "subtitle": heroSection.subtitle,
    "profileImage": heroSection.profileImage,
    "buttons": heroSection.buttons,
    "socialLinks": heroSection.socialLinks,
  }`;
  const data = await client.fetch(query);
  return data;
}

const services = [
    {
        icon: PenTool,
        title: 'Digital Branding',
        description: 'Blend of strategic thinking and creative flair to craft digital identity.',
    },
    {
        icon: Palette,
        title: 'Visual Design',
        description: 'Unique product branding and marketing strategies.',
    },
    {
        icon: Waypoints,
        title: 'UX Research',
        description: 'User-centered analysis for optimizing usability.',
    },
    {
        icon: Camera,
        title: 'Art Direction',
        description: 'Creative direction with consistent brand language.',
    },
];

const projects = [
    {
        title: 'B & O',
        description: 'Marketing site design and build',
        imageUrl: 'https://placehold.co/600x450.png',
        aiHint: 'product design'
    },
    {
        title: 'Cozmetic',
        description: 'Marketing site design and build',
        imageUrl: 'https://placehold.co/600x450.png',
        aiHint: 'cosmetic product'
    },
    {
        title: 'Xendou',
        description: 'Marketing site design and build',
        imageUrl: 'https://placehold.co/600x450.png',
        aiHint: 'tech startup'
    },
    {
        title: 'Blvck',
        description: 'Marketing site design and build',
        imageUrl: 'https://placehold.co/600x450.png',
        aiHint: 'fashion brand'
    }
];

const filterButtons = ['All', 'Branding', 'Product', 'UX/UI'];

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

const Behance = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 9.5H8M6.25 7v5M15 11h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2zM19 11h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2zM15 7h4"/></svg>
);

const Dribbble = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path></svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const socialIcons: { [key: string]: React.ElementType } = {
  behance: Behance,
  dribbble: Dribbble,
  linkedin: Linkedin,
};


export default async function Home() {
  const heroData = await getHeroData();
  
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] w-full flex flex-col justify-center bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left">
              <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
                {heroData?.title || "Bring your vision to ultimate reality"}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
                {heroData?.subtitle?.map((block: any) => block.children.map((child: any) => child.text).join('')).join('\n') || "Specialize in creating unique visual identities for digital products…"}
              </p>
              <div className="flex flex-wrap gap-4">
                {heroData?.buttons?.map((button, index) => (
                   <Link key={button._key} href={button.url || '#'}>
                     <Button size="lg" variant={index === 0 ? 'default' : 'outline'} className="text-lg px-8 py-6">
                       {button.text}
                     </Button>
                   </Link>
                ))}
              </div>
            </div>
             <div className="flex justify-center items-center">
                {heroData?.profileImage && (
                    <Image
                        src={urlFor(heroData.profileImage).width(500).height(500).url()}
                        alt="Olyve Schwarz"
                        width={500}
                        height={500}
                        className="rounded-full object-cover aspect-square"
                        data-ai-hint="portrait woman"
                        priority
                    />
                )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8">
            <div className="flex items-center gap-4">
                {heroData?.socialLinks?.map((social) => {
                    const Icon = socialIcons[social.platform.toLowerCase()];
                    return Icon ? (
                        <a key={social._key} href={social.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
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
                  {services.map((service, index) => (
                      <div key={index} className="bg-card p-8 rounded-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
                          <div className="mb-6 inline-block bg-primary/10 text-primary p-4 rounded-full">
                              <service.icon className="h-8 w-8" />
                          </div>
                          <h3 className="font-headline text-2xl font-bold mb-3">{service.title}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Works</h2>
            <div className="flex justify-center flex-wrap gap-2">
                {filterButtons.map(label => (
                    <Button key={label} variant={label === 'All' ? 'default' : 'secondary'} className="rounded-full px-6">
                        {label}
                    </Button>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <HomeProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-12 gap-12 items-center mb-16">
            <div className="md:col-span-5 flex justify-center">
              <Image
                src="https://placehold.co/500x500.png"
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
              <h3 className="font-headline text-3xl font-bold mb-6">Experience</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                    <div key={index} className="flex justify-between items-end border-b border-border/20 pb-4">
                        <div>
                            <p className="font-semibold text-lg">{exp.company}</p>
                            <p className="text-muted-foreground">{exp.role}</p>
                        </div>
                        <p className="text-muted-foreground">{exp.period}</p>
                    </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-headline text-3xl font-bold mb-6">Education</h3>
              <div className="space-y-6">
                {educations.map((edu, index) => (
                    <div key={index} className="flex justify-between items-end border-b border-border/20 pb-4">
                        <div>
                            <p className="font-semibold text-lg">{edu.institution}</p>
                            <p className="text-muted-foreground">{edu.degree}</p>
                        </div>
                        <p className="text-muted-foreground">{edu.period}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-center text-3xl font-bold mb-8">Skills</h3>
            <SkillsChart />
          </div>

          <div className="text-center mt-16">
            <Button size="lg" className="text-lg px-8 py-6">
                <Download className="mr-2 h-5 w-5"/>
                Download Resume
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

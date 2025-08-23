

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PenTool, Palette, Waypoints, Camera, Download } from 'lucide-react';
import { HomeProjectCard } from '@/components/HomeProjectCard';
import { SkillsChart } from '@/components/SkillsChart';

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


export default async function Home() {
  
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] w-full flex flex-col justify-center bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left">
              <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-tight">
                Bring your vision to ultimate reality
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
                Specialize in creating unique visual identities for digital products…
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/portfolio">
                  <Button size="lg" className="text-lg px-8 py-6">
                    View Portfolio
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    Hire Me
                  </Button>
                </Link>
              </div>
            </div>
             <div className="flex justify-center items-center">
                <Image
                    src="https://placehold.co/500x500.png"
                    alt="Grafikerabi Profile"
                    width={500}
                    height={500}
                    className="rounded-full object-cover aspect-square"
                    data-ai-hint="portrait woman"
                    priority
                />
            </div>
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

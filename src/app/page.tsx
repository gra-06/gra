

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PenTool, Palette, Waypoints, Camera } from 'lucide-react';

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
                    data-ai-hint="portrait man"
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
    </>
  );
}

import Image from 'next/image';
import { Users, Target, Eye } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | DesignFlow Portfolio',
    description: 'Learn more about the creative team, our mission, and our values at DesignFlow.',
};

const teamMembers = [
  {
    name: 'Jane Doe',
    role: 'Lead Designer & Founder',
    image: 'https://placehold.co/400x400.png',
    bio: 'Jane is the creative force behind DesignFlow, with a passion for crafting unique brand identities and intuitive user experiences.',
    aiHint: 'portrait woman'
  },
  {
    name: 'John Smith',
    role: 'Lead Developer',
    image: 'https://placehold.co/400x400.png',
    bio: 'John brings designs to life with clean, efficient code, ensuring every project is as functional as it is beautiful.',
    aiHint: 'portrait man'
  },
  {
    name: 'Emily White',
    role: 'Project Manager',
    image: 'https://placehold.co/400x400.png',
    bio: 'Emily ensures every project runs smoothly from start to finish, fostering clear communication and on-time delivery.',
    aiHint: 'portrait woman'
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
            We are DesignFlow
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A passionate team of creatives, strategists, and innovators dedicated to building extraordinary digital experiences that drive results.
          </p>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="font-headline text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                To empower businesses by creating authentic, engaging, and impactful digital solutions. We believe that great design is not just about aesthetics, but about solving problems and creating meaningful connections between brands and their audiences.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <Eye className="h-8 w-8 text-primary" />
                <h2 className="font-headline text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                To be a leading digital design studio recognized for our creativity, strategic thinking, and commitment to excellence. We strive to push the boundaries of design and technology to deliver solutions that are not only visually stunning but also drive growth.
              </p>
            </div>
          </div>
          <div>
            <Image
              src="https://placehold.co/800x900.png"
              alt="Our team collaborating"
              width={800}
              height={900}
              className="rounded-lg shadow-xl object-cover"
              data-ai-hint="team collaboration"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              The creative minds behind our success stories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="relative w-40 h-40 mx-auto mb-4">
                    <Image
                    src={member.image}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="rounded-full object-cover"
                    data-ai-hint={member.aiHint}
                    />
                </div>
                <h3 className="font-headline text-2xl font-bold">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-muted-foreground font-body">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

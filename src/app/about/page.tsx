
import Image from 'next/image';
import { Users, Target, Eye } from 'lucide-react';
import type { Metadata } from 'next';
import { fetchDoc } from '@/lib/payload';
import type { TeamMember, AboutPage } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
    title: 'Hakkımda | Mustafa Saraçoğlu Portfolyosu',
    description: 'Yaratıcı ekip, misyonumuz ve değerlerimiz hakkında daha fazla bilgi edinin.',
};

async function getAboutPageData(): Promise<AboutPage | null> {
    try {
        const data = await fetchDoc<AboutPage>({
            collection: 'pages',
            slug: 'about',
            depth: 2,
        });
        return data;
    } catch (error) {
        console.error('Error fetching about page data:', error);
        return null;
    }
}

export default async function AboutPage() {
  const pageData = await getAboutPageData();

  if (!pageData) {
    return <div className="container mx-auto px-4 py-16 text-center">Sayfa içeriği yüklenemedi. Lütfen daha sonra tekrar deneyin.</div>;
  }
  
  const { 
    title,
    subtitle,
    missionTitle,
    missionDescription,
    visionTitle,
    visionDescription,
    teamTitle,
    teamSubtitle,
    missionImage,
    team
  } = pageData;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
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
                <h2 className="font-headline text-3xl font-bold">{missionTitle}</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                {missionDescription}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-3">
                <Eye className="h-8 w-8 text-primary" />
                <h2 className="font-headline text-3xl font-bold">{visionTitle}</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                {visionDescription}
              </p>
            </div>
          </div>
          <div>
            <Image
              src={missionImage?.url || "https://placehold.co/800x900.png"}
              alt={missionImage?.alt || "Ekibimiz işbirliği yapıyor"}
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
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">{teamTitle}</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {teamSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team?.map((member) => (
              <div key={member.id} className="text-center bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="relative w-40 h-40 mx-auto mb-4">
                    <Image
                    src={member.image?.url || "https://placehold.co/400x400.png"}
                    alt={member.image?.alt || member.name}
                    width={160}
                    height={160}
                    className="rounded-full object-cover"
                    data-ai-hint={member.aiHint || 'portrait'}
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

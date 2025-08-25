
import type { Project } from '@/types';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProjectPageClientFeatures } from '@/components/ProjectPageClient';
import { fetchDoc, fetchDocs } from '@/lib/payload';
import { payloadRichTextLexicalSerializer } from '@/lib/lexical';

interface ProjectPageProps {
  params: { slug: string };
}

async function getProject(slug: string): Promise<Project | null> {
    try {
        const project = await fetchDoc<Project>({
            collection: 'projects',
            slug,
            depth: 2,
        });
        return project;
    } catch (error) {
        console.error('Error fetching project', error);
        return null;
    }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!project) {
    return {
      title: 'Proje Bulunamadı'
    };
  }

  const overviewText = project.overview ? payloadRichTextLexicalSerializer(project.overview) : project.name;
  
  const imageUrlField = project.mainImage as { url: string; width?: number; height?: number; } | undefined;
  const imageUrl = imageUrlField?.url || 'https://placehold.co/1200x630.png';

  return {
    title: `${project.name} | Mustafa Saraçoğlu Portfolyosu`,
    description: overviewText,
    alternates: {
      canonical: `${BASE_URL}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} | Mustafa Saraçoğlu Portfolyosu`,
      description: overviewText,
      url: `${BASE_URL}/projects/${project.slug}`,
      siteName: 'Mustafa Saraçoğlu Portfolyosu',
      images: [
        {
          url: imageUrl,
          width: imageUrlField?.width || 1200,
          height: imageUrlField?.height || 630,
          alt: project.name,
        },
      ],
      locale: 'tr_TR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | Mustafa Saraçoğlu Portfolyosu`,
      description: overviewText,
      images: [imageUrl],
    },
  };
}


export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }
  
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const pageUrl = `${BASE_URL}/projects/${project.slug}`;
  const imageUrlField = project.mainImage as { url: string; width?: number; height?: number; } | undefined;
  const imageUrl = imageUrlField?.url || 'https://placehold.co/1200x630.png';
  const overviewText = project.overview ? payloadRichTextLexicalSerializer(project.overview) : project.name;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
    },
    headline: project.name,
    image: imageUrl,
    datePublished: project.date,
    author: {
        '@type': 'Organization',
        name: 'Grafikerabi',
    },
    publisher: {
        '@type': 'Organization',
        name: 'Grafikerabi',
        logo: {
            '@type': 'ImageObject',
            url: 'https://placehold.co/100x40.png?text=Grafikerabi', // Replace with your actual logo URL
        },
    },
    description: overviewText,
  };


  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectPageClientFeatures project={project} />
    </>
  );
}

export async function generateStaticParams() {
    try {
        const projects = await fetchDocs<Project>('projects');
        return projects.map((project) => ({
            slug: project.slug,
        }));
    } catch (error) {
        console.error('Error fetching slugs for projects', error);
        return [];
    }
}

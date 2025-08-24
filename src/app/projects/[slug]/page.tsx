
import type { Project } from '@/types';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import type { Metadata } from 'next';
import { ProjectPageClientFeatures } from '@/components/ProjectPageClient';

interface ProjectPageProps {
  params: { slug: string };
}

async function getProject(slug: string): Promise<Project | null> {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    "mainImageDimensions": mainImage.asset->metadata.dimensions,
    categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    client,
    date,
    services,
    overview,
    challenge,
    solution,
    result,
    caseStudy[]{
      _key,
      stage,
      description,
      'image': {
        'asset': asset->{url, alt, metadata}
       }
    },
    contentSections[]{
      ...,
      _type == 'imageGallery' => {
        'images': images[]{
          ...,
          'asset': asset->{
            url,
            alt,
            metadata
          }
        }
      },
      _type == 'fullWidthImage' => {
        'image': {
          'asset': asset->{
            url,
            alt,
            metadata
          }
        }
      }
    },
    "relatedProjects": *[_type == "project" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(date desc) [0...2] {
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
    tags
  }`;
  const project = await client.fetch(query, { slug });
  return project;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!project) {
    return {
      title: 'Proje Bulunamadı'
    };
  }

  const overviewText = Array.isArray(project.overview)
    ? project.overview
        .map(block => 
            Array.isArray(block.children) 
                ? block.children.map(child => child.text).join('')
                : ''
        )
        .join('\n')
    : project.name;

  const pageUrl = `${BASE_URL}/projects/${project.slug}`;
  const imageUrl = project.mainImage;

  return {
    title: `${project.name} | Mustafa Saraçoğlu Portfolyosu`,
    description: overviewText,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.name} | Mustafa Saraçoğlu Portfolyosu`,
      description: overviewText,
      url: pageUrl,
      siteName: 'Mustafa Saraçoğlu Portfolyosu',
      images: [
        {
          url: imageUrl,
          width: project.mainImageDimensions?.width || 1200,
          height: project.mainImageDimensions?.height || 630,
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
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!project) {
    notFound();
  }

  const overviewText = Array.isArray(project.overview)
    ? project.overview
        .map(block => 
            Array.isArray(block.children) 
                ? block.children.map(child => child.text).join('')
                : ''
        )
        .join('\n')
    : project.name;
    
  const pageUrl = `${BASE_URL}/projects/${project.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': pageUrl,
    },
    headline: project.name,
    image: project.mainImage,
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

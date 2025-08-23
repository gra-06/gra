
import Image from 'next/image';
import type { Project } from '@/types';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity';
import { Calendar, User, Tag, CheckIcon as Check } from 'lucide-react';
import { format } from 'date-fns';
import { ProjectCard } from '@/components/ProjectCard';
import imageUrlBuilder from '@sanity/image-url';
import { ProjectPageClient } from '@/components/ProjectPageClient';
import type { Metadata } from 'next';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

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
      'image': image.asset->url
    },
    contentSections[]{
      ...,
      _type == 'imageGallery' => {
        'images': images[]{
          ...,
          'asset': asset->{
            url
          }
        }
      },
      _type == 'fullWidthImage' => {
        'image': image.asset->{
          url
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
      title: 'Project Not Found'
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
    title: `${project.name} | DesignFlow Portfolio`,
    description: overviewText,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.name} | DesignFlow Portfolio`,
      description: overviewText,
      url: pageUrl,
      siteName: 'DesignFlow Portfolio',
      images: [
        {
          url: imageUrl,
          width: project.mainImageDimensions?.width || 1200,
          height: project.mainImageDimensions?.height || 630,
          alt: project.name,
        },
      ],
      locale: 'en_US', // Or your specific locale
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} | DesignFlow Portfolio`,
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

  return (
    <ProjectPageClient project={project} />
  );
}

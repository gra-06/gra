
import type { PortableTextBlock, PortableTextComponentProps } from '@portabletext/react';

export interface Category {
  _id: string;
  title: string;
  slug: string;
}

// Interface for a Sanity image asset reference
export interface SanityImageAsset {
  _ref: string;
  _type: 'reference';
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    }
  }
}

// Interface for a Sanity image object, including the asset reference
export interface SanityImage {
  _type: 'image';
  _key: string;
  asset: {
    _ref?: string;
    url?: string; // May be added by GROQ query
    alt?: string;
  };
  alt?: string;
  caption?: string;
}

// Specific content section types
export interface ImageGallerySection {
  _type: 'imageGallery';
  _key: string;
  images: SanityImage[];
}

export interface FullWidthImageSection {
  _type: 'fullWidthImage';
  _key: string;
  image: SanityImage;
  alt?: string;
}

export interface TwoColumnTextSection {
    _type: 'twoColumnText';
    _key: string;
    leftContent: PortableTextBlock[];
    rightContent: PortableTextBlock[];
}

export interface VideoBlockSection {
    _type: 'videoBlock';
    _key: string;
    videoFile: any; // Define further if needed
    caption?: string;
}

export interface CaseStudyEntry {
    _type: 'caseStudyEntry';
    _key: string;
    stage: string;
    description: PortableTextBlock[];
    image: SanityImage;
}

export interface Geopoint {
    _type: 'geopoint';
    lat: number;
    lng: number;
}


// A union type for all possible content sections
export type ContentSection = ImageGallerySection | FullWidthImageSection | TwoColumnTextSection | VideoBlockSection;


export interface Project {
  _id: string;
  name: string;
  slug: string;
  mainImage: string;
  mainImageDimensions?: {
    width: number;
    height: number;
  },
  categories: Category[];
  description: PortableTextBlock[];
  client?: string;
  date?: string;
  services?: string[];
  overview?: PortableTextBlock[];
  challenge?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  result?: PortableTextBlock[];
  caseStudy?: CaseStudyEntry[];
  contentSections?: ContentSection[];
  relatedProjects?: Partial<Project>[];
  tags?: string[];
  location?: Geopoint;
}


// BLOG TYPES
export interface Author {
    _id: string;
    name: string;
    slug: string;
    image: string;
    bio: PortableTextBlock[];
}

export interface PostCategory {
    _id: string;
    title: string;
    description?: string;
}

export interface Post {
    _id: string;
    title: string;
    slug: string;
    author: Author;
    mainImage: string;
    categories: PostCategory[];
    publishedAt: string;
    body: PortableTextBlock[];
    excerpt?: string;
}

import type { PortableTextBlock } from '@portabletext/react';

export interface Category {
  _id: string;
  title: string;
  slug: string;
}

export interface Project {
  _id: string;
  name: string;
  slug: string;
  mainImage: string;
  images?: string[];
  categories: Category[];
  description: PortableTextBlock[];
  tags?: string[];
}

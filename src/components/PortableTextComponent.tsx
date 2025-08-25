
'use client';

import type { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
// import { client } from '@/lib/sanity';
// import imageUrlBuilder from '@sanity/image-url';

// const builder = imageUrlBuilder(client);

// function urlFor(source: any) {
//   return builder.image(source);
// }

export const PortableTextComponent: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="font-headline text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="font-headline text-3xl font-bold my-4">{children}</h2>,
    h3: ({ children }) => <h3 className="font-headline text-2xl font-bold my-4">{children}</h3>,
    normal: ({ children }) => <p className="font-body text-base md:text-lg mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside my-4 space-y-2 font-body text-lg">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside my-4 space-y-2 font-body text-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : ''}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref && !value?.asset?.url) {
        return null;
      }
      return (
        <Image
          src={value.asset.url} // Directly use URL if available from new CMS
          alt={value.alt || ' '}
          loading="lazy"
          width={800}
          height={600}
          className="my-8 rounded-lg shadow-md w-full object-cover"
        />
      );
    },
  },
};

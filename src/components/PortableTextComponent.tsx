
'use client';

import type { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

const getUrlFromPayloadMedia = (media: any) => {
    if (typeof media === 'object' && media !== null && media.url) {
        return media.url;
    }
    return 'https://placehold.co/800x600.png'; // Fallback
};

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
    // This is for Sanity's default image type
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      // Basic URL construction for Sanity images, needs improvement for a real app
      const imageUrl = `https://cdn.sanity.io/images/vyy9j0wj/production/${value.asset._ref.replace('image-', '').replace('-png', '.png')}`;
      return (
        <Image
          src={imageUrl}
          alt={value.alt || ' '}
          loading="lazy"
          width={800}
          height={600}
          className="my-8 rounded-lg shadow-md w-full object-cover"
        />
      );
    },
    // This is for Payload's Lexical rich text image type ('upload')
    upload: ({ value }) => {
        if (!value?.value?.url) {
            return null;
        }
        const imageData = value.value;
        return (
             <Image
                src={getUrlFromPayloadMedia(imageData)}
                alt={imageData.alt || ' '}
                loading="lazy"
                width={imageData.width || 800}
                height={imageData.height || 600}
                className="my-8 rounded-lg shadow-md w-full object-cover"
            />
        )
    }
  },
};

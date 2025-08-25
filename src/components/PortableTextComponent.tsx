
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
    image: ({ value }) => {
      if (!value?.url) {
        return null;
      }
      return (
        <Image
          src={getUrlFromPayloadMedia(value)}
          alt={value.alt || ' '}
          loading="lazy"
          width={value.width || 800}
          height={value.height || 600}
          className="my-8 rounded-lg shadow-md w-full object-cover"
        />
      );
    },
    // Handling Payload's rich text format which is Lexical
    upload: ({ value }) => {
        if (!value?.value?.url) {
            return null;
        }
        return (
             <Image
                src={getUrlFromPayloadMedia(value.value)}
                alt={value.value.alt || ' '}
                loading="lazy"
                width={value.value.width || 800}
                height={value.value.height || 600}
                className="my-8 rounded-lg shadow-md w-full object-cover"
            />
        )
    }
  },
};

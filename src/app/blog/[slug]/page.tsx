
'use client';

import type { Post, PayloadMedia } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';
import { useEffect, useState } from 'react';
import { useGamification } from '@/hooks/use-gamification';
import { fetchDoc, fetchDocs } from '@/lib/payload';

interface PostPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        const post = await fetchDoc<Post>({
            collection: 'posts',
            slug,
            depth: 2,
        });
        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

// This needs to be a separate client component to use hooks
function PostBody({ slug }: { slug: string }) {
    const [post, setPost] = useState<Post | null>(null);
    const { logEvent } = useGamification();

    useEffect(() => {
        async function loadPost() {
            const fetchedPost = await getPost(slug);
            setPost(fetchedPost);
            if (fetchedPost) {
                logEvent('POST_VISIT', fetchedPost.id);
            }
        }
        loadPost();
    }, [slug, logEvent]);

    if (!post) {
        // You can return a loading skeleton here
        return <div className="container mx-auto px-4 py-16 text-center">Yazı yükleniyor...</div>;
    }
    
    if (!post.id) {
        notFound();
    }

    const mainImageUrl = typeof post.mainImage === 'object' ? post.mainImage.url : post.mainImage;
    const authorImage = typeof post.author.image === 'object' ? (post.author.image as PayloadMedia).url : post.author.image;
    const authorName = typeof post.author === 'object' ? post.author.name : 'Yazar';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        image: mainImageUrl,
        author: {
            '@type': 'Person',
            name: authorName,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Grafikerabi',
            logo: {
                '@type': 'ImageObject',
                url: 'https://placehold.co/100x40.png?text=Grafikerabi',
            },
        },
        datePublished: post.publishedAt,
        description: post.excerpt,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="bg-background">
                <header className="relative h-[60vh] min-h-[400px]">
                    {mainImageUrl && <Image 
                        src={mainImageUrl}
                        alt={post.title || ''}
                        fill
                        className="object-cover"
                        priority
                        data-ai-hint="blog post"
                    />}
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.categories?.map((category) => (
                                    typeof category === 'object' && <Badge key={category.id} variant="secondary">{category.title}</Badge>
                                ))}
                            </div>
                            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-white">
                                {post.title}
                            </h1>
                        </div>
                    </div>
                </header>
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-8 text-muted-foreground border-b pb-4">
                            <div className="flex items-center gap-3">
                            {authorImage ? (
                                    <Image src={authorImage} alt={authorName || ''} width={40} height={40} className="rounded-full" />
                            ) : (
                                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                        <User className="w-6 h-6" />
                                    </div>
                            )}
                                <span className="font-semibold text-lg text-foreground">{authorName}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="w-6 h-6" />
                                <time dateTime={post.publishedAt} className="font-semibold text-lg text-foreground">
                                    {format(new Date(post.publishedAt), 'd MMMM yyyy')}
                                </time>
                            </div>
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none font-body">
                           {post.body && <PortableText value={post.body} components={PortableTextComponent} />}
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}


export default function PostPage({ params }: PostPageProps) {
    return <PostBody slug={params.slug} />;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) {
    return {
      title: 'Yazı Bulunamadı'
    }
  }

  return {
    title: `${post.title} | Grafikerabi Blog`,
    description: post.excerpt || 'Grafikerabi ekibinden bir blog yazısı.',
  }
}

export async function generateStaticParams() {
  const posts = await fetchDocs<Post>('posts');
  return posts.map(post => ({
    slug: post.slug,
  }));
}

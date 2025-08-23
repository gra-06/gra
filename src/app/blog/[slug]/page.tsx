
import { client } from '@/lib/sanity';
import type { Post } from '@/types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Metadata } from 'next';

interface PostPageProps {
  params: { slug: string };
}

async function getPost(slug: string): Promise<Post | null> {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        "mainImage": mainImage.asset->url,
        publishedAt,
        body,
        author->{
            name,
            "image": image.asset->url
        },
        categories[]->{
            _id,
            title
        }
    }`;
    const post = await client.fetch(query, { slug });
    return post;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: `${post.title} | DesignFlow Blog`,
    description: post.excerpt || 'A blog post from the DesignFlow team.',
  }
}

export default async function PostPage({ params }: PostPageProps) {
    const post = await getPost(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="bg-background">
            <header className="relative h-[60vh] min-h-[400px]">
                <Image 
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="blog post"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.categories?.map((category) => (
                                <Badge key={category._id} variant="secondary">{category.title}</Badge>
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
                           {post.author.image ? (
                                <Image src={post.author.image} alt={post.author.name} width={40} height={40} className="rounded-full" />
                           ) : (
                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                                    <User className="w-6 h-6" />
                                </div>
                           )}
                            <span className="font-semibold text-lg text-foreground">{post.author.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-6 h-6" />
                            <time dateTime={post.publishedAt} className="font-semibold text-lg text-foreground">
                                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                            </time>
                        </div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none font-body">
                         <PortableText value={post.body} components={PortableTextComponent} />
                    </div>
                </div>
            </div>
        </article>
    );
}

// Add this to dynamically generate static pages for blog posts
export async function generateStaticParams() {
  const posts = await client.fetch<Post[]>(`*[_type == "post"]{"slug": slug.current}`);
  return posts.map(post => ({
    slug: post.slug,
  }));
}

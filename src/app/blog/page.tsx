
import { client } from '@/lib/sanity';
import type { Post } from '@/types';
import type { Metadata } from 'next';
import { PostCard } from '@/components/PostCard';

export const metadata: Metadata = {
    title: 'Blog | Mustafa Saraçoğlu Portfolyosu',
    description: 'Tasarım, geliştirme ve yaratıcılık üzerine ekibimden içgörüler.',
};

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    publishedAt,
    excerpt,
    author->{
        name
    },
    categories[]->{
        _id,
        title
    }
  }`;
  const posts = await client.fetch(query);
  return posts;
}

export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="bg-background">
            <header className="bg-secondary py-20 md:py-28">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
                        Grafikerabi Blog
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Tasarım, geliştirme ve yaratıcılık üzerine içgörülerim.
                    </p>
                </div>
            </header>
            <main className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
                 {posts.length === 0 && (
                    <div className="text-center col-span-full py-16">
                        <h2 className="font-headline text-3xl mb-4">Henüz yazı yok.</h2>
                        <p className="text-muted-foreground">İçgörüler ve hikayeler için yakında tekrar kontrol edin!</p>
                    </div>
                 )}
            </main>
        </div>
    );
}

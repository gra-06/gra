
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { Post } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  if (!post.slug) {
    return null;
  }
  
  return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <motion.div 
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card h-full flex flex-col">
          
          <div className="relative aspect-w-16 aspect-h-9 w-full overflow-hidden">
            <Image
              src={post.mainImage || 'https://placehold.co/600x400.png'}
              alt={post.title || 'Blog post image'}
              width={600}
              height={338}
              className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              data-ai-hint="blog article"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories?.map((category) => (
                <Badge key={category._id} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
            <h3 className="font-headline text-2xl font-bold text-card-foreground leading-tight mb-3">
              {post.title}
            </h3>
            {post.excerpt && (
                <p className="text-muted-foreground font-body text-base mb-4 flex-grow">
                    {post.excerpt}
                </p>
            )}

            <div className="mt-auto pt-4 border-t border-border/40 flex items-center text-sm text-muted-foreground gap-4">
               <div className="flex items-center gap-2">
                   <User className="w-4 h-4"/>
                   <span>{post.author.name}</span>
               </div>
               <div className="flex items-center gap-2">
                   <Calendar className="w-4 h-4"/>
                    <time dateTime={post.publishedAt}>
                        {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    </time>
               </div>
            </div>
          </div>
        </motion.div>
      </Link>
  );
}

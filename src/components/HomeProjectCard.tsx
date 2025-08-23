
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HomeProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  aiHint: string;
}

export function HomeProjectCard({ title, description, imageUrl, aiHint }: HomeProjectCardProps) {
  return (
    <Link href="/portfolio" className="group block overflow-hidden rounded-lg">
      <motion.div
        className="relative aspect-w-4 aspect-h-3 w-full"
        whileHover="hover"
      >
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={450}
          className="object-cover w-full h-full transform transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={aiHint}
        />
        <motion.div
          className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center"
          variants={{
            initial: { opacity: 0 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.3 }}
          initial="initial"
        >
           <motion.div
             variants={{
                initial: { y: 20, opacity: 0 },
                hover: { y: 0, opacity: 1 }
             }}
             transition={{ delay: 0.1 }}
           >
             <Button variant="outline" size="lg">View Case Study</Button>
           </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/60 to-transparent w-full transition-opacity duration-300 group-hover:opacity-0">
             <h3 className="font-headline text-3xl font-bold text-white">
              {title}
            </h3>
            <p className="text-white/80 font-body">{description}</p>
        </div>
      </motion.div>
    </Link>
  );
}


'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const titles = ["Tasarımcı", "Geliştirici", "Yaratıcı"];

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Change title every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Gradient */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-4"
        >
          Merhaba, ben Mustafa Saraçoğlu 👋
        </motion.h1>
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-headline text-4xl md:text-6xl font-bold text-primary mb-6"
            style={{ minHeight: '80px' }}
        >
            <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
            >
                {titles[index]}
            </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Tasarım ve teknolojiyle hayalleri gerçeğe dönüştürüyorum.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/portfolio">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              Projelerimi İncele
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Benimle İletişime Geç
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

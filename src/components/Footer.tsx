
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brush, Instagram, Linkedin, Twitter, Facebook, Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const socialLinks = [
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  ];
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-4 flex flex-col items-center text-center md:items-start md:text-left">
             <Link href="/" className="flex items-center space-x-2 mb-4" aria-label="Mustafa Saraçoğlu Anasayfa">
                <Brush className="h-8 w-8 text-primary" />
                <span className="font-headline text-3xl font-bold">Grafikerabi</span>
            </Link>
            <p className="max-w-xs text-muted-foreground mb-4">
              Yaratıcı tasarımlarla markanız için değer yaratıyorum.
            </p>
             <a href="mailto:info@grafikerabi.com" className="font-semibold text-primary hover:underline">
                info@grafikerabi.com
              </a>
          </div>

          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="font-headline text-xl font-semibold mb-4">Hızlı Linkler</h3>
            <nav className="flex flex-col space-y-2" aria-label="Alt bilgi hızlı linkleri">
              <Link href="/about" className="hover:text-primary transition-colors">Hakkımda</Link>
              <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolyo</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">İletişim</Link>
               <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </nav>
          </div>
          
          <div className="md:col-span-6 text-center md:text-left">
             <h3 className="font-headline text-xl font-semibold mb-4" id="newsletter-heading">Gelişmelerden haberdar olun</h3>
             <p className="text-muted-foreground mb-4">
                En son makalelerimi ve projelerimi almak için abone olun.
             </p>
             <form action="#" className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0" aria-labelledby="newsletter-heading">
                <div className="relative flex-grow">
                    <label htmlFor="newsletter-email" className="sr-only">E-posta adresiniz</label>
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
                    <Input type="email" id="newsletter-email" placeholder="E-posta adresiniz" className="pl-10 bg-background" required/>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 flex-shrink-0">
                    Abone Ol
                </Button>
             </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">&copy; {new Date().getFullYear()} Mustafa Saraçoğlu. Tüm hakları saklıdır.</p>
            <div className="flex items-center space-x-4">
                {socialLinks.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label={isClient ? link.label : undefined}>
                        <link.icon className="h-5 w-5" />
                    </a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}

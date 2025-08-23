/**
 * Header.tsx: Site başlığı bileşeni.
 * 
 * Bu bileşen, site logosunu, ana navigasyon linklerini ve sosyal medya ikonlarını içerir.
 * Mobil cihazlar için açılır menü (hamburger menü) işlevselliğine sahiptir.
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brush, Menu, X, Instagram, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/ai-tagger', label: 'AI Tagger' },
  ];

  const socialLinks = [
    { href: 'https://instagram.com', icon: Instagram },
    { href: 'https://linkedin.com', icon: Linkedin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        {/* Site Logosu */}
        <Link href="/" className="flex items-center space-x-2">
          <Brush className="h-8 w-8 text-primary" />
          <span className="font-headline text-3xl font-bold">DesignFlow</span>
        </Link>

        {/* Masaüstü Navigasyon */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-lg font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sosyal Medya İkonları (Masaüstü) */}
        <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <link.icon className="h-5 w-5" />
                </a>
            ))}
        </div>

        {/* Mobil Menü Butonu */}
        <div className="md:hidden">
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg py-4">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary w-full text-center py-2',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
             <div className="flex items-center space-x-6 pt-4">
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <link.icon className="h-6 w-6" />
                    </a>
                ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

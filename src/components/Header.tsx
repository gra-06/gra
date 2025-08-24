
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brush, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export interface NavItem {
  href: string;
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];
}

export function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const mobileNavLinks = [
    ...navItems.filter(item => item.href !== '/contact'),
    { href: '/contact', label: 'Say Hello' }
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Brush className="h-8 w-8 text-primary" />
          <span className="font-headline text-3xl font-bold">Olyve Schwarz</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8" aria-label={isClient ? "Ana navigasyon" : undefined}>
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-lg font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
              aria-current={isClient && pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
            <Link href="/contact">
                <Button>Say Hello</Button>
            </Link>
            <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            variant="ghost" 
            size="icon" 
            aria-controls={isClient ? "mobile-menu" : undefined}
            aria-expanded={isClient ? isMenuOpen : undefined}
            aria-label={isClient ? (isMenuOpen ? "Menüyü kapat" : "Menüyü aç") : undefined}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg py-4">
          <nav className="flex flex-col items-center space-y-4" aria-label={isClient ? "Mobil ana navigasyon" : undefined}>
            {mobileNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-primary w-full text-center py-2',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
                aria-current={isClient && pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

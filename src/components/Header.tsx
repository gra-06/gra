
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brush, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

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
    { href: '/contact', label: 'Merhaba De' }
  ];
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Brush className="h-8 w-8 text-primary" />
          <span className="font-headline text-3xl font-bold">Grafikerabi</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-2 relative" aria-label={isClient ? "Ana navigasyon" : undefined}>
          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative px-4 py-2 text-lg font-medium transition-colors hover:text-primary',
                 pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
              aria-current={isClient && pathname === link.href ? 'page' : undefined}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
            <Link href="/contact">
                <Button>Merhaba De</Button>
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
      
      <AnimatePresence>
        {isMenuOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                id="mobile-menu" 
                className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg overflow-hidden"
            >
            <nav className="flex flex-col items-center space-y-2 p-4" aria-label={isClient ? "Mobil ana navigasyon" : undefined}>
                {mobileNavLinks.map((link, index) => (
                <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className="w-full"
                >
                    <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                        'block text-lg font-medium transition-colors hover:text-primary w-full text-center py-3 rounded-md',
                        pathname === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                        )}
                        aria-current={isClient && pathname === link.href ? 'page' : undefined}
                    >
                        {link.label}
                    </Link>
                </motion.div>
                ))}
            </nav>
            </motion.div>
        )}
       </AnimatePresence>
    </header>
  );
}

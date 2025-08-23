/**
 * Footer.tsx: Sitenin alt bilgi bileşeni.
 * 
 * Bu bileşen, telif hakkı bilgisini, bazı önemli linkleri ve sosyal medya ikonlarını içerir.
 */
import Link from 'next/link';
import { Brush, Instagram, Linkedin, Twitter, Facebook, Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function Footer() {
  const socialLinks = [
    { href: 'https://twitter.com', icon: Twitter },
    { href: 'https://facebook.com', icon: Facebook },
    { href: 'https://instagram.com', icon: Instagram },
    { href: 'https://linkedin.com', icon: Linkedin },
  ];
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Logo ve Hakkında */}
          <div className="md:col-span-4 flex flex-col items-center text-center md:items-start md:text-left">
             <Link href="/" className="flex items-center space-x-2 mb-4">
                <Brush className="h-8 w-8 text-primary" />
                <span className="font-headline text-3xl font-bold">DesignFlow</span>
            </Link>
            <p className="max-w-xs text-muted-foreground">
              Yaratıcı tasarımlarla markanıza değer katıyoruz.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="font-headline text-xl font-semibold mb-4">Hızlı Linkler</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="hover:text-primary transition-colors">Hakkımızda</Link>
              <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolyo</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">İletişim</Link>
               <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </nav>
          </div>
          
          {/* Bülten */}
          <div className="md:col-span-6 text-center md:text-left">
             <h3 className="font-headline text-xl font-semibold mb-4">Bültenimize Abone Olun</h3>
             <p className="text-muted-foreground mb-4">
                Tasarım dünyasındaki en son haberleri ve ipuçlarını doğrudan gelen kutunuza alın.
             </p>
             <form action="#" className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto md:mx-0">
                <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input type="email" placeholder="E-posta adresiniz" className="pl-10 bg-background" required/>
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 flex-shrink-0">
                    Abone Ol
                </Button>
             </form>
          </div>
        </div>
        
        {/* Alt Kısım */}
        <div className="mt-12 pt-8 border-t border-border/40 text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm">&copy; {currentYear} DesignFlow. Tüm hakları saklıdır.</p>
            <div className="flex items-center space-x-4">
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <link.icon className="h-5 w-5" />
                    </a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
}

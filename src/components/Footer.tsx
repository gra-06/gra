/**
 * Footer.tsx: Sitenin alt bilgi bileşeni.
 * 
 * Bu bileşen, telif hakkı bilgisini, bazı önemli linkleri ve sosyal medya ikonlarını içerir.
 */
import Link from 'next/link';
import { Brush, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

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
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo ve Hakkında */}
          <div className="flex flex-col items-center md:items-start">
             <Link href="/" className="flex items-center space-x-2 mb-4">
                <Brush className="h-8 w-8 text-primary" />
                <span className="font-headline text-3xl font-bold">DesignFlow</span>
            </Link>
            <p className="max-w-xs text-muted-foreground">
              Yaratıcı tasarımlarla markanıza değer katıyoruz.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="font-headline text-xl font-semibold mb-4">Hızlı Linkler</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="hover:text-primary transition-colors">Hakkımızda</Link>
              <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolyo</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">İletişim</Link>
            </nav>
          </div>
          
          {/* Sosyal Medya */}
          <div>
             <h3 className="font-headline text-xl font-semibold mb-4">Bizi Takip Edin</h3>
             <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-secondary-foreground hover:text-primary transition-colors">
                        <link.icon className="h-6 w-6" />
                    </a>
                ))}
             </div>
          </div>
        </div>
        
        {/* Alt Kısım */}
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-muted-foreground">
            <p>&copy; {currentYear} DesignFlow. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

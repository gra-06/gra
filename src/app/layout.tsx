
import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Header, type NavItem } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Alegreya, Azeret_Mono as Teller } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { PortfolioChatbot } from '@/components/PortfolioChatbot';
import { GamificationProvider } from '@/providers/GamificationProvider';
import { getBadges } from '@/lib/badgeService';
import { UserBadges } from '@/components/UserBadges';


const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

const teller = Teller({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-teller',
  weight: ['400', '700'],
});


export const metadata: Metadata = {
  title: 'DesignFlow Portfolio | Creative Digital Studio',
  description: 'A modern portfolio for creative professionals. We transform ideas into extraordinary digital experiences.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DesignFlow Portfolio',
    url: 'https://your-domain.com', // Replace with your actual domain
  };

  const navItems: NavItem[] = [
    { href: '/', label: 'Anasayfa' },
    { href: '/about', label: 'Hakkımda' },
    { href: '/portfolio', label: 'Projeler' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'İletişim' },
  ];

  const badges = await getBadges();

  return (
    <html lang="en" className={cn("scroll-smooth", alegreya.variable, teller.variable)} suppressHydrationWarning>
       <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <GamificationProvider allBadges={badges}>
            <div className="flex flex-col min-h-screen">
                <Header navItems={navItems} />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
            <Toaster />
            <PortfolioChatbot />
            <UserBadges />
          </GamificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { ContactPage } from '@/types';
import { fetchDoc } from '@/lib/payload';
import { Skeleton } from '@/components/ui/skeleton';

// We can't generate Metadata in a client component, but we can have a placeholder
// export const metadata: Metadata = {
//     title: 'İletişim | Mustafa Saraçoğlu Portfolyosu',
//     description: 'Mustafa Saraçoğlu ile iletişime geçin. Projenizi duymaktan memnuniyet duyarız.',
// };

export default function ContactPage() {
  const [pageData, setPageData] = useState<ContactPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getContactPageData() {
      try {
        const data = await fetchDoc<ContactPage>({
          collection: 'pages',
          slug: 'contact',
        });
        setPageData(data);
      } catch (error) {
        console.error('Error fetching contact page data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    getContactPageData();
  }, []);
  
  if (isLoading) {
    return (
      <>
         {/* Hero Section Skeleton */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-16 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </section>
        {/* Content Skeleton */}
        <div className="container mx-auto px-4 py-16 text-center">Yükleniyor...</div>
      </>
    );
  }

  if (!pageData) {
    return <div className="container mx-auto px-4 py-16 text-center">Sayfa içeriği yüklenemedi. Lütfen daha sonra tekrar deneyin.</div>;
  }

  const { title, subtitle, formTitle, detailsTitle, email, phone, address } = pageData;

  return (
    <>
      {/* Header Section */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h2 className="font-headline text-3xl font-bold mb-6">{formTitle}</h2>
              <form action="#" className="space-y-6">
                <div>
                  <Label htmlFor="name">Ad Soyad</Label>
                  <Input type="text" id="name" placeholder="Ahmet Yılmaz" required />
                </div>
                <div>
                  <Label htmlFor="email">E-posta Adresi</Label>
                  <Input type="email" id="email" placeholder="siz@örnek.com" required />
                </div>
                <div>
                  <Label htmlFor="subject">Konu</Label>
                  <Input type="text" id="subject" placeholder="Örn: Web Sitesi Yeniden Tasarımı" required />
                </div>
                <div>
                  <Label htmlFor="message">Mesajınız</Label>
                  <Textarea id="message" placeholder="Bize projenizden bahsedin..." rows={6} required />
                </div>
                <div>
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Mesajı Gönder
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Details */}
            <div className="pt-8">
              <h2 className="font-headline text-3xl font-bold mb-8">{detailsTitle}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">E-posta</h3>
                    <p className="text-muted-foreground">{email}</p>
                    <a href={`mailto:${email}`} className="text-primary hover:underline">E-posta gönder</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                    </div>
                  <div>
                    <h3 className="text-xl font-semibold">Telefon</h3>
                    <p className="text-muted-foreground">{phone}</p>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-primary hover:underline">Bizi arayın</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                    </div>
                  <div>
                    <h3 className="text-xl font-semibold">Ofis</h3>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: address.replace(/\n/g, '<br/>') }} />
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Yol tarifi al</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
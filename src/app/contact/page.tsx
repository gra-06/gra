
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'İletişim | Mustafa Saraçoğlu Portfolyosu',
    description: 'Mustafa Saraçoğlu ile iletişime geçin. Projenizi duymaktan memnuniyet duyarız.',
};

export default function ContactPage() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
            İletişime Geçin
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Aklınızda bir proje mi var? Sizden haber almayı çok isteriz. Aşağıdaki formu doldurun veya bizimle doğrudan iletişime geçin.
          </p>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h2 className="font-headline text-3xl font-bold mb-6">Bize Mesaj Gönderin</h2>
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
              <h2 className="font-headline text-3xl font-bold mb-8">İletişim Bilgileri</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">E-posta</h3>
                    <p className="text-muted-foreground">info@grafikerabi.com</p>
                    <a href="mailto:info@grafikerabi.com" className="text-primary hover:underline">E-posta gönder</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                    </div>
                  <div>
                    <h3 className="text-xl font-semibold">Telefon</h3>
                    <p className="text-muted-foreground">+90 (123) 456-7890</p>
                    <a href="tel:+901234567890" className="text-primary hover:underline">Bizi arayın</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                    </div>
                  <div>
                    <h3 className="text-xl font-semibold">Ofis</h3>
                    <p className="text-muted-foreground">123 Tasarım Sokak, No: 456<br/>Yaratıcı Şehir, 34000</p>
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

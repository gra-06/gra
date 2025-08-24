import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Contact Us | Olyve Schwarz Portfolio',
    description: 'Get in touch with the Olyve Schwarz team. We\'d love to hear about your project.',
};

export default function ContactPage() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? We'd love to hear from you. Fill out the form below or contact us directly.
          </p>
        </div>
      </section>

      {/* Contact Form and Details Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h2 className="font-headline text-3xl font-bold mb-6">Send Us a Message</h2>
              <form action="#" className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input type="text" id="name" placeholder="John Doe" required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" id="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input type="text" id="subject" placeholder="e.g., Website Redesign" required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your project..." rows={6} required />
                </div>
                <div>
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact Details */}
            <div className="pt-8">
              <h2 className="font-headline text-3xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <p className="text-muted-foreground">info@olyveschwarz.com</p>
                    <a href="mailto:info@olyveschwarz.com" className="text-primary hover:underline">Send an email</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <Phone className="h-6 w-6" />
                    </div>
                  <div>
                    <h3 className="text-xl font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+1 (123) 456-7890</p>
                    <a href="tel:+11234567890" className="text-primary hover:underline">Call us</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <MapPin className="h-6 w-6" />
                    </div>
                  <div>
                    <h3 className="text-xl font-semibold">Office</h3>
                    <p className="text-muted-foreground">123 Design Street, Suite 456<br/>Creative City, 78910</p>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Get directions</a>
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

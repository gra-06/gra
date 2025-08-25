
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Download, PenTool, Palette, Waypoints, Camera, Star } from 'lucide-react';
import { HomeProjectCard } from '@/components/HomeProjectCard';
import { SkillsChart } from '@/components/SkillsChart';
import type { Project, Post } from '@/types';
import { PostCard } from '@/components/PostCard';
import { CtaBanner } from '@/components/CtaBanner';
import { Faq } from '@/components/Faq';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Brands } from '@/components/Brands';
// import { client } from '@/lib/sanity';
import { Hero } from '@/components/Hero';
import { ProjectMap } from '@/components/ProjectMap';

interface Award {
    _id: string;
    title: string;
    organization: string;
    year: string;
    logoUrl: string;
}

interface FaqItem {
    _id: string;
    question: string;
    answer: any;
}

interface Tool {
    _id: string;
    name: string;
    description: string;
    logoUrl: string;
}

async function getHomePageData() {
    const projects: Project[] = [];
    const recentPosts: Post[] = [];
    const awards: Award[] = [];
    const faqs: FaqItem[] = [];
    const tools: Tool[] = [];
    // const projectsQuery = `*[_type == "project"] | order(date desc){
    //   _id,
    //   name,
    //   "slug": slug.current,
    //   mainImage{
    //     asset->{
    //       url
    //     }
    //   },
    //   categories[]->{_id, title, "slug": slug.current},
    //   location
    // }`;
    // const recentPostsQuery = `*[_type == "post"] | order(publishedAt desc)[0...3]{
    //   _id,
    //   title,
    //   "slug": slug.current,
    //   "mainImage": mainImage.asset->url,
    //   publishedAt,
    //   excerpt,
    //   author->{
    //       name
    //   },
    //   categories[]->{
    //       _id,
    //       title
    //   }
    // }`;
    // const awardsQuery = `*[_type == "award"] | order(year desc) {
    //     _id,
    //     title,
    //     organization,
    //     year,
    //     "logoUrl": logo.asset->url
    // }`;
    // const faqsQuery = `*[_type == "faq"] | order(_createdAt asc) {
    //     _id,
    //     question,
    //     answer
    // }`;
    // const toolsQuery = `*[_type == "tool"] | order(name asc) {
    //     _id,
    //     name,
    //     description,
    //     "logoUrl": logo.asset->url
    // }`;
    
    // const [projects, recentPosts, awards, faqs, tools] = await Promise.all([
    //   client.fetch<Project[]>(projectsQuery),
    //   client.fetch<Post[]>(recentPostsQuery),
    //   client.fetch<Award[]>(awardsQuery),
    //   client.fetch<FaqItem[]>(faqsQuery),
    //   client.fetch<Tool[]>(toolsQuery),
    // ]);

    return { projects, recentPosts, awards, faqs, tools };
}


export default async function Home() {
    const { projects, recentPosts, awards, faqs, tools } = await getHomePageData();

    const services = [
        {
            _id: '1',
            title: 'Dijital Markalaşma',
            description: 'Dijital kimlik oluşturmak için stratejik düşünce ve yaratıcı yeteneğin birleşimi.',
            Icon: PenTool
        },
        {
            _id: '2',
            title: 'Görsel Tasarım',
            description: 'Benzersiz ürün markalaması ve pazarlama stratejileri.',
            Icon: Palette
        },
        {
            _id: '3',
            title: 'UX Araştırması',
            description: 'Kullanılabilirliği optimize etmek için kullanıcı odaklı analiz.',
            Icon: Waypoints
        },
        {
            _id: '4',
            title: 'Sanat Yönetmenliği',
            description: 'Tutarlı marka dili ile yaratıcı yönlendirme.',
            Icon: Camera
        }
    ];

    const testimonials = [
      {
        _id: '1',
        name: 'Ahmet Yılmaz',
        role: 'CEO, Tekno A.Ş.',
        quote: "Mustafa'nın tasarım çalışmaları olağanüstü. Detaylara karşı harika bir gözü ve kullanıcı deneyimi konusunda derin bir anlayışı var. Sonuçlardan çok memnunuz.",
        avatar: 'https://placehold.co/100x100.png',
        rating: 5,
      },
      {
        _id: '2',
        name: 'Ayşe Kaya',
        role: 'Pazarlama Müdürü, Dizayn Co.',
        quote: "Mustafa ile çalışmak harika bir deneyimdi. Gerçek bir profesyonel ve işbirliği yapması çok keyifli. Kesinlikle tavsiye ederim!",
        avatar: 'https://placehold.co/100x100.png',
        rating: 5,
      }
    ];
    
    const experiences = [
        {
          company: 'Freelance',
          role: 'Ürün Tasarımcısı',
          period: '2020 - Günümüz'
        },
        {
          company: 'AKQA',
          role: 'Kıdemli Ürün Tasarımcısı',
          period: '2018 - 2020'
        },
        {
          company: 'Google',
          role: 'Kreatif Direktör',
          period: '2016 - 2018'
        }
    ];

    const educations = [
        {
            institution: 'Sanat Üniversitesi',
            degree: 'Yüksek Lisans',
            period: '2014 - 2016'
        },
        {
            institution: 'Tasarım Üniversitesi',
            degree: 'Lisans',
            period: '2010 - 2014'
        }
    ];

  return (
    <>
      <Hero />
      {/* Services Section */}
      <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Hizmetler</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {services.map((service) => (
                      <div key={service._id} className="bg-card p-8 rounded-lg shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
                          <div className="mb-6 inline-block bg-primary/10 text-primary p-4 rounded-full">
                            <service.Icon className="h-8 w-8" />
                          </div>
                          <h3 className="font-headline text-2xl font-bold mb-3">{service.title}</h3>
                          <p className="text-muted-foreground">{service.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      
        {/* Tools & Stack Section */}
        {tools.length > 0 && (
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Araçlar & Teknolojiler</h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Fikirleri hayata geçirmek için kullandığım favori araç ve teknoloji cephaneliğim.
                        </p>
                    </div>
                    <TooltipProvider>
                        <div className="flex flex-wrap justify-center gap-8">
                            {tools.map((tool) => (
                                <Tooltip key={tool._id}>
                                    <TooltipTrigger asChild>
                                        <div className="bg-card p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-32 h-32 flex items-center justify-center">
                                            {tool.logoUrl && (
                                                <Image src={tool.logoUrl} alt={`${tool.name} logo`} width={80} height={80} className="object-contain" />
                                            )}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-bold">{tool.name}</p>
                                        {tool.description && <p className="text-sm text-muted-foreground">{tool.description}</p>}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </TooltipProvider>
                </div>
            </section>
        )}

      {/* Works Section */}
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Çalışmalar</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Anlamlı dijital ürünler yaratma tutkumu sergileyen projelerden bir seçki.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.slice(0, 4).map((project) => (
                        <HomeProjectCard key={project._id} project={project} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link href="/portfolio">
                        <Button size="lg">Tüm Çalışmaları Görüntüle</Button>
                    </Link>
                </div>
            </div>
        </section>

      {projects.filter(p => p.location).length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Global Erişim</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Dünyanın dört bir yanından müşteriler ve ekiplerle işbirliği yapıyorum.
              </p>
            </div>
            <div className="relative w-full h-[600px] bg-secondary/30 rounded-lg overflow-hidden shadow-inner">
               <ProjectMap projects={projects.filter(p => p.location)} />
            </div>
          </div>
        </section>
      )}

      <Brands />

      {/* About Me Section */}
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-12 gap-12 items-center mb-16">
                    <div className="md:col-span-5 flex justify-center">
                        <Image
                            src="https://placehold.co/400x400.png"
                            alt="Mustafa Saraçoğlu"
                            width={400}
                            height={400}
                            className="rounded-full object-cover aspect-square"
                            data-ai-hint="portrait man"
                        />
                    </div>
                    <div className="md:col-span-7">
                        <h2 className="font-headline text-4xl md:text-6xl font-bold mb-4">Ben Mustafa Saraçoğlu</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            Benzersiz ve güçlü dijital deneyimler yaratan bir ürün tasarımcısıyım. Karmaşık sorunları çözmekten ve kullanıcılar için hem güzel hem de sezgisel arayüzler oluşturmaktan keyif alıyorum.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 mb-16">
                    <div>
                        <h3 className="font-headline text-3xl font-bold mb-8">Kariyer Yolculuğum</h3>
                        <div className="relative border-l-2 border-primary/20 pl-8 space-y-12">
                            {[...experiences, ...educations].sort((a, b) => parseInt(b.period.slice(0, 4)) - parseInt(a.period.slice(0, 4))).map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-10 h-4 w-4 bg-primary rounded-full top-1"></div>
                                    <p className="font-bold text-primary mb-1">{item.period}</p>
                                    <h4 className="font-headline text-2xl font-bold">{'role' in item ? item.role : item.degree}</h4>
                                    <p className="text-muted-foreground text-lg">{'company' in item ? item.company : item.institution}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-headline text-center text-3xl font-bold mb-8">Yetenekler</h3>
                        <SkillsChart />
                    </div>
                </div>

                <div className="text-center mt-16">
                    <Button size="lg" className="text-lg px-8 py-6">
                        <Download className="mr-2 h-5 w-5"/>
                        Özgeçmişi İndir
                    </Button>
                </div>
            </div>
        </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Referanslar</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Müşterilerim benim hakkımda ne diyor?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-card p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-headline text-xl font-bold">{testimonial.name}</h3>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground'}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Awards Section */}
      {awards.length > 0 && (
          <section className="py-20 bg-background">
              <div className="container mx-auto px-4">
                  <div className="text-center mb-12">
                      <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Ödüller & Başarılar</h2>
                      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                          Tasarım ve mükemmelliğe olan bağlılığımın takdir edildiği anlar.
                      </p>
                  </div>
                  <div className="divide-y divide-border">
                      {awards.map((award) => (
                          <div key={award._id} className="flex flex-col sm:flex-row items-center justify-between p-6 transition-colors hover:bg-card/50">
                             <div className="flex items-center gap-6 mb-4 sm:mb-0">
                                {award.logoUrl && (
                                    <div className="relative w-16 h-16">
                                        <Image src={award.logoUrl} alt={`${award.organization} logo`} fill className="object-contain" />
                                    </div>
                                )}
                               <div>
                                    <h3 className="font-headline text-2xl font-bold">{award.title}</h3>
                                    <p className="text-muted-foreground text-lg">{award.organization}</p>
                               </div>
                             </div>
                              <p className="font-headline text-2xl font-bold text-primary">{award.year}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

       {/* Articles Section */}
       <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                  <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Blogdan Yazılar</h2>
                   <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Tasarım, geliştirme ve yaratıcılık üzerine ekibimden içgörüler.
                    </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recentPosts.map((post) => (
                      <PostCard key={post._id} post={post} />
                  ))}
              </div>
               {recentPosts.length > 0 && (
                <div className="text-center mt-12">
                    <Link href="/blog">
                        <Button size="lg">Tüm Yazıları Görüntüle</Button>
                    </Link>
                </div>
                )}
          </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Sıkça Sorulan Sorular</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Sorularınız mı var? Cevaplarımız var.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Faq items={faqs} />
                </div>
            </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}

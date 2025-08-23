
import Image from 'next/image';
import type { Project } from '@/types';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { PortableTextComponent } from '@/components/PortableTextComponent';
import { Badge } from '@/components/ui/badge';
import { notFound } from 'next/navigation';
// import { client } from '@/lib/sanity';
import { Calendar, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ProjectCard } from '@/components/ProjectCard';
// import imageUrlBuilder from '@sanity/image-url';

// const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  // return builder.image(source);
  return { url: () => source.url || source.asset?.url || '' };
}

interface ProjectPageProps {
  params: { slug: string };
}

const mockProjects: { [key: string]: Project } = {
  'marka-kimligi-yenileme': {
    _id: '1',
    name: 'Marka Kimliği Yenileme',
    slug: 'marka-kimligi-yenileme',
    mainImage: 'https://placehold.co/1200x800.png',
    categories: [{ _id: 'cat1', title: 'Marka Kimliği', slug: 'branding' }],
    client: 'Teknoloji A.Ş.',
    date: '2023-05-15',
    services: ['Logo Tasarımı', 'Kurumsal Kimlik', 'Marka Stratejisi'],
    overview: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Bu projede, Teknoloji A.Ş. için eskiyen marka kimliğini modern ve dinamik bir yapıya kavuşturduk.' }] }
    ],
    challenge: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'En büyük zorluk, markanın köklü geçmişini korurken aynı zamanda yenilikçi ve teknoloji odaklı bir imaj yaratmaktı.' }] }
    ],
    solution: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Kapsamlı bir pazar araştırması ve hedef kitle analizi sonrası, markanın temel değerlerini yansıtan yeni bir logo, renk paleti ve tipografi sistemi geliştirdik.' }] }
    ],
    result: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Yeni kimlik, markanın pazar payını %20 artırdı ve müşteri etkileşimini önemli ölçüde yükseltti.' }] }
    ],
    contentSections: [
      { _type: 'fullWidthImage', _key: 'fw1', image: { _type: 'image', asset: { url: 'https://placehold.co/1200x700.png' } }, alt: 'Proje detayı' },
      { _type: 'twoColumnText', _key: 'tc1', leftContent: [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sol sütun metni burada yer alıyor. Projenin detaylarını ve süreçleri anlatıyoruz.' }] }], rightContent: [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sağ sütun metni de burada. Teknik detaylar veya farklı bir bakış açısı sunabilir.' }] }] },
      { _type: 'imageGallery', _key: 'ig1', images: [
        { _type: 'image', _key: 'img1', asset: { url: 'https://placehold.co/800x600.png' }, caption: 'Galeri görseli 1', alt: 'Galeri 1' },
        { _type: 'image', _key: 'img2', asset: { url: 'https://placehold.co/800x600.png' }, caption: 'Galeri görseli 2', alt: 'Galeri 2' },
      ]}
    ],
    relatedProjects: [
      { _id: '2', name: 'E-Ticaret Sitesi Tasarımı', slug: 'e-ticaret-sitesi-tasarimi', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat2', title: 'Web Tasarımı', slug: 'web-design' }] },
      { _id: '3', name: 'Mobil Uygulama Arayüzü', slug: 'mobil-uygulama-arayuzu', mainImage: 'https://placehold.co/600x400.png', categories: [{ _id: 'cat3', title: 'UI/UX', slug: 'ui-ux' }] },
    ],
    tags: ['branding', 'logo', 'corporate identity'],
    description: [],
  }
};


// GROQ query to get a single project by its slug
async function getProject(slug: string): Promise<Project | null> {
  // const query = `*[_type == "project" && slug.current == $slug][0]{
  //   _id,
  //   name,
  //   "slug": slug.current,
  //   "mainImage": mainImage.asset->url,
  //   "mainImageObject": mainImage,
  //   categories[]->{
  //     _id,
  //     title,
  //     "slug": slug.current
  //   },
  //   client,
  //   date,
  //   services,
  //   overview,
  //   challenge,
  //   solution,
  //   result,
  //   contentSections[]{
  //     ...,
  //     _type == 'imageGallery' => {
  //       'images': images[]{
  //         ...,
  //         'asset': asset->{
  //           url,
  //           'metadata': metadata
  //         }
  //       }
  //     },
  //     _type == 'fullWidthImage' => {
  //       'image': image.asset->{
  //         url,
  //         'metadata': metadata
  //       }
  //     }
  //   },
  //   "relatedProjects": relatedProjects[]->{
  //     _id,
  //     name,
  //     "slug": slug.current,
  //     "mainImage": mainImage.asset->url,
  //     categories[]->{
  //       _id,
  //       title,
  //       "slug": slug.current
  //     }
  //   },
  //   tags
  // }`;
  
  // const project = await client.fetch(query, { slug });
  const project = mockProjects[slug] || null;
  return project;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-16">
    <h2 className="font-headline text-3xl font-bold mb-6 border-l-4 border-primary pl-4">{title}</h2>
    <div className="prose prose-lg max-w-none font-body text-muted-foreground">
      {children}
    </div>
  </div>
);

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return {
    title: `${project.name} | DesignFlow Portfolio`,
    description: `Details about the ${project.name} project.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-background">
      {/* Hero Section */}
      <header className="relative h-[70vh] min-h-[400px] w-full flex items-end p-8 md:p-12 text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.mainImage}
            alt={project.name}
            fill
            style={{objectFit: 'cover'}}
            priority
            data-ai-hint="project showcase"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {project.categories?.map((category) => (
                <Badge key={category._id} variant="secondary" className="text-sm backdrop-blur-sm bg-white/20 border-0">
                  {category.title}
                </Badge>
              ))}
            </div>
            <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight">
              {project.name}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
        
          {/* Project Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-8 border-b">
            <div className="flex items-start gap-3">
              <User className="h-8 w-8 text-primary mt-1" />
              <div>
                <p className="font-bold text-sm text-muted-foreground">Client</p>
                <p className="font-semibold text-lg">{project.client}</p>
              </div>
            </div>
             <div className="flex items-start gap-3">
              <Calendar className="h-8 w-8 text-primary mt-1" />
              <div>
                <p className="font-bold text-sm text-muted-foreground">Date</p>
                <p className="font-semibold text-lg">{project.date ? format(new Date(project.date), 'MMMM yyyy') : 'N/A'}</p>
              </div>
            </div>
             <div className="flex items-start gap-3 col-span-2">
              <Tag className="h-8 w-8 text-primary mt-1" />
              <div>
                <p className="font-bold text-sm text-muted-foreground">Services</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {project.services?.map(s => <p key={s} className="font-semibold text-lg">{s}</p>)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Overview */}
          {project.overview && <Section title="Overview"><PortableText value={project.overview} components={PortableTextComponent} /></Section>}
          {project.challenge && <Section title="The Challenge"><PortableText value={project.challenge} components={PortableTextComponent} /></Section>}
          {project.solution && <Section title="The Solution"><PortableText value={project.solution} components={PortableTextComponent} /></Section>}
          {project.result && <Section title="The Result"><PortableText value={project.result} components={PortableTextComponent} /></Section>}

          {/* Dynamic Content Sections */}
          <div className="space-y-16">
            {project.contentSections?.map((section, index) => {
              const key = `${section._type}-${index}`;
              if (section._type === 'imageGallery' && section.images) {
                return (
                  <div key={key}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {section.images.map((img) => (
                        <figure key={img._key}>
                          <Image src={urlFor(img).width(800).height(600).url()} alt={img.alt || ''} width={800} height={600} className="rounded-lg shadow-lg w-full object-cover" data-ai-hint="portfolio gallery" />
                          {img.caption && <figcaption className="text-center text-sm text-muted-foreground mt-2">{img.caption}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  </div>
                );
              }
              if (section._type === 'fullWidthImage' && section.image) {
                return <Image key={key} src={urlFor(section.image).url()} alt={section.alt || ''} width={1200} height={700} className="rounded-lg shadow-lg w-full object-cover" data-ai-hint="project detail" />;
              }
              if (section._type === 'twoColumnText' && section.leftContent && section.rightContent) {
                return (
                  <div key={key} className="grid md:grid-cols-2 gap-12">
                     <div className="prose prose-lg max-w-none font-body text-muted-foreground"><PortableText value={section.leftContent} components={PortableTextComponent}/></div>
                     <div className="prose prose-lg max-w-none font-body text-muted-foreground"><PortableText value={section.rightContent} components={PortableTextComponent}/></div>
                  </div>
                )
              }
              // Add videoBlock renderer when needed
              return null;
            })}
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <section className="mt-16 border-t pt-8">
              <h3 className="font-headline text-2xl font-bold mb-4">Project Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">{tag}</Badge>
                ))}
              </div>
            </section>
          )}

          {/* Related Projects */}
          {project.relatedProjects && project.relatedProjects.length > 0 && (
            <section className="mt-20 border-t pt-12">
              <h2 className="font-headline text-4xl font-bold text-center mb-12">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.relatedProjects.map((p) => (
                  <ProjectCard key={p._id} project={p as Project} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

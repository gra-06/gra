
'use server';

import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchDocs } from '@/lib/payload';
import type { Brand } from '@/types';


async function getBrands(): Promise<Brand[]> {
    try {
        const brands = await fetchDocs<Brand>('brands', { depth: 1 });
        return brands;
    } catch (error) {
        console.error("Failed to fetch brands:", error);
        return [];
    }
}


export async function Brands() {
    const brands = await getBrands();

    if (brands.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">İşbirliği Yaptığım Markalar</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Harika şirketlerle çalışma ayrıcalığına sahip oldum.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 md:gap-x-20 gap-y-8">
                    {brands.map((brand) => {
                        const BrandLogo = (
                            <div className="relative h-12 w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                                <Image 
                                    src={brand.logo.url}
                                    alt={`${brand.name} logosu`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        );

                        if (brand.website) {
                            return (
                                <Link key={brand.id} href={brand.website} target="_blank" rel="noopener noreferrer" aria-label={brand.name}>
                                    {BrandLogo}
                                </Link>
                            )
                        }

                        return (
                            <div key={brand.id}>
                                {BrandLogo}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

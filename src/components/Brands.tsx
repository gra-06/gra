
'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { client } from '@/lib/sanity';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Brand {
    _id: string;
    name: string;
    logoUrl: string;
    website?: string;
}

async function getBrands(): Promise<Brand[]> {
    // const query = `*[_type == "brand"]{
    //     _id,
    //     name,
    //     "logoUrl": logo.asset->url,
    //     website
    // }`;
    // const brands = await client.fetch(query);
    // return brands;
    return [];
}


export function Brands() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadBrands() {
            try {
                const fetchedBrands = await getBrands();
                setBrands(fetchedBrands);
            } catch (error) {
                console.error("Failed to fetch brands:", error);
            } finally {
                setLoading(false);
            }
        }
        loadBrands();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <Skeleton className="h-10 w-3/4 mx-auto" />
                        <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                           <Skeleton key={i} className="h-12 w-32" />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

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
                                    src={brand.logoUrl}
                                    alt={`${brand.name} logosu`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        );

                        if (brand.website) {
                            return (
                                <Link key={brand._id} href={brand.website} target="_blank" rel="noopener noreferrer" aria-label={brand.name}>
                                    {BrandLogo}
                                </Link>
                            )
                        }

                        return (
                            <div key={brand._id}>
                                {BrandLogo}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

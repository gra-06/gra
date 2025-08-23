import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import type { Project } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        { url: BASE_URL, lastModified: new Date() },
        { url: `${BASE_URL}/about`, lastModified: new Date() },
        { url: `${BASE_URL}/contact`, lastModified: new Date() },
        { url: `${BASE_URL}/portfolio`, lastModified: new Date() },
        { url: `${BASE_URL}/ai-tagger`, lastModified: new Date() },
    ];

    const projectsQuery = `*[_type == "project"]{"slug": slug.current, "lastModified": _updatedAt}`;
    const projects = await client.fetch<{slug: string, lastModified: string}[]>(projectsQuery);

    const projectRoutes = projects.map(project => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: new Date(project.lastModified),
    }));

    return [
        ...staticRoutes,
        ...projectRoutes
    ];
}

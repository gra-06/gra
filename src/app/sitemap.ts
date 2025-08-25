
import { MetadataRoute } from 'next';
import { fetchDocs } from '@/lib/payload';
import type { Project, Post } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        { url: BASE_URL, lastModified: new Date() },
        { url: `${BASE_URL}/about`, lastModified: new Date() },
        { url: `${BASE_URL}/contact`, lastModified: new Date() },
        { url: `${BASE_URL}/portfolio`, lastModified: new Date() },
        { url: `${BASE_URL}/blog`, lastModified: new Date() },
        { url: `${BASE_URL}/ai-tagger`, lastModified: new Date() },
    ];

    const projects = await fetchDocs<Project>('projects');
    const projectRoutes = projects.map(project => ({
        url: `${BASE_URL}/projects/${project.slug}`,
        lastModified: new Date(project.updatedAt),
    }));

    const posts = await fetchDocs<Post>('posts');
    const postRoutes = posts.map(post => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
    }));

    return [
        ...staticRoutes,
        ...projectRoutes,
        ...postRoutes
    ];
}

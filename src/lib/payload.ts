
import type { Query } from 'payload/types';

const API_URL = process.env.PAYLOAD_API_URL;

if (!API_URL) {
    throw new Error('PAYLOAD_API_URL environment variable is not set');
}

type FetchDocsOptions = {
    limit?: number;
    depth?: number;
    sort?: string;
    where?: Query['where'];
}

export async function fetchDocs<T>(collection: string, options: FetchDocsOptions = {}): Promise<T[]> {
    const { limit = 10, depth = 0, sort = '-createdAt', where } = options;

    const params = new URLSearchParams({
        limit: limit.toString(),
        depth: depth.toString(),
        sort,
    });
    
    if (where) {
        params.append('where', JSON.stringify(where));
    }

    try {
        const response = await fetch(`${API_URL}/api/${collection}?${params.toString()}`);
        
        if (!response.ok) {
            console.warn(`Failed to fetch ${collection}: ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        return data.docs;
    } catch (error) {
        console.error(`Error fetching ${collection}:`, error);
        return [];
    }
}

type FetchDocOptions = {
    collection: string;
    id?: string;
    slug?: string;
    depth?: number;
}

export async function fetchDoc<T>({ collection, id, slug, depth = 0 }: FetchDocOptions): Promise<T | null> {
    if (!id && !slug) {
        throw new Error('Either id or slug must be provided to fetch a single document.');
    }

    const whereClause: Query['where'] = {};
    if (id) {
        whereClause.id = { equals: id };
    } else if (slug) {
        whereClause.slug = { equals: slug };
    }
    
    const docs = await fetchDocs<T>(collection, { limit: 1, depth, where: whereClause });
    
    if (!docs || docs.length === 0) {
        // This will be caught by getStaticPaths and result in a 404
        console.error(`Document not found in ${collection} with ${id ? `id ${id}`: `slug ${slug}`}`);
        return null;
    }

    return docs[0];
}

export async function fetchGlobal<T>(slug: string, options: { depth?: number } = {}): Promise<T | null> {
    const { depth = 0 } = options;
    const params = new URLSearchParams({
        depth: depth.toString(),
    });

    try {
        const response = await fetch(`${API_URL}/api/globals/${slug}?${params.toString()}`);

        if (!response.ok) {
            console.warn(`Failed to fetch global ${slug}: ${response.statusText}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching global ${slug}:`, error);
        return null;
    }
}

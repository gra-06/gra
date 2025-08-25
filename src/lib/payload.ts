
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

    const response = await fetch(`${API_URL}/api/${collection}?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch ${collection}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs;
}

type FetchDocOptions = {
    collection: string;
    id?: string;
    slug?: string;
    depth?: number;
}

export async function fetchDoc<T>({ collection, id, slug, depth = 0 }: FetchDocOptions): Promise<T> {
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
        throw new Error(`Document not found in ${collection} with ${id ? `id ${id}`: `slug ${slug}`}`);
    }

    return docs[0];
}

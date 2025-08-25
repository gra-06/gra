
import type { Badge } from '@/types';
import { fetchDocs } from './payload';

// This function can be cached
export async function getBadges(): Promise<Badge[]> {
    try {
        const badges = await fetchDocs<Badge>('badges');
        return badges;
    } catch (error) {
        console.error("Error fetching badges:", error);
        return [];
    }
}

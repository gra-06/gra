
// import { client } from '@/lib/sanity';
import type { Badge } from '@/types';

// This function can be cached
export async function getBadges(): Promise<Badge[]> {
  // const query = `*[_type == "badge"] | order(count asc){
  //   _id,
  //   _type,
  //   name,
  //   description,
  //   icon,
  //   event,
  //   count,
  //   secret
  // }`;
  // const badges = await client.fetch(query);
  // return badges;
  return []; // Return empty array until new CMS is connected
}

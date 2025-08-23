import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2023-05-03';

if (!projectId) {
  throw new Error('The `NEXT_PUBLIC_SANITY_PROJECT_ID` environment variable is not set.');
}
if (!dataset) {
  throw new Error('The `NEXT_PUBLIC_SANITY_DATASET` environment variable is not set.');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

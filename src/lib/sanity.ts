import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = '2023-05-03';

if (!projectId || projectId === 'YOUR_SANITY_PROJECT_ID') {
  throw new Error('The `NEXT_PUBLIC_SANITY_PROJECT_ID` environment variable is not set or needs to be replaced with your actual project ID in .env.local.');
}
if (!dataset || dataset === 'YOUR_SANITY_DATASET') {
  throw new Error('The `NEXT_PUBLIC_SANITY_DATASET` environment variable is not set or needs to be replaced with your actual dataset name in .env.local.');
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

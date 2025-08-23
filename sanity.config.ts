/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/lib/sanity'
import category from './src/sanity/schemas/category'
import project from './src/sanity/schemas/project'
import portableText from './src/sanity/schemas/portableText'
import homepage from './src/sanity/schemas/homepage'
import service from './src/sanity/schemas/service'
import siteSettings from './src/sanity/schemas/siteSettings'
import caseStudyEntry from './src/sanity/schemas/objects/caseStudyEntry'
import imageGallery from './src/sanity/schemas/objects/imageGallery'
import fullWidthImage from './src/sanity/schemas/objects/fullWidthImage'
import twoColumnText from './src/sanity/schemas/objects/twoColumnText'
import videoBlock from './src/sanity/schemas/objects/videoBlock'


const schemas = [
  project,
  category,
  portableText,
  homepage,
  service,
  siteSettings,
  caseStudyEntry,
  imageGallery,
  fullWidthImage,
  twoColumnText,
  videoBlock
]

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './src/sanity/schemas' folder
  schema: {
    types: schemas,
  },
  plugins: [
    structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})

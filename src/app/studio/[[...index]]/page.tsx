// src/app/studio/[[...index]]/page.tsx

'use client'

/**
 * This route is responsible for the built-in authoring environment for Sanity.
 * The path is a catch-all route so that routing in the Studio works correctly.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

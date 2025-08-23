
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'date',
        title: 'Project Date',
        type: 'date',
    }),
    defineField({
        name: 'client',
        title: 'Client',
        type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'overview',
        title: 'Project Overview',
        type: 'portableText',
    }),
    defineField({
        name: 'challenge',
        title: 'The Challenge',
        type: 'portableText',
    }),
    defineField({
        name: 'solution',
        title: 'The Solution',
        type: 'portableText',
    }),
    defineField({
        name: 'result',
        title: 'The Result',
        type: 'portableText',
    }),
    defineField({
        name: 'caseStudy',
        title: 'Case Study / Timeline',
        type: 'array',
        of: [{ type: 'caseStudyEntry' }],
    }),
    defineField({
        name: 'contentSections',
        title: 'Content Sections',
        type: 'array',
        of: [
            { type: 'imageGallery' },
            { type: 'fullWidthImage' },
            { type: 'twoColumnText' },
            { type: 'videoBlock' },
        ],
    }),
     defineField({
      name: 'relatedProjects',
      title: 'Related Projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'client',
      media: 'mainImage',
    },
  },
});

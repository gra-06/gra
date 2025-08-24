

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'portableText',
        }),
        defineField({
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
            name: 'buttons',
            title: 'Buttons',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'text', title: 'Button Text', type: 'string' }),
                    defineField({ name: 'url', title: 'Button URL', type: 'string' }),
                ]
            }]
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'platform', title: 'Platform (e.g., behance, dribbble, linkedin)', type: 'string' }),
                        defineField({ name: 'url', title: 'URL', type: 'url' }),
                    ],
                },
            ],
        }),
      ],
    }),
    defineField({
        name: 'aboutSection',
        title: 'About Section',
        type: 'object',
        fields: [
            defineField({ name: 'title', title: 'Title', type: 'string'}),
            defineField({ name: 'content', title: 'Content', type: 'portableText'})
        ]
    }),
    defineField({
        name: 'servicesSection',
        title: 'Services Section',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'service' } }],
    }),
    defineField({
        name: 'featuredProjects',
        title: 'Featured Projects',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'project' } }],
    }),
    defineField({
        name: 'testimonialsSection',
        title: 'Testimonials Section',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'testimonial' }}]
    })
  ],
  preview: {
    select: {
      title: 'heroSection.title',
    },
  },
});

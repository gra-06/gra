
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
          type: 'string',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
            name: 'backgroundVideo',
            title: 'Background Video',
            type: 'file',
        })
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
        type: 'object',
        fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({
                name: 'servicesList',
                title: 'Services List',
                type: 'array',
                of: [{ type: 'reference', to: { type: 'service' } }],
            })
        ]
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
        of: [
            {
                type: 'object',
                fields: [
                    defineField({ name: 'quote', title: 'Quote', type: 'text'}),
                    defineField({ name: 'author', title: 'Author', type: 'string'}),
                    defineField({ name: 'authorRole', title: 'Author Role', type: 'string'})
                ]
            }
        ]
    })
  ],
  preview: {
    select: {
      title: 'heroSection.title',
    },
  },
});

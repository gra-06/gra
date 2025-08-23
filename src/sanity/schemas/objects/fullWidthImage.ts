
import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'fullWidthImage',
    title: 'Full Width Image',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'alt',
            title: 'Alternative Text',
            type: 'string'
        })
    ]
})


import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'caseStudyEntry',
    title: 'Case Study Entry',
    type: 'object',
    fields: [
        defineField({
            name: 'stage',
            title: 'Stage',
            type: 'string',
            description: 'e.g., Research, Sketching, Final Design',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'portableText',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string'
                }
            ]
        }),
    ]
})

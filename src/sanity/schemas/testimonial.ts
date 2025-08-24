import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role / Company',
            type: 'string',
        }),
        defineField({
            name: 'avatar',
            title: 'Avatar',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'quote',
            title: 'Quote',
            type: 'text',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'rating',
            title: 'Rating',
            type: 'number',
            description: 'A rating from 1 to 5.',
            validation: Rule => Rule.required().min(1).max(5),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'avatar',
        },
    },
});

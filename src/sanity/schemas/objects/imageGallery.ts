
import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'imageGallery',
    title: 'Image Gallery',
    type: 'object',
    fields: [
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ 
                type: 'image',
                options: { hotspot: true },
                fields: [
                    {
                        name: 'caption',
                        title: 'Caption',
                        type: 'string',
                    },
                    {
                        name: 'alt',
                        title: 'Alternative Text',
                        type: 'string'
                    }
                ]
            }]
        })
    ]
})

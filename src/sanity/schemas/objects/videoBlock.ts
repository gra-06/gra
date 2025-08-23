
import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'videoBlock',
    title: 'Video Block',
    type: 'object',
    fields: [
        defineField({
            name: 'videoFile',
            title: 'Video File',
            type: 'file',
            options: {
                accept: 'video/*'
            }
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string'
        })
    ]
})

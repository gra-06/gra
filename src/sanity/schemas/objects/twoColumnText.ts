
import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'twoColumnText',
    title: 'Two Column Text',
    type: 'object',
    fields: [
        defineField({
            name: 'leftContent',
            title: 'Left Column Content',
            type: 'portableText'
        }),
        defineField({
            name: 'rightContent',
            title: 'Right Column Content',
            type: 'portableText'
        })
    ]
})

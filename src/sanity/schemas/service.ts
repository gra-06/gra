
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
    }),
    defineField({
        name: 'icon',
        title: 'Icon',
        type: 'image',
    })
  ],
});

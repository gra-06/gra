import { defineField, defineType } from 'sanity';
import { MessageSquare } from 'lucide-react';

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: MessageSquare,
  fields: [
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{ type: 'project' }],
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
      readOnly: true,
    }),
    defineField({
      name: 'isApproved',
      title: 'Approved',
      type: 'boolean',
      description: 'Comments will not be shown on the site until they are approved.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      project: 'project.name',
      author: 'author',
      content: 'content',
      isApproved: 'isApproved',
    },
    prepare({ project, author, content, isApproved }) {
      return {
        title: `${author} on ${project}`,
        subtitle: content,
        media: <span style={{ fontSize: '1.5rem' }}>{isApproved ? '✅' : 'PENDING'}</span>,
      };
    },
  },
  initialValue: {
    isApproved: false,
  },
});

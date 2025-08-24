
import { defineField, defineType } from 'sanity';
import { Award } from 'lucide-react';

const eventTypes = [
    { title: 'Project Visit', value: 'PROJECT_VISIT' },
    { title: 'Blog Post Visit', value: 'POST_VISIT' },
    { title: 'Chat with AI', value: 'CHAT_WITH_AI' },
    { title: 'Page View', value: 'PAGE_VIEW' },
]

export default defineType({
  name: 'badge',
  title: 'Badge',
  type: 'document',
  icon: Award,
  fields: [
    defineField({
      name: 'name',
      title: 'Badge Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'How is this badge earned?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'icon',
        title: 'Icon Name',
        type: 'string',
        description: 'Lucide-React icon name (e.g., "Award", "BookOpen", "MessageSquare").',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'event',
        title: 'Trigger Event',
        type: 'string',
        options: {
            list: eventTypes,
            layout: 'radio',
        },
        description: 'The user action that contributes to earning this badge.',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'count',
        title: 'Required Count',
        type: 'number',
        description: 'How many times must the event occur to earn the badge?',
        initialValue: 1,
        validation: (Rule) => Rule.required().min(1),
    }),
     defineField({
      name: 'secret',
      title: 'Secret Badge',
      type: 'boolean',
      description: 'If true, this badge will not be shown in the list of badges until it is earned.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      icon: 'icon',
      event: 'event',
      count: 'count'
    },
    prepare({ title, subtitle, icon, event, count }) {
      const eventTitle = eventTypes.find(e => e.value === event)?.title || event;
      return {
        title: title,
        subtitle: `${subtitle} (${eventTitle} x${count})`,
        media: Award // You can dynamically select icons later if needed
      }
    }
  },
});

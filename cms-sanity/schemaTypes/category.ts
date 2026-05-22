// schemas/category.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'An integer to determine the display order (e.g., 1 for first, 2 for second, etc.)',
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'E.g., "Laptops", "Gaming"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL routing category parameter',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Subtext (e.g., "MacBooks, Gaming & Ultrabooks")',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon tag (e.g., "laptop", "phone", "headphones")',
    }),
    defineField({
      name: 'brandColor',
      title: 'Brand Color',
      type: 'string',
      description: 'Optional styling code (e.g., hex code or Tailwind class name)',
    }),
  ],
})
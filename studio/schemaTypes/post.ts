import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Стаття блогу',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Дата публікації',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категорія',
      type: 'string',
      options: {
        list: [
          { title: 'Новини', value: 'Новини' },
          { title: 'Аналітика', value: 'Аналітика' },
          { title: 'Наші проекти', value: 'Наші проекти' },
          { title: 'Перевезення', value: 'Перевезення' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Короткий опис',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: 'mainImage',
      title: 'Головне зображення',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Текст статті',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Звичайний текст', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Цитата', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Дата (нові спочатку)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
});

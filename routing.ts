import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['uk', 'ru', 'en'] as const,
  defaultLocale: 'uk',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];

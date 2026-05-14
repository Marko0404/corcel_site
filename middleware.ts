import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

const routing = defineRouting({
  locales: ['uk', 'ru', 'en'],
  defaultLocale: 'uk',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};

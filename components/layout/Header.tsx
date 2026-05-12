'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Globe } from 'lucide-react';

const localeLabels: Record<string, string> = { uk: 'UA', ru: 'RU', en: 'EN' };

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { href: `/${locale}#services`, label: t('services') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}#calculator`, label: t('calculator') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const otherLocales = ['uk', 'ru', 'en'].filter((l) => l !== locale);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Corcel"
              width={140}
              height={48}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1 text-xs font-medium">
              <Globe size={14} className="text-gray-400" />
              {otherLocales.map((l) => (
                <Link
                  key={l}
                  href={l === 'uk' ? '/' : `/${l}`}
                  className="px-1.5 py-0.5 rounded text-gray-500 hover:text-brand-red transition-colors"
                >
                  {localeLabels[l]}
                </Link>
              ))}
              <span className="px-1.5 py-0.5 rounded bg-brand-red text-white">
                {localeLabels[locale]}
              </span>
            </div>
            <Link
              href={`/${locale}#calculator`}
              className="bg-brand-red text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              {t('cta')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 text-xs font-medium pt-2 border-t border-gray-100">
            {['uk', 'ru', 'en'].map((l) => (
              <Link
                key={l}
                href={l === 'uk' ? '/' : `/${l}`}
                className={`px-2 py-1 rounded ${l === locale ? 'bg-brand-red text-white' : 'text-gray-500'}`}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}#calculator`}
            className="bg-brand-red text-white px-5 py-3 rounded-full text-sm font-semibold text-center"
            onClick={() => setOpen(false)}
          >
            {t('cta')}
          </Link>
        </div>
      )}
    </header>
  );
}

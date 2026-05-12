'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

const localeLabels: Record<string, string> = { uk: 'UA', ru: 'RU', en: 'EN' };

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const localeHref = (l: string) => (l === 'uk' ? '/' : `/${l}`);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link href={localeHref(locale)} className="logo">
          <Image src="/images/logo.png" alt="Corcel" width={120} height={40} style={{ height: 32, width: 'auto' }} />
        </Link>

        <div className="nav-links">
          <a href="#services">{t('services')}</a>
          <a href="#calculator">{t('calc')}</a>
          <a href="#routes">{t('routes')}</a>
          <a href="#offices">{t('offices')}</a>
          <a href="#contact">{t('contact')}</a>
        </div>

        <div className="nav-cta">
          <div className="lang">
            {(['uk', 'ru', 'en'] as const).map((l) => (
              <Link key={l} href={localeHref(l)}>
                <button className={l === locale ? 'active' : ''}>{localeLabels[l]}</button>
              </Link>
            ))}
          </div>
          <a href="#contact" className="btn btn-primary">
            <span>{t('cta')}</span> <span className="arr">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

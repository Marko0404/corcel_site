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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const localeHref = (l: string) => (l === 'uk' ? '/' : `/${l}`);
  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href={localeHref(locale)} className="logo" onClick={close}>
            <Image src="/images/logo.png" alt="Corcel" width={120} height={40} style={{ height: 32, width: 'auto' }} />
          </Link>

          <div className="nav-links">
            <a href="#services">{t('services')}</a>
            <a href="#calculator">{t('calc')}</a>
            <Link href={`/${locale}/blog`}>{t('blog')}</Link>
            <a href="#contact">{t('contact')}</a>
            <Link href={`/${locale}/career`}>{t('career')}</Link>
          </div>

          <div className="nav-cta">
            <div className="lang">
              {(['uk', 'ru', 'en'] as const).map((l) => (
                <Link key={l} href={localeHref(l)}>
                  <button className={l === locale ? 'active' : ''}>{localeLabels[l]}</button>
                </Link>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary nav-order-btn">
              <span>{t('cta')}</span> <span className="arr">→</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mob-menu" onClick={close}>
          <div className="mob-menu-inner" onClick={(e) => e.stopPropagation()}>
            <div className="mob-menu-head">
              <Link href={localeHref(locale)} className="logo" onClick={close}>
                <Image src="/images/logo.png" alt="Corcel" width={100} height={34} style={{ height: 28, width: 'auto' }} />
              </Link>
              <button className="burger open" onClick={close} aria-label="Закрити">
                <span /><span /><span />
              </button>
            </div>
            <nav className="mob-nav">
              <a href="#services" onClick={close}>{t('services')}</a>
              <a href="#calculator" onClick={close}>{t('calc')}</a>
              <Link href={`/${locale}/blog`} onClick={close}>{t('blog')}</Link>
              <a href="#contact" onClick={close}>{t('contact')}</a>
              <Link href={`/${locale}/career`} onClick={close}>{t('career')}</Link>
            </nav>
            <div className="mob-menu-foot">
              <div className="lang">
                {(['uk', 'ru', 'en'] as const).map((l) => (
                  <Link key={l} href={localeHref(l)} onClick={close}>
                    <button className={l === locale ? 'active' : ''}>{localeLabels[l]}</button>
                  </Link>
                ))}
              </div>
              <a href="#contact" className="btn btn-primary" onClick={close} style={{ width: '100%', justifyContent: 'center' }}>
                <span>{t('cta')}</span> <span className="arr">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

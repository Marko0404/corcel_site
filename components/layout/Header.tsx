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
              <div className="mob-social">
                <a href="https://www.instagram.com/corcel.group/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/CorcelLLC" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/corcel-llc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                  </svg>
                </a>
                <a href="https://t.me/corcelgroup" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <path d="M21.2 4.8L2.8 11.5c-.7.3-.7 1.1 0 1.4l4.4 1.5 1.9 5.7c.2.6 1 .8 1.5.4l2.8-2.3 4.2 3.1c.6.4 1.4.1 1.6-.6l3-14.3c.2-.9-.6-1.7-1.5-1.6z"/><path d="M7.2 14.4l9-6.4"/>
                  </svg>
                </a>
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

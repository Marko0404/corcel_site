'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <>
      <header className="hero">
        <div className="hero-deco">
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          <div className="road" />
        </div>
        <div className="truck">
          <Image src="/images/truck.png" alt="Corcel truck" width={820} height={460} priority />
        </div>
        <div className="hero-inner">
          <div className="eyebrow">
            <span className="dot" />
            <span>{t('eyebrow')}</span>
          </div>
          <h1 className="h1">
            <span className="word"><span>{t('t1')}</span></span><br />
            <span className="word"><span>{t('t2')}</span></span><br />
            <span className="word"><span className="accent">{t('t3')}</span></span>
          </h1>
          <p className="hero-sub">{t('sub')}</p>
          <div className="hero-cta">
            <a href="#calculator" className="btn btn-primary">
              <span>{t('cta1')}</span> <span className="arr">→</span>
            </a>
            <a href="#services" className="btn btn-outline">{t('cta2')}</a>
            <a href="tel:+380443333228" className="btn btn-outline btn-call">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{t('callNow')}</span>
            </a>
          </div>
          <form className="track" onSubmit={(e) => e.preventDefault()}>
            <div className="track-label">{t('track')}</div>
            <input type="text" placeholder="CRCL-2026-…" maxLength={24} />
            <button type="submit" className="btn btn-primary">
              <span>{t('trackBtn')}</span>
            </button>
          </form>
        </div>
      </header>

      <div className="marquee">
        <div className="marquee-track">
          <span>
            Київ <i>●</i> Львів <i>●</i> Одеса <i>●</i> Варшава <i>●</i> Гданськ <i>●</i> Мадрид <i>●</i> Гамбург <i>●</i> Роттердам <i>●</i> Стамбул <i>●</i> Шанхай <i>●</i> Дубай <i>●</i> Алмати <i>●</i>&nbsp;
          </span>
          <span>
            Київ <i>●</i> Львів <i>●</i> Одеса <i>●</i> Варшава <i>●</i> Гданськ <i>●</i> Мадрид <i>●</i> Гамбург <i>●</i> Роттердам <i>●</i> Стамбул <i>●</i> Шанхай <i>●</i> Дубай <i>●</i> Алмати <i>●</i>&nbsp;
          </span>
        </div>
      </div>
    </>
  );
}

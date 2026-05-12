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

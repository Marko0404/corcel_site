'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        io.unobserve(el);
        const dur = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {target >= 1000 ? val.toLocaleString('uk-UA').replace(/,/g, ' ') : val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="s">
      <div className="s-inner">
        <Reveal>
          <div className="s-head">
            <div className="s-eyebrow">{t('eyebrow')}</div>
            <h2 className="s-title" dangerouslySetInnerHTML={{ __html: t('title') }} />
          </div>
        </Reveal>
        <div className="stats">
          <Reveal>
            <div className="stat">
              <div className="stat-num"><Counter target={18} /></div>
              <div className="stat-label">{t('years')}</div>
            </div>
          </Reveal>
          <Reveal delay="d1">
            <div className="stat">
              <div className="stat-num"><Counter target={8} /></div>
              <div className="stat-label">{t('offices')}</div>
            </div>
          </Reveal>
          <Reveal delay="d2">
            <div className="stat">
              <div className="stat-num"><Counter target={20} /><span className="unit">+</span></div>
              <div className="stat-label">{t('countries')}</div>
            </div>
          </Reveal>
          <Reveal delay="d3">
            <div className="stat">
              <div className="stat-num"><Counter target={42000} /></div>
              <div className="stat-label">{t('shipments')}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';

export default async function Services() {
  const [t, locale] = await Promise.all([getTranslations('svc'), getLocale()]);
  const lp = locale === 'uk' ? '' : `/${locale}`;

  return (
    <section className="s" id="services">
      <div className="s-inner">
        <Reveal>
          <div className="s-head">
            <div className="s-eyebrow">{t('eyebrow')}</div>
            <h2 className="s-title">{t('title')}</h2>
            <p className="s-sub">{t('sub')}</p>
          </div>
        </Reveal>
        <div className="services">
          {/* Auto — big dark */}
          <Reveal className="svc-wide">
            <Link className="svc dark" href={`${lp}/services/auto`}>
              <div>
                <div className="svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1.5" y="6.5" width="13" height="9" rx="1"/><path d="M14.5 9.5h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>
                  </svg>
                </div>
                <h3>{t('auto.t')}</h3>
                <p className="svc-meta">{t('auto.d')}</p>
              </div>
              <div className="svc-foot">
                <div className="svc-tags">
                  <span className="svc-tag">FTL</span>
                  <span className="svc-tag">LTL</span>
                  <span className="svc-tag">{t('tag.group')}</span>
                  <span className="svc-tag">Reefer</span>
                </div>
                <span className="svc-link"><span>{t('more')}</span> <span className="arr">→</span></span>
              </div>
            </Link>
          </Reveal>

          {/* Air */}
          <Reveal delay="d1">
            <Link className="svc" href={`${lp}/services/air`}>
              <div>
                <div className="svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12l20-7-7 20-2.5-9.5L2 12z"/>
                  </svg>
                </div>
                <h3>{t('air.t')}</h3>
                <p className="svc-meta">{t('air.d')}</p>
              </div>
              <div className="svc-foot">
                <span className="svc-link"><span>{t('more')}</span> <span className="arr">→</span></span>
              </div>
            </Link>
          </Reveal>

          {/* Sea — big red */}
          <Reveal delay="d2" className="svc-wide">
            <Link className="svc red" href={`${lp}/services/sea`}>
              <div>
                <div className="svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17.5l9-3 9 3"/><path d="M5 14V8l7-3 7 3v6"/><path d="M3 21c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0 3 1.5 4.5 0"/>
                  </svg>
                </div>
                <h3>{t('sea.t')}</h3>
                <p className="svc-meta">{t('sea.d')}</p>
              </div>
              <div className="svc-foot">
                <div className="svc-tags">
                  <span className="svc-tag">20&apos;/40&apos;/HC</span>
                  <span className="svc-tag">{t('tag.group')}</span>
                  <span className="svc-tag">RO-RO</span>
                </div>
                <span className="svc-link"><span>{t('more')}</span> <span className="arr">→</span></span>
              </div>
            </Link>
          </Reveal>

          {/* Rail */}
          <Reveal>
            <Link className="svc" href={`${lp}/services/rail`}>
              <div>
                <div className="svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="3" width="14" height="14" rx="2"/><path d="M5 11h14"/><circle cx="9" cy="14" r=".8" fill="currentColor"/><circle cx="15" cy="14" r=".8" fill="currentColor"/><path d="M7 17l-2 3M17 17l2 3"/>
                  </svg>
                </div>
                <h3>{t('rail.t')}</h3>
                <p className="svc-meta">{t('rail.d')}</p>
              </div>
              <div className="svc-foot">
                <span className="svc-link"><span>{t('more')}</span> <span className="arr">→</span></span>
              </div>
            </Link>
          </Reveal>

          {/* Customs */}
          <Reveal delay="d1">
            <Link className="svc" href={`${lp}/services/cust`}>
              <div>
                <div className="svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"/><path d="M9 12l2 2 4-4"/>
                  </svg>
                </div>
                <h3>{t('cust.t')}</h3>
                <p className="svc-meta">{t('cust.d')}</p>
              </div>
              <div className="svc-foot">
                <span className="svc-link"><span>{t('more')}</span> <span className="arr">→</span></span>
              </div>
            </Link>
          </Reveal>

          {/* Warehouse */}
          <Reveal delay="d2">
            <Link className="svc" href={`${lp}/services/wh`}>
              <div>
                <div className="svc-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10l9-6 9 6v10H3V10z"/><rect x="7" y="13" width="4" height="3"/><rect x="13" y="13" width="4" height="3"/>
                  </svg>
                </div>
                <h3>{t('wh.t')}</h3>
                <p className="svc-meta">{t('wh.d')}</p>
              </div>
              <div className="svc-foot">
                <span className="svc-link"><span>{t('more')}</span> <span className="arr">→</span></span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

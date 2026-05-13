import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';

export default async function Footer() {
  const t = await getTranslations('foot');
  const locale = await getLocale();

  return (
    <footer>
      <div className="foot">
        <div className="foot-brand">
          <Link href={locale === 'uk' ? '/' : `/${locale}`} className="logo">
            <Image src="/images/logo.png" alt="Corcel" width={120} height={40} style={{ height: 32, width: 'auto' }} />
          </Link>
          <p>{t('about')}</p>
          <div className="foot-social">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zm2-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
              </svg>
            </a>
            <a href="https://t.me/corcel_logistics" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.2 4.8L2.8 11.5c-.7.3-.7 1.1 0 1.4l4.4 1.5 1.9 5.7c.2.6 1 .8 1.5.4l2.8-2.3 4.2 3.1c.6.4 1.4.1 1.6-.6l3-14.3c.2-.9-.6-1.7-1.5-1.6z"/><path d="M7.2 14.4l9-6.4"/>
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h5>{t('h.svc')}</h5>
          <ul>
            <li><Link href={`/${locale}/services/auto`}>{t('l.auto')}</Link></li>
            <li><Link href={`/${locale}/services/air`}>{t('l.air')}</Link></li>
            <li><Link href={`/${locale}/services/sea`}>{t('l.sea')}</Link></li>
            <li><Link href={`/${locale}/services/rail`}>{t('l.rail')}</Link></li>
            <li><Link href={`/${locale}/services/cust`}>{t('l.cust')}</Link></li>
            <li><Link href={`/${locale}/services/wh`}>{t('l.wh')}</Link></li>
          </ul>
        </div>

        <div>
          <h5>{t('h.co')}</h5>
          <ul>
            <li><a href="#">{t('l.about')}</a></li>
            <li><Link href={`/${locale}/career`}>{t('l.career')}</Link></li>
            <li><Link href={`/${locale}/blog`}>{t('l.news')}</Link></li>
            <li><Link href={`/${locale}/reviews`}>Відгуки клієнтів</Link></li>
            <li><a href="#">{t('l.docs')}</a></li>
          </ul>
        </div>

        <div>
          <h5>{t('h.contact')}</h5>
          <ul>
            <li><a href="tel:+380443333228">UA +38 044 333 32 28</a></li>
            <li><a href="tel:+34919018115">ES +34 91 901 81 15</a></li>
            <li><a href="tel:+48422036144">PL +48 (42) 203 61 44</a></li>
            <li><a href="mailto:logistic@corcel.com.ua">logistic@corcel.com.ua</a></li>
            <li><a href="#offices">{t('l.addr')}</a></li>
          </ul>
        </div>
      </div>

      <div className="foot-bottom">
        <div>{t('copy')}</div>
        <div>
          <Link href={`/${locale}/privacy`}>{t('privacy')}</Link>
          {' · '}
          <Link href={`/${locale}/offer`}>{t('offer')}</Link>
        </div>
      </div>
    </footer>
  );
}

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
        </div>

        <div>
          <h5>{t('h.svc')}</h5>
          <ul>
            <li><a href="#services">{t('l.auto')}</a></li>
            <li><a href="#services">{t('l.air')}</a></li>
            <li><a href="#services">{t('l.sea')}</a></li>
            <li><a href="#services">{t('l.rail')}</a></li>
            <li><a href="#services">{t('l.cust')}</a></li>
            <li><a href="#services">{t('l.wh')}</a></li>
          </ul>
        </div>

        <div>
          <h5>{t('h.co')}</h5>
          <ul>
            <li><a href="#">{t('l.about')}</a></li>
            <li><Link href={`/${locale}/career`}>{t('l.career')}</Link></li>
            <li><Link href={`/${locale}/blog`}>{t('l.news')}</Link></li>
            <li><a href="#">{t('l.docs')}</a></li>
          </ul>
        </div>

        <div>
          <h5>{t('h.contact')}</h5>
          <ul>
            <li><a href="tel:+380440000000">+380 44 000 00 00</a></li>
            <li><a href="mailto:hello@corcel.com.ua">hello@corcel.com.ua</a></li>
            <li><a href="#offices">{t('l.addr')}</a></li>
          </ul>
        </div>
      </div>

      <div className="foot-bottom">
        <div>{t('copy')}</div>
        <div>{t('policy')}</div>
      </div>
    </footer>
  );
}

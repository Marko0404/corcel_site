import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { Phone, Mail, MapPin } from 'lucide-react';

export default async function Footer() {
  const t = await getTranslations('footer');
  const ts = await getTranslations('services');
  const locale = await getLocale();

  const services = [
    { key: 'auto', slug: 'auto' },
    { key: 'air', slug: 'air' },
    { key: 'sea', slug: 'sea' },
    { key: 'rail', slug: 'rail' },
    { key: 'warehouse', slug: 'warehouse' },
    { key: 'customs', slug: 'customs' },
  ];

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-black text-white tracking-tight">
              <span className="text-brand-red">●</span> Corcel
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-3">{t('tagline')}</p>
            <div className="flex gap-3 mt-5">
              {['F', 'in', 'ig'].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center transition-colors text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">{t('services')}</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {services.map(({ key, slug }) => (
                <li key={key}>
                  <Link href={`/${locale}/services/${slug}`} className="hover:text-white transition-colors">
                    {ts(`${key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">{t('company')}</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t('company')}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-white transition-colors">Блог</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t('contacts')}</Link></li>
              <li><Link href={`/${locale}#calculator`} className="hover:text-white transition-colors">Калькулятор</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">{t('contacts')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 text-brand-red flex-shrink-0" />
                <span>+380 44 000 00 00</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 text-brand-red flex-shrink-0" />
                <span>info@corcel.com.ua</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 text-brand-red flex-shrink-0" />
                <span>Київ · Варшава · Мадрид</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <span>© 2008–2026 Corcel. {t('rights')}.</span>
          <Link href="#" className="hover:text-gray-300 transition-colors">{t('privacy')}</Link>
        </div>
      </div>
    </footer>
  );
}

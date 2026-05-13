import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { routing } from '@/routing';

type Slug = 'auto' | 'air' | 'sea' | 'rail' | 'cust' | 'wh';
const SLUGS: Slug[] = ['auto', 'air', 'sea', 'rail', 'cust', 'wh'];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug }))
  );
}

const DETAILS: Record<Slug, { color: string; tags: string[]; features: string[] }> = {
  auto: {
    color: 'dark',
    tags: ['FTL', 'LTL', 'Збірні', 'Reefer', 'ADR'],
    features: [
      'Власний автопарк: тентовані, рефрижератори, бортові напівпричепи',
      'Збірні (LTL) та повновантажні (FTL) відправлення',
      'Регулярні рейси Україна — ЄС тричі на тиждень',
      'GPS-трекінг та сповіщення на кожному етапі маршруту',
      'Перевезення негабаритних та небезпечних вантажів ADR',
      'Страхування вантажу на весь шлях',
    ],
  },
  air: {
    color: '',
    tags: ['Чартер', 'Express', 'Hand Carry'],
    features: [
      'Доставка термінових вантажів за 2–5 днів по всьому світу',
      'Чартерні рейси під проєктні вантажі будь-якого обсягу',
      'Агентська мережа в 80+ аеропортах світу',
      'Контроль температурного режиму для фармацевтики та продуктів',
      'Відстеження рейсу в реальному часі',
      'Повне митне оформлення в аеропорту',
    ],
  },
  sea: {
    color: 'red',
    tags: ["20'/40'/HC", 'LCL', 'FCL', 'RO-RO'],
    features: [
      'FCL та LCL контейнерні відправлення з усіх українських портів',
      'Прямі контракти з провідними океанськими лініями',
      "Маршрути: Чорне море — Середземномор'я — Азія — Америка",
      'Буккінг та трекінг в єдиному особистому кабінеті',
      'Консолідація збірних вантажів LCL',
      'Страхування вантажу та оформлення коносамента',
    ],
  },
  rail: {
    color: '',
    tags: ['40HC', 'Платформи', 'Повагонні'],
    features: [
      'Контейнерні поїзди Україна — Польща — Китай',
      'Відправлення платформ, вагонів, цистерн',
      'Поєднання залізниці з автодоставкою (мультимодаль)',
      'Транзит через Польщу, Білорусь, Казахстан',
      'Оренда вагонів та платформ',
      'Митне оформлення на кордоні включено',
    ],
  },
  cust: {
    color: '',
    tags: ['ЄС', 'Брокер', 'Ліцензія'],
    features: [
      'Власні митні представництва в Україні, Польщі та Іспанії',
      'Брокерське оформлення імпорту та експорту',
      'Класифікація товарів за УКТЗЕД / HS Code',
      'Отримання дозвільних документів та ліцензій',
      'Повернення ПДВ при експорті',
      'Консультації з митного законодавства ЄС та України',
    ],
  },
  wh: {
    color: '',
    tags: ['Клас A/B', 'Фулфілмент', 'Крос-докінг'],
    features: [
      'Власні склади класу A/B в Україні та Польщі',
      'Відповідальне зберігання з інвентаризацією онлайн',
      'Крос-докінг та перевантаження між транспортними засобами',
      'Фулфілмент для e-commerce: збирання, пакування, відправлення',
      'Температурні зони для продуктів та фармацевтики',
      'WMS-система з доступом замовника 24/7',
    ],
  },
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();

  const t = await getTranslations('svc');
  const tf = await getTranslations('foot');
  const detail = DETAILS[slug as Slug];
  const lp = locale === 'uk' ? '' : `/${locale}`;

  const title = t(`${slug}.t` as Parameters<typeof t>[0]);
  const desc  = t(`${slug}.d` as Parameters<typeof t>[0]);

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section className={`svc-page-hero${detail.color ? ` svc-page-${detail.color}` : ''}`}>
          <div className="s-inner" style={{ paddingTop: 80, paddingBottom: 80 }}>
            <Link href={`${lp}/#services`} className="svc-back">
              ← {t('eyebrow')}
            </Link>
            <h1 className="svc-page-title">{title}</h1>
            <p className="svc-page-sub">{desc}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 24 }}>
              {detail.tags.map((tag) => (
                <span key={tag} className="svc-tag svc-page-tag">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="s">
          <div className="s-inner">
            <h2 className="s-title" style={{ marginBottom: 40 }}>Переваги та можливості</h2>
            <div className="svc-features">
              {detail.features.map((f, i) => (
                <div key={i} className="svc-feature">
                  <div className="svc-feature-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="svc-page-cta">
              <a href={`${lp}/#contact`} className="btn btn-primary">
                <span>Замовити перевезення</span> <span className="arr">→</span>
              </a>
              <a href="tel:+380443333228" className="btn btn-outline btn-call">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+38 044 333 32 28</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

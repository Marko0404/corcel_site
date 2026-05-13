import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function CareerPage() {
  const t = await getTranslations('nav');

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <section className="s">
          <div className="s-inner" style={{ paddingTop: 80, paddingBottom: 80 }}>
            <div className="s-eyebrow">Corcel · {t('career')}</div>
            <h1 className="s-title" style={{ maxWidth: 700 }}>
              Ми шукаємо людей, які рухають вантажі.
            </h1>
            <p className="s-sub" style={{ maxWidth: 560 }}>
              Corcel — це команда логістів, IT-фахівців та менеджерів з 18 офісів по всій Україні та Європі. Якщо ти хочеш будувати логістику майбутнього — напиши нам.
            </p>

            <div className="career-grid">
              {[
                { title: 'Менеджер з міжнародних перевезень', dept: 'Операції', loc: 'Київ / Remote' },
                { title: 'Митний брокер', dept: 'Митниця', loc: 'Київ, Одеса' },
                { title: 'Диспетчер автомобільних перевезень', dept: 'Авто', loc: 'Дніпро, Харків' },
                { title: 'Key Account Manager', dept: 'Продажі', loc: 'Київ / Remote' },
                { title: 'Frontend Developer (Next.js)', dept: 'IT', loc: 'Remote' },
                { title: 'Логіст морських перевезень', dept: 'Море', loc: 'Одеса' },
              ].map((job) => (
                <div key={job.title} className="career-card">
                  <div className="career-dept">{job.dept}</div>
                  <h3 className="career-title">{job.title}</h3>
                  <div className="career-loc">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {job.loc}
                  </div>
                  <a href="mailto:hr@corcel.com.ua" className="btn btn-outline" style={{ marginTop: 16, fontSize: 14, padding: '10px 18px' }}>
                    Відгукнутись →
                  </a>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, padding: '32px', background: 'var(--bg-soft)', borderRadius: 20, maxWidth: 560 }}>
              <p style={{ color: 'var(--muted)', fontSize: 15 }}>
                Не знайшли підходящої вакансії? Надішліть резюме на{' '}
                <a href="mailto:hr@corcel.com.ua" style={{ color: 'var(--red)' }}>hr@corcel.com.ua</a> — ми зберігаємо всі анкети.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

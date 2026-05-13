/* eslint-disable react/no-unescaped-entities */
import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CareerForm from '@/components/career/CareerForm';

export default async function CareerPage() {
  const t = await getTranslations('nav');

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section className="s" style={{ background: 'var(--bg-soft)' }}>
          <div className="s-inner" style={{ paddingTop: 80, paddingBottom: 80 }}>
            <div className="s-eyebrow">Corcel · {t('career')}</div>
            <h1 className="s-title" style={{ maxWidth: 700 }}>
              Ми шукаємо людей, які рухають вантажі.
            </h1>
            <p className="s-sub" style={{ maxWidth: 560 }}>
              Corcel — це команда логістів, IT-фахівців та менеджерів з офісів по всій Україні та Європі. Якщо ти хочеш будувати логістику майбутнього — надсилай заявку.
            </p>
          </div>
        </section>

        {/* Open positions */}
        <section className="s">
          <div className="s-inner" style={{ paddingTop: 64, paddingBottom: 64 }}>
            <h2 className="s-title" style={{ fontSize: 32, marginBottom: 32 }}>Відкриті вакансії</h2>
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application form */}
        <section className="s" id="apply" style={{ background: 'var(--bg-soft)' }}>
          <div className="s-inner" style={{ paddingTop: 64, paddingBottom: 80 }}>
            <div className="career-form-wrap">
              <div className="career-form-header">
                <div className="s-eyebrow">HR · Corcel</div>
                <h2 style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 800, letterSpacing: '-.03em', marginBottom: 12 }}>
                  Надішліть заявку
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6, maxWidth: 460 }}>
                  Заповніть форму і наш HR-менеджер зв'яжеться з вами. Можна прикріпити резюме у форматі PDF або Word.
                </p>
                <div className="career-hr-contact">
                  <div className="career-hr-ico">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em' }}>HR відділ</div>
                    <a href="mailto:logistic@corcel.com.ua" style={{ fontSize: 15, fontWeight: 700, color: 'var(--red)' }}>logistic@corcel.com.ua</a>
                  </div>
                </div>
              </div>

              <CareerForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

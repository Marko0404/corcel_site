/* eslint-disable react/no-unescaped-entities */
import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function AboutPage() {
  const t = await getTranslations('nav');

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        {/* Hero */}
        <section className="s" style={{ background: 'var(--bg-soft)' }}>
          <div className="s-inner" style={{ paddingTop: 80, paddingBottom: 80 }}>
            <div className="s-eyebrow">Corcel · {t('about')}</div>
            <h1 className="s-title" style={{ maxWidth: 760 }}>
              Логістична компанія — 3PL оператор
            </h1>
            <p className="s-sub" style={{ maxWidth: 620 }}>
              З 2008 року надаємо повний комплекс транспортно-логістичних послуг в Україні та Європі.
            </p>
          </div>
        </section>

        {/* Video */}
        <section className="s" style={{ padding: 0 }}>
          <div className="about-video-wrap">
            <iframe
              src="https://www.youtube.com/embed/uQoRpJvK_kM?si=W-zW9oR_LyiXmWjH"
              title="Corcel — логістична компанія"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        {/* Company info */}
        <section className="s">
          <div className="s-inner" style={{ paddingTop: 72, paddingBottom: 72 }}>
            <div className="about-grid">
              <div className="about-text">
                <div className="s-eyebrow">Про нас</div>
                <h2 className="s-title" style={{ fontSize: 'clamp(28px,4vw,44px)', marginBottom: 28 }}>
                  Один з небагатьох українських провайдерів повного циклу
                </h2>
                <p className="about-p">
                  Corcel з 2008 року надає послуги в Україні та Європі, пов'язані з транспортно-логістичним забезпеченням бізнесу наших клієнтів. Головний офіс розташований у Харкові, філії у Києві, Дніпрі та Одесі. З 2015 року ми активно розвиваємо філії в ЄС.
                </p>
                <p className="about-p">
                  Завдяки постійному розвитку на сьогоднішній день ми один з небагатьох українських провайдерів логістичних послуг, що надають повний комплекс послуг. Основна компетенція Corcel — міжнародні перевезення.
                </p>
                <p className="about-p">
                  Ми говоримо українською, польською, англійською та іспанською мовами. За час нашої роботи команда навчилася задовольняти потреби клієнтів злагоджено і планово. Якщо при перевезеннях виникне необхідність спілкування з вашими постачальниками або клієнтами — ніяких проблем з цим не буде.
                </p>
                <p className="about-p">
                  Завдяки тому, що власники компанії беруть безпосередню участь в операційному управлінні, ми завжди гнучкі і по-справжньому уважні до клієнта та пропонованих рішень.
                </p>
              </div>
              <div className="about-stats">
                {[
                  { n: '2008', l: 'Рік заснування' },
                  { n: '6', l: 'Офісів в Україні та Європі' },
                  { n: '40+', l: 'Напрямків перевезень' },
                  { n: '4', l: 'Мови обслуговування' },
                ].map((s) => (
                  <div key={s.n} className="about-stat">
                    <div className="about-stat-n">{s.n}</div>
                    <div className="about-stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services overview */}
        <section className="s" style={{ background: 'var(--bg-soft)' }}>
          <div className="s-inner" style={{ paddingTop: 64, paddingBottom: 64 }}>
            <div className="s-eyebrow">Що ми робимо</div>
            <h2 className="s-title" style={{ fontSize: 'clamp(28px,3vw,40px)', marginBottom: 40 }}>
              Повний комплекс логістичних послуг
            </h2>
            <div className="about-services">
              {[
                { icon: '🚛', title: 'Автомобільні перевезення', desc: 'FTL та LTL по Україні та Європі' },
                { icon: '✈️', title: 'Авіаперевезення', desc: 'Термінова доставка вантажів по всьому світу' },
                { icon: '🚢', title: 'Морські перевезення', desc: 'FCL та LCL контейнерні перевезення' },
                { icon: '🚂', title: 'Залізничні перевезення', desc: 'По Україні, СНД та Азії' },
                { icon: '📋', title: 'Митне оформлення', desc: 'Повний супровід на митниці' },
                { icon: '🏭', title: 'Складська логістика', desc: 'Відповідальне зберігання та обробка' },
              ].map((s) => (
                <div key={s.title} className="about-svc">
                  <div className="about-svc-ico">{s.icon}</div>
                  <div className="about-svc-title">{s.title}</div>
                  <div className="about-svc-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

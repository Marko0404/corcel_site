/* eslint-disable react/no-unescaped-entities */
import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function BlogPage() {
  const t = await getTranslations('nav');

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <section className="s">
          <div className="s-inner" style={{ paddingTop: 80, paddingBottom: 80 }}>
            <div className="s-eyebrow">Corcel · {t('blog')}</div>
            <h1 className="s-title">Новини та аналітика</h1>
            <p className="s-sub" style={{ maxWidth: 520 }}>
              Актуальні новини логістичного ринку, зміни митного законодавства та корисні матеріали для імпортерів та експортерів.
            </p>
            <div style={{ marginTop: 64, padding: '48px', background: 'var(--bg-soft)', borderRadius: 24, textAlign: 'center' }}>
              <p style={{ color: 'var(--muted)', fontSize: 16 }}>Статті з'являться найближчим часом.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

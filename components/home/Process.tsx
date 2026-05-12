import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';

export default async function Process() {
  const t = await getTranslations('proc');

  return (
    <section className="s" id="process">
      <div className="s-inner">
        <Reveal>
          <div className="s-head">
            <div className="s-eyebrow">{t('eyebrow')}</div>
            <h2 className="s-title">{t('title')}</h2>
          </div>
        </Reveal>
        <div className="process">
          <Reveal>
            <div className="step">
              <h4>{t('s1.t')}</h4>
              <p>{t('s1.d')}</p>
            </div>
          </Reveal>
          <Reveal delay="d1">
            <div className="step">
              <h4>{t('s2.t')}</h4>
              <p>{t('s2.d')}</p>
            </div>
          </Reveal>
          <Reveal delay="d2">
            <div className="step">
              <h4>{t('s3.t')}</h4>
              <p>{t('s3.d')}</p>
            </div>
          </Reveal>
          <Reveal delay="d3">
            <div className="step">
              <h4>{t('s4.t')}</h4>
              <p>{t('s4.d')}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

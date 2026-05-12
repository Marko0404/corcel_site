import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';

const offices = [
  { cityKey: 'kyiv',    flagColors: ['#005BBB', '#FFD500'],              countryKey: 'ua',  city: 'Київ' },
  { cityKey: 'lviv',    flagColors: ['#005BBB', '#FFD500'],              countryKey: 'ua2', city: 'Львів' },
  { cityKey: 'odesa',   flagColors: ['#005BBB', '#FFD500'],              countryKey: 'ua2', city: 'Одеса' },
  { cityKey: 'dnipro',  flagColors: ['#005BBB', '#FFD500'],              countryKey: 'ua2', city: 'Дніпро' },
  { cityKey: 'kharkiv', flagColors: ['#005BBB', '#FFD500'],              countryKey: 'ua2', city: 'Харків' },
  { cityKey: 'warsaw',  flagColors: ['#fff', '#DC143C'],                 countryKey: 'pl',  city: 'Варшава' },
  { cityKey: 'gdansk',  flagColors: ['#fff', '#DC143C'],                 countryKey: 'pl',  city: 'Гданськ' },
  { cityKey: 'madrid',  flagColors: ['#C60B1E', '#FFC400', '#C60B1E'],   countryKey: 'es',  city: 'Мадрид' },
];

const delays = ['', 'd1', 'd2', 'd3', '', 'd1', 'd2', 'd3'] as const;

export default async function Offices() {
  const t = await getTranslations('off');

  return (
    <section className="s offices-section" id="offices">
      <div className="s-inner">
        <Reveal>
          <div className="s-head">
            <div className="s-eyebrow">{t('eyebrow')}</div>
            <h2 className="s-title">{t('title')}</h2>
            <p className="s-sub">{t('sub')}</p>
          </div>
        </Reveal>
        <div className="offices">
          {offices.map((o, i) => (
            <Reveal key={o.cityKey} delay={delays[i]}>
              <div className="office">
                <div className="office-flag">
                  {o.flagColors.map((c, ci) => (
                    <b key={ci} style={{ background: c }} />
                  ))}
                </div>
                <div className="office-country">{t(o.countryKey as 'ua' | 'ua2' | 'pl' | 'es')}</div>
                <div className="office-city">{o.city}</div>
                <div className="office-addr">{t(`${o.cityKey}.addr` as Parameters<typeof t>[0])}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

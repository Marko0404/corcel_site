import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';

const offices = [
  { cityKey: 'kyiv',    flagColors: ['#005BBB','#FFD500'],            countryKey: 'ua',  city: 'Київ',    addr: 'бульвар Тараса Шевченка, 33Б, 01032' },
  { cityKey: 'dnipro',  flagColors: ['#005BBB','#FFD500'],            countryKey: 'ua2', city: 'Дніпро',  addr: 'вул. Князя Володимира Великого, 7а, оф. 307' },
  { cityKey: 'kharkiv', flagColors: ['#005BBB','#FFD500'],            countryKey: 'ua2', city: 'Харків',  addr: 'пр-т Героїв Харкова, 199, корп. Д-5, оф. 228' },
  { cityKey: 'odesa1',  flagColors: ['#005BBB','#FFD500'],            countryKey: 'ua2', city: 'Одеса',   addr: 'Митна площа, 1а, оф. 211' },
  { cityKey: 'odesa2',  flagColors: ['#005BBB','#FFD500'],            countryKey: 'ua2', city: 'Одеса',   addr: 'вул. Чорноморського козацтва, 44' },
  { cityKey: 'tereszyn',flagColors: ['#fff','#DC143C'],               countryKey: 'pl',  city: 'Терешин', addr: 'Tereszyn 11D, 21-030' },
  { cityKey: 'madrid',  flagColors: ['#C60B1E','#FFC400','#C60B1E'],  countryKey: 'es',  city: 'Мадрид',  addr: 'Calle Santa Hortensia, 48, 2ª, 28002' },
];

const delays = ['', 'd1', 'd2', 'd3', '', 'd1', 'd2'] as const;

const PARTNERS = [
  ['🇨🇳','Китай'],['🇰🇷','Корея'],['🇩🇪','Німеччина'],['🇦🇪','ОАЕ'],['🇺🇸','США'],['🇮🇹','Італія'],
  ['🇨🇿','Чехія'],['🇹🇷','Туреччина'],['🇳🇱','Нідерланди'],['🇫🇷','Франція'],['🇬🇧','Великобританія'],['🇦🇹','Австрія'],
  ['🇧🇪','Бельгія'],['🇨🇦','Канада'],['🇯🇵','Японія'],['🇮🇳','Індія'],['🇰🇿','Казахстан'],['🇸🇬','Сінгапур'],
  ['🇩🇰','Данія'],['🇸🇪','Швеція'],['🇷🇴','Румунія'],['🇭🇺','Угорщина'],
];

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
                <div className="office-addr">{o.addr}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="partners">
            <div className="partners-head">
              <div className="partners-h">{t('partners_t')}</div>
              <div className="partners-s">{t('partners_s')}</div>
            </div>
            <div className="flags">
              {PARTNERS.map(([emoji, name]) => (
                <div className="flag" key={name}>
                  <span className="flag-emoji">{emoji}</span>
                  <span className="flag-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

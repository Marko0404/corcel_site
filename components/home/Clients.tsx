import Image from 'next/image';

const ROW1 = [
  { src: '/images/partners/metro.png',      alt: 'METRO' },
  { src: '/images/partners/fozzy.png',      alt: 'Fozzy Group' },
  { src: '/images/partners/mondelez.png',   alt: 'Mondelez International' },
  { src: '/images/partners/unilever.png',   alt: 'Unilever' },
  { src: '/images/partners/lactalis.png',   alt: 'Lactalis' },
  { src: '/images/partners/interpipe.png',  alt: 'Interpipe' },
  { src: '/images/partners/bacardi.png',    alt: 'Bacardi' },
  { src: '/images/partners/campari.png',    alt: 'Gruppo Campari' },
  { src: '/images/partners/inditex.png',    alt: 'Inditex' },
  { src: '/images/partners/intertop.png',   alt: 'Intertop' },
  { src: '/images/partners/chumak.png',     alt: 'Чумак' },
  { src: '/images/partners/biosphere.png',  alt: 'Biosphere' },
  { src: '/images/partners/silpo.png',      alt: 'Сільпо' },
  { src: '/images/partners/goodwine.png',   alt: 'Good Wine' },
];

const ROW2 = [
  { src: '/images/partners/foodmarket.png', alt: 'Велика Кишеня' },
  { src: '/images/partners/unitec.jpg',     alt: 'Юнітек-Україна' },
  { src: '/images/partners/asta.jpg',       alt: 'АСТА' },
  { src: '/images/partners/invesa.png',     alt: 'Invesa / Livisto' },
  { src: '/images/partners/farmak.png',     alt: 'Фармак' },
  { src: '/images/partners/arterium.png',   alt: 'Arterium' },
  { src: '/images/partners/ninelle.png',    alt: 'Ninelle' },
  { src: '/images/partners/emsa.png',       alt: 'EMSA' },
  { src: '/images/partners/lg_seeds.png',   alt: 'LG Seeds' },
  { src: '/images/partners/ramos.png',      alt: 'ТВК Рамос' },
  { src: '/images/partners/askania.png',    alt: 'Асканія-Пак' },
  { src: '/images/partners/bihive.png',     alt: 'бихайв' },
  { src: '/images/partners/unibep.png',     alt: 'Unibep' },
];

function LogoTrack({ logos, reverse = false }: { logos: typeof ROW1; reverse?: boolean }) {
  const doubled = [...logos, ...logos];
  return (
    <div className="clients-track-wrap">
      <div className={`clients-track${reverse ? ' clients-track-rev' : ''}`}>
        {doubled.map((logo, i) => (
          <div key={i} className="clients-logo">
            <Image src={logo.src} alt={logo.alt} width={140} height={56} style={{ objectFit: 'contain', width: 'auto', height: 40 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section className="clients-section">
      <div className="s-inner" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="clients-head">
          <div className="s-eyebrow">Клієнти · Corcel</div>
          <p className="clients-sub">Нам довіряють провідні українські та міжнародні компанії</p>
        </div>
      </div>
      <div className="clients-rows">
        <LogoTrack logos={ROW1} />
        <LogoTrack logos={ROW2} reverse />
      </div>
    </section>
  );
}

import { getTranslations } from 'next-intl/server';
import Reveal from '@/components/ui/Reveal';

export default async function Routes() {
  const t = await getTranslations('routes');

  return (
    <section className="s" id="routes">
      <div className="s-inner">
        <Reveal>
          <div className="routes-wrap">
            <div className="routes-head">
              <div className="s-eyebrow">{t('eyebrow')}</div>
              <h2 className="s-title">{t('title')}</h2>
              <p className="s-sub">{t('sub')}</p>
            </div>

            {/* SVG Map */}
            <div className="map">
              <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,.08)" />
                  </pattern>
                  <linearGradient id="rline" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E30613" stopOpacity="0" />
                    <stop offset="50%" stopColor="#E30613" stopOpacity=".8" />
                    <stop offset="100%" stopColor="#E30613" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="560" fill="url(#dots)" />
                <path d="M 480 340 Q 250 200 130 380" fill="none" stroke="url(#rline)" strokeWidth="1.5" strokeDasharray="4 6">
                  <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="6s" repeatCount="indefinite" />
                </path>
                <path d="M 480 340 Q 360 250 280 320" fill="none" stroke="url(#rline)" strokeWidth="1.5" strokeDasharray="4 6">
                  <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="8s" repeatCount="indefinite" />
                </path>
                <path d="M 480 340 Q 600 200 760 360" fill="none" stroke="url(#rline)" strokeWidth="1.5" strokeDasharray="4 6">
                  <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="7s" repeatCount="indefinite" />
                </path>
                <path d="M 480 340 Q 700 460 1020 320" fill="none" stroke="url(#rline)" strokeWidth="1.5" strokeDasharray="4 6">
                  <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="9s" repeatCount="indefinite" />
                </path>
              </svg>
              <div className="city" style={{ left: '10%', top: '68%', animationDelay: '.1s' }}>
                <div className="pin" /><div className="name">Мадрид</div>
              </div>
              <div className="city" style={{ left: '24%', top: '58%', animationDelay: '.3s' }}>
                <div className="pin" /><div className="name">Гданськ</div>
              </div>
              <div className="city" style={{ left: '32%', top: '50%', animationDelay: '.4s' }}>
                <div className="pin" /><div className="name">Варшава</div>
              </div>
              <div className="city hq" style={{ left: '40%', top: '60%', animationDelay: '.6s' }}>
                <div className="pin" /><div className="name">Київ · HQ</div>
              </div>
              <div className="city" style={{ left: '55%', top: '64%', animationDelay: '.8s' }}>
                <div className="pin" /><div className="name">Стамбул</div>
              </div>
              <div className="city" style={{ left: '67%', top: '66%', animationDelay: '1.0s' }}>
                <div className="pin" /><div className="name">Дубай</div>
              </div>
              <div className="city" style={{ left: '78%', top: '50%', animationDelay: '1.2s' }}>
                <div className="pin" /><div className="name">Алмати</div>
              </div>
              <div className="city" style={{ left: '88%', top: '58%', animationDelay: '1.4s' }}>
                <div className="pin" /><div className="name">Шанхай</div>
              </div>
            </div>

            <div className="routes-grid">
              <div className="route-stat">
                <div className="n">12<span className="unit">+</span></div>
                <div className="l">{t('s1')}</div>
              </div>
              <div className="route-stat">
                <div className="n">40<span className="unit">+</span></div>
                <div className="l">{t('s2')}</div>
              </div>
              <div className="route-stat">
                <div className="n">6</div>
                <div className="l">{t('s3')}</div>
              </div>
              <div className="route-stat">
                <div className="n">∞</div>
                <div className="l">{t('s4')}</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

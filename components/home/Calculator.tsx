'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

const MODES = [
  { key: 'auto', base: 0.85, eta: 3, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="6.5" width="13" height="9" rx="1"/><path d="M14.5 9.5h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>
    </svg>
  )},
  { key: 'air', base: 3.20, eta: 1, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12l20-7-7 20-2.5-9.5L2 12z"/>
    </svg>
  )},
  { key: 'sea', base: 0.35, eta: 14, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17.5l9-3 9 3"/><path d="M5 14V8l7-3 7 3v6"/>
    </svg>
  )},
  { key: 'rail', base: 0.55, eta: 8, icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="14" rx="2"/><path d="M5 11h14"/>
    </svg>
  )},
];

const FROM_OPTIONS = [
  { label: 'Київ, Україна', dist: 0 },
  { label: 'Львів, Україна', dist: 540 },
  { label: 'Одеса, Україна', dist: 475 },
  { label: 'Варшава, Польща', dist: 1200 },
  { label: 'Гданськ, Польща', dist: 1480 },
  { label: 'Мадрид, Іспанія', dist: 3700 },
];

const TO_OPTIONS = [
  { label: 'Берлін, Німеччина', dist: 1320 },
  { label: 'Гамбург, Німеччина', dist: 1560 },
  { label: 'Роттердам, Нідерланди', dist: 2000 },
  { label: 'Париж, Франція', dist: 2240 },
  { label: 'Стамбул, Туреччина', dist: 1100 },
  { label: 'Дубай, ОАЕ', dist: 3700 },
  { label: 'Шанхай, Китай', dist: 8400 },
];

const URG_MULT = [1.0, 1.2, 1.8];

export default function Calculator() {
  const t = useTranslations('calc');
  const [modeIdx, setModeIdx] = useState(0);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(0);
  const [weight, setWeight] = useState(500);
  const [vol, setVol] = useState(3);
  const [urg, setUrg] = useState(1);
  const [cust, setCust] = useState(180);
  const [ins, setIns] = useState(80);

  const mode = MODES[modeIdx];
  const dist = FROM_OPTIONS[fromIdx].dist + TO_OPTIONS[toIdx].dist;
  const chargeable = Math.max(weight, vol * 167);
  const transport = Math.round(mode.base * chargeable * dist / 100);
  const urgMult = URG_MULT[urg];
  const total = Math.round((transport * urgMult) + cust + ins);
  const eta = Math.ceil(mode.eta * (urg === 2 ? 0.6 : urg === 1 ? 0.85 : 1));

  const urgLabel = urg === 0 ? t('urg.std') : urg === 1 ? t('urg.fast') : t('urg.exp');

  return (
    <section className="s calc-section" id="calculator">
      <div className="s-inner">
        <Reveal>
          <div className="s-head">
            <div className="s-eyebrow">{t('eyebrow')}</div>
            <h2 className="s-title">{t('title')}</h2>
            <p className="s-sub">{t('sub')}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="calc">
            {/* Left: inputs */}
            <div>
              <div className="calc-modes">
                {MODES.map((m, i) => (
                  <button
                    key={m.key}
                    className={`calc-mode${modeIdx === i ? ' active' : ''}`}
                    onClick={() => setModeIdx(i)}
                    type="button"
                  >
                    {m.icon}
                    <span>{t(`m.${m.key}`)}</span>
                  </button>
                ))}
              </div>

              <div className="calc-grid">
                <div className="calc-field">
                  <label>{t('from')}</label>
                  <select value={fromIdx} onChange={(e) => setFromIdx(+e.target.value)}>
                    {FROM_OPTIONS.map((o, i) => (
                      <option key={i} value={i}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="calc-field">
                  <label>{t('to')}</label>
                  <select value={toIdx} onChange={(e) => setToIdx(+e.target.value)}>
                    {TO_OPTIONS.map((o, i) => (
                      <option key={i} value={i}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="calc-field">
                  <label>{t('weight')}</label>
                  <input type="number" value={weight} min={1} max={40000} onChange={(e) => setWeight(+e.target.value)} />
                </div>
                <div className="calc-field">
                  <label>{t('vol')}</label>
                  <input type="number" value={vol} min={0.1} max={200} step={0.1} onChange={(e) => setVol(+e.target.value)} />
                </div>
                <div className="calc-field full calc-slider">
                  <label>{t('urgency')}</label>
                  <input type="range" min={0} max={2} value={urg} onChange={(e) => setUrg(+e.target.value)} />
                  <div className="calc-slider-val">
                    <span>{t('urg.std')}</span>
                    <b>{urgLabel}</b>
                    <span>{t('urg.exp')}</span>
                  </div>
                </div>
                <div className="calc-field">
                  <label>{t('cust')}</label>
                  <select value={cust} onChange={(e) => setCust(+e.target.value)}>
                    <option value={0}>{t('cust_no')}</option>
                    <option value={180}>{t('cust_yes')}</option>
                    <option value={420}>{t('cust_full')}</option>
                  </select>
                </div>
                <div className="calc-field">
                  <label>{t('ins')}</label>
                  <select value={ins} onChange={(e) => setIns(+e.target.value)}>
                    <option value={0}>{t('ins_no')}</option>
                    <option value={80}>{t('ins_std')}</option>
                    <option value={220}>{t('ins_ext')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: result */}
            <div className="calc-result">
              <div>
                <div className="calc-result-label">{t('r.label')}</div>
                <div className="calc-price">
                  <span>{total.toLocaleString()}</span>
                  <span className="cur">€</span>
                </div>
                <div className="calc-breakdown">
                  <div className="calc-row">
                    <span>{t('r.transport')}</span><b>{transport.toLocaleString()} €</b>
                  </div>
                  <div className="calc-row">
                    <span>{t('r.cust')}</span><b>{cust} €</b>
                  </div>
                  <div className="calc-row">
                    <span>{t('r.ins')}</span><b>{ins} €</b>
                  </div>
                  <div className="calc-row">
                    <span>{t('r.urg')}</span><b>×{urgMult.toFixed(1)}</b>
                  </div>
                </div>
              </div>
              <div>
                <div className="calc-eta">
                  <div>
                    <div className="calc-eta-label">{t('r.eta')}</div>
                    <div className="calc-eta-val">
                      {eta} <small style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', fontWeight: 500 }}>{t('r.days')}</small>
                    </div>
                  </div>
                </div>
                <div className="calc-cta">
                  <a href="#contact" className="btn btn-primary">
                    <span>{t('r.cta')}</span> <span className="arr">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

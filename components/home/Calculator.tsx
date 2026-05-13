'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

type ModeKey = 'auto' | 'air' | 'sea' | 'rail';

// Vol coeff (kg per 1 m³), min order €, FTL/FCL cap €
const MODE_CFG: Record<ModeKey, { volCoeff: number; minOrder: number; ftlKey: 'ftlAuto' | 'ftlSea' | 'ftlRail' | null }> = {
  auto: { volCoeff: 333,  minOrder: 300, ftlKey: 'ftlAuto' },
  air:  { volCoeff: 167,  minOrder: 150, ftlKey: null },
  sea:  { volCoeff: 1000, minOrder: 500, ftlKey: 'ftlSea'  },
  rail: { volCoeff: 250,  minOrder: 400, ftlKey: 'ftlRail' },
};

const MODES: Array<{ key: ModeKey; icon: React.ReactNode }> = [
  { key: 'auto', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="6.5" width="13" height="9" rx="1"/><path d="M14.5 9.5h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>
    </svg>
  )},
  { key: 'air', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12l20-7-7 20-2.5-9.5L2 12z"/>
    </svg>
  )},
  { key: 'sea', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17.5l9-3 9 3"/><path d="M5 14V8l7-3 7 3v6"/>
    </svg>
  )},
  { key: 'rail', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="14" rx="2"/><path d="M5 11h14"/>
    </svg>
  )},
];

interface Dest {
  label: string;
  // rate €/kg per mode (sea rate is effectively €/m³ ÷ 1000)
  auto: number; air: number; sea: number; rail: number;
  // caps €
  ftlAuto: number; ftlSea: number; ftlRail: number;
  // ETA days
  etaAuto: number; etaAir: number; etaSea: number; etaRail: number;
}

const FROM = [
  { label: 'Київ, Україна',   mult: 1.00 },
  { label: 'Львів, Україна',  mult: 0.92 },
  { label: 'Одеса, Україна',  mult: 1.00 },
  { label: 'Варшава, Польща', mult: 0.80 },
  { label: 'Гданськ, Польща', mult: 0.82 },
  { label: 'Мадрид, Іспанія', mult: 0.68 },
];

const TO: Dest[] = [
  { label: 'Берлін, Німеччина',
    auto: 0.85, air: 3.50, sea: 0.22, rail: 1.20,
    ftlAuto: 3500, ftlSea: 3500, ftlRail: 3200,
    etaAuto: 5,  etaAir: 2,  etaSea: 13, etaRail: 12 },
  { label: 'Гамбург, Німеччина',
    auto: 0.95, air: 3.80, sea: 0.21, rail: 1.30,
    ftlAuto: 3800, ftlSea: 3500, ftlRail: 3400,
    etaAuto: 6,  etaAir: 2,  etaSea: 14, etaRail: 13 },
  { label: 'Роттердам, Нідерланди',
    auto: 1.05, air: 4.00, sea: 0.20, rail: 1.40,
    ftlAuto: 4000, ftlSea: 3500, ftlRail: 3500,
    etaAuto: 7,  etaAir: 2,  etaSea: 15, etaRail: 14 },
  { label: 'Париж, Франція',
    auto: 1.10, air: 4.20, sea: 0.22, rail: 1.50,
    ftlAuto: 4200, ftlSea: 3800, ftlRail: 3800,
    etaAuto: 7,  etaAir: 2,  etaSea: 16, etaRail: 15 },
  { label: 'Стамбул, Туреччина',
    auto: 0.70, air: 2.80, sea: 0.25, rail: 1.10,
    ftlAuto: 2800, ftlSea: 2500, ftlRail: 2800,
    etaAuto: 4,  etaAir: 2,  etaSea:  8, etaRail:  9 },
  { label: 'Дубай, ОАЕ',
    auto: 4.50, air: 5.50, sea: 0.32, rail: 2.20,
    ftlAuto: 9000, ftlSea: 4500, ftlRail: 5000,
    etaAuto: 18, etaAir: 4,  etaSea: 24, etaRail: 20 },
  { label: 'Шанхай, Китай',
    auto: 7.00, air: 7.50, sea: 0.40, rail: 0.85,
    ftlAuto: 15000, ftlSea: 6000, ftlRail: 4500,
    etaAuto: 35, etaAir: 5,  etaSea: 40, etaRail: 16 },
];

const URG_MULT     = [1.0, 1.25, 1.5];
const URG_ETA_MULT = [1.0, 0.75, 0.55];

function calcTransport(
  modeKey: ModeKey, dest: Dest, fromMult: number,
  weight: number, vol: number,
): { transport: number; isFtl: boolean } {
  const { volCoeff, minOrder, ftlKey } = MODE_CFG[modeKey];
  const rate = dest[modeKey] * fromMult;
  const chargeable = Math.max(weight, vol * volCoeff);
  const raw = chargeable * rate;
  const based = Math.max(minOrder, raw);
  const cap = ftlKey ? dest[ftlKey] * fromMult : Infinity;
  const transport = Math.round(Math.min(cap, based));
  return { transport, isFtl: cap < Infinity && based >= cap };
}

export default function Calculator() {
  const t = useTranslations('calc');
  const [modeIdx, setModeIdx] = useState(0);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx,   setToIdx]   = useState(0);
  const [weight,  setWeight]  = useState(500);
  const [vol,     setVol]     = useState(3);
  const [urg,     setUrg]     = useState(0);
  const [cust,    setCust]    = useState(180);
  const [ins,     setIns]     = useState(80);

  const modeKey = MODES[modeIdx].key;
  const dest    = TO[toIdx];
  const fromMult = FROM[fromIdx].mult;
  const urgMult  = URG_MULT[urg];

  const { transport, isFtl } = calcTransport(modeKey, dest, fromMult, weight, vol);
  const total = Math.round(transport * urgMult + cust + ins);

  const etaBase = dest[`eta${modeKey.charAt(0).toUpperCase() + modeKey.slice(1)}` as keyof Dest] as number;
  const eta = Math.max(1, Math.round(etaBase * URG_ETA_MULT[urg]));

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
                    {FROM.map((o, i) => (
                      <option key={i} value={i}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="calc-field">
                  <label>{t('to')}</label>
                  <select value={toIdx} onChange={(e) => setToIdx(+e.target.value)}>
                    {TO.map((o, i) => (
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
                {isFtl && (
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 4, marginBottom: 8 }}>
                    FTL / FCL rate applied
                  </div>
                )}
                <div className="calc-breakdown">
                  <div className="calc-row">
                    <span>{t('r.transport')}</span><b>{transport.toLocaleString()} €</b>
                  </div>
                  {cust > 0 && (
                    <div className="calc-row">
                      <span>{t('r.cust')}</span><b>{cust} €</b>
                    </div>
                  )}
                  {ins > 0 && (
                    <div className="calc-row">
                      <span>{t('r.ins')}</span><b>{ins} €</b>
                    </div>
                  )}
                  {urg > 0 && (
                    <div className="calc-row">
                      <span>{t('r.urg')}</span><b>×{urgMult.toFixed(2)}</b>
                    </div>
                  )}
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

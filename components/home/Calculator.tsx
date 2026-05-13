'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

type ModeKey = 'auto' | 'air' | 'sea' | 'rail';

// ─── City labels per locale ───────────────────────────────────────────────────
type CityId =
  | 'kyiv' | 'dnipro' | 'warsaw' | 'gdansk' | 'madrid'
  | 'berlin' | 'hamburg' | 'rotterdam' | 'paris' | 'istanbul'
  | 'dubai' | 'almaty' | 'shanghai' | 'guangzhou' | 'seoul'
  | 'newyork' | 'miami';

const CITY_LABELS: Record<CityId, Record<string, string>> = {
  kyiv:       { uk: 'Київ, Україна',          ru: 'Киев, Украина',          en: 'Kyiv, Ukraine' },
  dnipro:     { uk: 'Дніпро, Україна',        ru: 'Днепр, Украина',         en: 'Dnipro, Ukraine' },
  warsaw:     { uk: 'Варшава, Польща',         ru: 'Варшава, Польша',        en: 'Warsaw, Poland' },
  gdansk:     { uk: 'Гданськ, Польща',         ru: 'Гданьск, Польша',        en: 'Gdańsk, Poland' },
  madrid:     { uk: 'Мадрид, Іспанія',         ru: 'Мадрид, Испания',        en: 'Madrid, Spain' },
  berlin:     { uk: 'Берлін, Німеччина',       ru: 'Берлин, Германия',       en: 'Berlin, Germany' },
  hamburg:    { uk: 'Гамбург, Німеччина',      ru: 'Гамбург, Германия',      en: 'Hamburg, Germany' },
  rotterdam:  { uk: 'Роттердам, Нідерланди',  ru: 'Роттердам, Нидерланды',  en: 'Rotterdam, Netherlands' },
  paris:      { uk: 'Париж, Франція',          ru: 'Париж, Франция',         en: 'Paris, France' },
  istanbul:   { uk: 'Стамбул, Туреччина',      ru: 'Стамбул, Турция',        en: 'Istanbul, Turkey' },
  dubai:      { uk: 'Дубай, ОАЕ',             ru: 'Дубай, ОАЭ',             en: 'Dubai, UAE' },
  almaty:     { uk: 'Алмати, Казахстан',       ru: 'Алматы, Казахстан',      en: 'Almaty, Kazakhstan' },
  shanghai:   { uk: 'Шанхай, Китай',           ru: 'Шанхай, Китай',          en: 'Shanghai, China' },
  guangzhou:  { uk: 'Гуанчжоу, Китай',        ru: 'Гуанчжоу, Китай',        en: 'Guangzhou, China' },
  seoul:      { uk: 'Сеул, Корея',             ru: 'Сеул, Корея',            en: 'Seoul, South Korea' },
  newyork:    { uk: 'Нью-Йорк, США',           ru: 'Нью-Йорк, США',          en: 'New York, USA' },
  miami:      { uk: 'Маямі, США',              ru: 'Майами, США',            en: 'Miami, USA' },
};

function cityLabel(id: CityId, locale: string) {
  return CITY_LABELS[id][locale] ?? CITY_LABELS[id]['uk'];
}

// ─── FROM cities (with multiplier relative to Kyiv base) ─────────────────────
const FROM: Array<{ id: CityId; mult: number }> = [
  { id: 'kyiv',      mult: 1.00 },
  { id: 'dnipro',    mult: 0.98 },
  { id: 'warsaw',    mult: 0.80 },
  { id: 'gdansk',    mult: 0.82 },
  { id: 'madrid',    mult: 0.68 },
  { id: 'istanbul',  mult: 0.72 },
  { id: 'shanghai',  mult: 0.70 },
  { id: 'guangzhou', mult: 0.72 },
  { id: 'seoul',     mult: 0.68 },
  { id: 'newyork',   mult: 0.70 },
  { id: 'miami',     mult: 0.68 },
];

// ─── TO cities with rates ─────────────────────────────────────────────────────
// auto  = €/kg base rate (for 501–2500 kg tier)
// air   = €/kg chargeable weight
// seaM3 = €/m³ (LCL)
// rail  = €/kg
// ftlAuto / ftlSea / ftlRail = FCL/FTL cap €
// etaAuto/Air/Sea/Rail = days
interface Dest {
  id: CityId;
  auto: number; air: number; seaM3: number; rail: number;
  ftlAuto: number; ftlSea: number; ftlRail: number;
  etaAuto: number; etaAir: number; etaSea: number; etaRail: number;
}

const TO: Dest[] = [
  { id: 'berlin',    auto: 0.85, air: 3.50, seaM3: 120, rail: 1.20, ftlAuto: 3500, ftlSea: 5000, ftlRail: 3200, etaAuto: 5,  etaAir: 2, etaSea: 13, etaRail: 12 },
  { id: 'hamburg',   auto: 0.95, air: 3.80, seaM3: 110, rail: 1.30, ftlAuto: 3800, ftlSea: 4800, ftlRail: 3400, etaAuto: 6,  etaAir: 2, etaSea: 14, etaRail: 13 },
  { id: 'rotterdam', auto: 1.05, air: 4.00, seaM3: 100, rail: 1.40, ftlAuto: 4000, ftlSea: 4500, ftlRail: 3500, etaAuto: 7,  etaAir: 2, etaSea: 15, etaRail: 14 },
  { id: 'paris',     auto: 1.10, air: 4.20, seaM3: 130, rail: 1.50, ftlAuto: 4200, ftlSea: 5200, ftlRail: 3800, etaAuto: 7,  etaAir: 2, etaSea: 16, etaRail: 15 },
  { id: 'madrid',    auto: 1.25, air: 4.50, seaM3: 140, rail: 1.60, ftlAuto: 4500, ftlSea: 5500, ftlRail: 4000, etaAuto: 8,  etaAir: 2, etaSea: 17, etaRail: 16 },
  { id: 'istanbul',  auto: 0.70, air: 2.80, seaM3:  85, rail: 1.10, ftlAuto: 2800, ftlSea: 3000, ftlRail: 2800, etaAuto: 4,  etaAir: 2, etaSea:  8, etaRail:  9 },
  { id: 'dubai',     auto: 4.50, air: 5.50, seaM3: 180, rail: 2.20, ftlAuto: 9000, ftlSea: 5500, ftlRail: 5000, etaAuto: 18, etaAir: 4, etaSea: 24, etaRail: 20 },
  { id: 'almaty',    auto: 2.80, air: 5.00, seaM3: 160, rail: 0.75, ftlAuto: 7000, ftlSea: 5000, ftlRail: 3800, etaAuto: 10, etaAir: 3, etaSea: 30, etaRail: 10 },
  { id: 'shanghai',  auto: 7.00, air: 7.50, seaM3: 200, rail: 0.85, ftlAuto:15000, ftlSea: 6000, ftlRail: 4500, etaAuto: 35, etaAir: 5, etaSea: 40, etaRail: 16 },
  { id: 'guangzhou', auto: 7.20, air: 7.80, seaM3: 200, rail: 0.88, ftlAuto:15500, ftlSea: 6200, ftlRail: 4600, etaAuto: 36, etaAir: 5, etaSea: 42, etaRail: 17 },
  { id: 'seoul',     auto: 8.00, air: 8.50, seaM3: 220, rail: 0.00, ftlAuto:16000, ftlSea: 7000, ftlRail: 9999, etaAuto: 40, etaAir: 5, etaSea: 45, etaRail: 99 },
  { id: 'newyork',   auto: 0.00, air: 9.50, seaM3: 280, rail: 0.00, ftlAuto:99999, ftlSea: 8000, ftlRail: 9999, etaAuto: 99, etaAir: 7, etaSea: 25, etaRail: 99 },
  { id: 'miami',     auto: 0.00, air:10.00, seaM3: 300, rail: 0.00, ftlAuto:99999, ftlSea: 8500, ftlRail: 9999, etaAuto: 99, etaAir: 7, etaSea: 28, etaRail: 99 },
];

// ─── Tiered auto pricing ──────────────────────────────────────────────────────
// Tiers are relative multipliers to the base 501-2500 kg rate stored in dest.auto
const AUTO_TIERS = [
  { max: 500,   factor: 1.875 },
  { max: 2500,  factor: 1.000 },
  { max: 5000,  factor: 0.750 },
  { max: 10000, factor: 0.563 },
];

function calcAutoTiered(chargeable: number, baseRate: number): number {
  let prevMax = 0;
  let prevFactor = AUTO_TIERS[0].factor;
  for (const tier of AUTO_TIERS) {
    if (chargeable <= tier.max) {
      const price = chargeable * baseRate * tier.factor;
      if (prevMax > 0) {
        // smooth: never cheaper than the top of the previous tier
        return Math.max(price, prevMax * baseRate * prevFactor);
      }
      return price;
    }
    prevMax = tier.max;
    prevFactor = tier.factor;
  }
  return Infinity; // > 10000 kg → will hit FTL cap
}

function calcTransport(
  modeKey: ModeKey, dest: Dest, fromMult: number,
  weight: number, vol: number,
): { transport: number; isFtl: boolean } {
  const fm = fromMult;

  if (modeKey === 'auto') {
    if (dest.auto === 0) return { transport: 0, isFtl: false }; // not available
    const chargeable = Math.max(weight, vol * 333);
    const raw = Math.max(300, calcAutoTiered(chargeable, dest.auto * fm));
    const cap = dest.ftlAuto * fm;
    const transport = Math.round(Math.min(cap, raw));
    return { transport, isFtl: raw >= cap };
  }

  if (modeKey === 'air') {
    const chargeable = Math.max(weight, vol * 167);
    const transport = Math.round(Math.max(150, chargeable * dest.air * fm));
    return { transport, isFtl: false };
  }

  if (modeKey === 'sea') {
    const raw = Math.max(500, vol * dest.seaM3 * fm);
    const cap = dest.ftlSea * fm;
    const transport = Math.round(Math.min(cap, raw));
    return { transport, isFtl: raw >= cap };
  }

  // rail
  if (dest.rail === 0) return { transport: 0, isFtl: false };
  const chargeable = Math.max(weight, vol * 250);
  const raw = Math.max(400, chargeable * dest.rail * fm);
  const cap = dest.ftlRail * fm;
  return { transport: Math.round(Math.min(cap, raw)), isFtl: raw >= cap };
}

// ─── Mode config ──────────────────────────────────────────────────────────────
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

const URG_MULT     = [1.0, 1.25, 1.5];
const URG_ETA_MULT = [1.0, 0.75, 0.55];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Calculator() {
  const t = useTranslations('calc');
  const locale = useLocale();

  const [modeIdx, setModeIdx] = useState(0);
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx,   setToIdx]   = useState(0);
  const [weight,  setWeight]  = useState('500');
  const [vol,     setVol]     = useState('3');
  const [urg,     setUrg]     = useState(0);
  const [cust,    setCust]    = useState(180);
  const [ins,     setIns]     = useState(80);

  const modeKey  = MODES[modeIdx].key;
  const dest     = TO[toIdx];
  const fromMult = FROM[fromIdx].mult;
  const urgMult  = URG_MULT[urg];

  const wNum = Math.max(0, parseFloat(weight) || 0);
  const vNum = Math.max(0, parseFloat(vol)    || 0);

  const { transport, isFtl } = calcTransport(modeKey, dest, fromMult, wNum, vNum);
  const isNA = transport === 0;
  const total = isNA ? 0 : Math.round(transport * urgMult + cust + ins);

  const etaKey = `eta${modeKey.charAt(0).toUpperCase() + modeKey.slice(1)}` as keyof Dest;
  const etaBase = dest[etaKey] as number;
  const eta = isNA ? 0 : Math.max(1, Math.round(etaBase * URG_ETA_MULT[urg]));

  const urgLabel = urg === 0 ? t('urg.std') : urg === 1 ? t('urg.fast') : t('urg.exp');

  function handleNumInput(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void,
  ) {
    const raw = e.target.value;
    // Allow empty or valid number while typing
    if (raw === '' || /^\d*\.?\d*$/.test(raw)) setter(raw);
  }

  function blurNum(
    val: string, setter: (v: string) => void,
    min: number, fallback: string,
  ) {
    const n = parseFloat(val);
    setter(isNaN(n) || n < min ? fallback : String(n));
  }

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
                      <option key={i} value={i}>{cityLabel(o.id, locale)}</option>
                    ))}
                  </select>
                </div>
                <div className="calc-field">
                  <label>{t('to')}</label>
                  <select value={toIdx} onChange={(e) => setToIdx(+e.target.value)}>
                    {TO.map((o, i) => (
                      <option key={i} value={i}>{cityLabel(o.id, locale)}</option>
                    ))}
                  </select>
                </div>
                <div className="calc-field">
                  <label>{t('weight')}</label>
                  <input
                    type="text" inputMode="decimal"
                    value={weight}
                    onChange={(e) => handleNumInput(e, setWeight)}
                    onFocus={(e) => e.target.select()}
                    onBlur={() => blurNum(weight, setWeight, 1, '500')}
                    placeholder="500"
                  />
                </div>
                <div className="calc-field">
                  <label>{t('vol')}</label>
                  <input
                    type="text" inputMode="decimal"
                    value={vol}
                    onChange={(e) => handleNumInput(e, setVol)}
                    onFocus={(e) => e.target.select()}
                    onBlur={() => blurNum(vol, setVol, 0.1, '1')}
                    placeholder="3"
                  />
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
                {isNA ? (
                  <div className="calc-price" style={{ fontSize: 28 }}>
                    <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 18 }}>
                      Маршрут недоступний для цього виду транспорту
                    </span>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
              <div>
                {!isNA && (
                  <div className="calc-eta">
                    <div>
                      <div className="calc-eta-label">{t('r.eta')}</div>
                      <div className="calc-eta-val">
                        {eta} <small style={{ fontSize: 14, color: 'rgba(255,255,255,.55)', fontWeight: 500 }}>{t('r.days')}</small>
                      </div>
                    </div>
                  </div>
                )}
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

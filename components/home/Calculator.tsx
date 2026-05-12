'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const steps = [
  { id: 1, label: 'Маршрут' },
  { id: 2, label: 'Вантаж' },
  { id: 3, label: 'Контакти' },
];

export default function Calculator() {
  const t = useTranslations('calculator');
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    from: '', to: '', service: 'auto',
    type: '', weight: '', volume: '',
    name: '', phone: '', email: '',
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition-all";
  const selectClass = inputClass;

  return (
    <section id="calculator" className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-brand-red text-sm font-bold uppercase tracking-widest mb-3 block">
              Калькулятор
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-4">{t('title')}</h2>
            <p className="text-gray-500 text-lg">{t('subtitle')}</p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border border-green-200 rounded-3xl p-12 text-center"
            >
              <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Заявку отримано!</h3>
              <p className="text-gray-500">Менеджер зв&apos;яжеться з вами протягом 1 години.</p>
            </motion.div>
          ) : (
            <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100">
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {steps.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-4">
                    <button
                      onClick={() => step > s.id && setStep(s.id)}
                      className={`flex items-center gap-2 text-sm font-medium transition-all ${
                        step === s.id ? 'text-brand-red' : step > s.id ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                        step === s.id ? 'border-brand-red bg-brand-red text-white' :
                        step > s.id ? 'border-green-500 bg-green-500 text-white' :
                        'border-gray-300 text-gray-400'
                      }`}>
                        {step > s.id ? '✓' : s.id}
                      </span>
                      <span className="hidden sm:block">{s.label}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <div className={`h-px w-12 transition-colors ${step > s.id ? 'bg-green-400' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('from')}</label>
                        <input className={inputClass} placeholder="Наприклад: Київ, Польща" value={form.from} onChange={(e) => set('from', e.target.value)} required />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('to')}</label>
                        <input className={inputClass} placeholder="Наприклад: Іспанія, Барселона" value={form.to} onChange={(e) => set('to', e.target.value)} required />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('service')}</label>
                      <select className={selectClass} value={form.service} onChange={(e) => set('service', e.target.value)}>
                        <option value="auto">{t('services.auto')}</option>
                        <option value="air">{t('services.air')}</option>
                        <option value="sea">{t('services.sea')}</option>
                        <option value="rail">{t('services.rail')}</option>
                      </select>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="w-full bg-brand-red text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors mt-2">
                      Далі →
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('type')}</label>
                      <input className={inputClass} placeholder="Наприклад: косметика, обладнання, одяг" value={form.type} onChange={(e) => set('type', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('weight')}</label>
                        <input className={inputClass} type="number" placeholder="0" value={form.weight} onChange={(e) => set('weight', e.target.value)} />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('volume')}</label>
                        <input className={inputClass} type="number" placeholder="0.00" step="0.01" value={form.volume} onChange={(e) => set('volume', e.target.value)} />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 rounded-xl font-bold border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors">
                        ← Назад
                      </button>
                      <button type="button" onClick={() => setStep(3)} className="flex-1 bg-brand-red text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors">
                        Далі →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('name')}</label>
                      <input className={inputClass} placeholder="Іван Іванов" value={form.name} onChange={(e) => set('name', e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('phone')}</label>
                        <input className={inputClass} type="tel" placeholder="+380 00 000 0000" value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{t('email')}</label>
                        <input className={inputClass} type="email" placeholder="info@company.ua" value={form.email} onChange={(e) => set('email', e.target.value)} />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 rounded-xl font-bold border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors">
                        ← Назад
                      </button>
                      <button type="submit" className="flex-1 bg-brand-red text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                        <Send size={16} />
                        {t('submit')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Globe, Zap, Headphones } from 'lucide-react';

const icons = [Shield, Globe, Zap, Headphones];
const keys = ['experience', 'global', 'speed', 'support'] as const;

export default function WhyCorcel() {
  const t = useTranslations('why');

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-red text-sm font-bold uppercase tracking-widest mb-3 block">
              Переваги
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">{t('subtitle')}</p>

            {/* Red accent bar */}
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-brand-red rounded-full" />
              <div className="h-1 w-8 bg-brand-red/30 rounded-full" />
              <div className="h-1 w-4 bg-brand-red/15 rounded-full" />
            </div>
          </motion.div>

          {/* Right: cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {keys.map((key, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-brand-red" />
                  </div>
                  <h3 className="font-bold text-brand-dark mb-2">{t(`${key}.title`)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(`${key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

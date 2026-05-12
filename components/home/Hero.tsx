'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-slate-100">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full translate-x-1/2 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-200/50 rounded-full -translate-x-1/3 translate-y-1/4" />
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            {t('badge')}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-brand-dark leading-tight tracking-tight mb-6"
          >
            {t('title').split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'text-brand-red' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={`/${locale}#calculator`}
              className="inline-flex items-center justify-center gap-2 bg-brand-red text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5"
            >
              {t('cta_primary')}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={`/${locale}#services`}
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-dark px-8 py-4 rounded-2xl text-base font-bold border border-gray-200 hover:border-brand-red hover:text-brand-red transition-all"
            >
              {t('cta_secondary')}
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 mt-14 pt-8 border-t border-gray-200"
          >
            {['🇺🇦 Україна', '🇵🇱 Польща', '🇪🇸 Іспанія', '🌍 50+ країн'].map((label) => (
              <span key={label} className="text-sm text-gray-500 font-medium">{label}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
      >
        <span className="text-xs">scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

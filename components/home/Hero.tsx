'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container-custom relative z-10 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[85vh]">

          {/* Left: text */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red text-sm font-semibold px-4 py-2 rounded-full mb-6 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
              {t('badge')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black text-brand-dark leading-tight tracking-tight mb-6"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 max-w-xl mb-10 leading-relaxed"
            >
              {t('subtitle')}
            </motion.p>

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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-gray-100"
            >
              {['🇺🇦 Україна', '🇵🇱 Польща', '🇪🇸 Іспанія', '🌍 50+ країн'].map((label) => (
                <span key={label} className="text-sm text-gray-400 font-medium">{label}</span>
              ))}
            </motion.div>
          </div>

          {/* Right: hero image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Red accent blob behind image */}
            <div className="absolute -right-10 top-10 w-80 h-80 bg-brand-red/8 rounded-full blur-3xl" />
            <div className="absolute -left-5 bottom-10 w-56 h-56 bg-slate-200/60 rounded-full blur-2xl" />

            <div className="relative w-full max-w-xl">
              <Image
                src="/images/hero.png"
                alt="Corcel Logistics — авто, авіа, море"
                width={900}
                height={600}
                className="w-full h-auto object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-300"
      >
        <span className="text-xs">scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}

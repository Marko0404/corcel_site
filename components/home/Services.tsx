'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Truck, Plane, Ship, Train, Warehouse, FileCheck, ArrowRight } from 'lucide-react';

const icons = {
  auto: Truck,
  air: Plane,
  sea: Ship,
  rail: Train,
  warehouse: Warehouse,
  customs: FileCheck,
};

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();

  const services = Object.keys(icons) as Array<keyof typeof icons>;

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-red text-sm font-bold uppercase tracking-widest mb-3 block">
            Послуги
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((key, i) => {
            const Icon = icons[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/${locale}/services/${key}`}
                  className="group block bg-white border border-gray-100 rounded-3xl p-8 hover:border-brand-red hover:shadow-xl hover:shadow-red-50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-6 group-hover:bg-brand-red transition-colors duration-300">
                    <Icon size={26} className="text-brand-red group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-red transition-colors">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {t(`${key}.desc`)}
                  </p>
                  <div className="flex items-center gap-2 text-brand-red text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Детальніше <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

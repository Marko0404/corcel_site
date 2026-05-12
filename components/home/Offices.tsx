'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const officeData = [
  {
    key: 'ukraine',
    flag: '🇺🇦',
    phone: '+380 44 000 00 00',
    email: 'ukraine@corcel.com.ua',
    color: 'from-blue-600 to-yellow-400',
  },
  {
    key: 'poland',
    flag: '🇵🇱',
    phone: '+48 22 000 00 00',
    email: 'poland@corcel.com.ua',
    color: 'from-red-600 to-white',
  },
  {
    key: 'spain',
    flag: '🇪🇸',
    phone: '+34 91 000 00 00',
    email: 'spain@corcel.com.ua',
    color: 'from-red-600 to-yellow-400',
  },
];

export default function Offices() {
  const t = useTranslations('offices');

  return (
    <section className="py-24 bg-brand-navy">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-red text-sm font-bold uppercase tracking-widest mb-3 block">
            Присутність
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{t('title')}</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {officeData.map(({ key, flag, phone, email }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-5xl mb-5">{flag}</div>
              <h3 className="text-xl font-bold text-white mb-1">
                {t(`${key}.city`)}
              </h3>
              <p className="text-gray-400 text-sm mb-6">{t(`${key}.address`)}</p>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-brand-red flex-shrink-0" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="text-brand-red flex-shrink-0" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin size={14} className="text-brand-red flex-shrink-0" />
                  <span>{t(`${key}.address`)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* World coverage note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          + партнерські офіси в 50+ країнах світу
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const mockPosts = [
  {
    slug: 'avtoperevezennya-yevropa-2026',
    category: 'Автоперевезення',
    title: 'Автоперевезення до Європи у 2026 році: що змінилось',
    excerpt: 'Нові митні правила, маршрути та ціни на автодоставку між Україною та ЄС.',
    date: '10 травня 2026',
    readTime: '5 хв',
  },
  {
    slug: 'konteyner-morsky-2026',
    category: 'Морські перевезення',
    title: 'Морські контейнерні перевезення: ставки та терміни',
    excerpt: 'Огляд поточних фрахтових ставок на основних морських маршрутах до та з України.',
    date: '5 травня 2026',
    readTime: '7 хв',
  },
  {
    slug: 'mytne-oformlennya-import',
    category: 'Митні послуги',
    title: 'Митне оформлення імпорту: покроковий гід',
    excerpt: 'Документи, строки, коди УКТ ЗЕД та найпоширеніші помилки при розмитненні.',
    date: '28 квітня 2026',
    readTime: '9 хв',
  },
];

export default function BlogPreview() {
  const t = useTranslations('blog');
  const locale = useLocale();

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <span className="text-brand-red text-sm font-bold uppercase tracking-widest mb-3 block">
              Блог
            </span>
            <h2 className="text-4xl font-black text-brand-dark">{t('title')}</h2>
            <p className="text-gray-500 mt-2">{t('subtitle')}</p>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-2 text-brand-red font-semibold text-sm hover:gap-3 transition-all"
          >
            {t('all_posts')} <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Placeholder image */}
                <div className="h-48 bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center">
                  <span className="text-4xl">
                    {i === 0 ? '🚛' : i === 1 ? '🚢' : '📋'}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-brand-red uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-brand-dark mt-2 mb-3 group-hover:text-brand-red transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{post.date}</span>
                    <span>{post.readTime} читання</span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

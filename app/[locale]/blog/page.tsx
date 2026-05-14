import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getAllPosts } from '@/lib/sanity';
import { BLOG_POSTS } from '@/lib/blog';
import { getLocale } from 'next-intl/server';

const CAT_COLOR: Record<string, string> = {
  'Новини': 'var(--red)',
  'Аналітика': '#2563eb',
  'Наші проекти': '#16a34a',
  'Перевезення': '#7c3aed',
};

export const revalidate = 60;

export default async function BlogPage() {
  const t = await getTranslations('nav');
  const locale = await getLocale();
  const lp = locale === 'uk' ? '' : `/${locale}`;

  const sanityPosts = await getAllPosts().catch(() => []);
  const posts = sanityPosts.length > 0
    ? sanityPosts.map((p) => ({
        slug: p.slug.current,
        title: p.title,
        date: p.publishedAt,
        cat: p.category,
        excerpt: p.excerpt,
      }))
    : BLOG_POSTS;

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <section className="s" style={{ background: 'var(--bg-soft)' }}>
          <div className="s-inner" style={{ paddingTop: 80, paddingBottom: 64 }}>
            <div className="s-eyebrow">Corcel · {t('blog')}</div>
            <h1 className="s-title">Новини та аналітика</h1>
            <p className="s-sub" style={{ maxWidth: 520 }}>
              Актуальні новини ринку, кейси перевезень та корисні матеріали для імпортерів і експортерів.
            </p>
          </div>
        </section>

        <section className="s">
          <div className="s-inner" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="blog-grid">
              {posts.map((post) => (
                <Link key={post.slug} href={`${lp}/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-cat" style={{ color: CAT_COLOR[post.cat] || 'var(--red)' }}>
                    {post.cat}
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-foot">
                    <time className="blog-card-date">
                      {new Date(post.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                    <span className="blog-card-arr">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

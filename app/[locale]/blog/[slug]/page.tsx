import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog';
import { getLocale } from 'next-intl/server';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

const CAT_COLOR: Record<string, string> = {
  'Новини': 'var(--red)',
  'Аналітика': '#2563eb',
  'Наші проекти': '#16a34a',
  'Перевезення': '#7c3aed',
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const locale = await getLocale();
  const lp = locale === 'uk' ? '' : `/${locale}`;

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80 }}>
        <section className="s" style={{ background: 'var(--bg-soft)' }}>
          <div className="s-inner" style={{ paddingTop: 64, paddingBottom: 56 }}>
            <Link href={`${lp}/blog`} className="svc-back">← Всі статті</Link>
            <div className="blog-post-cat" style={{ color: CAT_COLOR[post.cat] || 'var(--red)' }}>
              {post.cat}
            </div>
            <h1 className="blog-post-title">{post.title}</h1>
            <time className="blog-post-date">
              {new Date(post.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>
        </section>

        <section className="s">
          <div className="s-inner" style={{ paddingTop: 56, paddingBottom: 80 }}>
            <div className="blog-post-body">
              {post.content.split('\n').map((para, i) =>
                para.trim() ? <p key={i}>{para}</p> : <br key={i} />
              )}
            </div>

            <div className="svc-page-cta" style={{ marginTop: 56 }}>
              <a href={`${lp}/#contact`} className="btn btn-primary">
                <span>Замовити перевезення</span> <span className="arr">→</span>
              </a>
              <Link href={`${lp}/blog`} className="btn btn-outline">
                ← Всі статті
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

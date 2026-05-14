'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

export default function ContactForm() {
  const t = useTranslations('contact');
  const tf = useTranslations('form');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({ name: '', company: '', phone: '', email: '', service: '', message: '' });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let recaptchaToken = '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gr = (window as any).grecaptcha;
      if (gr) {
        recaptchaToken = await gr.execute('6Lcjv-ksAAAAACV7wxHsiyyHevX0Z8lA2OhSuJYT', { action: 'contact' });
      }
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, recaptchaToken }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="s contact-section" id="contact">
      <div className="s-inner">
        <div className="contact-wrap">
          <Reveal>
            <div className="contact-info">
              <div className="s-eyebrow">{t('eyebrow')}</div>
              <h2 dangerouslySetInnerHTML={{ __html: t('title').replace(' вантаж?', '<br />вантаж?') }} />
              <p>{t('sub')}</p>
              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-item-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-item-l">{t('phone')}</div>
                    <div className="contact-item-v" style={{ lineHeight: 1.6 }}>
                      UA +38 044 333 32 28<br />ES +34 91 901 81 15<br />PL +48 (42) 203 61 44
                    </div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-item-l">{t('email')}</div>
                    <div className="contact-item-v">logistic@corcel.com.ua</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-item-l">{t('hq')}</div>
                    <div className="contact-item-v">{t('hqAddr')}</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item-ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-item-l">{t('hours')}</div>
                    <div className="contact-item-v">{t('hoursV')}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay="d1">
            <form className="form" onSubmit={handleSubmit}>
              {submitted ? (
                <div className="form-ok on">
                  <div className="form-ok-ico">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <h3>{tf('ok.t')}</h3>
                  <p>{tf('ok.d')}</p>
                </div>
              ) : (
                <>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>{tf('name')}</label>
                      <input type="text" required placeholder="Олександр" value={fields.name} onChange={set('name')} />
                    </div>
                    <div className="form-field">
                      <label>{tf('company')}</label>
                      <input type="text" placeholder="ТОВ «...»" value={fields.company} onChange={set('company')} />
                    </div>
                    <div className="form-field">
                      <label>{tf('phone')}</label>
                      <input type="tel" required placeholder="+380 ..." value={fields.phone} onChange={set('phone')} />
                    </div>
                    <div className="form-field">
                      <label>{tf('email')}</label>
                      <input type="email" required placeholder="you@company.com" value={fields.email} onChange={set('email')} />
                    </div>
                    <div className="form-field">
                      <label>{tf('service')}</label>
                      <select value={fields.service} onChange={set('service')}>
                        <option>{tf('svc.auto')}</option>
                        <option>{tf('svc.air')}</option>
                        <option>{tf('svc.sea')}</option>
                        <option>{tf('svc.rail')}</option>
                        <option>{tf('svc.cust')}</option>
                        <option>{tf('svc.wh')}</option>
                      </select>
                    </div>
                    <div className="form-field full">
                      <label>{tf('msg')}</label>
                      <textarea placeholder="..." value={fields.message} onChange={set('message')} />
                    </div>
                  </div>
                  <a className="form-mail" href="tel:+380443333228">
                    <div className="form-mail-ico">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <div className="form-mail-l">
                      <small>{tf('callLabel')}</small>
                      <b>+38 044 333 32 28</b>
                    </div>
                    <span className="arr">→</span>
                  </a>
                  <div className="form-foot">
                    <label className="form-check">
                      <input type="checkbox" required />
                      <span>
                        Натискаючи кнопку, ви погоджуєтесь з{' '}
                        <Link href="/privacy" style={{ color: 'var(--red)', textDecoration: 'underline' }}>політикою конфіденційності</Link>.
                      </span>
                    </label>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      <span>{loading ? '...' : tf('send')}</span> {!loading && <span className="arr">→</span>}
                    </button>
                  </div>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

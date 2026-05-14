'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const POSITIONS = [
  'Менеджер з міжнародних перевезень',
  'Митний брокер',
  'Диспетчер автомобільних перевезень',
  'Key Account Manager',
  'Логіст морських перевезень',
  'Frontend Developer',
  'Інша посада',
];

export default function CareerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setFileName(f ? f.name : '');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.currentTarget;
      const fd = new FormData(form);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gr = (window as any).grecaptcha;
      if (gr) {
        const token = await gr.execute('6Lcjv-ksAAAAACV7wxHsiyyHevX0Z8lA2OhSuJYT', { action: 'career' });
        fd.append('recaptchaToken', token);
      }
      await fetch('/api/career', { method: 'POST', body: fd });
    } catch {}
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="career-form-ok">
        <div className="career-form-ok-ico">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h3>Заявку отримано!</h3>
        <p>Наш HR-менеджер розгляне вашу анкету та зв&apos;яжеться з вами протягом 2–3 робочих днів.</p>
        <a href="mailto:logistic@corcel.com.ua" className="btn btn-outline" style={{ marginTop: 24 }}>
          Написати напряму → logistic@corcel.com.ua
        </a>
      </div>
    );
  }

  return (
    <form className="career-form" onSubmit={handleSubmit}>
      <div className="career-form-grid">
        <div className="form-field">
          <label>Ім&apos;я та прізвище *</label>
          <input type="text" name="name" required placeholder="Олексій Коваленко" />
        </div>
        <div className="form-field">
          <label>Номер телефону *</label>
          <input type="tel" name="phone" required placeholder="+380 ..." />
        </div>
        <div className="form-field">
          <label>Електронна пошта *</label>
          <input type="email" name="email" required placeholder="you@example.com" />
        </div>
        <div className="form-field">
          <label>Бажана посада *</label>
          <select name="position" required defaultValue="">
            <option value="" disabled>Оберіть позицію...</option>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="form-field full">
          <label>Коментар</label>
          <textarea name="comment" placeholder="Розкажіть про свій досвід, очікувану зарплату або задайте питання..." rows={4} />
        </div>
        <div className="form-field full">
          <label>Резюме (CV)</label>
          <div
            className={`career-file-drop${fileName ? ' has-file' : ''}`}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={handleFile}
            />
            <div className="career-file-ico">
              {fileName ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              )}
            </div>
            <div className="career-file-text">
              {fileName
                ? <><strong>{fileName}</strong><span>Натисніть, щоб змінити</span></>
                : <><strong>Завантажте ваше резюме</strong><span>PDF, DOC, DOCX · до 5 МБ</span></>
              }
            </div>
          </div>
        </div>
      </div>

      <div className="career-form-foot">
        <label className="form-check">
          <input type="checkbox" required />
          <span>
            Я погоджуюся з{' '}
            <Link href="/privacy" style={{ color: 'var(--red)' }}>Політикою конфіденційності</Link>
            {' '}та даю згоду на обробку персональних даних відповідно до Закону України №2297-VI.
          </span>
        </label>
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }} disabled={loading}>
          <span>{loading ? '...' : 'Надіслати заявку'}</span> {!loading && <span className="arr">→</span>}
        </button>
      </div>
    </form>
  );
}

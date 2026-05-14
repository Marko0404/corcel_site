import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'logistic@corcel.com.ua';
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET) return true;
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
  });
  const data = await res.json() as { success: boolean; score: number };
  return data.success && data.score >= 0.5;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const name = form.get('name') as string;
    const phone = form.get('phone') as string;
    const email = form.get('email') as string;
    const position = form.get('position') as string;
    const comment = form.get('comment') as string;
    const cvFile = form.get('cv') as File | null;
    const recaptchaToken = form.get('recaptchaToken') as string | null;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (recaptchaToken) {
      const ok = await verifyRecaptcha(recaptchaToken);
      if (!ok) return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 });
    }

    await Promise.allSettled([
      sendTelegram({ name, phone, email, position, comment }, cvFile),
      sendEmail({ name, phone, email, position, comment }, cvFile),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Career API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

async function sendTelegram(
  data: Record<string, string>,
  cvFile: File | null,
) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;

  const text = `👤 *Нова заявка на роботу*\n\n*${data.name}*\n📞 ${data.phone}\n📧 ${data.email}\n💼 ${data.position || '—'}\n💬 ${data.comment || '—'}`;

  if (cvFile && cvFile.size > 0) {
    const fd = new FormData();
    fd.append('chat_id', TG_CHAT_ID);
    fd.append('document', cvFile, cvFile.name);
    fd.append('caption', text);
    fd.append('parse_mode', 'Markdown');
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: fd,
    });
  } else {
    await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'Markdown' }),
    });
  }
}

async function sendEmail(data: Record<string, string>, cvFile: File | null) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const attachments = [];
  if (cvFile && cvFile.size > 0) {
    const buf = await cvFile.arrayBuffer();
    attachments.push({
      filename: cvFile.name,
      content: Buffer.from(buf),
    });
  }

  await resend.emails.send({
    from: 'Сайт Corcel <noreply@corcel.com.ua>',
    to: NOTIFY_EMAIL,
    subject: `Нова заявка на роботу — ${data.name} (${data.position || '—'})`,
    html: `
      <h2>Нова заявка на роботу</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;color:#666">Ім'я</td><td style="padding:8px;font-weight:600">${data.name}</td></tr>
        <tr style="background:#f5f5f7"><td style="padding:8px;color:#666">Телефон</td><td style="padding:8px;font-weight:600">${data.phone}</td></tr>
        <tr><td style="padding:8px;color:#666">Email</td><td style="padding:8px">${data.email}</td></tr>
        <tr style="background:#f5f5f7"><td style="padding:8px;color:#666">Посада</td><td style="padding:8px">${data.position || '—'}</td></tr>
        <tr><td style="padding:8px;color:#666">Коментар</td><td style="padding:8px">${data.comment || '—'}</td></tr>
      </table>
    `,
    attachments,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'logistic@corcel.com.ua';
const TG_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const KEYCRM_API_KEY = process.env.KEYCRM_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, service, message } = body;

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const results = await Promise.allSettled([
      sendEmail({ name, company, phone, email, service, message }),
      sendTelegram({ name, company, phone, email, service, message }),
      createKeyCRMLead({ name, company, phone, email, service, message }),
    ]);

    const errors = results.filter(r => r.status === 'rejected').map(r => (r as PromiseRejectedResult).reason);
    if (errors.length > 0) console.error('Some integrations failed:', errors);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

async function sendEmail(data: Record<string, string>) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Сайт Corcel <noreply@corcel.com.ua>',
    to: NOTIFY_EMAIL,
    subject: `Нова заявка з сайту — ${data.name}`,
    html: `
      <h2>Нова заявка з сайту corcel.com.ua</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;color:#666">Ім'я</td><td style="padding:8px;font-weight:600">${data.name}</td></tr>
        <tr style="background:#f5f5f7"><td style="padding:8px;color:#666">Компанія</td><td style="padding:8px">${data.company || '—'}</td></tr>
        <tr><td style="padding:8px;color:#666">Телефон</td><td style="padding:8px;font-weight:600">${data.phone}</td></tr>
        <tr style="background:#f5f5f7"><td style="padding:8px;color:#666">Email</td><td style="padding:8px">${data.email}</td></tr>
        <tr><td style="padding:8px;color:#666">Послуга</td><td style="padding:8px">${data.service || '—'}</td></tr>
        <tr style="background:#f5f5f7"><td style="padding:8px;color:#666">Повідомлення</td><td style="padding:8px">${data.message || '—'}</td></tr>
      </table>
    `,
  });
}

async function sendTelegram(data: Record<string, string>) {
  if (!TG_BOT_TOKEN || !TG_CHAT_ID) return;
  const text = `🔔 *Нова заявка з сайту*\n\n👤 *${data.name}*${data.company ? ` (${data.company})` : ''}\n📞 ${data.phone}\n📧 ${data.email}\n🚛 ${data.service || '—'}\n💬 ${data.message || '—'}`;
  await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TG_CHAT_ID, text, parse_mode: 'Markdown' }),
  });
}

async function createKeyCRMLead(data: Record<string, string>) {
  if (!KEYCRM_API_KEY) return;
  await fetch('https://openapi.keycrm.app/v1/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KEYCRM_API_KEY}`,
    },
    body: JSON.stringify({
      full_name: data.name,
      phone: data.phone,
      email: data.email,
      source_name: 'Сайт corcel.com.ua',
      notes: `Компанія: ${data.company || '—'}\nПослуга: ${data.service || '—'}\nПовідомлення: ${data.message || '—'}`,
    }),
  });
}

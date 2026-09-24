import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/*
 * Receives the HQ design's forms and emails them via the SMTP settings in .env.local
 * (same variables as /api/apply, which belongs to the legacy design).
 *   kind: 'inquiry'  — "Let's talk" contact form
 *   kind: 'careers'  — careers modal
 */
export type ContactPayload =
  | { kind: 'inquiry'; name: string; email: string; business: string; topic: string; message: string }
  | { kind: 'careers'; name: string; email: string; role: string; portfolio: string; message: string }

const clean = (v: unknown, max = 5000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const kind = body.kind === 'careers' ? 'careers' : body.kind === 'inquiry' ? 'inquiry' : null
  const name = clean(body.name, 200)
  const email = clean(body.email, 200)
  const message = clean(body.message)

  if (!kind || !name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in every field.' }, { status: 400 })
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const rows: [string, string][] =
    kind === 'inquiry'
      ? [
          ['Website / profile', clean(body.business, 500) || '—'],
          ['Interested in', clean(body.topic, 100) || '—'],
        ]
      : [
          ['Role', clean(body.role, 100) || '—'],
          ['Work', clean(body.portfolio, 500) || '—'],
        ]

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, APPLY_TO_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error(`[contact] SMTP is not configured — ${kind} not emailed:`, { name, email, rows, message })
    return NextResponse.json({ error: 'Email is not configured on the server.' }, { status: 500 })
  }

  const port = Number(SMTP_PORT ?? 587)
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 is implicit TLS; 587 upgrades via STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const label = kind === 'inquiry' ? 'New inquiry' : 'Careers application'
  const subject = kind === 'inquiry' ? `New inquiry — ${name} (${rows[1][1]})` : `Careers — ${name} (${rows[0][1]})`
  const submittedAt = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' })

  // HQ palette as solid hex, table layout — email clients (Outlook especially) drop rgba() and flex.
  const BG = '#0C1814'
  const PANEL = '#15241B'
  const CREAM = '#F4F1D6'
  const MUTED = '#A9B7A7'
  const BORDER = '#24382D'

  const detailRows = rows
    .map(
      ([k, v]) => `
          <tr>
            <td style="padding:14px 16px;border-bottom:1px solid ${BORDER};font:11px Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;color:${MUTED};white-space:nowrap;vertical-align:top;width:35%;">${k}</td>
            <td style="padding:14px 16px;border-bottom:1px solid ${BORDER};font:15px Arial,sans-serif;color:${CREAM};vertical-align:top;word-break:break-word;">${escapeHtml(v)}</td>
          </tr>`,
    )
    .join('')

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${label}</title></head>
<body style="margin:0;padding:0;background-color:${BG};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(name)} · ${escapeHtml(rows.map((r) => r[1]).join(' · '))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
        <tr><td style="padding:0 0 24px;border-bottom:2px solid ${CREAM};">
          <div style="font:11px Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;color:${MUTED};padding-bottom:8px;">WAGMI HQ LLC · ${label}</div>
          <div style="font:bold 30px/1.15 Arial,sans-serif;color:${CREAM};">${escapeHtml(name)}</div>
          <div style="font:14px Arial,sans-serif;padding-top:8px;"><a href="mailto:${escapeHtml(email)}" style="color:${CREAM};text-decoration:underline;">${escapeHtml(email)}</a></div>
        </td></tr>
        <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>
        <tr><td><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BORDER};border-radius:6px;">${detailRows}</table></td></tr>
        <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding:0 0 8px;font:11px Arial,sans-serif;letter-spacing:1px;text-transform:uppercase;color:${MUTED};">${kind === 'inquiry' ? 'Their message' : 'About them'}</td></tr>
        <tr><td style="padding:16px 18px;background-color:${PANEL};border-left:3px solid ${CREAM};border-radius:4px;font:15px/1.65 Arial,sans-serif;color:${CREAM};">${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>
        <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>
        <tr><td><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="background-color:${CREAM};border-radius:12px;">
            <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent('Re: ' + subject)}" style="display:inline-block;padding:14px 28px;font:bold 14px Arial,sans-serif;color:${BG};text-decoration:none;">Reply to ${escapeHtml(name.split(' ')[0])}</a>
          </td>
        </tr></table></td></tr>
        <tr><td style="height:32px;line-height:32px;font-size:0;">&nbsp;</td></tr>
        <tr><td style="padding-top:20px;border-top:1px solid ${BORDER};font:12px/1.6 Arial,sans-serif;color:${MUTED};">
          Submitted ${submittedAt} UTC from the WAGMI HQ website.<br>Replying to this email goes straight to ${escapeHtml(name.split(' ')[0])}.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  const text = [`${label.toUpperCase()} — ${name}`, email, '', ...rows.map(([k, v]) => `${k}: ${v}`), '', message, '', `Submitted ${submittedAt} UTC`].join('\n')

  try {
    await transporter.sendMail({
      from: SMTP_FROM || `WAGMI HQ LLC <${SMTP_USER}>`,
      to: APPLY_TO_EMAIL || SMTP_USER,
      replyTo: `${name} <${email}>`, // replying in the inbox goes straight to the sender
      subject,
      text,
      html,
    })
  } catch (err) {
    console.error(`[contact] failed to send ${kind}:`, err)
    return NextResponse.json({ error: 'We could not send your message.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}

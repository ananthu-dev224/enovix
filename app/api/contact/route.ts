import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
}

// ─── Transporter (created once, reused across warm invocations) ───────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// ─── HTML email template ──────────────────────────────────────────────────────
function buildEmailHtml(data: ContactPayload): string {
  const field = (label: string, value: string | undefined, color = '#4dabff') =>
    value
      ? `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #0d2540;">
            <span style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${color};font-family:sans-serif;">${label}</span><br/>
            <span style="font-size:15px;color:#eef4ff;font-family:sans-serif;font-weight:300;">${value}</span>
          </td>
        </tr>`
      : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#010b18;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#010b18;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#041428,#071e3d);border-radius:16px 16px 0 0;padding:36px 40px;border:1px solid rgba(42,137,232,0.2);border-bottom:none;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="display:inline-flex;align-items:center;gap:10px;">
                    <span style="font-family:sans-serif;font-weight:800;font-size:20px;color:#eef4ff;letter-spacing:-0.02em;vertical-align:middle;margin-left:10px;">ENOVIX</span>
                  </div>
                  <p style="margin:16px 0 0;font-family:sans-serif;font-size:13px;font-weight:400;color:#4a6a8a;letter-spacing:0.12em;text-transform:uppercase;">New Contact Form Submission</p>
                </td>
                <td align="right" style="vertical-align:top;">
                  <span style="display:inline-block;padding:5px 14px;border-radius:100px;background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);font-family:sans-serif;font-size:11px;font-weight:600;color:#00d4ff;letter-spacing:0.1em;text-transform:uppercase;">
                    New Lead
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider line -->
        <tr>
          <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(0,212,255,0.4),rgba(40,137,232,0.4),rgba(0,212,255,0.4),transparent);"></td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#020d1f;padding:36px 40px;border:1px solid rgba(42,137,232,0.12);border-top:none;border-bottom:none;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${field('Name', data.name, '#4dabff')}
              ${field('Email', data.email, '#00d4ff')}
              ${field('Company / Project', data.company, '#a78bfa')}
              ${field('Service Needed', data.service, '#34d399')}
              ${field('Budget Range', data.budget, '#f59e0b')}
            </table>

            <!-- Message block -->
            <div style="margin-top:24px;">
              <p style="font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#4dabff;font-family:sans-serif;margin:0 0 10px;">Message</p>
              <div style="background:rgba(7,30,61,0.6);border:1px solid rgba(42,137,232,0.15);border-radius:10px;padding:20px 22px;">
                <p style="font-family:sans-serif;font-size:15px;font-weight:300;color:#c8ddf5;line-height:1.75;margin:0;white-space:pre-wrap;">${data.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
            </div>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="background:#020d1f;padding:0 40px 36px;border:1px solid rgba(42,137,232,0.12);border-top:none;border-bottom:none;">
            <a href="mailto:${data.email}" style="display:inline-block;padding:13px 28px;border-radius:6px;background:linear-gradient(135deg,#1a6fc4,#2889e8);color:white;font-family:sans-serif;font-weight:700;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;">
              Reply to ${data.name.split(' ')[0]} →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#010b18;border-radius:0 0 16px 16px;padding:22px 40px;border:1px solid rgba(42,137,232,0.1);border-top:none;text-align:center;">
            <p style="font-family:sans-serif;font-size:12px;color:#2a4a6a;margin:0;">
              This email was sent from the contact form at <a href="https://enovix.dev" style="color:#2889e8;text-decoration:none;">enovix.dev</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Auto-reply template (sent to the person who filled the form) ─────────────
function buildAutoReplyHtml(name: string): string {
  const firstName = name.split(' ')[0];
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#010b18;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#010b18;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr>
          <td style="background:linear-gradient(135deg,#041428,#071e3d);border-radius:16px 16px 0 0;padding:36px 40px;border:1px solid rgba(42,137,232,0.2);border-bottom:none;text-align:center;">
            <div style="width:38px;height:38px;border-radius:8px;background:linear-gradient(135deg,#1a6fc4,#00d4ff);display:inline-block;text-align:center;line-height:38px;font-family:sans-serif;font-weight:800;font-size:17px;color:white;margin-bottom:12px;">E</div>
            <h1 style="font-family:sans-serif;font-size:26px;font-weight:800;color:#eef4ff;letter-spacing:-0.02em;margin:0 0 8px;">Thanks, ${firstName}! 👋</h1>
            <p style="font-family:sans-serif;font-size:14px;color:#4a6a8a;margin:0;">We&apos;ve received your message</p>
          </td>
        </tr>
        <tr><td style="height:1px;background:linear-gradient(90deg,transparent,rgba(0,212,255,0.4),transparent);"></td></tr>
        <tr>
          <td style="background:#020d1f;padding:36px 40px;border:1px solid rgba(42,137,232,0.12);border-top:none;border-bottom:none;">
            <p style="font-family:sans-serif;font-size:15px;font-weight:300;color:#c8ddf5;line-height:1.8;margin:0 0 24px;">
              Your message has landed safely with us. The Enovix team will review your project details and get back to you within <strong style="color:#eef4ff;font-weight:600;">24 hours</strong>.
            </p>
            <div style="background:rgba(7,30,61,0.6);border:1px solid rgba(42,137,232,0.15);border-radius:10px;padding:20px 22px;margin-bottom:24px;">
              <p style="font-family:sans-serif;font-size:12px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#4dabff;margin:0 0 10px;">What happens next?</p>
              <p style="font-family:sans-serif;font-size:14px;color:#8aafd4;line-height:1.7;margin:0;">
                1. We review your message &amp; requirements<br/>
                2. Schedule a free discovery call<br/>
                3. Send you a detailed proposal &amp; timeline
              </p>
            </div>
            <p style="font-family:sans-serif;font-size:14px;color:#4a6a8a;line-height:1.7;margin:0;">
              Have something urgent? Reply directly to this email or reach us at <a href="mailto:contact.enovix@gmail.com" style="color:#2889e8;text-decoration:none;">contact.enovix@gmail.com</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#010b18;border-radius:0 0 16px 16px;padding:22px 40px;border:1px solid rgba(42,137,232,0.1);border-top:none;text-align:center;">
            <p style="font-family:sans-serif;font-size:12px;color:#2a4a6a;margin:0;">
              © ${new Date().getFullYear()} Enovix · Kerala, India
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Rate limiting (simple in-memory, resets on cold start) ───────────────────
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const window = 60_000; // 1 minute
  const limit = 3;       // max 3 submissions per IP per minute

  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + window });
    return false;
  }
  if (entry.count >= limit) return true;
  entry.count++;
  return false;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(body: Partial<ContactPayload>): string | null {
  if (!body.name?.trim()) return 'Name is required.';
  if (!body.email?.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return 'Invalid email address.';
  if (!body.message?.trim()) return 'Message is required.';
  if (body.message.length > 3000) return 'Message is too long (max 3000 characters).';
  return null;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 }
      );
    }

    // Parse + validate body
    const body: Partial<ContactPayload> = await req.json();
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const data = body as ContactPayload;

    // ── Send notification to Enovix ───────────────────────────────────────────
    await transporter.sendMail({
      from: `"Enovix Contact Form" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: data.email,
      subject: `New enquiry from ${data.name}${data.company ? ` · ${data.company}` : ''}`,
      html: buildEmailHtml(data),
      text: [
        `New contact form submission`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : '',
        data.service ? `Service: ${data.service}` : '',
        data.budget ? `Budget: ${data.budget}` : '',
        `Message:\n${data.message}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    // ── Send auto-reply to the sender ─────────────────────────────────────────
    await transporter.sendMail({
      from: `"Enovix" <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: `We got your message, ${data.name.split(' ')[0]}! 👋`,
      html: buildAutoReplyHtml(data.name),
      text: `Hi ${data.name.split(' ')[0]},\n\nThanks for reaching out to Enovix! We've received your message and will get back to you within 24 hours.\n\nBest,\nThe Enovix Team`,
    });

    return NextResponse.json(
      { success: true, message: 'Message sent successfully.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
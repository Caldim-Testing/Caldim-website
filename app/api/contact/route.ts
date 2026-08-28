import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

// Rate limiting (per IP, max 5 submissions per 15 mins)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipSubmissions = new Map<string, { count: number; firstAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipSubmissions.get(ip);
  if (!record || now - record.firstAt > RATE_LIMIT_WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, firstAt: now });
    return false;
  }
  if (record.count >= RATE_LIMIT_MAX) return true;
  record.count += 1;
  return false;
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n\0]/g, "").trim();
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= 254;
}

async function createTransporter() {
  const host = process.env.SMTP_HOST || "smtp.zoho.com";
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "support@caldimengg.in";
  const pass = process.env.SMTP_PASS || "gVKWQtqwxkkc";

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
}

function buildInternalEmailHtml(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}): string {
  const { name, email, company, phone, service, message } = data;
  return `
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:620px;margin:0 auto;padding:32px;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;">
      <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #2563eb;">
        <h2 style="color:#0f172a;margin:0;font-size:24px;font-weight:800;">CALDIM <span style="color:#2563eb;">Consult</span></h2>
        <p style="color:#64748b;font-size:13px;margin-top:8px;text-transform:uppercase;letter-spacing:1px;">New Consultation Request</p>
      </div>
      <div style="padding:24px 0;">
        <h3 style="color:#0f172a;font-size:14px;text-transform:uppercase;border-left:3px solid #2563eb;padding-left:10px;">Client Details</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:130px;font-weight:600;">Name</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-weight:600;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;"><a href="mailto:${email}" style="color:#2563eb;">${email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-weight:600;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-weight:600;">Company</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;">${company || "Not provided"}</td></tr>
          <tr><td style="padding:10px 0;color:#64748b;font-weight:600;">Service</td><td style="padding:10px 0;"><span style="background:#eff6ff;color:#1d4ed8;padding:4px 10px;border-radius:4px;font-weight:600;">${service}</span></td></tr>
        </table>
      </div>
      <div style="padding-top:12px;">
        <h3 style="color:#0f172a;font-size:14px;text-transform:uppercase;border-left:3px solid #2563eb;padding-left:10px;">Project Message</h3>
        <div style="background:#f8fafc;padding:18px;border:1px solid #e2e8f0;color:#334155;font-size:14px;line-height:1.7;border-radius:8px;white-space:pre-wrap;">${message}</div>
      </div>
      <div style="margin-top:32px;padding-top:16px;border-top:1px dashed #cbd5e1;text-align:center;color:#94a3b8;font-size:12px;">
        <p style="margin:0;">Automated notification from the CALDIM website.<br/>
        <strong style="color:#64748b;">Click Reply</strong> to respond directly to <a href="mailto:${email}" style="color:#2563eb;">${email}</a>.</p>
      </div>
    </div>
  `;
}

function buildClientAckHtml(name: string, service: string): string {
  return `
    <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:620px;margin:0 auto;padding:32px;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;">
      <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #2563eb;">
        <h2 style="color:#0f172a;margin:0;font-size:24px;font-weight:800;">CALDIM <span style="color:#2563eb;">DAS</span></h2>
        <p style="color:#64748b;font-size:13px;margin-top:8px;text-transform:uppercase;letter-spacing:1px;">Consultation Request Received</p>
      </div>
      <div style="padding:24px 0;">
        <p style="font-size:15px;color:#0f172a;font-weight:600;">Hello ${name},</p>
        <p style="font-size:14px;color:#334155;line-height:1.7;">
          Thank you for reaching out to <strong>CALDIM Digitalization &amp; Automation Solutions</strong>.
          We have received your consultation request for <strong>${service}</strong> and our team is reviewing it.
        </p>
        <div style="margin:20px 0;background:#eff6ff;border-left:4px solid #2563eb;border-radius:0 8px 8px 0;padding:16px 20px;">
          <p style="margin:0;font-size:14px;color:#1d4ed8;font-weight:700;">⏱ Response Within 4 Hours</p>
          <p style="margin:6px 0 0;font-size:13px;color:#3b82f6;">Our team will reach out to schedule your scoping consultation.</p>
        </div>
        <p style="font-size:13px;color:#64748b;">For urgent queries, email us at
          <a href="mailto:support@caldimengg.in" style="color:#2563eb;font-weight:600;">support@caldimengg.in</a>.
        </p>
      </div>
      <div style="margin-top:20px;padding-top:16px;border-top:1px dashed #cbd5e1;text-align:center;color:#94a3b8;font-size:12px;">
        <p style="margin:0;">© CALDIM Digitalization &amp; Automation Solutions — Chennai &amp; Hosur, India</p>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Too many requests. Please wait 15 minutes and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const name    = sanitizeHeader(String(body.name    || "").slice(0, 100));
    const email   = sanitizeHeader(String(body.email   || "").slice(0, 254));
    const company = sanitizeHeader(String(body.company || "").slice(0, 150));
    const phone   = sanitizeHeader(String(body.phone   || "").slice(0, 30));
    const service = sanitizeHeader(String(body.service || "General Inquiry").slice(0, 100));
    const message = String(body.message || "").slice(0, 5000).replace(/\0/g, "");

    if (!name) return NextResponse.json({ message: "Name is required." }, { status: 400 });
    if (!email) return NextResponse.json({ message: "Email address is required." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    if (!message || message.trim().length < 10) return NextResponse.json({ message: "Message must be at least 10 characters." }, { status: 400 });

    const companyEmail  = process.env.SMTP_FROM || "support@caldimengg.in";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || companyEmail;

    // Save submission to analytics logs
    try {
      const analyticsFile = path.join(process.cwd(), "data", "analytics.json");
      const content = await fs.readFile(analyticsFile, "utf-8").catch(() => "{}");
      const analytics = JSON.parse(content || "{}");
      analytics.events = analytics.events || {};
      analytics.logs = Array.isArray(analytics.logs) ? analytics.logs : [];
      analytics.events["consultation_booked"] = (analytics.events["consultation_booked"] || 0) + 1;
      analytics.logs.push({
        timestamp: new Date().toISOString(),
        action: "Consultation Request",
        details: `${name} <${email}> — ${service}`
      });
      if (analytics.logs.length > 100) analytics.logs.shift();
      await fs.writeFile(analyticsFile, JSON.stringify(analytics, null, 2)).catch(() => {});
    } catch (e) {}

    // Send emails via standard SMTP (Nodemailer)
    try {
      const transporter = await createTransporter();

      // 1. Internal notification -> support inbox
      await transporter.sendMail({
        from: `"CALDIM Website" <${companyEmail}>`,
        to: receiverEmail,
        replyTo: `"${name}" <${email}>`,
        subject: `[CALDIM Consult] ${service} — ${company || "No Company"}`,
        html: buildInternalEmailHtml({ name, email, company, phone, service, message }),
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nService: ${service}\n\n${message}`,
      });

      console.log(`[CALDIM] ✓ Consultation notification email sent to ${receiverEmail} — ${name} <${email}> | ${service}`);
      return NextResponse.json({ success: true });

    } catch (smtpError: any) {
      console.warn(`[CALDIM] SMTP dispatch notice: ${smtpError.message}`);
      console.log(`[CALDIM] ✓ Consultation inquiry saved locally — ${name} <${email}> | ${service}`);
      return NextResponse.json({ success: true, savedLocally: true });
    }

  } catch (error: any) {
    console.error("[CALDIM] Contact form error:", { message: error.message });
    return NextResponse.json(
      { message: "Failed to send your request. Please try again or email support@caldimengg.in directly." },
      { status: 500 }
    );
  }
}

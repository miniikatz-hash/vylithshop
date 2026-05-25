import { Resend } from 'resend';
import { config } from '@/lib/config';

const resend = new Resend(config.resend.apiKey);

export async function sendWelcomeEmail(to: string) {
  await resend.emails.send({
    from: config.resend.fromEmail,
    to,
    subject: 'Welcome to Vylith',
    html: `<h1>Welcome to Vylith</h1>
      <p>Thanks for joining our waitlist. We'll be in touch soon.</p>
    `,
  });
}

export async function sendDemoConfirmation(to: string, name: string, date: string) {
  await resend.emails.send({
    from: config.resend.fromEmail,
    to,
    subject: 'Demo Booked - Vylith',
    html: `<h1>Demo Confirmed</h1>
      <p>Hi ${name}, your demo is scheduled for ${date}.</p>
    `,
  });
}

export async function sendContactNotification(name: string, email: string, message: string) {
  await resend.emails.send({
    from: config.resend.fromEmail,
    to: config.resend.fromEmail,
    subject: `New Contact Form - ${name}`,
    html: `<h1>New Contact Submission</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  });
}

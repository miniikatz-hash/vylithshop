import { z } from 'zod';

function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
}

export const config = {
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
    jwtSecret: getEnvVar('SUPABASE_JWT_SECRET'),
  },
  resend: {
    apiKey: getEnvVar('RESEND_API_KEY'),
    fromEmail: getEnvVar('RESEND_FROM_EMAIL'),
  },
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL'),
    plausibleDomain: getEnvVar('NEXT_PUBLIC_PLAUSIBLE_DOMAIN'),
    defaultLocale: getEnvVar('NEXT_PUBLIC_DEFAULT_LOCALE'),
  },
} as const;

export const waitlistSchema = z.object({
  email: z.string().email(),
});

export const demoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  date: z.string().datetime(),
});

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

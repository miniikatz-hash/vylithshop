import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase/server';
import { sendDemoConfirmation } from '@/lib/email';
import { config } from '@/lib/config';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  date: z.string().datetime(),
});

function checkOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (process.env.NODE_ENV === 'production' && origin !== config.app.url) {
    return false;
  }
  return true;
}

export async function POST(req: NextRequest) {
  if (!checkOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
  }

  const { error } = await supabaseServer.from('demo_requests').insert({
    name: result.data.name,
    email: result.data.email,
    company: result.data.company || null,
    date: result.data.date,
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }

  try {
    await sendDemoConfirmation(result.data.email, result.data.name, result.data.date);
  } catch {
    // Email is best-effort
  }

  return NextResponse.json({ success: true });
}

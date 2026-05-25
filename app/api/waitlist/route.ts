import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseServer } from '@/lib/supabase/server';
import { sendWelcomeEmail } from '@/lib/email';
import { config } from '@/lib/config';

const schema = z.object({
  email: z.string().email(),
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

  const { data: existing } = await supabaseServer
    .from('waitlist')
    .select('id')
    .eq('email', result.data.email)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'Already on waitlist' }, { status: 409 });
  }

  const { error } = await supabaseServer.from('waitlist').insert({
    email: result.data.email,
  });

  if (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }

  try {
    await sendWelcomeEmail(result.data.email);
  } catch {
    // Email is best-effort
  }

  return NextResponse.json({ success: true });
}

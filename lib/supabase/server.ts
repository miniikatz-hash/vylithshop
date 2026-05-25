import { createClient } from '@supabase/supabase-js';
import { config } from '@/lib/config';

export const supabaseServer = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

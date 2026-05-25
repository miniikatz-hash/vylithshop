import { createClient } from '@supabase/supabase-js';
import { config } from '@/lib/config';

export const supabaseClient = createClient(
  config.supabase.url,
  config.supabase.anonKey
);

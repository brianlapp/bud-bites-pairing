import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ejlfgholflhtxlvbpsmj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbGZnaG9sZmxodHhsdmJwc21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMDI5NDIsImV4cCI6MjA1MTU3ODk0Mn0.82YIRpCHre0ptBOjr_kyFzwlP-HU0_ISF1uM77fN_0s";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);
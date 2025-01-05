import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ejlfgholflhtxlvbpsmj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbGZnaG9sZmxodHhsdmJwc21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0NzMzMzgsImV4cCI6MjAyMDA0OTMzOH0.xGqRwqXJeHBxEtQJkqtEXbYCYMXqx_nBGqNYR-Oa8Ys';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
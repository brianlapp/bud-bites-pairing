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

// Test Supabase connectivity after client is initialized
const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
    console.log('Supabase connection successful');
    return true;
  } catch (err) {
    console.error('Supabase connection test failed:', err);
    return false;
  }
};

// Run the test after client is initialized
testConnection();
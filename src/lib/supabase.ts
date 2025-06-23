import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// Configure email verification
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_UP') {
    alert('Un email de vérification a été envoyé à votre adresse. Veuillez vérifier votre boîte mail pour confirmer votre compte.');
  }
});
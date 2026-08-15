import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
function createSupabaseClient() {
  const SUPABASE_URL = "https://hgqjxmmlweetslcbxzxa.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eGR4aW9qanl4YmJwbmJnb3p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNjIzOTYsImV4cCI6MjA5NjYzODM5Nn0.S_MXrBsICJxsGcXKNcTt0OjH9knL-iwuMh1_NOmdAKo";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};

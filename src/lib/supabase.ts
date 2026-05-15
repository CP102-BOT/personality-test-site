import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
    }
    _supabase = createClient(supabaseUrl, supabaseKey);
  }
  return _supabase;
}

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "【⚠️危险⚠️】请务必通过环境变量 ADMIN_PASSWORD 设置密码！";

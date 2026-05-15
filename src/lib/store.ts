import { getSupabase } from "@/lib/supabase";

export interface UnlockCode {
  code: string;
  used: boolean;
  used_at: string | null;
  created_at: string;
}

function genCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const seg2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${seg1}-${seg2}`;
}

export async function findCode(code: string): Promise<UnlockCode | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("unlock_codes")
    .select("*")
    .eq("code", code)
    .single();
  if (error || !data) return null;
  return data;
}

export async function markCodeAsUsed(code: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("unlock_codes")
    .update({ used: true, used_at: new Date().toISOString() })
    .eq("code", code)
    .eq("used", false);
  return !error;
}

export async function getStats() {
  const supabase = getSupabase();
  const { data: all, error } = await supabase.from("unlock_codes").select("*");
  if (error) return { total: 0, used: 0, unused: 0, codes: [] };
  const used = all.filter((c) => c.used).length;
  return {
    total: all.length,
    used,
    unused: all.length - used,
    codes: all.slice(-100).reverse(),
  };
}

export async function generateCodes(count: number): Promise<string[]> {
  const supabase = getSupabase();
  const newCodes: string[] = [];
  for (let i = 0; i < count; i++) {
    let code = genCode();
    let attempts = 0;
    let exists = true;
    while (exists && attempts < 10) {
      const { data } = await supabase.from("unlock_codes").select("code").eq("code", code).single();
      if (!data) exists = false;
      else { code = genCode(); attempts++; }
    }
    newCodes.push(code);
  }

  const rows = newCodes.map((code) => ({
    code,
    used: false,
    used_at: null,
    created_at: new Date().toISOString(),
  }));

  await supabase.from("unlock_codes").insert(rows);
  return newCodes;
}

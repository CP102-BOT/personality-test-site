import { createClient } from "@supabase/supabase-js";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

interface UnlockCode {
  code: string;
  used: boolean;
  used_at: string | null;
  created_at: string;
}

function getSupabase(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
}

function genCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg1 = Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const seg2 = Array.from({ length: 4 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `${seg1}-${seg2}`;
}

async function findCode(
  supabase: ReturnType<typeof createClient>,
  code: string
): Promise<UnlockCode | null> {
  const { data, error } = await supabase
    .from("unlock_codes")
    .select("*")
    .eq("code", code)
    .single();
  if (error || !data) return null;
  return data;
}

export const onRequest: PagesFunction<Env> = async (c) => {
  const supabase = getSupabase(c.env);

  if (c.request.method === "GET") {
    const { data: all, error } = await supabase
      .from("unlock_codes")
      .select("*");
    if (error) {
      return new Response(
        JSON.stringify({ total: 0, used: 0, unused: 0 }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
    const used = all.filter((c: UnlockCode) => c.used).length;
    return new Response(
      JSON.stringify({
        total: all.length,
        used,
        unused: all.length - used,
        codes: all.slice(-100).reverse(),
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  if (c.request.method === "POST") {
    try {
      const { count = 10 } = await c.request.json();
      const limit = Math.min(count, 100);
      const newCodes: string[] = [];

      for (let i = 0; i < limit; i++) {
        let code = genCode();
        let attempts = 0;
        let exists = true;
        while (exists && attempts < 10) {
          const { data } = await supabase
            .from("unlock_codes")
            .select("code")
            .eq("code", code)
            .single();
          if (!data) exists = false;
          else {
            code = genCode();
            attempts++;
          }
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

      return new Response(
        JSON.stringify({ generated: newCodes.length, codes: newCodes }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch {
      return new Response(
        JSON.stringify({ error: "生成失败" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
};

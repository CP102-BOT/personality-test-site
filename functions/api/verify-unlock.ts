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

export const onRequest: PagesFunction<Env> = async (c) => {
  if (c.request.method !== "POST") {
    return new Response(JSON.stringify({ valid: false }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = getSupabase(c.env);
    const { code, token } = await c.request.json();

    if (token) {
      const { data, error } = await supabase
        .from("unlock_codes")
        .select("*")
        .eq("code", token)
        .single();
      const entry: UnlockCode | null = data;
      return new Response(
        JSON.stringify({ valid: !!(entry && entry.used) }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    if (!code) {
      return new Response(
        JSON.stringify({ valid: false, message: "请输入解锁码" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const { data, error } = await supabase
      .from("unlock_codes")
      .select("*")
      .eq("code", code)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ valid: false, message: "解锁码不存在" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const entry: UnlockCode = data;
    if (entry.used) {
      return new Response(
        JSON.stringify({ valid: false, message: "此解锁码已被使用" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    await supabase
      .from("unlock_codes")
      .update({ used: true, used_at: new Date().toISOString() })
      .eq("code", code)
      .eq("used", false);

    return new Response(
      JSON.stringify({ valid: true, token: code }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ valid: false, message: "验证服务异常" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

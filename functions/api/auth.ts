import { createClient } from "@supabase/supabase-js";

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  ADMIN_PASSWORD: string;
}

function getSupabase(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
}

export const onRequest: PagesFunction<Env> = async (c) => {
  if (c.request.method !== "POST") {
    return new Response(JSON.stringify({ ok: false }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { password } = await c.request.json();
    if (password === c.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};

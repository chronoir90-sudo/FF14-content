// Supabase Edge Function: sync
//
// ブラウザは anon key だけでこの関数を呼び出す。この関数の内部だけが
// service_role key(Supabaseが自動で環境変数に注入する)を使ってテーブルに
// アクセスするので、service_role key がブラウザ側に出ることは一切ない。
//
// テーブル eorzea_pocket_data 自体は RLS で anon/authenticated からの
// 直接アクセスを禁止しているため、この関数を経由しない限り誰もデータを
// 読み書きできない。
//
// action: "save" -> { user_key, data } を upsert
// action: "load" -> user_key に一致する行の data を返す(一覧は返さない)

import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "method not allowed" }, 405);
  }

  let body: { action?: string; user_key?: string; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid json body" }, 400);
  }

  const { action, user_key, data } = body;

  if (!user_key || typeof user_key !== "string" || user_key.trim().length < 4) {
    return json({ error: "user_key must be at least 4 characters" }, 400);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  if (action === "save") {
    if (!data || typeof data !== "object") {
      return json({ error: "data is required" }, 400);
    }
    const { error } = await supabase
      .from("eorzea_pocket_data")
      .upsert(
        { user_key, data, updated_at: new Date().toISOString() },
        { onConflict: "user_key" }
      );
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true });
  }

  if (action === "load") {
    const { data: rows, error } = await supabase
      .from("eorzea_pocket_data")
      .select("data, updated_at")
      .eq("user_key", user_key)
      .limit(1);
    if (error) return json({ error: error.message }, 500);
    if (!rows || rows.length === 0) return json({ error: "not found" }, 404);
    return json(rows[0]);
  }

  return json({ error: "unknown action" }, 400);
});

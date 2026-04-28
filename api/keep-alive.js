import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const KEEP_ALIVE_TABLE = process.env.KEEP_ALIVE_TABLE || "items";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({
      ok: false,
      error: "Missing required Supabase environment variables",
    });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase
    .from(KEEP_ALIVE_TABLE)
    .select("id")
    .limit(1);

  if (error) {
    return res.status(500).json({ ok: false, error: "Supabase keep-alive failed" });
  }

  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
}
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gcamfziajstnnexlgztc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjYW1memlhanN0bm5leGxnenRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ5NjQ3MDQsImV4cCI6MjAxMDU0MDcwNH0.d4JPhRvd_EbsOVIB7lOBdyyN8u9lgwMvLTTd-rwHkB4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

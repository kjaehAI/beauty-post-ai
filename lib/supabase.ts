import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vflnxvgklufxqmxwvxte.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmbG54dmdrbHVmeHFteHd2eHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjkwNjUsImV4cCI6MjA5NTMwNTA2NX0.AZZ3BEtFh3l_-pRASCLM477kMDmyiGwVkzRtd07W184";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
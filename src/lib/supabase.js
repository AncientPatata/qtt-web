// Import the functions you need from the SDKs you need

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://fqwhxtotfrwhlaotqesw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxd2h4dG90ZnJ3aGxhb3RxZXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MzQ5NzgsImV4cCI6MjAwNTIxMDk3OH0.ZkqyKrj7DpflE3ImBrmU8sd9F_z9p_NFYAm1Zl29lZo"
);

export default supabase;

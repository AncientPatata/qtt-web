import supabase from "./supabase";

function fetch_table(table_name) {
  return supabase
    .from(table_name)
    .select()
    .order("created_at", { ascending: false })
    .limit(25)
    .then((res) => res.data);
}

export { fetch_table };

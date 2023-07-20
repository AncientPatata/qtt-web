import supabase from "./supabase";

function fetch_table(table_name) {
  return supabase
    .from(table_name)
    .select()
    .then((res) => res.data);
}

export { fetch_table };

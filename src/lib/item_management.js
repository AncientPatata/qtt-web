import supabase from "./supabase";

async function AddNewItem({ itemName, unitPrice, ...other }) {
  return supabase
    .from("Items")
    .insert({
      item_name: itemName,
      unit_price: unitPrice,
    })
    .select();
}

async function InstanciateItems(itemId, quantity, lot, expDate) {
  console.log({
    p_item_type: 1,
    p_lot: lot,
    p_expDate: new Date().toISOString(),
    p_quantity: quantity,
  });
  let { data: preexisting_item, error } = await supabase
    .from("ItemInstances")
    .select("*")
    .eq("lot", lot)
    .eq("expDate", expDate)
    .eq("item_type", itemId)
    .limit(1)
    .single();
  console.log("preexisting_item", preexisting_item);
  console.log("preexisting_item_error", error);
  let data;
  if (preexisting_item) {
    console.log("Item already exists, updating quantity");
    let { resd, err } = await supabase.from("ItemInstances").update({
      quantity: preexisting_item.quantity + quantity,
    });
    data = resd;
    console.log("new_item_update_error", err);
  } else {
    console.log("Item doesn't already exist, inserting new item");
    let { resd, err } = await supabase.from("ItemInstances").insert({
      item_type: itemId,
      expDate: expDate,
      lot: lot,
      quantity: quantity,
    });
    data = resd;
    console.log("new_item_creation_error", err);
  }
  //p_item_name text, p_lot text, p_expDate timestamp, p_quantity int2)
  return data;
}

async function ApplyQuantityModifToLot(
  itemId,
  old_quantity,
  new_quantity,
  lot,
  expDate
) {}

async function ApplyQuantityModifToItem(
  itemId,
  old_quantity,
  new_quantity,
  expDate
) {}

export { InstanciateItems, ApplyQuantityModifToLot, AddNewItem };

import supabase from "./supabase";

async function AddNewItem({ itemName, unitPrice, ...other }) {
  return supabase
    .from("Items")
    .insert({
      item_name: itemName,
      unit_price: 0,
    })
    .select();
}

async function InstanciateItems(itemId, quantity, lot, expDate) {
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
// Show some sort of status message on delete
// Handle errors in case it all goes fucky wucky to micro update parts of the elements except the ones that failed
async function RemoveItemInstanceQuantities(itemId, updatedValues) {
  await updatedValues.forEach(async (element) => {
    if (element.quantity !== element.new_quantity) {
      if (element.new_quantity === 0) {
        await supabase
          .from("ItemInstances")
          .delete()
          .eq("item_type", itemId)
          .eq("lot", element.lot)
          .eq("expDate", element.expDate)
          .then(({ data: new_data, error }) => {
            console.log(
              "remove_item_instance_quantities_delete_error : ",
              error
            );
          });
      } else {
        await supabase
          .from("ItemInstances")
          .update({ quantity: element.new_quantity })
          .eq("item_type", itemId)
          .eq("lot", element.lot)
          .eq("expDate", element.expDate)
          .eq("expDate", element.expDate)
          .then(({ data: new_data, error }) => {
            console.log(
              "remove_item_instance_quantities_update_error : ",
              error
            );
          });
      }
    }
  });
}

export { InstanciateItems, RemoveItemInstanceQuantities, AddNewItem };

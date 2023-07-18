import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";

async function AddQuantityToItem(itemId, itemName, quantity) {
  const db = getFirestore(app);
  const itemDocRef = doc(db, "items", itemId);
  await updateDoc(itemDocRef, {
    quantity: increment(quantity),
  });
  // If I switch to arrays inside of the items collection, there is a high risk of a performance hit... Maybe I should do one document per day and then have arrays inside that document ? I don't know...
  const docRef = await addDoc(collection(db, "items_incremental"), {
    itemId: itemId,
    name: itemName,
    deltaQuantity: quantity,
    changeTS: new Date(),
  });
  return docRef;
}

export { AddQuantityToItem };

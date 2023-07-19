import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";

async function AddQuantityToItem(itemId, itemName, quantity, lot, expDate) {
  const db = getFirestore(app);
  const itemDocRef = doc(db, "items", itemId);
  if (!lot || lot === "") {
    await updateDoc(itemDocRef, {
      quantity: increment(quantity),
      expDates: arrayUnion({ expDate: expDate, quantity: quantity }),
    });
  } else {
    const lotDocRef = doc(db, "items", itemId, "lots", lot);
    await updateDoc(itemDocRef, {
      quantity: increment(quantity),
    });
    await setDoc(
      lotDocRef,
      {
        quantity: increment(quantity),
        expDates: arrayUnion({ expDate: expDate, quantity: quantity }),
      },
      { merge: true }
    );
  }
  // If I switch to arrays inside of the items collection, there is a high risk of a performance hit... Maybe I should do one document per day and then have arrays inside that document ? I don't know...
  const docRef = await addDoc(collection(db, "items_incremental"), {
    itemId: itemId,
    name: itemName,
    lot: lot,
    deltaQuantity: quantity,
    changeTS: new Date(),
  });
  return docRef;
}

async function ApplyQuantityModifToLot(
  itemId,
  old_quantity,
  new_quantity,
  lot,
  expDate
) {
  const db = getFirestore(app);
  let docRef;
  if (lot) {
    docRef = doc(db, "items", itemId, "lots", lot);
    // const docData = (await getDoc(lotDocRef)).data();
  } else {
    docRef = doc(db, "items", itemId);
  }
  await updateDoc(docRef, {
    quantity: increment(new_quantity - old_quantity),
    expDates: arrayRemove({ expDate: expDate, quantity: old_quantity }),
  });
  // If new_quantity is 0, we delete the expDate element, and if no more expDate elements we delete the lot
  if (new_quantity !== 0) {
    await updateDoc(docRef, {
      expDates: arrayUnion({ expDate: expDate, quantity: new_quantity }),
    });
  }
}

async function ApplyQuantityModifToItem(
  itemId,
  old_quantity,
  new_quantity,
  expDate
) {
  const db = getFirestore(app);
  const lotDocRef = doc(db, "items", itemId);
  // const docData = (await getDoc(lotDocRef)).data();
  await updateDoc(lotDocRef, {
    expDates: arrayRemove({ expDate: expDate, quantity: old_quantity }),
  });
  await updateDoc(lotDocRef, {
    quantity: increment(new_quantity - old_quantity),
    expDates: arrayUnion({ expDate: expDate, quantity: new_quantity }),
  });
}

export { AddQuantityToItem, ApplyQuantityModifToLot };

import firebase from "../config/firebase";
import DatabaseCollections from "../helper/Constants";
import userUtil from "./StoreUsers";
const db = firebase.firestore();

const AddressUtil = {
  StoreAddress: async function StoreAddress(data, callback) {
    await db
      .collection(DatabaseCollections.Addresses)
      .doc(data.uid)
      .set(data)
      .then((result) => {
        console.log("Address added successfully ", result);

        callback(true);
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  },
  UpdateAddress: async function UpdateAddress(data, callback) {
    await db
      .collection(DatabaseCollections.Addresses)
      .doc(data.uid)
      .update({
        addresses: firebase.firestore.FieldValue.arrayUnion(data.addresses),
      })
      .then((result) => {
        console.log("User update successfully ");
        callback(true);
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  },

  GetAddresses: async function GetAddresses(uid) {
    const userRef = db.collection(DatabaseCollections.Addresses).doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", doc.data());
      return doc.data();
    }
  },
};

export default AddressUtil;

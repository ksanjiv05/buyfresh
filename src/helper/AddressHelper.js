import firebase from "../config/firebase";
import DatabaseCollections from "../helper/Constants";
import { v4 as uuidv4 } from "uuid";
import userUtil from "./StoreUsers";
const db = firebase.firestore();

const AddressUtil = {
  StoreAddress: async function StoreAddress(data, callback) {
    const addressuid = uuidv4();
    await db
      .collection(DatabaseCollections.Addresses)
      .doc(addressuid)
      .set(data)
      .then((result) => {
        console.log("Address added successfully ");
        const userData = {
          addressid: addressuid,
          uid: data.uid,
        };

        this.UpdateAddress(userData, (s) => {
          callback(s);
        });
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  },
  UpdateAddress: async function UpdateAddress(data, callback) {
    await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .update({
        addresses: firebase.firestore.FieldValue.arrayUnion(data.addressid),
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

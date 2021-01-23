import firebase from "../config/firebase";
import DatabaseCollections from "../helper/Constants";
import StoreUsers from "./StoreUsers";
import { v4 as uuidv4 } from "uuid";
const db = firebase.firestore();

const AddressUtil = {
  StoreAddress: async function StoreAddress(data, callback) {
    const addressuid = uuidv4();
    await db
      .collection(DatabaseCollections.Addresses)
      .doc(addressuid)
      .set(data)
      .then((result) => {
        const userData = {
          addressid: addressuid,
          uid: data.uid,
        };

        this.UpdateAddress(userData, (s) => {
          callback(s);
        });
      })
      .catch((err) => {
        //console.log(err);
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
        callback(true);
      })
      .catch((err) => {
        //console.log(err);
        callback(false);
      });
  },

  GetAddresses: async function GetAddresses(uid) {
    const userRef = db.collection(DatabaseCollections.Addresses).doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("doc not exist");
    } else {
      return doc.data();
    }
  },
  DeleteAddress: async function DeleteAddress(data, callback) {
    const addressRef = db
      .collection(DatabaseCollections.Addresses)
      .doc(data.addressId);
    await addressRef.delete().then((success) => {
      StoreUsers.UpdateUserAddress(data, (status) => {
        callback(status);
      }).catch((err) => {
        //console.log(err);
      });
    });
  },
};

export default AddressUtil;

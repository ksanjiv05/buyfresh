import firebase from "../config/firebase";
import DatabaseCollections from "../helper/Constants";
const db = firebase.firestore();

const UserUtil = {
  StoreUsers: async function StoreUsers(data, callback) {
    const user = await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .get();
    if (user.exists) {
      callback(true);
      return;
    }

    data.addresses = [];

    await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .set(data)
      .then((result) => {
        callback(true);
      })
      .catch((err) => {
        //console.log(err);
        callback(false);
      });
  },
  UpdateUser: async function UpdateUser(data, callback) {
    await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .update(data)
      .then((result) => {
        callback(true);
      })
      .catch((err) => {
        //console.log(err);
        callback(false);
      });
  },
  UpdateUserAddress: async function UpdateUserAddress(data, callback) {
    await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .update({
        addresses: firebase.firestore.FieldValue.arrayRemove(data.addressId),
      })
      .then((result) => {
        callback(true);
      })
      .catch((err) => {
        //console.log(err);
        callback(false);
      });
  },

  GetUser: async function GetUser(uid) {
    const userRef = db.collection(DatabaseCollections.Users).doc(uid);
    try {
      const doc = await userRef.get();
      if (!doc.exists) {
        return;
      } else {
        return doc.data();
      }
    } catch (err) {
      //console.log(err);
    }
  },
};

export default UserUtil;

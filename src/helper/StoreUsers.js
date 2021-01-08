import firebase from "../config/firebase";
import DatabaseCollections from "../helper/Constants";
const db = firebase.firestore();

const UserUtil = {
  StoreUsers: async function StoreUsers(data, callback) {
    console.log("user data to store ", data);
    const user = await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .get();
    if (user.exists) {
      console.log("user already exist");
      callback(true);
      return;
    }

    data.addresses = [];

    await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .set(data)
      .then((result) => {
        console.log("User added successfully ");
        callback(true);
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  },
  UpdateUser: async function UpdateUser(data, callback) {
    await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .update(data)
      .then((result) => {
        console.log("User update successfully ");
        callback(true);
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  },

  GetUser: async function GetUser(uid) {
    const userRef = db.collection(DatabaseCollections.Users).doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("No such document!");
      return;
    } else {
      console.log("Document data:", doc.data());
      return doc.data();
    }
  },
};

export default UserUtil;

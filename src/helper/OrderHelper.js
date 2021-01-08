import firebase from "../config/firebase";
import DatabaseCollections from "../helper/Constants";
import UserUtil from "./StoreUsers";
import { v4 as uuidv4 } from "uuid";
const db = firebase.firestore();

const OrderHelper = {
  CreateOrder: async function CreateOrder(data, callback) {
    const orderuid = uuidv4();
    data.orderId = orderuid;
    await db
      .collection(DatabaseCollections.Orders)
      .doc(orderuid)
      .set(data)
      .then((result) => {
        console.log("Order placed successfully ");
        const userData = {
          orderId: orderuid,
          uid: data.uid,
        };
        this.UpdateOrderWithUser(userData, (s) => {
          callback(s);
        });
        callback(true);
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  },
  UpdateOrderWithUser: async function UpdateOrderWithUser(data, callback) {
    await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .update({
        orders: firebase.firestore.FieldValue.arrayUnion(data.orderId),
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

  GetOrder: async function GetOrder(uid, callback) {
    const user = await UserUtil.GetUser(uid);

    if (user && user.orders.length > 0) {
      await user.orders.map(async (orderId) => {
        const orderRef = db.collection(DatabaseCollections.Orders).doc(orderId);

        const order = await orderRef.get();
        if (order.exists) {
          console.log("order =", order.data());
          callback(order.data());
        }
      });
    }
  },
};

export default OrderHelper;

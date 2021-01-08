import firebase from "../config/firebase";
import DatabaseCollections from "../helper/Constants";
import { v4 as uuidv4 } from "uuid";
const db = firebase.firestore();

const ProductHelper = {
  CreateProduct: async function CreateProduct(data, callback) {
    const Productuid = uuidv4();
    data.ProductId = Productuid;
    await db
      .collection(DatabaseCollections.Products)
      .doc(Productuid)
      .set(data)
      .then((result) => {
        console.log("Product added successfully ");
        callback(true);
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  },
  UpdateProductWithUser: async function UpdateProductWithUser(data, callback) {
    await db
      .collection(DatabaseCollections.Users)
      .doc(data.uid)
      .update({
        Products: firebase.firestore.FieldValue.arrayUnion(data.ProductId),
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

  GetProduct: async function GetProduct(uid) {
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
  GetProducts: async function GetProducts(uid) {
    const productRef = db.collection(DatabaseCollections.Products);
    const products = [];
    await productRef.get().then((snapshot) => {
      snapshot.forEach((doc) => products.push(doc.data()));
    });

    // products.push(
    //   snapshot.forEach((doc) => {
    //     console.log(doc.id, "=>", doc.data());
    //     return doc.data();
    //   })
    // );

    if (products.length > 0) {
      console.log(" data:", products);
      return products;
    }
  },
};

export default ProductHelper;
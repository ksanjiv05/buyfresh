import React, { useContext, useState, useEffect } from "react";
import Context from "../../../Context";
import CardM from "../../widget/CardM";
import Filter from "../../widget/Filter";
import "./HomePage.css";
import ProductHp from "../../../helper/ProductHelper";
import firebase from "../../../config/firebase";

const HomePage = () => {
  const { products, listenProductUpdate, searchValue } = useContext(Context);
  const [tempProduct, seTtempProduct] = useState([]);

  useEffect(() => {
    searchValue && searchValue.length > 0
      ? seTtempProduct(
          products.filter((p) =>
            p.pname.toLowerCase().includes(searchValue.toLowerCase())
          )
        )
      : seTtempProduct(products);
  }, [products, searchValue]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Products")
      .onSnapshot(function (doc) {
        console.log("Current data:----- ", doc.docChanges());
        doc.docChanges().forEach((v) => {
          if (v.doc.exists) {
            listenProductUpdate(v.doc.data());
            // console.log(setProductState, "data updated xxxxxs", v.doc.data());
          }
        });
      });
  }, []);
  return (
    <div className="item-root">
      <div className="item-filter"></div>
      <div className="item-filter item-container">
        <div className="items">
          {tempProduct &&
            tempProduct.map((value, index) => (
              <CardM value={value} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

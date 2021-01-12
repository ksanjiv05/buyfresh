import React, { useContext, useState, useEffect } from "react";
import Context from "../../../Context";
import CardM from "../../widget/CardM";
import Filter from "../../widget/Filter";
import "./HomePage.css";

const HomePage = () => {
  const { products, searchValue } = useContext(Context);
  const [tempProduct, seTtempProduct] = useState([]);

  useEffect(() => {
    {
      console.log("--svs-", searchValue);
      searchValue && searchValue.length > 0
        ? seTtempProduct(
            products.filter((p) =>
              p.pname.toLowerCase().includes(searchValue.toLowerCase())
            )
          )
        : seTtempProduct(products);
    }
  }, [products, searchValue]);
  return (
    <div className="item-root">
      <div className="item-filter"></div>
      <div className="item-filter item-container">
        <div className="items">
          {tempProduct &&
            tempProduct.map((value, index) => <CardM value={value} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

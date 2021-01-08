import React, { useState } from "react";
import InputWithoutIcon from "../../molecules/InputWithoutIcon";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import ProductImageUpload from "./ProductImageUpload";
import ProductHelper from "../../../helper/ProductHelper";
import WithToast from "../../../helper/WithToast";

// lable,
// placeholder,
// handleChange,
// isError,
// errorMsg,
const buttonTheam = {
  width: "100%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};

const AddProduct = (props) => {
  const [data, setData] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    console.log(value, data);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(false);
  };
  const handleProduct = () => {
    data.productImg = imgUrl;
    console.log("product ", data);
    ProductHelper.CreateProduct(data, (status) => {
      status
        ? props.success("Product added successfully")
        : props.error("Product unable to add");
    });
  };
  return (
    <div
      className="account-container"
      style={{ width: "95%", marginTop: "50px", padding: "15px" }}>
      <InputWithoutIcon
        lable="Product Name *"
        name="pname"
        placeholder="Enter the name of product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        lable="Product Stock *"
        name="stock"
        placeholder="Enter the stock of product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        lable="Product Price *(/1KG)"
        name="price"
        placeholder="Enter the price per product"
        handleChange={handleChange}
      />
      {/* <InputWithoutIcon
        lable="productimg"
        name="productimg"
        
        placeholder="Enter the image url of product"
        handleChange={handleChange}
      /> */}
      <ProductImageUpload setImgUrl={setImgUrl} />
      <InputWithoutIcon
        lable="shortDesc"
        name="shortDesc"
        placeholder="Enter the short description of product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        lable="description"
        name="description"
        placeholder="Enter the description of product"
        handleChange={handleChange}
      />
      <Button
        variant="contained"
        color="secondary"
        style={buttonTheam}
        onClick={handleProduct}>
        ADD PRODUCT
      </Button>
    </div>
  );
};

export default WithToast(AddProduct);

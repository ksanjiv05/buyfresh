import React, { useState } from "react";
import InputWithoutIcon from "../../molecules/InputWithoutIcon";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import ProductImageUpload from "./ProductImageUpload";
import ProductHelper from "../../../helper/ProductHelper";
import WithToast from "../../../helper/WithToast";
import SelectList from "../../molecules/SelectList";
import "./saller.css";

const buttonTheam = {
  width: "100%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};

const AddProduct = (props) => {
  const [data, setData] = useState({
    pname: "",
    stock: "",
    price: "",
    shortDesc: "",
    unit: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    pname: "",
    stock: "",
    price: "",
    shortDesc: "",
    unit: "",
    description: "",
  });
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

  const validate = () => {
    if (data.pname.length < 3) {
      alert("please enter valid product name");
      // setErrors((prevData) => ({
      //   ...prevData,
      //   pname: "please enter valid product name",
      // }))
      return false;
    }
    if (data.shortDesc.length < 3) {
      alert("please enter valid product short discription");
      // setErrors((prevData) => ({
      //   ...prevData,
      //   shortDesc: "please enter valid product short discription",
      // }))
      return false;
    }
    if (data.price.length < 1) {
      alert("please enter valid product price");
      // setErrors((prevData) => ({
      //   ...prevData,
      //   price: "please enter valid product price",
      // }))
      return false;
    }
    if (data.unit.length < 1) {
      alert("please select unit");
      // setErrors((prevData) => ({
      //   ...prevData,
      //   unit: "please select unit",
      // }))
      return false;
    }
    if (data.stock.length < 1) {
      alert("please enter valid stock");
      // setErrors((prevData) => ({
      //   ...prevData,
      //   stock: "please enter valid stock",
      // }))
      return false;
    }
    if (imgUrl.length < 5) {
      alert("please upload product image before submit");
      // setErrors((prevData) => ({
      //   ...prevData,
      //   imgUrl: "please upload product image before submit",
      // }))
      return false;
    }

    return true;
  };
  const handleProduct = () => {
    data.productImg = imgUrl;
    console.log("product ", data);
    if (validate()) {
      ProductHelper.CreateProduct(data, (status) => {
        status
          ? props.success("Product added successfully")
          : props.error("Product unable to add");
        setImgUrl("");
      });
    }
  };
  return (
    <div
      className="account-container"
      style={{
        width: "95%",

        padding: "15px",
        height: "auto",
        // minHeight: "calc(100vh-50px)",
      }}>
      <InputWithoutIcon
        isError={data.pname.length < 3}
        errorMsg={
          data.pname.length < 3 ? "please enter valid product name" : ""
        }
        lable="Product Name *"
        name="pname"
        placeholder="Enter the name of product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        isError={data.stock.length < 1}
        errorMsg={data.stock.length < 1 ? "please enter valid stock" : ""}
        lable="Product Stock *"
        name="stock"
        placeholder="Enter the stock of product"
        handleChange={handleChange}
      />
      <div>
        <div style={{ width: "85%", float: "left" }}>
          <InputWithoutIcon
            isError={data.price.length < 1}
            errorMsg={
              data.price.length < 1 ? "please enter valid product price" : ""
            }
            lable="Product Price "
            name="price"
            placeholder="Enter the price per product"
            handleChange={handleChange}
          />
        </div>
        <div className="unit-list">
          <SelectList
            label="Unit"
            isError={data.unit.length < 1}
            handleChange={handleChange}
            name="unit"
            list={["1kg", "1pc", "250gm", "200gm", "500gm", "750gm"]}
          />
        </div>
      </div>
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
        isError={data.shortDesc.length < 3}
        errorMsg={
          data.shortDesc.length < 3
            ? "please enter valid product short discription"
            : ""
        }
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

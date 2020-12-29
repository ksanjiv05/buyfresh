import React, { useState } from "react";
import InputWithoutIcon from "../../molecules/InputWithoutIcon";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";

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
const toastObj = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  autoHideDuration: 3000,
};
const AddProduct = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleChange = (value) => {
    console.log("------", value);
    setData(value);
    setError(false);
  };
  return (
    <div
      className="account-container"
      style={{ marginTop: "50px", padding: "15px" }}>
      <InputWithoutIcon
        lable="name"
        placeholder="Enter the name of product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        lable="stock"
        placeholder="Enter the stock of product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        lable="price"
        placeholder="Enter the price per product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        lable="productimg"
        placeholder="Enter the image url of product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        lable="shortDesc"
        placeholder="Enter the short description of product"
        handleChange={handleChange}
      />
      <InputWithoutIcon
        lable="description"
        placeholder="Enter the description of product"
        handleChange={handleChange}
      />
      <Button
        variant="contained"
        color="secondary"
        style={buttonTheam}
        // onClick={}
      >
        ADD PRODUCT
      </Button>
    </div>
  );
};

export default AddProduct;

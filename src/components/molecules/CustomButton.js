import React from "react";
import Button from "@material-ui/core/Button";

const CustomButton = (props) => {
  return (
    <div>
      <Button
        variant="contained"
        color="default"
        style={{ marginLeft: "5px" }}
        onClick={() => props.clearCart()}
        // startIcon={<AddShoppingCartIcon />}
      >
        {props.value}
      </Button>
    </div>
  );
};
export default CustomButton;

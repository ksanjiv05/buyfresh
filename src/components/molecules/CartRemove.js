import React from "react";
import Button from "@material-ui/core/Button";

const CartRemove = (props) => {
  return (
    <div>
      <Button
        variant="contained"
        color="default"
        style={{ marginLeft: "5px" }}
        onClick={() => props.clearCart()}
        // startIcon={<AddShoppingCartIcon />}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default CartRemove;

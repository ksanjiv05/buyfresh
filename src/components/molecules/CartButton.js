import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const addQuntity = 1;
const subQuntity = -1;
const CartButton = (props) => {
  const { ProductId, price, pname, productImg } = props.value;
  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      style={{ marginLeft: "5px", display: "flex" }}>
      <Button
        // aria-label="reduce"
        onClick={() => {
          props.handelCart(ProductId, price, pname, subQuntity, productImg);
        }}>
        <RemoveIcon fontSize="small" />
      </Button>
      <Button disabled style={{ backgroundColor: "transparent" }}>
        {props.quntity}
      </Button>
      <Button
        aria-label="increase"
        onClick={() => {
          props.handelCart(ProductId, price, pname, addQuntity, productImg);
        }}
        //className={classes.button}
      >
        <AddIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
};

export default CartButton;

import React from "react";
import CartButton from "../molecules/CartButton";

const CartItemDetails = (props) => {
  const { imgUrl = "", id, price, quntity } = props.cartItem;
  return (
    <tr key={id}>
      <td>
        <img src={imgUrl} className="add-cart-img" />
      </td>
      <td>{price}</td>
      <td></td>
      <td>x {quntity}</td>
      {/* <td>
        <CartButton value={props.cartItem} />
      </td> */}
      <td>=</td>
      <td>{price * quntity}</td>
    </tr>
  );
};
export default CartItemDetails;

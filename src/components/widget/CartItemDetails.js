import React from "react";

const CartItemDetails = (props) => {
  const { productImg, ProductId, price, quntity } = props.cartItem;
  return (
    <tr key={ProductId}>
      <td>
        <img src={productImg} className="add-cart-img" alt="cart-img" />
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

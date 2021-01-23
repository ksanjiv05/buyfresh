import React from "react";

const CartPriceDeatils = ({ subtotal }) => {
  return (
    <div className="cart-price-details-div">
      <h1>PRICE DETAILS</h1>
      <table className="cart-price-details-table">
        <tr>
          <th>Price</th>
          <td>{subtotal}</td>
        </tr>
        <tr>
          <th>Discout </th>
          <td>- 0</td>
        </tr>
        <tr>
          <th>Total Save</th>
          <td>0</td>
        </tr>
        <tr>
          <th>Delivery fee </th>
          <td style={{ color: "#00e607" }}>free</td>
        </tr>
        <tr style={{ fontSize: "22px" }}>
          <th>Total </th>
          <td>{subtotal}</td>
        </tr>
      </table>
    </div>
  );
};

export default CartPriceDeatils;

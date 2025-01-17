import React, { useContext, useEffect } from "react";
import "./cart.css";
import Context from "../../../Context";

export default function PlaceOrder(props) {
  const { address, timeslot, paymentMod } = props.data;
  const { totalCart } = useContext(Context);
  // let [subtotal, setSubTotal] = React.useState(0);
  let subtotal = 0;

  useEffect(() => {
    totalCart.map((cartItem) => {
      props.setSubTotal((subtotal += cartItem.price * cartItem.quntity));
    });
  }, []);
  return (
    <div className="place-order-summary">
      <div className="place-order-address">
        <div className="order-border-style">Shipping Address :</div>
        <div style={{ lineHeight: "10px" }}>
          <h2>Name : {address.address.name}</h2>
          <address>
            {address.address.house +
              "-" +
              address.address.socity +
              ", Post - Barhait , Dist - Sahibganj"}
          </address>
          <p>State :{"Jharkhand"}</p>
          <p>Pincode :{"816102"}</p>
          <p>Phone Number :{address.address.phone}</p>
        </div>
      </div>

      <div className="place-order-time">
        <div className="order-border-style">Time Slot :</div>
        <div>{timeslot}</div>
      </div>
      <div className="place-order-payment">
        <div className="order-border-style">Payment :</div>
        <div>
          {paymentMod + "  "} : {props.subtotal}
        </div>
      </div>
    </div>
  );
}

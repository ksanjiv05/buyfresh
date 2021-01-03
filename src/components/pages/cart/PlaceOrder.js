import React from "react";
import "./cart.css";

const v = {
  aphone: "9856231479",
  dist: "sahibganj",
  house: "254",
  name: "sanjiv kumar",
  phone: "4516511111",
  post: "barhait",
  socity: "sonajori",
  state: "jharkhand",
  zip: "816102",
};
export default function PlaceOrder(props) {
  const { address, timeslot, paymentMod } = props.data;
  console.log("place order", address, "--", timeslot, "==", paymentMod);
  return (
    <div className="place-order-summary">
      <div className="place-order-address">
        <div className="order-border-style">Shipping Address :</div>
        <div style={{ lineHeight: "10px" }}>
          <h2>Name : {address.name}</h2>
          <address>
            {address.house +
              "-" +
              address.socity +
              " " +
              address.post +
              " " +
              address.dist +
              " " +
              address.state}
          </address>
          <p>Pincode :{address.zip}</p>
          <p>Phone Number :{address.phone}</p>
          <p>Alternet Phone Number :{address.aphone}</p>
        </div>
      </div>

      <div className="place-order-time">
        <div className="order-border-style">Time Slot :</div>
        <div>{timeslot}</div>
      </div>
      <div className="place-order-payment">
        <div className="order-border-style">Payment :</div>
        <div>{paymentMod + "  "} : 599</div>
      </div>
    </div>
  );
}

// __proto__: Object
// paymentMod: "cod"
// timeslot: "5:00PM-7:00PM"

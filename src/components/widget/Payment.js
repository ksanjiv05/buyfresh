import React from "react";
import Razorpay from "razorpay";

const options = {
  key_id: "rzp_test_z9f2em3bbJq6sE", // Enter the Key ID generated from the Dashboard
  key_secret: "qGyIIe9u2Aclo9uevNrFXU8c",
};

const Payment = () => {
  const Pay = async (e) => {
    e.preventDefault();

    try {
      const rzp = new Razorpay(options);
      const payOpt = {
        amount: 5, // amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_74394",
      };

      const order = await rzp.orders.create(payOpt);
      if (!order) console.log("Some error occured");

      console.log(order);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="checkout-container">
      <h1 style={{ color: "#717477" }}>Choose Delivery Options </h1>
      <p>COD available</p>
      <button onClick={(e) => Pay(e)}>pay</button>
    </div>
  );
};

export default Payment;

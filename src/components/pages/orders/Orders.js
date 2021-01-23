import React, { useEffect, useState } from "react";
import OrderHelper from "../../../helper/OrderHelper";
import "./order.css";

const Orders = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    OrderHelper.GetOrder(sessionStorage.getItem("uid"), (order) => {
      setOrder((prevData) => [...prevData, order]);
    });
  }, []);
  return (
    <div className="account-container">
      <div className="account-left" style={{ width: "30%" }}></div>
      <div className="account-right" style={{ width: "66%" }}>
        {order &&
          order.map((value) => (
            <div
              className="order-conaint "
              // onClick={() => history.push("/order/descp")}
            >
              <div className="order-status">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/buyfreshbro.appspot.com/o/gdfghjjnbdseert434567hbvre43r45678uytrffdhgjbhn.png?alt=media&token=986fec71-c9a3-4fb3-8d99-d70d0a69c323"
                  className="order-imagex"
                  alt="Order-img"
                />
              </div>
              <div className="order-decp">Grocery Items</div>
              <div className="warup">
                <div
                  className="order-status add-ruppee"
                  style={{ width: "60px" }}>
                  {value && value.cartValue}
                </div>
                <div className="order-status">{value && value.time}</div>
                <div className="order-status tooltip">
                  {value && value.orderStatus}
                  <span class="tooltiptext"> 2:30 AM</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;

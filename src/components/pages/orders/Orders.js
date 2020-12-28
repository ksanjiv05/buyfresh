import React from "react";
import { useHistory } from "react-router-dom";
import "./order.css";

const Orders = () => {
  const history = useHistory();
  return (
    <div className="account-container">
      <div className="account-left" style={{ width: "30%" }}></div>
      <div className="account-right" style={{ width: "66%" }}>
        <div
          className="order-conaint"
          onClick={() => history.push("/order/descp")}>
          <div className="order-status">
            <img
              src="https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg"
              className="order-imagex"
            />
          </div>
          <div className="order-decp">
            Realme Narzo 20 (Glory Silver, 128 GB) (4 GB RAM)
          </div>
          <div className="warup">
            <div className="order-status">₹ 199</div>
            <div className="order-status">20/02/2020</div>
            <div className="order-status">Delivered</div>
          </div>
        </div>
        <div
          className="order-conaint"
          onClick={() => history.push("/order/descp")}>
          <div className="order-status">
            <img
              src="https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg"
              className="order-imagex"
            />
          </div>
          <div className="order-decp">
            Realme Narzo 20 (Glory Silver, 128 GB) (4 GB RAM)
          </div>
          <div className="warup">
            <div className="order-status">₹ 199</div>
            <div className="order-status">20/02/2020</div>
            <div className="order-status">Delivered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

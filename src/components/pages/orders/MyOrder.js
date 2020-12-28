import React from "react";
import OrderTimeLine from "./OrderTimeLine";
import "./order.css";

const MyOrder = () => {
  return (
    <div className="account-container">
      <div className="account-left">
        {/* <h1>Profile</h1> */}
        <div style={{ display: "contents" }}>
          {/* <img
            src={image}
            width="50%"
            height="50%"
            style={{ borderRadius: "100%" }}
          /> */}
        </div>
      </div>
      <div className="account-right">
        <div className="order-img">
          <ul>
            <li>
              <img
                src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
                className="arr-img"
              />{" "}
            </li>
            <li>
              <img
                src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"
                className="arr-img"
              />{" "}
            </li>
            <li>
              <img
                src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
                className="arr-img"
              />{" "}
            </li>
            <li>
              <img
                src="https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg"
                className="arr-img"
              />{" "}
            </li>
            <li>
              <img
                src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
                className="arr-img"
              />{" "}
            </li>
            <li>
              <img
                src="https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg"
                className="arr-img"
              />{" "}
            </li>
          </ul>
        </div>
        <OrderTimeLine />
        <div className="addressM">
          <h2>Delivery Address</h2>
          <h3 style={{ lineHeight: 0 }}>Sanjiv Kumar Pandit</h3>
          <address>
            J- 428 Prem nager Road baljeet nager Sadhipur, Krishna dairy near
            DMS New Delhi - 110008, Delhi Phone number 6205796058, 9540991156
          </address>
        </div>
      </div>
    </div>
  );
};

export default MyOrder;

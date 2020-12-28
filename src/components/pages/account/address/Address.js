import React from "react";
import AddIcon from "@material-ui/icons/Add";

import styles from "./Address.module.css";
const address = [
  {
    aphone: "09856231479",
    dist: "sahibganj",
    house: "254",
    name: "sanjiv kumar",
    phone: "4516511111",
    post: "barhait",
    socity: "sonajori",
    state: "jharkhand",
    zip: "816102",
  },
  {
    aphone: "09856231479",
    dist: "sahibganj",
    house: "254",
    name: "sanjiv kumar",
    phone: "4516511111",
    post: "barhait",
    socity: "sonajori",
    state: "jharkhand",
    zip: "816102",
  },
  {
    aphone: "09856231479",
    dist: "sahibganj",
    house: "254",
    name: "sanjiv kumar",
    phone: "4516511111",
    post: "barhait",
    socity: "sonajori",
    state: "jharkhand",
    zip: "816102",
  },
];
const Address = () => {
  return (
    <div className="checkout-container">
      <h1 className={styles.address_heading}>Address</h1>
      <div className={styles.addr_card}>
        {address.map((v, i) => (
          <div className={styles.card}>
            <div className={styles.card_action}>
              <input type="radio" name="address" />
            </div>
            <h2>name : {v.name}</h2>
            <address>
              {v.house +
                "-" +
                v.socity +
                " " +
                v.post +
                " " +
                v.dist +
                " " +
                v.state}
            </address>
            <p>pincode :{v.zip}</p>
            <p>phone Number :{v.phone}</p>
            <p>Alternet phone Number :{v.aphone}</p>
          </div>
        ))}
        <div className={styles.addIcon}>
          <AddIcon className={styles.isize} />
        </div>
      </div>
    </div>
  );
};

export default Address;

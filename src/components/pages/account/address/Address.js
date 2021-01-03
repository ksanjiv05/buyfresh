import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import addressHelper from "../../../../helper/AddressHelper";

import styles from "./Address.module.css";

const Address = () => {
  const [addresses, setAddresses] = useState({});
  const history = useHistory();
  useEffect(async () => {
    const addressData = await addressHelper.GetAddresses(
      sessionStorage.getItem("uid")
    );

    if (addressData) {
      setAddresses(addressData);
      console.log(addressData, "address ", addresses);
    }
  }, []);
  return (
    <div className="checkout-container">
      <h1 className={styles.address_heading}>Address</h1>
      <div className={styles.addr_card}>
        {console.log("address ------- ", addresses.addresses)}
        {addresses.addresses &&
          addresses.addresses.map((v, i) => (
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
                  v.vill +
                  " " +
                  "Barhait Sahibganj Jharkhand"}
              </address>
              <p>pincode :{"816102"}</p>
              <p>phone Number :{v.phone}</p>
            </div>
          ))}
        <div
          className={styles.addIcon}
          onClick={() => history.push("/addaddress")}>
          <AddIcon className={styles.isize} />
        </div>
      </div>
    </div>
  );
};

export default Address;

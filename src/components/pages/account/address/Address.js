import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import addressHelper from "../../../../helper/AddressHelper";
import userUtil from "../../../../helper/StoreUsers";
import styles from "./Address.module.css";
import Spinner from "../../../molecules/Spinner";

const Address = (props) => {
  const [addresses, setAddresses] = useState([]);
  const [loding, setLoding] = useState(false);
  const history = useHistory();
  const handleSelect = (v) => {
    if (props.isCart) {
      props.handleChange("address", v);
    }
  };
  useEffect(async () => {
    setLoding(true);

    const user = await userUtil.GetUser(sessionStorage.getItem("uid"));
    console.log("556", user && user.addresses);
    let addressData = [];
    user &&
      user.addresses.map(async (v) => {
        const address = await addressHelper.GetAddresses(v);
        addressData.push(address);
        setAddresses((prevData) => [...prevData, address]);
      });
    setLoding(false);
  }, []);
  return (
    <div className="checkout-container">
      {loding ? (
        <Spinner />
      ) : (
        <>
          <h1 className={styles.address_heading}>Address</h1>

          <div className={styles.addr_card}>
            {addresses &&
              addresses.map((v, i) => (
                <div className={styles.card} key={i}>
                  <div className={styles.card_action}>
                    <input
                      type="radio"
                      name="address"
                      onClick={() => handleSelect(v)}
                    />
                  </div>
                  <h2>name : {v.address.name}</h2>
                  <address>
                    {v.address.house +
                      "-" +
                      v.address.socity +
                      " " +
                      v.address.vill +
                      " " +
                      "Barhait Sahibganj Jharkhand"}
                  </address>
                  <p>pincode :{"816102"}</p>
                  <p>phone Number :{v.address.phone}</p>
                </div>
              ))}
            <div
              className={styles.addIcon}
              onClick={() =>
                history.push("/addaddress", {
                  addressid: addresses && addresses[0],
                })
              }>
              <AddIcon className={styles.isize} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Address;

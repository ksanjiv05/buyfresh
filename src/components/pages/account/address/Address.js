import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import addressHelper from "../../../../helper/AddressHelper";
import Button from "@material-ui/core/Button";
import userUtil from "../../../../helper/StoreUsers";
import styles from "./Address.module.css";
import Spinner from "../../../molecules/Spinner";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import AddressHelper from "../../../../helper/AddressHelper";

const buttonTheam = {
  width: "100%",
  // marginLeft: "1.5%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};

const Address = (props) => {
  const [addresses, setAddresses] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loding, setLoding] = useState(false);
  const history = useHistory();
  const handleSelect = (v) => {
    if (props.isCart) {
      props.handleChange("address", v);
    }
  };

  const handleDelete = (v) => {
    const data = {
      uid: sessionStorage.getItem("uid"),
      addressId: v,
    };
    AddressHelper.DeleteAddress(data, (status) => {
      setUpdate(status);
      setAddresses([]);
    });
  };
  useEffect(async () => {
    setLoding(true);
    const user = await userUtil.GetUser(sessionStorage.getItem("uid"));

    let addressData = [];
    user &&
      user.addresses.map(async (v) => {
        const address = await addressHelper.GetAddresses(v);
        address.addressId = v;
        addressData.push(address);
        setAddresses((prevData) => [...prevData, address]);
      });
    setLoding(false);
  }, [update]);
  return (
    <div className="checkout-container">
      {loding ? (
        <Spinner />
      ) : (
        <>
          <h1 className={styles.address_heading}>Address</h1>
          <div className={styles.addIconMob}>
            <div style={{ width: "100%", margin: "5px 10px" }}>
              <Button
                variant="contained"
                color="secondary"
                style={buttonTheam}
                onClick={() =>
                  history.push("/addaddress", {
                    addressid: addresses && addresses[0],
                  })
                }
                // className={classes.button}
                startIcon={<AddIcon />}>
                ADD ADDRESSE
              </Button>
            </div>
          </div>
          <div className={styles.addr_card}>
            {addresses &&
              addresses.map((v, i) => (
                <div className={styles.card} key={i}>
                  <div className={styles.card_action}>
                    {props.isCart ? (
                      <input
                        type="radio"
                        name="address"
                        onClick={() => handleSelect(v)}
                      />
                    ) : (
                      <IconButton onClick={() => handleDelete(v.addressId)}>
                        <DeleteForeverIcon style={{ color: "#f30d5adb" }} />
                      </IconButton>
                    )}
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

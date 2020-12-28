import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styles from "./Address.module.css";

const buttonTheam = {
  width: "100%",
  // marginLeft: "1.5%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};
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
    aphone: "098555531479",
    dist: "sahibganj",
    house: "254",
    name: "sanjiv kumar",
    phone: "9516511111",
    post: "barhait",
    socity: "sonajori",
    state: "jharkhand",
    zip: "816102",
  },
  {
    aphone: "9856231479",
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
const Addresses = () => {
  const handleSelect = (v) => {
    console.log(v, "---------");
  };
  return (
    <div className="account-container">
      <h1 className={styles.address_heading}>Address</h1>
      <div className={styles.addIconMob}>
        <div style={{ width: "100%", margin: "5px 10px" }}>
          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            // className={classes.button}
            startIcon={<AddIcon />}>
            ADD ADDRESSE
          </Button>
        </div>
      </div>
      <div className={styles.addr_card}>
        {address.map((v, i) => (
          <div className={styles.card}>
            <div className={styles.card_action}>
              <input
                type="radio"
                name="address"
                onClick={() => handleSelect(v)}
              />
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

export default Addresses;

import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import PhoneVarification from "../../molecules/PhoneVarification";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px 25px 0px 20px",
  },
}));

const AddAddress = () => {
  const [address, setAddress] = useState({});
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAddress = () => {
    console.log("address", address);
  };

  const classes = useStyles();
  return (
    <div style={{ margin: "2%" }}>
      <div className="add-address">
        <div className="add-address-input-group">
          <label className="add-address-label">Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => handleChange(e)}
            className="input-box"
          />
        </div>
        <div className="add-address-input-group">
          <label className="add-address-label">Flat / House / Office No.</label>
          <input
            type="text"
            name="house"
            onChange={(e) => handleChange(e)}
            className="input-box"
          />
        </div>
        <div className="add-address-input-group">
          <label className="add-address-label">
            Street / Society / Office Name
          </label>
          <input
            type="text"
            name="socity"
            onChange={(e) => handleChange(e)}
            className="input-box"
          />
        </div>
        <div>
          <div
            className="add-address-input-group-ext"
            style={{ marginRight: "3%" }}>
            <label className="add-address-label">Post Office</label>
            <input
              type="text"
              name="post"
              onChange={(e) => handleChange(e)}
              className="input-box"
            />
          </div>
          <div className="add-address-input-group-ext">
            <label className="add-address-label">Distric</label>
            <input
              type="text"
              name="dist"
              onChange={(e) => handleChange(e)}
              className="input-box"
            />
          </div>
        </div>
        <div>
          <div
            className="add-address-input-group-ext"
            style={{ marginRight: "3%" }}>
            <label className="add-address-label">State</label>
            <input
              type="text"
              name="state"
              onChange={(e) => handleChange(e)}
              className="input-box"
            />
          </div>
          <div className="add-address-input-group-ext">
            <label className="add-address-label">Pincode</label>
            <input
              type="text"
              name="zip"
              onChange={(e) => handleChange(e)}
              className="input-box"
            />
          </div>
        </div>
        <div>
          {/* <PhoneVarification /> */}
          <div
            className="add-address-input-group-ext"
            style={{ marginRight: "3%" }}>
            <label className="add-address-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              onChange={(e) => handleChange(e)}
              className="input-box"
            />
          </div>
          <div className="add-address-input-group-ext">
            <label className="add-address-label">Alternet Phone Number</label>
            <input
              type="text"
              name="aphone"
              onChange={(e) => handleChange(e)}
              className="input-box"
            />
          </div>
        </div>
        <div className="add-address-input-group">
          <button className="input-box" onClick={() => handleAddAddress()}>
            Add Address
          </button>
        </div>
      </div>
      <div className="add-address-available"></div>
    </div>
  );
};
export default AddAddress;

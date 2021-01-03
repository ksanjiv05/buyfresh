import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import InputWithoutIcon from "../../../molecules/InputWithoutIcon";
import WithToast from "../../../../helper/WithToast";
import addressHelper from "../../../../helper/AddressHelper";
import "../account.css";

const buttonTheam = {
  width: "100%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Villages = [
  "Barhait",
  "Sonajori",
  "Dhanjori",
  "Bhognadhi",
  "Daldali",
  "Laragutu",
];
const AddAddress = (props) => {
  const classes = useStyles();
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

    const data = { uid: sessionStorage.getItem("uid"), addresses: address };
    addressHelper.UpdateAddress(data, (status) => {
      status
        ? props.success("Address added successfully")
        : props.error("Address unable to add");
    });
  };
  useEffect(async () => {
    const addresses = await addressHelper.GetAddresses(
      sessionStorage.getItem("uid")
    );

    if (addresses) {
      console.log("address ", addresses);
    }
  }, []);

  return (
    // <div className="add-addresses">
    <div className="account-container">
      <div className="account-left"></div>
      <div className="account-right">
        <div style={{ padding: "4px 15px 15px 15px" }}>
          <InputWithoutIcon
            lable="Name"
            name="name"
            placeholder="enter the name"
            handleChange={handleChange}
          />
          <InputWithoutIcon
            lable="Flat/House/Office"
            name="house"
            handleChange={handleChange}
          />
          <InputWithoutIcon
            lable="Street / Society "
            name="socity"
            handleChange={handleChange}
          />
          {/* <InputLabel id="demo-simple-select-helper-label">Village</InputLabel> */}
          <Select
            onChange={handleChange}
            name="vill"
            placeholder="Select Villages"
            displayEmpty
            className={classes.selectEmpty}
            style={{ width: "99%" }}
            inputProps={{ "aria-label": "Without label" }}>
            <MenuItem value="" disabled>
              Select Village
            </MenuItem>
            {Villages.map((value) => (
              <MenuItem value={value}>{value}</MenuItem>
            ))}
          </Select>

          <div className="address-group" style={{ marginRight: "2%" }}>
            <InputWithoutIcon
              lable="Block"
              name="po"
              value="Barhait"
              isDesable={true}
              // handleChange={handleChange}
            />
            <InputWithoutIcon
              lable="District"
              name="dist"
              value="Sahibganj"
              isDesable={true}
              // handleChange={handleChange}
            />
          </div>
          <div className="address-group">
            <InputWithoutIcon
              lable="State"
              name="state"
              value="Jharkhand"
              isDesable={true}
              // handleChange={handleChange}
            />
            <InputWithoutIcon
              lable="PIN/ZIP Code"
              name="pin"
              value="816102"
              isDesable={true}
              // handleChange={handleChange}
            />
          </div>
          <InputWithoutIcon
            lable="Phone"
            name="phone"
            isError={address.Phone && address.Phone.length < 10}
            errorMsg={
              address.Phone && address.Phone.length < 10
                ? "Please enter valid phone number"
                : ""
            }
            inputProps={{ maxLength: 10 }}
            handleChange={handleChange}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleAddAddress}
            style={buttonTheam}>
            SAVE ADDRESS
          </Button>
        </div>
      </div>
    </div>
  );
};
export default WithToast(AddAddress);

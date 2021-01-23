import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputWithoutIcon from "../../../molecules/InputWithoutIcon";
import WithToast from "../../../../helper/WithToast";
import addressHelper from "../../../../helper/AddressHelper";
import "../account.css";
import Spinner from "../../../molecules/Spinner";

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
  const [address, setAddress] = useState({
    name: "",
    house: "",
    vill: "",
    socity: "",
    phone: "",
  });
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setAddress((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAddress = () => {
    if (address.name.length < 3) {
      props.error("Please enter valid name");
      return;
    }
    if (address.vill.length < 3) {
      props.error("Please choose valid village");
      return;
    }
    if (address.socity.length < 3) {
      props.error("Please enter valid socity");
      return;
    }
    if (address.phone.length < 10) {
      props.error("Please enter valid phone number");
      return;
    }
    setProgress(true);
    const data = { uid: sessionStorage.getItem("uid"), address: address };
    addressHelper.StoreAddress(data, (status) => {
      setProgress(false);
      if (status) {
        props.success("Address added successfully");
        history.goBack();
      } else {
        props.error("Address unable to add");
      }
    });
  };

  return (
    // <div className="add-addresses">
    <div className="account-container">
      <div className="account-left"></div>
      <div className="account-right">
        <div style={{ padding: "4px 15px 15px 15px" }}>
          <InputWithoutIcon
            isError={
              address && address.name && address.name.length < 3 ? true : false
            }
            errorMsg={
              address && address.name && address.name.length < 3
                ? "Please enter valid name"
                : ""
            }
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
            isError={
              address && address.socity && address.socity.length < 3
                ? true
                : false
            }
            errorMsg={
              address && address.socity && address.socity.length < 3
                ? "Please enter valid input"
                : ""
            }
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
            {/* <MenuItem value="" disabled>
              Select Village
            </MenuItem> */}
            {Villages.map((value, i) => (
              <MenuItem key={i} value={value}>
                {value}
              </MenuItem>
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
            isError={
              address && address.phone && address.phone.length < 10
                ? true
                : false
            }
            errorMsg={
              address && address.phone && address.phone.length < 10
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
      {progress ? <Spinner /> : ""}
    </div>
  );
};
export default WithToast(AddAddress);

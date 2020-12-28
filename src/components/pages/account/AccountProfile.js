import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import CustomInput from "../../molecules/CustomInput";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import "./account.css";
import image from "./Keerthy Suresh in White Dress.jpg";
import FileDialog from "../../widget/FileDialog";
import Context from "../../../Context";

const buttonTheam = {
  width: "100%",
  // marginLeft: "1.5%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};
const AccountProfile = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const { auth } = useContext(Context);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("profile  data ", data);
  };

  return (
    <div className="account-container">
      <div className="account-left">
        {/* <h1>Profile</h1> */}
        <div style={{ display: "contents" }}>
          <img
            src={
              auth.auth0.currentUser != null
                ? auth.auth0.currentUser.photoURL
                  ? auth.auth0.currentUser.photoURL
                  : ""
                : ""
            }
            width="50%"
            height="50%"
            style={{ borderRadius: "100%" }}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{
              margin: "4% 0% -20% -11%",
              backgroundColor: "rgb(89, 6, 95)",
            }}
            onClick={() => handleClickOpen()}
            startIcon={<EditIcon />}>
            Edit
          </Button>
          <FileDialog
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </div>
      </div>
      <div className="account-right">
        <div className="mobile-responsive">
          <CustomInput
            lable="First Name"
            placeholder="Enter your name"
            value={
              auth.auth0.currentUser != null
                ? auth.auth0.currentUser.displayName
                  ? auth.auth0.currentUser.displayName
                  : ""
                : ""
            }
            handleChange={handleChange}
          />
          <CustomInput
            lable="Last Name"
            placeholder="Enter your name"
            handleChange={handleChange}
          />
          <CustomInput
            lable="Contact Number"
            placeholder="Enter your number"
            handleChange={handleChange}
          />
          <CustomInput
            lable="Email"
            placeholder="Enter your email"
            value={
              auth.auth0.currentUser != null
                ? auth.auth0.currentUser.email
                  ? auth.auth0.currentUser.email
                  : ""
                : ""
            }
            handleChange={handleChange}
          />
          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            // className={classes.button}
            startIcon={<SaveIcon />}>
            SAVE
          </Button>

          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            onClick={() => history.push("/address")}
            // className={classes.button}
          >
            MY ADDRESSES
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            // className={classes.button}
          >
            CHANGE PASSWORD
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;

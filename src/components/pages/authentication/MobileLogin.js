import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputWithoutIcon from "../../molecules/InputWithoutIcon";
import image from "../account/cool-background (1).png";
import PhoneAuth from "../../molecules/PhoneAuth";
import Context from "../../../Context";
import { useSnackbar } from "notistack";

const buttonTheam = {
  width: "100%",
  // marginLeft: "1.5%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};
const toastObj = {
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  autoHideDuration: 3000,
};

export default function MobileLogin() {
  const [data, setData] = useState({});
  const { auth } = useContext(Context);
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // signInWithEmailPassword
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    console.log(value, data);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmailPasswordAuth = () => {
    console.log("email", data);

    auth.signInWithEmailPassword(data.Email, data.Password, (status) => {
      console.log("singed email", status);
      let msg = status ? "You are successfully loged in" : "Loged in failed";
      status ? (toastObj.variant = "success") : (toastObj.variant = "error");
      enqueueSnackbar(msg, toastObj);
    });
  };

  const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="account-container">
      <div className="account-left"></div>
      <div className="account-right">
        <div style={{ padding: "10px", paddingTop: "50%" }}>
          {/* <InputWithoutIcon
            lable="Email"
            placeholder="Enter your email"
            isError={emailregx.test(data.Email) ? false : true}
            errorMsg={
              emailregx.test(data.Email) ? "" : "Please Enter valid Email"
            }
            handleChange={handleChange}
          />
          <InputWithoutIcon
            lable="Password"
            isError={data.Password && data.Password.length < 8}
            errorMsg={
              data.Password && data.Password.length < 8
                ? "Please Enter valid password"
                : ""
            }
            placeholder="Enter your password"
            handleChange={handleChange}
          />
          <p className="forget-password">forget password ?</p>
          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            onClick={handleEmailPasswordAuth}
            // className={classes.button}
            // startIcon={<SaveIcon />}
          >
            LOGIN
          </Button> */}

          {/* <center>
            <Typography variant="h6">OR</Typography>
          </center> */}
          <PhoneAuth />
          <Button
            variant="contained"
            color="secondary"
            style={buttonTheam}
            onClick={() => {
              history.push("/reg");
            }}
            // className={classes.button}
            // startIcon={<SaveIcon />}
          >
            New ? Create an account
          </Button>
        </div>
      </div>
    </div>
  );
}

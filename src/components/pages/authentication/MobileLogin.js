import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

import PhoneAuth from "../../molecules/PhoneAuth";
import Context from "../../../Context";
import WithToast from "../../../helper/WithToast";

const buttonTheam = {
  width: "100%",
  // marginLeft: "1.5%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};

function MobileLogin(props) {
  const { isAuthenticate } = useContext(Context);
  const history = useHistory();

  // signInWithEmailPassword
  // const handleChange = (ev) => {
  //   const { name, value } = ev.target;
  //   console.log(value, data);
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleEmailPasswordAuth = () => {
  //   console.log("email", data);

  //   auth.signInWithEmailPassword(data.Email, data.Password, (status) => {
  //     console.log("singed email", status);
  //     let msg = status ? "You are successfully loged in" : "Loged in failed";
  //     status ? props.success(msg) : props.error(msg);
  //   });
  // };

  useEffect(() => {
    if (isAuthenticate) history.push("/profile");
  }, [isAuthenticate]);
  // const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
          <PhoneAuth
            btnMsg="LOGIN WITH OTP"
            success={props.success}
            error={props.error}
          />
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

export default WithToast(MobileLogin);

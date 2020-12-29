import React, { useContext, useState } from "react";
import Context from "../../Context";
import firebase from "firebase/app";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import OtpInput from "react-otp-input";
import Alert from "@material-ui/lab/Alert";
import NumberFormat from "react-number-format";
import { useSnackbar } from "notistack";

const buttonTheam = {
  width: "100%",

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
const PhoneAuth = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState("");
  const [state, setState] = useState(false);
  const { auth } = useContext(Context);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleChange = (value) => {
    console.log("------", value);
    let length = data.length;
    length < 10 || length > 10 ? setError(true) : setError(false);
    // if (length > 10) {
    //   setData(data);
    //   console.log("phonw>10");
    // } else {
    //   setData(value);
    //   console.log("phonw<10");
    // }
    setData(value);
  };
  const handleChangeOtp = (value) => {
    setOtp(value);
    console.log(otp);
  };

  const handleSendOTP = () => {
    console.log(data.length, "++++++++", data);
    if (data.length != 10) {
      setError(true);
      toastObj.variant = "error";
      enqueueSnackbar("Please enter valid mobile number", toastObj);
      return;
    }

    try {
      window.appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      const appVerifier = window.appVerifier;

      auth.signInWithPhone("+91" + data, appVerifier, (status) => {
        console.log("what is v ", status);
        let msg = status ? "OTP successfully send" : "OTP sending failed";
        status ? (toastObj.variant = "success") : (toastObj.variant = "error");
        enqueueSnackbar(msg, toastObj);
        setState(status);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const varifyCode = () => {
    auth.varifyOTP(otp, (status) => {
      let msg = status
        ? "Mobile Number successfully varified"
        : "OTP varification failed";
      status ? (toastObj.variant = "success") : (toastObj.variant = "error");
      enqueueSnackbar(msg, toastObj);
      setState(status);
      setState(status);
    });
  };

  return (
    <div>
      {!state ? (
        <TextField
          error={error}
          label="phone"
          // style={{ margin: 8 }}
          placeholder="enter phone number"
          onChange={(ev) => handleChange(ev.target.value)}
          fullWidth
          margin="normal"
          helperText={error ? "Please enter valid contact number" : ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <OtpInput
            value={otp}
            containerStyle="otp-container"
            inputStyle={{
              fontSize: "18px",
              padding: "5px",
              border: "2px solid #aba3a3",
              borderRadius: "3px",
            }}
            onChange={handleChangeOtp}
            numInputs={6}
            separator={<span> - </span>}
          />
        </div>
      )}

      <Button
        variant="contained"
        color="secondary"
        style={buttonTheam}
        onClick={!state ? handleSendOTP : varifyCode}>
        {!state ? "LOGIN WITH OTP" : "VARIFY OTP"}
      </Button>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default PhoneAuth;
{
}
{
  /* <NumberFormat
          prefix={"+91"}
          value={123456789}
          placeholder="enter phone number"
          onChange={(ev) => handleChange(ev.target.value)}
          format=" #### ######"
        /> */
}

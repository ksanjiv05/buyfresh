import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../Context";
import firebase from "firebase/app";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import OtpInput from "react-otp-input";
import Spinner from "./Spinner";
import WithToast from "../../helper/WithToast";

const buttonTheam = {
  width: "100%",
  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};

const PhoneAuth = (props) => {
  const { btnMsg } = props;
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [loder, setLoder] = useState(false);
  const [otp, setOtp] = useState("");
  const [state, setState] = useState(false);
  const { auth } = useContext(Context);
  const history = useHistory();

  const handleChange = (value) => {
    let length = data.length;
    length < 9 ? setError(true) : setError(false);
    setData(value);
  };
  const handleChangeOtp = (value) => {
    setOtp(value);
    console.log(otp);
  };

  const handleSendOTP = () => {
    if (data.length != 10) {
      setError(true);
      props.error("Please enter valid mobile number");
      return;
    }

    try {
      setLoder(true);
      window.appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      const appVerifier = window.appVerifier;
      auth.signInWithPhone("+91" + data, appVerifier, (status) => {
        console.log("what is v ", status);
        setLoder(false);
        let msg = status ? "OTP successfully send" : "OTP sending failed";
        status ? props.success(msg) : props.error(msg);

        setState(status);
      });
    } catch (err) {
      console.log(err);
      setLoder(false);
    }
  };

  const varifyCode = () => {
    setLoder(true);
    auth.varifyOTP(otp, (status) => {
      setLoder(false);
      let msg = status
        ? "Mobile Number successfully varified"
        : "OTP varification failed";
      status ? props.success(msg) : props.error(msg);
      if (status) {
        setState(status);
        history.goBack();
        history.go(0);
      }
      setOtp("");
      // setState(status);
    });
  };

  return (
    <div>
      {!state ? (
        <TextField
          tabIndex={2}
          error={error}
          label="phone"
          placeholder="enter phone number"
          onChange={(ev) => handleChange(ev.target.value)}
          fullWidth
          margin="normal"
          helperText={error ? "Please enter valid contact number" : ""}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ maxLength: 10 }}
          // onInput={(e) => {
          //   e.target.value = Math.max(0, parseInt(e.target.value))
          //     .toString()
          //     .slice(0, 10);
          // }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+91</InputAdornment>
            ),
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
        {!state ? btnMsg : "VARIFY OTP"}
      </Button>
      <div id="recaptcha-container"></div>
      {loder ? <Spinner /> : ""}
    </div>
  );
};

export default WithToast(PhoneAuth);

/* <NumberFormat
          prefix={"+91"}
          value={123456789}
          placeholder="enter phone number"
          onChange={(ev) => handleChange(ev.target.value)}
          format=" #### ######"
        /> */

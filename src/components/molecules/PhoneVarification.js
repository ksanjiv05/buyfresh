import React, { useContext, useState } from "react";
import Context from "../../Context";
import firebase from "firebase/app";

const PhoneVarification = () => {
  const [data, setData] = useState("");
  const [state, setState] = useState(false);
  const { auth } = useContext(Context);
  const handleChange = (value) => {
    setData(value);
  };

  const handleSendOTP = () => {
    try {
      window.appVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
      const appVerifier = window.appVerifier;

      auth.signInWithPhone("+91" + data, appVerifier);
      setState(!state);
    } catch (err) {
      console.log(err);
    }
  };

  const varifyCode = () => {
    console.log(data, "--------------------");
    auth.varifyOTP(data);
    setState(!state);
  };
  return (
    <div>
      <div id="recaptcha-container"></div>
      <div
        className="add-address-input-group-ext"
        style={{ marginRight: "3%" }}>
        <label className="add-address-label">
          {state ? "Enter OTP" : "Contact Number"}
        </label>
        <input
          type="text"
          className="input-box"
          onChange={(ev) => handleChange(ev.target.value)}
        />
      </div>
      <div className="add-address-input-group-ext">
        <label className="add-address-label"> vv</label>
        {auth.isSinghedIn ? (
          <input type="button" className="input-box" value="Number Varified" />
        ) : (
          <input
            type="button"
            className="input-box"
            value={state ? "Varify OTP" : "send OTP"}
            onClick={() => (state ? varifyCode() : handleSendOTP())}
          />
        )}
      </div>
    </div>
  );
};

export default PhoneVarification;

import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

import InputWithoutIcon from "../../molecules/InputWithoutIcon";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import firebase from "../../../config/firebase";
import Context from "../../../Context";
import Valid from "../../../helper/Validation";
import PhoneAuth from "../../molecules/PhoneAuth";
import DatabaseCollections from "../../../helper/Constants";
import WithToast from "../../../helper/WithToast";

const buttonTheam = {
  width: "100%",

  marginTop: "3%",
  backgroundColor: "rgb(89, 6, 95)",
};

const NewRegister = (props) => {
  const [data, setData] = useState({});
  const [isErrors, setIsErrors] = useState(true);
  const [progress, setProgress] = useState(1);
  const { isAuthenticate } = useContext(Context);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    console.log(value, data);
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("iserror ", isErrors);
    let iser = true;
    for (let key in data) {
      iser = Valid(key, data[key]);
      if (iser) break;
      //setIsErrors(st);
    }

    if (iser) {
      props.error("Please enter valid data ");
      return;
    }
    console.log(sessionStorage.getItem("uid"), "user data", data);
    if (!sessionStorage.getItem("uid")) {
      props.error("Something went to wrong");
      return;
    }
    const db = firebase.firestore();
    await db
      .collection(DatabaseCollections.Users)
      .doc(sessionStorage.getItem("uid"))
      .set(data)
      .then((result) => {
        props.success("You are register successfully ");
      })
      .catch((err) => {
        console.log("userr err", err);
        props.error("Unable to register you ");
      });
  };

  useEffect(() => {
    console.log(
      sessionStorage.getItem("phoneNumber"),
      "is aut ----idisAuthenticate--",
      isAuthenticate
    );
  }, []);
  const emailregx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (
    <div className="account-container">
      <div className="account-left"></div>
      <div className="account-right">
        <div style={{ padding: 15, paddingTop: "16%" }}>
          <div className="progress-div">
            <Progress
              percent={50 * progress}
              // status="success"
              theme={{
                success: {
                  color: "rgb(89, 6, 95)",
                },
              }}
            />
          </div>

          {!isAuthenticate ? (
            <PhoneAuth btnMsg={"VARIFY NUMBER"} />
          ) : (
            <>
              <InputWithoutIcon
                lable="First"
                placeholder="Enter the first name"
                isError={data.First && data.First.length < 3}
                errorMsg={
                  data.First && data.First.length < 3
                    ? "Please Enter valid first name"
                    : ""
                }
                setIsErrors={setIsErrors}
                handleChange={handleChange}
              />
              <InputWithoutIcon
                lable="Last"
                placeholder="Enter the last name"
                isError={data.Last && data.Last.length < 3}
                errorMsg={
                  data.Last && data.Last.length < 3
                    ? "Please Enter valid last name"
                    : ""
                }
                setIsErrors={setIsErrors}
                handleChange={handleChange}
              />
              <InputWithoutIcon
                lable="Image Url"
                name="profile"
                placeholder="Enter the profile url"
                handleChange={handleChange}
              />
              <Button
                variant="contained"
                color="secondary"
                style={buttonTheam}
                // className={classes.button}
                onClick={handleSave}
                startIcon={<SaveIcon />}>
                Create
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithToast(NewRegister);
